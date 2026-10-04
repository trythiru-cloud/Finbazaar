import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  PieChart, 
  Layers, 
  ShieldCheck, 
  Calendar, 
  Filter,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { INITIAL_PORTFOLIO_ITEMS, InvestmentItem } from '../data/userPortfolio.ts';
import { SuryaMandalaMotif, PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';

interface InvestmentTrackerProps {
  onOpenEnquiry: (schemeId?: string) => void;
}

export const InvestmentTracker: React.FC<InvestmentTrackerProps> = ({ onOpenEnquiry }) => {
  const [items, setItems] = useState<InvestmentItem[]>(INITIAL_PORTFOLIO_ITEMS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New investment form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<InvestmentItem['category']>('SBI Life Insurance');
  const [newInvested, setNewInvested] = useState('');
  const [newCurrent, setNewCurrent] = useState('');
  const [newTaxSection, setNewTaxSection] = useState('80C & 10(10D)');

  const totalInvested = items.reduce((acc, curr) => acc + curr.investedAmount, 0);
  const totalCurrentValue = items.reduce((acc, curr) => acc + curr.currentValue, 0);
  const totalGain = totalCurrentValue - totalInvested;
  const overallReturnPercent = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(1) : '0';

  const filteredItems = activeFilter === 'All' 
    ? items 
    : items.filter(i => i.category === activeFilter);

  const handleAddInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newInvested) return;

    const investedNum = parseFloat(newInvested) || 0;
    const currentNum = parseFloat(newCurrent) || investedNum;
    const gain = currentNum - investedNum;
    const gainPct = investedNum > 0 ? (gain / investedNum) * 100 : 0;

    const newItem: InvestmentItem = {
      id: `inv-${Date.now()}`,
      name: newTitle,
      category: newCategory,
      schemeOrSymbol: newCategory === 'SBI Life Insurance' ? 'SBILIFE-ALLOC' : 'INVEST-CUSTOM',
      investedAmount: investedNum,
      currentValue: currentNum,
      returns: gain,
      returnsPercent: parseFloat(gainPct.toFixed(1)),
      allocationPercent: 5,
      cagr: '12.5%',
      taxSection: newTaxSection,
      rangoliTone: 'from-amber-600 to-rose-500'
    };

    setItems([newItem, ...items]);
    setShowAddModal(false);
    setNewTitle('');
    setNewInvested('');
    setNewCurrent('');
  };

  return (
    <div className="space-y-8">
      
      {/* Top Portfolio Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Wealth Portfolio Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span className="uppercase font-semibold tracking-wider">Total Portfolio Wealth</span>
            <SuryaMandalaMotif size={24} color="#F59E0B" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-100 font-mono tracking-tight">
            ₹{totalCurrentValue.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+₹{totalGain.toLocaleString('en-IN')} (+{overallReturnPercent}%)</span>
          </div>
        </div>

        {/* Total Capital Invested */}
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl">
          <div className="text-xs text-stone-400 uppercase font-semibold tracking-wider mb-1">
            Total Capital Invested
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-200 font-mono tracking-tight">
            ₹{totalInvested.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 text-xs text-stone-400">
            Across 6 Asset Verticals
          </div>
        </div>

        {/* SBI Life Guaranteed Allocation */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-rose-950/30 border border-rose-500/30 shadow-xl">
          <div className="flex items-center justify-between text-xs text-rose-300 uppercase font-semibold tracking-wider mb-1">
            <span>Guaranteed Cover Value</span>
            <PadmaLotusMotif size={24} color="#F43F5E" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-200 font-mono tracking-tight">
            ₹40,00,000
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs text-rose-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart Champ + Retire Smart</span>
          </div>
        </div>

        {/* Annual Tax Exemption */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-teal-950/30 border border-teal-500/30 shadow-xl">
          <div className="flex items-center justify-between text-xs text-teal-300 uppercase font-semibold tracking-wider mb-1">
            <span>Sec 80C & 10(10D) Shield</span>
            <MayilPeacockMotif size={24} color="#0D9488" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-200 font-mono tracking-tight">
            ₹1,50,000 / yr
          </div>
          <div className="mt-2 text-xs text-teal-300">
            Zero LTCG on Policy Maturity
          </div>
        </div>

      </div>

      {/* Rangoli Asset Allocation Bar */}
      <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between text-xs">
          <span className="font-semibold text-stone-300 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-amber-400" />
            Rangoli Variant Asset Allocation Mix
          </span>
          <span className="text-stone-400 font-mono">Balanced High-Growth Profile</span>
        </div>

        {/* Multi-segmented Progress Bar */}
        <div className="w-full h-3.5 rounded-full bg-stone-800 overflow-hidden flex">
          <div style={{ width: '39.7%' }} className="bg-gradient-to-r from-rose-600 to-rose-500" title="SBI Life (39.7%)" />
          <div style={{ width: '27.5%' }} className="bg-gradient-to-r from-amber-500 to-yellow-400" title="Mutual Funds (27.5%)" />
          <div style={{ width: '17.6%' }} className="bg-gradient-to-r from-indigo-500 to-blue-500" title="Direct Equity (17.6%)" />
          <div style={{ width: '10.7%' }} className="bg-gradient-to-r from-yellow-500 to-amber-600" title="Gold SGB (10.7%)" />
          <div style={{ width: '4.5%' }} className="bg-gradient-to-r from-emerald-500 to-teal-500" title="Fixed Deposit (4.5%)" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
            <span>SBI Life (39.7%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>
            <span>Mutual Funds (27.5%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></span>
            <span>Equities (17.6%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-yellow-500"></span>
            <span>Gold SGB (10.7%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>FDs (4.5%)</span>
          </div>
        </div>
      </div>

      {/* Holdings Header, Filter Chips & Add Investment Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'SBI Life Insurance', 'Mutual Funds', 'Direct Equity', 'Sovereign Gold', 'Fixed Deposit'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Asset</span>
          </button>

          <button
            onClick={() => onOpenEnquiry()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black transition-colors"
          >
            <span>For Enquiries</span>
          </button>
        </div>
      </div>

      {/* Holdings List Table */}
      <div className="bg-stone-900/70 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider text-[11px] border-b border-stone-800">
              <tr>
                <th className="py-3 px-4">Investment Asset / Scheme</th>
                <th className="py-3 px-4">Asset Class</th>
                <th className="py-3 px-4 text-right">Invested Value</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-right">Gain / Returns</th>
                <th className="py-3 px-4 text-center">Tax Regime</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-stone-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-100 text-sm">{item.name}</div>
                    <div className="text-[11px] font-mono text-stone-500">{item.schemeOrSymbol}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-stone-800 text-stone-300 border border-stone-700">
                      {item.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-stone-300">
                    ₹{item.investedAmount.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-100">
                    ₹{item.currentValue.toLocaleString('en-IN')}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono">
                    <span className={item.returns >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                      {item.returns >= 0 ? '+' : ''}₹{item.returns.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      ({item.returnsPercent}%)
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                      {item.taxSection}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {item.category === 'SBI Life Insurance' ? (
                      <button
                        onClick={() => onOpenEnquiry(item.schemeOrSymbol === 'SBILIFE-CHAMP' ? 'sbi-smart-champ' : 'sbi-retire-smart')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-300 hover:text-black hover:bg-amber-400 border border-amber-400/40 transition-colors"
                      >
                        Top Up / Re-Enquire
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenEnquiry()}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-stone-400 hover:text-stone-200 transition-colors"
                      >
                        Rebalance
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Investment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-100 font-['Cinzel',serif]">Add Investment Asset</h3>
            
            <form onSubmit={handleAddInvestment} className="space-y-3">
              <div>
                <label className="block text-xs text-stone-300 mb-1">Asset or Scheme Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SBI Life Shubh Nivesh or Parag Parikh Flexi Cap"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Asset Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="SBI Life Insurance">SBI Life Insurance / Pension</option>
                  <option value="Mutual Funds">Mutual Funds (SIP / Lumpsum)</option>
                  <option value="Direct Equity">Direct Equity / Stocks</option>
                  <option value="Sovereign Gold">Sovereign Gold Bonds / Gold ETF</option>
                  <option value="Fixed Deposit">Fixed Deposit (Bank / Post Office)</option>
                  <option value="NPS">National Pension System (NPS)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">Invested Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="100000"
                    value={newInvested}
                    onChange={(e) => setNewInvested(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">Current Value (₹)</label>
                  <input
                    type="number"
                    placeholder="115000"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Applicable Tax Section</label>
                <select
                  value={newTaxSection}
                  onChange={(e) => setNewTaxSection(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="80C & 10(10D)">80C & 10(10D) Tax-Free</option>
                  <option value="80CCC & 10(10D)">80CCC Pension Deduction</option>
                  <option value="LTCG 12.5%">Equity LTCG (12.5%)</option>
                  <option value="Capital Gains Exempt">Capital Gains Tax Exempt (SGB)</option>
                  <option value="Income Slab Rate">Income Tax Slab Rate</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300"
                >
                  Save Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
