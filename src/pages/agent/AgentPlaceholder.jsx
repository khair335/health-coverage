export default function AgentPlaceholder({ title, description }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-600">{description}</p>
    </div>
  )
}
