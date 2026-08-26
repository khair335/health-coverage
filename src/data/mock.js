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
    name: 'Maria G.',
    phone: '(732) 555-0144',
    email: 'maria.g@example.com',
    state: 'NJ',
    zip: '07746',
    language: 'English',
    status: 'New',
    urgency: 'High',
    recommendation: 'Horizon Silver Care 3000',
    path: 'Marketplace + possible public screening',
    lastContact: '—',
    nextAction: 'Call within 1 business day',
    created: 'Aug 19, 2026',
    household: '3 people (45, 42, 12)',
    income: '$42,000 / year (estimate)',
    coverage: 'None; no employer coverage offered',
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
