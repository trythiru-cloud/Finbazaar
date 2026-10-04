import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  Layers, 
  Newspaper, 
  Target, 
  PieChart, 
  PhoneCall, 
  Mail, 
  MapPin, 
  UserCheck, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  HeartHandshake,
  Gauge
} from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { SbiSchemesSection } from './components/SbiSchemesSection.tsx';
import { InvestmentTracker } from './components/InvestmentTracker.tsx';
import { BudgetGoalsSection } from './components/BudgetGoalsSection.tsx';
import { LiveMarketNews } from './components/LiveMarketNews.tsx';
import { FinancialPlannerInsights } from './components/FinancialPlannerInsights.tsx';
import { PortfolioRiskAssessment } from './components/PortfolioRiskAssessment.tsx';
import { SbiHomeLoanSection } from './components/SbiHomeLoanSection.tsx';
import { NatureSavingBackground } from './components/NatureSavingBackground.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';
import { BankSyncModal } from './components/BankSyncModal.tsx';
import { AiAntExplainerModal } from './components/AiAntExplainerModal.tsx';
import { Footer } from './components/Footer.tsx';
import { 
  SuryaMandalaMotif, 
  PadmaLotusMotif, 
  MayilPeacockMotif, 
  AshtalakshmiStarMotif, 
  KalashUrnMotif,
  RangoliCornerFlourish,
  RangoliDivider
} from './components/RangoliMotifs.tsx';
import { INITIAL_USER_PROFILE, INITIAL_BANKS, BankAccount, UserProfile } from './data/userPortfolio.ts';
import { SBI_SCHEMES } from './data/sbiSchemes.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [linkedBanks, setLinkedBanks] = useState<BankAccount[]>(INITIAL_BANKS);
  
  // Modals
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [targetSchemeId, setTargetSchemeId] = useState<string>('sbi-smart-champ');
  const [isBankSyncOpen, setIsBankSyncOpen] = useState(false);

  // AI Ant Guide Modal State
  const [isAiAntOpen, setIsAiAntOpen] = useState(false);
  const [aiAntSchemeId, setAiAntSchemeId] = useState<string>('sbi-smart-champ');

  const handleOpenEnquiry = (schemeId?: string) => {
    if (schemeId) setTargetSchemeId(schemeId);
    setIsEnquiryOpen(true);
  };

  const handleOpenAiAnt = (schemeId?: string) => {
    if (schemeId) setAiAntSchemeId(schemeId);
    setIsAiAntOpen(true);
  };

  const handleBankSynced = (newAccount: BankAccount) => {
    setLinkedBanks([newAccount, ...linkedBanks.filter(b => b.id !== newAccount.id)]);
  };

  const totalBankBalance = linkedBanks
    .filter(b => b.synced)
    .reduce((sum, b) => sum + b.balance, 0);

  return (
    <div className="min-h-screen bg-stone-950/70 text-stone-100 font-sans selection:bg-amber-400 selection:text-black relative">
      
      {/* Dynamic Nature Storing Food Background (Ants & Birds for Rainy Season) */}
      <NatureSavingBackground 
        onOpenAiAnt={handleOpenAiAnt}
        onOpenEnquiry={(scheme) => handleOpenEnquiry(scheme.id)}
      />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenBankSync={() => setIsBankSyncOpen(true)}
        onOpenAiAnt={() => handleOpenAiAnt()}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            
            {/* Hero Wealth Banner with Auspicious Rangoli Geometric Accents & Multicolor Gradient */}
            <div className="relative rounded-3xl bg-gradient-to-br from-amber-950/70 via-stone-900/90 to-teal-950/70 border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-md">
              
              {/* Corner Rangoli vectors */}
              <RangoliCornerFlourish className="absolute top-0 left-0" color="#F59E0B" />
              <RangoliCornerFlourish className="absolute top-0 right-0 rotate-90" color="#E11D48" />
              <RangoliCornerFlourish className="absolute bottom-0 left-0 -rotate-90" color="#0D9488" />
              <RangoliCornerFlourish className="absolute bottom-0 right-0 rotate-180" color="#9333EA" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Hero Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auspicious Indian Wealth Architecture</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-stone-100 font-['Cinzel',serif] tracking-tight leading-tight">
                    Traditional Prosperity. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 via-teal-300 to-yellow-300">
                      Sovereign Security.
                    </span>
                  </h1>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Welcome to Finbazaar. Just as ants methodically store grain and weaver birds feather secure nests before the monsoon, Finbazaar equips you to store wealth, secure emergency funds, and shield your family with guaranteed SBI Life & Home Loans.
                  </p>

                  {/* Auto-detected Profile Indicator Box */}
                  <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs flex flex-wrap items-center justify-between gap-3 text-stone-300 shadow-inner">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Applicant Profile: <strong className="text-stone-100">Verified User</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-amber-300">
                      <span>{userProfile.mobile}</span>
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenEnquiry('sbi-smart-champ')}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/25"
                    >
                      <span>For Enquiries on WhatsApp (+91 99942 98989)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveTab('sbi-schemes')}
                      className="flex items-center gap-1.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                    >
                      <span>Explore SBI Schemes (11 Policies)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveTab('homeloan-emi')}
                      className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-700 border border-stone-700 transition-colors"
                    >
                      SBI Home Loan & EMI
                    </button>
                  </div>
                </div>

                {/* Right Hero: Rangoli Wealth Variants Display */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                  
                  {/* Card 1: Child Education (Padma Lotus) */}
                  <div 
                    onClick={() => { setActiveTab('sbi-schemes'); handleOpenEnquiry('sbi-smart-champ'); }}
                    className="p-4 rounded-2xl bg-stone-950/90 border border-rose-500/30 hover:border-rose-400 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <PadmaLotusMotif size={32} color="#E11D48" />
                      <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded">
                        Child Plan
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-rose-300 font-['Cinzel',serif]">
                      Smart Champ
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      4 guaranteed college milestone payouts from age 18 to 21.
                    </p>
                  </div>

                  {/* Card 2: Pension Plan (Mayil Peacock) */}
                  <div 
                    onClick={() => { setActiveTab('sbi-schemes'); handleOpenEnquiry('sbi-retire-smart'); }}
                    className="p-4 rounded-2xl bg-stone-950/90 border border-teal-500/30 hover:border-teal-400 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <MayilPeacockMotif size={32} color="#0D9488" />
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded">
                        Pension Plan
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-teal-300 font-['Cinzel',serif]">
                      Retire Smart
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Guaranteed additions up to 210% of annual premium.
                    </p>
                  </div>

                  {/* Card 3: Women Wealth Builder (Ashtalakshmi Star) */}
                  <div 
                    onClick={() => { setActiveTab('sbi-schemes'); handleOpenEnquiry('sbi-smart-women-advantage'); }}
                    className="p-4 rounded-2xl bg-stone-950/90 border border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <AshtalakshmiStarMotif size={32} color="#C026D3" />
                      <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                        Women Wealth
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-purple-300 font-['Cinzel',serif]">
                      Women Advantage
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Dual wealth growth + 9 female critical illnesses cover.
                    </p>
                  </div>

                  {/* Card 4: Traditional Insurance (Kalash Urn) */}
                  <div 
                    onClick={() => { setActiveTab('sbi-schemes'); handleOpenEnquiry('sbi-shubh-nivesh'); }}
                    className="p-4 rounded-2xl bg-stone-950/90 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <KalashUrnMotif size={32} color="#D97706" />
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        Traditional
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 font-['Cinzel',serif]">
                      Shubh Nivesh
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Whole life regular income endowment up to 100 years.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Quick Metrics Bar: Wealth, Bank Sync, Tax Shield */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div 
                onClick={() => setActiveTab('investments')}
                className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase font-semibold tracking-wider">Net Portfolio Wealth</span>
                  <SuryaMandalaMotif size={20} color="#F59E0B" />
                </div>
                <div className="text-2xl font-black font-mono text-stone-100">
                  ₹34,80,000
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+₹9,80,000 (+39.2% All-time Profit)</span>
                </div>
              </div>

              <div 
                onClick={() => setIsBankSyncOpen(true)}
                className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase font-semibold tracking-wider">Account Aggregator Balances</span>
                  <Landmark className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black font-mono text-teal-300">
                  ₹{totalBankBalance.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-stone-400">
                  SBI & HDFC Verified • 1-Click Sync
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('planner-insights')}
                className="p-5 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="uppercase font-semibold tracking-wider">Tax Savings Shield</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-amber-300">
                  ₹1,50,000 / yr
                </div>
                <div className="text-xs text-stone-400">
                  80C & 10(10D) Tax-Free Benefits
                </div>
              </div>

            </div>

            {/* Dedicated Portfolio Risk Assessment & Scoring Banner */}
            <div 
              onClick={() => setActiveTab('risk-returns')}
              className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-rose-950/40 border border-amber-500/40 shadow-2xl hover:border-amber-400 cursor-pointer transition-all space-y-4 relative overflow-hidden group"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        AI Portfolio Risk & Return Rating
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">
                        Score: 84/100
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif] mt-0.5 group-hover:text-amber-300 transition-colors">
                      Assess Portfolio Risk & Discover Matched SBI Life Schemes
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    View Full Diagnostics & Rebalancing Simulator
                  </span>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Risk Score</span>
                  <span className="font-bold font-mono text-amber-400 text-sm">7.2 / 10</span>
                  <span className="text-[10px] text-stone-400 block">Moderately Aggressive</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Expected Return</span>
                  <span className="font-bold font-mono text-emerald-400 text-sm">13.6% p.a.</span>
                  <span className="text-[10px] text-stone-400 block">Inflation Adjusted: 7.8%</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Stability Gap</span>
                  <span className="font-bold font-mono text-rose-400 text-sm">64 / 100</span>
                  <span className="text-[10px] text-stone-400 block">Needs Guaranteed Shield</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Suggested Schemes</span>
                  <span className="font-bold text-teal-300 text-xs block">Smart Champ • Retire Smart</span>
                  <span className="text-[10px] text-stone-400 block">96% Matched</span>
                </div>
              </div>
            </div>

            {/* Quick Sbi Schemes Showcase */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif]">
                    Featured SBI Life Solutions
                  </h3>
                  <p className="text-xs text-stone-400">
                    High-conviction policies for education milestones, post-retirement income, and women's health.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('sbi-schemes')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>View All 11 Schemes & Calculator</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SBI_SCHEMES.slice(0, 4).map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => { setActiveTab('sbi-schemes'); handleOpenEnquiry(scheme.id); }}
                    className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-amber-400/60 cursor-pointer transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        {scheme.categoryLabel}
                      </span>
                      {scheme.rangoliPattern === 'padma' && <PadmaLotusMotif size={24} color="#F43F5E" />}
                      {scheme.rangoliPattern === 'mayil' && <MayilPeacockMotif size={24} color="#0D9488" />}
                      {scheme.rangoliPattern === 'ashtalakshmi' && <AshtalakshmiStarMotif size={24} color="#C026D3" />}
                      {scheme.rangoliPattern === 'kalash' && <KalashUrnMotif size={24} color="#D97706" />}
                      {scheme.rangoliPattern === 'surya' && <SuryaMandalaMotif size={24} color="#0284C7" />}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 line-clamp-1">
                        {scheme.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2">
                        {scheme.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-800 text-[11px] flex items-center justify-between text-stone-400">
                      <div>
                        <span>Maturity: </span>
                        <strong className="text-stone-200 font-mono">₹{(scheme.defaultSumAssured / 100000).toFixed(1)}L</strong>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAiAnt(scheme.id);
                        }}
                        className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-black border border-amber-400/30 text-[10px] font-bold flex items-center gap-1 transition-colors"
                        title="Ask Chintu the AI Ant to explain this scheme"
                      >
                        <span>🐜</span>
                        <span>Ask Ant</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SBI Home Loan & EMI Calculator (Placed directly below Explore SBI Schemes) */}
            <div className="space-y-4 pt-2">
              <SbiHomeLoanSection onOpenEnquiry={handleOpenEnquiry} />
            </div>

            {/* AI Financial Health Preview */}
            <FinancialPlannerInsights onOpenEnquiry={handleOpenEnquiry} />

            {/* Live Financial News Preview via Google Search Grounding */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif]">
                    Live Financial Market Intelligence
                  </h3>
                  <p className="text-xs text-stone-400">
                    Live updates on Sensex, Nifty, and SBI Life powered by Google Search Grounding.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('market-news')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Explore Full Live Wire</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <LiveMarketNews />
            </div>

          </div>
        )}

        {/* SBI SCHEMES TAB */}
        {activeTab === 'sbi-schemes' && (
          <SbiSchemesSection 
            onOpenEnquiry={handleOpenEnquiry} 
            onOpenAiAnt={handleOpenAiAnt}
          />
        )}

        {/* SBI HOME LOAN & EMI CALCULATOR TAB (Placed below Explore SBI Schemes) */}
        {activeTab === 'homeloan-emi' && (
          <SbiHomeLoanSection onOpenEnquiry={handleOpenEnquiry} />
        )}

        {/* RISK & RETURNS ASSESSMENT TAB */}
        {activeTab === 'risk-returns' && (
          <PortfolioRiskAssessment userProfile={userProfile} onOpenEnquiry={handleOpenEnquiry} />
        )}

        {/* INVESTMENTS TRACKER TAB */}
        {activeTab === 'investments' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-stone-800">
              <h2 className="text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
                Wealth & Investment Portfolio Tracker
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Real-time tracking across SBI Life schemes, mutual fund SIPs, direct equities, sovereign gold bonds, and bank deposits.
              </p>
            </div>
            <InvestmentTracker onOpenEnquiry={handleOpenEnquiry} />
          </div>
        )}

        {/* BUDGET GOALS TAB */}
        {activeTab === 'budget-goals' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-stone-800">
              <h2 className="text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
                Budget Goals & Financial Horizons
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Set milestones for child higher education, comfortable retirement pension, and family wealth preservation with guaranteed SBI Life shields.
              </p>
            </div>
            <BudgetGoalsSection onOpenEnquiry={handleOpenEnquiry} />
          </div>
        )}

        {/* BANK SYNC (ACCOUNT AGGREGATOR) TAB */}
        {activeTab === 'bank-sync' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
                  Secure Bank Syncing & Account Aggregator
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  RBI-regulated consent framework for fetching verified liquid balances and categorizing income vs expenses.
                </p>
              </div>

              <button
                onClick={() => setIsBankSyncOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-teal-400 hover:bg-teal-300 transition-colors shadow-lg shadow-teal-400/20"
              >
                <Landmark className="w-4 h-4" />
                <span>Link Another Bank Account</span>
              </button>
            </div>

            {/* Linked Bank Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {linkedBanks.map((bank) => (
                <div
                  key={bank.id}
                  className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-stone-100">{bank.bankName}</h4>
                      <span className="text-[11px] font-mono text-stone-400">{bank.accountNumber}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      bank.synced ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' : 'bg-stone-800 text-stone-400'
                    }`}>
                      {bank.synced ? 'Synced' : 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider">Verified Balance</span>
                    <div className="text-2xl font-black font-mono text-emerald-400">
                      ₹{bank.balance.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="text-xs text-stone-400 space-y-1 pt-2 border-t border-stone-800/80">
                    <div className="flex justify-between">
                      <span>Account Type:</span>
                      <span className="text-stone-300">{bank.accountType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Branch:</span>
                      <span className="text-stone-300 truncate max-w-[150px]">{bank.branch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span className="text-stone-300">{bank.lastSyncTime}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsBankSyncOpen(true)}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 transition-colors"
                  >
                    Refresh Sync Credentials
                  </button>
                </div>
              ))}
            </div>

            {/* Account Aggregator Security Assurance */}
            <div className="p-5 rounded-2xl bg-teal-950/20 border border-teal-500/30 text-xs text-stone-300 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal-300 block mb-1 font-semibold">RBI Account Aggregator Framework Compliance:</strong>
                Data is encrypted end-to-end between your bank (FIP) and Finbazaar (FIU). Finbazaar does not access or store your net banking passwords or transaction PINs. Consent can be revoked at any time.
              </div>
            </div>
          </div>
        )}

        {/* LIVE MARKET NEWS TAB */}
        {activeTab === 'market-news' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-stone-800">
              <h2 className="text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
                Live Market Updates & Financial News
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Real-time stock market data, indices, and financial headlines grounded via Google Search.
              </p>
            </div>
            <LiveMarketNews />
          </div>
        )}

        {/* AI PLANNER INSIGHTS TAB */}
        {activeTab === 'planner-insights' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-stone-800">
              <h2 className="text-3xl font-extrabold text-stone-100 font-['Cinzel',serif]">
                Personalized Financial Planning Insights
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Comprehensive AI evaluation of your wealth health, asset rebalancing matrix, and customized SBI Life allocation recommendations.
              </p>
            </div>
            <FinancialPlannerInsights onOpenEnquiry={handleOpenEnquiry} />
          </div>
        )}

      </main>

      {/* Global Enquiry Modal with Auto-picked User Details & WhatsApp + Email Sharing */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialSchemeId={targetSchemeId}
        autoUserData={{
          name: userProfile.name,
          mobile: userProfile.mobile,
          location: userProfile.location
        }}
      />

      {/* Global Bank Sync Modal */}
      <BankSyncModal
        isOpen={isBankSyncOpen}
        onClose={() => setIsBankSyncOpen(false)}
        onBankSynced={handleBankSynced}
        userMobile={userProfile.mobile}
      />

      {/* AI Ant Mascot & Scheme Explainer Modal */}
      <AiAntExplainerModal
        isOpen={isAiAntOpen}
        onClose={() => setIsAiAntOpen(false)}
        initialSchemeId={aiAntSchemeId}
        onSelectSchemeForEnquiry={(scheme) => handleOpenEnquiry(scheme.id)}
      />

      {/* Floating AI Ant Guide Summoner Widget */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
        <div className="hidden sm:block bg-stone-900/95 border border-amber-500/40 text-stone-200 text-xs px-3 py-1.5 rounded-2xl shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="font-bold text-amber-300">Need advice?</span> Ask Chintu the AI Ant!
        </div>
        <button
          onClick={() => handleOpenAiAnt()}
          className="relative p-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black shadow-xl shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-stone-950"
          title="Ask Chintu the AI Ant"
        >
          <span className="text-2xl animate-bounce">🐜</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950" />
        </button>
      </div>

      {/* Footer with Regulatory Disclaimers & Copyrights */}
      <Footer onOpenEnquiry={handleOpenEnquiry} />

    </div>
  );
}
