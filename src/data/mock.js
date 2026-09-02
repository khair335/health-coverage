export const languages = [
  { code: 'en', label: 'English' },
  { code: 'ht', label: 'Kreyòl Ayisyen' },
]

export const states = [
  { code: 'NJ', name: 'New Jersey', supported: true },
  { code: 'NY', name: 'New York', supported: false },
  { code: 'FL', name: 'Florida', supported: false },
  { code: 'PA', name: 'Pennsylvania', supported: false },
]

export const njZips = {
  '07746': { city: 'Marlboro', county: 'Monmouth' },
  '07102': { city: 'Newark', county: 'Essex' },
  '08608': { city: 'Trenton', county: 'Mercer' },
  '08201': { city: 'Absecon', county: 'Atlantic' },
  '07030': { city: 'Hoboken', county: 'Hudson' },
}

export const relationships = [
  'Self',
  'Spouse / partner',
  'Child',
  'Parent',
  'Other dependent',
]

export const incomeRanges = [
  { id: 'under25', label: 'Under $25,000', annual: 20000 },
  { id: '25to40', label: '$25,000 – $40,000', annual: 32500 },
  { id: '40to60', label: '$40,000 – $60,000', annual: 50000 },
  { id: '60to80', label: '$60,000 – $80,000', annual: 70000 },
  { id: 'over80', label: 'Over $80,000', annual: 95000 },
]

export const priorityOptions = [
  { id: 'premium', label: 'Lowest monthly premium' },
  { id: 'deductible', label: 'Lower deductible' },
  { id: 'copay', label: 'Predictable copays' },
  { id: 'doctors', label: 'Keep my doctors' },
  { id: 'prescriptions', label: 'Prescription coverage' },
  { id: 'specialist', label: 'Specialist / chronic care' },
  { id: 'moop', label: 'Low max out-of-pocket' },
]

export const usageOptions = [
  { id: 'rarely', label: 'Rarely see a doctor' },
  { id: 'sometimes', label: 'A few visits a year' },
  { id: 'often', label: 'Regular care or specialists' },
  { id: 'unsure', label: 'I’m not sure' },
]

export const mockProviders = [
  { id: 'p1', name: 'Dr. Amina Rahman, Family Medicine', city: 'Newark' },
  { id: 'p2', name: 'Dr. Michael Chen, Internal Medicine', city: 'Hoboken' },
  { id: 'p3', name: 'Harbor Pediatrics', city: 'Marlboro' },
  { id: 'p4', name: 'Dr. Elena Vasquez, Cardiology', city: 'Trenton' },
]

export const mockMedications = [
  { id: 'm1', name: 'Metformin 500mg' },
  { id: 'm2', name: 'Lisinopril 10mg' },
  { id: 'm3', name: 'Atorvastatin 20mg' },
  { id: 'm4', name: 'Albuterol inhaler' },
  { id: 'm5', name: 'Levothyroxine 50mcg' },
]

export const paths = [
  {
    id: 'public',
    title: 'Public coverage (Medicaid / NJ FamilyCare)',
    status: 'may_qualify',
    statusLabel: 'May qualify — needs verification',
    blurb:
      'Based on household size and estimated income, you may qualify for public coverage. An official program — not this website — makes the final decision.',
    primary: true,
  },
  {
    id: 'marketplace',
    title: 'ACA Marketplace plan',
    status: 'likely',
    statusLabel: 'Likely eligible',
    blurb:
      'You can compare health plans for your ZIP code. A licensed producer can help you enroll through the official Marketplace or carrier.',
    primary: false,
  },
  {
    id: 'charity',
    title: 'Charity care & community clinics',
    status: 'available',
    statusLabel: 'Available in your area',
    blurb:
      'If insurance is unaffordable, hospital financial assistance and community health centers can still help you get care.',
    primary: false,
  },
]

export const plans = [
  {
    id: 'PLAN-XYZ',
    name: 'Horizon Silver Care 3000',
    carrier: 'Horizon NJ Health Plans (sample)',
    metal: 'Silver',
    network: 'HMO',
    premium: 312,
    deductible: 3000,
    moop: 8700,
    pcp: 30,
    specialist: 60,
    providersInNetwork: ['p1', 'p3'],
    drugs: ['m1', 'm2', 'm5'],
    annualEstimate: 5400,
    strengths: [
      'Lower estimated annual cost for expected usage',
      'Preferred physician appears in this sample network',
      'Common maintenance medications are listed as covered in sample data',
    ],
    tradeoffs: ['Monthly premium is higher than the lowest-cost option'],
    bestFit: true,
  },
  {
    id: 'PLAN-ABC',
    name: 'AmeriHealth Bronze Essential',
    carrier: 'AmeriHealth (sample)',
    metal: 'Bronze',
    network: 'EPO',
    premium: 248,
    deductible: 7200,
    moop: 9200,
    pcp: 50,
    specialist: 90,
    providersInNetwork: ['p2'],
    drugs: ['m1', 'm3'],
    annualEstimate: 7100,
    strengths: ['Lowest monthly premium in this sample set'],
    tradeoffs: ['Higher deductible if you need care this year'],
    bestFit: false,
  },
  {
    id: 'PLAN-DEF',
    name: 'Oscar Gold Standard',
    carrier: 'Oscar (sample)',
    metal: 'Gold',
    network: 'PPO',
    premium: 421,
    deductible: 1500,
    moop: 6500,
    pcp: 20,
    specialist: 40,
    providersInNetwork: ['p1', 'p2', 'p4'],
    drugs: ['m1', 'm2', 'm3', 'm4'],
    annualEstimate: 6200,
    strengths: ['Lower deductible and broader sample network'],
    tradeoffs: ['Highest monthly premium of the three options'],
    bestFit: false,
  },
]

export const assistanceResources = [
  {
    id: 'a1',
    title: 'NJ Hospital Charity Care',
    type: 'Charity care',
    summary:
      'Many New Jersey hospitals offer financial assistance if you cannot afford a hospital bill. Eligibility is based on income and household size.',
    action: 'Ask the hospital billing office for a charity-care application.',
    sourceDate: 'Aug 2026 (sample)',
  },
  {
    id: 'a2',
    title: 'Federally Qualified Health Center (FQHC)',
    type: 'Community clinic',
    summary:
      'Community health centers provide primary care on a sliding fee scale. You do not need insurance to make an appointment.',
    action: 'Search clinics near your ZIP through HRSA’s locator (official site).',
    sourceDate: 'Aug 2026 (sample)',
  },
  {
    id: 'a3',
    title: 'NJ FamilyCare application',
    type: 'Public program',
    summary:
      'If public coverage may apply, a licensed producer can explain next steps. Final eligibility is decided by the official program.',
    action: 'Your producer can point you to the official NJ FamilyCare path.',
    sourceDate: 'Aug 2026 (sample)',
  },
]

export const agentCases = [
  {
    id: 'CASE-100234',
    name: 'Sarah Mitchell',
    phone: '(732) 555-0189',
    email: 'sarah.mitchell@example.com',
    state: 'NJ',
    zip: '07746',
    county: 'Marlboro, Monmouth County',
    language: 'English',
    status: 'New',
    urgency: 'High',
    recommendation: 'Horizon Silver Care 3000',
    path: 'ACA Marketplace with financial assistance',
    lastContact: 'Aug 25, 2026',
    nextAction: 'Call within 1 business day — review Silver plan options',
    created: 'Aug 24, 2026',
    household: '3 people (ages 42, 40, 12)',
    income: '$42,000 / year (estimate)',
    coverage: 'None; no employer coverage offered',
    preferredContact: 'Phone',
    bestTime: 'Weekday mornings',
  },
  {
    id: 'CASE-100235',
    name: 'Jean-Pierre L.',
    phone: '(973) 555-0190',
    email: 'jp.l@example.com',
    state: 'NJ',
    zip: '07102',
    language: 'Kreyòl Ayisyen',
    status: 'Contacted',
    urgency: 'Medium',
    recommendation: 'Public coverage screening first',
    path: 'NJ FamilyCare candidate',
    lastContact: 'Aug 18, 2026',
    nextAction: 'Collect income documents',
    created: 'Aug 17, 2026',
    household: '2 people (38, 9)',
    income: 'Range $25k–$40k',
    coverage: 'Lost coverage 6 weeks ago',
  },
  {
    id: 'CASE-100236',
    name: 'Aisha K.',
    phone: '(609) 555-0162',
    email: 'aisha.k@example.com',
    state: 'NJ',
    zip: '08608',
    language: 'English',
    status: 'Needs Information',
    urgency: 'Low',
    recommendation: 'AmeriHealth Bronze Essential',
    path: 'Marketplace',
    lastContact: 'Aug 16, 2026',
    nextAction: 'Confirm doctor network',
    created: 'Aug 15, 2026',
    household: '1 person (29)',
    income: '$58,000 / year',
    coverage: 'Employer coverage offered but declined',
  },
]

export const caseStatuses = [
  'New',
  'Contacted',
  'Needs Information',
  'Recommendation Verified',
  'Enrollment Started',
  'Enrolled',
  'Referred to Assistance',
  'Closed',
]

export const coveragePathCards = [
  {
    id: 'marketplace',
    title: 'ACA Marketplace Plan',
    subtitle: 'with Financial Assistance',
    badge: 'BEST MATCH',
    status: 'You may qualify for savings',
    premium: '$172 – $204 / month after estimated savings',
    features: [
      'Comprehensive medical coverage',
      'Preventive care at no cost',
      'Essential health benefits included',
      'Tax credits may lower your premium',
    ],
    best: true,
  },
  {
    id: 'medicaid',
    title: 'Medicaid / NJ FamilyCare',
    subtitle: '(Public Coverage)',
    badge: null,
    status: 'You may be eligible',
    premium: '$0 / month if eligible',
    features: [
      'Low or $0 monthly premium',
      'Doctor visits and hospital care',
      'Prescription coverage',
      'No deductible for most services',
    ],
    best: false,
  },
  {
    id: 'private',
    title: 'Private Health Insurance',
    subtitle: '(Off-Marketplace)',
    badge: null,
    status: 'More plan choices',
    premium: '$280 – $620+ / month before savings',
    features: [
      'Multiple carriers and plan designs',
      'Different deductible options',
      'Flexible network choices',
      'May not qualify for tax credits',
    ],
    best: false,
  },
]

export const coverageValueRows = [
  { label: 'Monthly premium (before assistance)', icon: 'dollar' },
  { label: 'Monthly premium (after assistance)', icon: 'dollar' },
  { label: 'Financial assistance', icon: 'gift' },
  { label: 'Deductible', icon: 'shield' },
  { label: 'Out-of-pocket maximum', icon: 'shield' },
  { label: 'Estimated annual out-of-pocket', icon: 'chart' },
  { label: 'NJ Individual Mandate', icon: 'clipboard' },
  { label: 'Coverage strength', icon: 'activity' },
  { label: 'Overall value', icon: 'star' },
]

export const coverageValuePlans = [
  {
    id: 'marketplace',
    title: 'ACA Marketplace Plan',
    subtitle: 'Horizon Silver Care 3000',
    badge: 'BEST VALUE',
    values: [
      '$312',
      '$172',
      'Up to $140/mo',
      '$3,000',
      '$6,500',
      '$1,800 – $3,200',
      'Compliant',
      'Strong',
      'Best overall',
    ],
    best: true,
  },
  {
    id: 'medicaid',
    title: 'Medicaid / NJ FamilyCare',
    subtitle: 'Public coverage path',
    badge: null,
    values: ['$0', '$0', 'Full subsidy', '$0', '$0', '$0 – $500', 'Compliant', 'Comprehensive', 'Highest if eligible'],
    best: false,
  },
  {
    id: 'private',
    title: 'Private Health Insurance',
    subtitle: 'Off-Marketplace option',
    badge: null,
    values: ['$620', '$620', 'None', '$5,000', '$8,200', '$3,500 – $6,000', 'Compliant', 'Flexible', 'Higher cost'],
    best: false,
  },
]

export const coveragePlanDetails = {
  marketplace: {
    type: 'ACA Marketplace Plan',
    subtitle: 'with Financial Assistance',
    name: 'Horizon Silver Care 3000',
    metal: 'Silver Plan',
    badge: 'BEST VALUE',
    quickFacts: [
      { label: 'Network', value: 'Horizon Blue Cross Blue Shield', icon: 'globe' },
      { label: 'Plan Type', value: 'Silver Metal Level', icon: 'hospital' },
      { label: 'Service Area', value: 'New Jersey (Statewide)', icon: 'mapPin' },
      { label: 'Plan Year', value: '2026', icon: 'calendar' },
    ],
    covered: [
      'Doctor visits & preventive care',
      'Specialist visits',
      'Emergency room care',
      'Hospital stays & surgery',
      'Prescription drugs (formulary)',
      'Mental health & substance use',
      'Maternity & newborn care',
      'Lab tests, X-rays & imaging',
      'Physical therapy & rehab',
      'Pediatric dental & vision (child plans)',
    ],
    costs: [
      { label: 'Deductible', value: '$3,000', icon: 'shield' },
      { label: 'Coinsurance', value: '20%', icon: 'chart' },
      { label: 'Out-of-Pocket Max', value: '$6,500', icon: 'dollar' },
      { label: 'Preventive Care', value: '$0', icon: 'checkBadge' },
    ],
    copays: [
      { label: 'Primary Care Visit', value: '$30', icon: 'stethoscope' },
      { label: 'Specialist Visit', value: '$60', icon: 'userRound' },
      { label: 'Urgent Care', value: '$75', icon: 'hospital' },
      { label: 'Emergency Room', value: '$300', icon: 'ambulance' },
      { label: 'Generic Drugs', value: '$10–$20', icon: 'pill' },
    ],
    networkComparison: {
      in: 'You pay the lowest costs when you use doctors, hospitals, and pharmacies that are in the plan network. Most care is covered after deductible and coinsurance.',
      out: 'Out-of-network care costs more. You may pay higher coinsurance, and providers may bill you for the difference (balance billing) unless it is an emergency.',
    },
    keyLimits: [
      'Prior authorization may be required for MRI, specialty drugs, and some surgeries.',
      'Prescription coverage follows the plan formulary — non-formulary drugs cost more.',
      'Out-of-network care is not covered except for emergencies.',
      'Specialty drugs may require step therapy or prior approval.',
      'Telehealth visits may have a separate copay depending on service type.',
    ],
  },
  medicaid: {
    type: 'Medicaid / NJ FamilyCare',
    subtitle: 'Public Coverage Program',
    name: 'NJ FamilyCare (Managed Care)',
    metal: 'Public program',
    badge: 'PUBLIC COVERAGE',
    quickFacts: [
      { label: 'Network', value: 'NJ Medicaid MCOs', icon: 'globe' },
      { label: 'Plan Type', value: 'Public / Medicaid', icon: 'building' },
      { label: 'Service Area', value: 'New Jersey', icon: 'mapPin' },
      { label: 'Plan Year', value: '2026', icon: 'calendar' },
    ],
    covered: [
      'Primary & specialist doctor visits',
      'Hospital & emergency services',
      'Prescription drugs',
      'Pediatric dental & vision',
      'Maternity & postpartum care',
      'Mental health & substance use treatment',
      'Preventive screenings & vaccines',
      'Long-term services (if eligible)',
      'Family planning services',
      'Medical transportation (when approved)',
    ],
    costs: [
      { label: 'Monthly Premium', value: '$0', icon: 'dollar' },
      { label: 'Deductible', value: '$0', icon: 'shield' },
      { label: 'Out-of-Pocket Max', value: '$0', icon: 'dollar' },
      { label: 'Preventive Care', value: '$0', icon: 'checkBadge' },
    ],
    copays: [
      { label: 'Primary Care', value: '$0–$5', icon: 'stethoscope' },
      { label: 'Specialist', value: '$0–$10', icon: 'userRound' },
      { label: 'Emergency Room', value: '$0–$25', icon: 'ambulance' },
      { label: 'Generic Drugs', value: '$0–$3', icon: 'pill' },
      { label: 'Urgent Care', value: '$0–$5', icon: 'hospital' },
    ],
    networkComparison: {
      in: 'NJ FamilyCare uses managed care organizations. You must use providers in your MCO network for routine care.',
      out: 'Emergency services are covered. Non-emergency out-of-network care may not be paid.',
    },
    keyLimits: [
      'Eligibility must be confirmed by NJ FamilyCare — this screening is not a final decision.',
      'Income and household changes must be reported within 10 days.',
      'Some services require prior authorization from your MCO.',
      'Dental for adults may be limited depending on plan.',
    ],
  },
  private: {
    type: 'Private Health Insurance',
    subtitle: 'Off-Marketplace Option',
    name: 'Private PPO Select 5000',
    metal: 'Private PPO plan',
    badge: 'PRIVATE',
    quickFacts: [
      { label: 'Network', value: 'National PPO Network', icon: 'globe' },
      { label: 'Plan Type', value: 'PPO', icon: 'hospital' },
      { label: 'Service Area', value: 'Multi-state', icon: 'mapPin' },
      { label: 'Plan Year', value: '2026', icon: 'calendar' },
    ],
    covered: [
      'Nationwide in-network provider access',
      'Specialist visits without referral (PPO)',
      'Emergency coverage anywhere in U.S.',
      'Prescription drug benefits',
      'Telehealth & virtual visits',
      'Wellness & preventive programs',
      'Maternity hospital stays',
      'Outpatient surgery',
      'Diagnostic imaging',
      'Mental health outpatient care',
    ],
    costs: [
      { label: 'Deductible', value: '$5,000', icon: 'shield' },
      { label: 'Coinsurance', value: '30%', icon: 'chart' },
      { label: 'Out-of-Pocket Max', value: '$8,200', icon: 'dollar' },
      { label: 'Monthly Premium', value: '~$620', icon: 'dollar' },
    ],
    copays: [
      { label: 'Primary Care', value: '$50', icon: 'stethoscope' },
      { label: 'Specialist', value: '$90', icon: 'userRound' },
      { label: 'Urgent Care', value: '$100', icon: 'hospital' },
      { label: 'Emergency Room', value: '$500', icon: 'ambulance' },
      { label: 'Generic Drugs', value: '$25', icon: 'pill' },
    ],
    networkComparison: {
      in: 'PPO plans offer flexibility to see in-network providers at lower cost. No referral needed for specialists in network.',
      out: 'You can see out-of-network providers but pay significantly higher coinsurance and may face balance billing.',
    },
    keyLimits: [
      'Tax credits and cost-sharing reductions do not apply to off-Marketplace plans.',
      'Pre-existing conditions covered — no medical underwriting for ACA-compliant plans.',
      'Annual open enrollment windows apply unless you qualify for SEP.',
      'Out-of-network costs are your responsibility above plan limits.',
    ],
  },
}

export const dashboardStats = [
  { label: 'Total Clients', value: 32, color: 'indigo', icon: 'users' },
  { label: 'Needs Help Choosing', value: 6, color: 'amber', icon: 'handHeart' },
  { label: 'Follow-Ups Due', value: 9, color: 'orange', icon: 'calendar' },
  { label: 'Applications', value: 7, color: 'violet', icon: 'document' },
  { label: 'Enrolled / Policies', value: 5, color: 'emerald', icon: 'shieldCheck' },
]

const statBg = {
  indigo: 'bg-indigo-50 text-indigo-600',
  amber: 'bg-amber-50 text-amber-600',
  orange: 'bg-orange-50 text-orange-600',
  violet: 'bg-violet-50 text-violet-600',
  emerald: 'bg-emerald-50 text-emerald-600',
}

export { statBg }

const baseDashboardClients = [
  {
    id: 'CASE-100234',
    name: 'Sarah Mitchell',
    phone: '(732) 555-0189',
    initials: 'SM',
    avatarBg: 'bg-violet-100 text-violet-700',
    status: 'Needs Help Choosing',
    statusTone: 'amber',
    pathNeed: 'Cost savings',
    pathPlan: 'ACA Marketplace',
    pathIcon: 'dollar',
    lastContact: 'Aug 25, 2025',
    nextFollowUp: 'Aug 28, 2025',
    nextFollowUpTime: '10:00 AM',
    priority: 'High',
    updated: 'Aug 25, 2025',
  },
  {
    id: 'CASE-100235',
    name: 'Michael Torres',
    phone: '(973) 555-0190',
    initials: 'MT',
    avatarBg: 'bg-blue-100 text-blue-700',
    status: 'Contacted',
    statusTone: 'blue',
    pathNeed: 'Doctor network',
    pathPlan: 'Horizon OMNIA',
    pathIcon: 'stethoscope',
    lastContact: 'Aug 27, 2025',
    nextFollowUp: 'Sep 1, 2025',
    nextFollowUpTime: '2:00 PM',
    priority: 'Medium',
    updated: 'Aug 27, 2025',
  },
  {
    id: 'CASE-100236',
    name: 'Emily Brooks',
    phone: '(609) 555-0162',
    initials: 'EB',
    avatarBg: 'bg-purple-100 text-purple-700',
    status: 'Quote Sent',
    statusTone: 'violet',
    pathNeed: 'Family coverage',
    pathPlan: 'AmeriHealth',
    pathIcon: 'users',
    lastContact: 'Aug 25, 2025',
    nextFollowUp: 'Sep 2, 2025',
    nextFollowUpTime: '11:00 AM',
    priority: 'Medium',
    updated: 'Aug 25, 2025',
  },
  {
    id: 'CASE-100237',
    name: 'Carlos Mendez',
    phone: '(856) 555-0188',
    initials: 'CM',
    avatarBg: 'bg-rose-100 text-rose-700',
    status: 'Application In Progress',
    statusTone: 'rose',
    pathNeed: 'Bronze plan',
    pathPlan: 'AmeriHealth Bronze',
    pathIcon: 'clipboard',
    lastContact: 'Aug 29, 2025',
    nextFollowUp: 'Sep 3, 2025',
    nextFollowUpTime: '9:30 AM',
    priority: 'High',
    updated: 'Aug 29, 2025',
  },
  {
    id: 'CASE-100238',
    name: 'Rachel Kim',
    phone: '(732) 555-0144',
    initials: 'RK',
    avatarBg: 'bg-slate-100 text-slate-700',
    status: 'New Lead',
    statusTone: 'slate',
    pathNeed: 'First-time buyer',
    pathPlan: 'Marketplace screening',
    pathIcon: 'sparkles',
    lastContact: 'Aug 28, 2025',
    nextFollowUp: 'Sep 2, 2025',
    nextFollowUpTime: '1:00 PM',
    priority: 'High',
    updated: 'Aug 28, 2025',
  },
  {
    id: 'CASE-100239',
    name: 'Thomas Wright',
    phone: '(201) 555-0177',
    initials: 'TW',
    avatarBg: 'bg-amber-100 text-amber-700',
    status: 'New Lead',
    statusTone: 'slate',
    pathNeed: 'Cost savings',
    pathPlan: 'ACA Marketplace',
    pathIcon: 'dollar',
    lastContact: 'Aug 26, 2025',
    nextFollowUp: 'Aug 30, 2025',
    nextFollowUpTime: '3:00 PM',
    priority: 'Medium',
    updated: 'Aug 26, 2025',
  },
  {
    id: 'CASE-100240',
    name: 'Sofia Patel',
    phone: '(908) 555-0122',
    initials: 'SP',
    avatarBg: 'bg-teal-100 text-teal-700',
    status: 'Needs Help Choosing',
    statusTone: 'amber',
    pathNeed: 'Senior coverage',
    pathPlan: 'Medicare Advantage',
    pathIcon: 'shield',
    lastContact: 'Aug 24, 2025',
    nextFollowUp: 'Sep 4, 2025',
    nextFollowUpTime: '10:00 AM',
    priority: 'Medium',
    updated: 'Aug 24, 2025',
  },
  {
    id: 'CASE-100241',
    name: 'Daniel Harris',
    phone: '(551) 555-0199',
    initials: 'DH',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    status: 'Enrolled',
    statusTone: 'emerald',
    pathNeed: 'Silver plan',
    pathPlan: 'Horizon Silver',
    pathIcon: 'checkBadge',
    lastContact: 'Aug 29, 2025',
    nextFollowUp: '—',
    nextFollowUpTime: '',
    priority: 'Low',
    updated: 'Aug 29, 2025',
  },
]

const _clientTemplates = {
  statuses: [
    { status: 'Needs Help Choosing', statusTone: 'amber' },
    { status: 'Contacted', statusTone: 'blue' },
    { status: 'Quote Sent', statusTone: 'violet' },
    { status: 'Application In Progress', statusTone: 'rose' },
    { status: 'New Lead', statusTone: 'slate' },
    { status: 'Follow-Up', statusTone: 'violet' },
    { status: 'Enrolled', statusTone: 'emerald' },
    { status: 'Application Submitted', statusTone: 'emerald' },
  ],
  paths: [
    { pathNeed: 'Cost savings', pathPlan: 'ACA Marketplace', pathIcon: 'dollar' },
    { pathNeed: 'Doctor network', pathPlan: 'Horizon OMNIA', pathIcon: 'stethoscope' },
    { pathNeed: 'Public coverage', pathPlan: 'NJ FamilyCare', pathIcon: 'shield' },
    { pathNeed: 'Low premium', pathPlan: 'Oscar Silver', pathIcon: 'dollar' },
    { pathNeed: 'Family coverage', pathPlan: 'AmeriHealth', pathIcon: 'users' },
    { pathNeed: 'Specialist care', pathPlan: 'Horizon Silver', pathIcon: 'hospital' },
  ],
  avatars: [
    'bg-violet-100 text-violet-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-rose-100 text-rose-700',
    'bg-amber-100 text-amber-700',
    'bg-teal-100 text-teal-700',
    'bg-sky-100 text-sky-700',
    'bg-indigo-100 text-indigo-700',
  ],
  names: [
    'Patricia Nguyen', 'Jean-Pierre L.', 'Aisha Khan', 'Robert Chen',
    'Maria Gomez', 'David Ortiz', 'Linda Wu', 'James Foster',
    'Olivia Martin', 'Kevin Johnson', 'Hannah Lee', 'Marcus Brown',
    'Jessica Adams', 'Ryan Cooper', 'Nina Singh', 'Chris Evans',
    'Amanda White', 'Brian Clark', 'Diana Ross', 'Eric Martinez',
    'Laura Green', 'Steven Hall', 'Michelle Young', 'Andrew King',
  ],
}

const _baseDashboardClients = baseDashboardClients

export const dashboardClients = (() => {
  const list = [..._baseDashboardClients]
  let n = 242
  for (const name of _clientTemplates.names) {
    if (list.length >= 32) break
    const parts = name.split(' ')
    const st = _clientTemplates.statuses[list.length % _clientTemplates.statuses.length]
    const path = _clientTemplates.paths[list.length % _clientTemplates.paths.length]
    const pri = ['High', 'Medium', 'Low'][list.length % 3]
    list.push({
      id: `CASE-100${n}`,
      name,
      phone: `(732) 555-${String(1000 + list.length).slice(-4)}`,
      initials: `${parts[0][0]}${parts[1][0]}`,
      avatarBg: _clientTemplates.avatars[list.length % _clientTemplates.avatars.length],
      ...st,
      ...path,
      lastContact: `Aug ${20 + (list.length % 8)}, 2026`,
      nextFollowUp: pri === 'Low' ? '—' : `Sep ${1 + (list.length % 5)}, 2026`,
      nextFollowUpTime: pri === 'Low' ? '' : `${9 + (list.length % 4)}:00 AM`,
      priority: pri,
      updated: `Aug ${20 + (list.length % 8)}, 2026`,
    })
    n += 1
  }
  return list
})()

export const clientRecords = {
  'CASE-100234': {
    assessment: {
      location: 'New Jersey · ZIP 07746 (Marlboro)',
      priorities: ['Lowest monthly premium', 'Keep my doctors', 'Low out-of-pocket costs'],
      usage: 'A few visits a year (1–3 times)',
      pathsReviewed: ['ACA Marketplace Plan', 'Medicaid / NJ FamilyCare', 'Private Health Insurance'],
      selectedPlan: 'Horizon Silver Care 3000',
      estimatedPremium: '$172 / month after assistance',
    },
    screening: {
      medicaidEligible: 'Possible — needs income verification',
      marketplaceSubsidy: 'Up to $140/month estimated',
      sepEligible: 'No recent coverage loss reported',
      mandateCompliant: 'Yes — with selected plan',
    },
    timeline: [
      { date: 'Aug 24, 2026 2:15 PM', event: 'Assessment completed', detail: '4-step screening finished online' },
      { date: 'Aug 24, 2026 2:16 PM', event: 'Recommendation generated', detail: 'Horizon Silver Care 3000 — BEST VALUE' },
      { date: 'Aug 25, 2026 10:30 AM', event: 'Consent captured', detail: 'Client agreed to broker contact' },
      { date: 'Aug 25, 2026 11:00 AM', event: 'Assigned to producer', detail: 'Jean Marc Dube' },
    ],
    followUps: [
      { date: 'Aug 28, 2026', time: '10:00 AM', type: 'Phone call', note: 'Review plan options and subsidy estimate' },
      { date: 'Sep 2, 2026', time: '10:00 AM', type: 'Follow-up', note: 'Confirm doctor network if no response' },
    ],
    documents: [
      { name: 'Assessment Summary.pdf', date: 'Aug 24, 2026', type: 'PDF' },
      { name: 'Plan Comparison — Step 4.pdf', date: 'Aug 24, 2026', type: 'PDF' },
      { name: 'Consent Disclosure v2026-08-19', date: 'Aug 25, 2026', type: 'Consent' },
    ],
    tasks: [
      { task: 'Verify household income documents', due: 'Aug 30, 2026', done: false },
      { task: 'Confirm PCP in Horizon network', due: 'Aug 31, 2026', done: false },
      { task: 'Send plan summary email', due: 'Aug 28, 2026', done: true },
    ],
  },
  'CASE-100235': {
    assessment: {
      location: 'New Jersey · ZIP 07102 (Newark)',
      priorities: ['Public program screening', 'Prescription coverage'],
      usage: 'Regular care or specialists',
      pathsReviewed: ['Medicaid / NJ FamilyCare', 'ACA Marketplace Plan'],
      selectedPlan: 'NJ FamilyCare screening',
      estimatedPremium: '$0 if eligible',
    },
    screening: {
      medicaidEligible: 'Likely eligible — pending verification',
      marketplaceSubsidy: 'N/A if Medicaid approved',
      sepEligible: 'Yes — lost coverage 6 weeks ago',
      mandateCompliant: 'Pending enrollment',
    },
    timeline: [
      { date: 'Aug 17, 2026 4:00 PM', event: 'Assessment completed', detail: '4-step screening finished online' },
      { date: 'Aug 18, 2026 9:00 AM', event: 'Outbound call', detail: 'Left voicemail — requested income docs' },
    ],
    followUps: [
      { date: 'Sep 1, 2026', time: '2:00 PM', type: 'Phone call', note: 'Collect pay stubs and ID' },
    ],
    documents: [
      { name: 'Assessment Summary.pdf', date: 'Aug 17, 2026', type: 'PDF' },
    ],
    tasks: [
      { task: 'Request income verification', due: 'Sep 1, 2026', done: false },
      { task: 'Submit NJ FamilyCare referral', due: 'Sep 5, 2026', done: false },
    ],
  },
  'CASE-100236': {
    assessment: {
      location: 'New Jersey · ZIP 08608 (Trenton)',
      priorities: ['Lower deductible', 'Specialist access'],
      usage: 'A few visits a year',
      pathsReviewed: ['ACA Marketplace Plan', 'Private Health Insurance'],
      selectedPlan: 'AmeriHealth Bronze Essential',
      estimatedPremium: '$198 / month after assistance',
    },
    screening: {
      medicaidEligible: 'Unlikely at stated income',
      marketplaceSubsidy: 'Moderate subsidy estimated',
      sepEligible: 'No',
      mandateCompliant: 'Yes',
    },
    timeline: [
      { date: 'Aug 15, 2026 1:00 PM', event: 'Assessment completed', detail: '4-step screening finished online' },
      { date: 'Aug 16, 2026 3:30 PM', event: 'Doctor network check', detail: 'Specialist not in network — alternative suggested' },
    ],
    followUps: [],
    documents: [
      { name: 'Assessment Summary.pdf', date: 'Aug 15, 2026', type: 'PDF' },
      { name: 'Network Check Results', date: 'Aug 16, 2026', type: 'Note' },
    ],
    tasks: [
      { task: 'Confirm alternative specialist in network', due: 'Aug 20, 2026', done: true },
    ],
  },
}

export function getClientRecord(caseId) {
  if (clientRecords[caseId]) return clientRecords[caseId]
  return {
    assessment: {
      location: 'New Jersey',
      priorities: ['Coverage screening completed'],
      usage: 'Not specified',
      pathsReviewed: ['ACA Marketplace Plan'],
      selectedPlan: 'Pending review',
      estimatedPremium: 'TBD',
    },
    screening: {
      medicaidEligible: 'Not screened',
      marketplaceSubsidy: 'Pending',
      sepEligible: 'Unknown',
      mandateCompliant: 'Pending',
    },
    timeline: [{ date: 'Recently', event: 'Case opened', detail: 'Awaiting full assessment review' }],
    followUps: [],
    documents: [],
    tasks: [{ task: 'Complete initial client review', due: 'This week', done: false }],
  }
}
