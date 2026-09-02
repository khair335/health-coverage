import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Field, Select, TextInput } from '../../components/ui'
import { agentCases, caseStatuses, dashboardClients, getClientRecord } from '../../data/mock'

const toneMap = {
  New: 'bg-amber-100 text-amber-800',
  Contacted: 'bg-blue-100 text-blue-800',
  'Needs Information': 'bg-violet-100 text-violet-800',
  'Recommendation Verified': 'bg-emerald-100 text-emerald-800',
  'Enrollment Started': 'bg-indigo-100 text-indigo-800',
  Enrolled: 'bg-emerald-100 text-emerald-800',
  'Referred to Assistance': 'bg-orange-100 text-orange-800',
  Closed: 'bg-slate-100 text-slate-700',
}

function Section({ title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-slate-500">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function CaseDetail() {
  const { id } = useParams()
  const found = agentCases.find((c) => c.id === id)
  const clientRow = dashboardClients.find((c) => c.id === id)
  const record = getClientRecord(id)
  const [status, setStatus] = useState(found?.status || clientRow?.status || 'New')
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([
    { t: found?.lastContact || found?.created || 'Recently', text: 'Case created from customer assessment (sample).' },
  ])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [id])

  if (!found && !clientRow) {
    return (
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900">Client not found</h1>
        <p className="mt-2 text-sm text-slate-600">That reference is not in the demo list.</p>
        <Link to="/agent" className="mt-4 inline-flex rounded-xl bg-[#4338ca] px-4 py-2.5 text-sm font-bold text-white">
          Back to dashboard
        </Link>
      </div>
    )
  }

  const caseData = found || {
    id,
    name: clientRow.name,
    phone: clientRow.phone,
    email: `${clientRow.name.split(' ')[0].toLowerCase()}@example.com`,
    state: 'NJ',
    zip: '07000',
    language: 'English',
    urgency: clientRow.priority,
    recommendation: clientRow.pathPlan,
    path: clientRow.pathNeed,
    household: '—',
    income: '—',
    coverage: '—',
    nextAction: 'Review assessment and contact client',
    created: clientRow.updated,
    lastContact: clientRow.lastContact,
    preferredContact: 'Phone',
    bestTime: 'Weekday mornings',
  }

  const displayName = clientRow?.name || caseData.name
  const initials = clientRow?.initials || displayName.slice(0, 2).toUpperCase()
  const avatarBg = clientRow?.avatarBg || 'bg-indigo-100 text-indigo-700'

  return (
    <div className="mx-auto max-w-7xl">
      <Link to="/agent" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4338ca] hover:underline">
        ← Back to dashboard
      </Link>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold ${avatarBg}`}>
              {initials}
            </span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{displayName}</h1>
              <p className="text-sm text-slate-600">
                {caseData.id} · {caseData.state} {caseData.zip}
                {caseData.county ? ` · ${caseData.county}` : ''}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneMap[status] || 'bg-slate-100 text-slate-700'}`}>
                  {status}
                </span>
                {clientRow && (
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${toneMap[clientRow.statusTone] || 'bg-slate-100'}`}>
                    {clientRow.status}
                  </span>
                )}
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {caseData.urgency} priority
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {caseData.language}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-xl border border-[#4338ca] px-4 py-2 text-sm font-semibold text-[#4338ca] hover:bg-indigo-50">
              📞 {caseData.phone}
            </button>
            <button type="button" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              ✉ Email
            </button>
            <button type="button" className="rounded-xl bg-[#4338ca] px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
              Schedule Follow-Up
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Section title="Contact & Preferences" className="lg:col-span-1">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Phone</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Email</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Preferred contact</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.preferredContact || 'Phone'}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Best time</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.bestTime || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Case opened</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.created}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Last contact</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.lastContact}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Household & Financial" className="lg:col-span-1">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Household</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.household}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Income</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.income}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Current coverage</dt>
              <dd className="mt-0.5 text-slate-800">{caseData.coverage}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Next action</dt>
              <dd className="mt-0.5 font-medium text-[#4338ca]">{caseData.nextAction}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Recommendation & Status" className="lg:col-span-1">
          <p className="text-lg font-bold text-[#4338ca]">{caseData.recommendation}</p>
          <p className="mt-1 text-sm text-slate-600">Path: {caseData.path}</p>
          <p className="mt-2 text-xs text-slate-500">Rule package NJ-2026-08 · v1.3.0</p>
          <p className="text-xs text-slate-500">Consent logged · disclosure 2026-08-19</p>
          <div className="mt-4">
            <Field label="Update status">
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                {caseStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Section title="4-Step Assessment Summary">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Step 1 · Location</dt>
              <dd className="mt-0.5 text-slate-800">{record.assessment.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Step 2 · Usage</dt>
              <dd className="mt-0.5 text-slate-800">{record.assessment.usage}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase text-slate-500">Step 2 · Priorities</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {record.assessment.priorities.map((p) => (
                  <span key={p} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-[#4338ca]">
                    {p}
                  </span>
                ))}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-bold uppercase text-slate-500">Step 3 · Paths reviewed</dt>
              <dd className="mt-0.5 text-slate-800">{record.assessment.pathsReviewed.join(' · ')}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Step 4 · Selected plan</dt>
              <dd className="mt-0.5 font-semibold text-emerald-700">{record.assessment.selectedPlan}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase text-slate-500">Estimated premium</dt>
              <dd className="mt-0.5 font-semibold text-slate-800">{record.assessment.estimatedPremium}</dd>
            </div>
          </dl>
        </Section>

        <Section title="Screening Results">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {Object.entries(record.screening).map(([key, val]) => (
              <div key={key}>
                <dt className="text-xs font-bold uppercase text-slate-500">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="mt-0.5 text-slate-800">{val}</dd>
              </div>
            ))}
          </dl>
        </Section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Section title="Activity Timeline" className="lg:col-span-2">
          <ul className="space-y-3">
            {record.timeline.map((item, i) => (
              <li key={i} className="flex gap-3 border-l-2 border-indigo-200 pl-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{item.date}</p>
                  <p className="font-semibold text-slate-900">{item.event}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Open Tasks">
          <ul className="space-y-2">
            {record.tasks.map((t, i) => (
              <li key={i} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                <input type="checkbox" checked={t.done} readOnly className="mt-0.5" />
                <div>
                  <p className={t.done ? 'text-slate-500 line-through' : 'font-medium text-slate-800'}>{t.task}</p>
                  <p className="text-xs text-slate-500">Due {t.due}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Section title="Scheduled Follow-Ups">
          {record.followUps.length === 0 ? (
            <p className="text-sm text-slate-500">No follow-ups scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {record.followUps.map((f, i) => (
                <li key={i} className="rounded-xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 text-sm">
                  <p className="font-semibold text-slate-900">
                    {f.date} · {f.time} — {f.type}
                  </p>
                  <p className="text-slate-600">{f.note}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Documents on File">
          {record.documents.length === 0 ? (
            <p className="text-sm text-slate-500">No documents uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {record.documents.map((d, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm">
                  <span className="font-medium text-slate-800">{d.name}</span>
                  <span className="text-xs text-slate-500">
                    {d.type} · {d.date}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <Section title="Producer Notes" className="mt-4">
        <Field label="Add note">
          <TextInput
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Document fact change or why an alternative was selected"
          />
        </Field>
        <button
          type="button"
          className="mt-3 rounded-xl bg-[#4338ca] px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          onClick={() => {
            if (!note.trim()) return
            setNotes((n) => [{ t: 'Just now', text: note }, ...n])
            setNote('')
          }}
        >
          Save note
        </button>
        <ul className="mt-4 space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm text-slate-800">
              <span className="text-xs font-semibold text-slate-500">{n.t}</span>
              <p className="mt-0.5">{n.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-950">
        Original machine recommendation stays on file even if you choose another plan. Material edits should be logged in
        notes above.
      </div>
    </div>
  )
}
