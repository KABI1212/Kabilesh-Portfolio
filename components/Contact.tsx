'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Utility: copy to clipboard ── */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}

/* ── Floating field component ── */
function FloatingField({
  label,
  name,
  type = 'text',
  required = true,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string | null
  maxLength?: number
}) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)

  const isActive = focused || value.length > 0
  const Component = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none select-none z-10 ${
          isActive ? 'top-2 text-[10px] text-blue-400' : 'top-3 text-sm text-[#555]'
        }`}
      >
        {label}
      </label>
      <Component
        ref={inputRef as any}
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        rows={type === 'textarea' ? 5 : undefined}
        maxLength={maxLength}
        autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : undefined}
        className={`w-full px-4 pt-5 pb-3 rounded-xl bg-[#111] border transition-all duration-200 text-white text-sm placeholder-transparent focus:outline-none ${
          error ? 'border-red-500/60 focus:border-red-400' : 'border-white/8 focus:border-blue-500/50 focus:bg-blue-500/5'
        } ${type === 'textarea' ? 'resize-none' : ''}`}
        style={{ lineHeight: '1.5' }}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {maxLength && (
        <span className="absolute bottom-2 right-3 text-[10px] text-[#444]">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  )
}

/* ── Particle data type ── */
interface Particle {
  width: number
  height: number
  top: string
  left: string
  delay: number
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [copied, setCopied] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  // ✅ Generate random particles ONLY on the client (after mount)
  useEffect(() => {
    const arr: Particle[] = Array.from({ length: 6 }).map(() => ({
      width: 4 + Math.random() * 6,
      height: 4 + Math.random() * 6,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2, // used to stagger animations
    }))
    setParticles(arr)
  }, [])

  const email = 'kabileshkoffl@gmail.com'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'name' && !value.trim()) return 'Name is required'
    if (name === 'email') {
      if (!value.trim()) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format'
    }
    if (name === 'message' && !value.trim()) return 'Message is required'
    return undefined
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const err = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    }
    setErrors(newErrors)
    if (newErrors.name || newErrors.email || newErrors.message) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Unable to send message')
      }

      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleCopyEmail = useCallback(async () => {
    const success = await copyToClipboard(email)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  const contactLinks = [
    {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/kabi-k',
      href: 'https://linkedin.com/in/kabi-k',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'github.com/KABI1212',
      href: 'https://github.com/KABI1212',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Background orbs & particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Render particles only after they are generated on the client */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: p.top,
              left: p.left,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 4 + p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-blue-400 inline-block" />
          Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
        >
          Let&apos;s{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
            Work Together
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#555] text-sm max-w-md mb-14"
        >
          I&apos;m currently open to internship and full‑time opportunities. Whether you have a
          project in mind or just want to say hi — my inbox is always open.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — contact links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2 }}
                className="group relative rounded-xl bg-[#111] border border-white/8 p-4 flex items-center gap-4 transition-all duration-300"
              >
                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(100deg, rgba(59,130,246,0.15) 0%, rgba(56,189,248,0.15) 100%)',
                    padding: '1px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                  }}
                />
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center gap-4"
                  aria-label={`Contact via ${link.label}: ${link.value}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-[#555] text-xs font-medium tracking-wide uppercase">{link.label}</p>
                    <p className="text-white text-sm font-medium mt-0.5">{link.value}</p>
                  </div>
                </a>
                {link.label === 'Email' && (
                  <button
                    onClick={handleCopyEmail}
                    className="relative ml-auto p-2 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? (
                      <motion.svg
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 text-green-400"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : (
                      <svg className="w-4 h-4 text-[#444] group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                )}
                {link.label !== 'Email' && (
                  <svg
                    className="w-4 h-4 text-[#444] ml-auto group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              whileHover={{ scale: 1.02 }}
              className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20 group cursor-default"
              title="I'm actively looking for new opportunities"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <p className="text-green-400 text-sm font-medium">
                Available for internships &amp; full‑time roles
              </p>
            </motion.div>
          </motion.div>

          {/* Right — contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <FloatingField
                label="Name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
              />
              <FloatingField
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
              />
            </div>

            <FloatingField
              label="Message *"
              name="message"
              type="textarea"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              maxLength={500}
            />

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="relative w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-500 hover:-translate-y-0.5 disabled:hover:translate-y-0"
            >
              {status === 'sending' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : status === 'sent' ? (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent!
                </motion.span>
              ) : (
                'Send Message'
              )}
            </button>

            <AnimatePresence>
              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-xs text-center flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs text-center flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Unable to send. Please email me directly.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}