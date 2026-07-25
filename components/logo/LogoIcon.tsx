import React from 'react'

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  glowIntensity?: 'normal' | 'low'
  shineOffset?: number
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  glowIntensity = 'normal',
  shineOffset = -50,
  className = '',
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full select-none ${className}`}
      {...props}
    >
      <defs>
        {/* Soft Ambient Gold Glow Filter */}
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={glowIntensity === 'low' ? '6' : '12'} result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope={glowIntensity === 'low' ? '0.35' : '0.75'} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dynamic Metallic Shine Overlay */}
        <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset={`${shineOffset - 25}%`} stopColor="rgba(255,255,255,0)" />
          <stop offset={`${shineOffset}%`} stopColor="rgba(255,255,255,0.6)" />
          <stop offset={`${shineOffset + 25}%`} stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <clipPath id="logoClip">
          <rect x="0" y="0" width="500" height="500" />
        </clipPath>
      </defs>

      <g filter="url(#goldGlow)">
        <image
          href="/logo-transparent.png"
          x="0"
          y="0"
          width="500"
          height="500"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* Dynamic Metallic Shine Sweep Overlay */}
      {shineOffset > -50 && shineOffset < 150 && (
        <rect
          x="0"
          y="0"
          width="500"
          height="500"
          fill="url(#shineGrad)"
          clipPath="url(#logoClip)"
          style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
      )}
    </svg>
  )
}
export default LogoIcon
