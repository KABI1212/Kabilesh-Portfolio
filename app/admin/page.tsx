'use client'

import { useEffect, useState } from 'react'

interface Submission {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')

    async function load() {
      try {
        const res = await fetch(`/api/contact?key=${encodeURIComponent(key || '')}`)
        const data = await res.json()
        if (!res.ok || !data?.success) {
          setError('Unauthorized or unable to load submissions.')
        } else {
          setSubmissions(data.submissions || [])
        }
      } catch {
        setError('Unable to load submissions.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-[#111] p-8">
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="mt-3 text-sm text-[#777]">
          View real submissions from the portfolio contact form.
        </p>

        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-blue-400">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="mt-8 text-sm text-[#666]">No submissions yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {submissions.map((item) => (
              <div key={item._id} className="rounded-xl border border-white/10 bg-[#05070d] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-blue-400">{item.email}</p>
                  </div>
                  <p className="text-xs text-[#666]">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <p className="mt-3 text-sm text-[#aaa]">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
