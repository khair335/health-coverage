import { useNavigate, useLocation } from 'react-router-dom'
import { HiCheck } from 'react-icons/hi2'
import { AppIcon, priorityIcons, usageIcons } from '../components/AppIcons'
import { AssessmentShell } from '../components/FourStepProgress'
import { NavRow } from '../components/StepProgress'
import { priorityOptions, usageOptions } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

const usageHints = {
  rarely: null,
  sometimes: '1–3 times per year',
  often: 'Regular care or specialists',
  unsure: null,
}

function CheckboxCard({ selected, onClick, iconName, iconBg, label, hint }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition ${
        selected
          ? 'border-[#4338ca] bg-indigo-50/80'
          : 'border-slate-200 bg-white hover:border-indigo-200'
      }`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        <AppIcon name={iconName} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm ${selected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {label}
        </span>
        {hint && <span className="mt-0.5 block text-xs text-slate-500">{hint}</span>}
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
          selected ? 'border-[#4338ca] bg-[#4338ca] text-white' : 'border-slate-300 bg-white'
        }`}
      >
        {selected && <HiCheck className="h-3.5 w-3.5" />}
      </span>
    </button>
  )
}

export default function Preferences() {
  const { data, update } = useAssessment()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const toggle = (id) => {
    const has = data.priorities.includes(id)
    update({
      priorities: has ? data.priorities.filter((p) => p !== id) : [...data.priorities, id],
    })
  }

  return (
    <AssessmentShell
      step={2}
      pathname={pathname}
      title="What coverage is most important to you?"
      subtitle="Your priorities help us find insurance paths that fit your health needs and budget."
    >
      <div>
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Your top priorities (select all that apply)
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {priorityOptions.map((p) => {
            const meta = priorityIcons[p.id] || { name: 'check', bg: 'bg-slate-100 text-slate-600' }
            return (
              <CheckboxCard
                key={p.id}
                selected={data.priorities.includes(p.id)}
                onClick={() => toggle(p.id)}
                iconName={meta.name}
                iconBg={meta.bg}
                label={p.label}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Expected doctor visits / healthcare usage
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {usageOptions.map((u) => {
            const meta = usageIcons[u.id] || { name: 'help', bg: 'bg-slate-100 text-slate-600' }
            return (
              <CheckboxCard
                key={u.id}
                selected={data.usage === u.id}
                onClick={() => update({ usage: u.id })}
                iconName={meta.name}
                iconBg={meta.bg}
                label={u.label}
                hint={usageHints[u.id]}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-slate-700">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          <AppIcon name="heart" className="h-5 w-5" />
        </span>
        <p>
          <strong>You&apos;re in control.</strong> We use your answers to match you with coverage options that
          fit your needs.
        </p>
      </div>

      <NavRow
        back="/location"
        onNext={() => navigate('/paths')}
        nextLabel="Continue to Best Insurance Paths →"
      />
    </AssessmentShell>
  )
}
