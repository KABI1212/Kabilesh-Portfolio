import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kabilesh K — Portfolio',
  description:
    'Final Year B.E. CSE Student | AI/ML & Full-Stack Developer — Portfolio of Kabilesh K',
  icons: [{ rel: 'icon', url: '/icon.svg' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
