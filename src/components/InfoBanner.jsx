import { AppIcon } from './AppIcons'

export function InfoBanner({ iconName, children, className = '' }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-slate-700 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
        <AppIcon name={iconName} className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
