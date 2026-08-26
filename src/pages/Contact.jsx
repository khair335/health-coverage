import { useNavigate } from 'react-router-dom'
import { Field, Notice, PageTitle, Select, TextInput } from '../components/ui'
import { NavRow } from '../components/StepProgress'
import { languages } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Contact() {
  const { data, update, updateContact, recommendedPlan } = useAssessment()
  const navigate = useNavigate()
  const c = data.contact
  const canSubmit = c.name && (c.phone || c.email) && c.consentContact && c.consentShare

  const submit = () => {
    const caseId = `CASE-${Math.floor(100000 + Math.random() * 900000)}`
    update({ caseId })
    navigate('/confirmation')
  }

  return (
    <div>
      <PageTitle
        kicker="S12 · Agent handoff"
        title="Talk with a licensed producer"
        subtitle="You are requesting help from a licensed producer (the platform owner in this MVP). Consent boxes are not pre-checked."
      />
      <Notice>
        Recommended option on file:{' '}
        <strong>{recommendedPlan.name}</strong>. Official enrollment happens later through an authorized
        channel — not on this form.
      </Notice>

      <div className="mt-6 grid gap-4 md:max-w-lg">
        <Field label="Full name">
          <TextInput value={c.name} onChange={(e) => updateContact({ name: e.target.value })} />
        </Field>
        <Field label="Phone">
          <TextInput
            type="tel"
            inputMode="tel"
            value={c.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            value={c.email}
            onChange={(e) => updateContact({ email: e.target.value })}
          />
        </Field>
        <Field label="Preferred language">
          <Select value={c.language} onChange={(e) => updateContact({ language: e.target.value })}>
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred contact method">
          <Select value={c.method} onChange={(e) => updateContact({ method: e.target.value })}>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="text">Text (SMS later)</option>
          </Select>
        </Field>
        <Field label="Best time to reach you">
          <TextInput
            placeholder="Weekday mornings"
            value={c.time}
            onChange={(e) => updateContact({ time: e.target.value })}
          />
        </Field>
        <label className="flex items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            className="mt-1"
            checked={c.consentContact}
            onChange={(e) => updateContact({ consentContact: e.target.checked })}
          />
          I agree to be contacted by a licensed producer about this coverage screening (disclosure
          version 2026-08-19).
        </label>
        <label className="flex items-start gap-2 text-sm leading-relaxed">
          <input
            type="checkbox"
            className="mt-1"
            checked={c.consentShare}
            onChange={(e) => updateContact({ consentShare: e.target.checked })}
          />
          I understand my answers will be shared with that producer so they can review my case. This
          is not medical advice or an official eligibility decision.
        </label>
      </div>

      <NavRow back="/recommendation" disabled={!canSubmit} onNext={submit} nextLabel="Submit request" />
    </div>
  )
}
