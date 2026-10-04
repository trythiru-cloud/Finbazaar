export interface MarketIndex {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  dayHigh: string;
  dayLow: string;
  volume?: string;
  peRatio?: string;
  category: 'Indian Benchmark' | 'Sectoral' | 'Commodities' | 'Currency' | 'Global';
}

export const LIVE_MARKET_INDICES: MarketIndex[] = [
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50 Index',
    price: '24,842.15',
    change: '+184.60',
    changePercent: '+0.75%',
    isPositive: true,
    dayHigh: '24,895.30',
    dayLow: '24,670.10',
    peRatio: '22.8',
    category: 'Indian Benchmark'
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX 30',
    price: '81,620.40',
    change: '+568.20',
    changePercent: '+0.70%',
    isPositive: true,
    dayHigh: '81,780.00',
    dayLow: '81,150.20',
    peRatio: '23.4',
    category: 'Indian Benchmark'
  },
  {
    symbol: 'BANK NIFTY',
    name: 'NIFTY Bank Index',
    price: '51,480.90',
    change: '+412.30',
    changePercent: '+0.81%',
    isPositive: true,
    dayHigh: '51,620.00',
    dayLow: '51,110.40',
    peRatio: '15.9',
    category: 'Sectoral'
  },
  {
    symbol: 'GOLD MCX',
    name: 'Gold 24K (10g) MCX',
    price: '₹77,450',
    change: '+320.00',
    changePercent: '+0.41%',
    isPositive: true,
    dayHigh: '₹77,680',
    dayLow: '₹77,150',
    category: 'Commodities'
  },
  {
    symbol: 'SILVER MCX',
    name: 'Silver 1kg MCX',
    price: '₹91,200',
    change: '+780.00',
    changePercent: '+0.86%',
    isPositive: true,
    dayHigh: '₹91,550',
    dayLow: '₹90,300',
    category: 'Commodities'
  },
  {
    symbol: 'USD/INR',
    name: 'US Dollar / Indian Rupee',
    price: '₹84.12',
    change: '-0.08',
    changePercent: '-0.10%',
    isPositive: false,
    dayHigh: '₹84.22',
    dayLow: '₹84.09',
    category: 'Currency'
  },
  {
    symbol: 'NASDAQ 100',
    name: 'US Tech Benchmark',
    price: '20,410.85',
    change: '+142.10',
    changePercent: '+0.70%',
    isPositive: true,
    dayHigh: '20,480.20',
    dayLow: '20,290.00',
    category: 'Global'
  }
];

export const TOP_MARKET_GAINERS = [
  { name: 'SBI Life Insurance Ltd', symbol: 'SBILIFE', price: '₹1,698.40', change: '+3.42%', isPositive: true },
  { name: 'State Bank of India', symbol: 'SBIN', price: '₹824.60', change: '+2.18%', isPositive: true },
  { name: 'HDFC Bank Ltd', symbol: 'HDFCBANK', price: '₹1,682.10', change: '+1.85%', isPositive: true },
  { name: 'Tata Consultancy Services', symbol: 'TCS', price: '₹4,120.00', change: '+1.64%', isPositive: true },
  { name: 'Reliance Industries', symbol: 'RELIANCE', price: '₹2,960.50', change: '+1.40%', isPositive: true }
];

export const SECTOR_PERFORMANCE = [
  { name: 'Banking & Financials', change: '+1.45%', isPositive: true, color: 'text-emerald-400' },
  { name: 'Life & General Insurance', change: '+2.80%', isPositive: true, color: 'text-teal-400' },
  { name: 'IT & Software Services', change: '+0.95%', isPositive: true, color: 'text-emerald-400' },
  { name: 'Auto & Mobility', change: '+0.62%', isPositive: true, color: 'text-emerald-400' },
  { name: 'Oil & Energy', change: '-0.34%', isPositive: false, color: 'text-rose-400' }
];
