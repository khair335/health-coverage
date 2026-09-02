import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const steps = [
  { to: '/location', label: 'Location' },
  { to: '/household', label: 'Household' },
  { to: '/income', label: 'Income' },
  { to: '/eligibility-questions', label: 'Eligibility' },
  { to: '/preferences', label: 'Needs' },
  { to: '/care', label: 'Care' },
  { to: '/paths', label: 'Paths' },
]

export function StepProgress({ current }) {
  const index = Math.max(0, steps.findIndex((s) => s.to === current))
  const pct = Math.round(((index + 1) / steps.length) * 100)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 600)
    return () => clearTimeout(t)
  }, [current])

  return (
    <nav aria-label="Progress" className="mb-6 sm:mb-8">
      <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-xs font-extrabold text-white shadow-xs">
            {index + 1}
          </span>
          <p className="text-xs font-bold text-slate-900 sm:text-sm">
            Step {index + 1} of {steps.length}
            <span className="ml-1.5 font-medium text-slate-500 sm:ml-2">· {steps[index]?.label}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <p className={`text-xs font-extrabold text-[#4338ca] ${pulse ? 'scale-110' : ''} transition-transform`}>{pct}% Complete</p>
        </div>
      </div>

      {/* Progress Bar Container with Continuous Shimmer & Stripes */}
      <div className="relative mb-4 h-3 overflow-hidden rounded-full bg-indigo-100/80 p-0.5 shadow-inner">
        <div
          key={current}
          className="relative h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-500 to-emerald-400 animate-shimmer-bar transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Continuous Stripe Overlay */}
          <div className="absolute inset-0 rounded-full opacity-35 animate-stripe-bar" />
        </div>
      </div>

      <ol className="hidden gap-1.5 sm:flex">
        {steps.map((step, i) => {
          const done = i < index
          const active = i === index
          return (
            <li key={step.to} className="min-w-0 flex-1">
              <Link
                to={step.to}
                className={`flex items-center justify-center gap-1.5 truncate rounded-xl px-2 py-2 text-center text-[11px] font-bold transition-all duration-200 ${
                  active
                    ? 'scale-[1.02] bg-[#4338ca] text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-400/50'
                    : done
                      ? 'bg-indigo-50 text-[#4338ca] hover:bg-indigo-100/80'
                      : 'border border-slate-200 bg-white text-slate-400 hover:text-slate-600'
                }`}
              >
                {done && (
                  <svg className="h-3 w-3 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="truncate">{step.label}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function NavRow({ back, next, nextLabel = 'Continue', disabled, onNext }) {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  const go = (path, fn) => {
    if (disabled || leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      if (fn) fn()
      else if (path) navigate(path)
    }, 320)
  }

  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line bg-[#f8faff]/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-10 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
      {leaving && (
        <div className="mb-3 overflow-hidden rounded-full bg-indigo-100 sm:mb-4">
          <div className="animate-step-advance h-1 rounded-full bg-[#16a34a]" />
        </div>
      )}
      <div
        className={`flex flex-col-reverse gap-2.5 transition sm:flex-row sm:justify-between sm:gap-3 ${
          leaving ? 'pointer-events-none opacity-60' : ''
        }`}
      >
        {back ? (
          <Link
            to={back}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-[#4338ca] hover:bg-indigo-50 transition-colors duration-150 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
          >
            ← Back
          </Link>
        ) : (
          <span />
        )}
        {onNext ? (
          <button
            type="button"
            disabled={disabled || leaving}
            onClick={() => go(null, onNext)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#4338ca] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3730a3] active:scale-[0.98] disabled:opacity-50 transition-all duration-150 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
          >
            {leaving ? 'Saving…' : nextLabel}
          </button>
        ) : (
          <button
            type="button"
            disabled={leaving}
            onClick={() => go(next)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#4338ca] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3730a3] active:scale-[0.98] disabled:opacity-50 transition-all duration-150 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
          >
            {leaving ? 'Saving…' : nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}

export function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  )
}
