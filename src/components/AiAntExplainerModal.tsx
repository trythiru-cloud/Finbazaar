import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  HelpCircle,
  ArrowRight,
  BookOpen,
  Wheat,
  Feather,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { SBI_SCHEMES, SbiScheme } from '../data/sbiSchemes.ts';

interface AiAntExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchemeId?: string;
  onSelectSchemeForEnquiry?: (scheme: SbiScheme) => void;
}

export const AiAntExplainerModal: React.FC<AiAntExplainerModalProps> = ({
  isOpen,
  onClose,
  initialSchemeId,
  onSelectSchemeForEnquiry
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialSchemeId || 'sbi-smart-champ');
  const [userQuery, setUserQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [explanationData, setExplanationData] = useState<any>(null);

  // Sync initialSchemeId when modal opens
  useEffect(() => {
    if (initialSchemeId) {
      setSelectedSchemeId(initialSchemeId);
    }
  }, [initialSchemeId, isOpen]);

  // Fetch explanation from /api/ai-ant-explain
  const fetchExplanation = async (schemeId: string, customQuestion?: string) => {
    setLoading(true);
    // Stop speech if currently speaking
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      const activeScheme = SBI_SCHEMES.find(s => s.id === schemeId);
      const res = await fetch('/api/ai-ant-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId,
          category: activeScheme?.category || 'general',
          userQuestion: customQuestion || ''
        })
      });
      const data = await res.json();
      if (data && data.success) {
        setExplanationData(data);
      }
    } catch (err) {
      console.error('Failed to fetch AI Ant explanation:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchExplanation(selectedSchemeId);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  }, [isOpen, selectedSchemeId]);

  // Text to speech narration
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!explanationData) return;

    const speechText = `${explanationData.natureParable}. Now regarding the scheme: ${explanationData.schemeWisdom}. Colony lesson: ${explanationData.colonyLesson}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.05; // Slightly cheerful, friendly ant tone

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleAskCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    fetchExplanation(selectedSchemeId, userQuery);
    setUserQuery('');
  };

  const handleQuickQuestionClick = (q: string) => {
    fetchExplanation(selectedSchemeId, q);
  };

  if (!isOpen) return null;

  const currentScheme = SBI_SCHEMES.find(s => s.id === selectedSchemeId) || SBI_SCHEMES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-amber-950/80 via-stone-900 to-teal-950/80 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Cute Mini Ant Icon */}
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-inner">
                <span className="text-xl">🐜</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950 animate-ping" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-amber-300 font-['Cinzel',serif] text-base tracking-wide flex items-center gap-1.5">
                  Chintu the AI Ant
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-amber-400 text-black">
                    Colony Actuary
                  </span>
                </h3>
              </div>
              <p className="text-[11px] text-stone-400">
                Nature's savings parables & SBI Life scheme insights in simple language
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice Narration Toggle */}
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                isSpeaking 
                  ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20 animate-pulse font-bold'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-400/50 hover:text-amber-300'
              }`}
              title={isSpeaking ? 'Stop Ant Voice' : 'Listen to Chintu speak'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-black" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute Chintu' : 'Listen to Voice'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Close Guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* 1. Scheme Switcher Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Any SBI Scheme for Chintu to Explain:</span>
              </label>
              <span className="text-[11px] text-amber-400 font-mono">
                {SBI_SCHEMES.length} Schemes Available
              </span>
            </div>

            {/* Scheme Selector Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {SBI_SCHEMES.map((scheme) => {
                const isSelected = scheme.id === selectedSchemeId;
                return (
                  <button
                    key={scheme.id}
                    onClick={() => setSelectedSchemeId(scheme.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/20 font-bold'
                        : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-amber-400/40 hover:bg-stone-800'
                    }`}
                  >
                    <span>
                      {scheme.category === 'child' && '🐣'}
                      {scheme.category === 'pension' && '🍯'}
                      {scheme.category === 'women' && '🌸'}
                      {scheme.category === 'employer-employee' && '🏛️'}
                      {scheme.category === 'traditional' && '🌾'}
                    </span>
                    <span>{scheme.name.replace('SBI Life - ', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Interactive AI Ant Presentation Card */}
          <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 p-4 sm:p-6 shadow-xl relative overflow-hidden">
            
            {/* Background ambient mesh */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Ant Character & Speech Intro */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 pb-5 border-b border-stone-800/80">
              
              {/* Detailed Animated SVG Mascot: Chintu the AI Ant */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-900/40 to-stone-900 border-2 border-amber-400/60 p-2 shadow-xl flex items-center justify-center relative overflow-hidden">
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Glowing Aura */}
                    <circle cx="60" cy="60" r="48" fill="#F59E0B" opacity="0.15" className="animate-pulse" />
                    
                    {/* Ant Abdomen */}
                    <ellipse cx="32" cy="72" rx="18" ry="12" fill="#78350F" stroke="#92400E" strokeWidth="2" />
                    <ellipse cx="32" cy="72" rx="14" ry="9" fill="#92400E" />
                    
                    {/* Ant Thorax with Vest */}
                    <ellipse cx="56" cy="65" rx="12" ry="9" fill="#B45309" stroke="#D97706" strokeWidth="2" />
                    {/* Cute Green Leaf Vest */}
                    <path d="M 48 58 Q 56 55 64 58 L 62 72 Q 56 74 50 72 Z" fill="#059669" stroke="#10B981" strokeWidth="1" />
                    
                    {/* Marching Legs */}
                    <path d="M 46 72 L 38 88 L 30 92" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 54 74 L 52 89 L 46 95" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 64 72 L 68 88 L 76 93" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Ant Head */}
                    <ellipse cx="80" cy="54" rx="14" ry="11" fill="#D97706" stroke="#F59E0B" strokeWidth="2" />
                    
                    {/* Friendly Smile */}
                    <path d="M 82 58 Q 86 63 90 58" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    
                    {/* Gold Rimmed Glasses */}
                    <circle cx="78" cy="52" r="5" stroke="#FEF08A" strokeWidth="1.5" fill="#FEF08A" fillOpacity="0.2" />
                    <circle cx="88" cy="51" r="5" stroke="#FEF08A" strokeWidth="1.5" fill="#FEF08A" fillOpacity="0.2" />
                    <line x1="83" y1="51.5" x2="84" y2="51.5" stroke="#FEF08A" strokeWidth="1.5" />
                    
                    {/* Intelligent Eyes */}
                    <circle cx="78" cy="52" r="2.2" fill="#000" />
                    <circle cx="77.2" cy="51.2" r="0.8" fill="#FFF" />
                    <circle cx="88" cy="51" r="2.2" fill="#000" />
                    <circle cx="87.2" cy="50.2" r="0.8" fill="#FFF" />
                    
                    {/* Wiggling Antennae */}
                    <path d="M 85 43 Q 95 32 104 28" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="104" cy="28" r="3" fill="#FEF08A" className="animate-ping" />
                    <circle cx="104" cy="28" r="2" fill="#FEF08A" />
                    
                    <path d="M 78 43 Q 82 30 88 22" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="88" cy="22" r="2" fill="#FEF08A" />
                    
                    {/* Golden Rupee Grain Held Overhead */}
                    <g transform="translate(68, 26)">
                      <ellipse cx="0" cy="0" rx="12" ry="7" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
                      <line x1="-8" y1="0" x2="8" y2="0" stroke="#B45309" strokeWidth="1" />
                      <text x="0" y="2.5" textAnchor="middle" fill="#92400E" fontSize="6" fontWeight="bold">₹</text>
                    </g>
                    
                    {/* Holding Arms */}
                    <path d="M 64 62 L 68 40 L 66 33" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="block text-center text-[10px] font-mono text-amber-300 font-bold mt-1">
                  Chintu AI
                </span>
              </div>

              {/* Speech Bubble */}
              <div className="flex-1 space-y-2">
                <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 relative">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-amber-300 text-sm">
                      {explanationData?.schemeTitle || currentScheme.name}
                    </span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed font-sans italic">
                    "{explanationData?.antPersona?.quote || 'A single grain carried today keeps the whole subterranean granary full during the monsoon!'}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                    Category: <strong className="text-stone-200">{currentScheme.categoryLabel}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-400">
                    Guaranteed Return: <strong className="text-emerald-400">{currentScheme.guarantees.slice(0, 32)}...</strong>
                  </span>
                </div>
              </div>

            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-amber-300 animate-pulse">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs font-mono">Chintu is consulting the subterranean colony archives...</span>
              </div>
            )}

            {/* 3. Detailed Ant Wisdom Breakdown */}
            {!loading && explanationData && (
              <div className="space-y-4 animate-in fade-in duration-300">
                
                {/* Parable Card (Nature Wisdom) */}
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Wheat className="w-4 h-4 text-amber-400" />
                    <span>The Nature's Savings Parable</span>
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {explanationData.natureParable}
                  </p>
                </div>

                {/* Practical Scheme Wisdom */}
                <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Why This SBI Scheme Protects You</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {explanationData.schemeWisdom}
                  </p>
                </div>

                {/* Key Metrics Chips */}
                {explanationData.keyMetrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {explanationData.keyMetrics.map((metric: any, mIdx: number) => (
                      <div 
                        key={mIdx}
                        className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1"
                      >
                        <div className="text-[10px] text-stone-400 flex items-center justify-between">
                          <span>{metric.label}</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/10 text-amber-400 font-semibold">
                            {metric.highlight}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-stone-100">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tax Perks & Colony Lesson */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tax Exemption Benefits</span>
                    </div>
                    <p className="text-[11px] text-stone-300">
                      {explanationData.taxPerks}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
                    <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Colony Proverb</span>
                    </div>
                    <p className="text-[11px] text-stone-300 italic">
                      "{explanationData.colonyLesson}"
                    </p>
                  </div>
                </div>

                {/* Recommended Action & Enquiry Hook */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-teal-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                      Chintu's Prudent Recommendation:
                    </span>
                    <p className="text-xs text-stone-200">
                      {explanationData.recommendedAction}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onSelectSchemeForEnquiry) {
                        onSelectSchemeForEnquiry(currentScheme);
                      }
                      onClose();
                    }}
                    className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
                  >
                    <span>Request Scheme Proposal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* 4. Ask Chintu Follow-up Questions */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-300">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Ask Chintu More About This Scheme:</span>
            </div>

            {/* Quick Click Question Pills */}
            <div className="flex flex-wrap gap-2">
              {(explanationData?.suggestedQuestions || [
                'How does waiver of premium protect my family?',
                'What are the Section 80C and 10(10D) tax perks?',
                'Can I take a policy loan against this scheme?'
              ]).map((q: string, qIdx: number) => (
                <button
                  key={qIdx}
                  onClick={() => handleQuickQuestionClick(q)}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors text-left"
                >
                  💬 {q}
                </button>
              ))}
            </div>

            {/* Custom Input Field */}
            <form onSubmit={handleAskCustom} className="flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Ask Chintu any question (e.g. Is this good for my 4-year-old child?)..."
                className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={loading || !userQuery.trim()}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer info strip */}
        <div className="px-5 py-2.5 bg-stone-950 border-t border-stone-800 text-[10px] text-stone-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>Powered by Gemini 3.8 Flash & Finbazaar Actuarial Engine</span>
            <span>•</span>
            <span className="text-amber-400">Nature's Savings Wisdom</span>
          </div>
          <span className="font-mono text-stone-400">All 11 SBI Life Schemes Verified</span>
        </div>

      </div>
    </div>
  );
};
