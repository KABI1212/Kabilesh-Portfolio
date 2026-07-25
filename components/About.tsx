'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const roles = ['Computer Science and Engineering Student', 'Software Developer', 'Fullstack Developer', 'AI Developer']

export default function About() {
  const sectionRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  const internships = [
    {
      role: 'Virtual Intern (Batch B-13)',
      company: 'Infosys Springboard',
      project: 'Strengthened software development and problem-solving skills through project-based learning',
      color: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/20',
      dot: 'bg-blue-400',
    },
    {
      role: 'SQL Intern',
      company: 'Intern Certify',
      project: 'Database queries and data management fundamentals',
      color: 'from-yellow-500/20 to-orange-500/20',
      border: 'border-yellow-500/20',
      dot: 'bg-yellow-400',
    },
    {
      role: 'Frontend Development Intern',
      company: 'Pumo Technovation',
      project: 'Hands-on experience implementing frontend concepts in real-world projects',
      color: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-500/20',
      dot: 'bg-blue-400',
    },
    {
      role: 'Web Development Intern',
      company: "Let's Gametech",
      project: 'Fundamentals of web development using HTML, CSS, and JavaScript',
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/20',
      dot: 'bg-emerald-400',
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-4 flex items-center gap-2"
        >
          <span className="w-6 h-px bg-blue-400 inline-block" />
          About Me
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT — Tagline (animated sequentially) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Headline — appears first */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
            >
              A Developer who{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                Builds things
              </span>{' '}
              that actually work...
            </motion.h2>

            {/* Quote — appears second */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#555] text-lg font-medium italic leading-relaxed"
            >
              &ldquo;Because if the code doesn&apos;t run, what else can?&rdquo;
            </motion.p>

            {/* Arrow & text — appears third */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-400 rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
              <span className="text-[#555] text-sm">Scroll to see my work</span>
            </motion.div>

            {/* Skills chips — appear one by one with stagger */}
            <div className="mt-10 flex flex-wrap gap-2">
              {['Java', 'SQL', 'JavaScript', 'HTML/CSS', 'MySQL', 'MongoDB', 'NLP', 'Generative AI'].map(
                (skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                    className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium"
                  >
                    {skill}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* RIGHT — About paragraph + typing + internships (staggered) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Typing role — appears first */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl font-semibold text-white"
            >
              I&apos;m a{' '}
              <span className="text-blue-300">
                {displayed}
                <span className="cursor-blink text-blue-400">|</span>
              </span>
            </motion.div>

            {/* About paragraph — appears second */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-[#888] leading-relaxed text-sm sm:text-base"
            >
              Final-year Computer Science Engineering student at{' '}
              <span className="text-white font-medium">V.S.B Engineering College, Karur</span>,
              passionate about Artificial Intelligence and Software Development. Skilled in Java,
              NLP, and Generative AI with hands-on experience building AI assistants and
              blockchain-based applications. Currently in placement season, eager to apply
              technical skills to innovative real-world projects.
            </motion.p>

            {/* Experience heading — appears third */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-[#555] text-xs font-medium tracking-widest uppercase mb-4">
                Experience
              </p>
              {/* Internship cards — each with its own delay */}
              <div className="space-y-3">
                {internships.map((item, i) => (
                  <motion.div
                    key={item.company}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.15 }}
                    className={`rounded-xl bg-gradient-to-r ${item.color} border ${item.border} p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 flex-shrink-0`} />
                      <div>
                        <p className="text-white font-semibold text-sm">{item.role}</p>
                        <p className="text-[#888] text-xs mt-0.5">@ {item.company}</p>
                        <p className="text-[#666] text-xs mt-1">{item.project}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA — appears last */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors group"
            >
              Let&apos;s work together
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}