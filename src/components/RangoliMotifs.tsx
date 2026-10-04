import React from 'react';

interface MotifProps {
  className?: string;
  size?: number;
  color?: string;
}

// 1. Surya Mandala: Solar Radiance for Equity & Market Growth
export const SuryaMandalaMotif: React.FC<MotifProps> = ({ className = '', size = 48, color = '#F59E0B' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 hover:rotate-45 ${className}`}
  >
    <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="1.2" opacity="0.8" />
    <circle cx="50" cy="50" r="24" stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="10" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
    <circle cx="50" cy="50" r="4" fill={color} />
    {/* 8 Solar Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 50 50)`}>
        <path d="M50 6 L52 24 L50 20 L48 24 Z" fill={color} opacity="0.9" />
        <circle cx="50" cy="30" r="2.5" fill={color} />
        <path d="M46 38 Q50 34 54 38" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

// 2. Padma Lotus: Sacred Blooming Lotus for SBI Child Plan
export const PadmaLotusMotif: React.FC<MotifProps> = ({ className = '', size = 48, color = '#E11D48' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 hover:scale-110 ${className}`}
  >
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
    {/* Lotus Petals arranged symmetrically */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
      <g key={idx} transform={`rotate(${deg} 50 50)`}>
        {/* Outer petal */}
        <path
          d="M50 14 C40 28 44 42 50 50 C56 42 60 28 50 14 Z"
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="1.4"
        />
        {/* Inner bud */}
        <path
          d="M50 26 C45 35 47 43 50 50 C53 43 55 35 50 26 Z"
          fill={color}
          fillOpacity="0.4"
          stroke={color}
          strokeWidth="1.2"
        />
        <circle cx="50" cy="18" r="2" fill={color} />
      </g>
    ))}
    {/* Central Core */}
    <circle cx="50" cy="50" r="8" fill={color} fillOpacity="0.8" />
    <circle cx="50" cy="50" r="3" fill="#FFF" />
  </svg>
);

// 3. Mayil Peacock: Feather Motif for SBI Pension Plan (Longevity & Peace)
export const MayilPeacockMotif: React.FC<MotifProps> = ({ className = '', size = 48, color = '#0D9488' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 hover:rotate-12 ${className}`}
  >
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" opacity="0.4" />
    {/* 6 Feather Eyes */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <g key={i} transform={`rotate(${deg} 50 50)`}>
        <path
          d="M50 10 C36 24 38 40 50 50 C62 40 64 24 50 10 Z"
          stroke={color}
          strokeWidth="1.5"
          fill={color}
          fillOpacity="0.15"
        />
        <ellipse cx="50" cy="24" rx="8" ry="12" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
        <ellipse cx="50" cy="24" rx="4" ry="6" fill="#F59E0B" fillOpacity="0.8" />
        <circle cx="50" cy="24" r="2" fill="#042F2E" />
      </g>
    ))}
    <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2" />
    <circle cx="50" cy="50" r="4" fill={color} />
  </svg>
);

// 4. Ashtalakshmi Star: 8-Pointed Star of Abundance for Women Wealth Builder
export const AshtalakshmiStarMotif: React.FC<MotifProps> = ({ className = '', size = 48, color = '#9333EA' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 hover:rotate-90 ${className}`}
  >
    <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    {/* Intersecting squares forming the star */}
    <rect x="25" y="25" width="50" height="50" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.1" />
    <rect
      x="25"
      y="25"
      width="50"
      height="50"
      transform="rotate(45 50 50)"
      stroke={color}
      strokeWidth="1.6"
      fill={color}
      fillOpacity="0.1"
    />
    {/* 8 Jewel Points */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
      <g key={idx} transform={`rotate(${angle} 50 50)`}>
        <circle cx="50" cy="14" r="3.5" fill="#EAB308" />
        <circle cx="50" cy="14" r="1.5" fill="#FFF" />
      </g>
    ))}
    <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
    <circle cx="50" cy="50" r="4" fill="#EAB308" />
  </svg>
);

// 5. Kalash Urn: Sacred Pot for Traditional Endowment & Capital Preservation
export const KalashUrnMotif: React.FC<MotifProps> = ({ className = '', size = 48, color = '#D97706' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-500 hover:scale-105 ${className}`}
  >
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
    {/* Coconut on Top */}
    <path d="M50 16 L42 34 L58 34 Z" fill="#78350F" stroke={color} strokeWidth="1.2" />
    {/* Mango Leaves */}
    <path d="M42 32 Q30 20 24 28 Q36 34 44 34 Z" fill="#15803D" stroke={color} strokeWidth="0.8" />
    <path d="M58 32 Q70 20 76 28 Q64 34 56 34 Z" fill="#15803D" stroke={color} strokeWidth="0.8" />
    <path d="M50 28 Q50 14 50 10 Q54 22 50 28 Z" fill="#16A34A" stroke={color} strokeWidth="0.8" />
    {/* Pot (Kalash) */}
    <ellipse cx="50" cy="38" rx="14" ry="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2" />
    <path
      d="M36 38 C32 48 30 64 40 74 C46 80 54 80 60 74 C70 64 68 48 64 38 Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="1.8"
    />
    {/* Swastika / Sacred mark on kalash */}
    <circle cx="50" cy="58" r="6" stroke="#E11D48" strokeWidth="1.5" fill="#E11D48" fillOpacity="0.3" />
    {/* Base */}
    <path d="M40 76 L60 76 L62 82 L38 82 Z" fill={color} stroke={color} strokeWidth="1" />
  </svg>
);

// Rangoli Corner Flourish
export const RangoliCornerFlourish: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#F59E0B'
}) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={`pointer-events-none opacity-40 ${className}`}>
    <path d="M0 0 L60 0 Q30 0 30 30 Q30 60 0 60 L0 0 Z" fill={color} fillOpacity="0.06" />
    <path d="M4 4 L50 4 C35 4 25 14 25 30 C25 45 15 50 4 50 Z" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="3" fill={color} />
    <circle cx="24" cy="8" r="2" fill={color} />
    <circle cx="8" cy="24" r="2" fill={color} />
  </svg>
);

// Rangoli Header Bar Divider
export const RangoliDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    <div className="flex items-center gap-1.5 opacity-80">
      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-400 bg-amber-500/30" />
      <div className="w-2 h-2 rounded-full bg-teal-400" />
      <div className="w-2.5 h-2.5 rotate-45 border border-amber-400 bg-amber-500/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
  </div>
);
