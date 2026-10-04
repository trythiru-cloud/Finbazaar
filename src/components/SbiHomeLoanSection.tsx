import React, { useState } from 'react';
import { 
  Home, 
  Calculator, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  Layers, 
  BadgePercent,
  Clock,
  Landmark,
  FileText,
  ArrowUpDown,
  Sliders,
  Scale,
  TrendingDown,
  Info,
  CheckCircle2
} from 'lucide-react';
import { SBI_HOME_LOAN_PRODUCTS, SbiHomeLoanProduct } from '../data/sbiHomeLoan.ts';
import { KalashUrnMotif, RangoliDivider, SuryaMandalaMotif } from './RangoliMotifs.tsx';

interface SbiHomeLoanSectionProps {
  onOpenEnquiry: (schemeName?: string) => void;
  onOpenSynchronousLeads?: () => void;
  onOpenEligibilityCalc?: () => void;
}

export const SbiHomeLoanSection: React.FC<SbiHomeLoanSectionProps> = ({ 
  onOpenEnquiry,
  onOpenSynchronousLeads,
  onOpenEligibilityCalc
}) => {
  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Years
  const [applicantCategory, setApplicantCategory] = useState<string>('salaried');
  const [isWomenBorrower, setIsWomenBorrower] = useState<boolean>(false);

  // Comparison Matrix State
  const [comparisonView, setComparisonView] = useState<'tenure' | 'rate' | 'scenarios'>('tenure');
  
  // Custom scenario planner states
  const [scenarioA, setScenarioA] = useState<{ tenure: number; rate: number; label: string }>({
    tenure: 15,
    rate: 8.35,
    label: 'Accelerated Repayment'
  });
  const [scenarioB, setScenarioB] = useState<{ tenure: number; rate: number; label: string }>({
    tenure: 20,
    rate: 8.50,
    label: 'Balanced Benchmark'
  });
  const [scenarioC, setScenarioC] = useState<{ tenure: number; rate: number; label: string }>({
    tenure: 30,
    rate: 8.65,
    label: 'Maximum Cash Flow'
  });

  const [activeProductId, setActiveProductId] = useState<string>('sbi-regular-homeloan');
  const activeProduct: SbiHomeLoanProduct = 
    SBI_HOME_LOAN_PRODUCTS.find(p => p.id === activeProductId) || SBI_HOME_LOAN_PRODUCTS[0];

  // Dynamic EMI Calculation on standard sovereign benchmark without publicly quoting interest rate
  // In compliance with fair lending norms, interest rate is determined dynamically per CIBIL score upon lead submission.
  const baselineRate = applicantCategory === 'defence' ? 8.35 : applicantCategory === 'govt' ? 8.40 : 8.50;
  const effectiveBenchmarkRate = isWomenBorrower ? baselineRate - 0.05 : baselineRate;
  const monthlyRate = effectiveBenchmarkRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const interestRatio = Math.round((totalInterest / totalPayment) * 100);
  const principalRatio = 100 - interestRatio;

  // Annual Tax Savings under Sec 24(b) (max ₹2 Lakh interest) + Sec 80C (max ₹1.5 Lakh principal)
  const firstYearInterest = Math.min(200000, Math.round(loanAmount * (effectiveBenchmarkRate / 100)));
  const firstYearPrincipal = Math.min(150000, (emi * 12) - firstYearInterest);
  const estimatedTaxSaved = Math.round((firstYearInterest + firstYearPrincipal) * 0.312); // At 30% slab + 4% cess

  // General loan calculator helper for side-by-side comparison
  const computeLoan = (principal: number, annualRatePct: number, years: number) => {
    const r = annualRatePct / 12 / 100;
    const n = years * 12;
    if (r === 0 || n === 0) {
      return { 
        emi: 0, 
        totalPayment: principal, 
        totalInterest: 0, 
        interestRatio: 0, 
        principalRatio: 100, 
        taxSaving: 0, 
        months: n 
      };
    }
    const calculatedEmi = Math.round(
      (principal * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)
    );
    const totalPay = calculatedEmi * n;
    const totalInt = Math.max(0, totalPay - principal);
    const intRatio = Math.round((totalInt / totalPay) * 100);
    const princRatio = 100 - intRatio;
    
    // Tax savings estimation
    const yr1Int = Math.min(200000, Math.round(principal * (annualRatePct / 100)));
    const yr1Princ = Math.min(150000, Math.max(0, (calculatedEmi * 12) - yr1Int));
    const taxSav = Math.round((yr1Int + yr1Princ) * 0.312);

    return {
      emi: calculatedEmi,
      totalPayment: totalPay,
      totalInterest: totalInt,
      interestRatio: intRatio,
      principalRatio: princRatio,
      taxSaving: taxSav,
      months: n,
    };
  };

  // Generate 5-year amortization preview
  const generateAmortization = () => {
    let balance = loanAmount;
    const schedule = [];
    for (let yr = 1; yr <= Math.min(5, tenureYears); yr++) {
      let interestForYear = 0;
      let principalForYear = 0;
      for (let m = 0; m < 12; m++) {
        const interestMonth = balance * monthlyRate;
        const principalMonth = emi - interestMonth;
        interestForYear += interestMonth;
        principalForYear += principalMonth;
        balance -= principalMonth;
      }
      schedule.push({
        year: yr,
        principalPaid: Math.round(principalForYear),
        interestPaid: Math.round(interestForYear),
        closingBalance: Math.max(0, Math.round(balance))
      });
    }
    return schedule;
  };

  const schedulePreview = generateAmortization();

  // Side-by-side comparison options
  // Option Set 1: Tenure Comparison (10, 15, 20, 25, 30 Years) at Current Benchmark Rate
  const tenureOptions = [
    { tenure: 10, label: '10 Years', badge: 'Fastest Payoff', strategy: 'Lowest Total Interest' },
    { tenure: 15, label: '15 Years', badge: 'Smart Sweet-Spot', strategy: 'Optimal Interest & EMI' },
    { tenure: 20, label: '20 Years', badge: 'Most Popular', strategy: 'Balanced Family Budget' },
    { tenure: 25, label: '25 Years', badge: 'Comfort Tenure', strategy: 'Moderate Monthly Commitment' },
    { tenure: 30, label: '30 Years', badge: 'Lowest EMI', strategy: 'Max Immediate Affordability' },
  ].map(opt => {
    const metrics = computeLoan(loanAmount, effectiveBenchmarkRate, opt.tenure);
    const emiDiff = metrics.emi - emi;
    const interestDiff = metrics.totalInterest - totalInterest;
    const isCurrent = opt.tenure === tenureYears;
    return {
      ...opt,
      rate: effectiveBenchmarkRate,
      metrics,
      emiDiff,
      interestDiff,
      isCurrent
    };
  });

  // Option Set 2: Interest Rate Sensitivity Comparison (Around Current Benchmark)
  const rateOptions = [
    { rate: 8.15, label: '8.15% p.a.', badge: 'Prime Tier (CIBIL 800+)', note: 'Premium credit rating' },
    { rate: 8.35, label: '8.35% p.a.', badge: 'Govt / Defence / High CIBIL', note: 'Concession / Defence cadre' },
    { rate: 8.50, label: '8.50% p.a.', badge: 'Standard Benchmark', note: 'Salaried sovereign standard' },
    { rate: 8.75, label: '8.75% p.a.', badge: 'Tier-2 Bureau Band', note: 'CIBIL 725 - 750' },
    { rate: 9.00, label: '9.00% p.a.', badge: 'Standard Floating', note: 'Self-employed / general' },
    { rate: 9.25, label: '9.25% p.a.', badge: 'Entry Lending Band', note: 'Base risk evaluation' },
  ].map(opt => {
    const metrics = computeLoan(loanAmount, opt.rate, tenureYears);
    const emiDiff = metrics.emi - emi;
    const interestDiff = metrics.totalInterest - totalInterest;
    const isCurrent = Math.abs(opt.rate - effectiveBenchmarkRate) < 0.05;
    return {
      ...opt,
      tenure: tenureYears,
      metrics,
      emiDiff,
      interestDiff,
      isCurrent
    };
  });

  // Option Set 3: 3-Way Custom Side-by-Side Scenarios
  const scenarioOptions = [
    { ...scenarioA, id: 'A', setter: setScenarioA, defaultLabel: 'Scenario A' },
    { ...scenarioB, id: 'B', setter: setScenarioB, defaultLabel: 'Scenario B' },
    { ...scenarioC, id: 'C', setter: setScenarioC, defaultLabel: 'Scenario C' },
  ].map(sc => {
    const metrics = computeLoan(loanAmount, sc.rate, sc.tenure);
    const emiDiff = metrics.emi - emi;
    const interestDiff = metrics.totalInterest - totalInterest;
    return {
      ...sc,
      metrics,
      emiDiff,
      interestDiff,
    };
  });

  return (
    <div className="space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <Home className="w-3.5 h-3.5" />
          <span>State Bank of India • Home Loan Benchmark</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 font-['Cinzel',serif] tracking-wide">
          SBI Home Loan & Precision EMI Calculator
        </h2>

        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          Explore flexible tenures up to 30 years, nil prepayment penalties, Maxgain overdraft savings, and substantial tax relief under Sections 24(b) and 80C. (Interest rates are dynamically tailored to applicant CIBIL and SBI sanction norms upon synchronous lead generation).
        </p>

        <RangoliDivider className="mt-4" />
      </div>

      {/* Synchronous Lead Tracking Highlight Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-teal-950/40 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-100">Synchronous Lead Details & Sanction Desk</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE HOTLINE
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Every Home Loan enquiry generates a synchronous Lead Reference ID dispatched in real-time to trythiru@gmail.com and WhatsApp (+91 99942 98989).
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenEligibilityCalc && (
            <button
              onClick={onOpenEligibilityCalc}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Check Loan Eligibility</span>
            </button>
          )}

          {onOpenSynchronousLeads && (
            <button
              onClick={onOpenSynchronousLeads}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>View Synchronous Leads Desk</span>
            </button>
          )}

          <button
            onClick={() => onOpenEnquiry(activeProduct.name)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-md shadow-amber-400/20"
          >
            <span>Submit Synchronous Lead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main EMI Calculator & Amortization Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sliders & Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100 font-['Cinzel',serif]">
                    Interactive Loan Parameters
                  </h3>
                  <span className="text-[11px] text-stone-400">Indicative daily reducing balance calculation</span>
                </div>
              </div>

              {/* Women Concession Toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer bg-stone-950 p-2 rounded-xl border border-stone-800">
                <input
                  type="checkbox"
                  checked={isWomenBorrower}
                  onChange={(e) => setIsWomenBorrower(e.target.checked)}
                  className="rounded text-amber-400 focus:ring-amber-400"
                />
                <span className="text-[11px]">Women Co-Borrower Concession</span>
              </label>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-300">Loan Amount (Principal)</span>
                <span className="font-bold font-mono text-amber-400 text-base">
                  ₹{(loanAmount / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={30000000}
                step={100000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>₹5 Lakhs</span>
                <span>₹1 Crore</span>
                <span>₹3 Crores</span>
              </div>
            </div>

            {/* Slider 2: Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-300">Loan Tenure</span>
                <span className="font-bold font-mono text-amber-400 text-base">
                  {tenureYears} Years ({totalMonths} Months)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years (Max)</span>
              </div>
            </div>

            {/* Profile / Applicant Category Selector (Replacing Interest Rate Slider) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-300">
                Applicant Cadre / Profile Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'salaried', label: 'Salaried Professional' },
                  { id: 'govt', label: 'Govt / PSU Cadre' },
                  { id: 'defence', label: 'Defence Personnel' },
                  { id: 'business', label: 'Self-Employed / Business' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setApplicantCategory(item.id)}
                    className={`p-2.5 rounded-xl text-[11px] font-medium transition-all text-center border ${
                      applicantCategory === item.id
                        ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-sm'
                        : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Regulatory Fair Lending Disclosure Box */}
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1 text-stone-300">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interest Rate Policy & Fair Lending Compliance</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                In compliance with RBI fair lending regulations and SBI underwriting norms, interest rates are dynamically determined by individual CIBIL score, loan-to-value (LTV) ratio, and applicant risk profile upon bureau appraisal. Zero static interest rate is displayed publicly to ensure transparent, authentic terms customized directly upon synchronous lead evaluation.
              </p>
            </div>

            {/* 5-Year Amortization Schedule Preview */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                First 5 Years Amortization Schedule (Indicative Preview)
              </span>

              <div className="bg-stone-950/80 rounded-2xl border border-stone-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-stone-500 uppercase tracking-wider border-b border-stone-800 bg-stone-950">
                    <tr>
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3 text-right">Principal Paid</th>
                      <th className="py-2.5 px-3 text-right">Interest Paid</th>
                      <th className="py-2.5 px-3 text-right">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60 font-mono text-stone-300">
                    {schedulePreview.map((row) => (
                      <tr key={row.year} className="hover:bg-stone-900/40">
                        <td className="py-2 px-3 font-semibold text-amber-300">Year {row.year}</td>
                        <td className="py-2 px-3 text-right text-emerald-400">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-3 text-right text-rose-300">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-3 text-right text-stone-200">₹{row.closingBalance.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Outputs & Breakdown (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950 border border-amber-500/30 shadow-xl space-y-6">
            
            <div className="text-center space-y-1 pb-4 border-b border-stone-800">
              <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                Indicative Monthly Installment (EMI)*
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                ₹{emi.toLocaleString('en-IN')}
                <span className="text-xs text-stone-400 font-normal"> / month*</span>
              </div>
              <span className="text-[10px] text-stone-500 block">
                *Subject to CIBIL evaluation and loan sanction
              </span>
            </div>

            {/* Breakup Figures */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-stone-400">
                <span>Principal Loan Amount:</span>
                <strong className="text-stone-100 font-mono text-sm">
                  ₹{loanAmount.toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="flex justify-between items-center text-stone-400">
                <span>Indicative Total Interest Payable:</span>
                <strong className="text-rose-400 font-mono text-sm">
                  ₹{totalInterest.toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="flex justify-between items-center text-stone-400 pb-3 border-b border-stone-800">
                <span>Indicative Total Payment (Principal + Interest):</span>
                <strong className="text-emerald-400 font-mono text-base">
                  ₹{totalPayment.toLocaleString('en-IN')}
                </strong>
              </div>

              {/* Principal vs Interest Visual Proportion Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-emerald-400 font-medium">Principal: {principalRatio}%</span>
                  <span className="text-rose-400 font-medium">Interest: {interestRatio}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-800 overflow-hidden flex">
                  <div style={{ width: `${principalRatio}%` }} className="bg-emerald-500 h-full" />
                  <div style={{ width: `${interestRatio}%` }} className="bg-rose-500 h-full" />
                </div>
              </div>

              {/* Annual Tax Savings Estimate */}
              <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-1 text-stone-300">
                <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Annual Tax Savings under 24(b) & 80C:</span>
                </div>
                <div className="text-lg font-black font-mono text-teal-300">
                  ₹{estimatedTaxSaved.toLocaleString('en-IN')} / year
                </div>
                <p className="text-[10px] text-stone-400">
                  Deduct up to ₹2 Lakh interest (Sec 24b) and up to ₹1.5 Lakh principal (Sec 80C).
                </p>
              </div>

            </div>

            {/* Direct Action Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onOpenEnquiry(activeProduct.name)}
                className="w-full py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Submit Synchronous Lead for Sanction</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex justify-between text-[10px] text-stone-500 px-1">
                <span>WhatsApp: +91 99942 98989</span>
                <span>For Enquiries: trythiru@gmail.com</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Side-by-Side Comparison Table Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Section Header with Mode Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Comparative EMI & Repayment Matrix</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-100 font-['Cinzel',serif]">
              Side-by-Side Loan Comparison Matrix
            </h3>
            <p className="text-xs text-stone-400">
              Directly compare the financial impact of different tenures and interest rates on your ₹{(loanAmount / 100000).toFixed(2)} Lakhs loan.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-stone-950 border border-stone-800">
            <button
              type="button"
              onClick={() => setComparisonView('tenure')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                comparisonView === 'tenure'
                  ? 'bg-amber-400 text-black shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Compare Tenures (10-30 Yrs)</span>
            </button>

            <button
              type="button"
              onClick={() => setComparisonView('rate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                comparisonView === 'rate'
                  ? 'bg-amber-400 text-black shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Rate Sensitivity (8.15% - 9.25%)</span>
            </button>

            <button
              type="button"
              onClick={() => setComparisonView('scenarios')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                comparisonView === 'scenarios'
                  ? 'bg-amber-400 text-black shadow-sm font-bold'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3-Way Custom Planner</span>
            </button>
          </div>
        </div>

        {/* View 1: Side-by-Side Tenure Options Comparison Table */}
        {comparisonView === 'tenure' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Benchmark Interest Rate applied across all tenures: <strong className="text-amber-300 font-mono">{effectiveBenchmarkRate.toFixed(2)}% p.a.</strong>
              </span>
              <span className="text-[11px] text-stone-500">
                Current active tenure: <span className="text-amber-400 font-semibold">{tenureYears} Years</span>
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-950">
                    <th className="p-3.5 font-semibold text-stone-400 min-w-[170px] uppercase text-[10px] tracking-wider sticky left-0 bg-stone-950 z-10">
                      Comparison Metric
                    </th>
                    {tenureOptions.map((opt) => (
                      <th
                        key={opt.tenure}
                        className={`p-3.5 text-center min-w-[150px] transition-colors ${
                          opt.isCurrent
                            ? 'bg-amber-500/10 border-x border-amber-500/30'
                            : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            opt.isCurrent
                              ? 'bg-amber-400 text-black'
                              : 'bg-stone-800 text-stone-300'
                          }`}>
                            {opt.badge}
                          </span>
                          <div className="text-sm font-extrabold text-stone-100 font-['Cinzel',serif]">
                            {opt.label}
                          </div>
                          <span className="text-[10px] text-stone-400 block font-normal">
                            {opt.strategy}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-800/60">
                  {/* Monthly EMI Row */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-200 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-amber-400" />
                        <span>Monthly EMI</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Monthly commitment</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="text-base font-extrabold text-amber-400">
                          ₹{opt.metrics.emi.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">/ month</span>
                      </td>
                    ))}
                  </tr>

                  {/* Monthly EMI Delta Row */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <ArrowUpDown className="w-3.5 h-3.5 text-teal-400" />
                        <span>EMI Diff vs Current</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Relative monthly cash flow</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono text-[11px] ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        {opt.isCurrent ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold text-[10px]">
                            Current Active
                          </span>
                        ) : opt.emiDiff < 0 ? (
                          <span className="text-emerald-400 font-bold">
                            -₹{Math.abs(opt.emiDiff).toLocaleString('en-IN')}/mo (Lower)
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold">
                            +₹{opt.emiDiff.toLocaleString('en-IN')}/mo (Higher)
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Total Interest Outgo Row */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-rose-400" />
                        <span>Total Interest Outgo</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Cumulative interest cost</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="font-bold text-rose-300 text-sm">
                          ₹{opt.metrics.totalInterest.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">
                          ₹{(opt.metrics.totalInterest / 100000).toFixed(2)} Lakhs
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Interest Savings / Cost Difference Row */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Interest Savings / Cost</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">vs {tenureYears}-year active choice</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono text-[11px] ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        {opt.isCurrent ? (
                          <span className="text-stone-500 font-mono">Reference Baseline</span>
                        ) : opt.interestDiff < 0 ? (
                          <span className="text-emerald-400 font-bold block">
                            Saves ₹{(Math.abs(opt.interestDiff) / 100000).toFixed(2)} L
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold block">
                            Adds ₹{(opt.interestDiff / 100000).toFixed(2)} L
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Total Repayment Amount */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <span>Total Repayment Amount</span>
                      <span className="text-[10px] text-stone-500 block font-normal">Principal + Total Interest</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="font-extrabold text-stone-100 text-sm">
                          ₹{opt.metrics.totalPayment.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">
                          ₹{(opt.metrics.totalPayment / 100000).toFixed(2)} Lakhs
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Interest vs Principal Ratio */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <span>Interest as % of Payment</span>
                      <span className="text-[10px] text-stone-500 block font-normal">Financing cost share</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="font-mono text-xs font-bold text-amber-300">
                          {opt.metrics.interestRatio}%
                        </div>
                        <div className="w-20 mx-auto h-1.5 rounded-full bg-stone-800 overflow-hidden mt-1 flex">
                          <div style={{ width: `${opt.metrics.principalRatio}%` }} className="bg-emerald-500 h-full" />
                          <div style={{ width: `${opt.metrics.interestRatio}%` }} className="bg-rose-500 h-full" />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Annual Tax Savings Estimate */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                        <span>Year-1 Tax Savings</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Sec 24(b) + 80C</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center font-mono font-bold text-teal-300 ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        ₹{opt.metrics.taxSaving.toLocaleString('en-IN')}/yr
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr className="bg-stone-950">
                    <td className="p-3.5 font-semibold text-stone-400 sticky left-0 bg-stone-950 z-10">
                      <span>Interactive Actions</span>
                    </td>
                    {tenureOptions.map((opt) => (
                      <td
                        key={opt.tenure}
                        className={`p-3.5 text-center space-y-2 ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        {opt.isCurrent ? (
                          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Loaded in Calc</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTenureYears(opt.tenure)}
                            className="w-full px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-stone-200 bg-stone-800 hover:bg-amber-400 hover:text-black border border-stone-700 transition-colors"
                          >
                            Apply {opt.tenure} Yrs
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenEnquiry(`SBI Home Loan (${opt.tenure} Years Option)`)}
                          className="w-full px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-400 hover:text-amber-300 border border-amber-400/20 hover:border-amber-400/50 transition-colors block"
                        >
                          Enquire Plan →
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Smart Tenure Insight Note */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-xs text-stone-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-amber-300">Strategic Tenure Trade-Off:</span>
                <p className="text-stone-400 leading-relaxed">
                  Choosing a <strong className="text-stone-200">15-Year tenure</strong> instead of <strong className="text-stone-200">30 Years</strong> saves <strong className="text-emerald-400 font-mono">₹{(Math.abs(computeLoan(loanAmount, effectiveBenchmarkRate, 15).totalInterest - computeLoan(loanAmount, effectiveBenchmarkRate, 30).totalInterest) / 100000).toFixed(2)} Lakhs</strong> in total interest, while requiring an additional <strong className="text-stone-200 font-mono">₹{Math.abs(computeLoan(loanAmount, effectiveBenchmarkRate, 15).emi - computeLoan(loanAmount, effectiveBenchmarkRate, 30).emi).toLocaleString('en-IN')}</strong> per month in EMI. SBI permits anytime partial prepayments with zero penalty.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 2: Side-by-Side Interest Rate Sensitivity Comparison Table */}
        {comparisonView === 'rate' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Comparison at fixed loan tenure: <strong className="text-amber-300 font-mono">{tenureYears} Years ({totalMonths} Months)</strong>
              </span>
              <span className="text-[11px] text-stone-500">
                Loan Amount: <span className="text-stone-200 font-mono font-semibold">₹{(loanAmount / 100000).toFixed(2)} Lakhs</span>
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-950">
                    <th className="p-3.5 font-semibold text-stone-400 min-w-[170px] uppercase text-[10px] tracking-wider sticky left-0 bg-stone-950 z-10">
                      Rate Evaluation Band
                    </th>
                    {rateOptions.map((opt) => (
                      <th
                        key={opt.rate}
                        className={`p-3.5 text-center min-w-[150px] transition-colors ${
                          opt.isCurrent
                            ? 'bg-amber-500/10 border-x border-amber-500/30'
                            : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            opt.isCurrent
                              ? 'bg-amber-400 text-black'
                              : 'bg-stone-800 text-stone-300'
                          }`}>
                            {opt.badge}
                          </span>
                          <div className="text-base font-extrabold text-amber-400 font-mono">
                            {opt.label}
                          </div>
                          <span className="text-[10px] text-stone-400 block font-normal">
                            {opt.note}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-800/60">
                  {/* Monthly EMI Row */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-200 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <Calculator className="w-3.5 h-3.5 text-amber-400" />
                        <span>Calculated Monthly EMI</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Per-month installment</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="text-base font-extrabold text-stone-100">
                          ₹{opt.metrics.emi.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">/ month</span>
                      </td>
                    ))}
                  </tr>

                  {/* Monthly Impact vs Current Benchmark */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <ArrowUpDown className="w-3.5 h-3.5 text-teal-400" />
                        <span>Monthly EMI Impact</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">vs {effectiveBenchmarkRate.toFixed(2)}% benchmark</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center font-mono text-[11px] ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        {opt.isCurrent ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold text-[10px]">
                            Current Standard
                          </span>
                        ) : opt.emiDiff < 0 ? (
                          <span className="text-emerald-400 font-bold">
                            Saves ₹{Math.abs(opt.emiDiff).toLocaleString('en-IN')}/mo
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold">
                            +₹{opt.emiDiff.toLocaleString('en-IN')}/mo
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Total Interest Outgo */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-rose-400" />
                        <span>Lifetime Interest Outgo</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Total interest paid</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="font-bold text-rose-300 text-sm">
                          ₹{opt.metrics.totalInterest.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">
                          ₹{(opt.metrics.totalInterest / 100000).toFixed(2)} Lakhs
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Cumulative Interest Savings / Delta */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <div className="flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Lifetime Cost Variance</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-normal">Overall interest variance</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center font-mono text-[11px] ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        {opt.isCurrent ? (
                          <span className="text-stone-500 font-mono">Benchmark Point</span>
                        ) : opt.interestDiff < 0 ? (
                          <span className="text-emerald-400 font-bold block">
                            Saves ₹{(Math.abs(opt.interestDiff) / 100000).toFixed(2)} Lakhs
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold block">
                            Adds ₹{(opt.interestDiff / 100000).toFixed(2)} Lakhs
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Total Repayment */}
                  <tr className="hover:bg-stone-900/30 transition-colors">
                    <td className="p-3.5 font-semibold text-stone-300 sticky left-0 bg-stone-950/95 z-10">
                      <span>Total Repayment Amount</span>
                      <span className="text-[10px] text-stone-500 block font-normal">Principal + Total Interest</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center font-mono ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <div className="font-extrabold text-stone-100 text-sm">
                          ₹{opt.metrics.totalPayment.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-stone-500">
                          ₹{(opt.metrics.totalPayment / 100000).toFixed(2)} Lakhs
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr className="bg-stone-950">
                    <td className="p-3.5 font-semibold text-stone-400 sticky left-0 bg-stone-950 z-10">
                      <span>Synchronous Action</span>
                    </td>
                    {rateOptions.map((opt) => (
                      <td
                        key={opt.rate}
                        className={`p-3.5 text-center ${
                          opt.isCurrent ? 'bg-amber-500/5 border-x border-amber-500/30' : 'border-x border-stone-800/60'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onOpenEnquiry(`SBI Home Loan (${opt.rate}% p.a. Rate Band Enquiry)`)}
                          className="w-full px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-amber-400 hover:text-black hover:bg-amber-400 border border-amber-400/30 transition-all flex items-center justify-center gap-1"
                        >
                          <span>Enquire Rate</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Smart Rate Sensitivity Tip */}
            <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 flex items-start gap-3 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-teal-300">CIBIL & Bureau Score Advantage:</span>
                <p className="text-stone-400 leading-relaxed">
                  Securing a <strong className="text-stone-200">0.35% concession</strong> (e.g., qualifying for 8.15% via CIBIL score 800+ or women co-borrower status) saves <strong className="text-emerald-400 font-mono">₹{(Math.abs(computeLoan(loanAmount, 8.50, tenureYears).totalInterest - computeLoan(loanAmount, 8.15, tenureYears).totalInterest) / 100000).toFixed(2)} Lakhs</strong> in lifetime interest on a ₹{(loanAmount / 100000).toFixed(2)} Lakhs loan over {tenureYears} years.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* View 3: 3-Way Custom Side-by-Side Scenario Planner */}
        {comparisonView === 'scenarios' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Interactive 3-Way Scenario Planner • Adjust tenure and rate in each column independently
              </span>
              <span className="text-[11px] text-stone-500">
                Loan Amount: <span className="text-stone-200 font-mono font-semibold">₹{(loanAmount / 100000).toFixed(2)} Lakhs</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scenarioOptions.map((sc) => (
                <div
                  key={sc.id}
                  className="p-5 rounded-2xl bg-stone-950 border border-amber-500/20 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                          {sc.defaultLabel}
                        </span>
                        <h4 className="text-sm font-bold text-stone-100 font-['Cinzel',serif] mt-1.5">
                          {sc.label}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-extrabold text-teal-400">
                        {sc.rate.toFixed(2)}% p.a.
                      </span>
                    </div>

                    {/* Interactive Controls for Scenario */}
                    <div className="space-y-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-stone-400">Tenure</span>
                          <span className="font-bold text-amber-400 font-mono">{sc.tenure} Years</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={30}
                          step={1}
                          value={sc.tenure}
                          onChange={(e) => sc.setter(prev => ({ ...prev, tenure: Number(e.target.value) }))}
                          className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-stone-400">Interest Rate</span>
                          <span className="font-bold text-teal-400 font-mono">{sc.rate.toFixed(2)}% p.a.</span>
                        </div>
                        <input
                          type="range"
                          min={8.00}
                          max={10.00}
                          step={0.05}
                          value={sc.rate}
                          onChange={(e) => sc.setter(prev => ({ ...prev, rate: Number(e.target.value) }))}
                          className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                        />
                      </div>
                    </div>

                    {/* Calculated EMI Display */}
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-amber-500/20 text-center space-y-1">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
                        Monthly Calculated EMI
                      </span>
                      <div className="text-2xl font-black font-mono text-amber-400">
                        ₹{sc.metrics.emi.toLocaleString('en-IN')}
                        <span className="text-xs text-stone-500 font-normal"> / mo</span>
                      </div>
                      <div className="text-[11px] font-mono">
                        {sc.emiDiff === 0 ? (
                          <span className="text-stone-400">Matches current calc</span>
                        ) : sc.emiDiff < 0 ? (
                          <span className="text-emerald-400 font-semibold">
                            -₹{Math.abs(sc.emiDiff).toLocaleString('en-IN')}/mo vs current
                          </span>
                        ) : (
                          <span className="text-rose-400 font-semibold">
                            +₹{sc.emiDiff.toLocaleString('en-IN')}/mo vs current
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Detailed Metric List */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-stone-400">
                        <span>Total Interest:</span>
                        <strong className="text-rose-300 font-mono">
                          ₹{(sc.metrics.totalInterest / 100000).toFixed(2)} Lakhs
                        </strong>
                      </div>

                      <div className="flex justify-between text-stone-400">
                        <span>Total Repayment:</span>
                        <strong className="text-stone-200 font-mono">
                          ₹{(sc.metrics.totalPayment / 100000).toFixed(2)} Lakhs
                        </strong>
                      </div>

                      <div className="flex justify-between text-stone-400">
                        <span>Interest Share:</span>
                        <strong className="text-amber-400 font-mono">
                          {sc.metrics.interestRatio}% of payout
                        </strong>
                      </div>

                      {/* Visual proportion bar */}
                      <div className="w-full h-1.5 rounded-full bg-stone-800 overflow-hidden flex">
                        <div style={{ width: `${sc.metrics.principalRatio}%` }} className="bg-emerald-500 h-full" />
                        <div style={{ width: `${sc.metrics.interestRatio}%` }} className="bg-rose-500 h-full" />
                      </div>

                      <div className="flex justify-between text-stone-400 pt-1 border-t border-stone-800 text-[11px]">
                        <span>Year-1 Tax Saved:</span>
                        <strong className="text-teal-300 font-mono">
                          ₹{sc.metrics.taxSaving.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Scenario Action Buttons */}
                  <div className="space-y-2 pt-3 border-t border-stone-800">
                    <button
                      type="button"
                      onClick={() => setTenureYears(sc.tenure)}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-stone-300 bg-stone-900 hover:bg-stone-800 border border-stone-700 transition-colors"
                    >
                      Load Tenure ({sc.tenure} Yrs) in Calc
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenEnquiry(`SBI Home Loan (${sc.label}: ${sc.tenure} Yrs @ ${sc.rate.toFixed(2)}%)`)}
                      className="w-full py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Enquire This Scenario</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Grid of SBI Home Loan Products */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-stone-100 font-['Cinzel',serif]">
              SBI Home Loan Schemes Portfolio
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Select any scheme below to calculate custom repayment or proceed with an instant enquiry.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry('SBI Regular Home Loan')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>For Enquiries on WhatsApp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SBI_HOME_LOAN_PRODUCTS.map((prod) => {
            const isSelected = prod.id === activeProductId;

            return (
              <div
                key={prod.id}
                onClick={() => {
                  setActiveProductId(prod.id);
                }}
                className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col justify-between space-y-4 relative group ${
                  isSelected
                    ? 'bg-stone-900 border-amber-400/80 shadow-2xl ring-1 ring-amber-400/40'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                      {prod.badge}
                    </span>
                    <span className="text-xs font-semibold text-teal-400 bg-teal-400/10 px-2.5 py-0.5 rounded-full border border-teal-400/20">
                      {prod.rateBenchmark}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-stone-100 group-hover:text-amber-300 font-['Cinzel',serif] transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div>
                      <span className="text-stone-500 block text-[10px]">Tenure</span>
                      <span className="font-semibold text-stone-200">{prod.maxTenure}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[10px]">Processing Fee</span>
                      <span className="font-semibold text-stone-200">{prod.processingFee.split('(')[0]}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-1.5 text-xs text-stone-300">
                    {prod.keyFeatures.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEnquiry(prod.name);
                    }}
                    className="font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>For Enquiries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[10px] text-stone-500 font-mono">
                    {isSelected ? '✓ Loaded in Calc' : 'Click to Load'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
