import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Calculator, 
  Download, 
  FileText, 
  Percent, 
  Clock, 
  HeartHandshake, 
  Check, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SBI_SCHEMES, SbiScheme } from '../data/sbiSchemes.ts';
import { PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif, SuryaMandalaMotif, RangoliDivider } from './RangoliMotifs.tsx';
import { Building2 } from 'lucide-react';

interface SbiSchemesSectionProps {
  onOpenEnquiry: (schemeId: string) => void;
  onOpenAiAnt?: (schemeId: string) => void;
}

export const SbiSchemesSection: React.FC<SbiSchemesSectionProps> = ({ onOpenEnquiry, onOpenAiAnt }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'child' | 'pension' | 'women' | 'traditional' | 'employer-employee'>('all');
  const [activeSchemeId, setActiveSchemeId] = useState<string>('sbi-smart-champ');
  
  // Interactive Calculator State
  const [sumAssured, setSumAssured] = useState<number>(1500000);
  const [policyTerm, setPolicyTerm] = useState<number>(15);
  const [frequency, setFrequency] = useState<'Yearly' | 'Monthly'>('Yearly');

  const activeScheme: SbiScheme = SBI_SCHEMES.find(s => s.id === activeSchemeId) || SBI_SCHEMES[0];

  const filteredSchemes = selectedCategory === 'all' 
    ? SBI_SCHEMES 
    : SBI_SCHEMES.filter(s => s.category === selectedCategory);

  // Dynamic returns calculation
  const calculateIllustration = () => {
    // Standard actuarial approximation for Indian endowment/ULIP products:
    // Base annual premium ~ 6.5% - 7.5% of sum assured for 15 yr term
    const termFactor = Math.max(10, policyTerm);
    const baseAnnual = Math.round((sumAssured / termFactor) * 1.08);
    const payablePremium = frequency === 'Monthly' ? Math.round(baseAnnual / 12) : baseAnnual;
    
    // Projected maturity at 8% illustrative rate (IRDAI mandated reference)
    // Compound accumulation with reversionary and terminal bonuses
    const maturityEstimate = Math.round(sumAssured * (1 + (termFactor * 0.052)));
    
    // Section 80C Tax savings calculation at 31.2% maximum slab
    const eligible80C = Math.min(baseAnnual, 150000);
    const taxSaved = Math.round(eligible80C * 0.312);

    return {
      annualPremium: payablePremium,
      maturityEstimate,
      taxSaved,
      guaranteedCover: Math.max(sumAssured, baseAnnual * 10)
    };
  };

  const illustration = calculateIllustration();

  return (
    <section id="sbi-schemes" className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header with Rangoli motif */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>IRDAI Regulated & Sovereign SBI Life Portfolio</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-['Cinzel',serif] tracking-wide">
          Auspicious Protection & Guaranteed Wealth
        </h2>
        <p className="mt-3 text-stone-400 text-sm sm:text-base leading-relaxed">
          Detailed policy intelligence covering SBI Child Plans, Retirement Pensions, Women Wealth Builders, and Traditional Heritage Insurance with verified benefits and tax exemptions.
        </p>

        {/* AI Ant Explainer Interactive Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-stone-900 to-teal-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shrink-0">
              🐜
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="font-bold text-amber-300 text-xs font-['Cinzel',serif]">
                  Chintu the AI Ant Explains SBI Life Schemes
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black font-sans font-bold text-[9px]">
                  VOICE + PARABLES
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                Understand Child, Pension, Women & Corporate plans through nature's savings parables with voice narration
              </p>
            </div>
          </div>
          {onOpenAiAnt && (
            <button
              onClick={() => onOpenAiAnt(activeSchemeId)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all whitespace-nowrap shrink-0"
            >
              <span>Ask AI Ant to Explain</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <RangoliDivider className="mt-6" />
      </div>

      {/* Category Navigation with Rangoli Emblems */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <span>All SBI Schemes</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 text-current">{SBI_SCHEMES.length}</span>
        </button>

        <button
          onClick={() => setSelectedCategory('employer-employee')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'employer-employee'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <Building2 className={`w-4 h-4 ${selectedCategory === 'employer-employee' ? 'text-white' : 'text-sky-400'}`} />
          <span>Employer-Employee Plans</span>
        </button>

        <button
          onClick={() => setSelectedCategory('child')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'child'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <PadmaLotusMotif size={20} color={selectedCategory === 'child' ? '#FFF' : '#F43F5E'} />
          <span>SBI Child Plans</span>
        </button>

        <button
          onClick={() => setSelectedCategory('pension')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'pension'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <MayilPeacockMotif size={20} color={selectedCategory === 'pension' ? '#FFF' : '#0D9488'} />
          <span>SBI Pension Plans</span>
        </button>

        <button
          onClick={() => setSelectedCategory('women')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'women'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <AshtalakshmiStarMotif size={20} color={selectedCategory === 'women' ? '#FFF' : '#C026D3'} />
          <span>Women Wealth Builder</span>
        </button>

        <button
          onClick={() => setSelectedCategory('traditional')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'traditional'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <KalashUrnMotif size={20} color={selectedCategory === 'traditional' ? '#FFF' : '#D97706'} />
          <span>Traditional Insurance</span>
        </button>
      </div>

      {/* Grid of Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredSchemes.map((scheme) => {
          const isSelected = scheme.id === activeSchemeId;

          return (
            <div
              key={scheme.id}
              onClick={() => {
                setActiveSchemeId(scheme.id);
                setSumAssured(scheme.defaultSumAssured);
                setPolicyTerm(scheme.defaultTerm);
              }}
              className={`group relative flex flex-col justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'bg-stone-900/90 border-amber-400/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/40'
                  : 'bg-stone-900/40 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/60'
              }`}
            >
              {/* Category indicator pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {scheme.categoryLabel}
                </span>

                <div className="p-1 rounded-lg bg-stone-800/50">
                  {scheme.rangoliPattern === 'padma' && <PadmaLotusMotif size={24} color="#F43F5E" />}
                  {scheme.rangoliPattern === 'mayil' && <MayilPeacockMotif size={24} color="#0D9488" />}
                  {scheme.rangoliPattern === 'ashtalakshmi' && <AshtalakshmiStarMotif size={24} color="#C026D3" />}
                  {scheme.rangoliPattern === 'kalash' && <KalashUrnMotif size={24} color="#D97706" />}
                  {scheme.rangoliPattern === 'surya' && <SuryaMandalaMotif size={24} color="#0284C7" />}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {scheme.name}
                </h3>
                <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                  {scheme.tagline}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-stone-300 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/60">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Min Sum Assured</span>
                    <span className="font-semibold text-amber-200">{scheme.minSumAssured.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Tax Savings</span>
                    <span className="font-semibold text-emerald-400">80C & 10(10D)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/70 flex items-center justify-between text-xs gap-2">
                <span className={`font-semibold truncate ${isSelected ? 'text-amber-400' : 'text-stone-400'}`}>
                  {isSelected ? 'Viewing Details & Calc' : 'Select to Calculate'}
                </span>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  {onOpenAiAnt && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAiAnt(scheme.id);
                      }}
                      className="px-2 py-1 rounded-lg bg-stone-800/80 hover:bg-amber-400 hover:text-black border border-stone-700 text-[10px] font-semibold text-stone-300 transition-colors flex items-center gap-1"
                      title="Ask AI Ant to explain this scheme"
                    >
                      <span>🐜</span>
                      <span>Ask Ant</span>
                    </button>
                  )}
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-stone-500 group-hover:translate-x-1'}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Scheme Deep Dive & Returns Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient decoration */}
        <div 
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: activeScheme.accentColor }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scheme Details & Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-stone-950 border border-stone-800">
                {activeScheme.rangoliPattern === 'padma' && <PadmaLotusMotif size={40} color="#F43F5E" />}
                {activeScheme.rangoliPattern === 'mayil' && <MayilPeacockMotif size={40} color="#0D9488" />}
                {activeScheme.rangoliPattern === 'ashtalakshmi' && <AshtalakshmiStarMotif size={40} color="#C026D3" />}
                {activeScheme.rangoliPattern === 'kalash' && <KalashUrnMotif size={40} color="#D97706" />}
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {activeScheme.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-['Cinzel',serif] mt-1">
                  {activeScheme.name}
                </h3>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              {activeScheme.longDesc}
            </p>

            {/* Key Benefits List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Policy Highlights & Guarantees
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {activeScheme.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs text-stone-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Tax Exemption Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                <span className="text-stone-500 block text-[11px] mb-1">Entry & Maturity Age</span>
                <span className="font-semibold text-stone-200">{activeScheme.minEntryAge}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                <span className="text-stone-500 block text-[11px] mb-1">Section 80C Benefit</span>
                <span className="font-semibold text-emerald-400">Save up to ₹46,800/yr</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                <span className="text-stone-500 block text-[11px] mb-1">Section 10(10D)</span>
                <span className="font-semibold text-teal-400">100% Tax-Free Maturity</span>
              </div>
            </div>

            {/* Quick Action Button for Enquiry with Auto-picked details */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry(activeScheme.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/25"
              >
                <span>Request Official Proposal & Callback</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenAiAnt && (
                <button
                  onClick={() => onOpenAiAnt(activeScheme.id)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-amber-300 bg-stone-900 hover:bg-stone-800 border border-amber-500/40 hover:border-amber-400 transition-all"
                >
                  <span>🐜 Ask Chintu AI Ant to Explain</span>
                </button>
              )}

              <span className="text-xs text-stone-400 flex items-center gap-1.5 w-full sm:w-auto">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Shared with trythiru@gmail.com & WhatsApp (+91 99942 98989)
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Policy Returns & Premium Calculator */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950 border border-amber-500/30 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-bold text-stone-100 font-['Cinzel',serif]">
                  Maturity & Returns Calculator
                </h4>
              </div>
              <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded border border-amber-400/20">
                8% IRDAI Rate
              </span>
            </div>

            {/* Slider 1: Sum Assured */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-stone-300">Target Sum Assured (Life Cover)</span>
                <span className="font-bold font-mono text-amber-400 text-sm">
                  ₹{(sumAssured / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min={200000}
                max={10000000}
                step={100000}
                value={sumAssured}
                onChange={(e) => setSumAssured(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                <span>₹2 Lakhs</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            {/* Slider 2: Policy Term */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-stone-300">Policy Term (Years)</span>
                <span className="font-bold font-mono text-amber-400 text-sm">
                  {policyTerm} Years
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={30}
                step={1}
                value={policyTerm}
                onChange={(e) => setPolicyTerm(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                <span>10 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-stone-300">Premium Frequency:</span>
              <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-800">
                <button
                  type="button"
                  onClick={() => setFrequency('Yearly')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    frequency === 'Yearly' ? 'bg-amber-400 text-black' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Yearly
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('Monthly')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    frequency === 'Monthly' ? 'bg-amber-400 text-black' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Monthly SIP
                </button>
              </div>
            </div>

            {/* Calculator Output Projection Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 space-y-3">
              
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="text-stone-400">Estimated {frequency} Premium</span>
                <span className="text-base font-bold text-stone-100 font-mono">
                  ₹{illustration.annualPremium.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="text-stone-400">Projected Maturity Payout</span>
                <span className="text-lg font-extrabold text-emerald-400 font-mono">
                  ₹{(illustration.maturityEstimate / 100000).toFixed(2)} Lakhs
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
                <span className="text-stone-400">Sec 80C Tax Saved / Year</span>
                <span className="text-sm font-semibold text-teal-400 font-mono">
                  ₹{illustration.taxSaved.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Total Life Cover Protected</span>
                <span className="text-sm font-semibold text-amber-300 font-mono">
                  ₹{(illustration.guaranteedCover / 100000).toFixed(1)} Lakhs
                </span>
              </div>

            </div>

            {/* Instant Consultation Trigger */}
            <button
              onClick={() => onOpenEnquiry(activeScheme.id)}
              className="w-full py-3 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Lock This Quote & Enquire via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-stone-500 text-center leading-normal">
              *Projections are illustrative based on standard IRDAI 8% & 4% guidelines. Actual bonuses declared by SBI Life annually.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};
