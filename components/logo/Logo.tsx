'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LogoIcon } from './LogoIcon'

export interface LogoProps {
  width?: number
  height?: number
  className?: string
  animated?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  width,
  height,
  className = '',
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const styleDimension = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }

  if (!animated) {
    return (
      <div
        role="img"
        aria-label="Kabilesh Portfolio Logo"
        className={`relative inline-flex items-center justify-center transition-transform duration-300 ${className}`}
        style={styleDimension}
      >
        <LogoIcon
          glowIntensity={isHovered ? 'normal' : 'low'}
          className="w-full h-full drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] dark:drop-shadow-[0_0_16px_rgba(212,175,55,0.5)]"
        />
      </div>
    )
  }

  return (
    <motion.div
      role="img"
      aria-label="Kabilesh Portfolio Logo"
      initial={{ opacity: 0, scale: 0.9, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={styleDimension}
    >
      <LogoIcon
        glowIntensity={isHovered ? 'normal' : 'low'}
        className={`w-full h-full transition-all duration-300 ${
          isHovered
            ? 'drop-shadow-[0_0_22px_rgba(212,175,55,0.7)]'
            : 'drop-shadow-[0_0_10px_rgba(212,175,55,0.35)] dark:drop-shadow-[0_0_15px_rgba(212,175,55,0.45)]'
        }`}
      />
    </motion.div>
  )
}

export default Logo
