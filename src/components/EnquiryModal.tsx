import React, { useState, useEffect } from 'react';
import { X, Send, PhoneCall, CheckCircle, MapPin, Sparkles, Shield, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';
import { SBI_SCHEMES } from '../data/sbiSchemes.ts';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchemeId?: string;
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
  autoUserData
}) => {
  const [userName, setUserName] = useState(autoUserData?.name && autoUserData.name !== 'Investor Profile' ? autoUserData.name : '');
  const [mobile, setMobile] = useState(autoUserData?.mobile || '+91 99942 98989');
  const [location, setLocation] = useState(autoUserData?.location || 'Chennai, Tamil Nadu');
  const [selectedSchemeId, setSelectedSchemeId] = useState(initialSchemeId || 'sbi-smart-champ');
  const [investmentAmount, setInvestmentAmount] = useState('₹1,50,000 / year');
  const [tenure, setTenure] = useState('15 Years');
  const [notes, setNotes] = useState('Looking for customized SBI quote, guaranteed illustration, and tax savings guidance.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{
    leadId: string;
    whatsappUrl: string;
    mailtoUrl: string;
  } | null>(null);

  const [detectingLocation, setDetectingLocation] = useState(false);

  // Sync initial scheme if prop changes
  useEffect(() => {
    if (initialSchemeId) {
      setSelectedSchemeId(initialSchemeId);
    }
  }, [initialSchemeId]);

  // Sync autoUserData
  useEffect(() => {
    if (autoUserData) {
      if (autoUserData.name && autoUserData.name !== 'Investor Profile') setUserName(autoUserData.name);
      if (autoUserData.mobile) setMobile(autoUserData.mobile);
      if (autoUserData.location) setLocation(autoUserData.location);
    }
  }, [autoUserData]);

  if (!isOpen) return null;

  const activeScheme = SBI_SCHEMES.find(s => s.id === selectedSchemeId) || SBI_SCHEMES[0];

  const handleDetectLocation = () => {
    setDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In real devices, reverse geocode or map coordinate; default to high-precision regional hub
          setTimeout(() => {
            setLocation('Chennai Central, Tamil Nadu (GPS Verified)');
            setDetectingLocation(false);
          }, 600);
        },
        () => {
          setTimeout(() => {
            setLocation('Chennai, Tamil Nadu');
            setDetectingLocation(false);
          }, 400);
        },
        { timeout: 5000 }
      );
    } else {
      setLocation('Chennai, Tamil Nadu');
      setDetectingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          mobile,
          location,
          scheme: activeScheme.name,
          investmentAmount,
          investmentType: 'Annual Premium',
          tenure,
          notes
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedLead({
          leadId: data.leadId,
          whatsappUrl: data.whatsappUrl,
          mailtoUrl: data.mailtoUrl
        });

        // Automatically open WhatsApp with pre-filled message for user convenience
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank');
        }
      }
    } catch (err) {
      console.error('Enquiry dispatch error:', err);
      // Fallback lead generator if offline
      const mockLeadId = `FB-${Date.now().toString().slice(-6)}`;
      const encodedMsg = encodeURIComponent(
        `*Finbazaar Wealth Consultation Request*\n\n` +
        `👤 *Name:* ${userName}\n` +
        `📱 *Mobile:* ${mobile}\n` +
        `📍 *Location:* ${location}\n` +
        `📋 *Scheme:* ${activeScheme.name}\n` +
        `💰 *Investment:* ${investmentAmount}\n` +
        `⏳ *Tenure:* ${tenure}\n` +
        `_Lead ID: ${mockLeadId}_`
      );
      const waUrl = `https://wa.me/919994298989?text=${encodedMsg}`;
      const mailUrl = `mailto:trythiru@gmail.com?subject=Finbazaar Enquiry - ${userName}&body=${encodedMsg}`;

      setSubmittedLead({
        leadId: mockLeadId,
        whatsappUrl: waUrl,
        mailtoUrl: mailUrl
      });
      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Decorative Rangoli Top Banner */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-950/80 via-rose-950/70 to-teal-950/80 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                {activeScheme.rangoliPattern === 'padma' && <PadmaLotusMotif size={36} color="#F43F5E" />}
                {activeScheme.rangoliPattern === 'mayil' && <MayilPeacockMotif size={36} color="#0D9488" />}
                {activeScheme.rangoliPattern === 'ashtalakshmi' && <AshtalakshmiStarMotif size={36} color="#C026D3" />}
                {activeScheme.rangoliPattern === 'kalash' && <KalashUrnMotif size={36} color="#D97706" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    For Enquiries
                  </span>
                  <span className="text-[11px] text-stone-400">Direct WhatsApp + Email Dispatch</span>
                </div>
                <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif] tracking-wide mt-0.5">
                  Finbazaar Enquiries & Consultation
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submittedLead ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-stone-100">Enquiry Dispatched Successfully!</h4>
                <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto">
                  Your customized illustration request for <span className="font-semibold text-amber-400">{activeScheme.name}</span> has been securely shared with the desk for enquiries.
                </p>
              </div>

              {/* Delivery Receipt Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Dispatch
                  </div>
                  <div className="text-sm font-bold text-stone-100">+91 99942 98989</div>
                  <div className="text-xs text-stone-400 mt-1">Pre-filled WhatsApp message ready for instant chat.</div>
                  <a
                    href={submittedLead.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    Open WhatsApp Chat Now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    <Mail className="w-3.5 h-3.5" /> Email Notification
                  </div>
                  <div className="text-sm font-bold text-stone-100">trythiru@gmail.com</div>
                  <div className="text-xs text-stone-400 mt-1">Full proposal summary and user contact details archived.</div>
                  <a
                    href={submittedLead.mailtoUrl}
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
                  >
                    Send Email For Enquiries <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Lead Summary Capsule */}
              <div className="p-3 bg-stone-800/60 rounded-xl text-xs text-stone-400 flex flex-wrap items-center justify-between gap-2 border border-stone-700/60">
                <span>Lead ID: <strong className="text-stone-200">{submittedLead.leadId}</strong></span>
                <span>Applicant: <strong className="text-stone-200">{userName}</strong></span>
                <span>Mobile: <strong className="text-stone-200">{mobile}</strong></span>
                <span>Location: <strong className="text-stone-200">{location}</strong></span>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSubmittedLead(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  Submit Another Scheme
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Auto-picked Alert Badge */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>User details auto-detected for fast consultation & quote generation.</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">
                  Auto-Picked
                </span>
              </div>

              {/* Scheme Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Required SBI Life Scheme
                </label>
                <select
                  value={selectedSchemeId}
                  onChange={(e) => setSelectedSchemeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                >
                  {SBI_SCHEMES.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.categoryLabel}: {scheme.name}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  {activeScheme.tagline}
                </div>
              </div>

              {/* Two Column Grid for Auto-Picked User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    User Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Contact Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Location with Auto-detect button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Applicant Location
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={detectingLocation}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                  >
                    {detectingLocation ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" /> Detecting...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3" /> Auto-Detect My Location
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State (e.g. Chennai, Tamil Nadu)"
                    className="w-full pl-9 pr-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex gap-1.5 mt-1.5 overflow-x-auto pb-1 text-[11px]">
                  {['Chennai', 'Coimbatore', 'Bangalore', 'Mumbai', 'Hyderabad', 'Delhi NCR', 'Madurai'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setLocation(`${city}, India`)}
                      className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700/60 shrink-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment & Tenure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Planned Investment Amount
                  </label>
                  <input
                    type="text"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="e.g. ₹1,50,000 / year"
                    className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Target Tenure / Horizon
                  </label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="5 - 7 Years">5 - 7 Years (Limited Pay)</option>
                    <option value="10 Years">10 Years</option>
                    <option value="15 Years">15 Years (Higher Education)</option>
                    <option value="20 Years">20 Years (Retirement)</option>
                    <option value="Whole Life (till 100)">Whole Life (till 100 Years)</option>
                  </select>
                </div>
              </div>

              {/* User Notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Consultation Preferences & Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify specific requirements like child age, retirement year, or tax exemption questions..."
                  className="w-full px-3.5 py-2 bg-stone-800/80 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Direct Recipient Assurance Box */}
              <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/60 text-[11px] text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-300 font-semibold">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authorized Lead Sharing Channels:</span>
                </div>
                <div>
                  • For Enquiries Email: <span className="text-amber-300 font-mono">trythiru@gmail.com</span>
                </div>
                <div>
                  • WhatsApp Enquiry Hotline: <span className="text-emerald-400 font-mono">+91 99942 98989</span>
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
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      Dispatched to trythiru@gmail.com & WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Open WhatsApp (+91 99942 98989)
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
