import { Button, Choice, Notice, PageTitle } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { mockMedications, mockProviders } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useMemo, useState } from 'react'
import { useToast } from '../components/Toast'
import { useNavigate } from 'react-router-dom'

export default function Care() {
  const { data, update } = useAssessment()
  const [qDoc, setQDoc] = useState('')
  const [qRx, setQRx] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const docs = useMemo(
    () =>
      mockProviders.filter((p) => p.name.toLowerCase().includes(qDoc.toLowerCase()) || !qDoc),
    [qDoc],
  )
  const rxs = useMemo(
    () =>
      mockMedications.filter((m) => m.name.toLowerCase().includes(qRx.toLowerCase()) || !qRx),
    [qRx],
  )

  const add = (key, item) => {
    if (data[key].some((x) => x.id === item.id)) return
    update({ [key]: [...data[key], item] })
    toast.success(`Added ${item.name} to preferences`)
  }

  const remove = (key, id, name) => {
    update({ [key]: data[key].filter((x) => x.id !== id) })
    toast.warn(`Removed ${name || 'item'}`)
  }

  const handleNext = () => {
    toast.success('Analyzing options and matching recommended coverage paths...')
    navigate('/paths')
  }

  return (
    <div className="mx-auto max-w-4xl">
      <StepProgress current="/care" />

      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5">
        <PageTitle
          kicker="Step 6 · Doctors & Prescriptions"
          title="Care Providers & Medications (Optional)"
          subtitle="Add your primary doctors, specialists, or current prescriptions to filter plans with matching networks."
        />

        <Notice tone="info">
          Directory data uses sample 2026 provider networks. A licensed producer will double-check official carrier networks before finalizing enrollment.
        </Notice>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Doctors Section */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-[#4338ca]">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.593-.934.404-1.41-.75-1.9-2.91-3.24-5.385-3.24H8.85c-2.476 0-4.635 1.34-5.385 3.243z" />
                </svg>
              </div>
              <h2 className="font-bold text-slate-900">Find a Doctor or Hospital</h2>
            </div>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/15"
              placeholder="Search by doctor name..."
              value={qDoc}
              onChange={(e) => setQDoc(e.target.value)}
            />
            <ul className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
              {docs.map((p) => {
                const isSelected = data.providers.some((x) => x.id === p.id)
                return (
                  <li key={p.id}>
                    <Choice selected={isSelected} onClick={() => add('providers', p)}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <span className="font-semibold">{p.name}</span>
                          <span className="block text-xs font-normal text-slate-500">{p.city}</span>
                        </div>
                        {isSelected && <span className="text-xs font-bold text-[#4338ca]">✓ Added</span>}
                      </div>
                    </Choice>
                  </li>
                )
              })}
            </ul>

            {data.providers.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">Selected Doctors ({data.providers.length})</p>
                <ul className="space-y-1.5 text-xs">
                  {data.providers.map((p) => (
                    <li key={p.id} className="flex justify-between items-center rounded-lg bg-white p-2 border border-slate-200">
                      <span className="font-semibold text-slate-800">{p.name}</span>
                      <button type="button" className="text-xs font-bold text-rose-600 hover:underline" onClick={() => remove('providers', p.id, p.name)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Medications Section */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-[#4338ca]">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.5 2A2.5 2.5 0 002 4.5v11A2.5 2.5 0 004.5 18h11a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0015.5 2h-11zm5 4.75a.75.75 0 01.75.75v1.75h1.75a.75.75 0 010 1.5h-1.75v1.75a.75.75 0 01-1.5 0v-1.75H6.75a.75.75 0 010-1.5h1.75V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="font-bold text-slate-900">Find a Prescription Drug</h2>
            </div>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/15"
              placeholder="Search medication name..."
              value={qRx}
              onChange={(e) => setQRx(e.target.value)}
            />
            <ul className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
              {rxs.map((m) => {
                const isSelected = data.medications.some((x) => x.id === m.id)
                return (
                  <li key={m.id}>
                    <Choice selected={isSelected} onClick={() => add('medications', m)}>
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold">{m.name}</span>
                        {isSelected && <span className="text-xs font-bold text-[#4338ca]">✓ Added</span>}
                      </div>
                    </Choice>
                  </li>
                )
              })}
            </ul>

            {data.medications.length > 0 && (
              <div className="mt-4 border-t border-slate-200 pt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">Selected Prescriptions ({data.medications.length})</p>
                <ul className="space-y-1.5 text-xs">
                  {data.medications.map((m) => (
                    <li key={m.id} className="flex justify-between items-center rounded-lg bg-white p-2 border border-slate-200">
                      <span className="font-semibold text-slate-800">{m.name}</span>
                      <button type="button" className="text-xs font-bold text-rose-600 hover:underline" onClick={() => remove('medications', m.id, m.name)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <NavRow back="/preferences" onNext={handleNext} nextLabel="Show Matching Coverage Paths" />
      </div>
    </div>
  )
}
