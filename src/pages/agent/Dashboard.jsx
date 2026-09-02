import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { HiAdjustmentsHorizontal, HiChevronLeft, HiChevronRight, HiEllipsisVertical, HiMagnifyingGlass, HiPlus, HiXMark } from 'react-icons/hi2'
import { HiInformationCircle } from 'react-icons/hi'
import { AddNewClientModal } from '../../components/AddNewClientModal'
import { AppIcon } from '../../components/AppIcons'
import { dashboardClients as initialClients, dashboardStats, statBg } from '../../data/mock'

const toneMap = {
  amber: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  violet: 'bg-purple-100 text-purple-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-700',
}

const priorityDot = {
  High: 'bg-red-500',
  Medium: 'bg-amber-500',
  Low: 'bg-emerald-500',
}

const STATUS_OPTIONS = [
  'New Lead',
  'Needs Help Choosing',
  'Contacted',
  'Quote Sent',
  'Application In Progress',
  'Follow-Up',
  'Enrolled',
  'Application Submitted',
]

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low']

const emptyFilters = {
  statuses: [],
  priorities: [],
  followUpOnly: false,
}

const avatarPalette = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-rose-100 text-rose-700',
  'bg-amber-100 text-amber-700',
  'bg-teal-100 text-teal-700',
  'bg-sky-100 text-sky-700',
  'bg-indigo-100 text-indigo-700',
]

function makeClientId(n) {
  return `CASE-100${n}`
}

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/)
  return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase()
}

export default function Dashboard() {
  const [clients, setClients] = useState(initialClients)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [addOpen, setAddOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState(emptyFilters)
  const filtersRef = useRef(null)

  const activeFilterCount =
    filters.statuses.length + filters.priorities.length + (filters.followUpOnly ? 1 : 0)

  useEffect(() => {
    if (!filtersOpen) return undefined
    const handleClick = (e) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target)) {
        setFiltersOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [filtersOpen])

  const toggleStatus = (status) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }))
  }

  const togglePriority = (priority) => {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
    }))
  }

  const clearFilters = () => setFilters(emptyFilters)

  const filtered = useMemo(
    () =>
      clients.filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.pathPlan.toLowerCase().includes(query.toLowerCase()) ||
          c.pathNeed.toLowerCase().includes(query.toLowerCase())
        const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(c.status)
        const matchesPriority = filters.priorities.length === 0 || filters.priorities.includes(c.priority)
        const matchesFollowUp =
          !filters.followUpOnly || (c.nextFollowUp && c.nextFollowUp !== '—')
        return matchesSearch && matchesStatus && matchesPriority && matchesFollowUp
      }),
    [clients, query, filters],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    setPage(1)
  }, [query, pageSize, filters])

  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, safePage, pageSize])

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const rangeEnd = Math.min(safePage * pageSize, filtered.length)

  const pageNumbers = useMemo(() => {
    const pages = []
    const maxVisible = 4
    let start = Math.max(1, safePage - 1)
    let end = Math.min(totalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i += 1) pages.push(i)
    return pages
  }, [safePage, totalPages])

  const handleAddClient = (form) => {
    const id = makeClientId(300 + clients.length)
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const tone =
      form.status === 'New Lead'
        ? 'slate'
        : form.status === 'Needs Help Choosing'
          ? 'amber'
          : form.status === 'Contacted'
            ? 'blue'
            : form.status === 'Quote Sent'
              ? 'violet'
              : form.status === 'Application In Progress'
                ? 'rose'
                : form.status === 'Enrolled'
                  ? 'emerald'
                  : 'violet'

    setClients((prev) => [
      {
        id,
        name: form.name.trim(),
        phone: form.phone.trim(),
        initials: initialsFromName(form.name),
        avatarBg: avatarPalette[prev.length % avatarPalette.length],
        status: form.status,
        statusTone: tone,
        pathNeed: form.pathNeed.trim() || 'Coverage review',
        pathPlan: form.pathPlan.trim() || 'To be determined',
        pathIcon: 'sparkles',
        lastContact: today,
        nextFollowUp: '—',
        nextFollowUpTime: '',
        priority: form.priority,
        updated: today,
      },
      ...prev,
    ])
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your clients and follow-ups</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-h-10 w-full sm:w-56">
            <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search clients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm focus:border-[#4338ca] focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="relative" ref={filtersRef}>
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-haspopup="true"
              className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                filtersOpen || activeFilterCount > 0
                  ? 'border-[#4338ca] bg-indigo-50 text-[#4338ca]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HiAdjustmentsHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4338ca] px-1.5 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div className="absolute right-0 z-30 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:w-80">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-900">Filter clients</p>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-[#4338ca] hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Status</p>
                    <div className="max-h-36 space-y-1.5 overflow-y-auto pr-1">
                      {STATUS_OPTIONS.map((status) => (
                        <label key={status} className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={filters.statuses.includes(status)}
                            onChange={() => toggleStatus(status)}
                            className="h-4 w-4 rounded border-slate-300 text-[#4338ca] focus:ring-[#4338ca]"
                          />
                          <span className="text-sm text-slate-700">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Priority</p>
                    <div className="space-y-1.5">
                      {PRIORITY_OPTIONS.map((priority) => (
                        <label key={priority} className="flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={filters.priorities.includes(priority)}
                            onChange={() => togglePriority(priority)}
                            className="h-4 w-4 rounded border-slate-300 text-[#4338ca] focus:ring-[#4338ca]"
                          />
                          <span className="inline-flex items-center gap-1.5 text-sm text-slate-700">
                            <span className={`h-2 w-2 rounded-full ${priorityDot[priority]}`} />
                            {priority}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
                    <input
                      type="checkbox"
                      checked={filters.followUpOnly}
                      onChange={(e) => setFilters((prev) => ({ ...prev, followUpOnly: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-[#4338ca] focus:ring-[#4338ca]"
                    />
                    <span className="text-sm font-medium text-slate-700">Follow-up scheduled only</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="mt-4 w-full rounded-lg bg-[#4338ca] px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Apply filters
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#4338ca] px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
          >
            <HiPlus className="h-4 w-4" />
            Add New Client
          </button>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Active filters:</span>
          {filters.statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-[#4338ca] hover:bg-indigo-100"
            >
              {status}
              <HiXMark className="h-3 w-3" />
            </button>
          ))}
          {filters.priorities.map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => togglePriority(priority)}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-[#4338ca] hover:bg-indigo-100"
            >
              {priority} priority
              <HiXMark className="h-3 w-3" />
            </button>
          ))}
          {filters.followUpOnly && (
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, followUpOnly: false }))}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-[#4338ca] hover:bg-indigo-100"
            >
              Follow-up scheduled
              <HiXMark className="h-3 w-3" />
            </button>
          )}
          <button type="button" onClick={clearFilters} className="text-xs font-semibold text-slate-500 hover:text-[#4338ca]">
            Clear all
          </button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {dashboardStats.map((s, i) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${statBg[s.color]}`}>
                <AppIcon name={s.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-600">{s.label}</p>
                <p className="text-2xl font-bold text-slate-900">{i === 0 ? clients.length : s.value}</p>
              </div>
            </div>
            <button type="button" className="mt-3 text-xs font-semibold text-[#4338ca] hover:underline">
              {i === 0 ? 'View all →' : 'View →'}
            </button>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3.5">
          <h2 className="font-bold text-slate-900">Client Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <tr>
                {['Client', 'Status', 'Needs / Path', 'Last Contact', 'Next Follow-Up', 'Priority', 'Updated', 'Actions'].map(
                  (h) => (
                    <th key={h} className="px-4 py-3">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                    No clients match your search or filters.
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50/80">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.avatarBg}`}
                        >
                          {c.initials}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900">{c.name}</p>
                          <p className="text-xs text-slate-500">{c.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${toneMap[c.statusTone]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-start gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4338ca]">
                          <AppIcon name={c.pathIcon} className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="font-semibold text-slate-800">{c.pathNeed}</p>
                          <p className="text-xs text-slate-500">{c.pathPlan}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600">{c.lastContact}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-slate-700">{c.nextFollowUp}</p>
                      {c.nextFollowUpTime && <p className="text-xs text-slate-500">{c.nextFollowUpTime}</p>}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <span className={`h-2 w-2 rounded-full ${priorityDot[c.priority]}`} />
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{c.updated}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/agent/cases/${c.id}`}
                          className="whitespace-nowrap rounded-lg border border-[#4338ca] px-3 py-1.5 text-xs font-semibold text-[#4338ca] hover:bg-indigo-50"
                        >
                          Manage Client
                        </Link>
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                          aria-label="More actions"
                        >
                          <HiEllipsisVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-slate-500">
            Showing {rangeStart} to {rangeEnd} of {filtered.length} clients
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Previous page"
            >
              <HiChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold ${
                  p === safePage ? 'bg-[#4338ca] text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Next page"
            >
              <HiChevronRight className="h-4 w-4" />
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-2 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-600"
            >
              <option value={8}>Show 8 per page</option>
              <option value={10}>Show 10 per page</option>
              <option value={25}>Show 25 per page</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-slate-700">
        <HiInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
        <p>
          Click <strong>Manage Client</strong> to view details, update information, add notes, and take action.
        </p>
      </div>

      <AddNewClientModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAddClient} />
    </div>
  )
}
