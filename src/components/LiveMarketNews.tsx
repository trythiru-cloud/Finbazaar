import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ExternalLink, 
  Radio, 
  Sparkles, 
  Layers, 
  Clock, 
  Building2,
  Loader2
} from 'lucide-react';
import { LIVE_MARKET_INDICES, TOP_MARKET_GAINERS, SECTOR_PERFORMANCE } from '../data/marketData.ts';
import { SuryaMandalaMotif } from './RangoliMotifs.tsx';

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  category: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  timeAgo: string;
}

export const LiveMarketNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [newsSource, setNewsSource] = useState<string>('google_search_grounding');

  const fetchLiveNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/market-news');
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setNews(json.data);
        if (json.source) setNewsSource(json.source);
      }
    } catch (err) {
      console.error('Failed to fetch market news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  const handleSearchGoogleLive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Direct Google Search for the market topic in new tab
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' Indian stock market live news Nifty Sensex SBI Life')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      
      {/* Real-time Indices Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {LIVE_MARKET_INDICES.slice(0, 6).map((idx) => (
          <div
            key={idx.symbol}
            className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 shadow-lg space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span className="font-semibold text-stone-300">{idx.symbol}</span>
              <span className="text-[10px] text-stone-500">{idx.category}</span>
            </div>
            <div className="text-base font-bold font-mono text-stone-100">
              {idx.price}
            </div>
            <div className={`text-xs font-semibold flex items-center gap-1 ${idx.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {idx.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{idx.change} ({idx.changePercent})</span>
            </div>
          </div>
        ))}
      </div>

      {/* Google Search Live Bar & Refresh Header */}
      <div className="p-6 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-100 font-['Cinzel',serif]">
                  Live Google Search Financial News Feed
                </h3>
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                  Live Wire
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Real-time market sentiment and policy analysis verified via Google Search Grounding
              </p>
            </div>
          </div>

          <button
            onClick={fetchLiveNews}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
            <span>Refresh Live Feed</span>
          </button>
        </div>

        {/* Live Search Form */}
        <form onSubmit={handleSearchGoogleLive} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live market intelligence on Google (e.g. SBI Life quarterly results, RBI interest rates, Nifty targets)..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-400/20"
          >
            <span>Search Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-400">
          <span className="text-stone-500">Trending Queries:</span>
          {['SBI Life Share Price', 'Sensex Nifty Rally', 'RBI Repo Rate 2026', 'Gold MCX Forecast', 'Retire Smart Annuity Rates'].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setSearchQuery(q);
                window.open(`https://www.google.com/search?q=${encodeURIComponent(q + ' financial market news')}`, '_blank');
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/40 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

      </div>

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 animate-pulse space-y-3">
              <div className="h-4 bg-stone-800 rounded w-1/3" />
              <div className="h-5 bg-stone-800 rounded w-3/4" />
              <div className="h-12 bg-stone-800 rounded w-full" />
              <div className="h-3 bg-stone-800 rounded w-1/2" />
            </div>
          ))
        ) : (
          news.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between shadow-xl space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    {item.category}
                  </span>
                  
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                    item.sentiment === 'Bullish'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : item.sentiment === 'Bearish'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}>
                    {item.sentiment}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-medium text-stone-400 truncate max-w-[140px]">
                  {item.source}
                </span>

                <div className="flex items-center gap-1.5 text-stone-400">
                  <Clock className="w-3 h-3" />
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Top Gainers & Sector Pulse Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Market Gainers */}
        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
            <span className="uppercase tracking-wider">Top Indian Wealth Movers (BSE/NSE)</span>
            <span className="text-stone-500 text-[10px]">Real-Time Market Data</span>
          </div>

          <div className="divide-y divide-stone-800/60 text-xs">
            {TOP_MARKET_GAINERS.map((g) => (
              <div key={g.symbol} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-stone-200">{g.name}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{g.symbol}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-stone-100">{g.price}</div>
                  <div className="font-mono text-emerald-400 text-[11px]">{g.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Performance */}
        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-300">
            <span className="uppercase tracking-wider">Sectoral Momentum & Flows</span>
            <span className="text-stone-500 text-[10px]">Daily Pulse</span>
          </div>

          <div className="divide-y divide-stone-800/60 text-xs">
            {SECTOR_PERFORMANCE.map((sec) => (
              <div key={sec.name} className="py-2.5 flex items-center justify-between">
                <span className="text-stone-300">{sec.name}</span>
                <span className={`font-mono font-bold ${sec.color}`}>{sec.change}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
