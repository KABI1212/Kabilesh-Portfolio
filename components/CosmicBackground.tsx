'use client'

import Image from 'next/image'

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Space Galaxy & Horizon Background Image */}
      <Image
        src="/bg-space.png"
        alt="Cosmic Space Galaxy Horizon Background"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center opacity-80 scale-[1.02] transform-gpu"
      />

      {/* Atmospheric Horizon Glow & Celestial Highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_45%,rgba(56,189,248,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(168,85,247,0.1),transparent_60%)]" />

      {/* Deep Space Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080d]/60 via-[#06080d]/35 to-[#06080d]/75" />
      <div className="absolute inset-0 bg-[#05070c]/25 backdrop-contrast-125" />
    </div>
  )
}
