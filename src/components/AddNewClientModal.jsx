import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import { Field, Select, TextInput } from './ui'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  status: 'New Lead',
  pathNeed: '',
  pathPlan: '',
  priority: 'Medium',
}

export function AddNewClientModal({ open, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!open) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    onSave(form)
    setForm(emptyForm)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Add New Client</h2>
            <p className="text-sm text-slate-500">Create a client record in your dashboard.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4 px-5 py-5">
          <Field label="Full name *">
            <TextInput value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="e.g. Sarah Mitchell" required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone *">
              <TextInput value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="(732) 555-0189" required />
            </Field>
            <Field label="Email">
              <TextInput type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="client@email.com" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Status">
              <Select value={form.status} onChange={(e) => set({ status: e.target.value })}>
                {['New Lead', 'Needs Help Choosing', 'Contacted', 'Quote Sent', 'Application In Progress', 'Follow-Up', 'Enrolled'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <Field label="Priority">
              <Select value={form.priority} onChange={(e) => set({ priority: e.target.value })}>
                {['High', 'Medium', 'Low'].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Coverage need">
            <TextInput value={form.pathNeed} onChange={(e) => set({ pathNeed: e.target.value })} placeholder="e.g. Cost savings" />
          </Field>
          <Field label="Plan / path">
            <TextInput value={form.pathPlan} onChange={(e) => set({ pathPlan: e.target.value })} placeholder="e.g. ACA Marketplace" />
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl bg-[#4338ca] px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
