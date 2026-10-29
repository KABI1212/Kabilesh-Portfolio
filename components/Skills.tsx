'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type AccentColor = 'green' | 'gold' | 'blue' | 'cyan' | 'silver'

interface SkillItem {
  name: string
  icon: string
  description: string
  accent: AccentColor
}

const colorConfig: Record<
  AccentColor,
  {
    border: string
    backBorder: string
    glow: string
    badge: string
    hint: string
    dot: string
    gradient: string
    topBar: string
  }
> = {
  green: {
    border: 'border-[#22C55E]/30 group-hover:border-[#22C55E]/80',
    backBorder: 'border-[#22C55E]/50',
    glow: 'group-hover:shadow-[0_0_24px_rgba(34,197,94,0.28)]',
    badge: 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/35',
    hint: 'text-[#22C55E]',
    dot: 'bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.8)]',
    gradient: 'from-[#22C55E]/10 via-transparent to-transparent',
    topBar: 'bg-[#22C55E]',
  },
  gold: {
    border: 'border-[#D4AF37]/30 group-hover:border-[#D4AF37]/80',
    backBorder: 'border-[#D4AF37]/50',
    glow: 'group-hover:shadow-[0_0_24px_rgba(212,175,55,0.28)]',
    badge: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35',
    hint: 'text-[#D4AF37]',
    dot: 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]',
    gradient: 'from-[#D4AF37]/10 via-transparent to-transparent',
    topBar: 'bg-[#D4AF37]',
  },
  blue: {
    border: 'border-[#3B82F6]/30 group-hover:border-[#3B82F6]/80',
    backBorder: 'border-[#3B82F6]/50',
    glow: 'group-hover:shadow-[0_0_24px_rgba(59,130,246,0.28)]',
    badge: 'bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/35',
    hint: 'text-[#3B82F6]',
    dot: 'bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]',
    gradient: 'from-[#3B82F6]/10 via-transparent to-transparent',
    topBar: 'bg-[#3B82F6]',
  },
  cyan: {
    border: 'border-[#06B6D4]/30 group-hover:border-[#06B6D4]/80',
    backBorder: 'border-[#06B6D4]/50',
    glow: 'group-hover:shadow-[0_0_24px_rgba(6,182,212,0.28)]',
    badge: 'bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/35',
    hint: 'text-[#06B6D4]',
    dot: 'bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.8)]',
    gradient: 'from-[#06B6D4]/10 via-transparent to-transparent',
    topBar: 'bg-[#06B6D4]',
  },
  silver: {
  border: 'border-[#C0C0C0]/30 group-hover:border-[#C0C0C0]/80',
  backBorder: 'border-[#C0C0C0]/50',
  glow: 'group-hover:shadow-[0_0_24px_rgba(192,192,192,0.28)]',
  badge: 'bg-[#C0C0C0]/15 text-[#C0C0C0] border border-[#C0C0C0]/35',
  hint: 'text-[#C0C0C0]',
  dot: 'bg-[#C0C0C0] shadow-[0_0_10px_rgba(192,192,192,0.8)]',
  gradient: 'from-[#C0C0C0]/10 via-transparent to-transparent',
  topBar: 'bg-[#C0C0C0]',
},
}

const technicalSkills: SkillItem[] = [
  {
    name: 'Java',
    icon: '☕',
    description: 'Object-oriented programming, robust backend business logic, and scalable API architecture.',
    accent: 'gold',
  },
  {
    name: 'HTML',
    icon: '🌐',
    description: 'Semantic page structure, modern accessibility standards, and clean web foundations.',
    accent: 'silver',
  },
  {
    name: 'CSS',
    icon: '🎨',
    description: 'Responsive layouts, custom grid/flexbox styling, and modern dark-mode aesthetic design.',
    accent: 'blue',
  },
  {
    name: 'JavaScript',
    icon: '⚡',
    description: 'Dynamic DOM interactions, asynchronous REST API requests, and modern ES6+ logic.',
    accent: 'cyan',
  },
  {
    name: 'React.js',
    icon: '⚛️',
    description: 'Component-driven UI architecture, reactive state management, and modern web apps.',
    accent: 'gold',
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    description: 'NoSQL document storage, flexible schema design, and high-performance collection queries.',
    accent: 'green',
  },
  {
    name: 'OOP Concepts',
    icon: '🧩',
    description: 'Encapsulation, abstraction, inheritance, and polymorphism for modular, maintainable code.',
    accent: 'silver',
  },
  {
    name: 'Generative AI',
    icon: '🤖',
    description: 'Integrating LLM capabilities, multi-provider model orchestration, and intelligent AI features.',
    accent: 'gold',
  },
  {
    name: 'Prompt Engineering',
    icon: '💬',
    description: 'Crafting structured, few-shot, and role-based prompts for optimal AI model responses.',
    accent: 'cyan',
  },
  {
    name: 'Git & GitHub',
    icon: '🐙',
    description: 'Version control, branching workflows, collaborative code reviews, and remote repository management.',
    accent: 'blue',
  },
]

const softSkills: SkillItem[] = [
  {
    name: 'Problem Solving',
    icon: '💡',
    description: 'Structured analytical approach to diagnosing bugs, optimizing algorithms, and resolving engineering bottlenecks.',
    accent: 'blue',
  },
  {
    name: 'Communication',
    icon: '🗣️',
    description: 'Articulating technical concepts clearly in collaborative, team-oriented environments.',
    accent: 'cyan',
  },
  {
    name: 'Adaptability',
    icon: '🔄',
    description: 'Rapidly learning emerging technologies, adapting to evolving stacks, and thriving under changes.',
    accent: 'gold',
  },
  {
    name: 'Time Management',
    icon: '⏱️',
    description: 'Prioritizing tasks efficiently, balancing deadlines, and delivering quality code consistently.',
    accent: 'green',
  },
  {
    name: 'Teamwork',
    icon: '🤝',
    description: 'Cross-functional synergy, active listening, and constructive pair-programming collaboration.',
    accent: 'silver',
  },
]

function SkillFlipCard({
  skill,
  index,
  isDuplicate = false,
}: {
  skill: SkillItem
  index: number
  isDuplicate?: boolean
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const config = colorConfig[skill.accent]

  // Subtle unique float timing per card to avoid synchronized movement
  const floatDuration = 3.8 + (index % 4) * 0.6
  const floatDelay = (index % 5) * 0.15

  return (
    <motion.div
      animate={{ y: [0, -3.5, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: floatDelay,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group w-44 sm:w-48 h-44 sm:h-48 flex-shrink-0 [perspective:1000px] cursor-pointer select-none"
      onClick={() => setIsFlipped((prev) => !prev)}
      tabIndex={isDuplicate ? -1 : 0}
      role={isDuplicate ? 'presentation' : 'button'}
      aria-hidden={isDuplicate ? true : undefined}
      aria-label={isDuplicate ? undefined : `${skill.name}. Click or hover to view details.`}
      onKeyDown={(e) => {
        if (!isDuplicate && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setIsFlipped((prev) => !prev)
        }
      }}
    >
      <div
        className={`relative w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none group-hover:[transform:rotateY(180deg)] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT SIDE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-[#171717]/85 backdrop-blur-md bg-gradient-to-b ${config.gradient} border ${config.border} shadow-lg ${config.glow} transition-all duration-300`}
        >
          {/* Top colored accent indicator */}
          <div
            className={`absolute top-0 inset-x-8 h-[2px] ${config.topBar} opacity-40 group-hover:opacity-100 transition-opacity`}
          />

          <span className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-115 filter drop-shadow-md">
            {skill.icon}
          </span>
          <h4 className="text-[#FFFFFF] text-sm sm:text-base font-semibold tracking-tight">
            {skill.name}
          </h4>
          <span
            className={`text-[10px] ${config.hint} uppercase tracking-wider mt-2.5 font-medium flex items-center gap-1 opacity-75 group-hover:opacity-100 transition-opacity`}
          >
          </span>
        </div>

        {/* BACK SIDE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center text-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#171717]/90 backdrop-blur-md bg-gradient-to-b ${config.gradient} border ${config.backBorder} shadow-xl ${config.glow}`}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">{skill.icon}</span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${config.badge}`}>
              {skill.name}
            </span>
          </div>
          <p className="text-[#BDBDBD] text-xs leading-relaxed">
            {skill.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Duplicate arrays for seamless CSS marquee looping
  const techTrackPrimary = technicalSkills
  const techTrackDuplicate = technicalSkills

  // Soft skills track duplicated to maintain generous width and seamless left-to-right looping
  const softTrackPrimary = [...softSkills, ...softSkills]
  const softTrackDuplicate = [...softSkills, ...softSkills]

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      {/* Embedded CSS for smooth hardware-accelerated continuous movement with hover-pause */}
      <style>{`
        @keyframes marquee-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .skills-marquee-container {
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .skills-marquee-track-left {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-scroll-left 34s linear infinite;
        }
        .skills-marquee-track-right {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: marquee-scroll-right 30s linear infinite;
        }
        .skills-marquee-container:hover .skills-marquee-track-left,
        .skills-marquee-container:hover .skills-marquee-track-right {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-marquee-track-left,
          .skills-marquee-track-right {
            animation: none !important;
            transform: none !important;
            flex-wrap: wrap;
            justify-content: center;
            width: 100% !important;
          }
        }
      `}</style>

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

      {/* Atmospheric ambient glows */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[#3B82F6] text-xs font-medium tracking-widest uppercase mb-3 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-[#3B82F6] inline-block" />
          Skills & Proficiencies
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] mb-3"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#06B6D4] to-[#D4AF37]">
            Tech Stack & Skills
          </span>
        </motion.h2>
      </div>

      <div className="space-y-14 relative z-10">
        {/* 1. TECHNICAL SKILLS — Moves Right to Left */}
        <div>
          <div className="max-w-7xl mx-auto px-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                Technical Skills
              </h3>
            </motion.div>
          </div>

          {/* Marquee Row Container */}
          <div className="skills-marquee-container relative w-full overflow-hidden py-4">
            <div className="skills-marquee-track-left">
              {/* Primary Accessible Track */}
              {techTrackPrimary.map((skill, index) => (
                <SkillFlipCard
                  key={`tech-primary-${skill.name}`}
                  skill={skill}
                  index={index}
                />
              ))}

              {/* Duplicated Track for Continuous Seamless Loop (Hidden from screen readers) */}
              {techTrackDuplicate.map((skill, index) => (
                <SkillFlipCard
                  key={`tech-dup-${skill.name}`}
                  skill={skill}
                  index={index + 10}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. SOFT SKILLS — Moves Left to Right */}
        <div>
          <div className="max-w-7xl mx-auto px-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                Soft Skills
              </h3>
            </motion.div>
          </div>

          {/* Marquee Row Container */}
          <div className="skills-marquee-container relative w-full overflow-hidden py-4">
            <div className="skills-marquee-track-right">
              {/* Primary Accessible Track */}
              {softTrackPrimary.slice(0, 5).map((skill, index) => (
                <SkillFlipCard
                  key={`soft-primary-${skill.name}`}
                  skill={skill}
                  index={index}
                />
              ))}

              {/* Duplicated Tracks for Continuous Seamless Loop (Hidden from screen readers) */}
              {softTrackDuplicate.slice(0, 15).map((skill, index) => (
                <SkillFlipCard
                  key={`soft-dup-${skill.name}-${index}`}
                  skill={skill}
                  index={index + 5}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}