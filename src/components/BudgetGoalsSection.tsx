import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  GraduationCap, 
  Palmtree, 
  ShieldAlert, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Wallet,
  Clock
} from 'lucide-react';
import { INITIAL_BUDGET_GOALS, BudgetGoal } from '../data/userPortfolio.ts';
import { PadmaLotusMotif, MayilPeacockMotif, AshtalakshmiStarMotif, KalashUrnMotif } from './RangoliMotifs.tsx';

interface BudgetGoalsSectionProps {
  onOpenEnquiry: (schemeId?: string) => void;
}

export const BudgetGoalsSection: React.FC<BudgetGoalsSectionProps> = ({ onOpenEnquiry }) => {
  const [goals, setGoals] = useState<BudgetGoal[]>(INITIAL_BUDGET_GOALS);
  const [showAddGoal, setShowAddGoal] = useState<boolean>(false);

  // New goal state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BudgetGoal['category']>('Child Education');
  const [newTarget, setNewTarget] = useState('');
  const [newCurrent, setNewCurrent] = useState('');
  const [newDeadline, setNewDeadline] = useState('2035');
  const [newMonthly, setNewMonthly] = useState('');

  // 50/30/20 Budget State
  const monthlyIncome = 145000;
  const needsBudget = Math.round(monthlyIncome * 0.50); // ₹72,500
  const wantsBudget = Math.round(monthlyIncome * 0.30); // ₹43,500
  const savingsBudget = Math.round(monthlyIncome * 0.20); // ₹29,000
  const currentActualSavings = goals.reduce((acc, g) => acc + g.monthlySavings, 0); // ₹90,000 aggregate disciplined savings

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTarget) return;

    const targetVal = parseFloat(newTarget) || 0;
    const currentVal = parseFloat(newCurrent) || 0;
    const monthlyVal = parseFloat(newMonthly) || 10000;

    let linkedScheme = 'SBI Life - Shubh Nivesh';
    let rangoliColor = '#D97706';
    let icon = 'Target';

    if (newCategory === 'Child Education') {
      linkedScheme = 'SBI Life - Smart Champ Insurance';
      rangoliColor = '#E11D48';
      icon = 'GraduationCap';
    } else if (newCategory === 'Retirement Corpus') {
      linkedScheme = 'SBI Life - Retire Smart Annuity';
      rangoliColor = '#0D9488';
      icon = 'Palmtree';
    } else if (newCategory === 'Wealth Preservation') {
      linkedScheme = 'SBI Life - Smart Women Advantage';
      rangoliColor = '#9333EA';
      icon = 'ShieldAlert';
    }

    const newGoal: BudgetGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      targetAmount: targetVal,
      currentAmount: currentVal,
      deadlineYear: parseInt(newDeadline) || 2035,
      monthlySavings: monthlyVal,
      linkedScheme,
      rangoliColor,
      iconName: icon
    };

    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
    setNewTitle('');
    setNewTarget('');
    setNewCurrent('');
    setNewMonthly('');
  };

  return (
    <div className="space-y-8">
      
      {/* Budget Flow & 50/30/20 Rule Header */}
      <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Wallet className="w-4 h-4" />
              <span>Monthly Cashflow & Budget Allocation Framework</span>
            </div>
            <h3 className="text-xl font-bold text-stone-100 font-['Cinzel',serif] mt-1">
              Monthly Income: ₹{monthlyIncome.toLocaleString('en-IN')}
            </h3>
          </div>

          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Wealth Goal</span>
          </button>
        </div>

        {/* 3 Pillars of Budgeting */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              50% Living Needs (Rent, EMI, Utilities)
            </span>
            <div className="text-lg font-bold text-stone-200 font-mono">
              ₹{needsBudget.toLocaleString('en-IN')} / mo
            </div>
            <p className="text-[11px] text-stone-500">Essential living overheads & verified commitments.</p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              30% Discretionary & Lifestyle
            </span>
            <div className="text-lg font-bold text-stone-200 font-mono">
              ₹{wantsBudget.toLocaleString('en-IN')} / mo
            </div>
            <p className="text-[11px] text-stone-500">Dining, recreation, travel, and personal hobbies.</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400">
                Active Monthly Savings & SIPs
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                Super-disciplined
              </span>
            </div>
            <div className="text-lg font-bold text-amber-300 font-mono">
              ₹{currentActualSavings.toLocaleString('en-IN')} / mo
            </div>
            <p className="text-[11px] text-stone-400">Channeled directly into SBI Life policies & high-yield mutual funds.</p>
          </div>

        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progressPercent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remainingLakhs = ((goal.targetAmount - goal.currentAmount) / 100000).toFixed(1);
          const currentYear = 2026;
          const yearsRemaining = Math.max(1, goal.deadlineYear - currentYear);

          return (
            <div
              key={goal.id}
              className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-all shadow-xl space-y-5 relative overflow-hidden"
            >
              {/* Subtle top color edge */}
              <div 
                className="absolute top-0 left-0 right-0 h-1" 
                style={{ backgroundColor: goal.rangoliColor }}
              />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    {goal.category === 'Child Education' && <PadmaLotusMotif size={28} color="#E11D48" />}
                    {goal.category === 'Retirement Corpus' && <MayilPeacockMotif size={28} color="#0D9488" />}
                    {goal.category === 'Wealth Preservation' && <AshtalakshmiStarMotif size={28} color="#9333EA" />}
                    {(goal.category === 'Emergency Fund' || goal.category === 'Dream Home') && (
                      <KalashUrnMotif size={28} color="#D97706" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                      {goal.category}
                    </span>
                    <h4 className="text-base font-bold text-stone-100 font-['Cinzel',serif]">
                      {goal.title}
                    </h4>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-stone-800 text-stone-300">
                  Target: {goal.deadlineYear} ({yearsRemaining}y left)
                </span>
              </div>

              {/* Progress Bar & Amounts */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-stone-400">
                    Accumulated: <strong className="text-stone-100 font-mono">₹{(goal.currentAmount / 100000).toFixed(2)} Lakhs</strong>
                  </span>
                  <span className="text-stone-400">
                    Goal: <strong className="text-amber-400 font-mono">₹{(goal.targetAmount / 100000).toFixed(2)} Lakhs</strong>
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-stone-950 overflow-hidden p-0.5 border border-stone-800">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: goal.rangoliColor
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                  <span>{progressPercent}% Complete</span>
                  <span>₹{remainingLakhs} Lakhs remaining</span>
                </div>
              </div>

              {/* Linked SBI Scheme & Advisory Action */}
              <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 block">Recommended Safeguard Plan:</span>
                  <span className="font-semibold text-amber-300">{goal.linkedScheme}</span>
                </div>

                <button
                  onClick={() => {
                    const schemeMap: Record<string, string> = {
                      'Child Education': 'sbi-smart-champ',
                      'Retirement Corpus': 'sbi-retire-smart',
                      'Wealth Preservation': 'sbi-smart-women-advantage',
                      'Emergency Fund': 'sbi-shubh-nivesh'
                    };
                    onOpenEnquiry(schemeMap[goal.category] || 'sbi-smart-champ');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                >
                  <span>Link Scheme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Create New Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-100 font-['Cinzel',serif]">Set New Financial Goal</h3>

            <form onSubmit={handleAddGoal} className="space-y-3">
              <div>
                <label className="block text-xs text-stone-300 mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Son's Medical College Degree"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Goal Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Child Education">Child Higher Education (SBI Smart Champ)</option>
                  <option value="Retirement Corpus">Retirement Corpus (SBI Retire Smart)</option>
                  <option value="Wealth Preservation">Women Wealth & Health (SBI Smart Women Advantage)</option>
                  <option value="Emergency Fund">Emergency Fund (SBI Guaranteed Bachat)</option>
                  <option value="Dream Home">Dream Home Asset</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="5000000"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">Current Saved (₹)</label>
                  <input
                    type="number"
                    placeholder="1000000"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 mb-1">Target Year</label>
                  <input
                    type="number"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1">Monthly Saving (₹)</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={newMonthly}
                    onChange={(e) => setNewMonthly(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
