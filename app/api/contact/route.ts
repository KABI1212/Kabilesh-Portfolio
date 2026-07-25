import { promises as fs } from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

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
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      socketTimeoutMS: 2000,
    })
  }

  return globalForMongo.client
}

async function persistFallback(entry: { name: string; email: string; message: string; createdAt: Date }) {
  // Vercel and Render have read-only filesystems outside /tmp
  // Use /tmp if available, otherwise skip gracefully
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
    console.error('Fallback contact storage failed (read-only filesystem?):', fallbackError)
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = typeof body?.name === 'string' ? body.name.trim() : ''
    const email = typeof body?.email === 'string' ? body.email.trim() : ''
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const entry = {
      name,
      email,
      message,
      createdAt: new Date(),
    }

    try {
      const mongoClient = getClient()
      await withTimeout(
        (async () => {
          await mongoClient.connect()
          const db = mongoClient.db(dbName)
          const collection = db.collection('contact_submissions')
          await collection.insertOne(entry)
        })(),
        2500,
        'Database connection timed out'
      )
    } catch (dbError) {
      console.error('MongoDB submit failed, using fallback storage:', dbError)
      await persistFallback(entry)
    }

    return NextResponse.json({ success: true, message: 'Message received successfully.' })
  } catch (error) {
    console.error('Contact submission error:', error instanceof Error ? error.stack ?? error.message : error)
    return NextResponse.json(
      { success: false, error: 'Unable to store the message right now.' },
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
      const mongoClient = getClient()
      submissions = await withTimeout(
        (async () => {
          await mongoClient.connect()
          const db = mongoClient.db(dbName)
          return await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).toArray()
        })(),
        2500,
        'Database connection timed out'
      )
    } catch (dbError) {
      console.error('MongoDB fetch failed, using fallback storage:', dbError)
      try {
        const fileContent = await fs.readFile(fallbackFile, 'utf8')
        submissions = JSON.parse(fileContent)
        submissions.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } catch (fallbackError) {
        console.error('Fallback read failed:', fallbackError)
        submissions = []
      }
    }

    const normalizedSubmissions = submissions.map((sub: any, idx: number) => ({
      _id: sub._id || sub.id || `fallback-${idx}-${new Date(sub.createdAt).getTime()}`,
      ...sub,
    }))

    return NextResponse.json({ success: true, submissions: normalizedSubmissions })
  } catch (error) {
    console.error('Contact fetch error:', error instanceof Error ? error.stack ?? error.message : error)
    return NextResponse.json({ success: false, error: 'Unable to read submissions.' }, { status: 500 })
  }
}

