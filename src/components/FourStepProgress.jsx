import { HiCheck, HiChevronRight, HiLockClosed, HiShieldCheck, HiUser } from 'react-icons/hi2'

export const MACRO_STEPS = [
  {
    id: 1,
    label: 'Your Situation',
    sub: 'Tell us about your household',
    routes: ['/location'],
  },
  {
    id: 2,
    label: 'Coverage Needs',
    sub: 'What matters most to you',
    routes: ['/preferences'],
  },
  {
    id: 3,
    label: 'Best Insurance Paths',
    sub: 'Top options for your situation',
    routes: ['/paths'],
  },
  {
    id: 4,
    label: 'Real Coverage Value',
    sub: 'See your estimated financial impact',
    routes: ['/coverage-value'],
  },
]

export function getMacroStep(pathname) {
  const found = MACRO_STEPS.find((s) => s.routes.includes(pathname))
  return found?.id ?? 1
}

export function FourStepProgress({ pathname }) {
  const current = getMacroStep(pathname)
  const pct = Math.round(((current - 0.5) / MACRO_STEPS.length) * 100)

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4338ca] via-violet-500 to-teal-400 transition-all duration-500"
          style={{ width: `${Math.max(pct, 8)}%` }}
        />
      </div>

      <ol className="flex items-center justify-between gap-0 overflow-x-auto pb-1">
        {MACRO_STEPS.map((step, i) => {
          const done = step.id < current
          const active = step.id === current
          return (
            <li key={step.id} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm sm:h-10 sm:w-10 ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                        ? 'bg-[#4338ca] text-white ring-4 ring-indigo-100'
                        : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {done ? <HiCheck className="h-5 w-5" /> : step.id}
                </span>
                <p
                  className={`mt-2 max-w-[9rem] text-[11px] font-bold leading-tight sm:text-xs ${
                    active ? 'text-[#4338ca]' : done ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 hidden max-w-[9rem] text-[10px] leading-snug text-slate-500 sm:block">
                  {step.sub}
                </p>
              </div>
              {i < MACRO_STEPS.length - 1 && (
                <div className="flex shrink-0 items-center justify-center self-center px-1 sm:px-2">
                  <HiChevronRight className="h-7 w-7 text-slate-300 sm:h-9 sm:w-9" aria-hidden />
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function AssessmentShell({ step, title, subtitle, children, pathname }) {
  return (
    <div className="mx-auto max-w-4xl">
      <FourStepProgress pathname={pathname} />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 sm:rounded-3xl sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#4338ca] sm:text-xs">
          Step {step} of 4
        </p>
        <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      <TrustFooter />
    </div>
  )
}

export function TrustFooter() {
  const items = [
    {
      title: 'Secure & Private',
      body: 'Your information is protected and never sold.',
      icon: HiLockClosed,
    },
    {
      title: 'No Obligation',
      body: 'Get personalized results with no cost and no obligation.',
      icon: HiShieldCheck,
    },
    {
      title: 'Expert Help',
      body: 'Licensed insurance brokers are here to help.',
      icon: HiUser,
    },
  ]
  return (
    <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#4338ca] shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 sm:text-sm">{item.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600 sm:text-xs">{item.body}</p>
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500 sm:text-xs">
        <HiShieldCheck className="h-3.5 w-3.5 text-[#4338ca]" />
        Licensed insurance broker services. We do not sell insurance directly.
      </p>
    </div>
  )
}

export function PrivacyBadge() {
  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs text-slate-700">
      <HiLockClosed className="h-4 w-4 shrink-0 text-[#4338ca]" />
      <span>
        <strong className="text-slate-900">Your information is private.</strong> We do not share your data.
      </span>
    </div>
  )
}
