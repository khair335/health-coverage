import { Link, useParams } from 'react-router-dom'
import { Badge, Button, Card, Field, Notice, PageTitle, Select, TextInput } from '../../components/ui'
import { agentCases, caseStatuses } from '../../data/mock'
import { useState } from 'react'

export default function CaseDetail() {
  const { id } = useParams()
  const found = agentCases.find((c) => c.id === id)
  const [status, setStatus] = useState(found?.status || 'New')
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([
    { t: found?.lastContact || found?.created, text: 'Case created from customer assessment (sample).' },
  ])

  if (!found) {
    return (
      <div>
        <PageTitle title="Case not found" />
        <p className="text-muted">That reference is not in the demo list.</p>
        <Button to="/agent" className="mt-4">
          Back to queue
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-2 text-sm">
        <Link to="/agent" className="font-semibold text-coral hover:underline">
          ← Queue
        </Link>
      </p>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={status === 'New' ? 'gold' : 'ocean'}>{status}</Badge>
        <Badge tone="gray">{found.urgency} urgency</Badge>
        <Badge tone="gray">{found.language}</Badge>
      </div>
      <PageTitle
        kicker="S15 · Case detail"
        title={found.name}
        subtitle={`${found.id} · ${found.state} ${found.zip}`}
      />
      <Notice>
        Original machine recommendation stays on file even if you choose another plan. Material edits
        should be logged (demo notes below).
      </Notice>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="border-b border-line pb-2 font-semibold text-ocean">Customer facts</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Contact</dt>
              <dd className="mt-0.5">
                {found.phone} · {found.email}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Household</dt>
              <dd className="mt-0.5">{found.household}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Income / coverage</dt>
              <dd className="mt-0.5">
                {found.income}. {found.coverage}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Path</dt>
              <dd className="mt-0.5">{found.path}</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h2 className="border-b border-line pb-2 font-semibold text-ocean">Recommendation & audit</h2>
          <p className="mt-3 text-lg font-medium text-ocean">{found.recommendation}</p>
          <p className="mt-1 text-sm text-muted">Rule package NJ-2026-08 · version 1.3.0 (sample)</p>
          <p className="mt-1 text-sm text-muted">Consent logged · disclosure 2026-08-19 (sample)</p>
          <div className="mt-4">
            <Field label="Update status" htmlFor="st">
              <Select id="st" value={status} onChange={(e) => setStatus(e.target.value)}>
                {caseStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="border-b border-line pb-2 font-semibold text-ocean">Notes / override rationale</h2>
        <div className="mt-3">
          <Field label="Add note">
            <TextInput
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Document fact change or why an alternative was selected"
            />
          </Field>
        </div>
        <Button
          className="mt-3"
          variant="secondary"
          onClick={() => {
            if (!note.trim()) return
            setNotes((n) => [{ t: 'Just now', text: note }, ...n])
            setNote('')
          }}
        >
          Save note
        </Button>
        <ul className="mt-4 space-y-2 text-sm">
          {notes.map((n, i) => (
            <li key={i} className="rounded-lg bg-sky px-3 py-2">
              <span className="text-muted">{n.t} — </span>
              {n.text}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
