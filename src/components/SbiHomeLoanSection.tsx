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
  FileText
} from 'lucide-react';
import { SBI_HOME_LOAN_PRODUCTS, SbiHomeLoanProduct } from '../data/sbiHomeLoan.ts';
import { KalashUrnMotif, RangoliDivider, SuryaMandalaMotif } from './RangoliMotifs.tsx';

interface SbiHomeLoanSectionProps {
  onOpenEnquiry: (schemeName?: string) => void;
}

export const SbiHomeLoanSection: React.FC<SbiHomeLoanSectionProps> = ({ onOpenEnquiry }) => {
  // Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.50); // 8.50% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Years
  const [isWomenBorrower, setIsWomenBorrower] = useState<boolean>(false);

  const [activeProductId, setActiveProductId] = useState<string>('sbi-regular-homeloan');
  const activeProduct: SbiHomeLoanProduct = 
    SBI_HOME_LOAN_PRODUCTS.find(p => p.id === activeProductId) || SBI_HOME_LOAN_PRODUCTS[0];

  // Dynamic EMI Calculation
  // E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const effectiveRate = isWomenBorrower ? Math.max(7.0, interestRate - 0.05) : interestRate;
  const monthlyRate = effectiveRate / 12 / 100;
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
  const firstYearInterest = Math.min(200000, Math.round(loanAmount * (effectiveRate / 100)));
  const firstYearPrincipal = Math.min(150000, (emi * 12) - firstYearInterest);
  const estimatedTaxSaved = Math.round((firstYearInterest + firstYearPrincipal) * 0.312); // At 30% slab + 4% cess

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
          Explore competitive rates starting at 8.50% p.a. linked to EBLR, nil prepayment penalties, Maxgain overdraft savings, and substantial tax relief under Sections 24(b) and 80C.
        </p>

        <RangoliDivider className="mt-4" />
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
                  <span className="text-[11px] text-stone-400">Real-time daily reducing balance calculation</span>
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
                <span className="text-[11px]">Women Borrower (0.05% Off)</span>
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

            {/* Slider 2: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-300">
                  Annual Interest Rate (% p.a.)
                </span>
                <span className="font-bold font-mono text-amber-400 text-base">
                  {effectiveRate.toFixed(2)}% p.a.
                  {isWomenBorrower && <span className="text-[10px] text-emerald-400 font-normal ml-1">(-0.05% Applied)</span>}
                </span>
              </div>
              <input
                type="range"
                min={7.50}
                max={12.00}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>7.50% (Concessional)</span>
                <span>8.50% (SBI Base)</span>
                <span>12.00%</span>
              </div>
            </div>

            {/* Slider 3: Loan Tenure */}
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

            {/* 5-Year Amortization Schedule Preview */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                First 5 Years Amortization Schedule (Sneak Peek)
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
                Your Monthly Installment (EMI)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                ₹{emi.toLocaleString('en-IN')}
                <span className="text-xs text-stone-400 font-normal"> / month</span>
              </div>
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
                <span>Total Interest Payable:</span>
                <strong className="text-rose-400 font-mono text-sm">
                  ₹{totalInterest.toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="flex justify-between items-center text-stone-400 pb-3 border-b border-stone-800">
                <span>Total Payment (Principal + Interest):</span>
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
                <span>For Enquiries & Instant Callback</span>
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
                  if (prod.id === 'sbi-maxgain-homeloan') setInterestRate(8.75);
                  else if (prod.id === 'sbi-privilege-homeloan' || prod.id === 'sbi-shaurya-homeloan') setInterestRate(8.40);
                  else setInterestRate(8.50);
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
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {prod.minInterestRate}
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
