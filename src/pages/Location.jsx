import { useNavigate } from 'react-router-dom'
import { Field, Notice, PageTitle, Select, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { states } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

export default function Location() {
  const { data, update, setZip } = useAssessment()
  const navigate = useNavigate()
  const toast = useToast()

  const selected = states.find((s) => s.code === data.state)
  const supported = selected?.supported
  const canContinue = supported && data.zip.length === 5

  const handleNext = () => {
    if (!supported) {
      toast.info(`Redirecting to leave interest for ${selected?.name || 'your state'}`)
      navigate('/contact')
      return
    }
    if (data.zip.length !== 5) {
      toast.error('Please enter a valid 5-digit ZIP code to proceed')
      return
    }
    toast.success('Location saved successfully!')
    navigate('/household')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepProgress current="/location" />
      
      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5">
        <PageTitle
          kicker="Step 1 · Location Details"
          title="Where do you live?"
          subtitle="Your state and ZIP tell us which programs and coverage options apply to your household."
        />

        <div className="mt-6 grid gap-6">
          <Field label="State of Residence">
            <Select
              value={data.state}
              onChange={(e) => {
                const newCode = e.target.value
                const st = states.find(s => s.code === newCode)
                update({ state: newCode, zip: '', county: '', zipError: '' })
                toast.info(`Selected state: ${st?.name}`)
              }}
            >
              {states.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} {!s.supported ? '(Sales coming soon)' : ''}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="ZIP Code"
            hint={data.county ? `Detected area: ${data.county}` : 'Enter your 5-digit postal code.'}
          >
            <TextInput
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="e.g. 07746"
              value={data.zip}
              onChange={(e) => setZip(e.target.value)}
              className="text-lg font-semibold tracking-wider"
            />
          </Field>

          {data.zipError && (
            <Notice tone="alert">
              {data.zipError}
            </Notice>
          )}

          {!supported && (
            <Notice tone="warn">
              Licensed sales assistance is currently live in New Jersey. You can still proceed to leave your contact info for notification when {selected?.name} launches.
            </Notice>
          )}

          {supported && (
            <div className="flex items-center gap-3 rounded-2xl bg-indigo-50/80 p-4 border border-indigo-100/80">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4338ca] text-white">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-xs text-indigo-900 leading-relaxed font-medium">
                <strong>New Jersey Active Coverage:</strong> Live screening enabled for GetCoveredNJ Medicaid & ACA Marketplace plans (2026 dataset).
              </div>
            </div>
          )}
        </div>

        <NavRow
          back="/"
          disabled={supported ? !canContinue : false}
          onNext={handleNext}
          nextLabel={supported ? 'Continue to Household' : 'Leave my interest'}
        />
      </div>
    </div>
  )
}
