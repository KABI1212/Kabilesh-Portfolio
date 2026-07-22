import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const DATA_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json')

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
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    }

    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })

    let existing: unknown[] = []
    try {
      const fileContent = await fs.readFile(DATA_FILE, 'utf8')
      if (fileContent.trim()) {
        const parsed = JSON.parse(fileContent)
        existing = Array.isArray(parsed) ? parsed : []
      }
    } catch {
      existing = []
    }

    existing.push(entry)
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2))

    return NextResponse.json({ success: true, message: 'Message received successfully.' })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Unable to store the message right now.' },
      { status: 500 }
    )
  }
}

