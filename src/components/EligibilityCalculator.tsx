import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldCheck, 
  Home, 
  Percent, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { RangoliDivider, SuryaMandalaMotif, KalashUrnMotif } from './RangoliMotifs.tsx';
import { UserProfile } from '../data/userPortfolio.ts';

interface EligibilityCalculatorProps {
  userProfile?: UserProfile;
  onOpenEnquiry: (schemeOrLoanId?: string) => void;
  onOpenAiAnt?: (schemeId?: string) => void;
}

export const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({
  userProfile,
  onOpenEnquiry,
  onOpenAiAnt
}) => {
  const [calcTab, setCalcTab] = useState<'homeloan' | 'life-cover'>('homeloan');

  // ==========================================
  // 1. HOME LOAN ELIGIBILITY STATE
  // ==========================================
  const [monthlyIncome, setMonthlyIncome] = useState<number>(userProfile?.monthlyIncome || 145000);
  const [existingEmis, setExistingEmis] = useState<number>(20000);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [coApplicantIncome, setCoApplicantIncome] = useState<number>(0);
  const [applicantCadre, setApplicantCadre] = useState<'salaried' | 'govt' | 'defence' | 'business'>('salaried');

  // Total household net income
  const totalNetIncome = monthlyIncome + coApplicantIncome;

  // Permissible Fixed Obligation to Income Ratio (FOIR)
  // Under banking norms: < 50k: 50%, 50k-1.5L: 55%, > 1.5L: 60%
  const foirPercent = totalNetIncome < 50000 ? 50 : totalNetIncome <= 150000 ? 55 : 60;
  const maxTotalAllowedEmi = Math.round(totalNetIncome * (foirPercent / 100));
  const availableEmiForLoan = Math.max(0, maxTotalAllowedEmi - existingEmis);

  // Regulatory benchmark calculation (interest rate not quoted statically per guidelines)
  const benchmarkRate = applicantCadre === 'defence' ? 8.35 : applicantCadre === 'govt' ? 8.40 : 8.50;
  const monthlyRate = benchmarkRate / 12 / 100;
  const totalMonths = loanTenureYears * 12;

  // Maximum loan calculation: P = EMI * ((1 + r)^n - 1) / (r * (1 + r)^n)
  const maxEligibleLoanAmount = availableEmiForLoan > 0
    ? Math.round((availableEmiForLoan * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)))
    : 0;

  // FOIR Utilization calculation
  const totalObligationsWithNewLoan = existingEmis + availableEmiForLoan;
  const foirUsedRatio = totalNetIncome > 0 ? Math.min(100, Math.round((existingEmis / totalNetIncome) * 100)) : 0;

  // ==========================================
  // 2. LIFE COVER / HLV ELIGIBILITY STATE
  // ==========================================
  const [annualIncome, setAnnualIncome] = useState<number>((userProfile?.monthlyIncome || 145000) * 12);
  const [currentAge, setCurrentAge] = useState<number>(userProfile?.age || 36);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [dependentsCount, setDependentsCount] = useState<number>(2);
  const [outstandingDebt, setOutstandingDebt] = useState<number>(3500000); // e.g. 35L home loan
  const [existingLifeCover, setExistingLifeCover] = useState<number>(2500000); // e.g. 25L existing

  // HLV Multiplier based on age bracket (Income Replacement Standard)
  const hlvMultiplier = currentAge < 35 ? 20 : currentAge <= 45 ? 15 : currentAge <= 55 ? 10 : 7;
  const grossRecommendedCover = Math.round((annualIncome * hlvMultiplier) + outstandingDebt);
  const netProtectionGap = Math.max(0, grossRecommendedCover - existingLifeCover);
  const suggestedMonthlySavings = Math.round((annualIncome / 12) * 0.15); // 15% rule

  // Quick Presets
  const applyPreset = (income: number, existingEmi: number, debt: number) => {
    setMonthlyIncome(income);
    setExistingEmis(existingEmi);
    setAnnualIncome(income * 12);
    setOutstandingDebt(debt);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5" />
          <span>Finbazaar Precision Underwriting Engines</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-['Cinzel',serif] tracking-wide">
          Financial Eligibility Calculator
        </h2>

        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
          Accurately evaluate your borrowing capacity under RBI FOIR norms and calculate your family's Human Life Value (HLV) protection requirements before applying.
        </p>

        <RangoliDivider className="mt-4" />
      </div>

      {/* Tabs Selector: Home Loan Eligibility vs Life Cover HLV */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl gap-2">
          <button
            onClick={() => setCalcTab('homeloan')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              calcTab === 'homeloan'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>SBI Home Loan Eligibility</span>
          </button>

          <button
            onClick={() => setCalcTab('life-cover')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              calcTab === 'life-cover'
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>SBI Life & HLV Cover Eligibility</span>
          </button>
        </div>
      </div>

      {/* Quick Profile Presets */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-stone-500 font-medium">Quick Presets:</span>
        <button
          onClick={() => applyPreset(65000, 8000, 1500000)}
          className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-400/50 hover:text-amber-300 transition-colors"
        >
          Young Professional (₹65k/mo)
        </button>
        <button
          onClick={() => applyPreset(145000, 25000, 3500000)}
          className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-400/50 hover:text-amber-300 transition-colors"
        >
          Mid-Career Family (₹1.45L/mo)
        </button>
        <button
          onClick={() => applyPreset(300000, 50000, 8000000)}
          className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:border-amber-400/50 hover:text-amber-300 transition-colors"
        >
          Executive / Business (₹3L/mo)
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SBI HOME LOAN ELIGIBILITY CALCULATOR               */}
      {/* ========================================================= */}
      {calcTab === 'homeloan' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-100 font-['Cinzel',serif]">
                      Borrowing Capacity Parameters
                    </h3>
                    <span className="text-[11px] text-stone-400">Compliant with standard banking FOIR guidelines</span>
                  </div>
                </div>

                {/* Cadre Badge */}
                <span className="text-[10px] font-bold font-mono uppercase bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800 text-amber-300">
                  FOIR Cap: {foirPercent}%
                </span>
              </div>

              {/* Input 1: Monthly Net Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Monthly Net Take-Home Salary</span>
                  <span className="font-bold font-mono text-amber-400 text-base">
                    ₹{monthlyIncome.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={800000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹25,000</span>
                  <span>₹2,50,000</span>
                  <span>₹8,00,000</span>
                </div>
              </div>

              {/* Input 2: Existing Monthly Obligations (EMIs) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Existing Monthly Loan EMIs / Liabilities</span>
                  <span className="font-bold font-mono text-rose-400 text-base">
                    ₹{existingEmis.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={250000}
                  step={2000}
                  value={existingEmis}
                  onChange={(e) => setExistingEmis(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹0 (Nil Debt)</span>
                  <span>₹1,00,000</span>
                  <span>₹2,50,000</span>
                </div>
              </div>

              {/* Input 3: Desired Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Desired Loan Tenure</span>
                  <span className="font-bold font-mono text-amber-400 text-base">
                    {loanTenureYears} Years ({loanTenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years (Maximum)</span>
                </div>
              </div>

              {/* Input 4: Optional Co-Applicant Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Co-Applicant Income (Spouse / Parents)</span>
                  <span className="font-bold font-mono text-emerald-400 text-sm">
                    {coApplicantIncome > 0 ? `+ ₹${coApplicantIncome.toLocaleString('en-IN')} / mo` : 'None Added'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={400000}
                  step={5000}
                  value={coApplicantIncome}
                  onChange={(e) => setCoApplicantIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹0</span>
                  <span>₹1,50,000</span>
                  <span>₹4,00,000</span>
                </div>
              </div>

              {/* Cadre Classification */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-300">
                  Applicant Employment Profile
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'salaried', label: 'Salaried Professional' },
                    { id: 'govt', label: 'Govt / PSU Cadre' },
                    { id: 'defence', label: 'Defence Personnel' },
                    { id: 'business', label: 'Self-Employed' },
                  ].map((cadre) => (
                    <button
                      key={cadre.id}
                      type="button"
                      onClick={() => setApplicantCadre(cadre.id as any)}
                      className={`p-2 rounded-xl text-[11px] font-medium transition-all text-center border ${
                        applicantCadre === cadre.id
                          ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-sm'
                          : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {cadre.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regulatory Notice on Interest Rates */}
              <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 text-stone-300">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fair Lending Compliance Disclosure</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Per RBI Fair Practices Code, maximum home loan eligibility is calculated on standard banking benchmark FOIR. Zero static interest rate is displayed publicly to ensure accuracy; personalized interest rates are confirmed upon formal credit bureau valuation during lead dispatch.
                </p>
              </div>

            </div>

            {/* Right Output Card (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950 border border-amber-500/30 shadow-xl space-y-6">
              
              <div className="text-center space-y-1 pb-4 border-b border-stone-800">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                  Maximum Eligible Loan Amount
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                  ₹{(maxEligibleLoanAmount / 100000).toFixed(2)} Lakhs
                </div>
                <span className="text-[10px] text-stone-500 block">
                  (₹{maxEligibleLoanAmount.toLocaleString('en-IN')})
                </span>
              </div>

              {/* Eligibility Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-stone-400">
                  <span>Total Net Monthly Income:</span>
                  <strong className="text-stone-100 font-mono text-sm">
                    ₹{totalNetIncome.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="flex justify-between items-center text-stone-400">
                  <span>Max Permissible New EMI:</span>
                  <strong className="text-emerald-400 font-mono text-base font-bold">
                    ₹{availableEmiForLoan.toLocaleString('en-IN')} / mo
                  </strong>
                </div>

                <div className="flex justify-between items-center text-stone-400">
                  <span>Permissible FOIR Limit:</span>
                  <strong className="text-amber-300 font-mono">
                    {foirPercent}% (Cap: ₹{maxTotalAllowedEmi.toLocaleString('en-IN')})
                  </strong>
                </div>

                {/* FOIR Gauge Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-400">Current Debt Burden:</span>
                    <span className={foirUsedRatio > 40 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {foirUsedRatio}% of Income
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-stone-800 overflow-hidden">
                    <div 
                      style={{ width: `${Math.min(100, foirUsedRatio)}%` }} 
                      className={`h-full ${foirUsedRatio > 40 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    />
                  </div>
                </div>

                {/* Tax Benefits Box */}
                <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-1 text-stone-300">
                  <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Eligible Tax Relief under 24(b) & 80C:</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-normal">
                    Eligible for up to <strong>₹2 Lakh/yr</strong> interest deduction (Sec 24b) and <strong>₹1.5 Lakh/yr</strong> principal repayment (Sec 80C).
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenEnquiry(`SBI Home Loan (Eligible ₹${(maxEligibleLoanAmount / 100000).toFixed(1)}L)`)}
                  className="w-full py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <span>Apply with Pre-Approved Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex justify-between text-[10px] text-stone-500 px-1">
                  <span>WhatsApp Desk: +91 99942 98989</span>
                  <span>Official Email: trythiru@gmail.com</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SBI LIFE & HLV COVER ELIGIBILITY CALCULATOR        */}
      {/* ========================================================= */}
      {calcTab === 'life-cover' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-100 font-['Cinzel',serif]">
                      Human Life Value (HLV) Diagnostic
                    </h3>
                    <span className="text-[11px] text-stone-400">Income replacement & family liability protection model</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold font-mono uppercase bg-stone-950 px-2.5 py-1 rounded-xl border border-stone-800 text-teal-300">
                  Multiplier: {hlvMultiplier}x Income
                </span>
              </div>

              {/* Input 1: Annual Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Annual Gross Income</span>
                  <span className="font-bold font-mono text-amber-400 text-base">
                    ₹{(annualIncome / 100000).toFixed(2)} Lakhs / year
                  </span>
                </div>
                <input
                  type="range"
                  min={300000}
                  max={6000000}
                  step={50000}
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹3 Lakhs</span>
                  <span>₹25 Lakhs</span>
                  <span>₹60 Lakhs</span>
                </div>
              </div>

              {/* Input 2: Current Age */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Current Age</span>
                  <span className="font-bold font-mono text-amber-400 text-base">
                    {currentAge} Years Old
                  </span>
                </div>
                <input
                  type="range"
                  min={18}
                  max={65}
                  step={1}
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>18 Years</span>
                  <span>40 Years</span>
                  <span>65 Years</span>
                </div>
              </div>

              {/* Input 3: Outstanding Liabilities / Debts */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Outstanding Debts / Home Loans to Shield</span>
                  <span className="font-bold font-mono text-rose-400 text-base">
                    ₹{(outstandingDebt / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000000}
                  step={100000}
                  value={outstandingDebt}
                  onChange={(e) => setOutstandingDebt(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹0 (Debt-Free)</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>
              </div>

              {/* Input 4: Existing Life Insurance Cover */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-300">Current Life Cover (All Active Policies)</span>
                  <span className="font-bold font-mono text-emerald-400 text-base">
                    ₹{(existingLifeCover / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15000000}
                  step={100000}
                  value={existingLifeCover}
                  onChange={(e) => setExistingLifeCover(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>₹0</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1.5 Crores</span>
                </div>
              </div>

              {/* Dependents Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-300">
                  Number of Financial Dependents
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setDependentsCount(count)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                        dependentsCount === count
                          ? 'bg-amber-400 text-black font-bold border-amber-400'
                          : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {count} {count === 1 ? 'Dependent' : 'Dependents'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Output Card (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950 border border-teal-500/30 shadow-xl space-y-6">
              
              <div className="text-center space-y-1 pb-4 border-b border-stone-800">
                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                  Recommended Life Cover (Human Life Value)
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-teal-300">
                  ₹{(grossRecommendedCover / 10000000).toFixed(2)} Crores
                </div>
                <span className="text-[10px] text-stone-500 block">
                  (₹{grossRecommendedCover.toLocaleString('en-IN')})
                </span>
              </div>

              {/* Cover Gap Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-stone-400">
                  <span>Income Replacement Requirement:</span>
                  <strong className="text-stone-100 font-mono">
                    ₹{((annualIncome * hlvMultiplier) / 100000).toFixed(2)} Lakhs
                  </strong>
                </div>

                <div className="flex justify-between items-center text-stone-400">
                  <span>Liabilities Protection Add-On:</span>
                  <strong className="text-rose-400 font-mono">
                    + ₹{(outstandingDebt / 100000).toFixed(2)} Lakhs
                  </strong>
                </div>

                <div className="flex justify-between items-center text-stone-400 pb-2 border-b border-stone-800">
                  <span>Current Protection Shortfall (Gap):</span>
                  <strong className="text-amber-400 font-mono text-base font-bold">
                    ₹{(netProtectionGap / 100000).toFixed(2)} Lakhs
                  </strong>
                </div>

                {/* Recommended SBI Life Schemes */}
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Recommended Scheme Architecture:</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-stone-300">
                    <div className="flex items-center justify-between">
                      <span>• Child Milestone Cover:</span>
                      <strong className="text-amber-300">Smart Champ Insurance</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Guaranteed Capital Vault:</span>
                      <strong className="text-amber-300">Smart Platina Assure</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Tax-Free Longevity Pension:</span>
                      <strong className="text-amber-300">Retire Smart Annuity</strong>
                    </div>
                  </div>
                </div>

                {/* Suggested Monthly Allocation */}
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex justify-between items-center text-[11px]">
                  <span className="text-stone-400">Suggested Monthly SIP/Premium:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    ₹{suggestedMonthlySavings.toLocaleString('en-IN')} / mo
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenEnquiry(`SBI Life Cover (HLV ₹${(grossRecommendedCover / 10000000).toFixed(1)}Cr)`)}
                  className="w-full py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-teal-400 via-emerald-300 to-amber-300 hover:from-teal-300 hover:to-amber-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                >
                  <span>Request Proposal for Recommended Cover</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenAiAnt && (
                  <button
                    onClick={() => onOpenAiAnt('sbi-smart-champ')}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>🐜 Ask Chintu AI Ant to Explain Cover Strategy</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
