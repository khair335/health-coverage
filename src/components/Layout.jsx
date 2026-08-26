import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { PageTransition } from './StepProgress'

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

  const linkIdle = isHome ? 'text-mist/90 hover:bg-white/10' : 'text-muted hover:bg-sky'
  const brandShort = agent ? 'HCN Agent' : 'HCN'

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur ${
          isHome ? 'border-white/10 bg-ocean/95 text-white' : 'border-line bg-white/95 text-ocean'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
          <Link to={agent ? '/agent' : '/'} className="flex min-w-0 items-center gap-2 font-semibold sm:gap-2.5">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base leading-none sm:h-9 sm:w-9 sm:rounded-xl sm:text-lg ${
                isHome ? 'bg-coral text-white' : 'bg-ocean text-white'
              }`}
            >
              +
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm sm:hidden">{brandShort}</span>
              <span className="hidden text-base sm:block">
                Health Coverage Navigator
                {agent && (
                  <span className="block text-xs font-normal text-muted">Licensed producer</span>
                )}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex md:gap-2">
            {!agent && (
              <>
                <a href={isHome ? '#how-it-works' : '/#how-it-works'} className={`rounded-lg px-3 py-2 text-sm ${linkIdle}`}>
                  How it works
                </a>
                <a href={isHome ? '#faq' : '/#faq'} className={`rounded-lg px-3 py-2 text-sm ${linkIdle}`}>
                  FAQ
                </a>
                <Link to="/privacy" className={`rounded-lg px-3 py-2 text-sm ${linkIdle}`}>
                  Privacy
                </Link>
                <Link
                  to="/location"
                  className="rounded-lg bg-coral px-3 py-2 text-sm font-semibold text-white hover:bg-coral-dark"
                >
                  Start
                </Link>
              </>
            )}
            <NavLink to={agent ? '/' : '/agent'} className={`rounded-lg px-3 py-2 text-sm ${linkIdle}`}>
              {agent ? 'Customer site' : 'Agent'}
            </NavLink>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 md:hidden">
            {!agent && (
              <Link
                to="/location"
                className="rounded-lg bg-coral px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-coral-dark"
              >
                Start
              </Link>
            )}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                isHome ? 'bg-white/10 text-white' : 'bg-sky text-ocean'
              }`}
            >
              <span className="sr-only">Menu</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            className={`animate-dropdown border-t md:hidden ${
              isHome ? 'border-white/10 bg-ocean' : 'border-line bg-white'
            }`}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 text-sm">
              {!agent && (
                <>
                  <a
                    href={isHome ? '#how-it-works' : '/#how-it-works'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 ${linkIdle}`}
                  >
                    How it works
                  </a>
                  <a
                    href={isHome ? '#who' : '/#who'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 ${linkIdle}`}
                  >
                    Who this helps
                  </a>
                  <a
                    href={isHome ? '#faq' : '/#faq'}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-2.5 ${linkIdle}`}
                  >
                    FAQ
                  </a>
                  <Link to="/privacy" className={`rounded-lg px-3 py-2.5 ${linkIdle}`}>
                    Privacy
                  </Link>
                  <Link
                    to="/location"
                    className="mt-1 rounded-lg bg-coral px-3 py-2.5 text-center font-semibold text-white"
                  >
                    Start assessment
                  </Link>
                </>
              )}
              <NavLink to={agent ? '/' : '/agent'} className={`rounded-lg px-3 py-2.5 ${linkIdle}`}>
                {agent ? 'Customer site' : 'Agent dashboard'}
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      <main
        id="main"
        className={isHome ? 'w-full flex-1' : 'mx-auto w-full max-w-5xl flex-1 px-3 py-5 pb-24 sm:px-4 sm:py-8 sm:pb-8'}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <footer className="border-t border-line bg-ocean text-mist">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:gap-10 sm:py-12">
          <div>
            <p className="font-serif text-lg text-white sm:text-xl">Health Coverage Navigator</p>
            <p className="mt-2 text-xs leading-relaxed text-mist/80 sm:text-sm">
              Plain-language screening and licensed-producer handoff for New Jersey households. Not an
              official Medicaid or Marketplace decision.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-coral">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
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
            <p className="text-xs font-semibold uppercase tracking-wider text-coral">Producers</p>
            <ul className="mt-3 space-y-2 text-sm">
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
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-[11px] text-mist/60 sm:flex-row sm:justify-between sm:text-xs">
            <p>Screening only · Demo frontend with sample data</p>
            <p>© {new Date().getFullYear()} Health Coverage Navigator</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
