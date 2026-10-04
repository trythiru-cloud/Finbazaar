import React from 'react';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  UserCheck, 
  PhoneCall, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  Layers, 
  Newspaper, 
  Target, 
  PieChart, 
  ChevronRight,
  Menu,
  X,
  Gauge,
  Home
} from 'lucide-react';
import { SuryaMandalaMotif, PadmaLotusMotif } from './RangoliMotifs.tsx';
import { UserProfile } from '../data/userPortfolio.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  onOpenEnquiry: (schemeId?: string) => void;
  onOpenBankSync: () => void;
  onOpenAiAnt?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  onOpenEnquiry,
  onOpenBankSync,
  onOpenAiAnt
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'sbi-schemes', label: 'SBI Life Schemes', icon: ShieldCheck, badge: '11 Schemes' },
    { id: 'homeloan-emi', label: 'SBI Home Loan & EMI', icon: Home, badge: '8.50%' },
    { id: 'risk-returns', label: 'Risk & Scoring', icon: Gauge, badge: 'New' },
    { id: 'investments', label: 'Investment Tracker', icon: Layers },
    { id: 'budget-goals', label: 'Budget Goals', icon: Target },
    { id: 'bank-sync', label: 'Bank Sync (AA)', icon: Landmark },
    { id: 'market-news', label: 'Market News', icon: Newspaper, live: true },
    { id: 'planner-insights', label: 'AI Planner', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      {/* Multicolor Auspicious Rangoli Top Gradient Ribbon */}
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-500 via-rose-500 via-purple-500 via-teal-500 to-yellow-400" />
      
      {/* Top Live Ticker & Auto-picked User Status Strip */}
      <div className="bg-gradient-to-r from-amber-950/40 via-stone-950 to-stone-950 px-4 py-1.5 border-b border-stone-800/80 text-[11px] text-stone-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Market Snapshot */}
          <div className="flex items-center gap-4 overflow-x-auto py-0.5">
            <span className="flex items-center gap-1 font-semibold text-amber-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE BSE/NSE:
            </span>
            <span className="shrink-0 font-mono text-stone-200">
              NIFTY 50: <strong className="text-emerald-400">24,842.15 (+0.75%)</strong>
            </span>
            <span className="hidden sm:inline shrink-0 font-mono text-stone-200">
              SENSEX: <strong className="text-emerald-400">81,620.40 (+0.70%)</strong>
            </span>
            <span className="hidden md:inline shrink-0 font-mono text-stone-200">
              GOLD 24K: <strong className="text-amber-400">₹77,450 (+0.41%)</strong>
            </span>
            <span className="hidden lg:inline shrink-0 font-mono text-stone-200">
              SBILIFE: <strong className="text-emerald-400">₹1,698.40 (+3.42%)</strong>
            </span>
          </div>

          {/* Auto-Picked User Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-[10px] text-stone-300">
              <UserCheck className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-stone-200">{userProfile.name}</span>
              <span className="text-stone-500">•</span>
              <span className="flex items-center gap-0.5 text-stone-400">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                {userProfile.location.split(',')[0]}
              </span>
              <span className="text-stone-500">•</span>
              <span className="font-mono text-amber-300">{userProfile.mobile}</span>
            </div>

            <button
              onClick={() => onOpenEnquiry()}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-medium underline"
            >
              For Enquiries
            </button>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 group-hover:border-amber-400 transition-colors">
              <SuryaMandalaMotif size={28} color="#F59E0B" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-stone-100 font-['Cinzel',serif] tracking-wider">
                  Finbazaar
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  Wealth
                </span>
              </div>
              <p className="text-[10px] text-stone-400 -mt-0.5 tracking-tight">
                Auspicious Growth • SBI Life Plans • Bank Sync
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>

                  {item.badge && !isActive && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                      {item.badge}
                    </span>
                  )}

                  {item.live && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {onOpenAiAnt && (
              <button
                onClick={onOpenAiAnt}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-500/40 transition-all shadow-sm"
                title="Ask Chintu the AI Ant about schemes"
              >
                <span className="text-sm">🐜</span>
                <span>Ask AI Ant</span>
              </button>
            )}

            <button
              onClick={onOpenBankSync}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 transition-colors"
            >
              <Landmark className="w-3.5 h-3.5 text-teal-400" />
              <span>Link Bank</span>
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-md shadow-amber-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Instant Enquiry</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {onOpenAiAnt && (
              <button
                onClick={onOpenAiAnt}
                className="px-2 py-1.5 rounded-lg text-xs font-bold text-amber-300 bg-stone-900 border border-amber-500/40 flex items-center gap-1"
                title="Ask AI Ant"
              >
                <span>🐜</span>
                <span className="text-[10px]">AI Ant</span>
              </button>
            )}

            <button
              onClick={() => onOpenEnquiry()}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-black bg-amber-400"
            >
              Enquire
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive
                    ? 'bg-amber-400 text-black'
                    : 'text-stone-300 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenBankSync();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-medium text-stone-200 bg-stone-900 border border-stone-800"
            >
              Link Bank
            </button>
            <button
              onClick={() => {
                onOpenEnquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-black bg-amber-400"
            >
              WhatsApp Enquiry
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
