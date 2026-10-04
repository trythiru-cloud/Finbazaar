import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Droplets,
  Leaf,
  Eye,
  SlidersHorizontal,
  CloudRain,
  Wheat,
  Feather
} from 'lucide-react';
import { SchemewiseParablePicture } from './SchemewiseParablePicture.tsx';
import { SbiScheme } from '../data/sbiSchemes.ts';

export interface NatureBackgroundProps {
  initialVivid?: boolean;
  onOpenAiAnt?: (schemeId: string) => void;
  onOpenEnquiry?: (scheme: SbiScheme) => void;
}

export const NatureSavingBackground: React.FC<NatureBackgroundProps> = ({ 
  initialVivid = false,
  onOpenAiAnt,
  onOpenEnquiry
}) => {
  const [showStory, setShowStory] = useState(false);
  const [vividMode, setVividMode] = useState(initialVivid);
  const [rainActive, setRainActive] = useState(true);

  // Dynamic multicolor auspicious Rangoli glows for background ambiance
  const glows = {
    orb1: 'from-amber-500/35 via-orange-600/25 to-transparent',
    orb2: 'from-teal-500/35 via-sky-600/25 to-transparent',
    orb3: 'from-rose-600/30 via-pink-600/20 to-transparent',
    orb4: 'from-emerald-500/30 via-teal-700/25 to-transparent',
    orb5: 'from-purple-600/35 via-indigo-600/25 to-transparent',
  };

  return (
    <>
      {/* 1. FIXED AMBIENT MULTICOLOR AURORA & GLOW ORBS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700">
        
        {/* Saffron & Marigold Orb (Top Left) */}
        <div 
          className={`absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-gradient-to-br ${glows.orb1} blur-3xl animate-multicolor-aurora`} 
        />
        
        {/* Peacock Teal & Monsoon Azure Orb (Top Right) */}
        <div 
          className={`absolute top-10 -right-36 w-[36rem] h-[36rem] rounded-full bg-gradient-to-bl ${glows.orb2} blur-3xl`} 
        />
        
        {/* Sindoor Crimson & Ruby Rose Orb (Center Mid) */}
        <div 
          className={`absolute top-[42%] left-[28%] w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr ${glows.orb3} blur-3xl`} 
        />
        
        {/* Auspicious Emerald Panna Orb (Bottom Left) */}
        <div 
          className={`absolute bottom-10 -left-28 w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr ${glows.orb4} blur-3xl`} 
        />
        
        {/* Royal Lotus Amethyst Purple Orb (Bottom Right) */}
        <div 
          className={`absolute -bottom-32 right-10 w-[38rem] h-[38rem] rounded-full bg-gradient-to-tl ${glows.orb5} blur-3xl`} 
        />

        {/* 2. HIGH-FIDELITY VECTOR SCENE: ANTS AND BIRDS STORING FOOD FOR RAINY SEASONS */}
        <svg
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 pointer-events-none ${
            vividMode ? 'opacity-[0.42] mix-blend-screen' : 'opacity-[0.26] mix-blend-screen'
          }`}
          viewBox="0 0 1600 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="monsoonSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0369A1" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.35" />
              <stop offset="20%" stopColor="#F97316" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#FACC15" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#06B6D4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#0284C7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="goldenGrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <linearGradient id="rainDropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="banyanBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803D" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#166534" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#78350F" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="earthSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350F" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#451A03" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1C1917" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="antCarapaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Nest Texture Pattern */}
            <pattern id="nestWeavePattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M0 6 L12 6 M6 0 L6 12" stroke="#CA8A04" strokeWidth="1.2" strokeOpacity="0.4" />
              <path d="M0 0 L12 12 M12 0 L0 12" stroke="#A16207" strokeWidth="0.8" strokeOpacity="0.3" />
            </pattern>
          </defs>

          {/* RAINBOW ARC (Multicolor Symbol Across Monsoon Sky) */}
          <path
            d="M -100 350 A 900 600 0 0 1 1700 350"
            fill="none"
            stroke="url(#rainbowGrad)"
            strokeWidth="28"
            strokeLinecap="round"
          />

          {/* 1. MONSOON RAINCLOUDS & SHOWER (Top Background) */}
          <g id="monsoon-rainclouds" transform="translate(60, 30)">
            {/* Cloud Group 1 */}
            <path
              d="M120 70 Q160 25 210 50 Q260 15 320 40 Q375 15 425 45 Q470 30 500 70 Q530 110 480 135 L130 135 Q90 110 120 70 Z"
              fill="url(#cloudGrad)"
            />
            {/* Cloud Group 2 */}
            <path
              d="M660 65 Q710 20 770 45 Q825 10 890 35 Q950 10 1010 40 Q1065 25 1105 65 Q1145 105 1095 135 L675 135 Q630 105 660 65 Z"
              fill="url(#cloudGrad)"
            />

            {/* Shimmering Animated Raindrops Falling */}
            {rainActive && [
              140, 180, 220, 260, 300, 340, 380, 420, 460, 490, 
              680, 720, 760, 800, 840, 880, 920, 960, 1000, 1040, 1080
            ].map((rx, idx) => (
              <g key={idx} className="animate-rain-fall" style={{ animationDelay: `${(idx % 7) * 0.25}s` }}>
                <line
                  x1={rx}
                  y1={135 + (idx % 4) * 12}
                  x2={rx - 18}
                  y2={230 + (idx % 4) * 12}
                  stroke="url(#rainDropGrad)"
                  strokeWidth="2.8"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </g>

          {/* 2. THE WEAVER BIRDS STORING GRAINS IN NESTS FOR RAINY SEASON (Top Right Branch) */}
          <g id="weaver-birds-and-nests" transform="translate(1000, 90)">
            
            {/* Great Foliage Branch (Banyan/Neem Tree) */}
            <path
              d="M -120 50 Q 80 20 280 60 Q 420 90 560 140"
              stroke="url(#banyanBranchGrad)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M 110 45 Q 160 110 240 170"
              stroke="url(#banyanBranchGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 320 70 Q 380 130 430 190"
              stroke="url(#banyanBranchGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Tree Leaves Cluster (Emerald & Panna Green) */}
            {[
              { cx: -50, cy: 30, r: 18 }, { cx: 20, cy: 20, r: 24 }, { cx: 90, cy: 25, r: 20 },
              { cx: 170, cy: 35, r: 22 }, { cx: 260, cy: 45, r: 26 }, { cx: 350, cy: 65, r: 22 },
              { cx: 440, cy: 85, r: 20 }, { cx: 520, cy: 115, r: 18 }
            ].map((leaf, lIdx) => (
              <g key={lIdx}>
                <ellipse cx={leaf.cx} cy={leaf.cy} rx={leaf.r * 1.3} ry={leaf.r * 0.9} fill="#059669" opacity="0.8" />
                <ellipse cx={leaf.cx + 5} cy={leaf.cy - 3} rx={leaf.r * 0.9} ry={leaf.r * 0.6} fill="#10B981" opacity="0.9" />
                {/* Red Berry Cluster */}
                <circle cx={leaf.cx - 6} cy={leaf.cy + 10} r="3.5" fill="#E11D48" />
                <circle cx={leaf.cx + 3} cy={leaf.cy + 12} r="3" fill="#F43F5E" />
              </g>
            ))}

            {/* NEST 1: Baya Weaver Hanging Nest (Left Nest) */}
            <g transform="translate(130, 70)">
              {/* Woven Suspension Cord */}
              <line x1="20" y1="0" x2="20" y2="45" stroke="#CA8A04" strokeWidth="4" strokeLinecap="round" />
              <line x1="16" y1="0" x2="24" y2="45" stroke="#EAB308" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Main Woven Bulb Body */}
              <path
                d="M 5 45 Q 20 30 35 45 Q 56 75 44 115 Q 32 145 20 155 Q 8 145 -4 115 Q -16 75 5 45 Z"
                fill="#854D0E"
                stroke="#EAB308"
                strokeWidth="2.5"
              />
              <path
                d="M 5 45 Q 20 30 35 45 Q 56 75 44 115 Q 32 145 20 155 Q 8 145 -4 115 Q -16 75 5 45 Z"
                fill="url(#nestWeavePattern)"
              />
              
              {/* Rain-proof Entrance Tube (Pointing Downwards against Monsoon Influx) */}
              <path 
                d="M 11 135 L 11 175 Q 20 182 29 175 L 29 135 Z" 
                fill="#713F12" 
                stroke="#CA8A04" 
                strokeWidth="2" 
              />
              <ellipse cx="20" cy="175" rx="9" ry="3.5" fill="#1C1917" />

              {/* Glowing Warm Interior Granary (Seeds Stored for the Storm!) */}
              <circle cx="20" cy="90" r="14" fill="#FEF08A" opacity="0.3" className="animate-grain-glow" />
              <ellipse cx="16" cy="92" rx="7" ry="4.5" fill="url(#goldenGrainGrad)" />
              <ellipse cx="24" cy="88" rx="6.5" ry="4" fill="url(#goldenGrainGrad)" />
              <ellipse cx="20" cy="82" rx="6" ry="4" fill="url(#goldenGrainGrad)" />
              
              {/* Subtle Nest Label */}
              <text x="20" y="66" textAnchor="middle" fill="#FEF08A" fontSize="7" fontWeight="bold" letterSpacing="0.5">
                RAIN SHIELD
              </text>
            </g>

            {/* NEST 2: Second Hanging Nest (Right Nest) */}
            <g transform="translate(300, 90)">
              <line x1="18" y1="0" x2="18" y2="40" stroke="#CA8A04" strokeWidth="3.5" strokeLinecap="round" />
              <path
                d="M 4 40 Q 18 28 32 40 Q 50 68 38 105 Q 28 132 18 142 Q 8 132 -2 105 Q -14 68 4 40 Z"
                fill="#854D0E"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <path 
                d="M 10 125 L 10 160 Q 18 166 26 160 L 26 125 Z" 
                fill="#713F12" 
                stroke="#CA8A04" 
                strokeWidth="1.8" 
              />
              {/* Stored Grains inside */}
              <ellipse cx="18" cy="82" rx="6.5" ry="4" fill="url(#goldenGrainGrad)" className="animate-grain-glow" />
              <ellipse cx="23" cy="76" rx="5.5" ry="3.5" fill="url(#goldenGrainGrad)" />
              <ellipse cx="13" cy="78" rx="5" ry="3.5" fill="url(#goldenGrainGrad)" />
            </g>

            {/* BIRD 1: Multi-colored Weaver Bird in Flight (Carrying Golden Grain Stalk in Beak) */}
            <g transform="translate(-10, 20) scale(1.15)">
              {/* Body (Peacock Teal & Turquoise) */}
              <ellipse cx="60" cy="75" rx="22" ry="13" fill="#0D9488" stroke="#5EEAD4" strokeWidth="1.8" />
              {/* Breast Accent (Vibrant Saffron Gold) */}
              <ellipse cx="68" cy="78" rx="12" ry="8" fill="#F59E0B" />
              {/* Head */}
              <circle cx="85" cy="70" r="10" fill="#0F766E" stroke="#2DD4BF" strokeWidth="1.5" />
              {/* Eye */}
              <circle cx="88" cy="68" r="2.5" fill="#FFFFFF" />
              <circle cx="88.5" cy="68" r="1.2" fill="#09090B" />
              {/* Beak */}
              <polygon points="95,68 108,72 95,76" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
              
              {/* GOLDEN GRAIN STALK HELD PROUDLY IN BEAK (Food Stored for Rainy Season) */}
              <g transform="translate(108, 72) rotate(15)">
                <line x1="0" y1="0" x2="22" y2="6" stroke="#CA8A04" strokeWidth="1.5" />
                <ellipse cx="6" cy="1" rx="5" ry="3" fill="url(#goldenGrainGrad)" stroke="#FEF08A" strokeWidth="0.8" />
                <ellipse cx="13" cy="3" rx="5" ry="3" fill="url(#goldenGrainGrad)" stroke="#FEF08A" strokeWidth="0.8" />
                <ellipse cx="20" cy="5" rx="5" ry="2.8" fill="url(#goldenGrainGrad)" stroke="#FEF08A" strokeWidth="0.8" />
                <circle cx="23" cy="6" r="1.5" fill="#FEF08A" className="animate-grain-glow" />
              </g>

              {/* Spread Wings (Animated Flutter) */}
              <g className="animate-wing-flutter">
                <path 
                  d="M 52 70 Q 32 30 68 20 Q 75 50 62 70 Z" 
                  fill="#14B8A6" 
                  stroke="#5EEAD4" 
                  strokeWidth="1.8" 
                />
                {/* Secondary Wing Feathers */}
                <path d="M 45 42 L 62 30" stroke="#047857" strokeWidth="1.5" />
                <path d="M 50 50 L 68 38" stroke="#047857" strokeWidth="1.5" />
              </g>

              {/* Tail Feathers */}
              <polygon points="38,76 12,70 18,84" fill="#115E59" stroke="#14B8A6" strokeWidth="1" />
            </g>

            {/* BIRD 2: Crimson & Ruby Bird Flying Back to Feed Chicks before Rain */}
            <g transform="translate(-180, 75) scale(0.95)">
              <ellipse cx="60" cy="75" rx="20" ry="12" fill="#E11D48" stroke="#FDA4AF" strokeWidth="1.6" />
              <ellipse cx="68" cy="78" rx="10" ry="7" fill="#F43F5E" />
              <circle cx="83" cy="70" r="9" fill="#BE123C" stroke="#F43F5E" strokeWidth="1.2" />
              <circle cx="85.5" cy="68" r="2.2" fill="#FFFFFF" />
              <circle cx="86" cy="68" r="1.1" fill="#000000" />
              <polygon points="92,68 104,72 92,75" fill="#F59E0B" />
              
              {/* Seed in Beak */}
              <ellipse cx="106" cy="72" rx="6" ry="3.5" fill="url(#goldenGrainGrad)" stroke="#FEF08A" strokeWidth="0.8" />
              <line x1="102" y1="72" x2="110" y2="72" stroke="#78350F" strokeWidth="0.6" />
              
              <path d="M 50 72 Q 35 38 65 30 Q 70 56 58 72 Z" fill="#F43F5E" stroke="#FECDD3" strokeWidth="1.5" />
              <polygon points="40,76 18,72 22,82" fill="#9F1239" />
            </g>
          </g>

          {/* 3. THE ANTS PROCESSION & SUBTERRANEAN GRANARY (Bottom Half) */}
          <g id="ants-storing-food-for-rain" transform="translate(0, 800)">
            
            {/* Undulating Soil & Earthen Mound */}
            <path
              d="M 0 170 Q 250 140 550 175 Q 850 200 1150 160 Q 1380 130 1600 170 L 1600 420 L 0 420 Z"
              fill="url(#earthSoilGrad)"
            />

            {/* Surface Grass & Monsoon Sprouts (Emerald Tuft Accents) */}
            {[
              40, 140, 260, 390, 520, 680, 810, 950, 1100, 1260, 1420, 1530
            ].map((gx, gIdx) => (
              <g key={gIdx} transform={`translate(${gx}, ${160 + (gIdx % 3) * 6})`}>
                <path d="M0 0 Q-4 -14 -10 -18" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 0 Q2 -16 6 -20" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M0 0 Q6 -12 12 -16" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            ))}

            {/* Winding Ant Trail Line (The Disciplined Path of Systematic Savings) */}
            <path
              d="M 40 185 Q 320 155 600 190 Q 880 215 1160 180 Q 1310 160 1400 240"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="8 8"
              opacity="0.85"
            />

            {/* SUBTERRANEAN GRANARY VAULT (Underground Safe Haven from Rain) */}
            <g transform="translate(1300, 180)">
              
              {/* Burrow Chamber Cavity */}
              <ellipse 
                cx="140" 
                cy="110" 
                rx="145" 
                ry="95" 
                fill="#18181B" 
                stroke="#F59E0B" 
                strokeWidth="2.5" 
                strokeDasharray="6 6" 
              />

              {/* Chamber Glow from Stored Wealth */}
              <ellipse 
                cx="140" 
                cy="110" 
                rx="120" 
                ry="70" 
                fill="#FEF08A" 
                opacity="0.08" 
                className="animate-grain-glow" 
              />

              {/* Tunnel Entrance Marker */}
              <path d="M 80 40 L 105 75" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              
              {/* Vault Banner Sign */}
              <g transform="translate(140, 48)">
                <rect x="-85" y="-12" width="170" height="20" rx="8" fill="#27272A" stroke="#CA8A04" strokeWidth="1.5" />
                <text x="0" y="2" textAnchor="middle" fill="#FDE047" fontSize="9" fontWeight="bold" letterSpacing="0.8">
                  NATURE'S SAVINGS VAULT
                </text>
              </g>

              {/* MASSIVE STACKED CORN & GRAIN PYRAMID (The Ant Colony's Accumulated Food Reserve) */}
              <g id="granary-grain-pyramid">
                {[
                  // Base Layer of Grains
                  { cx: 55, cy: 140, r: 9 }, { cx: 75, cy: 142, r: 8.5 }, { cx: 95, cy: 139, r: 9.5 },
                  { cx: 115, cy: 143, r: 9 }, { cx: 135, cy: 140, r: 9 }, { cx: 155, cy: 142, r: 8.5 },
                  { cx: 175, cy: 139, r: 9 }, { cx: 195, cy: 142, r: 9 }, { cx: 215, cy: 140, r: 8.5 },
                  // Second Layer
                  { cx: 68, cy: 124, r: 9 }, { cx: 88, cy: 122, r: 9.5 }, { cx: 108, cy: 125, r: 9 },
                  { cx: 128, cy: 121, r: 9.5 }, { cx: 148, cy: 124, r: 9 }, { cx: 168, cy: 122, r: 9 },
                  { cx: 188, cy: 125, r: 8.5 }, { cx: 205, cy: 123, r: 8 },
                  // Third Layer
                  { cx: 80, cy: 107, r: 9 }, { cx: 100, cy: 105, r: 9.5 }, { cx: 120, cy: 108, r: 9 },
                  { cx: 140, cy: 104, r: 9.5 }, { cx: 160, cy: 107, r: 9 }, { cx: 180, cy: 105, r: 8.5 },
                  // Peak Layer
                  { cx: 95, cy: 90, r: 8.5 }, { cx: 115, cy: 88, r: 9 }, { cx: 135, cy: 89, r: 9 },
                  { cx: 155, cy: 88, r: 8.5 }, { cx: 125, cy: 73, r: 9 }, { cx: 145, cy: 74, r: 8.5 }
                ].map((g, idx) => (
                  <g key={idx} transform={`rotate(${(idx * 23) % 45 - 22} ${g.cx} ${g.cy})`}>
                    <ellipse
                      cx={g.cx}
                      cy={g.cy}
                      rx={g.r * 1.35}
                      ry={g.r * 0.85}
                      fill="url(#goldenGrainGrad)"
                      stroke="#FEF08A"
                      strokeWidth="1"
                    />
                    <line
                      x1={g.cx - g.r * 0.7}
                      y1={g.cy}
                      x2={g.cx + g.r * 0.7}
                      y2={g.cy}
                      stroke="#92400E"
                      strokeWidth="0.8"
                      opacity="0.7"
                    />
                  </g>
                ))}
              </g>

              {/* Little Ant Sorters inside Granary organizing provisions */}
              <g transform="translate(60, 155) scale(0.75)">
                <ellipse cx="25" cy="0" rx="4.5" ry="3.5" fill="#F59E0B" />
                <ellipse cx="16" cy="0" rx="5" ry="3" fill="#D97706" />
                <ellipse cx="6" cy="0" rx="7.5" ry="5" fill="#92400E" />
                <path d="M18 -2 L22 -7" stroke="#F59E0B" strokeWidth="1" />
                <path d="M18 2 L22 7" stroke="#F59E0B" strokeWidth="1" />
              </g>
              <g transform="translate(210, 155) scale(-0.75, 0.75)">
                <ellipse cx="25" cy="0" rx="4.5" ry="3.5" fill="#F59E0B" />
                <ellipse cx="16" cy="0" rx="5" ry="3" fill="#D97706" />
                <ellipse cx="6" cy="0" rx="7.5" ry="5" fill="#92400E" />
                <path d="M18 -2 L22 -7" stroke="#F59E0B" strokeWidth="1" />
                <path d="M18 2 L22 7" stroke="#F59E0B" strokeWidth="1" />
              </g>
            </g>

            {/* BUSY MARCHING ANTS WITH GOLDEN FOOD ON BACKS (The Trail to the Vault) */}
            {[
              { x: 120, y: 172, angle: -2 },
              { x: 240, y: 162, angle: 3 },
              { x: 370, y: 168, angle: -1 },
              { x: 500, y: 176, angle: 4 },
              { x: 630, y: 188, angle: 2 },
              { x: 760, y: 198, angle: -1 },
              { x: 890, y: 202, angle: 2 },
              { x: 1020, y: 194, angle: -3 },
              { x: 1150, y: 182, angle: 5 },
              { x: 1260, y: 192, angle: 18 },
              { x: 1340, y: 226, angle: 32 }
            ].map((ant, aIdx) => (
              <g 
                key={aIdx} 
                transform={`translate(${ant.x}, ${ant.y}) rotate(${ant.angle})`}
                className="animate-ant-bob"
                style={{ animationDelay: `${aIdx * 0.15}s` }}
              >
                {/* Ant Head */}
                <ellipse cx="28" cy="0" rx="5" ry="4" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
                {/* Mandibles holding grain tether */}
                <path d="M 32 -2 L 36 -1 L 33 0" stroke="#78350F" strokeWidth="1" fill="none" />
                {/* Antennae */}
                <path d="M 31 -2 Q 36 -8 40 -9" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 31 2 Q 36 8 40 9" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                
                {/* Ant Thorax */}
                <ellipse cx="17" cy="0" rx="5.5" ry="3.8" fill="#D97706" />
                
                {/* Ant Abdomen */}
                <ellipse cx="5" cy="0" rx="9" ry="6" fill="#92400E" stroke="#B45309" strokeWidth="0.8" />
                
                {/* 6 Jointed Marching Legs */}
                <path d="M 20 -3 L 25 -9 L 21 -14" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 17 -3 L 17 -10 L 13 -15" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 13 -3 L 9 -9 L 5 -14" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                
                <path d="M 20 3 L 25 9 L 21 14" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 17 3 L 17 10 L 13 15" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M 13 3 L 9 9 L 5 14" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />

                {/* THE GOLDEN GRAIN / FOOD STORED FOR RAINY SEASONS (Carried on Back) */}
                <g transform="translate(17, -13) rotate(-12)">
                  <ellipse 
                    cx="0" 
                    cy="0" 
                    rx="10" 
                    ry="6" 
                    fill="url(#goldenGrainGrad)" 
                    stroke="#FEF08A" 
                    strokeWidth="1.2" 
                    className="animate-grain-glow" 
                  />
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#78350F" strokeWidth="0.9" opacity="0.7" />
                  <circle cx="2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8" />
                </g>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* 3. NATURE'S SAVINGS INTERACTIVE BAR (Docked at Top for User Engagement) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
        <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900/90 to-teal-950/80 border border-amber-500/35 p-3.5 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Metaphor Badge & Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-teal-500/20 border border-amber-400/40 text-amber-300 shadow-md">
                <Leaf className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300 font-['Cinzel',serif] text-sm tracking-wide">
                    Nature's Savings
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Fable
                  </span>
                </div>
                <p className="text-stone-300 text-xs hidden md:block mt-0.5">
                  Ants carry golden grains into subterranean vaults; weaver birds build weatherproof nests before the monsoon arrives.
                </p>
              </div>
            </div>

            {/* Right: Controls (Vivid Art Mode & Parable Drawer) */}
            <div className="flex items-center gap-2">
              {/* Rain animation toggle */}
              <button
                onClick={() => setRainActive(!rainActive)}
                className={`p-1.5 rounded-xl border transition-all text-xs flex items-center gap-1 ${
                  rainActive 
                    ? 'bg-teal-500/20 border-teal-500/40 text-teal-300' 
                    : 'bg-stone-950 border-stone-800 text-stone-400'
                }`}
                title={rainActive ? 'Monsoon Rain Active' : 'Rain Paused'}
              >
                <CloudRain className="w-3.5 h-3.5" />
              </button>

              {/* Vivid Art Mode Toggle */}
              <button
                onClick={() => setVividMode(!vividMode)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 border transition-all ${
                  vividMode
                    ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-md shadow-amber-400/20'
                    : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-400/40'
                }`}
                title="Toggle Illustration Contrast"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{vividMode ? 'Vivid Art: ON' : 'Vivid Art'}</span>
              </button>

              {/* Expand Story Drawer */}
              <button
                onClick={() => setShowStory(!showStory)}
                className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-stone-950/90 px-3 py-1.5 rounded-xl border border-stone-800 transition-colors"
              >
                <span>{showStory ? 'Close' : 'Parable'}</span>
                {showStory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* EXPANDABLE PARABLE CONTENT & SUITABLE PICTURE */}
          {showStory && (
            <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-5 text-xs animate-in fade-in duration-300">
              
              {/* 3 Parable Principles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card 1: The Ants */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-stone-950 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                      <Wheat className="w-4 h-4" />
                    </div>
                    <span>1. The Worker Ants (Disciplined SIPs)</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Worker ants do not wait for the storm clouds to break. Day after day, they methodically carry individual golden grains down into deep earthen granaries. In the same way, monthly systematic investments (SIPs) and liquid emergency deposits build an unshakeable rainy-day vault.
                  </p>
                  <div className="text-[10px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-lg inline-block">
                    Principle: Consistent Small Contributions
                  </div>
                </div>

                {/* Card 2: The Birds */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-950/60 to-stone-950 border border-teal-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-teal-300 font-bold">
                    <div className="p-1 rounded-lg bg-teal-500/20 text-teal-400">
                      <Feather className="w-4 h-4" />
                    </div>
                    <span>2. The Weaver Birds (SBI Protection Shield)</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    The Baya Weaver bird architects downward-facing, waterproof hanging nests and provisions them with seeds so fledglings are warm, dry, and fed when monsoon gales blow. SBI Life Child, Pension & Corporate schemes provide an identical weatherproof safety canopy.
                  </p>
                  <div className="text-[10px] font-mono text-teal-400/90 bg-teal-500/10 px-2.5 py-1 rounded-lg inline-block">
                    Principle: Guaranteed Family Protection
                  </div>
                </div>

                {/* Card 3: The Rainy Season */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/60 via-rose-950/40 to-stone-950 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between text-purple-300 font-bold">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <span>3. Emergency Reserve (Your Vault)</span>
                    </div>
                    <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                      8.5 Mo Stored
                    </span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Unforeseen life events arrive without warning—medical emergencies, market dips, or economic disruptions. With your verified bank balance and SBI Life guaranteed sum assured, your family and enterprise are fully secured.
                  </p>
                  <div className="text-[10px] font-mono text-purple-300/90 bg-purple-500/10 px-2.5 py-1 rounded-lg inline-block">
                    Status: Weatherproofed & Prepared
                  </div>
                </div>

              </div>

              {/* SUITABLE PICTURE PLACED UNDER PARABLE SCHEMEWISE */}
              <SchemewiseParablePicture 
                onOpenAiAnt={onOpenAiAnt} 
                onOpenEnquiry={onOpenEnquiry} 
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
};
