import { Field, PageTitle, Select, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { relationships } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Household() {
  const { data, update, emptyMember } = useAssessment()

  const setMember = (id, patch) => {
    update({
      members: data.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })
  }

  return (
    <div>
      <StepProgress current="/household" />
      <PageTitle
        kicker="S03 · Household"
        title="Who is in your household?"
        subtitle="We ask this because household size and ages affect public-program screening and plan pricing. We never ask for a Social Security number."
      />

      <div className="space-y-4">
        {data.members.map((m, i) => (
          <div key={m.id} className="rounded-2xl border border-line bg-white p-4 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-ocean">Person {i + 1}</h2>
              {data.members.length > 1 && (
                <button
                  type="button"
                  className="text-sm font-semibold text-red-700"
                  onClick={() => update({ members: data.members.filter((x) => x.id !== m.id) })}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Relationship">
                <Select
                  value={m.relationship}
                  onChange={(e) => setMember(m.id, { relationship: e.target.value })}
                >
                  {relationships.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Age" hint="Approximate age is OK.">
                <TextInput
                  inputMode="numeric"
                  placeholder="42"
                  value={m.age}
                  onChange={(e) => setMember(m.id, { age: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                />
              </Field>
              <Field label="Dependent?">
                <Select
                  value={m.dependent ? 'yes' : 'no'}
                  onChange={(e) => setMember(m.id, { dependent: e.target.value === 'yes' })}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Select>
              </Field>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="font-semibold text-coral"
          onClick={() => update({ members: [...data.members, emptyMember(data.members.length + 1)] })}
        >
          + Add household member
        </button>
      </div>

      <NavRow back="/location" next="/income" />
    </div>
  )
}
