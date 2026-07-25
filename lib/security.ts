/**
 * Security, sanitization, rate-limiting, and validation utilities
 * for the Portfolio Contact API.
 */

// In-memory rate limiting store (sliding window)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5 // max 5 submissions per 10 minutes per IP

/**
 * Checks whether an IP has exceeded the rate limit.
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []

  // Filter timestamps within the current sliding window
  const validTimestamps = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS)

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = validTimestamps[0]
    const resetMs = RATE_LIMIT_WINDOW_MS - (now - oldest)
    return { allowed: false, remaining: 0, resetMs }
  }

  validTimestamps.push(now)
  rateLimitMap.set(ip, validTimestamps)

  // Periodically clean up stale rate limit entries to prevent memory leaks
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key)
      }
    }
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - validTimestamps.length,
    resetMs: RATE_LIMIT_WINDOW_MS,
  }
}

/**
 * Sanitizes input string to prevent XSS, HTML injection, and control characters.
 */
export function sanitizeInput(input: unknown, maxLength: number = 2000): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // remove invisible control chars
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim()
    .slice(0, maxLength)
}

/**
 * Strict Email Validator RFC 5322 compliance wrapper
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return emailRegex.test(email)
}

/**
 * Phone number format validator (optional field)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true // optional
  const phoneCleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  return /^\d{7,15}$/.test(phoneCleaned)
}

export interface ContactPayload {
  name: string
  email: string
  subject?: string
  phone?: string
  company?: string
  message: string
  honeypot?: string
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
  sanitized: {
    name: string
    email: string
    subject: string
    phone: string
    company: string
    message: string
  }
}

/**
 * Validates and sanitizes the complete contact submission payload.
 */
export function validateContactSubmission(body: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {}

  // Check honeypot / bot detection
  const honeypot = typeof body.website_url === 'string' ? body.website_url.trim() : typeof body.bot_check === 'string' ? body.bot_check.trim() : ''
  if (honeypot.length > 0) {
    // Flag as spam bot
    return {
      valid: false,
      errors: { _bot: 'Spam detected' },
      sanitized: { name: '', email: '', subject: '', phone: '', company: '', message: '' },
    }
  }

  const name = sanitizeInput(body.name, 100)
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const subject = sanitizeInput(body.subject || 'Portfolio Contact Request', 150)
  const phone = sanitizeInput(body.phone, 30)
  const company = sanitizeInput(body.company, 100)
  const message = sanitizeInput(body.message, 3000)

  if (!name) {
    errors.name = 'Full name is required.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters long.'
  }

  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.'
  }

  if (phone && !isValidPhone(phone)) {
    errors.phone = 'Please provide a valid phone number.'
  }

  if (!message) {
    errors.message = 'Message content is required.'
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters long.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: { name, email, subject, phone, company, message },
  }
}
