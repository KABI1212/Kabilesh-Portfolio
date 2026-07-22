import type { Metadata } from 'next'
import { Inter, Great_Vibes } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'Kabilesh K — Portfolio',
  description:
    'Final Year B.E. CSE Student | AI/ML & Full-Stack Developer — Portfolio of Kabilesh K',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.variable}`}>{children}</body>
    </html>
  )
}
