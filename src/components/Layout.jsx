import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { PageTransition } from './StepProgress'
import { AgentHeaderNav, AgentUserBadge } from './AgentNav'

const agentTabs = [
  { to: '/agent', label: 'Dashboard', end: true },
  { to: '/agent/clients', label: 'Clients' },
  { to: '/agent/tasks', label: 'Tasks / Follow-Ups' },
  { to: '/agent/reports', label: 'Reports' },
]

export function Layout({ agent = false }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/' && !agent
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkIdle = isHome ? 'text-indigo-200 hover:bg-white/10' : 'text-muted hover:bg-indigo-50'
  const brandShort = agent ? 'HCN Agent' : 'HCN'

  return (
    <div className={`flex min-h-screen flex-col ${agent ? 'bg-slate-50' : ''}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
          agent
            ? 'border-slate-200 bg-white text-slate-900 shadow-sm'
            : isHome
              ? 'border-white/10 bg-[#1e1147]/90 text-white shadow-lg shadow-black/10'
              : 'border-slate-200/80 bg-white/90 text-slate-900 shadow-xs'
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 ${agent ? 'py-0' : 'py-3'}`}>
          {/* Logo & Brand */}
          <Link to={agent ? '/agent' : '/'} className="group flex shrink-0 items-center gap-3 font-bold tracking-tight">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold shadow-md transition-transform duration-200 group-hover:scale-105 ${
                agent
                  ? 'bg-[#4338ca] text-white shadow-indigo-500/20'
                  : isHome
                    ? 'bg-gradient-to-tr from-indigo-500 to-indigo-400 text-white shadow-indigo-500/25'
                    : 'bg-gradient-to-tr from-[#4338ca] to-indigo-500 text-white shadow-indigo-500/20'
              }`}
            >
              {agent ? (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.66c0 3.87-2.55 7.5-6 8.56-3.45-1.06-6-4.69-6-8.56V6.43l6-2.25z" />
                  <path d="M11 8h2v6h-2zm0 8h2v2h-2z" fill="white" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`text-base font-extrabold tracking-tight ${isHome && !agent ? 'text-white' : 'text-[#0f172a]'}`}>
                Health Coverage
                <span className="text-indigo-500 ml-1">Navigator</span>
              </span>
              {agent && (
                <span className="text-[11px] font-medium text-slate-500">Licensed Insurance Broker</span>
              )}
            </div>
          </Link>

          {agent && <AgentHeaderNav />}

          <nav className={`flex items-center gap-1 ${agent ? '' : 'hidden md:flex'}`}>
            {!agent && (
              <>
                <a
                  href={isHome ? '#how-it-works' : '/#how-it-works'}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
                    isHome ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca]'
                  }`}
                >
                  How it works
                </a>
                <a
                  href={isHome ? '#faq' : '/#faq'}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
                    isHome ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca]'
                  }`}
                >
                  FAQ
                </a>
                <Link
                  to="/privacy"
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
                    isHome ? 'text-indigo-200 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-indigo-50 hover:text-[#4338ca]'
                  }`}
                >
                  Privacy
                </Link>
                <Link
                  to="/location"
                  className="ml-2 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#4338ca] to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-700 hover:to-indigo-600 hover:shadow-indigo-500/35 transition-all duration-200 active:scale-95"
                >
                  Start Assessment
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  state={{ backTo: '/', fromNav: true }}
                  onClick={() =>
                    sessionStorage.setItem(
                      'hcn-contact-back',
                      JSON.stringify({ backTo: '/', fromNav: true, fromInterest: false }),
                    )
                  }
                  className="ml-2 hidden items-center gap-1.5 rounded-xl border border-indigo-300 bg-white px-4 py-2 text-sm font-bold text-[#4338ca] hover:bg-indigo-50 lg:inline-flex"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Talk to a Licensed Broker
                </Link>
              </>
            )}
            {!agent && (
            <NavLink
              to="/agent"
              className="ml-2 rounded-xl border border-indigo-200 bg-indigo-50/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 transition-colors hover:bg-indigo-100"
            >
              Agent Access
            </NavLink>
            )}
            {agent && <AgentUserBadge />}
          </nav>

          {/* Mobile controls */}
          <div className={`flex items-center gap-2 ${agent ? 'lg:hidden' : 'md:hidden'}`}>
            {agent ? (
              <AgentUserBadge />
            ) : (
              <Link
                to="/location"
                className="rounded-xl bg-[#4338ca] px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Start
              </Link>
            )}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                isHome ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-indigo-50 text-[#4338ca] hover:bg-indigo-100'
              }`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className={`animate-dropdown border-t ${agent ? 'lg:hidden' : 'md:hidden'} ${
              isHome ? 'border-white/10 bg-[#1e1147]' : 'border-slate-200 bg-white'
            }`}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-4 text-sm font-semibold">
              {agent ? (
                <>
                  {agentTabs.map((tab) => (
                    <NavLink
                      key={tab.label}
                      to={tab.to}
                      end={tab.end}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `rounded-xl px-3.5 py-2.5 ${isActive ? 'bg-indigo-50 text-[#4338ca]' : 'text-slate-600 hover:bg-slate-50'}`
                      }
                    >
                      {tab.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-600"
                  >
                    Customer site
                  </NavLink>
                </>
              ) : (
                <>
                  <a
                    href={isHome ? '#how-it-works' : '/#how-it-works'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-3.5 py-2.5 ${linkIdle}`}
                  >
                    How it works
                  </a>
                  <a
                    href={isHome ? '#who' : '/#who'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-3.5 py-2.5 ${linkIdle}`}
                  >
                    Who this helps
                  </a>
                  <a
                    href={isHome ? '#faq' : '/#faq'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-xl px-3.5 py-2.5 ${linkIdle}`}
                  >
                    FAQ
                  </a>
                  <Link to="/privacy" className={`rounded-xl px-3.5 py-2.5 ${linkIdle}`}>
                    Privacy
                  </Link>
                  <Link
                    to="/contact"
                    state={{ backTo: '/', fromNav: true }}
                    onClick={() => {
                      setMenuOpen(false)
                      sessionStorage.setItem(
                        'hcn-contact-back',
                        JSON.stringify({ backTo: '/', fromNav: true, fromInterest: false }),
                      )
                    }}
                    className="rounded-xl border border-indigo-300 bg-white px-4 py-3 text-center font-bold text-[#4338ca] hover:bg-indigo-50"
                  >
                    Talk to a Licensed Broker
                  </Link>
                  <Link
                    to="/location"
                    className="mt-2 rounded-xl bg-gradient-to-r from-[#4338ca] to-indigo-600 px-4 py-3 text-center font-bold text-white shadow-md shadow-indigo-500/25"
                  >
                    Start assessment
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main
        id="main"
        className={isHome ? 'w-full flex-1' : agent ? 'mx-auto w-full max-w-7xl flex-1 px-3 py-5 pb-24 sm:px-6 sm:py-8 sm:pb-8' : 'mx-auto w-full max-w-5xl flex-1 px-3 py-5 pb-24 sm:px-4 sm:py-8 sm:pb-8'}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <footer className={`border-t ${agent ? 'hidden' : 'border-white/10 bg-[#1e1147] text-indigo-200'}`}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:gap-10 sm:py-12">
          <div>
            <p className="text-lg font-bold text-white sm:text-xl tracking-tight">Health Coverage Navigator</p>
            <p className="mt-2 text-xs leading-relaxed text-indigo-300/80 sm:text-sm">
              Plain-language screening and licensed-producer handoff for New Jersey households. Not an
              official Medicaid or Marketplace decision.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-indigo-200">
              <li>
                <Link to="/location" className="hover:text-white">
                  Start assessment
                </Link>
              </li>
              <li>
                <a href={isHome ? '#how-it-works' : '/#how-it-works'} className="hover:text-white">
                  How it works
                </a>
              </li>
              <li>
                <a href={isHome ? '#faq' : '/#faq'} className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Producers</p>
            <ul className="mt-3 space-y-2 text-sm text-indigo-200">
              <li>
                <Link to="/agent" className="hover:text-white">
                  Producer login (demo)
                </Link>
              </li>
              <li className="text-mist/70">NY and Florida modules planned next.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-[11px] text-indigo-300/60 sm:flex-row sm:justify-between sm:text-xs">
            <p>Screening only · Demo frontend with sample data</p>
            <p>© {new Date().getFullYear()} Health Coverage Navigator</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
