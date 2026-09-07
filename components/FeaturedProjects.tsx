'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const toFiniteNumber = (value: number | string | undefined, fallback: number) => {
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

/* ─────────────────────────────────────────
   PROJECT 1 — NOVA AI chatbot-style animation
───────────────────────────────────────── */
function PriceCheckerAnim({ isVisible }: { isVisible: boolean }) {
  const messages = [
    { from: 'bot', text: 'Hi, I’m NOVA AI — I can help with planning, workflows, and instant answers.' },
    { from: 'user', text: 'Show me the latest project progress and the next action items.' },
    { from: 'bot', text: 'Absolutely — I’ll organize it into priorities, blockers, and clean next steps.' },
  ]

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            'radial-gradient(circle at 25% 20%, rgba(34,211,238,0.26), transparent 32%), radial-gradient(circle at 78% 12%, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at 50% 100%, rgba(14,165,233,0.18), transparent 40%)',
        }}
      />

      <motion.div
        className="relative w-[82%] h-[82%] rounded-[30px] border border-cyan-300/20 bg-slate-950/85 shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_20px_60px_rgba(14,165,233,0.18)]"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between border-b border-cyan-400/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/15 ring-1 ring-cyan-300/35">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">NOVA AI</div>
              <div className="text-[9px] text-cyan-100/55">assistant</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] text-cyan-100/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            online
          </div>
        </div>

        <div className="space-y-3 px-4 py-4">
          {messages.map((message, i) => (
            <motion.div
              key={`${message.from}-${i}`}
              className={`flex ${message.from === 'bot' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, x: message.from === 'bot' ? -12 : 12, y: 8 }}
              animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: message.from === 'bot' ? -12 : 12, y: 8 }}
              transition={{ duration: 0.45, delay: 0.15 + i * 0.18 }}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] leading-5 ${message.from === 'bot'
                  ? 'border border-cyan-400/15 bg-cyan-400/10 text-cyan-50'
                  : 'bg-white/10 text-white/90'
                  }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}

          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, x: -12 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.45, delay: 0.75 }}
          >
            <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/10 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                  animate={isVisible ? { opacity: [0.35, 1, 0.35], y: [0, -1, 0] } : { opacity: 0.35 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300/80"
                  animate={isVisible ? { opacity: [0.35, 1, 0.35], y: [0, -1, 0] } : { opacity: 0.35 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
                />
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300/60"
                  animate={isVisible ? { opacity: [0.35, 1, 0.35], y: [0, -1, 0] } : { opacity: 0.35 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-x-4 bottom-4 rounded-2xl border border-cyan-300/15 bg-white/[0.03] px-3 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          <div className="flex items-center justify-between gap-3 text-[10px] text-cyan-100/70">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
              <span>Ask NOVA AI</span>
            </div>
            <span className="rounded-full bg-cyan-400/15 px-2 py-1 text-[9px] text-cyan-200">Live</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-4 top-4 rounded-xl px-3 py-2 text-xs"
        style={{ background: 'rgba(56,189,248,0.12)', border: '1px solid rgba(125,211,252,0.35)', backdropFilter: 'blur(8px)' }}
        animate={isVisible ? { y: [0, -4, 0], scale: [1, 1.03, 1] } : { y: 0, scale: 1 }}
        transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-cyan-300 font-semibold">⚡ Chat-ready</p>
        <p className="text-white/55" style={{ fontSize: 9 }}>real assistant flow</p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PROJECT 2 — SecureChain animation (blockchain)
───────────────────────────────────────── */
function BlockchainAnim({ isVisible }: { isVisible: boolean }) {
  const blocks = [
    { x: 30, y: 30, label: 'TX', color: '#34d399' },
    { x: 60, y: 50, label: '🔗', color: '#60a5fa' },
    { x: 30, y: 70, label: 'TX', color: '#f97316' },
    { x: 60, y: 90, label: '🔗', color: '#a78bfa' },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {blocks.map((b, i) => (
          <motion.line
            key={i}
            x1={toFiniteNumber(b.x, 0)}
            y1={toFiniteNumber(b.y, 0)}
            x2={toFiniteNumber(blocks[(i + 1) % blocks.length].x, 0)}
            y2={toFiniteNumber(blocks[(i + 1) % blocks.length].y, 0)}
            stroke="rgba(52,211,153,0.3)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: i * 0.2 }}
          />
        ))}
        {blocks.map((b, i) => (
          <g key={i}>
            <rect
              x={toFiniteNumber(b.x - 10, 0)}
              y={toFiniteNumber(b.y - 7, 0)}
              width={toFiniteNumber(20, 20)}
              height={toFiniteNumber(14, 14)}
              rx={toFiniteNumber(3, 3)}
              fill="rgba(52,211,153,0.08)"
              stroke={b.color}
              strokeWidth="0.8"
              filter="url(#glow)"
            />
            <text
              x={toFiniteNumber(b.x, 0)}
              y={toFiniteNumber(b.y + 3, 0)}
              textAnchor="middle"
              fill={b.color}
              fontSize="6"
              fontWeight="bold"
            >
              {b.label}
            </text>
          </g>
        ))}
      </svg>
      <motion.div
        className="absolute bottom-4 right-4 rounded-xl px-3 py-2 text-xs"
        style={{
          background: 'rgba(52,211,153,0.1)',
          border: '1px solid rgba(52,211,153,0.3)',
          backdropFilter: 'blur(8px)',
        }}
        animate={isVisible ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-emerald-400 font-semibold">🔒 Block #847291</p>
        <p className="text-white/40" style={{ fontSize: 9 }}>
          Verified & Immutable
        </p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   PROJECT 3 — ImpactSense animation (earthquake)
───────────────────────────────────────── */
function EarthquakeAnim({ isVisible }: { isVisible: boolean }) {
  const waves = [1, 2, 3, 4]
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {waves.map((w) => (
          <motion.div
            key={w}
            className="absolute rounded-full border border-orange-500/40"
            style={{ width: `${w * 22}%`, height: `${w * 22}%` }}
            animate={
              isVisible
                ? {
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.1, 0.6],
                  }
                : {}
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: w * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 border border-orange-400/60 shadow-[0_0_24px_rgba(249,115,22,0.4)]"
        animate={isVisible ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <span className="text-2xl">⚡</span>
      </motion.div>
      <motion.div
        className="absolute top-4 left-4 rounded-xl px-3 py-2 text-xs"
        style={{
          background: 'rgba(249,115,22,0.1)',
          border: '1px solid rgba(249,115,22,0.3)',
          backdropFilter: 'blur(8px)',
        }}
        animate={isVisible ? { y: [0, -3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="text-orange-400 font-semibold">📍 Magnitude 6.4</p>
        <p className="text-white/40" style={{ fontSize: 9 }}>
          Predicted epicenter detected
        </p>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Data — three projects
───────────────────────────────────────── */
const featured = [
  {
    label: 'Featured Project',
    title: 'NOVA AI — Intelligent Assistant',
    description:
      'Developed an AI-powered assistant integrating multiple AI providers for automated response generation and task handling. Deployed as a full-stack production app with a FastAPI backend and React frontend.',
    tech: ['Python', 'FastAPI', 'React', 'REST APIs', 'Generative AI', 'Prompt Engineering'],
    link: 'https://github.com/KABI1212/NOVA-AI',
    liveLink: 'https://nova-ai-virid-three.vercel.app/',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    accentRgb: '37,99,235',
    highlights: [
      'Multi-Provider AI Response Generation',
      'FastAPI Backend + React Frontend',
      'Deployed on Vercel & Render',
      'Automated Task Handling',
    ],
    Animation: PriceCheckerAnim,
  },
  {
    label: 'Featured Project',
    title: 'Blockchain & Cybersecurity:Securechain',
    description:
      'Team project delivering a blockchain-based cybersecurity system providing secure transactions, decentralized authentication, and intelligent threat detection through hashing and encryption.',
    tech: ['Python', 'Blockchain', 'Cryptography', 'Flask', 'React', 'Solidity'],
    link: 'https://github.com/KABI1212/Blockchain-and-Cybersecurity-SecureChain',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    accentRgb: '52,211,153',
    highlights: [
      'Secure Transactions via Hashing & Encryption',
      'Decentralized Authentication',
      'Intelligent Threat Detection',
      'Flask + React + Solidity Smart Contracts',
    ],
    Animation: BlockchainAnim,
  },
  {
    label: 'Featured Project',
    title: 'Impatsense — Earthquake Prediction',
    description:
      'AI-driven earthquake prediction model analyzing seismic data to forecast magnitude and location. Built with Python and deep learning, achieving high accuracy on historical datasets.',
    tech: ['Python', 'TensorFlow', 'Seismic Data', 'LSTM', 'Geospatial Analysis'],
    link: 'https://github.com/KABI1212/ImpactSense-Earthquake-Impact-Prediction-.git',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    accentRgb: '249,115,22',
    highlights: [
      'Real-time seismic data processing',
      'LSTM-based magnitude prediction',
      'Geospatial visualisation dashboard',
      'Early warning alert system',
    ],
    Animation: EarthquakeAnim,
  },
]

/* ─────────────────────────────────────────
   ProjectCard (hooks inside component)
───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-120px' })
  const { Animation } = project
  const isNovaAi = project.title === 'NOVA AI — Intelligent Assistant'

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
    >
      {/* Left – text */}
      <div>
        <p className="text-[#555] text-xs font-medium tracking-widest uppercase mb-3">{project.label}</p>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{project.title}</h3>
        <p className="text-[#777] text-sm sm:text-base leading-relaxed mb-6">{project.description}</p>
        <ul className="space-y-2 mb-8">
          {project.highlights.map((h: string) => (
            <li key={h} className="flex items-center gap-2 text-sm text-[#888]">
              <span className={`w-1.5 h-1.5 rounded-full ${project.accentColor.replace('text-', 'bg-')} flex-shrink-0`} />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <motion.span
              key={t}
              whileHover={{ scale: 1.05, backgroundColor: `rgba(${project.accentRgb},0.2)` }}
              className={`px-3 py-1 rounded-full bg-white/5 border border-white/[0.08] ${project.accentColor} text-xs font-medium transition-colors`}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={isNovaAi ? { y: -2, scale: 1.02 } : undefined}
            className={`inline-flex items-center gap-2 ${project.accentColor} text-sm font-semibold hover:opacity-80 transition-opacity group`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </motion.a>
          {project.liveLink && (
            <motion.a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={isNovaAi ? { y: -2, scale: 1.02 } : undefined}
              className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:opacity-80 transition-opacity group"
            >
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Right – animation (clickable) */}
      <motion.a
        href={project.liveLink || project.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={isNovaAi ? { y: -4, scale: 1.01 } : undefined}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative group cursor-pointer block"
      >
        <div
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: `radial-gradient(ellipse, rgba(${project.accentRgb},0.25) 0%, transparent 70%)` }}
        />
        <div
          className={`relative rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-500 ${isNovaAi ? 'group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_22px_70px_rgba(56,189,248,0.2)]' : ''}`}
          style={{
            background: `linear-gradient(135deg, rgba(${project.accentRgb},0.1) 0%, rgba(8,6,18,0.95) 100%)`,
            border: `1.5px solid rgba(${project.accentRgb},0.25)`,
            boxShadow: `0 20px 60px rgba(${project.accentRgb},0.12)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <Animation isVisible={isInView} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold tracking-wide px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
              View Project
            </span>
          </div>

          {/* Corner accents */}
          <span className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${project.accentRgb},0.5)`, borderLeft: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '3px 0 0 0' }} />
          <span className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRight: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 3px 0 0' }} />
          <span className="absolute bottom-3 left-3 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${project.accentRgb},0.5)`, borderLeft: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 0 0 3px' }} />
          <span className="absolute bottom-3 right-3 w-4 h-4" style={{ borderBottom: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRight: `1.5px solid rgba(${project.accentRgb},0.5)`, borderRadius: '0 0 3px 0' }} />
        </div>
      </motion.a>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   Parent component
───────────────────────────────────────── */
export default function FeaturedProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-blue-400 inline-block" />
              Featured Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-white"
            >
              Projects I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                Proud Of
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-white/40 text-xs font-medium tracking-wide">
              {featured.length} PROJECTS
            </span>
          </motion.div>
        </div>

        <div className="space-y-28">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}