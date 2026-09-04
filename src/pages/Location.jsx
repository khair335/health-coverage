import { useNavigate, useLocation } from 'react-router-dom'
import { Field, Notice, Select, TextInput } from '../components/ui'
import { AssessmentShell } from '../components/FourStepProgress'
import { NavRow } from '../components/StepProgress'
import { states } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

export default function Location() {
  const { data, update, setZip } = useAssessment()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const toast = useToast()
  const selected = states.find((s) => s.code === data.state)
  const supported = selected?.supported
  const canContinue = supported && data.zip.length === 5

  const handleNext = () => {
    if (!supported) {
      sessionStorage.setItem('hcn-contact-back', JSON.stringify({ backTo: '/location', fromInterest: true }))
      navigate('/contact', { state: { backTo: '/location', fromInterest: true } })
      return
    }
    if (data.zip.length !== 5) {
      toast.error('Please enter a valid 5-digit ZIP code')
      return
    }
    toast.success('Location saved!')
    navigate('/preferences')
  }

  return (
    <AssessmentShell
      step={1}
      pathname={pathname}
      title="Let's start with your location"
      subtitle="Your state and ZIP code help us find the right programs, plans, and savings available in your area."
    >
      <div className="grid gap-5">
        <Field label="State of Residence">
          <Select
            value={data.state}
            onChange={(e) => update({ state: e.target.value, zip: '', county: '', zipError: '' })}
          >
            {states.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="ZIP Code" hint={data.county ? `Area: ${data.county}` : 'Enter your 5-digit ZIP code.'}>
          <TextInput
            inputMode="numeric"
            maxLength={5}
            placeholder="e.g. 07746"
            value={data.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Field>
        {data.zipError && <Notice tone="warn">{data.zipError}</Notice>}
        {supported && (
          <Notice>
            New Jersey coverage options available. We&apos;ll use your information to identify programs and
            insurance paths that may fit your household.
          </Notice>
        )}
        {!supported && (
          <Notice tone="warn">
            Licensed sales assistance is live in New Jersey first. You can leave your interest on the contact
            screen.
          </Notice>
        )}
      </div>
      <NavRow
        back="/"
        disabled={supported ? !canContinue : false}
        onNext={handleNext}
        nextLabel={supported ? 'Continue to Coverage Needs →' : 'Leave my interest'}
      />
    </AssessmentShell>
  )
}
