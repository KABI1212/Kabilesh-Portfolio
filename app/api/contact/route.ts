import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const uri = process.env.MONGODB_URI?.trim()
const dbName = process.env.MONGODB_DB?.trim() || 'portfolio'
let client: MongoClient | null = null

function getClient() {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!client) {
    client = new MongoClient(uri)
  }

  return client
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

    const mongoClient = getClient()
    await mongoClient.connect()
    const db = mongoClient.db(dbName)
    const collection = db.collection('contact_submissions')

    const entry = {
      name,
      email,
      message,
      createdAt: new Date(),
    }

    await collection.insertOne(entry)

    return NextResponse.json({ success: true, message: 'Message received successfully.' })
  } catch {
    console.error('Contact submission error')
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

    const mongoClient = getClient()
    await mongoClient.connect()
    const db = mongoClient.db(dbName)
    const submissions = await db.collection('contact_submissions').find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ success: true, submissions })
  } catch {
    console.error('Contact fetch error')
    return NextResponse.json({ success: false, error: 'Unable to read submissions.' }, { status: 500 })
  }
}

