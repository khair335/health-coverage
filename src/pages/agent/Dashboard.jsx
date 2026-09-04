import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  HiAdjustmentsHorizontal,
  HiChevronLeft,
  HiChevronRight,
  HiEllipsisVertical,
  HiMagnifyingGlass,
  HiPhone,
  HiPlus,
  HiXMark,
} from 'react-icons/hi2'
import { HiInformationCircle } from 'react-icons/hi'
import { AddNewClientModal } from '../../components/AddNewClientModal'
import { AppIcon } from '../../components/AppIcons'
import { useToast } from '../../components/Toast'
import { dashboardClients as initialClients, dashboardStats, statBg } from '../../data/mock'

const toneMap = {
  amber: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  violet: 'bg-purple-100 text-purple-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-700',
}

const statusToneMap = {
  'New Lead': 'slate',
  'Needs Help Choosing': 'amber',
  Contacted: 'blue',
  'Quote Sent': 'violet',
  'Application In Progress': 'rose',
  'Follow-Up': 'violet',
  Enrolled: 'emerald',
  'Application Submitted': 'emerald',
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

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/)
  return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase()
}

function RowActionsMenu({ client, open, onClose, onAction, menuRef }) {
  if (!open) return null
  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full z-40 mt-1 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl"
    >
      <button
        type="button"
        className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-[#4338ca]"
        onClick={() => onAction('manage')}
      >
        Manage client
      </button>
      <button
        type="button"
        className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-[#4338ca]"
        onClick={() => onAction('call')}
      >
        Call {client.phone}
      </button>
      <button
        type="button"
        className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-[#4338ca]"
        onClick={() => onAction('copyPhone')}
      >
        Copy phone number
      </button>
      <button
        type="button"
        className="block w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-[#4338ca]"
        onClick={() => onAction('schedule')}
      >
        Schedule follow-up
      </button>
      <div className="my-1 border-t border-slate-100" />
      <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Set status</p>
      {STATUS_OPTIONS.slice(0, 6).map((status) => (
        <button
          key={status}
          type="button"
          className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-indigo-50 ${
            client.status === status ? 'font-bold text-[#4338ca]' : 'text-slate-600'
          }`}
          onClick={() => onAction('status', status)}
        >
          {status}
        </button>
      ))}
      <div className="my-1 border-t border-slate-100" />
      <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Priority</p>
      {PRIORITY_OPTIONS.map((priority) => (
        <button
          key={priority}
          type="button"
          className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-indigo-50 ${
            client.priority === priority ? 'font-bold text-[#4338ca]' : 'text-slate-600'
          }`}
          onClick={() => onAction('priority', priority)}
        >
          <span className={`h-2 w-2 rounded-full ${priorityDot[priority]}`} />
          {priority}
        </button>
      ))}
      <div className="my-1 border-t border-slate-100" />
      <button
        type="button"
        className="block w-full px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
        onClick={() => onAction('remove')}
      >
        Remove from list
      </button>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const toast = useToast()
  const [clients, setClients] = useState(initialClients)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const [addOpen, setAddOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState(emptyFilters)
  const [menuId, setMenuId] = useState(null)
  const filtersRef = useRef(null)
  const tableRef = useRef(null)
  const menuRef = useRef(null)

  const statCounts = useMemo(() => {
    const needsHelp = clients.filter((c) => c.status === 'Needs Help Choosing').length
    const followUps = clients.filter((c) => c.nextFollowUp && c.nextFollowUp !== '—').length
    const applications = clients.filter((c) =>
      ['Application In Progress', 'Application Submitted', 'Quote Sent'].includes(c.status),
    ).length
    const enrolled = clients.filter((c) => c.status === 'Enrolled').length
    return {
      all: clients.length,
      needsHelp,
      followUps,
      applications,
      enrolled,
    }
  }, [clients])

  const applyStatFilter = (filterKey) => {
    setPage(1)
    setQuery('')
    if (filterKey === 'all') {
      setFilters(emptyFilters)
    } else if (filterKey === 'needsHelp') {
      setFilters({ statuses: ['Needs Help Choosing'], priorities: [], followUpOnly: false })
    } else if (filterKey === 'followUps') {
      setFilters({ statuses: [], priorities: [], followUpOnly: true })
    } else if (filterKey === 'applications') {
      setFilters({
        statuses: ['Application In Progress', 'Application Submitted', 'Quote Sent'],
        priorities: [],
        followUpOnly: false,
      })
    } else if (filterKey === 'enrolled') {
      setFilters({ statuses: ['Enrolled'], priorities: [], followUpOnly: false })
    }
    requestAnimationFrame(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const activeFilterCount =
    filters.statuses.length + filters.priorities.length + (filters.followUpOnly ? 1 : 0)

  useEffect(() => {
    if (!filtersOpen && !menuId) return undefined
    const handleClick = (e) => {
      if (filtersOpen && filtersRef.current && !filtersRef.current.contains(e.target)) {
        setFiltersOpen(false)
      }
      if (menuId && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [filtersOpen, menuId])

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

  const updateClient = (id, patch) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch, updated: todayLabel() } : c)),
    )
  }

  const handleRowAction = (client, action, value) => {
    setMenuId(null)
    if (action === 'manage') {
      navigate(`/agent/cases/${client.id}`)
      return
    }
    if (action === 'call') {
      window.location.href = `tel:${client.phone.replace(/\D/g, '')}`
      toast.success(`Calling ${client.name}…`)
      updateClient(client.id, {
        lastContact: todayLabel(),
        status: client.status === 'New Lead' ? 'Contacted' : client.status,
        statusTone: client.status === 'New Lead' ? 'blue' : client.statusTone,
      })
      return
    }
    if (action === 'copyPhone') {
      navigator.clipboard?.writeText(client.phone).then(
        () => toast.success('Phone number copied'),
        () => toast.error('Could not copy phone'),
      )
      return
    }
    if (action === 'schedule') {
      const next = new Date()
      next.setDate(next.getDate() + 2)
      const nextLabel = next.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      updateClient(client.id, {
        nextFollowUp: nextLabel,
        nextFollowUpTime: '10:00 AM',
        status: client.status === 'Enrolled' ? client.status : 'Follow-Up',
        statusTone: client.status === 'Enrolled' ? client.statusTone : 'violet',
      })
      toast.success(`Follow-up set for ${client.name} · ${nextLabel}`)
      return
    }
    if (action === 'status') {
      updateClient(client.id, { status: value, statusTone: statusToneMap[value] || 'slate' })
      toast.success(`${client.name} → ${value}`)
      return
    }
    if (action === 'priority') {
      updateClient(client.id, { priority: value })
      toast.success(`${client.name} priority → ${value}`)
      return
    }
    if (action === 'remove') {
      setClients((prev) => prev.filter((c) => c.id !== client.id))
      toast.success(`${client.name} removed from list`)
    }
  }

  const handleAddClient = (form) => {
    const id = `CASE-100${300 + clients.length}`
    setClients((prev) => [
      {
        id,
        name: form.name.trim(),
        phone: form.phone.trim(),
        initials: initialsFromName(form.name),
        avatarBg: avatarPalette[prev.length % avatarPalette.length],
        status: form.status,
        statusTone: statusToneMap[form.status] || 'slate',
        pathNeed: form.pathNeed.trim() || 'Coverage review',
        pathPlan: form.pathPlan.trim() || 'To be determined',
        pathIcon: 'sparkles',
        lastContact: todayLabel(),
        nextFollowUp: '—',
        nextFollowUpTime: '',
        priority: form.priority,
        updated: todayLabel(),
      },
      ...prev,
    ])
    toast.success(`${form.name.trim()} added`)
    setPage(1)
    setFilters(emptyFilters)
    setQuery('')
  }

  const filtered = useMemo(
    () =>
      clients.filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.toLowerCase().includes(query.toLowerCase()) ||
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
        {dashboardStats.map((s) => {
          const count = statCounts[s.filterKey] ?? s.value
          const isActive =
            (s.filterKey === 'all' && activeFilterCount === 0) ||
            (s.filterKey === 'needsHelp' &&
              filters.statuses.length === 1 &&
              filters.statuses[0] === 'Needs Help Choosing') ||
            (s.filterKey === 'followUps' && filters.followUpOnly) ||
            (s.filterKey === 'applications' &&
              filters.statuses.includes('Application In Progress') &&
              !filters.followUpOnly) ||
            (s.filterKey === 'enrolled' &&
              filters.statuses.length === 1 &&
              filters.statuses[0] === 'Enrolled')
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => applyStatFilter(s.filterKey)}
              className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-[#4338ca]/50 ${
                isActive ? 'border-[#4338ca] ring-2 ring-indigo-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${statBg[s.color]}`}>
                  <AppIcon name={s.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-600">{s.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{count}</p>
                </div>
              </div>
              <span className="mt-3 inline-block text-xs font-semibold text-[#4338ca]">
                {s.filterKey === 'all' ? 'View all →' : 'View →'}
              </span>
            </button>
          )
        })}
      </div>

      <div ref={tableRef} className="scroll-mt-24 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-3.5">
          <h2 className="font-bold text-slate-900">
            Client Overview
            {activeFilterCount > 0 && (
              <span className="ml-2 text-sm font-medium text-slate-500">({filtered.length} matching)</span>
            )}
          </h2>
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
                          <Link
                            to={`/agent/cases/${c.id}`}
                            className="font-semibold text-slate-900 hover:text-[#4338ca] hover:underline"
                          >
                            {c.name}
                          </Link>
                          <a
                            href={`tel:${c.phone.replace(/\D/g, '')}`}
                            className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 hover:text-[#4338ca]"
                          >
                            <HiPhone className="h-3 w-3" />
                            {c.phone}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleRowAction(c, 'status', e.target.value)
                        }
                        className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold focus:ring-2 focus:ring-indigo-200 ${toneMap[c.statusTone]}`}
                        aria-label={`Status for ${c.name}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
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
                      <select
                        value={c.priority}
                        onChange={(e) => handleRowAction(c, 'priority', e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:border-[#4338ca] focus:outline-none"
                        aria-label={`Priority for ${c.name}`}
                      >
                        {PRIORITY_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500">{c.updated}</td>
                    <td className="px-4 py-3.5">
                      <div className="relative flex items-center gap-2">
                        <Link
                          to={`/agent/cases/${c.id}`}
                          className="whitespace-nowrap rounded-lg border border-[#4338ca] px-3 py-1.5 text-xs font-semibold text-[#4338ca] hover:bg-indigo-50"
                        >
                          Manage Client
                        </Link>
                        <button
                          type="button"
                          className={`rounded-lg p-1.5 hover:bg-slate-100 ${
                            menuId === c.id ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          aria-label={`More actions for ${c.name}`}
                          aria-expanded={menuId === c.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            setMenuId((id) => (id === c.id ? null : c.id))
                          }}
                        >
                          <HiEllipsisVertical className="h-4 w-4" />
                        </button>
                        {menuId === c.id && (
                          <RowActionsMenu
                            client={c}
                            open
                            menuRef={menuRef}
                            onClose={() => setMenuId(null)}
                            onAction={(action, value) => handleRowAction(c, action, value)}
                          />
                        )}
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
          Use <strong>Manage Client</strong> for the full record, or the <strong>⋮</strong> menu to call, schedule
          follow-ups, change status/priority, or remove a client.
        </p>
      </div>

      <AddNewClientModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAddClient} />
    </div>
  )
}
