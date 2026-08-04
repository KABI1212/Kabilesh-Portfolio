'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface GithubUserData {
  login: string
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  public_gists: number
  created_at: string
}

export default function GithubSection() {
  const [userData, setUserData] = useState<GithubUserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'heatmap' | 'graph' | 'stats'>('heatmap')

  useEffect(() => {
    fetch('https://api.github.com/users/KABI1212')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('GitHub API error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-[#0d1117]/60">
      {/* Background glow ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Live GitHub Activity & Open Source
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Contributions & Stats</span>
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto text-base sm:text-lg">
            Real-time insights into my open-source activity, coding contributions, and repository analytics on GitHub.
          </p>
        </motion.div>

        {/* Live Profile Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-2xl bg-[#161b22]/70 border border-white/10 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 group"
          >
            <div className="text-3xl font-extrabold text-blue-400 mb-1 group-hover:scale-105 transition-transform">
              {loading ? '...' : userData?.public_repos ?? 0}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-400">Public Repositories</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-[#161b22]/70 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <div className="text-3xl font-extrabold text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
              {loading ? '...' : userData?.followers ?? 0}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-400">GitHub Followers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-[#161b22]/70 border border-white/10 backdrop-blur-md hover:border-indigo-500/50 transition-all duration-300 group"
          >
            <div className="text-3xl font-extrabold text-indigo-400 mb-1 group-hover:scale-105 transition-transform">
              {loading ? '...' : userData?.following ?? 0}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-400">Following</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl bg-[#161b22]/70 border border-white/10 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300 group"
          >
            <div className="text-3xl font-extrabold text-emerald-400 mb-1 group-hover:scale-105 transition-transform">
              {loading ? '...' : userData?.public_gists ?? 0}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-400">Public Gists</div>
          </motion.div>
        </div>

        {/* Tab Controls for Activity Visualization */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-[#161b22] border border-white/10">
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'heatmap'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Contribution Heatmap
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'graph'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Commit Graph
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Profile Analytics
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#161b22]/80 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300">
          {activeTab === 'heatmap' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-4 overflow-x-auto"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                GitHub Contribution Grid Calendar
              </h3>
              <div className="p-4 rounded-2xl bg-[#0d1117] border border-white/5 w-full max-w-4xl flex justify-center items-center overflow-x-auto">
                <img
                  src="https://ghchart.rshah.org/38bdf8/KABI1212"
                  alt="KABI1212 GitHub Contribution Graph"
                  className="min-w-[650px] max-w-full h-auto filter drop-shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Showing live commit activity for user <span className="text-blue-400 font-mono">@KABI1212</span> over the past year.
              </p>
            </motion.div>
          )}

          {activeTab === 'graph' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Activity Trend Graph</h3>
              <div className="w-full max-w-4xl p-2 rounded-2xl bg-[#0d1117] border border-white/5 flex justify-center overflow-x-auto">
                <img
                  src="https://github-readme-activity-graph.vercel.app/graph?username=KABI1212&theme=github-compact&bg_color=0d1117&color=38bdf8&line=38bdf8&point=60a5fa&area=true&hide_border=true"
                  alt="KABI1212 Activity Graph"
                  className="w-full max-w-3xl h-auto"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center"
            >
              <div className="w-full p-2 rounded-2xl bg-[#0d1117] border border-white/5 flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=KABI1212&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117&title_color=38bdf8&icon_color=38bdf8&text_color=94a3b8"
                  alt="KABI1212 GitHub Overall Stats"
                  className="max-w-full h-auto"
                />
              </div>
              <div className="w-full p-2 rounded-2xl bg-[#0d1117] border border-white/5 flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=KABI1212&layout=compact&theme=dark&hide_border=true&bg_color=0d1117&title_color=38bdf8&text_color=94a3b8"
                  alt="KABI1212 Top Languages"
                  className="max-w-full h-auto"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Visit Profile Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/KABI1212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 border border-blue-400/30"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Visit @KABI1212 on GitHub
            <svg className="w-4 h-4 ml-1 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
