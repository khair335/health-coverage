import { useNavigate } from 'react-router-dom'
import { Field, PageTitle, Select, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { relationships } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

export default function Household() {
  const { data, update, emptyMember } = useAssessment()
  const navigate = useNavigate()
  const toast = useToast()

  const setMember = (id, patch) => {
    update({
      members: data.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })
  }

  const handleAddMember = () => {
    update({ members: [...data.members, emptyMember(data.members.length + 1)] })
    toast.info('Added new household member')
  }

  const handleRemoveMember = (id) => {
    update({ members: data.members.filter((x) => x.id !== id) })
    toast.warn('Removed household member')
  }

  const handleNext = () => {
    const missingAge = data.members.some(m => !m.age)
    if (missingAge) {
      toast.warn('Pro tip: Entering approximate ages helps us provide accurate rate estimates.')
    } else {
      toast.success('Household details updated!')
    }
    navigate('/income')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <StepProgress current="/household" />

      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5">
        <PageTitle
          kicker="Step 2 · Household Composition"
          title="Who is in your household?"
          subtitle="Household size and ages affect public-program eligibility (Medicaid/CHIP) and Marketplace premium subsidies."
        />

        <div className="mt-6 space-y-5">
          {data.members.map((m, i) => (
            <div key={m.id} className="relative rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-[#4338ca]">
                    {i + 1}
                  </span>
                  <h2 className="font-bold text-slate-900">
                    {i === 0 ? 'Primary Household Member (You)' : `Person ${i + 1}`}
                  </h2>
                </div>
                {data.members.length > 1 && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    onClick={() => handleRemoveMember(m.id)}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4z" clipRule="evenodd" />
                    </svg>
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
                <Field label="Age" hint="Approximate is fine">
                  <TextInput
                    inputMode="numeric"
                    placeholder="e.g. 35"
                    value={m.age}
                    onChange={(e) => setMember(m.id, { age: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                  />
                </Field>
                <Field label="Claimed as Tax Dependent?">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 py-3.5 text-sm font-bold text-[#4338ca] hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200"
            onClick={handleAddMember}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Household Member
          </button>
        </div>

        <NavRow back="/location" onNext={handleNext} nextLabel="Continue to Income" />
      </div>
    </div>
  )
}
