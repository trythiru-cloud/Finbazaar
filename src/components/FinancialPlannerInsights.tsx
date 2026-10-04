import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Percent, 
  Layers, 
  HeartHandshake,
  DollarSign,
  Download,
  UserCheck,
  Lock
} from 'lucide-react';
import { SuryaMandalaMotif, PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';
import { UserProfile } from '../data/userPortfolio.ts';

interface FinancialPlannerInsightsProps {
  onOpenEnquiry: (schemeId?: string) => void;
  userProfile?: UserProfile;
  lastSyncedAt?: string;
  onRefreshUserData?: () => Promise<void> | void;
  onExportUserData?: () => void;
  isRefreshingUserData?: boolean;
}

export const FinancialPlannerInsights: React.FC<FinancialPlannerInsightsProps> = ({ 
  onOpenEnquiry,
  userProfile,
  lastSyncedAt,
  onRefreshUserData,
  onExportUserData,
  isRefreshingUserData = false
}) => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>({
    healthScore: 84,
    summary: "Your portfolio demonstrates disciplined domestic equity accumulation and solid emergency liquidity. However, your long-term guaranteed safety net and child college milestone funding requires an additional allocation.",
    strengths: [
      "Consistent equity and SIP accumulation beating domestic inflation benchmarks.",
      "Emergency liquidity buffer of 5.5 months current expenditure intact."
    ],
    gaps: [
      "Retirement annuity buffer is under-allocated for a comfortable post-60 lifestyle.",
      "Child education milestones lack guaranteed non-market-linked maturity protection."
    ],
    sbiLifeRecommendation: {
      recommendedPlan: "SBI Life - Smart Champ Insurance & Retire Smart Combo",
      rationale: "Ensures 4 guaranteed annual milestone payouts for child college education, paired with tax-deferred pension accumulation under 80C & 10(10D).",
      suggestedMonthlyAllocation: "₹15,000"
    },
    assetRebalancing: [
      { asset: "Mutual Funds (SIP)", current: 45, recommended: 40, action: "Continue diversified flexi-cap SIPs" },
      { asset: "SBI Life Guaranteed Plans", current: 15, recommended: 25, action: "Lock in guaranteed high returns" },
      { asset: "Direct Equities", current: 25, recommended: 20, action: "Rebalance speculative tech exposure" },
      { asset: "Sovereign Gold / Bullion", current: 10, recommended: 10, action: "Preserve as hedge against rupee devaluation" },
      { asset: "Bank FD & Liquid Cash", current: 5, recommended: 5, action: "Hold as immediate emergency cushion" }
    ],
    taxSavingAction: "Maximize the remaining ₹65,000 threshold under Section 80C using SBI Life traditional endowment plans to obtain guaranteed 10(10D) tax-free maturity."
  });

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/financial-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: { age: 36, monthlyIncome: 145000 },
          portfolio: { totalValue: 3480000 },
          budgetGoals: ['Child Higher Education', 'Retirement Pension', 'Emergency Fund']
        })
      });
      const data = await res.json();
      if (data.insights) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error('Insights fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Synchronous User Details & Data Portability Panel (Placed next to AI Planner) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/30 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-100">Synchronous Wealth & Portfolio Intelligence</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Synchronous: Live
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                DPDP & GDPR Verified
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400 mt-0.5">
              <span className="text-stone-200 font-semibold">{userProfile?.name || 'Thirumalai N'}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 bg-stone-950 px-2 py-0.5 rounded-lg border border-stone-800 text-[10px]">
                <span className="text-stone-400">Mobile:</span>
                <span className="font-mono text-amber-300 font-bold">{userProfile?.mobile || '+91 98401 23456'}</span>
              </span>
              <span>•</span>
              <span>{userProfile?.location || 'Chennai, Tamil Nadu'}</span>
              <span>•</span>
              <span className="text-stone-500 font-mono">
                Last Synced: {new Date(lastSyncedAt || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>

        {/* Refresh and Export Options Placed Next to AI Planner */}
        <div className="flex items-center gap-2">
          {onRefreshUserData && (
            <button
              onClick={onRefreshUserData}
              disabled={isRefreshingUserData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-amber-400/50 transition-all disabled:opacity-50"
              title="Synchronously Refresh User Details"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-teal-400 ${isRefreshingUserData ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isRefreshingUserData ? 'Refreshing...' : 'Refresh User Data'}</span>
            </button>
          )}

          {onExportUserData && (
            <button
              onClick={onExportUserData}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-md shadow-amber-400/20"
              title="Export User Data (GDPR & DPDP Act Compliant)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export User Data (GDPR/DPDP)</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Banner with Health Score */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Finbazaar AI Wealth Intelligence</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
              Personalized Financial Planning Diagnosis
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {insights.summary}
            </p>
          </div>

          {/* Health Score Meter */}
          <div className="flex items-center gap-4 bg-stone-950/80 p-5 rounded-2xl border border-stone-800 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
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
                  strokeDasharray={`${insights.healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-xl font-black text-stone-100">{insights.healthScore}</span>
                <span className="text-[9px] text-stone-500 uppercase">/100</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 block">Excellent Standing</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">Top 12% in peer cohort</span>
              <button
                onClick={fetchAIInsights}
                disabled={loading}
                className="mt-2 text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Re-Analyze with AI</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Strengths & Vulnerabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Portfolio Strengths</span>
          </div>

          <div className="space-y-2.5">
            {insights.strengths?.map((str: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Gaps */}
        <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Identified Protection & Horizon Gaps</span>
          </div>

          <div className="space-y-2.5">
            {insights.gaps?.map((gap: string, i: number) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended SBI Life Scheme Integration */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 via-stone-900 to-teal-950/30 border border-rose-500/30 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
              <PadmaLotusMotif size={32} color="#E11D48" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full border border-rose-400/20">
                Recommended Safeguard Match
              </span>
              <h4 className="text-lg font-bold text-stone-100 font-['Cinzel',serif] mt-0.5">
                {insights.sbiLifeRecommendation?.recommendedPlan}
              </h4>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry('sbi-smart-champ')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
          >
            <span>Lock Recommended Allocation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed">
          {insights.sbiLifeRecommendation?.rationale}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Suggested Monthly SIP Allocation:</span>
            <strong className="text-amber-400 font-mono text-sm">{insights.sbiLifeRecommendation?.suggestedMonthlyAllocation}</strong>
          </div>

          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Eligible for Section 80C Deduction & 10(10D) Tax-Free Returns</span>
          </div>
        </div>
      </div>

      {/* Asset Rebalancing Strategy Table */}
      <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between text-xs font-bold text-stone-300 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            Strategic Asset Rebalancing Target
          </span>
          <span className="text-stone-500 font-mono">Quarterly Review</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] text-stone-400 uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-2.5 px-3">Asset Class</th>
                <th className="py-2.5 px-3 text-right">Current</th>
                <th className="py-2.5 px-3 text-right">Target</th>
                <th className="py-2.5 px-3">Action for Enquiries & Rebalancing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-stone-300">
              {insights.assetRebalancing?.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-stone-800/30">
                  <td className="py-3 px-3 font-semibold text-stone-200">{row.asset}</td>
                  <td className="py-3 px-3 text-right font-mono text-stone-400">{row.current}%</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">{row.recommended}%</td>
                  <td className="py-3 px-3 text-stone-300">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Saving Action Callout */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 flex items-start gap-3">
          <Percent className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold block mb-0.5">Tax Saving Action Item:</strong>
            {insights.taxSavingAction}
          </div>
        </div>

      </div>

    </div>
  );
};
