export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#111] p-8">
        <h1 className="text-3xl font-bold">Contact Backend</h1>
        <p className="mt-3 text-sm text-[#777]">
          The portfolio now accepts contact submissions through a simple backend endpoint and stores them locally.
        </p>
        <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-300">
          Use the contact form on the homepage to submit a message. It will be saved in the local data file.
        </div>
      </div>
    </main>
  )
}
