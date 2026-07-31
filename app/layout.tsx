import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kabilesh K — Portfolio',
  description:
    'Final Year B.E. CSE Student | AI/ML & Full-Stack Developer — Portfolio of Kabilesh K',
  icons: {
    icon: [
      { url: '/logo-transparent.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logo-transparent.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-serif">{children}</body>
    </html>
  )
}
