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
      <div className="mb-2 flex items-end justify-between gap-3 sm:mb-3">
        <p className="text-xs font-semibold text-ocean sm:text-sm">
          Step {index + 1} of {steps.length}
          <span className="ml-1.5 font-normal text-muted sm:ml-2">· {steps[index]?.label}</span>
        </p>
        <p className={`text-[10px] font-semibold text-muted sm:text-xs ${pulse ? 'animate-pop' : ''}`}>{pct}%</p>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-mist sm:mb-4 sm:h-2">
        <div
          key={current}
          className={`h-full rounded-full bg-coral transition-[width] duration-500 ease-out ${pulse ? 'animate-progress-glow' : ''}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <ol className="hidden gap-1 sm:flex">
        {steps.map((step, i) => {
          const done = i < index
          const active = i === index
          return (
            <li key={step.to} className="min-w-0 flex-1">
              <Link
                to={step.to}
                className={`block truncate rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold transition ${
                  active
                    ? 'scale-[1.02] bg-ocean text-white shadow-sm'
                    : done
                      ? 'bg-mist text-ocean'
                      : 'border border-line bg-white text-muted'
                }`}
              >
                {step.label}
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
    <div className="sticky bottom-0 z-20 -mx-4 mt-8 border-t border-line bg-sky/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-10 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
      {leaving && (
        <div className="mb-3 overflow-hidden rounded-full bg-mist sm:mb-4">
          <div className="animate-step-advance h-1 rounded-full bg-coral" />
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
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ocean sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
          >
            Back
          </Link>
        ) : (
          <span />
        )}
        {onNext ? (
          <button
            type="button"
            disabled={disabled || leaving}
            onClick={() => go(null, onNext)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white hover:bg-coral-dark disabled:opacity-50 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
          >
            {leaving ? 'Saving…' : nextLabel}
          </button>
        ) : (
          <button
            type="button"
            disabled={leaving}
            onClick={() => go(next)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white hover:bg-coral-dark disabled:opacity-50 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
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
