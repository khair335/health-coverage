import { useNavigate } from 'react-router-dom'
import { Choice, Field, PageTitle, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { priorityOptions, usageOptions } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

export default function Preferences() {
  const { data, update } = useAssessment()
  const navigate = useNavigate()
  const toast = useToast()

  const toggle = (id) => {
    const has = data.priorities.includes(id)
    const next = has ? data.priorities.filter((p) => p !== id) : [...data.priorities, id]
    update({ priorities: next })
    const item = priorityOptions.find(p => p.id === id)
    if (!has) {
      toast.info(`Priority added: ${item?.label}`)
    }
  }

  const handleNext = () => {
    toast.success('Coverage preferences saved!')
    navigate('/care')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <StepProgress current="/preferences" />

      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5">
        <PageTitle
          kicker="Step 5 · Coverage Preferences"
          title="What Does Your Ideal Plan Look Like?"
          subtitle="Select your top priorities. We use these to rank plans — not producer commissions."
        />

        <div className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-600">
              Key Priorities (Select all that apply)
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {priorityOptions.map((p) => (
                <Choice key={p.id} selected={data.priorities.includes(p.id)} onClick={() => toggle(p.id)}>
                  {p.label}
                </Choice>
              ))}
            </div>
          </div>

          <fieldset className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
            <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              Expected Doctor Visits / Healthcare Usage
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {usageOptions.map((u) => (
                <Choice key={u.id} selected={data.usage === u.id} onClick={() => update({ usage: u.id })}>
                  {u.label}
                </Choice>
              ))}
            </div>
          </fieldset>

          <Field label="Monthly Premium Budget (Optional)" hint="Give a maximum dollar amount or range you are comfortable with.">
            <TextInput
              placeholder="e.g. Under $350 / month"
              value={data.budget}
              onChange={(e) => update({ budget: e.target.value })}
            />
          </Field>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-md text-[#4338ca] focus:ring-[#4338ca]"
              checked={data.unsureNeeds}
              onChange={(e) => update({ unsureNeeds: e.target.checked })}
            />
            <span>I'm not sure — please provide a balanced overall recommendation.</span>
          </label>
        </div>

        <NavRow back="/eligibility-questions" onNext={handleNext} nextLabel="Continue to Care Providers" />
      </div>
    </div>
  )
}
