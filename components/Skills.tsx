'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: 'Java', icon: '☕' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'SQL', icon: '🗄️' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'NLP', icon: '🧠' },
  { name: 'Generative AI', icon: '🤖' },
  { name: 'Prompt Engineering', icon: '💬' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Blockchain', icon: '⛓️' },
  { name: 'Cryptography', icon: '🔐' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Cybersecurity', icon: '🛡️' },
  { name: 'Problem Solving', icon: '🧩' },
  { name: 'Teamwork', icon: '🤝' },
  { name: 'Communication', icon: '💬' },
  { name: 'Time Management', icon: '⏱️' },
  { name: 'Adaptability', icon: '🔄' },
]

const middle = Math.ceil(skills.length / 2)

const skillsRow1 = skills.slice(0, middle)
const skillsRow2 = skills.slice(middle)

function MarqueeRow({ items, direction = 'left' }: { items: typeof skillsRow1; direction?: 'left' | 'right' }) {
  // Triple the items to ensure seamless looping
  const duplicatedItems = [...items, ...items, ...items]
  
  return (
    <div className="flex overflow-hidden gap-4 py-2 relative">
      <motion.div
        className="flex gap-4 flex-shrink-0"
        animate={{
          x: direction === 'left' 
            ? ['0%', '-33.33%']  // Move left by one-third of total width
            : ['-33.33%', '0%']   // Move right by one-third of total width
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {duplicatedItems.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all duration-200 cursor-default flex-shrink-0 shadow-sm dark:shadow-none"
          >
            <span className="text-lg">{skill.icon}</span>
            <span className="text-slate-700 dark:text-[#888] text-sm font-medium whitespace-nowrap hover:text-slate-900 dark:hover:text-white transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-blue-500 dark:text-blue-400 text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-blue-500 dark:bg-blue-400 inline-block" />
          Skills & Tools
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
            Tech Stack
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 dark:text-[#555] text-sm"
        >
          Technologies and tools I work with regularly.
        </motion.p>
      </div>

      {/* Continuous marquee rows with no gaps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4 overflow-hidden"
      >
        {/* Row 1 moves LEFT continuously */}
        <MarqueeRow items={skillsRow1} direction="left" />
        
        {/* Row 2 moves RIGHT continuously */}
        <MarqueeRow items={skillsRow2} direction="right" />
      </motion.div>
    </section>
  )
}