'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const education = [
  {
    degree: 'B.E. — Computer Science and Engineering',
    institution: 'V.S.B Engineering College',
    location: 'Karur, Tamil Nadu',
    period: '2023 – 2027',
    status: 'Final Year',
    description:
      'Pursuing Computer Science Engineering with a focus on Artificial Intelligence and Software Development. CGPA: 7.30 (till VI semester).',
    highlights: ['Java', 'AI/ML', 'NLP', 'Generative AI', 'DBMS', 'OOP'],
    gradient: 'from-blue-600/20 via-blue-500/10 to-indigo-600/20',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
    dotGlow: 'rgba(96,165,250,0.4)',
    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accent: '#60a5fa',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Veveaham Matric Higher Secondary School',
    location: 'Dharapuram, Tamil Nadu',
    period: '2023',
    status: 'Completed',
    description: 'Completed higher secondary education with a percentage of 68.33%.',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
    gradient: 'from-blue-600/20 via-cyan-500/10 to-teal-600/20',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
    dotGlow: 'rgba(96,165,250,0.3)',
    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    accent: '#38bdf8',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Veveaham Matric Higher Secondary School',
    location: 'Dharapuram, Tamil Nadu',
    period: '2021',
    status: 'Completed',
    description: 'Completed secondary education with a strong foundation in science and mathematics.',
    highlights: ['Mathematics', 'Science', 'English', 'Social Science'],
    gradient: 'from-emerald-600/20 via-green-500/10 to-teal-600/20',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
    dotGlow: 'rgba(52,211,153,0.35)',
    badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    accent: '#34d399',
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Dynamic background glow */}
      <motion.div
        className="absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-blue-400 inline-block" />
          Education
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-14"
        >
          Academic{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
            Background
          </span>
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line with animated dash */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-blue-400/80 rounded-full"
              style={{ height: '0%' }}
              animate={{ height: isInView ? '100%' : '0%' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>

          <div className="space-y-8">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                className="relative sm:pl-16 group"
              >
                {/* Timeline dot with pulse */}
                <div className={`absolute left-4 top-6 hidden sm:block z-10`}>
                  <motion.div
                    className={`w-5 h-5 rounded-full ${item.dot} border-4 border-[#0a0a0a] shadow-[0_0_12px_${item.dotGlow}]`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  {/* Pulse ring */}
                  {i === 0 && (
                    <motion.div
                      className="absolute -inset-1.5 rounded-full border-2 border-blue-400/40"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </div>

                {/* Card with hover lift and glow */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} p-6 relative overflow-hidden`}
                  style={{ transition: 'box-shadow 0.3s ease' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px -8px ${item.accent}20, 0 0 0 1px ${item.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 3s infinite',
                    }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-1">
                        {item.degree}
                      </h3>
                      <p className="text-[#888] text-sm font-medium">{item.institution}</p>
                      <p className="text-[#555] text-xs mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {item.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${item.badge} backdrop-blur-sm`}>
                        {item.status}
                      </span>
                      <span className="text-[#555] text-xs font-mono">{item.period}</span>
                    </div>
                  </div>

                  <p className="text-[#777] text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* Subject chips with color accent */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <motion.span
                        key={h}
                        whileHover={{ scale: 1.1, backgroundColor: `rgba(${hexToRgb(item.accent)},0.2)`, borderColor: item.accent }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-[#888] text-xs font-medium transition-colors cursor-default"
                        style={{ transition: 'background-color 0.2s, border-color 0.2s' }}
                      >
                        {h}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Inject keyframes for shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}

// Helper to convert hex color to RGB string for dynamic styling
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}