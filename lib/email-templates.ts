/**
 * High-quality, responsive HTML email templates for Portfolio Contact requests.
 */

export interface EmailData {
  name: string
  email: string
  subject: string
  phone?: string
  company?: string
  message: string
  createdAt: string
  ip: string
  userAgent: string
}

/**
 * Notification Email HTML sent to Kabilesh (kabileshkoffl@gmail.com)
 */
export function getNotificationEmailHtml(data: EmailData): string {
  const { name, email, subject, phone, company, message, createdAt, ip, userAgent } = data

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact Request</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #05070d; color: #e2e8f0; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 30px; border-bottom: 2px solid #3b82f6; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 6px 0 0 0; color: #60a5fa; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; }
    .content { padding: 30px; }
    .grid { display: table; width: 100%; margin-bottom: 24px; }
    .row { display: table-row; }
    .cell-label { display: table-cell; padding: 10px 12px; font-weight: 600; color: #94a3b8; font-size: 13px; width: 140px; border-bottom: 1px solid #1e293b; text-transform: uppercase; letter-spacing: 0.5px; }
    .cell-val { display: table-cell; padding: 10px 12px; color: #f8fafc; font-size: 14px; border-bottom: 1px solid #1e293b; }
    .msg-box { background: #020617; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px; margin-top: 15px; }
    .msg-title { margin-top: 0; font-size: 14px; font-weight: 600; color: #60a5fa; text-transform: uppercase; letter-spacing: 1px; }
    .msg-text { font-size: 15px; line-height: 1.7; color: #f1f5f9; white-space: pre-wrap; margin: 0; }
    .cta-btn { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; margin-top: 25px; box-shadow: 0 4px 15px rgba(37,99,235,0.4); }
    .meta-footer { margin-top: 30px; padding-top: 20px; border-top: 1px dashed #334155; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Contact Request</h1>
      <p>Direct Message from Kabilesh's Portfolio</p>
    </div>
    <div class="content">
      <div class="grid">
        <div class="row">
          <div class="cell-label">Sender Name:</div>
          <div class="cell-val"><strong>${name}</strong></div>
        </div>
        <div class="row">
          <div class="cell-label">Email Address:</div>
          <div class="cell-val"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></div>
        </div>
        ${phone ? `<div class="row"><div class="cell-label">Phone:</div><div class="cell-val">${phone}</div></div>` : ''}
        ${company ? `<div class="row"><div class="cell-label">Company:</div><div class="cell-val">${company}</div></div>` : ''}
        <div class="row">
          <div class="cell-label">Subject:</div>
          <div class="cell-val">${subject}</div>
        </div>
        <div class="row">
          <div class="cell-label">Submitted On:</div>
          <div class="cell-val">${createdAt}</div>
        </div>
      </div>

      <div class="msg-box">
        <div class="msg-title">Message Body:</div>
        <p class="msg-text">${message}</p>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="cta-btn">Reply to ${name}</a>
      </div>

      <div class="meta-footer">
        <p style="margin: 3px 0;"><strong>IP Address:</strong> ${ip}</p>
        <p style="margin: 3px 0;"><strong>User Agent:</strong> ${userAgent}</p>
      </div>
    </div>
  </div>
</body>
</html>
`
}

/**
 * Auto-Reply Email HTML sent to the sender/recruiter
 */
export function getAutoReplyEmailHtml(name: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for reaching out!</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #05070d; color: #e2e8f0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); padding: 28px; border-bottom: 2px solid #3b82f6; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }
    .content { padding: 30px; font-size: 15px; line-height: 1.7; color: #cbd5e1; }
    .highlight-box { background: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 18px; margin: 20px 0; color: #93c5fd; }
    .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e293b; }
    .sig-name { font-size: 18px; font-weight: 700; color: #ffffff; font-style: italic; }
    .sig-title { font-size: 13px; color: #60a5fa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Message Received Successfully</h1>
    </div>
    <div class="content">
      <p>Hello <strong>${name}</strong>,</p>

      <p>Thank you for reaching out to me through my portfolio website!</p>

      <div class="highlight-box">
        I have received your message and will review it promptly. You can expect a response from me as soon as possible.
      </div>

      <p>If your matter is urgent, feel free to connect with me directly via LinkedIn or email.</p>

      <div class="signature">
        <div class="sig-name">Kabilesh K</div>
        <div class="sig-title">Computer Science & Engineering Student | Software Developer</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 6px;">
          Email: <a href="mailto:kabileshkoffl@gmail.com" style="color: #60a5fa;">kabileshkoffl@gmail.com</a> | 
          LinkedIn: <a href="https://linkedin.com/in/kabi-k" style="color: #60a5fa;">linkedin.com/in/kabi-k</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`
}
