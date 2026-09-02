import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { HiCheck, HiXMark } from 'react-icons/hi2'
import { AppIcon } from './AppIcons'
import { coveragePlanDetails } from '../data/mock'

const planNum = { marketplace: '1', medicaid: '2', private: '3' }
const planNumBg = { marketplace: 'bg-emerald-500', medicaid: 'bg-blue-500', private: 'bg-violet-500' }
const badgeTone = {
  marketplace: 'bg-emerald-100 text-emerald-800',
  medicaid: 'bg-blue-100 text-blue-800',
  private: 'bg-violet-100 text-violet-800',
}

export function CoverageBenefitsModal({ planId, onClose }) {
  const plan = coveragePlanDetails[planId]

  useEffect(() => {
    if (!plan) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, plan])

  if (!plan) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className="relative flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coverage-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${planNumBg[planId]}`}
              >
                {planNum[planId]}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badgeTone[planId]}`}>
                    {plan.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{plan.type}</span>
                </div>
                {plan.subtitle && (
                  <p className="mt-0.5 text-sm font-medium text-emerald-700">{plan.subtitle}</p>
                )}
                <h2 id="coverage-modal-title" className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                  {plan.name}
                </h2>
                <p className="text-sm text-slate-600">{plan.metal}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close modal"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {plan.quickFacts.map((f) => (
              <div key={f.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                <AppIcon name={f.icon} className="mx-auto h-5 w-5 text-[#4338ca]" />
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{f.label}</p>
                <p className="mt-0.5 text-xs font-bold leading-snug text-slate-800">{f.value}</p>
              </div>
            ))}
          </div>

          <section className="mt-6">
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <AppIcon name="shieldCheck" className="h-4 w-4 text-emerald-600" />
              What&apos;s Covered
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {plan.covered.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <HiCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Cost Breakdown (In-Network)</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {plan.costs.map((c) => (
                <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm">
                  <AppIcon name={c.icon} className="mx-auto h-5 w-5 text-[#4338ca]" />
                  <p className="mt-1 text-[10px] font-bold uppercase text-slate-500">{c.label}</p>
                  <p className="mt-0.5 text-base font-bold text-[#4338ca]">{c.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Typical Copays (After Deductible)
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {plan.copays.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center"
                >
                  <AppIcon name={c.icon} className="mx-auto h-5 w-5 text-[#4338ca]" />
                  <p className="mt-1 text-[10px] font-semibold leading-tight text-slate-600">{c.label}</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900">{c.value}</p>
                </div>
              ))}
            </div>
          </section>

          {plan.networkComparison && (
            <section className="mt-6 rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4338ca]">
                In-Network vs Out-of-Network
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-emerald-200 bg-white p-4 text-sm">
                  <p className="font-bold text-emerald-700">In-Network</p>
                  <p className="mt-1 leading-relaxed text-slate-600">{plan.networkComparison.in}</p>
                </div>
                <div className="rounded-lg border border-rose-200 bg-white p-4 text-sm">
                  <p className="font-bold text-rose-700">Out-of-Network</p>
                  <p className="mt-1 leading-relaxed text-slate-600">{plan.networkComparison.out}</p>
                </div>
              </div>
            </section>
          )}

          {plan.keyLimits && (
            <section className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Limits & Conditions</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
                {plan.keyLimits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
            <AppIcon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p>
              <strong>Disclaimer:</strong> This summary is for informational purposes only. Final benefits, costs,
              and network status must be confirmed with the carrier before enrollment. A licensed broker will verify
              all details.
            </p>
          </section>
        </div>

        <div className="flex shrink-0 gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <AppIcon name="download" className="h-4 w-4" />
            Download Plan Summary
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl bg-[#4338ca] px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
