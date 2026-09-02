import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HiCheck, HiEye, HiStar } from 'react-icons/hi2'
import { AppIcon } from '../components/AppIcons'
import { AssessmentShell, PrivacyBadge } from '../components/FourStepProgress'
import { InfoBanner } from '../components/InfoBanner'
import { CoverageBenefitsModal } from '../components/CoverageBenefitsModal'
import { NavRow } from '../components/StepProgress'
import { coverageValuePlans, coverageValueRows } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

const rowIconBg = ['bg-violet-100 text-violet-600', 'bg-emerald-100 text-emerald-600', 'bg-emerald-100 text-emerald-600', 'bg-rose-100 text-rose-600', 'bg-blue-100 text-blue-600', 'bg-blue-100 text-blue-600', 'bg-pink-100 text-pink-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600']

function StarRating({ value }) {
  const filled = value === 'Strong' ? 4 : value === 'Comprehensive' ? 5 : 3
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <HiStar key={n} className={`h-3.5 w-3.5 ${n <= filled ? 'text-amber-400' : 'text-slate-200'}`} />
      ))}
    </span>
  )
}

function CellValue({ value, rowIndex }) {
  if (rowIndex === 6 && value === 'Compliant') {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-700">
        <HiCheck className="h-4 w-4" />
        Compliant
      </span>
    )
  }
  if (rowIndex === 7) return <StarRating value={value} />
  if (rowIndex === 8) {
    return <span className="font-bold text-emerald-700">{value}</span>
  }
  return value
}

export default function CoverageValue() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { update } = useAssessment()
  const [modalPlan, setModalPlan] = useState(null)

  useEffect(() => {
    const plan = searchParams.get('modal')
    if (plan && ['marketplace', 'medicaid', 'private'].includes(plan)) {
      setModalPlan(plan)
    }
  }, [searchParams])

  const openModal = (id) => {
    setModalPlan(id)
    setSearchParams({ modal: id })
  }

  const closeModal = () => {
    setModalPlan(null)
    setSearchParams({})
  }

  const selectPlan = (id) => {
    update({ selectedPlanId: id === 'marketplace' ? 'PLAN-XYZ' : id })
    navigate('/contact')
  }

  return (
    <>
      <AssessmentShell
      step={4}
      pathname={pathname}
      title="See the real value of each option"
      subtitle="These are estimates based on your answers. A licensed broker will confirm final costs and benefits."
    >
      <PrivacyBadge />

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                Estimated annual impact
              </th>
              {coverageValuePlans.map((plan) => (
                <th key={plan.id} className="px-3 py-3 align-top">
                  <div
                    className={`rounded-xl p-3 ${plan.best ? 'bg-emerald-50 ring-2 ring-emerald-400' : 'bg-white border border-slate-200'}`}
                  >
                    {plan.badge && (
                      <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                        {plan.badge}
                      </span>
                    )}
                    <p className="mt-1 font-bold text-slate-900">{plan.title}</p>
                    <p className="text-xs text-slate-500">{plan.subtitle}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coverageValueRows.map((row, ri) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${rowIconBg[ri] || 'bg-slate-100 text-slate-600'}`}
                    >
                      <AppIcon name={row.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-medium text-slate-600">{row.label}</span>
                  </div>
                </td>
                {coverageValuePlans.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-3 py-3 text-xs font-semibold ${
                      plan.best && ri <= 2 ? 'text-emerald-700' : 'text-slate-800'
                    }`}
                  >
                    <CellValue value={plan.values[ri]} rowIndex={ri} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {coverageValuePlans.map((plan) => (
          <div key={plan.id} className="space-y-2">
            <button
              type="button"
              onClick={() => selectPlan(plan.id)}
              className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition ${
                plan.best
                  ? 'bg-[#4338ca] text-white hover:bg-indigo-700'
                  : 'border-2 border-[#4338ca] bg-white text-[#4338ca] hover:bg-indigo-50'
              }`}
            >
              Select This Option
            </button>
            <button
              type="button"
              onClick={() => openModal(plan.id)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-[#4338ca] underline-offset-2 hover:underline"
            >
              <HiEye className="h-4 w-4" />
              View Coverage & Benefits
            </button>
          </div>
        ))}
      </div>

      <InfoBanner iconName="lightbulb" className="mt-6">
        <p>These estimates are based on the healthcare usage you described. You can go back and adjust your answers anytime.</p>
        <button
          type="button"
          onClick={() => navigate('/preferences')}
          className="mt-2 font-semibold text-[#4338ca] hover:underline"
        >
          ← Back to Adjust Answers
        </button>
      </InfoBanner>

      <NavRow back="/paths" onNext={() => navigate('/contact')} nextLabel="Talk to a Licensed Broker →" />
      </AssessmentShell>

      {modalPlan && <CoverageBenefitsModal planId={modalPlan} onClose={closeModal} />}
    </>
  )
}
