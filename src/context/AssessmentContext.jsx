import { createContext, useContext, useMemo, useState } from 'react'
import { incomeRanges, njZips, plans } from '../data/mock'

const STORAGE_KEY = 'hcn-assessment'

const emptyMember = (n = 1) => ({
  id: crypto.randomUUID(),
  relationship: n === 1 ? 'Self' : 'Child',
  age: '',
  dependent: n !== 1,
})

function makeDefault() {
  return {
    language: 'en',
    state: 'NJ',
    zip: '',
    county: '',
    zipError: '',
    members: [emptyMember(1)],
    incomeMode: 'exact',
    incomePeriod: 'annual',
    incomeAmount: '',
    incomeRangeId: '',
    employerCoverage: '',
    currentCoverage: '',
    coverageLoss: '',
    pregnancy: '',
    disability: '',
    medicare: '',
    residency: '',
    immigration: '',
    unsureEligibility: false,
    priorities: [],
    usage: '',
    budget: '',
    unsureNeeds: false,
    providers: [],
    medications: [],
    selectedPlanId: 'PLAN-XYZ',
    compareIds: ['PLAN-XYZ', 'PLAN-ABC', 'PLAN-DEF'],
    contact: {
      name: '',
      phone: '',
      email: '',
      method: 'phone',
      time: '',
      language: 'en',
      consentContact: false,
      consentShare: false,
    },
    caseId: '',
  }
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return makeDefault()
    return { ...makeDefault(), ...JSON.parse(raw) }
  } catch {
    return makeDefault()
  }
}

const AssessmentContext = createContext(null)

export function AssessmentProvider({ children }) {
  const [data, setData] = useState(loadState)

  const update = (patch) => {
    setData((prev) => {
      const next = { ...prev, ...patch }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const updateContact = (patch) => {
    setData((prev) => {
      const next = { ...prev, contact: { ...prev.contact, ...patch } }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const setZip = (zip) => {
    const clean = zip.replace(/\D/g, '').slice(0, 5)
    setData((prev) => {
      const match = njZips[clean]
      const next = {
        ...prev,
        zip: clean,
        county: match ? `${match.city}, ${match.county} County` : '',
        zipError:
          clean.length === 5 && prev.state === 'NJ' && !match
            ? 'This ZIP is not in the sample NJ list. You can still continue — a producer will confirm your county.'
            : '',
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const annualIncome = useMemo(() => {
    if (data.incomeMode === 'range') {
      return incomeRanges.find((r) => r.id === data.incomeRangeId)?.annual || 0
    }
    const n = Number(String(data.incomeAmount).replace(/,/g, ''))
    if (!n) return 0
    return data.incomePeriod === 'monthly' ? n * 12 : n
  }, [data])

  const householdSize = data.members.length

  const recommendedPlan = useMemo(() => {
    if (data.priorities.includes('premium')) {
      return [...plans].sort((a, b) => a.premium - b.premium)[0]
    }
    if (data.priorities.includes('deductible') || data.priorities.includes('moop')) {
      return [...plans].sort((a, b) => a.deductible - b.deductible)[0]
    }
    return plans.find((p) => p.bestFit) || plans[0]
  }, [data.priorities])

  const showPublicPath = annualIncome > 0 && annualIncome / Math.max(householdSize, 1) < 22000

  const reset = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setData(makeDefault())
  }

  const value = {
    data,
    update,
    updateContact,
    setZip,
    annualIncome,
    householdSize,
    recommendedPlan,
    showPublicPath,
    reset,
    emptyMember,
  }

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext)
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider')
  return ctx
}
