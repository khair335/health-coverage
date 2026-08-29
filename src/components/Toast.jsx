import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ToastCtx = createContext(null)

const ICONS = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-green-400">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-red-400">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
  warn: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-amber-400">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-indigo-400">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
}

const BARS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warn: 'bg-amber-400',
  info: 'bg-indigo-500',
}

function ToastItem({ id, type = 'info', title, message, duration = 4000, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const timerRef = useRef(null)

  const dismiss = useCallback(() => {
    setLeaving(true)
    setTimeout(() => onDismiss(id), 320)
  }, [id, onDismiss])

  useEffect(() => {
    // Mount animation
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    timerRef.current = setTimeout(dismiss, duration)
    return () => clearTimeout(timerRef.current)
  }, [dismiss, duration])

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`relative w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#1e1147] shadow-2xl transition-all duration-300 ease-out ${
        visible && !leaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {/* Coloured top bar */}
      <div className={`h-0.5 w-full ${BARS[type]}`} />
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span className="mt-0.5 shrink-0">{ICONS[type]}</span>
        <div className="min-w-0 flex-1">
          {title && <p className="text-sm font-semibold text-white">{title}</p>}
          {message && <p className={`text-xs leading-relaxed text-indigo-200 ${title ? 'mt-0.5' : ''}`}>{message}</p>}
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-lg p-0.5 text-indigo-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
          </svg>
        </button>
      </div>
      {/* Auto-dismiss progress line */}
      <div
        className={`h-px origin-left ${BARS[type]} opacity-30`}
        style={{ animation: `toast-progress ${duration}ms linear forwards` }}
      />
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((opts) => {
    const id = ++counter.current
    setToasts((prev) => [...prev.slice(-4), { ...opts, id }]) // max 5 at once
    return id
  }, [])

  // Convenience methods
  toast.success = (msg, opts) => toast({ type: 'success', message: msg, ...opts })
  toast.error   = (msg, opts) => toast({ type: 'error',   message: msg, ...opts })
  toast.warn    = (msg, opts) => toast({ type: 'warn',    message: msg, ...opts })
  toast.info    = (msg, opts) => toast({ type: 'info',    message: msg, ...opts })

  return (
    <ToastCtx.Provider value={toast}>
      {children}
      {/* Portal-like fixed container */}
      <div
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-6 right-4 z-[9999] flex flex-col items-end gap-3 sm:right-6"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem {...t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
