import React from 'react'

export interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  glowIntensity?: 'normal' | 'low'
  shineOffset?: number
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  glowIntensity = 'normal',
  shineOffset = 0,
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
        {/* Gold Gradients */}
        <linearGradient id="goldRingGrad" x1="50" y1="50" x2="450" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF4B8" />
          <stop offset="20%" stopColor="#F5D061" />
          <stop offset="45%" stopColor="#C49320" />
          <stop offset="70%" stopColor="#F9E285" />
          <stop offset="85%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6311" />
        </linearGradient>

        <linearGradient id="goldLight" x1="100" y1="80" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="30%" stopColor="#F7D774" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#996B1F" />
        </linearGradient>

        <linearGradient id="goldDark" x1="100" y1="200" x2="300" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2BD48" />
          <stop offset="40%" stopColor="#9B701B" />
          <stop offset="80%" stopColor="#5E430B" />
          <stop offset="100%" stopColor="#3B2904" />
        </linearGradient>

        <linearGradient id="goldStemGrad" x1="210" y1="120" x2="270" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF5BE" />
          <stop offset="25%" stopColor="#F3CD5B" />
          <stop offset="55%" stopColor="#C69622" />
          <stop offset="80%" stopColor="#F5D467" />
          <stop offset="100%" stopColor="#8A6110" />
        </linearGradient>

        {/* Silver / Chrome Gradients for Right Side of K */}
        <linearGradient id="silverTopGrad" x1="260" y1="130" x2="380" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E6E6E6" />
          <stop offset="70%" stopColor="#B3B3B3" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>

        <linearGradient id="silverBottomGrad" x1="260" y1="230" x2="420" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CCCCCC" />
          <stop offset="40%" stopColor="#8C8C8C" />
          <stop offset="75%" stopColor="#545454" />
          <stop offset="100%" stopColor="#2E2E2E" />
        </linearGradient>

        <linearGradient id="silverBevelLight" x1="260" y1="130" x2="410" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E8E8E8" />
          <stop offset="100%" stopColor="#A0A0A0" />
        </linearGradient>

        {/* Gold Glow Filter */}
        <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={glowIntensity === 'low' ? '4' : '9'} result="blur" />
          <feComponentTransfer in="blur" result="glow">
            <feFuncA type="linear" slope={glowIntensity === 'low' ? '0.35' : '0.65'} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Metallic Shine Gradient Mask */}
        <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset={`${shineOffset - 30}%`} stopColor="rgba(255,255,255,0)" />
          <stop offset={`${shineOffset}%`} stopColor="rgba(255,255,255,0.45)" />
          <stop offset={`${shineOffset + 30}%`} stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Clip path for shine sweep */}
        <clipPath id="logoClip">
          <rect x="0" y="0" width="500" height="500" />
        </clipPath>
      </defs>

      <g filter="url(#goldGlowFilter)">
        {/* ==========================================
            1. OUTER OPEN GOLD CIRCULAR RING
           ========================================== */}
        {/* Outer Ring Body: Open arc from top-right (~45°) to bottom-right (~-30°) */}
        <path
          d="M 412 122 
             C 368 70, 305 38, 235 38 
             C 118 38, 23 133, 23 250 
             C 23 367, 118 462, 235 462 
             C 310 462, 376 423, 418 365 
             C 421 360, 420 354, 415 351 
             C 410 348, 404 350, 400 355 
             C 362 407, 302 442, 235 442 
             C 129 442, 43 356, 43 250 
             C 43 144, 129 58, 235 58 
             C 298 58, 355 87, 394 133 
             C 398 138, 405 138, 409 134 
             C 413 130, 414 124, 412 122 Z"
          fill="url(#goldRingGrad)"
        />

        {/* Ring Inner 3D Rim / Lip Accent */}
        <path
          d="M 428 140 
             C 382 82, 312 46, 235 46 
             C 122 46, 31 137, 31 250 
             C 31 363, 122 454, 235 454 
             C 318 454, 391 412, 432 348
             C 434 345, 436 340, 434 336
             C 431 332, 426 331, 422 334
             C 384 394, 315 434, 235 434
             C 133 434, 51 352, 51 250
             C 51 148, 133 66, 235 66
             C 305 66, 368 99, 410 152
             Z"
          fill="url(#goldLight)"
          opacity="0.75"
        />

        {/* Ring Outer Bevel Highlight Curve */}
        <path
          d="M 405 115 
             C 358 64, 292 34, 220 34 
             C 101 34, 4 131, 4 250 
             C 4 369, 101 466, 220 466 
             C 300 466, 372 423, 418 355"
          stroke="url(#goldLight)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />

        {/* Bottom Tapered Ring Tip */}
        <path
          d="M 418 365 C 445 320, 448 275, 435 250 C 430 268, 420 310, 395 348 Z"
          fill="url(#goldRingGrad)"
        />

        {/* ==========================================
            2. LUXURY MULTI-FEATHER GOLD WING (Left Side)
           ========================================== */}
        {/* Wing Shadow / Base Layer */}
        <path
          d="M 225 150 
             C 170 120, 115 150, 75 220 
             C 60 250, 50 290, 60 330 
             C 75 380, 110 410, 165 425 
             C 195 432, 215 420, 225 390 
             C 230 340, 225 240, 225 150 Z"
          fill="url(#goldDark)"
          opacity="0.6"
        />

        {/* Feather Blade 1 — Top High Sweeping Feather */}
        <path
          d="M 230 135 
             C 200 90, 155 70, 128 100 
             C 105 125, 110 160, 140 190 
             C 170 220, 205 235, 235 240 
             C 225 200, 225 160, 230 135 Z"
          fill="url(#goldLight)"
        />
        <path
          d="M 128 100 C 150 82, 190 95, 230 135 C 205 160, 170 150, 128 100 Z"
          fill="url(#goldStemGrad)"
        />

        {/* Feather Blade 2 — Upper Outer Feather */}
        <path
          d="M 140 170 
             C 100 160, 80 190, 75 225 
             C 70 255, 90 280, 125 295 
             C 165 310, 200 305, 232 290 
             C 215 255, 180 210, 140 170 Z"
          fill="url(#goldRingGrad)"
        />
        <path
          d="M 75 225 C 90 195, 130 185, 175 220 C 145 255, 105 255, 75 225 Z"
          fill="url(#goldLight)"
        />

        {/* Feather Blade 3 — Middle Outer Feather */}
        <path
          d="M 85 245 
             C 65 260, 60 295, 70 325 
             C 80 355, 110 375, 145 375 
             C 180 375, 210 350, 235 325 
             C 200 305, 145 285, 85 245 Z"
          fill="url(#goldLight)"
        />
        <path
          d="M 70 325 C 65 295, 95 270, 145 285 C 115 325, 90 335, 70 325 Z"
          fill="url(#goldDark)"
        />

        {/* Feather Blade 4 — Lower Outer Feather */}
        <path
          d="M 80 330 
             C 75 360, 95 390, 125 410 
             C 155 425, 185 415, 210 390 
             C 225 375, 235 350, 235 340 
             C 195 355, 140 360, 80 330 Z"
          fill="url(#goldRingGrad)"
        />

        {/* Feather Blade 5 — Bottom Tapering Feather blending into Ring */}
        <path
          d="M 125 410 
             C 145 425, 175 435, 205 430 
             C 225 425, 240 405, 242 380 
             C 215 395, 170 410, 125 410 Z"
          fill="url(#goldLight)"
        />

        {/* Inner Feather Highlights / Spine Ribs */}
        <path d="M 230 135 C 180 180, 140 220, 110 260" stroke="url(#goldLight)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M 232 290 C 185 305, 135 315, 90 330" stroke="url(#goldLight)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 235 325 C 190 345, 150 370, 115 390" stroke="url(#goldLight)" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

        {/* ==========================================
            3. SERIF CAPITAL "K" — GOLD LEFT STEM
           ========================================== */}
        {/* K Left Stem Main Body */}
        <path
          d="M 222 135 
             H 262 
             V 365 
             H 222 
             Z"
          fill="url(#goldStemGrad)"
        />

        {/* Top Serif Bracket (Gold) */}
        <path
          d="M 195 135 
             C 210 135, 222 138, 222 152 
             V 135 
             H 262 
             V 152 
             C 262 138, 274 135, 288 135 
             V 122 
             H 195 
             Z"
          fill="url(#goldLight)"
        />

        {/* Bottom Serif Bracket (Gold) */}
        <path
          d="M 195 365 
             C 210 365, 222 362, 222 348 
             V 365 
             H 262 
             V 348 
             C 262 362, 274 365, 288 365 
             V 378 
             H 195 
             Z"
          fill="url(#goldLight)"
        />

        {/* Left Stem 3D Bevel Line (Highlight on Left, Shadow on Right) */}
        <path d="M 222 135 V 365" stroke="#FFFDF0" strokeWidth="2" opacity="0.9" />
        <path d="M 262 135 V 365" stroke="#5E430B" strokeWidth="2" opacity="0.75" />

        {/* ==========================================
            4. SERIF CAPITAL "K" — SILVER RIGHT LEGS (3D BEVELED)
           ========================================== */}
        {/* Upper Right Leg — Lit Top Face */}
        <path
          d="M 262 245 
             L 375 135 
             H 415 
             L 295 250 
             Z"
          fill="url(#silverTopGrad)"
        />

        {/* Upper Right Leg — Shadowed Lower Face */}
        <path
          d="M 262 245 
             L 295 250 
             L 400 152 
             L 375 135 
             Z"
          fill="url(#silverBottomGrad)"
        />

        {/* Upper Right Leg Top Serif Spur */}
        <path
          d="M 375 135 
             H 420 
             V 122 
             H 360 
             L 375 135 Z"
          fill="url(#silverBevelLight)"
        />

        {/* Lower Right Leg — Upper Lit Face */}
        <path
          d="M 270 230 
             L 395 365 
             H 432 
             L 300 220 
             Z"
          fill="url(#silverTopGrad)"
        />

        {/* Lower Right Leg — Lower Shadowed Face */}
        <path
          d="M 270 230 
             L 300 220 
             L 432 365 
             L 395 365 
             Z"
          fill="url(#silverBottomGrad)"
        />

        {/* Lower Right Leg Bottom Terminal Serif Flare */}
        <path
          d="M 395 365 
             L 432 365 
             C 440 370, 442 375, 435 378 
             H 380 
             L 395 365 Z"
          fill="url(#silverBevelLight)"
        />

        {/* Center Bevel Ridge Line on Silver Legs */}
        <path d="M 262 245 L 375 135" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 270 230 L 415 370" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Dynamic Metallic Shine Overlay */}
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
