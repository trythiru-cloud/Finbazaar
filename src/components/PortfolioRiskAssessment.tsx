import React, { useState, useEffect } from 'react';
import { 
  Gauge, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  RefreshCw, 
  Percent, 
  Layers, 
  PhoneCall, 
  Mail, 
  Award, 
  AlertTriangle,
  CheckCircle2,
  PieChart,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { 
  PadmaLotusMotif, 
  MayilPeacockMotif, 
  AshtalakshmiStarMotif, 
  KalashUrnMotif, 
  SuryaMandalaMotif,
  RangoliDivider
} from './RangoliMotifs.tsx';
import { UserProfile } from '../data/userPortfolio.ts';

interface PortfolioRiskAssessmentProps {
  userProfile: UserProfile;
  onOpenEnquiry: (schemeId?: string) => void;
}

export const PortfolioRiskAssessment: React.FC<PortfolioRiskAssessmentProps> = ({
  userProfile,
  onOpenEnquiry
}) => {
  const [loading, setLoading] = useState(false);
  const [riskAppetite, setRiskAppetite] = useState<'Conservative' | 'Balanced' | 'Moderately Aggressive' | 'Aggressive'>('Moderately Aggressive');

  // Interactive Allocation Sliders
  const [allocations, setAllocations] = useState({
    mutualFunds: 27.5,
    directEquity: 17.6,
    sbiLifeInsurance: 39.7,
    sovereignGold: 10.7,
    fixedDeposits: 4.5
  });

  const [assessment, setAssessment] = useState<any>({
    riskRating: {
      score: 7.2,
      category: "Moderately Aggressive Growth",
      volatilityScore: "Medium-High",
      equityDebtRatio: "45:55",
      downsideRiskDescription: "Current equity allocation offers substantial inflation-beating alpha, but child milestone funds remain vulnerable to equity bear market cycles."
    },
    returnsAnalysis: {
      expectedAnnualReturn: "13.6% p.a.",
      inflationAdjustedReturn: "7.8% p.a.",
      sharpeRatioEstimate: "1.42",
      historicalRealizedReturn: "+39.2%",
      fiveYearCorpusProjection: "₹64,50,000"
    },
    portfolioScores: {
      overallScore: 84,
      capitalGrowthScore: 88,
      stabilityAndGuaranteesScore: 64,
      taxEfficiencyScore: 82,
      milestoneProtectionScore: 70
    },
    scoringDiagnosis: "Your portfolio achieves an 84/100 overall score powered by robust mutual fund SIPs and disciplined cash reserves. However, your stability and sovereign guaranteed protection score (64/100) and milestone score (70/100) indicate that key life goals like college education and retirement annuities require a dedicated, non-market-linked sovereign shield.",
    recommendedSbiSchemes: [
      {
        schemeId: "sbi-smart-champ",
        schemeName: "SBI Life - Smart Champ Insurance",
        category: "Child Education Shield",
        matchScore: 96,
        whyRecommended: "High equity exposure leaves child college tuition exposed to market swings. Smart Champ guarantees 4 equal annual milestone installments at ages 18, 19, 20, and 21 plus full waiver of premium.",
        suggestedAllocationChange: "Allocate ₹1,20,000 / year (₹10,000/mo)",
        projectedBenefits: "Guaranteed educational disbursements + 10(10D) tax-free maturity."
      },
      {
        schemeId: "sbi-retire-smart",
        schemeName: "SBI Life - Retire Smart",
        category: "Retirement Pension Annuity",
        matchScore: 92,
        whyRecommended: "Retirement corpus lacks guaranteed minimum additions. Retire Smart guarantees up to 210% of annual premium additions to stabilize post-retirement cashflow.",
        suggestedAllocationChange: "Allocate ₹15,000 monthly SIP",
        projectedBenefits: "Guaranteed terminal additions + Automatic Asset Allocation before vesting."
      },
      {
        schemeId: "sbi-smart-women-advantage",
        schemeName: "SBI Life - Smart Women Advantage",
        category: "Women Wealth & Health",
        matchScore: 88,
        whyRecommended: "Critical illness and female healthcare risks are unhedged in the current portfolio. Adds comprehensive financial protection for 9 female-specific critical illnesses.",
        suggestedAllocationChange: "Allocate ₹80,000 annual premium",
        projectedBenefits: "Section 80D + 80C dual tax deductions with guaranteed wealth growth."
      },
      {
        schemeId: "sbi-shubh-nivesh",
        schemeName: "SBI Life - Shubh Nivesh",
        category: "Traditional Heritage Cover",
        matchScore: 85,
        whyRecommended: "Offers whole life regular income payouts until age 100 with compound reversionary bonuses, creating an unshakeable family safety foundation.",
        suggestedAllocationChange: "Allocate ₹75,000 annual premium",
        projectedBenefits: "Whole life income security + rock-solid sovereign guarantee."
      }
    ],
    actionPlanSteps: [
      "Step 1: Shift 5% from speculative equities into SBI Life Smart Champ for child education.",
      "Step 2: Allocate ₹15,000/month towards SBI Retire Smart to guarantee lifelong post-60 pension.",
      "Step 3: Maximize remaining ₹45,000 threshold under Section 80C for 100% tax immunity under Section 10(10D)."
    ]
  });

  const fetchAssessment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolio-risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            name: userProfile.name,
            age: userProfile.age || 36,
            monthlyIncome: userProfile.monthlyIncome || 145000
          },
          portfolio: { totalValue: 3480000 },
          allocations,
          riskAppetite
        })
      });
      const data = await res.json();
      if (data.assessment) {
        setAssessment(data.assessment);
      }
    } catch (err) {
      console.error('Error fetching risk assessment:', err);
    } finally {
      setLoading(false);
    }
  };

  // Recalculate local quick estimates when allocations slider is shifted
  const handleSliderChange = (key: keyof typeof allocations, value: number) => {
    const updated = { ...allocations, [key]: value };
    setAllocations(updated);
    
    // Dynamically update risk score estimate based on equity weight
    const totalEquity = updated.mutualFunds + updated.directEquity;
    const computedRisk = Math.min(10, Math.max(2, parseFloat((totalEquity * 0.15 + 0.5).toFixed(1))));
    const expectedReturn = (totalEquity * 0.16 + (updated.sbiLifeInsurance + updated.fixedDeposits + updated.sovereignGold) * 0.08).toFixed(1);

    setAssessment((prev: any) => ({
      ...prev,
      riskRating: {
        ...prev.riskRating,
        score: computedRisk,
        category: computedRisk > 7.5 ? "Aggressive Growth" : computedRisk > 6 ? "Moderately Aggressive Growth" : "Balanced Wealth"
      },
      returnsAnalysis: {
        ...prev.returnsAnalysis,
        expectedAnnualReturn: `${expectedReturn}% p.a.`
      }
    }));
  };

  return (
    <div className="space-y-10">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Gauge className="w-3.5 h-3.5" />
          <span>Actuarial Risk & Returns Diagnostics</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-['Cinzel',serif] tracking-wide">
          Portfolio Scoring & SBI Life Matching
        </h2>

        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          Comprehensive risk-return profiling across domestic equities, sovereign gold, and guaranteed SBI Life insurance to identify coverage gaps and optimize capital efficiency.
        </p>

        <RangoliDivider className="mt-4" />
      </div>

      {/* Main Scoring Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Risk Rating Meter & Returns Summary (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Risk & Return Diagnostic Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <Compass className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400">Risk Profile Assessment</span>
                  <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif]">
                    {assessment.riskRating?.category}
                  </h3>
                </div>
              </div>

              {/* Recalculate Trigger */}
              <button
                onClick={fetchAssessment}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
                <span>Re-Evaluate Risk</span>
              </button>
            </div>

            {/* Risk Gauge Bar & Scale */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-stone-400">
                  Portfolio Risk Score: <strong className="text-amber-400 font-mono text-base">{assessment.riskRating?.score} / 10</strong>
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  Volatility Index: <strong className="text-amber-300 font-mono">{assessment.riskRating?.volatilityScore}</strong>
                </span>
              </div>

              {/* 10-Point Segmented Gauge */}
              <div className="w-full h-3.5 rounded-full bg-stone-950 p-0.5 border border-stone-800 flex overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600"
                  style={{ width: `${(assessment.riskRating?.score / 10) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span className="text-emerald-400">Conservative (1-3)</span>
                <span className="text-amber-400">Balanced (4-6)</span>
                <span className="text-rose-400">Aggressive (7-10)</span>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed pt-1">
                {assessment.riskRating?.downsideRiskDescription}
              </p>
            </div>

            {/* Returns Analysis 4-Box Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-500 block uppercase">Expected Annual Return</span>
                <span className="text-lg font-black font-mono text-emerald-400">{assessment.returnsAnalysis?.expectedAnnualReturn}</span>
                <span className="text-[10px] text-stone-400 block">Nominal CAGR</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-500 block uppercase">Inflation Adjusted</span>
                <span className="text-lg font-black font-mono text-teal-400">{assessment.returnsAnalysis?.inflationAdjustedReturn}</span>
                <span className="text-[10px] text-stone-400 block">Real Purchasing Alpha</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-500 block uppercase">Sharpe Ratio</span>
                <span className="text-lg font-black font-mono text-amber-300">{assessment.returnsAnalysis?.sharpeRatioEstimate}</span>
                <span className="text-[10px] text-stone-400 block">High Risk-Adjusted</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1">
                <span className="text-[10px] text-stone-500 block uppercase">5-Year Corpus Est.</span>
                <span className="text-lg font-black font-mono text-stone-100">{assessment.returnsAnalysis?.fiveYearCorpusProjection}</span>
                <span className="text-[10px] text-stone-400 block">Compounded Value</span>
              </div>
            </div>

          </div>

          {/* Interactive Allocation & Rebalancing Simulator */}
          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-800">
              <span className="font-semibold text-stone-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Simulate Portfolio Rebalancing & Risk Shift
              </span>
              <span className="text-stone-400 font-mono text-[11px]">Dynamic Actuarial Model</span>
            </div>

            <p className="text-xs text-stone-400">
              Adjust the weight of SBI Life guaranteed protection vs equities to observe how your volatility risk drops while preserving inflation-beating returns:
            </p>

            {/* Slider 1: SBI Life Guaranteed */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-rose-300 font-medium flex items-center gap-1.5">
                  <PadmaLotusMotif size={16} color="#F43F5E" />
                  SBI Life Guaranteed Insurance & Pension
                </span>
                <span className="font-bold font-mono text-rose-300">{allocations.sbiLifeInsurance}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={1}
                value={allocations.sbiLifeInsurance}
                onChange={(e) => handleSliderChange('sbiLifeInsurance', parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Slider 2: Mutual Funds */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-amber-300 font-medium flex items-center gap-1.5">
                  <SuryaMandalaMotif size={16} color="#F59E0B" />
                  Flexi-cap Mutual Funds (SIP)
                </span>
                <span className="font-bold font-mono text-amber-300">{allocations.mutualFunds}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={1}
                value={allocations.mutualFunds}
                onChange={(e) => handleSliderChange('mutualFunds', parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider 3: Direct Equities */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-indigo-300 font-medium">Direct Equity Stocks</span>
                <span className="font-bold font-mono text-indigo-300">{allocations.directEquity}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={allocations.directEquity}
                onChange={(e) => handleSliderChange('directEquity', parseFloat(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Slider 4: Sovereign Gold & FDs */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-yellow-300 font-medium">Sovereign Gold Bonds & Fixed Deposits</span>
                <span className="font-bold font-mono text-yellow-300">{(allocations.sovereignGold + allocations.fixedDeposits).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={allocations.sovereignGold + allocations.fixedDeposits}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setAllocations(prev => ({ ...prev, sovereignGold: val * 0.7, fixedDeposits: val * 0.3 }));
                }}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>

          </div>

        </div>

        {/* Right: Portfolio Scores Radar & Gap Analysis (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Overall Portfolio Score Card */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="text-base font-bold text-stone-100 font-['Cinzel',serif]">
                  Portfolio Health Scorecard
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                Grade: A-
              </span>
            </div>

            {/* Circular Overall Score */}
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400 transition-all duration-1000 ease-out"
                    strokeDasharray={`${assessment.portfolioScores?.overallScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-2xl font-black text-stone-100">{assessment.portfolioScores?.overallScore}</span>
                  <span className="text-[8px] text-stone-500 uppercase">/100</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-bold text-stone-100 text-sm">Balanced Wealth Structure</span>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Strong growth momentum, with key gaps identified in sovereign guaranteed milestone protections.
                </p>
              </div>
            </div>

            {/* Individual Sub-Scores Progress Meters */}
            <div className="space-y-3 pt-1">
              
              {/* Capital Growth Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Capital Growth & Equity Alpha</span>
                  <span className="font-mono font-bold text-emerald-400">{assessment.portfolioScores?.capitalGrowthScore}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${assessment.portfolioScores?.capitalGrowthScore}%` }} />
                </div>
              </div>

              {/* Stability & Guarantees Score (Gap!) */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-amber-300 font-medium">Stability & Sovereign Guarantees</span>
                  <span className="font-mono font-bold text-amber-400">{assessment.portfolioScores?.stabilityAndGuaranteesScore}/100 (Gap)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${assessment.portfolioScores?.stabilityAndGuaranteesScore}%` }} />
                </div>
              </div>

              {/* Tax Efficiency Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Tax Efficiency (80C / 10(10D))</span>
                  <span className="font-mono font-bold text-teal-400">{assessment.portfolioScores?.taxEfficiencyScore}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${assessment.portfolioScores?.taxEfficiencyScore}%` }} />
                </div>
              </div>

              {/* Milestone Protection Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-rose-300 font-medium">Milestone Protection (Education/Pension)</span>
                  <span className="font-mono font-bold text-rose-400">{assessment.portfolioScores?.milestoneProtectionScore}/100 (Attention)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${assessment.portfolioScores?.milestoneProtectionScore}%` }} />
                </div>
              </div>

            </div>

            {/* Diagnosis Callout */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {assessment.scoringDiagnosis}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Suggested SBI Life Insurance Schemes Based on Portfolio Scoring */}
      <div className="space-y-6 pt-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Algorithmic Scheme Matching Engine</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-['Cinzel',serif]">
              Suggested SBI Life Schemes to Close Scoring Gaps
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Matched specifically to improve your Stability Score (64/100) and Milestone Protection Score (70/100).
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('sbi-smart-champ')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-400/20 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>For Enquiries on WhatsApp (+91 99942 98989)</span>
          </button>
        </div>

        {/* 3 Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assessment.recommendedSbiSchemes?.map((rec: any, idx: number) => {
            const isChild = rec.schemeId === 'sbi-smart-champ';
            const isPension = rec.schemeId === 'sbi-retire-smart';
            const isWomen = rec.schemeId === 'sbi-smart-women-advantage';

            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-400/60 transition-all shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden group"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-30 transition-opacity">
                  {isChild && <PadmaLotusMotif size={80} color="#F43F5E" />}
                  {isPension && <MayilPeacockMotif size={80} color="#0D9488" />}
                  {isWomen && <AshtalakshmiStarMotif size={80} color="#C026D3" />}
                  {!isChild && !isPension && !isWomen && <KalashUrnMotif size={80} color="#D97706" />}
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {rec.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                      {rec.matchScore}% Match
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-100 font-['Cinzel',serif] group-hover:text-amber-300 transition-colors">
                    {rec.schemeName}
                  </h4>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {rec.whyRecommended}
                  </p>

                  <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Suggested Allocation:</span>
                      <strong className="text-amber-400 font-mono">{rec.suggestedAllocationChange}</strong>
                    </div>
                    <div className="text-[11px] text-teal-300 font-medium">
                      ✓ {rec.projectedBenefits}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800/80 space-y-2 relative z-10">
                  <button
                    onClick={() => onOpenEnquiry(rec.schemeId)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20"
                  >
                    <span>Adopt & Lock in Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex justify-between items-center text-[10px] text-stone-500 px-1">
                    <span>Direct WhatsApp: +91 99942 98989</span>
                    <span>For Enquiries: trythiru@gmail.com</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Suggested 3-Step Action Plan */}
      <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-3">
        <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Recommended Immediate Action Steps to Maximize Portfolio Efficiency
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {assessment.actionPlanSteps?.map((step: string, i: number) => (
            <div key={i} className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
