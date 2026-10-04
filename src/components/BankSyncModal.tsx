import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Building2, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  Smartphone,
  CreditCard,
  Layers,
  Loader2
} from 'lucide-react';
import { BankAccount } from '../data/userPortfolio.ts';

interface BankSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBankSynced: (account: BankAccount) => void;
  userMobile: string;
}

export const BankSyncModal: React.FC<BankSyncModalProps> = ({
  isOpen,
  onClose,
  onBankSynced,
  userMobile
}) => {
  const [step, setStep] = useState<'select' | 'otp' | 'success'>('select');
  const [selectedBank, setSelectedBank] = useState<'sbi' | 'hdfc' | 'icici' | 'axis'>('sbi');
  const [otp, setOtp] = useState('482910');
  const [isLoading, setIsLoading] = useState(false);
  const [syncedData, setSyncedData] = useState<any>(null);

  if (!isOpen) return null;

  const banks = [
    {
      id: 'sbi',
      name: 'State Bank of India',
      code: 'SBIN',
      popular: true,
      color: 'from-blue-600 to-indigo-700',
      desc: 'India’s largest public sector bank with SBI Life direct integration'
    },
    {
      id: 'hdfc',
      name: 'HDFC Bank',
      code: 'HDFC',
      popular: true,
      color: 'from-blue-800 to-sky-600',
      desc: 'Leading private bank with instant salary & mutual fund feeds'
    },
    {
      id: 'icici',
      name: 'ICICI Bank',
      code: 'ICIC',
      popular: false,
      color: 'from-orange-600 to-amber-700',
      desc: 'Privilege Wealth banking & NPS auto-fetch'
    },
    {
      id: 'axis',
      name: 'Axis Bank',
      code: 'UTIB',
      popular: false,
      color: 'from-rose-800 to-pink-700',
      desc: 'Priority banking & Demat portfolio integration'
    }
  ];

  const handleInitiate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bank-sync/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankId: selectedBank, mobileNumber: userMobile })
      });
      const data = await res.json();
      if (data.mockOtp) setOtp(data.mockOtp);
      setStep('otp');
    } catch (err) {
      setStep('otp');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/bank-sync/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bankId: selectedBank, otp })
      });
      const result = await res.json();
      const accountData = result.data || {
        bankName: selectedBank === 'sbi' ? 'State Bank of India' : selectedBank.toUpperCase() + ' Bank',
        accountNumber: '••••••••4892',
        accountType: 'Savings Account',
        branch: 'Chennai Main Branch',
        balance: 482500.75,
        transactions: []
      };

      setSyncedData(accountData);

      const newAccount: BankAccount = {
        id: `bank-${Date.now()}`,
        bankName: accountData.bankName,
        bankCode: selectedBank,
        accountNumber: accountData.accountNumber,
        accountType: accountData.accountType,
        branch: accountData.branch,
        balance: accountData.balance,
        synced: true,
        lastSyncTime: 'Just now',
        logoColor: banks.find(b => b.id === selectedBank)?.color || 'from-blue-600 to-indigo-700'
      };

      onBankSynced(newAccount);
      setStep('success');
    } catch (err) {
      console.error('Verify error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-['Cinzel',serif]">
                RBI Account Aggregator Sync
              </h3>
              <p className="text-[11px] text-stone-400">
                Encrypted consent-based automated bank syncing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {step === 'select' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300">
                <Lock className="w-4 h-4 shrink-0 text-teal-400" />
                <span>256-bit encrypted Sahamati / RBI-authorized protocol. Your bank credentials are never stored.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Select Your Primary Banking Partner
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedBank === bank.id
                          ? 'bg-stone-800/90 border-teal-400 ring-1 ring-teal-400/50'
                          : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-stone-100">{bank.name}</span>
                        {bank.popular && (
                          <span className="text-[9px] bg-teal-400/20 text-teal-300 px-1.5 py-0.5 rounded font-mono">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-2">{bank.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800 text-xs text-stone-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-stone-400" />
                  <span>Linking Phone: <strong className="text-stone-200 font-mono">{userMobile}</strong></span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">Auto-Mapped</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInitiate}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-teal-400 hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      Connecting AA Gateway...
                    </>
                  ) : (
                    <>
                      <span>Initiate OTP Consent</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-2">
                <div className="w-10 h-10 mx-auto rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-stone-100">
                  Enter One-Time Password (OTP)
                </h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  A 6-digit consent authentication code has been sent to your registered mobile <strong className="text-stone-200 font-mono">{userMobile}</strong>.
                </p>
                <div className="text-[11px] text-amber-400 font-mono bg-amber-400/10 inline-block px-2.5 py-1 rounded border border-amber-400/20">
                  Demo Auto-Filled OTP: {otp}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="hover:text-stone-200"
                >
                  ← Change Bank
                </button>
                <button
                  type="button"
                  className="text-teal-400 hover:text-teal-300"
                >
                  Resend OTP in 30s
                </button>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-teal-400 hover:bg-teal-300 transition-colors shadow-lg shadow-teal-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      Authorizing with {selectedBank.toUpperCase()}...
                    </>
                  ) : (
                    <>
                      <span>Authorize & Sync Accounts</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && syncedData && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-stone-100">
                  {syncedData.bankName} Synchronized!
                </h4>
                <p className="text-xs text-stone-400 mt-1">
                  Account balance and automated transaction categorization successfully integrated into your Finbazaar wealth dashboard.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-stone-400">Verified Liquid Balance:</span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    ₹{syncedData.balance.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Account Number:</span>
                  <span className="text-stone-200 font-mono">{syncedData.accountNumber}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Branch:</span>
                  <span className="text-stone-200">{syncedData.branch}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Consent Status:</span>
                  <span className="text-teal-400 font-semibold">Active (Sahamati AA Ref #AA-99824)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-black bg-teal-400 hover:bg-teal-300 transition-colors"
              >
                Back to Wealth Tracker
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
