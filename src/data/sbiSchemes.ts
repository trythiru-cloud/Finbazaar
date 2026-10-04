export interface SbiScheme {
  id: string;
  name: string;
  category: 'child' | 'pension' | 'women' | 'traditional' | 'employer-employee';
  categoryLabel: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  rangoliPattern: 'padma' | 'mayil' | 'ashtalakshmi' | 'kalash' | 'surya';
  accentColor: string;
  gradient: string;
  badge: string;
  minEntryAge: string;
  maxEntryAge: string;
  maturityAge: string;
  minSumAssured: string;
  policyTerm: string;
  premiumFrequency: string[];
  keyBenefits: string[];
  taxBenefits: string[];
  guarantees: string;
  defaultSumAssured: number;
  defaultTerm: number;
  sampleAnnualPremium: number;
  sampleMaturityAmount: number;
  brochureHighlights: {
    title: string;
    description: string;
  }[];
}

export const SBI_SCHEMES: SbiScheme[] = [
  {
    id: 'sbi-smart-champ',
    name: 'SBI Life - Smart Champ Insurance',
    category: 'child',
    categoryLabel: 'SBI Child Plan',
    tagline: 'Guaranteed Smart Benefits for Higher Education & Career Milestones',
    shortDesc: 'A non-linked, participating life insurance child plan designed to secure your child’s educational future through guaranteed milestone payouts.',
    longDesc: 'SBI Life - Smart Champ Insurance guarantees 4 equal annual Smart Benefits payable at the end of each policy year once the child turns 18, 19, 20, and 21 years of age. Even in the untimely event of parent’s demise, future premiums are waived completely, a lump sum death benefit is paid immediately, and the child receives all scheduled educational payouts intact.',
    rangoliPattern: 'padma',
    accentColor: '#E11D48',
    gradient: 'from-rose-600 via-rose-500 to-amber-500',
    badge: 'Flagship Child Education Shield',
    minEntryAge: 'Child: 0 to 13 years | Parent: 21 to 50 years',
    maxEntryAge: 'Child: 13 years | Parent: 50 years',
    maturityAge: 'Child: 21 years completed',
    minSumAssured: '₹1,00,000 (No upper limit subject to underwriting)',
    policyTerm: '21 minus age of child at entry (e.g., 18 years for 3-yr-old)',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    keyBenefits: [
      'Smart Benefits: 4 equal annual installments of 25% of Sum Assured + Terminal Bonus paid during college years (Ages 18 to 21).',
      'Inbuilt Waiver of Premium: Future premiums are waived if the proposer passes away.',
      'Immediate Life Cover: 105% of all premiums paid or 10x annualized premium paid immediately to nominee.',
      'Accidental Total & Permanent Disability (ATPD) protection included.'
    ],
    taxBenefits: [
      'Tax deduction on premiums paid under Section 80C (up to ₹1.5 Lakh/year).',
      'Tax-free maturity and educational payouts under Section 10(10D) of Income Tax Act.'
    ],
    guarantees: 'Guaranteed educational milestone benefits + Simple Reversionary Bonuses + Terminal Bonus.',
    defaultSumAssured: 1500000,
    defaultTerm: 16,
    sampleAnnualPremium: 104500,
    sampleMaturityAmount: 2680000,
    brochureHighlights: [
      {
        title: 'Education Milestones',
        description: 'Scheduled disbursements at ages 18, 19, 20, and 21 coincide with college tuition fees.'
      },
      {
        title: 'Triple Protection',
        description: 'Immediate lump sum + waiver of future premiums + full milestone payouts guaranteed.'
      },
      {
        title: 'Bonus Compounding',
        description: 'Accrues annual simple reversionary bonuses that get distributed at maturity.'
      }
    ]
  },
  {
    id: 'sbi-smart-scholar',
    name: 'SBI Life - Smart Scholar',
    category: 'child',
    categoryLabel: 'SBI Child Plan',
    tagline: 'Market-Linked Wealth Creation with Dual Protection for Children',
    shortDesc: 'A unit-linked, non-participating child education plan offering optimal market growth through diversified fund choices and guaranteed insurance shield.',
    longDesc: 'Combines the upside of Indian capital market equity funds with institutional safety. Comes with comprehensive Premium Payor Waiver Benefit and twin-benefit payout structure to ensure your child’s dreams are never compromised.',
    rangoliPattern: 'padma',
    accentColor: '#F43F5E',
    gradient: 'from-pink-600 via-rose-600 to-orange-500',
    badge: 'High-Growth Education Fund',
    minEntryAge: 'Child: 0 to 17 years | Parent: 18 to 57 years',
    maxEntryAge: 'Child: 17 years | Parent: 57 years',
    maturityAge: 'Child: 18 to 25 years',
    minSumAssured: '10x annualized premium (min ₹2,40,000)',
    policyTerm: '8 to 25 years',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    keyBenefits: [
      'Loyalty Additions: Periodic fund booster additions to accelerate compound portfolio returns.',
      'Twin Benefits: In case of unfortunate event, lump sum Sum Assured is paid + future premiums invested by company + Fund Value at maturity.',
      '9 Diversified Fund Portfolios: Equity, Growth, Balanced, and Pure Debt allocation options with free switches.'
    ],
    taxBenefits: [
      'Exemption on premiums under Section 80C.',
      'Maturity proceeds exempt under Section 10(10D) as per prevailing IT rules.'
    ],
    guarantees: 'Inbuilt Premium Payor Waiver Benefit + Guaranteed Loyalty Fund Boosters.',
    defaultSumAssured: 2000000,
    defaultTerm: 15,
    sampleAnnualPremium: 120000,
    sampleMaturityAmount: 3740000,
    brochureHighlights: [
      {
        title: 'Flexible Fund Switching',
        description: 'Move freely between aggressive equity funds and secure debt funds as your child nears college.'
      },
      {
        title: 'Institutional Management',
        description: 'Managed by SBI Life’s premier fund managers delivering consistent benchmark alpha.'
      }
    ]
  },
  {
    id: 'sbi-retire-smart',
    name: 'SBI Life - Retire Smart',
    category: 'pension',
    categoryLabel: 'SBI Pension Plan',
    tagline: 'Guaranteed Additions with Market Growth for a Dignified Golden Age',
    shortDesc: 'A unit-linked pension plan with guaranteed additions up to 210% of annual premium, empowering you to build an inflation-beating retirement corpus.',
    longDesc: 'SBI Life - Retire Smart is crafted to secure your financial freedom after active retirement. With guaranteed additions starting from the 15th year onwards, terminal additions, and automatic asset allocation strategies, your retirement corpus is safeguarded against sudden market volatility while capturing equity expansion.',
    rangoliPattern: 'mayil',
    accentColor: '#0D9488',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-500',
    badge: 'Premier Retirement Annuity',
    minEntryAge: '30 years',
    maxEntryAge: '70 years',
    maturityAge: 'Vesting Age: 40 to 80 years',
    minSumAssured: 'Not applicable (Retirement Annuity Plan with 101% Guarantee)',
    policyTerm: '10 to 35 years',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Monthly', 'Single Premium'],
    keyBenefits: [
      'Guaranteed Additions: Up to 210% of annual premium added to your pension corpus.',
      'Advantage Guarantee: Assured minimum return of 101% of all premiums paid upon vesting or death.',
      'Automatic Asset Allocation (AAA): Automatically shifts funds from equity to debt as you near your retirement year.',
      'Multiple Annuity Options: Lifetime pension with return of purchase price, increasing annuity, or joint life cover.'
    ],
    taxBenefits: [
      'Tax benefits under Section 80CCC / 80C up to ₹1.5 Lakh annually.',
      'Up to 60% of corpus can be commuted completely tax-free upon vesting.'
    ],
    guarantees: '101% Minimum Death/Vesting Guarantee + Guaranteed Additions up to 210% of annualized premium.',
    defaultSumAssured: 2500000,
    defaultTerm: 20,
    sampleAnnualPremium: 150000,
    sampleMaturityAmount: 7850000,
    brochureHighlights: [
      {
        title: 'Guaranteed Additions',
        description: 'Compounding additions credited regularly starting from the 15th policy anniversary.'
      },
      {
        title: 'Safety Volatility Shield',
        description: 'Auto rebalancing protects gains from late-stage market corrections before vesting.'
      },
      {
        title: 'Joint Life Annuity',
        description: 'Guarantees regular monthly pension for yourself and spouse for life.'
      }
    ]
  },
  {
    id: 'sbi-saral-pension',
    name: 'SBI Life - Saral Pension',
    category: 'pension',
    categoryLabel: 'SBI Pension Plan',
    tagline: 'Standard Immediate Annuity with 100% Lifetime Guaranteed Income',
    shortDesc: 'A non-linked, non-participating single premium immediate annuity plan standardizing retirement peace with guaranteed lifetime pension payouts.',
    longDesc: 'Pay once and receive a lifelong, guaranteed pension deposited directly into your bank account every month or quarter. Offers 100% Return of Purchase Price (ROP) to your legal nominees upon demise, ensuring full capital safety.',
    rangoliPattern: 'mayil',
    accentColor: '#059669',
    gradient: 'from-emerald-700 via-teal-600 to-amber-500',
    badge: 'Immediate Guaranteed Annuity',
    minEntryAge: '40 years',
    maxEntryAge: '80 years',
    maturityAge: 'Whole Life Annuity',
    minSumAssured: 'Min Annuity: ₹1,000/month (₹12,000/year)',
    policyTerm: 'Lifetime',
    premiumFrequency: ['Single Premium'],
    keyBenefits: [
      'Immediate Income: Start receiving regular pension from the very next month after deposit.',
      'Fixed Guaranteed Rate: Annuity rate is locked permanently for life, immune to interest rate cuts.',
      '100% Capital Return: Full purchase price returned to nominees.',
      'Loan Facility: Available after 6 months from policy commencement for emergency liquidity.'
    ],
    taxBenefits: [
      'Tax deduction on purchase price under eligible retirement rollover provisions.'
    ],
    guarantees: '100% Guaranteed Annuity Rate for life + 100% Capital Preservation.',
    defaultSumAssured: 3000000,
    defaultTerm: 25,
    sampleAnnualPremium: 2500000,
    sampleMaturityAmount: 185000, // Annual Pension
    brochureHighlights: [
      {
        title: 'Locked Rates',
        description: 'Guaranteed lifelong payout rates unaffected by falling banking FD yields.'
      },
      {
        title: 'Emergency Surrender',
        description: 'Full surrender value permitted in case of diagnosed critical illness.'
      }
    ]
  },
  {
    id: 'sbi-smart-women-advantage',
    name: 'SBI Life - Smart Women Advantage',
    category: 'women',
    categoryLabel: 'SBI Women Wealth Builder',
    tagline: 'Dual Shield of Wealth Accumulation & Critical Illness Protection for Women',
    shortDesc: 'A comprehensive individual participating life insurance plan tailored specifically for women, combining wealth creation with critical illness and female health cover.',
    longDesc: 'Specially structured to address the health and financial security requirements of women across life stages. Covers female-specific critical illnesses (including breast and cervical cancer), pregnancy complications, and congenital child disorders while accumulating wealth through simple reversionary bonuses and maturity bonuses.',
    rangoliPattern: 'ashtalakshmi',
    accentColor: '#9333EA',
    gradient: 'from-purple-600 via-pink-600 to-amber-500',
    badge: 'Exclusive Women Wealth Shield',
    minEntryAge: '18 years',
    maxEntryAge: '50 years',
    maturityAge: 'Max 65 years',
    minSumAssured: '₹2,00,000 (No upper limit)',
    policyTerm: '10, 15, or 20 years',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    keyBenefits: [
      'Female Health Cover: Comprehensive protection covering 9 female-specific cancers and critical illnesses.',
      'Pregnancy & Congenital Cover: Financial shield for pregnancy complications and birth anomalies.',
      'Wealth Accumulation: Simple Reversionary Bonuses + Terminal Bonus for independent financial goals.',
      'Waiver of Premium: Premiums waived upon diagnosis of covered critical condition while policy stays active.'
    ],
    taxBenefits: [
      'Section 80C deductions for life insurance premium.',
      'Section 80D additional tax benefits for the critical illness component.',
      'Section 10(10D) tax-free maturity and health claims.'
    ],
    guarantees: 'Guaranteed Sum Assured on Maturity + Declared Reversionary Bonuses + Health Benefit Shield.',
    defaultSumAssured: 2000000,
    defaultTerm: 15,
    sampleAnnualPremium: 115000,
    sampleMaturityAmount: 3120000,
    brochureHighlights: [
      {
        title: 'Women Health First',
        description: 'Dedicated financial buffer covering major female medical contingencies.'
      },
      {
        title: 'Double Tax Savings',
        description: 'Benefit under both Section 80C (Life Cover) and Section 80D (Health Rider).'
      },
      {
        title: 'Milestone Financial Freedom',
        description: 'Ideal for funding sabbatical plans, independent business ventures, or retirement.'
      }
    ]
  },
  {
    id: 'sbi-wealth-builder',
    name: 'SBI Life - Wealth Builder',
    category: 'women',
    categoryLabel: 'SBI Women Wealth Builder',
    tagline: 'Regular Wealth Generation with Limited Premium Payment Convenience',
    shortDesc: 'An individual unit-linked insurance plan designed for disciplined wealth accumulation with multiple fund strategies and guaranteed fund boosters.',
    longDesc: 'Allows women professionals and entrepreneurs to build substantial long-term wealth by investing for a limited period (e.g. 5, 7, or 10 years). Enjoy institutional fund management across large cap, mid cap, and debt with zero allocation charges from the 6th policy year.',
    rangoliPattern: 'ashtalakshmi',
    accentColor: '#C026D3',
    gradient: 'from-fuchsia-600 via-rose-500 to-amber-500',
    badge: 'Capital Accelerator',
    minEntryAge: '18 years',
    maxEntryAge: '55 years',
    maturityAge: '70 years',
    minSumAssured: '7x to 10x annualized premium',
    policyTerm: '10 to 30 years (Premium pay term: 5, 7, 10 or regular)',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Monthly'],
    keyBenefits: [
      'Limited Premium Commitment: Pay for only 5 or 7 years and reap returns for up to 30 years.',
      'Guaranteed Fund Boosters: Added to the fund value at specified durations.',
      'Return of Mortality Charges (ROMC): Total mortality charges deducted are added back at maturity.'
    ],
    taxBenefits: [
      'Section 80C and Section 10(10D) compliance as per Income Tax regulations.'
    ],
    guarantees: 'Guaranteed Return of Mortality Charges at maturity + Fund Boosters.',
    defaultSumAssured: 2500000,
    defaultTerm: 15,
    sampleAnnualPremium: 150000,
    sampleMaturityAmount: 4250000,
    brochureHighlights: [
      {
        title: 'Limited Pay Freedom',
        description: 'Finish paying premiums during peak earning years and let compound growth compound.'
      },
      {
        title: 'Mortality Charge Refund',
        description: 'Complete refund of life protection charges credited directly to your fund at maturity.'
      }
    ]
  },
  {
    id: 'sbi-shubh-nivesh',
    name: 'SBI Life - Shubh Nivesh',
    category: 'traditional',
    categoryLabel: 'SBI Traditional Insurance',
    tagline: 'Traditional Endowment with Whole Life Regular Income Option',
    shortDesc: 'A non-linked, participating traditional endowment insurance plan providing the twin benefits of wealth accumulation and regular income up to age 100.',
    longDesc: 'SBI Life - Shubh Nivesh is ideal for conservative investors seeking guaranteed returns, bonus compounding, and lifelong security. Choose the Endowment Option for a lump sum at the end of the term, or the Whole Life Option to receive regular income payouts for up to 100 years of age.',
    rangoliPattern: 'kalash',
    accentColor: '#D97706',
    gradient: 'from-amber-600 via-yellow-600 to-stone-800',
    badge: 'Lifelong Heritage Security',
    minEntryAge: '18 years',
    maxEntryAge: '55 years (Endowment) | 50 years (Whole Life)',
    maturityAge: 'Max 65 years (Endowment) | 100 years (Whole Life)',
    minSumAssured: '₹75,000 (No upper limit)',
    policyTerm: '7 to 30 years (Endowment) | Whole Life up to 100 years',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly', 'Single'],
    keyBenefits: [
      'Two Robust Options: Endowment Option (lump sum) or Whole Life Option (lump sum + regular income till age 100).',
      'Compound Bonus Additions: Simple Reversionary Bonus declared every financial year plus terminal bonus.',
      'Comprehensive Riders: Accidental Death Benefit & Preferred Term Rider available for enhanced protection.',
      'High Sum Assured Rebates: Attractive discounts on premium rates for sum assured ₹3,00,000 and above.'
    ],
    taxBenefits: [
      'Section 80C deduction on premium up to ₹1.5 Lakh.',
      'Maturity proceeds and death benefits completely tax-free under Section 10(10D).'
    ],
    guarantees: 'Guaranteed Basic Sum Assured + Accrued Reversionary Bonuses + Terminal Bonus.',
    defaultSumAssured: 1800000,
    defaultTerm: 20,
    sampleAnnualPremium: 98000,
    sampleMaturityAmount: 3240000,
    brochureHighlights: [
      {
        title: 'Whole Life Income',
        description: 'Receive steady financial payouts from policy maturity up to 100 years of age.'
      },
      {
        title: 'Conservative Capital Safety',
        description: 'Backed by the rock-solid sovereign heritage and high solvency ratio of SBI Life.'
      },
      {
        title: 'Family Heritage Legacy',
        description: 'Provides a substantial inheritance corpus for children and grandchildren.'
      }
    ]
  },
  {
    id: 'sbi-smart-bachat',
    name: 'SBI Life - Smart Bachat',
    category: 'traditional',
    categoryLabel: 'SBI Traditional Insurance',
    tagline: 'Limited Premium Traditional Savings with Inbuilt Accidental Protection',
    shortDesc: 'A traditional, non-linked, participating endowment life insurance plan designed for limited premium payments and complete financial peace.',
    longDesc: 'Gives you the freedom to choose premium paying terms of 5, 7, or 10 years while enjoying continuous life cover and bonus additions throughout the policy duration. Includes an inbuilt option for Accidental Death and Total Permanent Disability (AD&TPD) protection.',
    rangoliPattern: 'kalash',
    accentColor: '#B45309',
    gradient: 'from-amber-700 via-orange-600 to-rose-600',
    badge: 'Guaranteed Savings Shield',
    minEntryAge: '6 years (Option A) | 18 years (Option B)',
    maxEntryAge: '50 years',
    maturityAge: 'Max 65 years',
    minSumAssured: '₹1,00,000',
    policyTerm: '12 to 25 years',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    keyBenefits: [
      'Limited Premium Payment: Pay for 5, 7, or 10 years only.',
      'Two Plan Options: Option A (Endowment) & Option B (Endowment + Inbuilt AD&TPD cover).',
      'Premium Waiver Option: Future premiums waived upon permanent disability under Option B.',
      'Loan Facility: Easy liquidity against policy surrender value after paying 2 years premiums.'
    ],
    taxBenefits: [
      'Section 80C premium tax exemption up to ₹1,50,000.',
      'Maturity and claim receipts 100% tax-exempt under Section 10(10D).'
    ],
    guarantees: 'Guaranteed Maturity Sum Assured + Vested Reversionary Bonuses.',
    defaultSumAssured: 1200000,
    defaultTerm: 15,
    sampleAnnualPremium: 88000,
    sampleMaturityAmount: 2150000,
    brochureHighlights: [
      {
        title: 'Short Pay Commitment',
        description: 'Pay for as low as 5 years and stay fully insured for the entire 15 to 25 year term.'
      },
      {
        title: 'Inbuilt Disability Shield',
        description: 'Comprehensive accident protection with total premium waiver protection.'
      }
    ]
  },
  {
    id: 'sbi-sampoorn-suraksha',
    name: 'SBI Life - Sampoorn Suraksha (Employer-Employee Group Term)',
    category: 'employer-employee',
    categoryLabel: 'Employer-Employee Plan',
    tagline: 'Staff Welfare Protection, Corporate Tax Shield & Retention Incentive',
    shortDesc: 'A group term life insurance scheme enabling corporate enterprises & MSMEs to insure employees, claim 100% tax deductions under Section 37(1), and build staff loyalty.',
    longDesc: 'SBI Life - Sampoorn Suraksha is designed for corporate employers to provide subsidized or company-funded life protection for their workforce. Under the Employer-Employee framework, the corporate entity pays the premium, claiming it as a legitimate business expense under Section 37(1), while the employee’s family is protected with a substantial tax-free death benefit under Section 10(10D). Can also be tailored for Keyman Insurance.',
    rangoliPattern: 'surya',
    accentColor: '#0284C7',
    gradient: 'from-sky-600 via-blue-600 to-indigo-600',
    badge: 'Corporate Staff Shield & Tax Benefit',
    minEntryAge: '18 years | Maximum: 69 years',
    maxEntryAge: '69 years',
    maturityAge: 'Up to 70 years',
    minSumAssured: '₹5,00,000 per employee',
    policyTerm: '1 year (Annually Renewable Group Term)',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly', 'Monthly'],
    keyBenefits: [
      '100% Corporate Tax Deduction: Full premium paid by employer is deductible as business expenditure under Section 37(1).',
      'Tax-Free Claim to Nominee: Employee nominees receive sum assured completely exempt from tax under Section 10(10D).',
      'Free Cover Limit (FCL): Simplified group underwriting with no medical tests for eligible group bandings.',
      'Flexible Customization: Graded cover based on employee hierarchy, designation, or salary multiples.'
    ],
    taxBenefits: [
      'Employer: Premium deductible under Section 37(1) of Income Tax Act.',
      'Employee Nominee: Death benefit 100% tax-free under Section 10(10D).'
    ],
    guarantees: 'Guaranteed contractual sum assured paid on unfortunate death or terminal illness.',
    defaultSumAssured: 5000000,
    defaultTerm: 1,
    sampleAnnualPremium: 14500,
    sampleMaturityAmount: 5000000,
    brochureHighlights: [
      {
        title: 'Section 37(1) Business Tax Shield',
        description: 'Reduce company corporate tax liability while demonstrating genuine commitment to employee welfare.'
      },
      {
        title: 'Retain High-Impact Talent',
        description: 'Provide executive financial reassurance that bolsters staff retention and mitigates attrition.'
      }
    ]
  },
  {
    id: 'sbi-corporate-keyman',
    name: 'SBI Life - Keyman & Executive Wealth Shield',
    category: 'employer-employee',
    categoryLabel: 'Employer-Employee Plan',
    tagline: 'Hedging Critical Executive Loss & Protecting Corporate Business Continuity',
    shortDesc: 'A strategic corporate insurance policy taken by a business on the life of an indispensable executive or promoter to protect against catastrophic disruption.',
    longDesc: 'Keyman Insurance covers directors, technical founders, and pivotal executives whose untimely absence could jeopardize banking covenants, credit ratings, or ongoing operations. The business pays the premium and receives liquidity upon claim to recapitalize operations, settle loans, or recruit replacement leadership without equity dilution.',
    rangoliPattern: 'surya',
    accentColor: '#2563EB',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    badge: 'Enterprise Business Continuity',
    minEntryAge: '18 years',
    maxEntryAge: '65 years',
    maturityAge: '75 years',
    minSumAssured: '₹25,00,000 (No upper cap, based on business profit multiples)',
    policyTerm: '5 to 30 years',
    premiumFrequency: ['Yearly', 'Half-yearly'],
    keyBenefits: [
      'Operational Stability: Immediate liquidity infusion to stabilize customer orders and bank credit.',
      'Protects Credit Ratings: Prevents credit freeze or loan recalls by lenders during leadership transitions.',
      'Corporate Balance Sheet Shield: Safeguards enterprise valuation and investor confidence.',
      'Section 37(1) Deductibility: Premiums treated as standard business expenses.'
    ],
    taxBenefits: [
      'Employer deducts premium under Section 37(1) as cost incurred wholly for business purposes.',
      'Proceeds protect corporate balance sheet and cash flows.'
    ],
    guarantees: 'Guaranteed corporate liquidity disbursement upon critical event.',
    defaultSumAssured: 10000000,
    defaultTerm: 10,
    sampleAnnualPremium: 82000,
    sampleMaturityAmount: 10000000,
    brochureHighlights: [
      {
        title: 'Safeguard Bank Lines',
        description: 'Lenders often mandate Keyman insurance to maintain active working capital limits.'
      },
      {
        title: 'Succession Funding',
        description: 'Liquid funds to recruit top executive talent during unexpected corporate crises.'
      }
    ]
  },
  {
    id: 'sbi-kalyan-gratuity',
    name: 'SBI Life - Kalyan ULIP Plus (Group Gratuity & Superannuation)',
    category: 'employer-employee',
    categoryLabel: 'Employer-Employee Plan',
    tagline: 'Statutory Gratuity Funding & Employer-Employee Superannuation',
    shortDesc: 'A unit-linked group solution ensuring statutory compliance with the Payment of Gratuity Act, 1972 while earning market yields on corporate reserves.',
    longDesc: 'Enables employers to systematically fund future employee gratuity liabilities and executive retirement reserves. Managed by SBI Life’s expert fund managers across Debt, Balanced, and Equity funds, ensuring the company never faces sudden cash flow shocks when senior staff retire.',
    rangoliPattern: 'surya',
    accentColor: '#0D9488',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-600',
    badge: 'Statutory Gratuity & Superannuation',
    minEntryAge: '18 years',
    maxEntryAge: '75 years',
    maturityAge: 'Retirement age (58 to 65 years)',
    minSumAssured: '₹10,00,000 Group Trust Fund',
    policyTerm: 'Annually renewable group fund',
    premiumFrequency: ['Yearly', 'Half-yearly', 'Quarterly'],
    keyBenefits: [
      'Actuarial Solvency: Seamless compliance with Payment of Gratuity Act, 1972 and AS-15 / Ind AS-19 accounting standards.',
      'Section 36(1)(v) Corporate Tax Shield: Contributions to approved gratuity trust are 100% tax deductible.',
      'Market-Linked Fund Growth: Choice of 5 institutional funds from Conservative Debt to High Growth Equity.',
      'Group Term Life Cover: Includes life cover for all registered employees.'
    ],
    taxBenefits: [
      'Employer contributions deductible under Section 36(1)(v) of Income Tax Act.',
      'Gratuity payout tax-free for employees up to statutory limit (₹20 Lakhs) under Section 10(10).'
    ],
    guarantees: 'Systematic actuarial funding backed by SBI Life institutional asset management.',
    defaultSumAssured: 2500000,
    defaultTerm: 5,
    sampleAnnualPremium: 250000,
    sampleMaturityAmount: 3800000,
    brochureHighlights: [
      {
        title: 'Statutory Gratuity Act Compliance',
        description: 'Shields company from lump sum employee exit costs by accumulating a dedicated tax-approved corpus.'
      },
      {
        title: 'Professional Fund Management',
        description: 'Backed by State Bank of India investment credentials with transparent institutional NAV reporting.'
      }
    ]
  }
];
