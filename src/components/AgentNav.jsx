import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/agent', label: 'Dashboard', end: true },
  { to: '/agent/clients', label: 'Clients' },
  { to: '/agent/tasks', label: 'Tasks / Follow-Ups' },
  { to: '/agent/reports', label: 'Reports' },
]

export function AgentHeaderNav() {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition ${
              isActive
                ? 'border-[#4338ca] text-[#4338ca]'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function AgentUserBadge() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4338ca] text-sm font-bold text-white">
        JM
      </span>
      <div className="hidden text-left md:block">
        <p className="text-sm font-semibold text-slate-900">Jean Marc Dube</p>
        <p className="text-xs text-slate-500">Licensed Broker</p>
      </div>
    </div>
  )
}
