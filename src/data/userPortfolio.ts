export interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  location: string;
  panNumber: string;
  kycVerified: boolean;
  age: number;
  monthlyIncome: number;
}

export interface InvestmentItem {
  id: string;
  name: string;
  category: 'SBI Life Insurance' | 'Mutual Funds' | 'Direct Equity' | 'Sovereign Gold' | 'Fixed Deposit' | 'NPS';
  schemeOrSymbol: string;
  investedAmount: number;
  currentValue: number;
  returns: number;
  returnsPercent: number;
  allocationPercent: number;
  cagr: string;
  taxSection: string;
  rangoliTone: string;
}

export interface BudgetGoal {
  id: string;
  title: string;
  category: 'Child Education' | 'Retirement Corpus' | 'Dream Home' | 'Emergency Fund' | 'Wealth Preservation';
  targetAmount: number;
  currentAmount: number;
  deadlineYear: number;
  monthlySavings: number;
  linkedScheme: string;
  rangoliColor: string;
  iconName: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  bankCode: 'sbi' | 'hdfc' | 'icici' | 'axis';
  accountNumber: string;
  accountType: string;
  branch: string;
  balance: number;
  synced: boolean;
  lastSyncTime: string;
  logoColor: string;
}

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Thirumalai N',
  email: 'trythiru@gmail.com',
  mobile: '+91 98401 23456',
  location: 'Chennai, Tamil Nadu',
  panNumber: 'ABCDE1234F',
  kycVerified: true,
  age: 36,
  monthlyIncome: 145000
};

export const INITIAL_PORTFOLIO_ITEMS: InvestmentItem[] = [
  {
    id: 'inv-1',
    name: 'SBI Life - Smart Champ (Child Education)',
    category: 'SBI Life Insurance',
    schemeOrSymbol: 'SBILIFE-CHAMP',
    investedAmount: 450000,
    currentValue: 620000,
    returns: 170000,
    returnsPercent: 37.7,
    allocationPercent: 18.5,
    cagr: '12.4%',
    taxSection: '80C & 10(10D)',
    rangoliTone: 'from-rose-600 to-amber-500'
  },
  {
    id: 'inv-2',
    name: 'SBI Life - Retire Smart (Pension Annuity)',
    category: 'SBI Life Insurance',
    schemeOrSymbol: 'SBILIFE-RETIRE',
    investedAmount: 520000,
    currentValue: 710000,
    returns: 190000,
    returnsPercent: 36.5,
    allocationPercent: 21.2,
    cagr: '13.1%',
    taxSection: '80CCC & 10(10D)',
    rangoliTone: 'from-teal-600 to-cyan-500'
  },
  {
    id: 'inv-3',
    name: 'Mirae Asset Large Cap & Flexicap SIPs',
    category: 'Mutual Funds',
    schemeOrSymbol: 'MIRAE-GROWTH',
    investedAmount: 640000,
    currentValue: 920000,
    returns: 280000,
    returnsPercent: 43.7,
    allocationPercent: 27.5,
    cagr: '15.8%',
    taxSection: 'LTCG 12.5%',
    rangoliTone: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'inv-4',
    name: 'Bluechip Equities (SBI, HDFC Bank, TCS, L&T)',
    category: 'Direct Equity',
    schemeOrSymbol: 'EQUITY-PORTFOLIO',
    investedAmount: 480000,
    currentValue: 590000,
    returns: 110000,
    returnsPercent: 22.9,
    allocationPercent: 17.6,
    cagr: '14.2%',
    taxSection: 'LTCG',
    rangoliTone: 'from-indigo-600 to-blue-500'
  },
  {
    id: 'inv-5',
    name: 'Sovereign Gold Bonds (RBI SGB Series)',
    category: 'Sovereign Gold',
    schemeOrSymbol: 'SGB-2028-IV',
    investedAmount: 260000,
    currentValue: 360000,
    returns: 100000,
    returnsPercent: 38.4,
    allocationPercent: 10.7,
    cagr: '11.8%',
    taxSection: 'Capital Gains Exempt',
    rangoliTone: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'inv-6',
    name: 'State Bank of India Multi-Option FD',
    category: 'Fixed Deposit',
    schemeOrSymbol: 'SBI-FD-7.3%',
    investedAmount: 150000,
    currentValue: 150000,
    returns: 0,
    returnsPercent: 7.3,
    allocationPercent: 4.5,
    cagr: '7.3%',
    taxSection: 'TDS Applicable',
    rangoliTone: 'from-emerald-600 to-teal-500'
  }
];

export const INITIAL_BUDGET_GOALS: BudgetGoal[] = [
  {
    id: 'goal-1',
    title: 'Child Higher Education & Overseas University',
    category: 'Child Education',
    targetAmount: 5000000,
    currentAmount: 1850000,
    deadlineYear: 2035,
    monthlySavings: 28000,
    linkedScheme: 'SBI Life - Smart Champ Insurance',
    rangoliColor: '#E11D48',
    iconName: 'GraduationCap'
  },
  {
    id: 'goal-2',
    title: 'Comfortable Retirement Pension Corpus',
    category: 'Retirement Corpus',
    targetAmount: 35000000,
    currentAmount: 7200000,
    deadlineYear: 2045,
    monthlySavings: 35000,
    linkedScheme: 'SBI Life - Retire Smart Annuity',
    rangoliColor: '#0D9488',
    iconName: 'Palmtree'
  },
  {
    id: 'goal-3',
    title: 'Family Healthcare & Women Wealth Security',
    category: 'Wealth Preservation',
    targetAmount: 3000000,
    currentAmount: 1450000,
    deadlineYear: 2030,
    monthlySavings: 15000,
    linkedScheme: 'SBI Life - Smart Women Advantage',
    rangoliColor: '#9333EA',
    iconName: 'ShieldHeart'
  },
  {
    id: 'goal-4',
    title: 'Liquid Emergency Reserve (9 Months Expenses)',
    category: 'Emergency Fund',
    targetAmount: 1000000,
    currentAmount: 850000,
    deadlineYear: 2026,
    monthlySavings: 12000,
    linkedScheme: 'SBI Flexi Deposit & High Yield Savings',
    rangoliColor: '#D97706',
    iconName: 'Vault'
  }
];

export const INITIAL_BANKS: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'State Bank of India',
    bankCode: 'sbi',
    accountNumber: '••••••••4892',
    accountType: 'Savings Bank Account',
    branch: 'Anna Nagar West, Chennai',
    balance: 482500.75,
    synced: true,
    lastSyncTime: '15 mins ago',
    logoColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'bank-2',
    bankName: 'HDFC Bank',
    bankCode: 'hdfc',
    accountNumber: '••••••••7219',
    accountType: 'Salary Account',
    branch: 'T Nagar, Chennai',
    balance: 231400.00,
    synced: true,
    lastSyncTime: '1 hour ago',
    logoColor: 'from-blue-800 to-sky-600'
  },
  {
    id: 'bank-3',
    bankName: 'ICICI Bank',
    bankCode: 'icici',
    accountNumber: '••••••••1093',
    accountType: 'Wealth Savings',
    branch: 'MG Road, Bangalore',
    balance: 198750.50,
    synced: false,
    lastSyncTime: 'Not linked yet',
    logoColor: 'from-orange-600 to-amber-700'
  }
];
