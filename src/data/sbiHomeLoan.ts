export interface SbiHomeLoanProduct {
  id: string;
  name: string;
  category: 'Regular' | 'Overdraft' | 'Government' | 'Defence' | 'Top-Up' | 'Plot';
  tagline: string;
  minInterestRate: string;
  maxTenure: string;
  maxLoanAmount: string;
  processingFee: string;
  womenConcession: string;
  keyFeatures: string[];
  eligibility: string[];
  taxBenefits: string[];
  badge: string;
}

export const SBI_HOME_LOAN_PRODUCTS: SbiHomeLoanProduct[] = [
  {
    id: 'sbi-regular-homeloan',
    name: 'SBI Regular Home Loan',
    category: 'Regular',
    tagline: 'India’s Most Trusted Home Loan with Lowest Rates & Zero Hidden Charges',
    minInterestRate: '8.50% p.a. (EBLR linked)',
    maxTenure: 'Up to 30 Years',
    maxLoanAmount: 'Up to 90% of Property Cost',
    processingFee: '0.17% to 0.35% (Max ₹10,000 + GST)',
    womenConcession: '5 bps (0.05%) special concession for women borrowers',
    keyFeatures: [
      'Interest calculation on daily reducing balance.',
      'Overdraft facility option available via SBI Maxgain.',
      'Zero prepayment penalty on floating rate loans.',
      'Repayment tenure up to 30 years (or up to 70 years of age).',
      'Option of clubbing income of spouse / parents for higher loan eligibility.'
    ],
    eligibility: [
      'Resident Indians and Non-Resident Indians (NRIs).',
      'Minimum Entry Age: 18 Years | Maximum Age at Maturity: 70 Years.',
      'Salaried individuals, Professionals, and Self-Employed Businesspersons with regular verifiable income.'
    ],
    taxBenefits: [
      'Section 24(b): Tax deduction up to ₹2,00,000/year on interest paid for self-occupied property.',
      'Section 80C: Tax deduction up to ₹1,50,000/year on principal repayment.',
      'Section 80EEA: Additional deduction of up to ₹1,50,000 for first-time home buyers in affordable segment.'
    ],
    badge: 'Most Popular'
  },
  {
    id: 'sbi-maxgain-homeloan',
    name: 'SBI Maxgain Home Loan (Overdraft)',
    category: 'Overdraft',
    tagline: 'Park Surplus Funds in Overdraft to Drastically Reduce Interest While Retaining Liquidity',
    minInterestRate: '8.75% p.a.',
    maxTenure: 'Up to 30 Years',
    maxLoanAmount: 'Minimum ₹20 Lakhs (No Upper Cap)',
    processingFee: '0.35% of loan amount',
    womenConcession: 'Applicable 0.05% concession',
    keyFeatures: [
      'Home loan granted as an Overdraft account connected to current/savings.',
      'Every rupee deposited in Maxgain account reduces your principal interest calculation.',
      'Withdraw your surplus liquidity anytime via NetBanking or ATM without any penalty.',
      'Save lakhs of rupees in total interest and close your loan years ahead of schedule.'
    ],
    eligibility: [
      'Salaried and Self-Employed individuals seeking liquid flexibility.',
      'Minimum Loan Amount: ₹20 Lakhs.'
    ],
    taxBenefits: [
      'Section 24(b) interest deduction on actual interest debited.',
      'Section 80C principal deduction.'
    ],
    badge: 'Smart Interest Saver'
  },
  {
    id: 'sbi-privilege-homeloan',
    name: 'SBI Privilege Home Loan',
    category: 'Government',
    tagline: 'Exclusive Concessional Package for Central & State Government Employees',
    minInterestRate: '8.40% p.a.',
    maxTenure: 'Up to 30 Years (Repayment up to 75 years age)',
    maxLoanAmount: 'Based on Service & Pension Eligibility',
    processingFee: '100% Processing Fee Waiver on special campaigns',
    womenConcession: '0.05% concession for female applicants',
    keyFeatures: [
      'Tailored for employees of Central/State Govt, PSUs, and Public Sector Banks.',
      'Extended repayment period up to 75 years of age (post-retirement pension factored).',
      'Lower interest rates and priority digital sanction.',
      'Nil prepayment and foreclosure charges.'
    ],
    eligibility: [
      'Permanent employees of Central/State Government, PSUs, and Autonomous Bodies under Govt of India.'
    ],
    taxBenefits: [
      'Section 24(b) and Section 80C tax benefits.'
    ],
    badge: 'Govt Employee Special'
  },
  {
    id: 'sbi-shaurya-homeloan',
    name: 'SBI Shaurya Home Loan',
    category: 'Defence',
    tagline: 'Dedicated Concessional Home Loan for Army, Navy & Airforce Personnel',
    minInterestRate: '8.40% p.a.',
    maxTenure: 'Up to 30 Years',
    maxLoanAmount: 'Up to 90% of Cost',
    processingFee: 'Special concessional processing fees',
    womenConcession: 'Concession applicable for spouse co-borrowers',
    keyFeatures: [
      'Exclusive for Indian Army, Indian Navy, Indian Airforce, and Coast Guard personnel.',
      'Extended repayment age up to 75 years.',
      'Quick single-window approval with simplified documentation.',
      'Subsidized insurance cover options.'
    ],
    eligibility: [
      'Active Defence personnel and Armed Forces pensioners.'
    ],
    taxBenefits: [
      'Section 24(b) & Section 80C deductions.'
    ],
    badge: 'Defence Forces'
  },
  {
    id: 'sbi-topup-homeloan',
    name: 'SBI Top-Up Home Loan',
    category: 'Top-Up',
    tagline: 'Multi-Purpose Low-Cost Liquidity on Your Existing SBI Home Loan',
    minInterestRate: '8.80% p.a.',
    maxTenure: 'Up to 30 Years or residual home loan tenure',
    maxLoanAmount: 'Up to ₹5 Crores',
    processingFee: '₹2,000 to ₹5,000 + GST',
    womenConcession: 'Standard concessions apply',
    keyFeatures: [
      'Available for personal expenses, home renovation, medical needs, or child marriage.',
      'Much lower interest rate than personal loans (approx 8.8% vs 14%+ personal loan).',
      'Minimal documentation with instant disbursement for existing SBI borrowers with good repayment track record.'
    ],
    eligibility: [
      'Existing SBI Home Loan customers with at least 1 year satisfactory repayment.'
    ],
    taxBenefits: [
      'Interest tax deductible under Section 24(b) if used for home improvement/renovation.'
    ],
    badge: 'Lowest Cost Liquidity'
  },
  {
    id: 'sbi-realty-homeloan',
    name: 'SBI Realty (Plot Loan)',
    category: 'Plot',
    tagline: 'Finance Your Dream Residential Plot for Future Home Construction',
    minInterestRate: '8.65% p.a.',
    maxTenure: 'Up to 10 Years',
    maxLoanAmount: 'Up to ₹15 Crores',
    processingFee: '0.35% of loan amount',
    womenConcession: '5 bps concession',
    keyFeatures: [
      'Loan for purchasing residential land/plot for construction of house.',
      'House construction must begin within 5 years from date of loan sanction.',
      'Customer can take a separate SBI Home Loan for construction on this plot.'
    ],
    eligibility: [
      'Resident Indians aged 18 to 65 years.'
    ],
    taxBenefits: [
      'Tax deductions apply once residential construction commences.'
    ],
    badge: 'Plot Purchase'
  }
];
