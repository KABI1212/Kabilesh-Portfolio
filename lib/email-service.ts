import nodemailer from 'nodemailer'
import { EmailData, getAutoReplyEmailHtml, getNotificationEmailHtml } from './email-templates'

const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL?.trim() || 'kabileshkoffl@gmail.com'

export interface SendResult {
  notificationSent: boolean
  autoReplySent: boolean
  providerUsed: 'resend' | 'smtp' | 'none'
  error?: string
}

/**
 * Creates Nodemailer Transporter if SMTP environment variables are present.
 */
function createSmtpTransporter() {
  const host = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT?.trim() || '587', 10)
  const user = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim() || process.env.GMAIL_APP_PASSWORD?.trim()
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  if (!user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues on shared hosts
    },
  })
}

/**
 * Sends email via Resend HTTP API.
 */
async function sendViaResend(to: string, replyTo: string | undefined, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return false

  const from = process.env.RESEND_FROM_EMAIL?.trim() || 'Portfolio Contact <onboarding@resend.dev>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        html,
      }),
    })

    if (res.ok) {
      console.log(`[EmailService] Resend successfully delivered email to ${to}`)
      return true
    } else {
      const errText = await res.text()
      console.error(`[EmailService] Resend API error (${res.status}): ${errText}`)
      return false
    }
  } catch (err) {
    console.error('[EmailService] Resend fetch exception:', err)
    return false
  }
}

/**
 * Main dispatcher to send both Notification and Auto-Reply emails.
 */
export async function dispatchContactEmails(data: EmailData): Promise<SendResult> {
  let notificationSent = false
  let autoReplySent = false
  let providerUsed: 'resend' | 'smtp' | 'none' = 'none'
  let lastError: string | undefined

  const notificationSubject = `[Portfolio Contact] ${data.subject} - from ${data.name}`
  const notificationHtml = getNotificationEmailHtml(data)

  const autoReplySubject = `Thank you for contacting me - Kabilesh K`
  const autoReplyHtml = getAutoReplyEmailHtml(data.name)

  // 1. Try Resend API first if configured
  if (process.env.RESEND_API_KEY?.trim()) {
    providerUsed = 'resend'
    notificationSent = await sendViaResend(RECEIVER_EMAIL, data.email, notificationSubject, notificationHtml)
    if (notificationSent) {
      autoReplySent = await sendViaResend(data.email, RECEIVER_EMAIL, autoReplySubject, autoReplyHtml)
    } else {
      lastError = 'Resend delivery failed'
    }
  }

  // 2. Fall back to SMTP (Nodemailer) if Resend not used or failed
  if (!notificationSent) {
    const transporter = createSmtpTransporter()
    if (transporter) {
      providerUsed = 'smtp'
      const fromUser = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim() || RECEIVER_EMAIL
      const fromAddress = `"${data.name} via Portfolio" <${fromUser}>`

      try {
        // Send Notification email to Kabilesh
        const notifInfo = await transporter.sendMail({
          from: fromAddress,
          to: RECEIVER_EMAIL,
          replyTo: data.email,
          subject: notificationSubject,
          html: notificationHtml,
        })
        console.log(`[EmailService] SMTP notification sent: ${notifInfo.messageId}`)
        notificationSent = true

        // Send Auto-Reply email to Sender
        try {
          const replyInfo = await transporter.sendMail({
            from: `"Kabilesh K" <${fromUser}>`,
            to: data.email,
            replyTo: RECEIVER_EMAIL,
            subject: autoReplySubject,
            html: autoReplyHtml,
          })
          console.log(`[EmailService] SMTP auto-reply sent: ${replyInfo.messageId}`)
          autoReplySent = true
        } catch (autoReplyErr) {
          console.error('[EmailService] SMTP auto-reply error:', autoReplyErr)
        }
      } catch (smtpErr) {
        const errMsg = smtpErr instanceof Error ? smtpErr.message : String(smtpErr)
        console.error('[EmailService] SMTP transport error:', errMsg)
        lastError = `SMTP error: ${errMsg}`
      }
    }
  }

  if (providerUsed === 'none') {
    console.warn('[EmailService] No email provider configured (missing RESEND_API_KEY and SMTP_USER/PASS). Emails saved to DB.')
  }

  return {
    notificationSent,
    autoReplySent,
    providerUsed,
    error: lastError,
  }
}
