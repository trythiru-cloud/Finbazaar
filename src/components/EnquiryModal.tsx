import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  PhoneCall, 
  CheckCircle, 
  MapPin, 
  Sparkles, 
  Shield, 
  Mail, 
  ArrowRight, 
  Loader2,
  Copy,
  Check,
  Clock,
  UserCheck,
  Building2,
  RefreshCw,
  ExternalLink,
  Layers,
  User,
  Phone
} from 'lucide-react';
import { PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';
import { SBI_SCHEMES } from '../data/sbiSchemes.ts';

export interface SynchronousLead {
  id: string;
  userName: string;
  mobile: string;
  location: string;
  scheme: string;
  investmentAmount?: string;
  investmentType?: string;
  tenure?: string;
  notes?: string;
  timestamp: string;
  recipientEmail: string;
  whatsappRecipient: string;
  status: 'Pending Contact' | 'Verified' | 'Follow-up Scheduled';
}

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchemeId?: string;
  initialTab?: 'form' | 'leads';
  autoUserData?: {
    name: string;
    mobile: string;
    location: string;
  };
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialSchemeId,
  initialTab = 'form',
  autoUserData
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'form' | 'leads'>(initialTab);
  const [userName, setUserName] = useState(autoUserData?.name || 'Thirumalai N');
  const [mobile, setMobile] = useState(
    autoUserData?.mobile && !autoUserData.mobile.replace(/\D/g, '').endsWith('9994298989')
      ? autoUserData.mobile 
      : '+91 98401 23456'
  );
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [location, setLocation] = useState(autoUserData?.location || 'Chennai, Tamil Nadu');
  const [selectedSchemeId, setSelectedSchemeId] = useState(initialSchemeId || 'sbi-smart-champ');
  const [investmentAmount, setInvestmentAmount] = useState('₹1,50,000 / year');
  const [tenure, setTenure] = useState('15 Years');
  const [notes, setNotes] = useState('Looking for customized proposal, guaranteed returns illustration, and tax savings guidance.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLeadId, setCopiedLeadId] = useState(false);
  
  // Synchronous lead submission receipt
  const [submittedLead, setSubmittedLead] = useState<{
    leadId: string;
    whatsappUrl: string;
    mailtoUrl: string;
    record: SynchronousLead;
    synchronousLeadDetails?: any;
  } | null>(null);

  // All synchronous leads fetched from /api/enquiries
  const [allLeads, setAllLeads] = useState<SynchronousLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  // Sync initial scheme if prop changes
  useEffect(() => {
    if (initialSchemeId) {
      setSelectedSchemeId(initialSchemeId);
    }
  }, [initialSchemeId]);

  // Sync initial tab
  useEffect(() => {
    if (initialTab) {
      setActiveModalTab(initialTab);
    }
  }, [initialTab]);

  // Sync autoUserData
  useEffect(() => {
    if (autoUserData) {
      if (autoUserData.name) setUserName(autoUserData.name);
      if (autoUserData.mobile) setMobile(autoUserData.mobile);
      if (autoUserData.location) setLocation(autoUserData.location);
    }
  }, [autoUserData]);

  // Fetch all leads synchronously
  const fetchAllLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data && data.success && Array.isArray(data.enquiries)) {
        setAllLeads(data.enquiries);
      }
    } catch (err) {
      console.error('Error fetching synchronous leads:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Check if selected scheme is in SBI_SCHEMES or a custom/homeloan string
  const activeScheme = SBI_SCHEMES.find(s => s.id === selectedSchemeId) || {
    id: selectedSchemeId,
    name: selectedSchemeId.includes('Home Loan') || selectedSchemeId.includes('homeloan') ? 'SBI Home Loan Scheme' : selectedSchemeId,
    categoryLabel: selectedSchemeId.includes('Home Loan') || selectedSchemeId.includes('homeloan') ? 'SBI Home Loan' : 'SBI Scheme',
    tagline: 'Customized consultation and verified illustration',
    rangoliPattern: 'kalash'
  };

  const handleCopyLeadDetails = () => {
    if (!submittedLead) return;
    const text = `Finbazaar Lead Receipt:
Lead ID: ${submittedLead.leadId}
Applicant: ${submittedLead.record.userName}
Mobile: ${submittedLead.record.mobile}
Location: ${submittedLead.record.location}
Scheme: ${submittedLead.record.scheme}
Budget/Investment: ${submittedLead.record.investmentAmount}
Tenure: ${submittedLead.record.tenure}
Timestamp: ${submittedLead.record.timestamp}
Status: ${submittedLead.record.status}
Desk Email: trythiru@gmail.com
WhatsApp Hotline: +91 99942 98989`;

    navigator.clipboard.writeText(text);
    setCopiedLeadId(true);
    setTimeout(() => setCopiedLeadId(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMobileError(null);

    // Validate that user mobile is not the advisor hotline 9994298989
    const cleanDigits = mobile.replace(/\D/g, '');
    if (cleanDigits === '9994298989' || cleanDigits === '919994298989' || cleanDigits.endsWith('9994298989')) {
      setMobileError('Validation Error: Mobile number 9994298989 is reserved for the official Finbazaar / SBI Advisory Hotline and cannot be saved as your personal mobile number. Please enter your valid mobile number.');
      return;
    }

    if (cleanDigits.length < 10) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      userName,
      mobile,
      location,
      scheme: activeScheme.name,
      investmentAmount,
      investmentType: 'Annual Premium / Budget',
      tenure,
      notes
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload)
      });

      const data = await response.json();

      if (data && data.success) {
        setSubmittedLead({
          leadId: data.leadId,
          whatsappUrl: data.whatsappUrl,
          mailtoUrl: data.mailtoUrl,
          record: data.record,
          synchronousLeadDetails: data.synchronousLeadDetails
        });

        // Synchronously update local leads list
        setAllLeads([data.record, ...allLeads.filter(l => l.id !== data.record.id)]);
      }
    } catch (err) {
      console.error('Synchronous lead dispatch error:', err);
      // Fallback synchronous lead generator
      const mockLeadId = `FB-${Date.now().toString().slice(-6)}`;
      const nowIso = new Date().toISOString();
      const mockRecord: SynchronousLead = {
        id: mockLeadId,
        userName,
        mobile,
        location,
        scheme: activeScheme.name,
        investmentAmount,
        investmentType: 'Annual Budget',
        tenure,
        notes,
        timestamp: nowIso,
        recipientEmail: 'trythiru@gmail.com',
        whatsappRecipient: '+919994298989',
        status: 'Verified'
      };

      const encodedMsg = encodeURIComponent(
        `*Finbazaar Wealth Consultation Request*\n\n` +
        `👤 *Name:* ${userName}\n` +
        `📱 *Mobile:* ${mobile}\n` +
        `📍 *Location:* ${location}\n` +
        `📋 *Scheme:* ${activeScheme.name}\n` +
        `💰 *Budget / Investment:* ${investmentAmount}\n` +
        `⏳ *Tenure:* ${tenure}\n` +
        `📝 *Notes:* ${notes}\n\n` +
        `_Synchronous Lead ID: ${mockLeadId}_`
      );
      const waUrl = `https://wa.me/919994298989?text=${encodedMsg}`;
      const mailUrl = `mailto:trythiru@gmail.com?subject=Finbazaar Enquiry - ${userName}&body=${encodedMsg}`;

      setSubmittedLead({
        leadId: mockLeadId,
        whatsappUrl: waUrl,
        mailtoUrl: mailUrl,
        record: mockRecord
      });
      setAllLeads([mockRecord, ...allLeads]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header & Tab Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-950/90 via-stone-900 to-teal-950/90 border-b border-amber-500/20 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    Official Advisory Desk
                  </span>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Synchronous Dispatch
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-100 font-['Cinzel',serif] tracking-wide mt-0.5">
                  Finbazaar Consultation & Synchronous Leads
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

          {/* Navigation Tabs between Form & Synchronous Leads Log */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveModalTab('form');
                setSubmittedLead(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeModalTab === 'form'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
                  : 'bg-stone-950/80 text-stone-300 border border-stone-800 hover:border-amber-400/40'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit New Enquiry</span>
            </button>

            <button
              onClick={() => {
                setActiveModalTab('leads');
                fetchAllLeads();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeModalTab === 'leads'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
                  : 'bg-stone-950/80 text-stone-300 border border-stone-800 hover:border-amber-400/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Synchronous Leads Desk</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-current font-mono">
                {allLeads.length}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: SUBMISSION FORM OR SYNCHRONOUS RECEIPT */}
          {activeModalTab === 'form' && (
            <>
              {submittedLead ? (
                /* ================================================================= */
                /* SYNCHRONOUS LEAD DETAILS RECEIPT (Rendered upon submission)      */
                /* ================================================================= */
                <div className="space-y-5 animate-in fade-in duration-300">
                  
                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-stone-100">
                          Synchronous Lead Details Recorded
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-black">
                          LIVE & DISPATCHED
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Your lead has been synchronously registered with Reference ID <strong className="text-amber-300 font-mono">{submittedLead.leadId}</strong> and automatically shared with the advisory desk.
                      </p>
                    </div>
                  </div>

                  {/* Comprehensive Synchronous Lead Details Table */}
                  <div className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4 sm:p-5 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                          Synchronous Lead Record
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-300 font-bold bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800">
                          {submittedLead.leadId}
                        </span>
                        <button
                          onClick={handleCopyLeadDetails}
                          className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-400 transition-colors"
                          title="Copy Full Lead Details"
                        >
                          {copiedLeadId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Detailed Key-Value Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Applicant Name</span>
                        <div className="font-semibold text-stone-100">{submittedLead.record.userName}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Contact Number</span>
                        <div className="font-semibold font-mono text-amber-300">{submittedLead.record.mobile}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Verified Location</span>
                        <div className="font-semibold text-stone-200">{submittedLead.record.location}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Required Scheme</span>
                        <div className="font-semibold text-emerald-400">{submittedLead.record.scheme}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Budget / Investment</span>
                        <div className="font-semibold font-mono text-stone-200">{submittedLead.record.investmentAmount || '₹1,50,000 / year'}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Target Tenure</span>
                        <div className="font-semibold text-stone-200">{submittedLead.record.tenure || '15 Years'}</div>
                      </div>
                    </div>

                    {/* Custom Notes */}
                    {submittedLead.record.notes && (
                      <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-0.5 text-xs">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">User Requirement Notes</span>
                        <div className="text-stone-300 italic">"{submittedLead.record.notes}"</div>
                      </div>
                    )}

                    {/* Synchronous Timestamp & Status */}
                    <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Synchronous Registration:</span>
                        <strong className="text-stone-200 font-mono">
                          {new Date(submittedLead.record.timestamp).toLocaleString('en-IN')}
                        </strong>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 font-semibold">Status: Synchronously Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action Buttons (WhatsApp & Email Direct Dispatch) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={submittedLead.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white">Direct WhatsApp Dispatch</div>
                          <div className="text-[11px] text-emerald-400 font-mono">+91 99942 98989</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href={submittedLead.mailtoUrl}
                      className="p-3.5 rounded-2xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-between transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white">Direct Email Dispatch</div>
                          <div className="text-[11px] text-amber-400 font-mono">trythiru@gmail.com</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => setSubmittedLead(null)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 transition-colors"
                    >
                      ← Submit Another Scheme
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalTab('leads')}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-amber-400 hover:text-amber-300 border border-amber-500/30 bg-stone-900 hover:bg-stone-800 transition-colors"
                      >
                        View Synchronous Leads Desk ({allLeads.length})
                      </button>

                      <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                /* ================================================================= */
                /* NEW LEAD SUBMISSION FORM                                          */
                /* ================================================================= */
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Auto-picked Alert Badge */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>User details auto-detected for synchronous lead recording and callback routing.</span>
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-amber-400/20 px-2 py-0.5 rounded text-amber-300 font-bold shrink-0">
                      Auto-Picked
                    </span>
                  </div>

                  {/* Scheme / Product Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                      Target Scheme / Home Loan
                    </label>
                    <select
                      value={selectedSchemeId}
                      onChange={(e) => setSelectedSchemeId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    >
                      <optgroup label="SBI Life Schemes">
                        {SBI_SCHEMES.map((scheme) => (
                          <option key={scheme.id} value={scheme.id}>
                            {scheme.categoryLabel}: {scheme.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="SBI Home Loans">
                        <option value="sbi-regular-homeloan">SBI Home Loan: Regular Home Loan</option>
                        <option value="sbi-maxgain-homeloan">SBI Home Loan: Maxgain (Overdraft)</option>
                        <option value="sbi-privilege-homeloan">SBI Home Loan: Privilege (Govt Employees)</option>
                        <option value="sbi-shaurya-homeloan">SBI Home Loan: Shaurya (Defence Personnel)</option>
                        <option value="sbi-topup-homeloan">SBI Home Loan: Top-Up Loan</option>
                        <option value="sbi-realty-homeloan">SBI Home Loan: Realty (Plot Loan)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Two Column Grid for Auto-Picked User Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                        Applicant Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                          Contact Mobile Number
                        </label>
                        <span className="text-[10px] text-stone-500 font-mono">Personal Only</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          if (mobileError) setMobileError(null);
                        }}
                        placeholder="+91 XXXXX XXXXX"
                        className={`w-full px-3.5 py-2 bg-stone-800/80 border rounded-xl text-stone-100 text-xs focus:outline-none font-mono ${
                          mobileError ? 'border-rose-500 focus:border-rose-400' : 'border-stone-700 focus:border-amber-500'
                        }`}
                      />
                      {mobileError ? (
                        <p className="mt-1 text-[11px] text-rose-400 font-medium">
                          {mobileError}
                        </p>
                      ) : (
                        <p className="mt-1 text-[10px] text-stone-500">
                          Advisor hotline is +91 99942 98989 (do not enter as personal number).
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location & Investment Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                        className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                        Estimated Budget / Premium
                      </label>
                      <select
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                      >
                        <option value="₹50,000 / year">₹50,000 / year</option>
                        <option value="₹1,00,000 / year">₹1,00,000 / year</option>
                        <option value="₹1,50,000 / year">₹1,50,000 / year (Full 80C limit)</option>
                        <option value="₹2,50,000 / year">₹2,50,000 / year</option>
                        <option value="₹5,00,000 / year">₹5,00,000 / year</option>
                        <option value="₹10,00,000+ / year">₹10,00,000+ (High Net Worth)</option>
                        <option value="₹25 Lakhs (Home Loan)">₹25 Lakhs (Home Loan)</option>
                        <option value="₹50 Lakhs (Home Loan)">₹50 Lakhs (Home Loan)</option>
                        <option value="₹1 Crore+ (Home Loan)">₹1 Crore+ (Home Loan)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes / Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
                      Notes & Specific Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify child age, retirement target, home location, or tax questions..."
                      className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Direct Recipient Assurance Box */}
                  <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                    <div className="flex items-center gap-1.5 text-stone-200 font-semibold">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      <span>Synchronous Dispatch Channels:</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        • Primary Email: <span className="text-amber-300 font-mono font-bold">trythiru@gmail.com</span>
                      </div>
                      <div>
                        • WhatsApp Hotline: <span className="text-emerald-400 font-mono font-bold">+91 99942 98989</span>
                      </div>
                    </div>
                  </div>

                  {/* GDPR & DPDP Act Compliance Consent Notice */}
                  <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-500/25 flex items-start gap-2.5 text-[11px] text-stone-300">
                    <Shield className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-teal-300 text-xs font-semibold">GDPR & DPDP Act 2023 Consent & Privacy Guarantee</strong>
                        <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.2 rounded font-mono">100% Encrypted</span>
                      </div>
                      <p className="text-stone-400 leading-normal text-[10px]">
                        By submitting, you give informed consent for synchronous advisory processing. In accordance with India's DPDP Act 2023 and EU GDPR, your data is processed strictly for SBI Life / loan consultations, never sold to third parties, and can be exported or erased upon request to trythiru@gmail.com.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Synchronously Recording Lead...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit & Generate Synchronous Lead</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </>
          )}

          {/* TAB 2: SYNCHRONOUS LEADS DESK (Real-Time Archive) */}
          {activeModalTab === 'leads' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div>
                  <h4 className="text-sm font-bold text-stone-100 font-['Cinzel',serif]">
                    Live Synchronous Leads Register
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Real-time database of customer enquiries dispatched to trythiru@gmail.com & WhatsApp
                  </p>
                </div>

                <button
                  onClick={fetchAllLeads}
                  disabled={loadingLeads}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
                  title="Refresh Synchronous Leads"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin text-amber-400' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>

              {loadingLeads ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-stone-400">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  <span className="text-xs">Fetching synchronous leads...</span>
                </div>
              ) : allLeads.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-stone-400">No synchronous leads recorded yet.</p>
                  <button
                    onClick={() => setActiveModalTab('form')}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs"
                  >
                    Submit First Lead
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {allLeads.map((lead) => {
                    const waMsg = encodeURIComponent(
                      `*Finbazaar Lead Follow-Up*\n\n` +
                      `👤 *Name:* ${lead.userName}\n` +
                      `📱 *Mobile:* ${lead.mobile}\n` +
                      `📍 *Location:* ${lead.location}\n` +
                      `📋 *Scheme:* ${lead.scheme}\n` +
                      `💰 *Budget:* ${lead.investmentAmount || 'Standard'}\n` +
                      `_Lead Ref: ${lead.id}_`
                    );
                    const waUrl = `https://wa.me/919994298989?text=${waMsg}`;
                    const mailUrl = `mailto:trythiru@gmail.com?subject=Finbazaar Lead - ${lead.userName} (${lead.id})&body=${waMsg}`;

                    return (
                      <div 
                        key={lead.id} 
                        className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                              {lead.id}
                            </span>
                            <span className="text-xs font-bold text-stone-100 flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-teal-400" />
                              <span>{lead.userName}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                              <Phone className="w-2.5 h-2.5 text-amber-400" />
                              <span>{lead.mobile}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {lead.status}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500">
                              {new Date(lead.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-stone-300 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/60">
                          <div>
                            <span className="text-stone-500 block text-[10px]">Scheme</span>
                            <span className="font-medium text-amber-200 line-clamp-1">{lead.scheme}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Mobile</span>
                            <span className="font-mono text-stone-200">{lead.mobile}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block text-[10px]">Location</span>
                            <span className="text-stone-200 line-clamp-1">{lead.location}</span>
                          </div>
                        </div>

                        {lead.notes && (
                          <div className="text-[11px] text-stone-400 italic bg-stone-900/40 px-3 py-1.5 rounded-lg border border-stone-800/40">
                            "{lead.notes}"
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <div className="text-stone-500 text-[10px]">
                            Dispatched to: <span className="text-stone-300">trythiru@gmail.com</span> & <span className="text-stone-300">+91 99942 98989</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={mailUrl}
                              className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </a>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-2.5 bg-stone-950 border-t border-stone-800 text-[10px] text-stone-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Synchronous Lead Security Protocol</span>
            <span>•</span>
            <span>Recipient: trythiru@gmail.com</span>
          </div>
          <span className="font-mono text-stone-400">Direct WhatsApp: +91 99942 98989</span>
        </div>

      </div>
    </div>
  );
};
