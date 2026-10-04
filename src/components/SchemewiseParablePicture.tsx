import React, { useState } from 'react';
import { 
  Sparkles, 
  Wheat, 
  Feather, 
  Droplets, 
  ShieldCheck, 
  Building2, 
  HeartHandshake, 
  Baby, 
  Sun, 
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { SBI_SCHEMES, SbiScheme } from '../data/sbiSchemes.ts';

interface SchemewiseParablePictureProps {
  onOpenAiAnt?: (schemeId: string) => void;
  onOpenEnquiry?: (scheme: SbiScheme) => void;
}

export type SchemeParableCategory = 'child' | 'pension' | 'women' | 'employer-employee' | 'traditional' | 'all';

export const SchemewiseParablePicture: React.FC<SchemewiseParablePictureProps> = ({
  onOpenAiAnt,
  onOpenEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SchemeParableCategory>('child');
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('sbi-smart-champ');

  // When category changes, pick first scheme of that category
  const handleCategoryChange = (cat: SchemeParableCategory) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      setSelectedSchemeId('sbi-smart-champ');
    } else {
      const match = SBI_SCHEMES.find(s => s.category === cat);
      if (match) setSelectedSchemeId(match.id);
    }
  };

  const handleSchemeSelect = (id: string) => {
    setSelectedSchemeId(id);
    const found = SBI_SCHEMES.find(s => s.id === id);
    if (found) {
      setSelectedCategory(found.category);
    }
  };

  const currentScheme = SBI_SCHEMES.find(s => s.id === selectedSchemeId) || SBI_SCHEMES[0];

  return (
    <div className="rounded-3xl overflow-hidden border border-amber-500/40 bg-stone-950 shadow-2xl relative">
      
      {/* Header with Title & Schemewise Tabs */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/90 via-stone-900 to-teal-950/90 border-b border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-300 font-['Cinzel',serif] tracking-wider flex items-center gap-2">
                Schemewise Nature's Savings Parable Pictures
                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Illustrated
                </span>
              </h4>
              <p className="text-[11px] text-stone-300">
                Visualizing how ants & weaver birds store and protect across each specific financial need
              </p>
            </div>
          </div>

          {/* Scheme Quick Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-stone-400 font-medium whitespace-nowrap hidden sm:inline">
              Target Scheme:
            </label>
            <select
              value={selectedSchemeId}
              onChange={(e) => handleSchemeSelect(e.target.value)}
              className="bg-stone-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400"
            >
              <optgroup label="Child Education Schemes">
                <option value="sbi-smart-champ">SBI Life - Smart Champ</option>
                <option value="sbi-smart-scholar">SBI Life - Smart Scholar</option>
              </optgroup>
              <optgroup label="Pension & Retirement Schemes">
                <option value="sbi-retire-smart">SBI Life - Retire Smart</option>
                <option value="sbi-saral-pension">SBI Life - Saral Pension</option>
              </optgroup>
              <optgroup label="Women Wealth & Health">
                <option value="sbi-smart-women-advantage">SBI Life - Smart Women Advantage</option>
              </optgroup>
              <optgroup label="Employer-Employee Corporate">
                <option value="sbi-sampoorn-suraksha">SBI Life - Sampoorn Suraksha</option>
                <option value="sbi-kalyan-ulip-plus">SBI Life - Kalyan ULIP Plus</option>
                <option value="sbi-kalyan-gratuity">SBI Life - Kalyan Gratuity Plus</option>
              </optgroup>
              <optgroup label="Traditional Whole Life & Savings">
                <option value="sbi-shubh-nivesh">SBI Life - Shubh Nivesh</option>
                <option value="sbi-smart-platina-assure">SBI Life - Smart Platina Assure</option>
                <option value="sbi-smart-humsafar">SBI Life - Smart Humsafar</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Schemewise Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => handleCategoryChange('child')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'child'
                ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-rose-400/40 hover:text-rose-300'
            }`}
          >
            <span>🐣</span>
            <span>Child Education Schemes</span>
          </button>

          <button
            onClick={() => handleCategoryChange('pension')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'pension'
                ? 'bg-amber-500 text-black border-amber-300 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-400/40 hover:text-amber-300'
            }`}
          >
            <span>🍯</span>
            <span>Retirement & Pension</span>
          </button>

          <button
            onClick={() => handleCategoryChange('women')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'women'
                ? 'bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-pink-400/40 hover:text-pink-300'
            }`}
          >
            <span>🌸</span>
            <span>Women Wealth & Health</span>
          </button>

          <button
            onClick={() => handleCategoryChange('employer-employee')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'employer-employee'
                ? 'bg-sky-500 text-black border-sky-300 shadow-md shadow-sky-500/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-sky-400/40 hover:text-sky-300'
            }`}
          >
            <span>🏛️</span>
            <span>Employer-Employee Group</span>
          </button>

          <button
            onClick={() => handleCategoryChange('traditional')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'traditional'
                ? 'bg-emerald-500 text-black border-emerald-300 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-emerald-400/40 hover:text-emerald-300'
            }`}
          >
            <span>🌾</span>
            <span>Whole Life & Savings</span>
          </button>

          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/20 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
            }`}
          >
            <span>🌿</span>
            <span>Full Colony Landscape</span>
          </button>
        </div>
      </div>

      {/* Picture Canvas Container */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] bg-stone-950 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* SCENE 1: CHILD EDUCATION SCHEMES (Ants & Weaver Birds Feeding Fledglings) */}
        {/* ========================================================================= */}
        {(selectedCategory === 'child') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="childSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="40%" stopColor="#312E81" />
                <stop offset="80%" stopColor="#831843" />
                <stop offset="100%" stopColor="#FB7185" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="childRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.5" />
                <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Twilight Sky */}
            <rect width="1200" height="500" fill="url(#childSky)" />

            {/* Hope Rainbow */}
            <path d="M 50 300 A 700 400 0 0 1 1150 300" stroke="url(#childRainbow)" strokeWidth="22" fill="none" opacity="0.75" />

            {/* Rain Clouds & Soft Drizzle */}
            <path d="M 120 70 Q 180 30 240 55 Q 300 25 380 55 Q 430 30 480 70 Q 510 110 460 130 L 130 130 Z" fill="#60A5FA" opacity="0.3" />
            <path d="M 680 80 Q 740 40 800 65 Q 860 35 940 65 Q 990 40 1040 80 Q 1070 120 1020 140 L 690 140 Z" fill="#F472B6" opacity="0.25" />
            
            {/* Gentle rain streaks */}
            {[200, 240, 280, 320, 360, 750, 790, 830, 870, 910].map((rx, idx) => (
              <line key={idx} x1={rx} y1={135} x2={rx - 15} y2={210} stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.6" />
            ))}

            {/* Lush Teak & Lotus Rain Shelter Leaves */}
            <path d="M -50 340 Q 200 240 450 300 Q 700 360 950 280 Q 1100 240 1250 280 L 1250 500 L -50 500 Z" fill="#064E3B" opacity="0.9" />
            <path d="M -50 390 Q 250 310 600 370 Q 900 420 1250 340 L 1250 500 L -50 500 Z" fill="#022C22" />

            {/* Giant Baya Tree Branch */}
            <path d="M 100 0 Q 300 120 600 90 Q 900 60 1150 140" stroke="#78350F" strokeWidth="26" strokeLinecap="round" />
            <path d="M 550 100 Q 620 160 700 170" stroke="#854D0E" strokeWidth="12" strokeLinecap="round" />

            {/* Large Lotus Leaf Canopy Umbrella */}
            <g transform="translate(380, 60)">
              <path d="M 0 50 Q 80 0 160 50 Q 240 100 180 130 Q 100 150 0 110 Z" fill="#059669" stroke="#10B981" strokeWidth="2" opacity="0.9" />
              <path d="M 80 25 L 80 120" stroke="#34D399" strokeWidth="1.5" opacity="0.6" />
              {/* Raindrop rolling off leaf */}
              <circle cx="170" cy="115" r="4.5" fill="#38BDF8" className="animate-pulse" />
            </g>

            {/* WEAVER BIRD NEST: NURSERY FOR YOUNG FLEDGLINGS */}
            <g transform="translate(560, 95)">
              <line x1="25" y1="0" x2="25" y2="45" stroke="#CA8A04" strokeWidth="4" />
              <path d="M 8 45 Q 25 28 42 45 Q 65 80 52 130 Q 38 170 25 185 Q 12 170 -2 130 Q -15 80 8 45 Z" fill="#854D0E" stroke="#F59E0B" strokeWidth="3" />
              <path d="M 15 155 L 15 195 Q 25 204 35 195 L 35 155 Z" fill="#713F12" stroke="#CA8A04" strokeWidth="2.5" />
              
              {/* Nursery Window & Cute Fledglings */}
              <ellipse cx="25" cy="110" rx="18" ry="14" fill="#1C1917" stroke="#FDE047" strokeWidth="1.5" />
              
              {/* Two cute hungry baby birds */}
              <g transform="translate(18, 102)">
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="#F472B6" />
                <polygon points="5,-1 11,1 5,3" fill="#F59E0B" />
                <circle cx="-1" cy="-1.5" r="1.2" fill="#000" />
              </g>
              <g transform="translate(28, 104)">
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="#FB7185" />
                <polygon points="5,-1 11,1 5,3" fill="#F59E0B" />
                <circle cx="-1" cy="-1.5" r="1.2" fill="#000" />
              </g>

              {/* Stored Golden Grain Clusters in Nest */}
              <ellipse cx="20" cy="126" rx="6" ry="3.5" fill="#FDE047" />
              <ellipse cx="28" cy="124" rx="5.5" ry="3.2" fill="#FDE047" />
            </g>

            {/* PARENT WEAVER BIRD FEEDING GRAIN TO THE BABY */}
            <g transform="translate(490, 150) scale(0.95)">
              <ellipse cx="40" cy="50" rx="22" ry="14" fill="#059669" stroke="#34D399" strokeWidth="2" />
              <circle cx="62" cy="44" r="10" fill="#047857" stroke="#10B981" strokeWidth="1.5" />
              <circle cx="64.5" cy="42" r="2.2" fill="#FFF" />
              <circle cx="65" cy="42" r="1.1" fill="#000" />
              <polygon points="72,42 84,46 72,50" fill="#F59E0B" />
              {/* Golden grain stalk in beak pointed toward nest */}
              <ellipse cx="88" cy="46" rx="6" ry="3.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
              {/* Wing */}
              <path d="M 32 46 Q 16 20 48 14 Q 54 36 42 50 Z" fill="#10B981" />
            </g>

            {/* WORKER ANTS CARRYING SPECIAL NURSERY GRAINS TO THE YOUNG */}
            <g transform="translate(150, 310)">
              {/* Pathway */}
              <path d="M 0 50 Q 250 20 500 45 Q 750 70 950 40" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.8" />
              
              {/* Marching worker ants */}
              {[
                { x: 50, y: 46, scale: 0.9, grain: 'Golden Wheat' },
                { x: 170, y: 38, scale: 0.95, grain: 'Sweet Corn' },
                { x: 290, y: 35, scale: 1.0, grain: 'Sesame Seed' },
                { x: 410, y: 42, scale: 0.9, grain: 'Honey Dewdrop' },
                { x: 530, y: 48, scale: 0.85, grain: 'Pollen Cake' }
              ].map((ant, idx) => (
                <g key={idx} transform={`translate(${ant.x}, ${ant.y}) scale(${ant.scale})`}>
                  {/* Ant Body */}
                  <ellipse cx="20" cy="0" rx="4.5" ry="3.5" fill="#F59E0B" />
                  <ellipse cx="12" cy="0" rx="4.8" ry="3.2" fill="#D97706" />
                  <ellipse cx="3" cy="0" rx="7" ry="4.5" fill="#92400E" />
                  {/* Legs */}
                  <path d="M 14 -2 L 18 -6" stroke="#F59E0B" strokeWidth="1.2" />
                  <path d="M 10 -2 L 10 -6" stroke="#F59E0B" strokeWidth="1.2" />
                  <path d="M 6 -2 L 2 -6" stroke="#F59E0B" strokeWidth="1.2" />
                  <path d="M 14 2 L 18 6" stroke="#F59E0B" strokeWidth="1.2" />
                  <path d="M 10 2 L 10 6" stroke="#F59E0B" strokeWidth="1.2" />
                  <path d="M 6 2 L 2 6" stroke="#F59E0B" strokeWidth="1.2" />
                  {/* Glowing nursery grain held aloft */}
                  <ellipse cx="12" cy="-10" rx="8" ry="4.8" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
                </g>
              ))}

              {/* Subterranean Nursery Chamber Sign */}
              <g transform="translate(750, 40)">
                <rect x="-90" y="-12" width="180" height="24" rx="8" fill="#1C1917" stroke="#F43F5E" strokeWidth="1.5" />
                <text x="0" y="4" textAnchor="middle" fill="#FDA4AF" fontSize="10" fontWeight="bold">
                  COLLEGE MILESTONE NURSERY
                </text>
              </g>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SCENE 2: PENSION & RETIREMENT (Elder Ant's Warm Honey & Grain Sanctuary) */}
        {/* ========================================================================= */}
        {(selectedCategory === 'pension') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="pensionBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#27272A" />
                <stop offset="40%" stopColor="#18181B" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <radialGradient id="hearthGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#D97706" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Cozy Underground Chamber Vault */}
            <rect width="1200" height="500" fill="url(#pensionBg)" />

            {/* Earth roots hanging down from ceiling */}
            {[80, 160, 240, 340, 480, 620, 780, 920, 1050].map((rx, idx) => (
              <path key={idx} d={`M ${rx} 0 Q ${rx + 10} 40 ${rx - 5} 80`} stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            ))}

            {/* Hearth Lantern Glow */}
            <circle cx="680" cy="280" r="180" fill="url(#hearthGlow)" />

            {/* Hearth Lantern Hanging */}
            <g transform="translate(680, 210)">
              <line x1="0" y1="-80" x2="0" y2="0" stroke="#CA8A04" strokeWidth="2.5" />
              <polygon points="-16,0 16,0 10,40 -10,40" fill="#27272A" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="0" cy="20" r="10" fill="#FEF08A" className="animate-pulse" />
            </g>

            {/* ELDER ANT RELAXING ON COZY MOSS ARMCHAIR */}
            <g transform="translate(380, 240)">
              {/* Earthen Moss Couch */}
              <ellipse cx="60" cy="90" rx="70" ry="35" fill="#065F46" stroke="#10B981" strokeWidth="2" />
              <ellipse cx="60" cy="85" rx="55" ry="25" fill="#047857" />
              
              {/* Cozy moss cushion / pillow */}
              <ellipse cx="110" cy="70" rx="22" ry="14" fill="#059669" />

              {/* Elder Ant Body (Leaning back comfortably) */}
              <ellipse cx="30" cy="65" rx="22" ry="14" fill="#78350F" stroke="#92400E" strokeWidth="2" />
              <ellipse cx="65" cy="55" rx="14" ry="10" fill="#92400E" />
              <ellipse cx="95" cy="45" rx="15" ry="12" fill="#B45309" stroke="#F59E0B" strokeWidth="1.5" />
              
              {/* Warm woven shawl around shoulders */}
              <path d="M 52 48 Q 65 42 78 48 L 74 65 Q 65 68 54 65 Z" fill="#CA8A04" stroke="#FEF08A" strokeWidth="1" />

              {/* Elder Ant Spectacles */}
              <circle cx="98" cy="43" r="4.5" stroke="#FEF08A" strokeWidth="1.5" fill="none" />
              <circle cx="106" cy="42" r="4.5" stroke="#FEF08A" strokeWidth="1.5" fill="none" />
              <line x1="102" y1="42" x2="103" y2="42" stroke="#FEF08A" strokeWidth="1.5" />
              
              {/* Gentle smile of satisfaction */}
              <path d="M 98 50 Q 104 54 108 50" stroke="#78350F" strokeWidth="1.8" fill="none" />
              
              {/* Steaming Mug of Hot Honey Nectar */}
              <g transform="translate(125, 48)">
                <rect x="0" y="0" width="14" height="18" rx="3" fill="#D97706" stroke="#FEF08A" strokeWidth="1" />
                <path d="M 14 4 Q 19 8 14 14" stroke="#FEF08A" strokeWidth="1" fill="none" />
                {/* Steam wisps */}
                <path d="M 4 -3 Q 8 -10 4 -16" stroke="#FEF08A" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.6" className="animate-pulse" />
              </g>
            </g>

            {/* HONEY JARS & HEAPED GRAIN BUSHELS (Lifelong Pension Reserves) */}
            <g transform="translate(780, 260)">
              {/* Terracotta Honey Pot 1 */}
              <path d="M 0 40 Q -15 15 0 0 L 35 0 Q 50 15 35 40 Z" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
              <ellipse cx="17" cy="0" rx="18" ry="6" fill="#D97706" />
              <ellipse cx="17" cy="0" rx="14" ry="4" fill="#FEF08A" />
              <text x="17" y="24" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="bold">HONEY</text>

              {/* Terracotta Pot 2 */}
              <g transform="translate(45, 10)">
                <path d="M 0 35 Q -12 12 0 0 L 30 0 Q 42 12 30 35 Z" fill="#92400E" stroke="#CA8A04" strokeWidth="1.8" />
                <ellipse cx="15" cy="0" rx="15" ry="5" fill="#B45309" />
                <text x="15" y="20" textAnchor="middle" fill="#FDE047" fontSize="7" fontWeight="bold">SEEDS</text>
              </g>

              {/* Stored Golden Grain Pyramid */}
              <g transform="translate(100, 15)">
                {[
                  { cx: 0, cy: 30 }, { cx: 16, cy: 30 }, { cx: 32, cy: 30 }, { cx: 48, cy: 30 },
                  { cx: 8, cy: 18 }, { cx: 24, cy: 18 }, { cx: 40, cy: 18 },
                  { cx: 16, cy: 6 }, { cx: 32, cy: 6 }, { cx: 24, cy: -6 }
                ].map((pos, pIdx) => (
                  <ellipse key={pIdx} cx={pos.cx} cy={pos.cy} rx="9" ry="6" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
                ))}
              </g>
            </g>

            {/* Exterior Window Showing Cold Storm Outside */}
            <g transform="translate(120, 100)">
              <rect x="0" y="0" width="140" height="100" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              {/* Rain Streaks in window */}
              {[20, 45, 70, 95, 120].map((wx, wIdx) => (
                <line key={wIdx} x1={wx} y1="10" x2={wx - 10} y2="90" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />
              ))}
              <text x="70" y="55" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="bold">
                Storm Outside
              </text>
            </g>

            {/* Chamber Banner */}
            <g transform="translate(600, 440)">
              <rect x="-140" y="-14" width="280" height="28" rx="10" fill="#1C1917" stroke="#F59E0B" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold" letterSpacing="0.8">
                GOLDEN YEARS ANNUITY SANCTUARY
              </text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SCENE 3: WOMEN WEALTH & HEALTH (Queen's Crystal Nursery & Herbal Shield) */}
        {/* ========================================================================= */}
        {(selectedCategory === 'women') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="womenBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="50%" stopColor="#4A044E" />
                <stop offset="100%" stopColor="#831843" />
              </linearGradient>
            </defs>

            {/* Crystal Cavern Background */}
            <rect width="1200" height="500" fill="url(#womenBg)" />

            {/* Glowing Emerald and Rose Quartz Crystal Clusters */}
            {[
              { x: 100, y: 150, color: '#34D399', scale: 1 },
              { x: 220, y: 220, color: '#F472B6', scale: 0.8 },
              { x: 950, y: 180, color: '#34D399', scale: 1.2 },
              { x: 1060, y: 260, color: '#F472B6', scale: 0.9 }
            ].map((c, idx) => (
              <g key={idx} transform={`translate(${c.x}, ${c.y}) scale(${c.scale})`}>
                <polygon points="0,-40 12,-20 8,30 -8,30 -12,-20" fill={c.color} opacity="0.85" className="animate-pulse" />
                <polygon points="12,-20 25,-5 20,30 8,30" fill={c.color} opacity="0.6" />
                <polygon points="-12,-20 -25,-5 -20,30 -8,30" fill={c.color} opacity="0.6" />
              </g>
            ))}

            {/* Sacred Tulsi & Healing Jasmine Herb Plants (Healthcare Shield) */}
            <g transform="translate(180, 280)">
              <path d="M 50 150 Q 30 70 80 20" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="60" cy="60" rx="18" ry="10" fill="#10B981" />
              <ellipse cx="90" cy="30" rx="16" ry="9" fill="#10B981" />
              {/* Jasmine white flower */}
              <circle cx="85" cy="15" r="7" fill="#FFF" />
              <circle cx="85" cy="15" r="3" fill="#FDE047" />
            </g>

            {/* REGAL QUEEN ANT WITH MAJESTIC CROWN & JEWELED SHIELD */}
            <g transform="translate(540, 200)">
              {/* Royal Golden Pedestal */}
              <ellipse cx="60" cy="160" rx="100" ry="35" fill="#4C1D95" stroke="#F43F5E" strokeWidth="2.5" />
              <ellipse cx="60" cy="155" rx="80" ry="24" fill="#581C87" />

              {/* Queen Ant Body */}
              <ellipse cx="20" cy="120" rx="35" ry="22" fill="#BE123C" stroke="#FB7185" strokeWidth="2.5" />
              <ellipse cx="60" cy="100" rx="20" ry="14" fill="#9F1239" stroke="#E11D48" strokeWidth="2" />
              <ellipse cx="100" cy="80" rx="22" ry="18" fill="#E11D48" stroke="#FDA4AF" strokeWidth="2" />
              
              {/* Queen's Golden Tiara / Crown */}
              <polygon points="90,65 96,48 102,62 108,46 114,65" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
              <circle cx="96" cy="48" r="2.5" fill="#F43F5E" />
              <circle cx="108" cy="46" r="2.5" fill="#10B981" />

              {/* Antennae with Sparkling Jewels */}
              <path d="M 105 65 Q 115 40 128 32" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
              <circle cx="128" cy="32" r="3" fill="#38BDF8" className="animate-ping" />
              
              {/* Jeweled Medical Healthcare Shield Held */}
              <g transform="translate(115, 85)">
                <path d="M 0 0 L 26 0 L 26 24 Q 13 36 0 24 Z" fill="#0D9488" stroke="#5EEAD4" strokeWidth="2" />
                {/* Red Medical Cross for Critical Illness Protection */}
                <rect x="10" y="6" width="6" height="16" fill="#FFF" rx="1" />
                <rect x="5" y="11" width="16" height="6" fill="#FFF" rx="1" />
              </g>
            </g>

            {/* MOTHER WEAVER BIRD GUARDING THE ROYAL NURSERY */}
            <g transform="translate(320, 130) scale(0.9)">
              <ellipse cx="40" cy="50" rx="22" ry="14" fill="#BE123C" stroke="#FDA4AF" strokeWidth="2" />
              <circle cx="62" cy="44" r="10" fill="#9F1239" />
              <polygon points="72,42 82,45 72,48" fill="#F59E0B" />
              <path d="M 32 46 Q 18 25 46 20 Z" fill="#E11D48" />
            </g>

            {/* Banner */}
            <g transform="translate(600, 450)">
              <rect x="-150" y="-14" width="300" height="28" rx="10" fill="#1C1917" stroke="#F43F5E" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FDA4AF" fontSize="12" fontWeight="bold" letterSpacing="0.8">
                QUEEN'S RESILIENCE & HEALTH SHIELD
              </text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SCENE 4: EMPLOYER-EMPLOYEE CORPORATE (United Colony Fortress & Division) */}
        {/* ========================================================================= */}
        {(selectedCategory === 'employer-employee') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="corpSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#082F49" />
                <stop offset="50%" stopColor="#0C4A6E" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
            </defs>

            {/* Corporate Dawn Sky */}
            <rect width="1200" height="500" fill="url(#corpSky)" />

            {/* Rising Morning Sun (Economic Growth) */}
            <circle cx="600" cy="180" r="130" fill="#0284C7" opacity="0.3" />
            <circle cx="600" cy="180" r="80" fill="#38BDF8" opacity="0.4" />

            {/* THE MASSIVE ANTHILL CITADEL / FORTRESS (The Enterprise) */}
            <path
              d="M 150 480 Q 300 200 600 160 Q 900 200 1050 480 Z"
              fill="#1C1917"
              stroke="#0284C7"
              strokeWidth="3"
            />
            <path
              d="M 250 480 Q 400 240 600 200 Q 800 240 950 480 Z"
              fill="#27272A"
            />

            {/* Multiple Reinforced Tier Chambers (Departments & Teams) */}
            {[
              { cx: 600, cy: 260, label: 'EXECUTIVE VAULT (KEYMAN)' },
              { cx: 480, cy: 340, label: 'ENGINEERING & OPS' },
              { cx: 720, cy: 340, label: 'GRATUITY TRUST CHAMBER' },
              { cx: 600, cy: 410, label: 'COLONY EMPLOYEES SHIELD' }
            ].map((cham, cIdx) => (
              <g key={cIdx} transform={`translate(${cham.cx}, ${cham.cy})`}>
                <ellipse cx="0" cy="0" rx="90" ry="28" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
                <text x="0" y="3" textAnchor="middle" fill="#7DD3FC" fontSize="8" fontWeight="bold">
                  {cham.label}
                </text>
              </g>
            ))}

            {/* TEAMS OF WORKER ANTS COOPERATING TOGETHER */}
            {/* Team 1: Lifting Heavy Pine Needle Girder in Unison */}
            <g transform="translate(300, 150)">
              {/* Heavy Timber Girder */}
              <rect x="0" y="20" width="160" height="8" rx="3" fill="#78350F" stroke="#CA8A04" strokeWidth="1.5" />
              {/* 3 Ants lifting together */}
              {[20, 75, 130].map((ax, idx) => (
                <g key={idx} transform={`translate(${ax}, 32)`}>
                  <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#38BDF8" />
                  <ellipse cx="-7" cy="0" rx="4.5" ry="3" fill="#0284C7" />
                  <ellipse cx="-15" cy="0" rx="6.5" ry="4" fill="#0369A1" />
                  {/* Lifting Arms pushing timber up */}
                  <line x1="-3" y1="-2" x2="-3" y2="-12" stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1="3" y1="-2" x2="3" y2="-12" stroke="#38BDF8" strokeWidth="1.5" />
                </g>
              ))}
              <text x="80" y="12" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontWeight="bold">
                TEAMWORK & SYNERGY
              </text>
            </g>

            {/* Team 2: Sentinel Ants Guarding the Gate (Section 37(1) Shield) */}
            <g transform="translate(850, 360)">
              <ellipse cx="0" cy="0" rx="6" ry="4" fill="#F59E0B" />
              <ellipse cx="-8" cy="0" rx="5" ry="3.5" fill="#D97706" />
              <ellipse cx="-17" cy="0" rx="7" ry="5" fill="#92400E" />
              {/* Institutional Guard Shield */}
              <polygon points="12,-15 28,-15 28,10 20,18 12,10" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
              <text x="20" y="2" textAnchor="middle" fill="#FFF" fontSize="6" fontWeight="bold">SEC 37</text>
            </g>

            {/* Fortress Banner */}
            <g transform="translate(600, 465)">
              <rect x="-170" y="-14" width="340" height="28" rx="10" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="bold" letterSpacing="0.8">
                THE UNITED COLONY CITADEL: 100% EMPLOYEE SHIELD
              </text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SCENE 5: TRADITIONAL WHOLE LIFE (Centuries Granary Vault up to Age 100)  */}
        {/* ========================================================================= */}
        {(selectedCategory === 'traditional') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="tradBg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="50%" stopColor="#292524" />
                <stop offset="100%" stopColor="#44403C" />
              </linearGradient>
            </defs>

            {/* Massive Ancient Stone Vault Carved into Bedrock */}
            <rect width="1200" height="500" fill="url(#tradBg)" />

            {/* Architectural Classical Stone Pillars */}
            {[100, 320, 540, 760, 980].map((px, idx) => (
              <g key={idx} transform={`translate(${px}, 40)`}>
                <rect x="-25" y="0" width="50" height="20" fill="#78716C" stroke="#A8A29E" strokeWidth="1.5" />
                <rect x="-18" y="20" width="36" height="360" fill="#57534E" stroke="#78716C" strokeWidth="1.5" />
                <rect x="-30" y="380" width="60" height="30" fill="#78716C" stroke="#A8A29E" strokeWidth="1.5" />
                {/* Fluting */}
                <line x1="-8" y1="25" x2="-8" y2="375" stroke="#44403C" strokeWidth="1.5" />
                <line x1="0" y1="25" x2="0" y2="375" stroke="#44403C" strokeWidth="1.5" />
                <line x1="8" y1="25" x2="8" y2="375" stroke="#44403C" strokeWidth="1.5" />
              </g>
            ))}

            {/* Giant Amphorae of Compound Bonuses */}
            {[210, 430, 650, 870].map((ax, idx) => (
              <g key={idx} transform={`translate(${ax}, 240)`}>
                <ellipse cx="0" cy="120" rx="35" ry="12" fill="#1C1917" />
                <path d="M -25 120 Q -40 60 -15 20 L 15 20 Q 40 60 25 120 Z" fill="#92400E" stroke="#F59E0B" strokeWidth="2" />
                <ellipse cx="0" cy="20" rx="18" ry="6" fill="#B45309" />
                {/* Overflowing Golden Harvest */}
                <circle cx="0" cy="15" r="14" fill="#FEF08A" opacity="0.9" className="animate-pulse" />
                <text x="0" y="75" textAnchor="middle" fill="#FEF08A" fontSize="9" fontWeight="bold">
                  BONUS {idx + 1}
                </text>
              </g>
            ))}

            {/* Inscribed Ancient Tablet (Lifelong Security to Age 100) */}
            <g transform="translate(600, 130)">
              <rect x="-140" y="-30" width="280" height="60" rx="12" fill="#18181B" stroke="#CA8A04" strokeWidth="2" />
              <text x="0" y="-8" textAnchor="middle" fill="#FDE047" fontSize="12" fontWeight="bold" letterSpacing="1">
                CENTENNIAL HERITAGE VAULT
              </text>
              <text x="0" y="14" textAnchor="middle" fill="#A1A1AA" fontSize="9">
                Guaranteed Legacy & Whole Life Regular Income up to Age 100
              </text>
            </g>

            {/* Worker Ants Rolling Ancient Golden Harvest Wheels */}
            <g transform="translate(480, 390)">
              <ellipse cx="0" cy="0" rx="6" ry="4" fill="#F59E0B" />
              <ellipse cx="-8" cy="0" rx="5" ry="3.5" fill="#D97706" />
              <ellipse cx="-17" cy="0" rx="7" ry="5" fill="#92400E" />
              {/* Golden Wheel */}
              <circle cx="16" cy="-4" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
              <line x1="16" y1="-18" x2="16" y2="10" stroke="#78350F" strokeWidth="1.5" />
              <line x1="2" y1="-4" x2="30" y2="-4" stroke="#78350F" strokeWidth="1.5" />
            </g>

            {/* Banner */}
            <g transform="translate(600, 465)">
              <rect x="-160" y="-14" width="320" height="28" rx="10" fill="#292524" stroke="#F59E0B" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold" letterSpacing="0.8">
                UNSHAKEABLE HERITAGE: 100-YEAR FAMILY COMPOUNDING
              </text>
            </g>
          </svg>
        )}

        {/* ========================================================================= */}
        {/* SCENE 6: FULL COLONY LANDSCAPE (Overview Mode) */}
        {/* ========================================================================= */}
        {(selectedCategory === 'all') && (
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover animate-in fade-in duration-300"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="allSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="50%" stopColor="#1C2541" />
                <stop offset="85%" stopColor="#3A506B" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="allRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            <rect width="1200" height="500" fill="url(#allSky)" />
            <circle cx="280" cy="180" r="110" fill="#FEF08A" opacity="0.3" />
            <path d="M -100 240 A 650 380 0 0 1 1100 240" stroke="url(#allRainbow)" strokeWidth="20" fill="none" />

            {/* Rolling Hills */}
            <path d="M -50 260 Q 200 210 460 250 Q 720 290 1000 230 Q 1120 210 1250 240 L 1250 500 L -50 500 Z" fill="#065F46" opacity="0.9" />
            <path d="M -50 320 Q 250 270 550 310 Q 820 340 1050 290 Q 1160 270 1250 300 L 1250 500 L -50 500 Z" fill="#047857" />

            {/* Banyan Tree & Weaver Bird Nest */}
            <g transform="translate(850, 60)">
              <path d="M 170 420 Q 140 240 100 130" stroke="#78350F" strokeWidth="28" strokeLinecap="round" />
              <circle cx="40" cy="80" r="55" fill="#065F46" />
              <circle cx="110" cy="70" r="50" fill="#059669" />
              {/* Nest */}
              <g transform="translate(-100, 110)">
                <line x1="20" y1="0" x2="20" y2="35" stroke="#CA8A04" strokeWidth="3" />
                <path d="M 6 35 Q 20 24 34 35 Q 48 65 38 98 Q 28 124 18 132 Q 8 124 -2 98 Q -10 65 6 35 Z" fill="#854D0E" stroke="#EAB308" strokeWidth="2" />
                <circle cx="20" cy="80" r="8" fill="#FEF08A" opacity="0.7" />
              </g>
            </g>

            {/* Marching Ants with Food */}
            <g transform="translate(80, 260)">
              <path d="M 40 130 Q 300 90 600 120 Q 800 140 1050 110" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" />
              {[60, 180, 300, 420, 540, 660, 780].map((ax, idx) => (
                <g key={idx} transform={`translate(${ax}, 120)`}>
                  <ellipse cx="20" cy="0" rx="4.5" ry="3.5" fill="#F59E0B" />
                  <ellipse cx="12" cy="0" rx="4.5" ry="3" fill="#D97706" />
                  <ellipse cx="3" cy="0" rx="6.5" ry="4.5" fill="#92400E" />
                  <ellipse cx="12" cy="-9" rx="8" ry="4.8" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
                </g>
              ))}
            </g>
          </svg>
        )}

      </div>

      {/* Picture Caption, Schemewise Insights & Action Hook */}
      <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 space-y-3">
        
        {/* Scheme Specific Narrative Box */}
        <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h5 className="text-xs font-bold text-amber-300 font-['Cinzel',serif]">
                {currentScheme.name}
              </h5>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {currentScheme.categoryLabel}
              </span>
            </div>

            <p className="text-xs text-stone-200 leading-relaxed max-w-3xl">
              {selectedCategory === 'child' && (
                <>
                  <strong>Child Education Metaphor:</strong> Parent weaver birds craft waterproof downward nests and worker ants feed fledglings directly. SBI Life ensures 4 scheduled milestone college payments at ages 18-21 with 100% premium waiver protection.
                </>
              )}
              {selectedCategory === 'pension' && (
                <>
                  <strong>Retirement Pension Metaphor:</strong> In winter, the elder ant rests safely inside warm underground honey vaults with zero worry about the blizzard outside. SBI Life provides up to 210% guaranteed additions and lifelong monthly annuity.
                </>
              )}
              {selectedCategory === 'women' && (
                <>
                  <strong>Women's Wealth Metaphor:</strong> The Queen Ant is surrounded by crystal shields and healing medicinal herbs. Smart Women Advantage delivers dual protection: 9 critical illnesses coverage + maternal complications + tax-free wealth compounding.
                </>
              )}
              {selectedCategory === 'employer-employee' && (
                <>
                  <strong>Corporate Colony Metaphor:</strong> A united colony of worker ants moves heavy timber together to construct a fortress. Employers claim 100% operational tax deductions under Section 37(1) while employees enjoy institutional life shields.
                </>
              )}
              {selectedCategory === 'traditional' && (
                <>
                  <strong>Centennial Heritage Metaphor:</strong> Ancient stone subterranean granary vaults hold compound bonuses across generations up to age 100 with guaranteed sovereign safety and Section 10(10D) tax immunity.
                </>
              )}
              {selectedCategory === 'all' && (
                <>
                  <strong>The Nature's Savings Parable:</strong> Disciplined tiny contributions grow into an unshakeable granary, while weatherproof family shields guarantee peace of mind through every life storm.
                </>
              )}
            </p>
          </div>

          {/* Action Buttons: Ask AI Ant & Get Proposal */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            {onOpenAiAnt && (
              <button
                onClick={() => onOpenAiAnt(currentScheme.id)}
                className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 transition-colors whitespace-nowrap"
              >
                <span>🐜 Ask Chintu AI Ant</span>
              </button>
            )}

            {onOpenEnquiry && (
              <button
                onClick={() => onOpenEnquiry(currentScheme)}
                className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
              >
                <span>Enquire</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
