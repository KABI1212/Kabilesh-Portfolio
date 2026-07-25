import { promises as fs } from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, validateContactSubmission } from '@/lib/security'
import { dispatchContactEmails } from '@/lib/email-service'

export const runtime = 'nodejs'

const uri = process.env.MONGODB_URI?.trim()
const dbName = process.env.MONGODB_DB?.trim() || 'portfolio'
const fallbackFile = path.join(process.cwd(), 'data', 'contact-submissions.json')

type MongoGlobal = {
  client?: MongoClient
}

const globalForMongo = globalThis as typeof globalThis & MongoGlobal

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMessage))
    }, timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })
}

function getClient() {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!globalForMongo.client) {
    globalForMongo.client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000,
    })
  }

  return globalForMongo.client
}

async function persistFallback(entry: Record<string, unknown>) {
  const tmpFallback = process.env.VERCEL || process.env.RENDER
    ? path.join('/tmp', 'contact-submissions.json')
    : fallbackFile

  try {
    await fs.mkdir(path.dirname(tmpFallback), { recursive: true })

    const existing = await fs
      .readFile(tmpFallback, 'utf8')
      .then((file) => JSON.parse(file) as Array<Record<string, unknown>>)
      .catch(() => [] as Array<Record<string, unknown>>)

    existing.push(entry)
    await fs.writeFile(tmpFallback, JSON.stringify(existing, null, 2), 'utf8')
  } catch (fallbackError) {
    console.error('[API/contact] Fallback storage write failed:', fallbackError)
  }
}

/**
 * Extracts client IP address from Next.js request headers.
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return '127.0.0.1'
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const ip = getClientIp(request)
  const userAgent = request.headers.get('user-agent') || 'Unknown Browser'

  console.log(`[API/contact] [POST] Incoming request from IP: ${ip}`)

  // 1. Rate Limiting Check
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    console.warn(`[API/contact] Rate limit exceeded for IP: ${ip}`)
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please wait a few minutes before trying again.',
        resetMs: rateLimit.resetMs,
      },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)) } }
    )
  }

  try {
    const rawBody = await request.json().catch(() => ({}))

    // 2. Validation & Sanitization & Honeypot Check
    const validation = validateContactSubmission(rawBody)

    // Honeypot check - silently discard bot submissions
    if (validation.errors._bot) {
      console.warn(`[API/contact] Bot honeypot triggered from IP: ${ip}`)
      return NextResponse.json({ success: true, message: 'Message received successfully.' })
    }

    if (!validation.valid) {
      console.warn('[API/contact] Validation failed:', validation.errors)
      return NextResponse.json(
        {
          success: false,
          error: 'Please fix the errors in your submission.',
          details: validation.errors,
        },
        { status: 400 }
      )
    }

    const { name, email, subject, phone, company, message } = validation.sanitized
    const createdAtDate = new Date()
    const createdAtFormatted = createdAtDate.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
    })

    // 3. Send Notification & Auto-Reply Emails
    const emailResult = await dispatchContactEmails({
      name,
      email,
      subject,
      phone,
      company,
      message,
      createdAt: createdAtFormatted,
      ip,
      userAgent,
    })

    // 4. Save to Database (MongoDB or Fallback)
    const dbEntry = {
      name,
      email,
      subject,
      phone,
      company,
      message,
      createdAt: createdAtDate,
      ip,
      userAgent,
      emailStatus: {
        notificationSent: emailResult.notificationSent,
        autoReplySent: emailResult.autoReplySent,
        provider: emailResult.providerUsed,
        error: emailResult.error || null,
      },
    }

    let savedToDb = false
    try {
      if (uri) {
        const mongoClient = getClient()
        await withTimeout(
          (async () => {
            await mongoClient.connect()
            const db = mongoClient.db(dbName)
            await db.collection('contact_submissions').insertOne(dbEntry)
          })(),
          3000,
          'MongoDB connection timed out'
        )
        savedToDb = true
        console.log(`[API/contact] Submission successfully saved to MongoDB collection 'contact_submissions'`)
      }
    } catch (dbError) {
      console.error('[API/contact] MongoDB save failed, persisting to fallback storage:', dbError)
    }

    if (!savedToDb) {
      await persistFallback(dbEntry)
    }

    const duration = Date.now() - startTime
    console.log(`[API/contact] Request processed successfully in ${duration}ms. EmailSent: ${emailResult.notificationSent}, AutoReplySent: ${emailResult.autoReplySent}`)

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      meta: {
        emailDelivered: emailResult.notificationSent,
        autoReplySent: emailResult.autoReplySent,
      },
    })
  } catch (error) {
    console.error('[API/contact] Unhandled contact submission error:', error instanceof Error ? error.stack ?? error.message : error)
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again or email kabileshkoffl@gmail.com directly.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const key = request.headers.get('x-admin-key') || request.nextUrl.searchParams.get('key')

    if (key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    let submissions: any[] = []
    try {
      if (uri) {
        const mongoClient = getClient()
        submissions = await withTimeout(
          (async () => {
            await mongoClient.connect()
            const db = mongoClient.db(dbName)
            return await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).toArray()
          })(),
          3000,
          'MongoDB connection timed out'
        )
      }
    } catch (dbError) {
      console.error('[API/contact] MongoDB fetch failed, using fallback storage:', dbError)
      try {
        const fileContent = await fs.readFile(fallbackFile, 'utf8')
        submissions = JSON.parse(fileContent)
        submissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } catch (fallbackError) {
        console.error('[API/contact] Fallback read failed:', fallbackError)
        submissions = []
      }
    }

    const normalizedSubmissions = submissions.map((sub: any, idx: number) => ({
      _id: sub._id || sub.id || `fallback-${idx}-${new Date(sub.createdAt).getTime()}`,
      ...sub,
    }))

    return NextResponse.json({ success: true, count: normalizedSubmissions.length, submissions: normalizedSubmissions })
  } catch (error) {
    console.error('[API/contact] Contact fetch error:', error instanceof Error ? error.stack ?? error.message : error)
    return NextResponse.json({ success: false, error: 'Unable to read submissions.' }, { status: 500 })
  }
}
