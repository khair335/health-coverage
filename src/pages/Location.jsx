import { useNavigate } from 'react-router-dom'
import { Field, Notice, PageTitle, Select, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { states } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Location() {
  const { data, update, setZip } = useAssessment()
  const navigate = useNavigate()
  const selected = states.find((s) => s.code === data.state)
  const supported = selected?.supported
  const canContinue = supported && data.zip.length === 5

  return (
    <div>
      <StepProgress current="/location" />
      <PageTitle
        kicker="S02 · Location"
        title="Where do you live?"
        subtitle="Your state and ZIP tell us which programs and plans to look at. Sales assistance is available in New Jersey first."
      />

      <div className="grid gap-5 md:max-w-lg">
        <Field label="State">
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
        <Field
          label="ZIP code"
          hint={data.county ? `Looks like ${data.county}.` : 'Use the number keypad on your phone.'}
        >
          <TextInput
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={5}
            placeholder="07746"
            value={data.zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Field>
        {data.zipError && <Notice tone="warn">{data.zipError}</Notice>}
        {!supported && (
          <Notice tone="warn">
            We cannot offer licensed sales assistance in {selected?.name} yet. You can leave your
            email on the contact screen later if you want to be notified. New York and Florida are
            planned next.
          </Notice>
        )}
        {supported && (
          <Notice>New Jersey is supported. Plan examples below use sample 2026 data.</Notice>
        )}
      </div>

      <NavRow
        back="/"
        disabled={supported ? !canContinue : false}
        onNext={() => navigate(supported ? '/household' : '/contact')}
        nextLabel={supported ? 'Continue' : 'Leave my interest'}
      />
    </div>
  )
}
