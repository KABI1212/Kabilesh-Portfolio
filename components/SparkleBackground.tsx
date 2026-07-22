'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speedX: number
  speedY: number
  twinkleSpeed: number
  twinkleOffset: number
  type: 0 | 1 | 2 // 0=dot, 1=star, 2=sparkle
}

export default function SparkleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const setSize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const initParticles = () => {
      // Fewer particles — quality over quantity
      const count = Math.min(Math.floor((w * h) / 14000), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.15,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
        type: Math.floor(Math.random() * 3) as 0 | 1 | 2,
      }))
    }

    // Pre-build offscreen canvases for each particle type/size to avoid
    // repeated gradient creation inside the hot loop
    const buildSprite = (type: 0 | 1 | 2, size: number): HTMLCanvasElement => {
      const s = Math.ceil(size * 8)
      const oc = document.createElement('canvas')
      oc.width = s * 2
      oc.height = s * 2
      const c = oc.getContext('2d')!
      const cx = s
      const cy = s

      if (type === 0) {
        // Glowing dot
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, s)
        g.addColorStop(0, 'rgba(255,255,255,0.95)')
        g.addColorStop(0.4, 'rgba(196,181,253,0.6)')
        g.addColorStop(1, 'rgba(139,92,246,0)')
        c.fillStyle = g
        c.beginPath()
        c.arc(cx, cy, s, 0, Math.PI * 2)
        c.fill()
      } else if (type === 1) {
        // 4-point star
        const outer = s * 0.9
        const inner = s * 0.2
        c.beginPath()
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4 - Math.PI / 2
          const r = i % 2 === 0 ? outer : inner
          if (i === 0) c.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
          else c.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
        }
        c.closePath()
        const g2 = c.createRadialGradient(cx, cy, 0, cx, cy, outer)
        g2.addColorStop(0, 'rgba(255,255,255,1)')
        g2.addColorStop(0.5, 'rgba(196,181,253,0.8)')
        g2.addColorStop(1, 'rgba(139,92,246,0)')
        c.fillStyle = g2
        c.shadowBlur = s * 2
        c.shadowColor = 'rgba(139,92,246,0.7)'
        c.fill()
      } else {
        // Cross sparkle
        const len = s * 0.85
        const lw = Math.max(size * 0.35, 0.5)
        c.strokeStyle = 'rgba(196,181,253,0.85)'
        c.lineWidth = lw
        c.lineCap = 'round'
        c.shadowBlur = s * 2
        c.shadowColor = 'rgba(139,92,246,0.8)'
        c.beginPath()
        c.moveTo(cx - len, cy)
        c.lineTo(cx + len, cy)
        c.moveTo(cx, cy - len)
        c.lineTo(cx, cy + len)
        c.stroke()
        c.beginPath()
        c.arc(cx, cy, lw * 1.5, 0, Math.PI * 2)
        c.fillStyle = 'rgba(255,255,255,0.9)'
        c.fill()
      }
      return oc
    }

    // Cache sprites keyed by "type-sizeRounded"
    const spriteCache = new Map<string, HTMLCanvasElement>()
    const getSprite = (type: 0 | 1 | 2, size: number) => {
      const key = `${type}-${Math.round(size * 4)}`
      if (!spriteCache.has(key)) spriteCache.set(key, buildSprite(type, size))
      return spriteCache.get(key)!
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      frame++

      for (const p of particles) {
        const twinkle = Math.sin(frame * p.twinkleSpeed + p.twinkleOffset)
        const alpha = p.opacity * (0.35 + 0.65 * ((twinkle + 1) / 2))

        p.x += p.speedX
        p.y += p.speedY
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20

        const sprite = getSprite(p.type, p.size)
        const half = sprite.width / 2
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, p.x - half, p.y - half)
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    setSize()
    initParticles()
    animate()

    const onResize = () => {
      setSize()
      initParticles()
      spriteCache.clear()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      spriteCache.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  )
}
