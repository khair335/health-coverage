import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, PageTitle, Select } from '../../components/ui'
import { agentCases, caseStatuses } from '../../data/mock'

export default function Dashboard() {
  const [status, setStatus] = useState('All')
  const rows = useMemo(
    () => (status === 'All' ? agentCases : agentCases.filter((c) => c.status === status)),
    [status],
  )

  return (
    <div>
      <PageTitle
        kicker="S14 · Producer dashboard"
        title="Lead queue"
        subtitle="Demo data. MVP assigns all New Jersey leads to the platform owner. Desktop-first, still usable on a phone."
      />

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="max-w-xs flex-1">
          <p className="mb-1.5 text-sm font-semibold text-ocean">Filter by status</p>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {caseStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <p className="pb-3 text-sm text-muted">{rows.length} case{rows.length === 1 ? '' : 's'}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ocean text-white">
            <tr>
              {['Case', 'Customer', 'Lang', 'Status', 'Recommendation', 'Next action', ''].map((h) => (
                <th key={h} className="px-3 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-line hover:bg-sky/60">
                <td className="px-3 py-3 font-medium text-ocean">{c.id}</td>
                <td className="px-3 py-3">
                  {c.name}
                  <div className="text-xs text-muted">
                    {c.state} {c.zip}
                  </div>
                </td>
                <td className="px-3 py-3">{c.language}</td>
                <td className="px-3 py-3">
                  <Badge tone={c.status === 'New' ? 'gold' : c.status === 'Contacted' ? 'coral' : 'gray'}>
                    {c.status}
                  </Badge>
                </td>
                <td className="px-3 py-3">{c.recommendation}</td>
                <td className="px-3 py-3 text-muted">{c.nextAction}</td>
                <td className="px-3 py-3">
                  <Link to={`/agent/cases/${c.id}`} className="font-semibold text-coral hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  No cases in this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
