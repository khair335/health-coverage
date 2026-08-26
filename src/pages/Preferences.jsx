import { Choice, Field, PageTitle, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { priorityOptions, usageOptions } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Preferences() {
  const { data, update } = useAssessment()

  const toggle = (id) => {
    const has = data.priorities.includes(id)
    update({
      priorities: has ? data.priorities.filter((p) => p !== id) : [...data.priorities, id],
    })
  }

  return (
    <div>
      <StepProgress current="/preferences" />
      <PageTitle
        kicker="S06 · Needs"
        title="What does a good plan look like for you?"
        subtitle="Pick what matters most. You can choose more than one. We’ll use this to rank sample plans — not commission."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {priorityOptions.map((p) => (
          <Choice key={p.id} selected={data.priorities.includes(p.id)} onClick={() => toggle(p.id)}>
            {p.label}
          </Choice>
        ))}
      </div>

      <fieldset className="mt-8">
        <legend className="mb-2 font-semibold text-ocean">Expected doctor use</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {usageOptions.map((u) => (
            <Choice key={u.id} selected={data.usage === u.id} onClick={() => update({ usage: u.id })}>
              {u.label}
            </Choice>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 md:max-w-md">
        <Field label="Monthly premium budget (optional)" hint="A number or a range is fine.">
          <TextInput
            placeholder="e.g. under $300"
            value={data.budget}
            onChange={(e) => update({ budget: e.target.value })}
          />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          className="mt-1"
          checked={data.unsureNeeds}
          onChange={(e) => update({ unsureNeeds: e.target.checked })}
        />
        I’m not sure — show a balanced recommendation.
      </label>

      <NavRow back="/eligibility-questions" next="/care" />
    </div>
  )
}
