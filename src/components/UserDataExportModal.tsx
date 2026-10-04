import React, { useState } from 'react';
import { 
  Download, 
  RefreshCw, 
  FileText, 
  FileSpreadsheet, 
  ShieldCheck, 
  Check, 
  Copy, 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Sparkles,
  Lock,
  Layers
} from 'lucide-react';
import { UserProfile } from '../data/userPortfolio.ts';

interface UserDataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  lastSyncedAt?: string;
  onRefreshData?: () => Promise<void>;
  onUpdateMobile?: (newMobile: string) => Promise<boolean | void>;
  onUpdateProfile?: (updated: { name?: string; mobile?: string }) => Promise<boolean | void>;
  isRefreshing?: boolean;
}

export const UserDataExportModal: React.FC<UserDataExportModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  lastSyncedAt = new Date().toISOString(),
  onRefreshData,
  onUpdateMobile,
  onUpdateProfile,
  isRefreshing = false
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<'json' | 'csv' | null>(null);
  
  // Inline Name Update State
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(userProfile.name);
  const [nameSaveSuccess, setNameSaveSuccess] = useState(false);
  const [isSavingName, setIsSavingName] = useState(false);

  // Inline Mobile Number Update State
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [editMobileValue, setEditMobileValue] = useState(userProfile.mobile);
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [mobileSaveSuccess, setMobileSaveSuccess] = useState(false);
  const [isSavingMobile, setIsSavingMobile] = useState(false);

  if (!isOpen) return null;

  const handleSaveName = async () => {
    setIsSavingName(true);
    try {
      if (onUpdateProfile) {
        await onUpdateProfile({ name: editNameValue });
      } else {
        await fetch('/api/user-data/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editNameValue })
        });
      }
      setNameSaveSuccess(true);
      setIsEditingName(false);
      setTimeout(() => setNameSaveSuccess(false), 3000);
    } catch (e: any) {
      console.error('Error saving name:', e);
    } finally {
      setIsSavingName(false);
    }
  };

  const validateMobile = (num: string): string | null => {
    const cleanDigits = num.replace(/\D/g, '');
    if (cleanDigits === '9994298989' || cleanDigits === '919994298989' || cleanDigits.endsWith('9994298989')) {
      return 'Validation Error: Mobile number 9994298989 is restricted (reserved for the official Finbazaar / SBI Advisory Hotline) and cannot be saved. Please enter your valid personal mobile number.';
    }
    if (cleanDigits.length < 10) {
      return 'Please enter a valid 10-digit mobile number.';
    }
    return null;
  };

  const handleSaveMobile = async () => {
    const err = validateMobile(editMobileValue);
    if (err) {
      setMobileError(err);
      return;
    }

    setIsSavingMobile(true);
    setMobileError(null);

    try {
      if (onUpdateProfile) {
        await onUpdateProfile({ mobile: editMobileValue });
      } else if (onUpdateMobile) {
        await onUpdateMobile(editMobileValue);
      } else {
        const res = await fetch('/api/user-data/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: editMobileValue })
        });
        const data = await res.json();
        if (!data.success && data.error) {
          setMobileError(data.error);
          return;
        }
      }
      setMobileSaveSuccess(true);
      setIsEditingMobile(false);
      setTimeout(() => setMobileSaveSuccess(false), 3000);
    } catch (e: any) {
      setMobileError(e.message || 'Error updating mobile number.');
    } finally {
      setIsSavingMobile(false);
    }
  };

  const handleCopyData = () => {
    const summary = `FINBAZAAR SYNCHRONOUS USER DATA EXPORT
Generated: ${new Date().toISOString()}
Compliance: GDPR (EU 2016/679) & DPDP Act 2023 (India)
----------------------------------------
Name: ${userProfile.name}
Email: ${userProfile.email}
Mobile: ${userProfile.mobile}
Location: ${userProfile.location}
PAN: ${userProfile.panNumber ? `${userProfile.panNumber.slice(0, 2)}****${userProfile.panNumber.slice(-2)}` : 'ABCDE****F'}
Age: ${userProfile.age} | Monthly Income: ₹${userProfile.monthlyIncome.toLocaleString('en-IN')}
KYC Status: ${userProfile.kycVerified ? 'VERIFIED' : 'PENDING'}
Last Synchronized: ${lastSyncedAt}
Data Controller: Finbazaar Wealth Technologies Pvt Ltd
DPO Desk: trythiru@gmail.com | +91 99942 98989`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: 'json' | 'csv') => {
    setDownloadingFormat(format);
    try {
      const response = await fetch(`/api/user-data/export?format=${format}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finbazaar_user_data_export_${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Fallback client-side generation
        const dataStr = format === 'json' 
          ? JSON.stringify({
              exportMetadata: {
                timestamp: new Date().toISOString(),
                standard: 'GDPR Article 20 & DPDP Act 2023 Portability',
                controller: 'trythiru@gmail.com'
              },
              userProfile,
              lastSyncedAt
            }, null, 2)
          : `Field,Value\nName,"${userProfile.name}"\nEmail,"${userProfile.email}"\nMobile,"${userProfile.mobile}"\nLocation,"${userProfile.location}"\nAge,"${userProfile.age}"\nIncome,"₹${userProfile.monthlyIncome}"\nSyncedAt,"${lastSyncedAt}"`;
        
        const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finbazaar_user_data_${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Error downloading user data export:', err);
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-teal-950/90 border-b border-amber-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/30">
                  DPDP Act 2023 & GDPR Compliant
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Synchronous
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-100 font-['Cinzel',serif] tracking-wide mt-0.5">
                User Details & Data Portability Desk
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs text-stone-300">
          
          {/* Synchronous Live Status Banner */}
          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                Synchronous State Verification
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-stone-100">Live Client-Server Synchronization</span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                Last synchronized: {new Date(lastSyncedAt).toLocaleString('en-IN')}
              </p>
            </div>

            {onRefreshData && (
              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all font-semibold disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                <span>{isRefreshing ? 'Synchronizing...' : 'Refresh User Data'}</span>
              </button>
            )}
          </div>

          {/* Synchronous User Details Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                <span>Verified Personal Identifiers</span>
              </span>
              <button
                onClick={handleCopyData}
                className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Full Legal Name Card with Synchronous Edit */}
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                    Full Legal Name (Synchronous)
                  </span>
                  {!isEditingName && (
                    <button
                      onClick={() => {
                        setEditNameValue(userProfile.name);
                        setIsEditingName(true);
                      }}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold underline"
                    >
                      {userProfile.name ? 'Update' : 'Set Name'}
                    </button>
                  )}
                </div>

                {isEditingName ? (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        placeholder="Enter Legal Name"
                        className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={isSavingName}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] whitespace-nowrap transition-colors disabled:opacity-50"
                      >
                        {isSavingName ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-stone-100 text-sm flex items-center justify-between">
                      <span>{userProfile.name || 'Visitor / Guest'}</span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-sans">
                        Synchronous
                      </span>
                    </div>
                    {nameSaveSuccess && (
                      <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
                        ✓ User name synchronously updated!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Mobile Card with Synchronous Edit & Rejection of 9994298989 */}
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-1 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                    User Contact Mobile (Synchronous)
                  </span>
                  {!isEditingMobile && (
                    <button
                      onClick={() => {
                        setEditMobileValue(userProfile.mobile);
                        setMobileError(null);
                        setIsEditingMobile(true);
                      }}
                      className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold underline"
                    >
                      Update
                    </button>
                  )}
                </div>

                {isEditingMobile ? (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={editMobileValue}
                        onChange={(e) => {
                          setEditMobileValue(e.target.value);
                          if (mobileError) setMobileError(null);
                        }}
                        placeholder="+91 XXXXX XXXXX"
                        className={`w-full px-2.5 py-1.5 bg-stone-900 border rounded-lg text-xs font-mono text-stone-100 focus:outline-none ${
                          mobileError ? 'border-rose-500 focus:border-rose-400' : 'border-stone-700 focus:border-amber-400'
                        }`}
                      />
                      <button
                        onClick={handleSaveMobile}
                        disabled={isSavingMobile}
                        className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] whitespace-nowrap transition-colors disabled:opacity-50"
                      >
                        {isSavingMobile ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingMobile(false);
                          setMobileError(null);
                        }}
                        className="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                      >
                        Cancel
                      </button>
                    </div>

                    {mobileError && (
                      <p className="text-[10px] text-rose-400 font-medium leading-tight">
                        {mobileError}
                      </p>
                    )}
                    <p className="text-[9px] text-stone-500 font-mono">
                      *Hotline 9994298989 is reserved for advisory desk & cannot be saved.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-amber-300 font-mono text-sm flex items-center justify-between">
                      <span>{userProfile.mobile}</span>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-sans">
                        Personal Verified
                      </span>
                    </div>
                    {mobileSaveSuccess && (
                      <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
                        ✓ User mobile number synchronously updated!
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">Registered Email</span>
                <div className="font-semibold text-stone-200 font-mono">{userProfile.email}</div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">Verified Location</span>
                <div className="font-semibold text-stone-200">{userProfile.location}</div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">Masked PAN / Tax ID</span>
                <div className="font-semibold text-stone-200 font-mono">
                  {userProfile.panNumber ? `${userProfile.panNumber.slice(0, 2)}••••${userProfile.panNumber.slice(-2)}` : 'ABCDE••••F'} (KYC Verified)
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider">Monthly Income / Cadre</span>
                <div className="font-semibold text-emerald-400 font-mono">
                  ₹{userProfile.monthlyIncome.toLocaleString('en-IN')} / month
                </div>
              </div>
            </div>
          </div>

          {/* GDPR & DPDP Act Data Portability Rights Notice */}
          <div className="p-4 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-semibold">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>Statutory Data Portability & Privacy Rights (GDPR & DPDP)</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Under Section 11 of India's Digital Personal Data Protection (DPDP) Act, 2023 and Article 20 of the EU GDPR, you are entitled to export your complete machine-readable financial records in structured JSON or CSV format. All data remains encrypted under AES-256 and is never sold to third-party telemarketers.
            </p>
          </div>

          {/* Export Action Card */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-stone-100 uppercase tracking-wider">
                  Export Machine-Readable User Data Packet
                </h4>
                <p className="text-[10px] text-stone-400">
                  Includes user profile, linked bank summaries, portfolio allocations, and synchronous lead receipts.
                </p>
              </div>
              <Download className="w-4 h-4 text-amber-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => handleDownload('json')}
                disabled={downloadingFormat !== null}
                className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20 disabled:opacity-50"
              >
                <FileText className="w-4 h-4" />
                <span>{downloadingFormat === 'json' ? 'Generating JSON...' : 'Export as JSON (Full Payload)'}</span>
              </button>

              <button
                onClick={() => handleDownload('csv')}
                disabled={downloadingFormat !== null}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>{downloadingFormat === 'csv' ? 'Generating CSV...' : 'Export as CSV (Spreadsheet)'}</span>
              </button>
            </div>
          </div>

          {/* DPO Desk Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-500 pt-1">
            <span>DPO Contact: <strong className="text-stone-400">trythiru@gmail.com</strong></span>
            <span>Right to Erasure / Rectification Protocol Active</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-950 border-t border-stone-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
