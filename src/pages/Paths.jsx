import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiCheck } from 'react-icons/hi2'
import { AssessmentShell, PrivacyBadge } from '../components/FourStepProgress'
import { CoverageBenefitsModal } from '../components/CoverageBenefitsModal'
import { InfoBanner } from '../components/InfoBanner'
import { NavRow } from '../components/StepProgress'
import { coveragePathCards } from '../data/mock'

const cardStyles = {
  marketplace: { num: '1', numBg: 'bg-emerald-500', check: 'text-emerald-600', premium: 'text-emerald-700' },
  medicaid: { num: '2', numBg: 'bg-blue-500', check: 'text-blue-600', premium: 'text-blue-700' },
  private: { num: '3', numBg: 'bg-violet-500', check: 'text-violet-600', premium: 'text-violet-700' },
}

export default function Paths() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [modalPlan, setModalPlan] = useState(null)

  return (
    <>
    <AssessmentShell
      step={3}
      pathname={pathname}
      title="Here are your best insurance paths"
      subtitle="Based on your answers, these are the top coverage paths that may fit your household. A licensed broker will verify eligibility."
    >
      <div className="mb-4 flex justify-end">
        <PrivacyBadge />
      </div>

      <p className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Top coverage paths for your situation
      </p>

      <div className="grid gap-4 lg:grid-cols-3">
        {coveragePathCards.map((card) => {
          const style = cardStyles[card.id] || cardStyles.marketplace
          return (
            <div
              key={card.id}
              className={`relative flex flex-col rounded-2xl border-2 p-4 pt-5 sm:p-5 ${
                card.best
                  ? 'border-emerald-400 bg-emerald-50/30 shadow-md shadow-emerald-100'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {card.badge && (
                <span className="absolute -top-3 right-3 rounded-full bg-teal-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                  {card.badge}
                </span>
              )}
              <span
                className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${style.numBg}`}
              >
                {style.num}
              </span>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
                <HiCheck className="h-3 w-3" />
                {card.status}
              </span>
              <h3 className="mt-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">{card.title}</h3>
              {card.subtitle && <p className="text-xs text-slate-500">{card.subtitle}</p>}
              <ul className="mt-3 flex-1 space-y-2">
                {card.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-700 sm:text-sm">
                    <HiCheck className={`mt-0.5 h-4 w-4 shrink-0 ${style.check}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className={`mt-4 text-sm font-bold ${style.premium}`}>{card.premium}</p>
              <button
                type="button"
                onClick={() => setModalPlan(card.id)}
                className="mt-3 w-full rounded-xl border-2 border-[#4338ca] py-2.5 text-xs font-semibold text-[#4338ca] hover:bg-indigo-50"
              >
                View Plans
              </button>
            </div>
          )
        })}
      </div>

      <InfoBanner iconName="lightbulb" className="mt-6">
        Not sure which path is right? In the next step, we&apos;ll show you the real financial impact of each
        option so you can compare value side by side.
      </InfoBanner>

      <NavRow back="/preferences" onNext={() => navigate('/coverage-value')} nextLabel="See Real Coverage Value →" />
    </AssessmentShell>

    {modalPlan && <CoverageBenefitsModal planId={modalPlan} onClose={() => setModalPlan(null)} />}
    </>
  )
}
