'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'AI/ML Engineer',
  'Software Developer',
  'Problem Solver',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/[0.08] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 flex items-center gap-2 justify-center lg:justify-start"
            >
              <span className="w-8 h-px bg-blue-400 inline-block" />
              Hello! I Am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4"
            >
              <span className="font-calligraphy text-6xl sm:text-7xl lg:text-8xl font-normal">Kabilesh</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-calligraphy text-6xl sm:text-7xl lg:text-8xl font-normal">
                K
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-6"
            >
              <span className="text-[#888] text-lg sm:text-xl">I&apos;m a </span>
              <span className="text-blue-300 text-lg sm:text-xl font-semibold">
                {displayed}
                <span className="cursor-blink text-blue-400">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-[#666] text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Final-Year B.E. CSE Student at V.S.B Engineering College, Karur.
              Building AI assistants, blockchain solutions and practical software applications with Java, Python and web technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: '4+', label: 'Projects Built' },
                { value: '4', label: 'Internships' },
                { value: '10+', label: 'Certifications' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[#555] text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative flex-shrink-0 flex items-center justify-center"
            style={{ width: 360, height: 360 }}
          >
            {/* ── Outer faint dashed orbit ── */}
            <div
              className="absolute rounded-full border border-dashed border-blue-500/15"
              style={{ width: 360, height: 360 }}
            />

            {/* ── Middle orbit ring (slow spin) ── */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full"
              style={{
                width: 310,
                height: 310,
                border: '1.5px dashed rgba(139,92,246,0.25)',
              }}
            >
              {/* Orbital dot top */}
              <span
                className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60"
                style={{ top: -5, left: '50%', transform: 'translateX(-50%)' }}
              />
              {/* Orbital dot bottom */}
              <span
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-300/60"
                style={{ bottom: -4, left: '50%', transform: 'translateX(-50%)' }}
              />
            </motion.div>

            {/* ── Glowing arc ring (counter-spin) ── */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute"
              style={{ width: 270, height: 270 }}
            >
              <svg width="270" height="270" viewBox="0 0 270 270" fill="none">
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                    <stop offset="40%" stopColor="#2563eb" stopOpacity="1" />
                    <stop offset="70%" stopColor="#60a5fa" stopOpacity="1" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                  </linearGradient>
                  <filter id="arcGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* 270° arc */}
                <path
                  d="M 135 8 A 127 127 0 1 1 8.5 100"
                  stroke="url(#arcGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#arcGlow)"
                />
              </svg>
            </motion.div>

            {/* ── Inner glow backdrop ── */}
            <div
              className="absolute rounded-full"
              style={{
                width: 220,
                height: 220,
                background:
                  'radial-gradient(circle, rgba(109,40,217,0.25) 0%, rgba(109,40,217,0.08) 60%, transparent 100%)',
                filter: 'blur(12px)',
              }}
            />

            {/* ── Main profile circle ── */}
            <div
              className="relative rounded-full flex items-center justify-center float-animation"
              style={{
                width: 210,
                height: 210,
                background:
                  'linear-gradient(135deg, #1e1b4b 0%, #1a1035 50%, #0f0a1e 100%)',
                border: '2px solid rgba(139,92,246,0.45)',
                boxShadow:
                  '0 0 40px rgba(109,40,217,0.35), 0 0 80px rgba(109,40,217,0.15), inset 0 0 30px rgba(109,40,217,0.1)',
              }}
            >
              {/* Inner subtle grid */}
              <div
                className="absolute inset-0 rounded-full opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              />

              <div className="relative text-center z-10">
                <p
                  className="font-black tracking-tight leading-none"
                  style={{
                    fontSize: '52px',
                    background: 'linear-gradient(135deg, #c4b5fd 0%, #60a5fa 50%, #2563eb 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                    filter: 'drop-shadow(0 0 12px rgba(167,139,250,0.5))',
                  }}
                >
                  KK
                </p>
                <p className="text-[10px] tracking-[0.3em] text-blue-400/60 mt-1 uppercase">
                  Portfolio
                </p>
              </div>

              {/* Corner tick marks */}
              {[0, 90, 180, 270].map((deg) => (
                <span
                  key={deg}
                  className="absolute w-3 h-0.5 bg-blue-500/40 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${deg}deg) translateX(90px) translateY(-50%)`,
                  }}
                />
              ))}
            </div>

            {/* ── Floating badge: Open to Work ── */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
              className="absolute"
              style={{ top: 28, right: -16 }}
            >
              <div
                className="rounded-2xl px-4 py-3 shadow-2xl"
                style={{
                  background: 'rgba(15,12,30,0.92)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)',
                  minWidth: 148,
                }}
              >
                <p className="text-[11px] text-[#666] font-medium mb-0.5">Currently</p>
                <p className="text-[15px] font-bold text-white leading-tight">Open to Work</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60" />
                  <span className="text-[12px] text-emerald-400 font-semibold">Available</span>
                </div>
              </div>
            </motion.div>

            {/* ── Floating badge: Location ── */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
              className="absolute"
              style={{ bottom: 32, left: -20 }}
            >
              <div
                className="rounded-2xl px-4 py-3 shadow-2xl"
                style={{
                  background: 'rgba(15,12,30,0.92)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.08)',
                  minWidth: 140,
                }}
              >
                <p className="text-[11px] text-[#666] font-medium mb-0.5 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </p>
                <p className="text-[15px] font-bold text-white leading-tight">Tamil Nadu, IN</p>
              </div>
            </motion.div>

            {/* ── Small floating tech pill ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute"
              style={{ bottom: 10, right: 10 }}
            >
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(109,40,217,0.18)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-[11px]">⚡</span>
                <span className="text-[11px] text-blue-300 font-semibold">Full Stack</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#444] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
      </motion.div>
    </section>
  )
}
