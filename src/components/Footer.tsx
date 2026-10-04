import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Lock, 
  Sparkles, 
  HeartHandshake, 
  FileText,
  Building2
} from 'lucide-react';
import { SuryaMandalaMotif, PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';

interface FooterProps {
  onOpenEnquiry: (schemeId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs mt-20 relative overflow-hidden">
      
      {/* Decorative Rangoli Pattern Top Edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-rose-500 via-teal-500 via-purple-500 to-amber-500 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <SuryaMandalaMotif size={28} color="#F59E0B" />
              </div>
              <span className="text-2xl font-black text-stone-100 font-['Cinzel',serif] tracking-wider">
                Finbazaar
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              India’s premier wealth intelligence, home loan & life insurance portal. Combining traditional Rangoli prosperity values with modern Account Aggregator bank syncing, real-time market data, and flagship SBI Life & Home Loan solutions for enquiries.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>For Enquiries Email: <a href="mailto:trythiru@gmail.com" className="text-amber-300 hover:underline">trythiru@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>For Enquiries WhatsApp: <a href="https://wa.me/919994298989" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">+91 99942 98989</a></span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Hub: Chennai Central, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: SBI Flagship Schemes */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] font-['Cinzel',serif]">
              Flagship SBI Schemes
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => onOpenEnquiry('SBI Regular Home Loan')} className="hover:text-amber-300 transition-colors text-left font-semibold text-amber-300">
                  SBI Regular Home Loan & Maxgain
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('sbi-smart-champ')} className="hover:text-amber-300 transition-colors text-left">
                  SBI Life - Smart Champ (Child)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('sbi-retire-smart')} className="hover:text-amber-300 transition-colors text-left">
                  SBI Life - Retire Smart (Pension)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('sbi-smart-women-advantage')} className="hover:text-amber-300 transition-colors text-left">
                  SBI Life - Smart Women Advantage
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('sbi-shubh-nivesh')} className="hover:text-amber-300 transition-colors text-left">
                  SBI Life - Shubh Nivesh (Traditional)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('sbi-sampoorn-suraksha')} className="hover:text-sky-300 transition-colors text-left text-sky-400 font-medium">
                  SBI Life - Sampoorn Suraksha (Employer-Employee)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Wealth Features */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] font-['Cinzel',serif]">
              Wealth Architecture
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><span>Portfolio XIRR & CAGR Tracker</span></li>
              <li><span>50/30/20 Monthly Budget Goals</span></li>
              <li><span>RBI Account Aggregator Bank Sync</span></li>
              <li><span>Google Search Live Market Grounding</span></li>
              <li><span>Tax Optimization (80C, 10(10D), 80CCC)</span></li>
            </ul>
          </div>

          {/* Column 4: Rangoli Wealth Variants */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-semibold uppercase tracking-wider text-[11px] font-['Cinzel',serif]">
              Rangoli Wealth Variants
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Child Education Shield (Padma)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Pension & Longevity (Mayil)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Women Wealth Builder (Ashtalakshmi)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Traditional Heritage Cover (Kalash)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory, GDPR, DPDP & Copyright Notices */}
        <div className="pt-8 space-y-4 text-[11px] text-stone-500 leading-relaxed">
          
          {/* Statutory IRDAI Notice */}
          <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/80 space-y-2">
            <div className="flex items-center gap-2 text-stone-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IRDAI Registration & Educational Policyholder Notice</span>
            </div>
            <p>
              SBI Life Insurance Company Limited is a joint venture between State Bank of India and BNP Paribas Cardif. Registered with Insurance Regulatory and Development Authority of India (IRDAI Regn. No. 111). Trade logo displayed belongs to State Bank of India and is used under license.
            </p>
            <p>
              Finbazaar™ functions as an educational wealth management platform, tax calculation facilitator, and authorized corporate agency distributor partner. Insurance is the subject matter of solicitation. Policy benefits, bonuses, and terms are governed exclusively by the policy document issued by the insurer. Mutual fund investments are subject to market risks; please read all scheme-related documents carefully.
            </p>
          </div>

          {/* GDPR & DPDP Act 2023 Compliance Disclaimer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900/90 to-amber-950/20 border border-teal-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2.5">
              <div className="flex items-center gap-2 text-stone-200 font-bold text-xs">
                <div className="p-1 rounded-lg bg-teal-500/20 text-teal-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>GDPR & Digital Personal Data Protection (DPDP) Act, 2023 Compliance Disclaimer</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  ✓ DPDP Act 2023 Compliant
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  ✓ GDPR (EU 2016/679) Verified
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  ✓ 256-Bit SSL Encrypted Sync
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-stone-400">
              <div className="space-y-1.5">
                <strong className="text-stone-300 block">Data Principal Rights & Statutory Protections:</strong>
                <p>
                  Finbazaar operates in strict compliance with India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the European Union's <strong>General Data Protection Regulation (GDPR)</strong>. As a Data Principal, you possess statutory rights including: (1) Right to Access summary of personal data & processing activities; (2) Right to Rectification of inaccurate or misleading records; (3) Right to Erasure ("Right to be Forgotten"); and (4) Right to Nominate and Grievance Redressal.
                </p>
              </div>

              <div className="space-y-1.5">
                <strong className="text-stone-300 block">Purpose Limitation & Synchronous Dispatch Protocol:</strong>
                <p>
                  Personal data (name, contact number, estimated budget, and asset parameters) is collected exclusively pursuant to your lawful, informed consent to deliver customized SBI Life illustrations, calculate indicative loan amortizations, and route synchronous consultation requests to our official desk. Finbazaar maintains a strict zero-telemetry selling guarantee: your data is never sold, traded, or shared with unapproved third parties.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-[10px] text-stone-500">
              <div>
                <span>Designated Data Protection Officer (DPO) & Privacy Desk: </span>
                <a href="mailto:trythiru@gmail.com" className="text-amber-400 hover:underline font-mono">
                  trythiru@gmail.com
                </a>
                <span> • Grievance Cell: +91 99942 98989</span>
              </div>

              <div className="flex items-center gap-3 text-stone-400">
                <span>Synchronous Data Encryption: AES-256</span>
                <span>•</span>
                <span>Retention: Lawful Financial Advisory Purpose Only</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-stone-500 text-[11px]">
            <div>
              © 2026 Finbazaar Wealth Technologies Private Limited. All Rights Reserved. Indian Copyright Act, 1957.
            </div>

            <div className="flex items-center gap-4">
              <span>Direct Lead Delivery: <strong className="text-stone-400">trythiru@gmail.com</strong></span>
              <span>•</span>
              <span>WhatsApp: <strong className="text-stone-400">+91 99942 98989</strong></span>
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
};
