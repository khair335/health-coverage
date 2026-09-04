import { Children, isValidElement, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function Button({ to, children, variant = 'primary', className = '', type = 'button', ...props }) {
  const styles = {
    primary: 'bg-[#4338ca] text-white hover:bg-[#3730a3] shadow-sm active:scale-[0.98]',
    secondary: 'bg-white text-[#4338ca] border border-[#4338ca]/30 hover:bg-indigo-50',
    ghost: 'bg-transparent text-[#4338ca] hover:underline px-0',
    gold: 'bg-amber text-white hover:bg-amber/90',
  }[variant]

  const cls = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg sm:p-5 ${className}`}>{children}</div>
  )
}

export function Field({ label, hint, children, htmlFor }) {
  return (
    <div className="block">
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-[#0f172a] sm:text-sm">
          {label}
        </label>
      )}
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted sm:text-sm">{hint}</span>}
    </div>
  )
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className={`min-h-11 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors duration-150 focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/15 sm:min-h-12 sm:px-4 sm:py-3 sm:text-base ${props.className || ''}`}
    />
  )
}

function optionsFromChildren(children) {
  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const value =
        child.props.value !== undefined && child.props.value !== null
          ? String(child.props.value)
          : String(child.props.children ?? '')
      const label = String(child.props.children ?? value)
      return { value, label, disabled: Boolean(child.props.disabled) }
    })
}

/** Custom dropdown — drop-in replacement for native <select> */
export function Select({ children, options, value, onChange, className = '', id, placeholder = 'Select…', disabled }) {
  const list = useMemo(
    () => (options?.length ? options : optionsFromChildren(children)),
    [options, children],
  )
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()
  const selected = list.find((o) => o.value === String(value ?? ''))

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (next) => {
    if (disabled) return
    onChange?.({ target: { value: next } })
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-left text-sm transition sm:min-h-12 sm:px-4 sm:py-3 sm:text-base ${
          open ? 'border-[#4338ca] ring-2 ring-[#4338ca]/15' : 'border-line hover:border-[#4338ca]/40'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <span className={selected ? 'text-ink' : 'text-muted'}>{selected?.label || placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="animate-dropdown absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-line bg-white py-1 shadow-lg"
        >
          {list.map((opt) => {
            const active = opt.value === String(value ?? '')
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => pick(opt.value)}
                  className={`flex w-full items-center px-3.5 py-2.5 text-left text-sm sm:px-4 sm:text-base ${
                    active ? 'bg-indigo-50 font-semibold text-[#4338ca]' : 'text-ink hover:bg-[#f8faff]'
                  } ${opt.disabled ? 'opacity-40' : ''}`}
                >
                  {opt.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function Choice({ selected, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 w-full rounded-xl border px-3.5 py-3 text-left text-sm transition duration-150 sm:min-h-12 sm:px-4 sm:py-3.5 sm:text-base ${
        selected
          ? 'border-[#4338ca] bg-indigo-50 font-semibold text-[#4338ca]'
          : 'border-line bg-white hover:border-[#4338ca]/40 hover:bg-indigo-50/30'
      }`}
    >
      {children}
    </button>
  )
}

export function Notice({ children, tone = 'info', className = '' }) {
  const map = {
    info: 'bg-indigo-50 text-[#4338ca] border-indigo-200',
    warn: 'bg-amber-50 text-amber-950 border-amber-200',
    alert: 'bg-red-50 text-red-900 border-red-200',
  }
  return (
    <div className={`rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed sm:px-4 sm:py-3 sm:text-sm ${map[tone]} ${className}`}>
      {children}
    </div>
  )
}

export function PageTitle({ kicker, title, subtitle }) {
  return (
    <header className="mb-5 sm:mb-6">
      {kicker && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#6366f1] sm:text-xs">{kicker}</p>
      )}
      <h1 className="text-2xl font-extrabold text-[#0f172a] sm:text-3xl md:text-4xl">{title}</h1>
      {subtitle && (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted sm:mt-2 sm:text-base">{subtitle}</p>
      )}
    </header>
  )
}

export function Badge({ children, tone = 'ocean' }) {
  const map = {
    ocean: 'bg-indigo-100 text-[#4338ca]',
    teal: 'bg-indigo-100 text-[#4338ca]',
    gold: 'bg-amber-100 text-amber-900',
    coral: 'bg-indigo-100 text-[#4338ca]',
    gray: 'bg-slate-100 text-slate-700',
  }
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[tone] || map.ocean}`}>
      {children}
    </span>
  )
}
