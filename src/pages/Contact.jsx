import { useLocation, useNavigate } from 'react-router-dom'
import { HiEnvelope, HiPhone, HiClock, HiShieldCheck } from 'react-icons/hi2'
import { Field, Notice, PageTitle, Select, TextInput } from '../components/ui'
import { NavRow } from '../components/StepProgress'
import { languages, licensedBroker } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

function readContactBack(locationState) {
  if (locationState?.backTo) {
    return {
      backTo: locationState.backTo,
      fromInterest: Boolean(locationState.fromInterest),
      fromNav: Boolean(locationState.fromNav),
    }
  }
  try {
    const raw = sessionStorage.getItem('hcn-contact-back')
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return { backTo: '/', fromInterest: false, fromNav: false }
}

export default function Contact() {
  const { data, update, updateContact, recommendedPlan } = useAssessment()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const c = data.contact
  const canSubmit = c.name && (c.phone || c.email) && c.consentContact && c.consentShare
  const { backTo, fromInterest, fromNav } = readContactBack(location.state)
  const showBrokerCard = fromNav || fromInterest || !data.selectedPlanId

  const submit = () => {
    if (!canSubmit) {
      toast.error('Please complete required fields and consents')
      return
    }
    const caseId = `CASE-${Math.floor(100000 + Math.random() * 900000)}`
    update({ caseId })
    sessionStorage.removeItem('hcn-contact-back')
    toast.success('Request sent — a licensed broker will follow up')
    navigate('/confirmation')
  }

  return (
    <div>
      <PageTitle
        kicker="Talk to a Licensed Broker"
        title={
          fromInterest
            ? 'Leave your interest'
            : fromNav
              ? 'Talk with a licensed producer'
              : 'Talk with a licensed producer'
        }
        subtitle={
          fromInterest
            ? 'Your state is not live for licensed sales yet. Share your contact details and a producer will follow up when available.'
            : fromNav
              ? 'Call, email, or request a callback from a licensed New Jersey producer. No obligation.'
              : 'Request help from a licensed producer. Consent boxes are not pre-checked.'
        }
      />

      {showBrokerCard && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white shadow-sm">
          <div className="border-b border-indigo-100 bg-[#4338ca] px-5 py-4 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-200">Your licensed broker</p>
            <p className="mt-1 text-lg font-bold">{licensedBroker.name}</p>
            <p className="text-sm text-indigo-100">{licensedBroker.title}</p>
          </div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <a
              href={`tel:${licensedBroker.phone.replace(/\D/g, '')}`}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-[#4338ca] hover:bg-indigo-50/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <HiPhone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Call now</p>
                <p className="text-base font-bold text-[#4338ca]">{licensedBroker.phoneDisplay}</p>
                <p className="text-xs text-slate-500">Tap to dial on mobile</p>
              </div>
            </a>
            <a
              href={`mailto:${licensedBroker.email}`}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-[#4338ca] hover:bg-indigo-50/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <HiEnvelope className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</p>
                <p className="break-all text-sm font-bold text-slate-900">{licensedBroker.email}</p>
              </div>
            </a>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <HiClock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Office hours</p>
                <p className="text-sm font-semibold text-slate-800">{licensedBroker.hours}</p>
                <p className="text-xs text-slate-500">{licensedBroker.office}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <HiShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">License</p>
                <p className="text-sm font-semibold text-slate-800">{licensedBroker.license}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!fromInterest && !fromNav && data.selectedPlanId && (
        <Notice className="mt-6">
          Recommended option on file:{' '}
          <strong>{recommendedPlan.name}</strong>. Official enrollment happens later through an authorized
          channel — not on this form.
        </Notice>
      )}
      {fromInterest && (
        <Notice tone="warn" className="mt-6">
          Licensed sales help is available in New Jersey first. You selected{' '}
          <strong>{data.state || 'another state'}</strong>. Leave your interest below and we&apos;ll notify you
          when support expands.
        </Notice>
      )}
      {fromNav && (
        <Notice className="mt-6">
          Prefer a callback? Fill out the form below and {licensedBroker.name} will reach you at the phone or
          email you provide.
        </Notice>
      )}

      <div className="mt-6 grid gap-4 md:max-w-lg">
        <Field label="Full name">
          <TextInput value={c.name} onChange={(e) => updateContact({ name: e.target.value })} placeholder="Your full name" />
        </Field>
        <Field label="Phone">
          <TextInput
            type="tel"
            inputMode="tel"
            value={c.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
            placeholder="(732) 555-0000"
          />
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            value={c.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Preferred language" hint="We will try to match a broker who speaks your language.">
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

      <NavRow
        back={backTo}
        disabled={!canSubmit}
        onNext={submit}
        nextLabel={fromNav ? 'Request callback' : fromInterest ? 'Submit interest' : 'Submit request'}
      />
    </div>
  )
}
