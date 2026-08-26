import { Button, Choice, Notice, PageTitle } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { mockMedications, mockProviders } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useMemo, useState } from 'react'

export default function Care() {
  const { data, update } = useAssessment()
  const [qDoc, setQDoc] = useState('')
  const [qRx, setQRx] = useState('')

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
  }
  const remove = (key, id) => update({ [key]: data[key].filter((x) => x.id !== id) })

  return (
    <div>
      <StepProgress current="/care" />
      <PageTitle
        kicker="S07 · Doctors & prescriptions"
        title="Doctors and medications (optional)"
        subtitle="This can improve a recommendation when network and formulary data exist. We never guarantee a doctor is in-network — confirm with the carrier."
      />
      <Notice tone="warn">
        Sample directory only. Network and drug lists change. A licensed producer will confirm before
        any enrollment.
      </Notice>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-semibold text-ocean">Find a doctor</h2>
          <input
            className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3"
            placeholder="Search name"
            value={qDoc}
            onChange={(e) => setQDoc(e.target.value)}
          />
          <ul className="mt-3 space-y-2">
            {docs.map((p) => (
              <li key={p.id}>
                <Choice selected={data.providers.some((x) => x.id === p.id)} onClick={() => add('providers', p)}>
                  {p.name}
                  <span className="block text-sm font-normal text-muted">{p.city}</span>
                </Choice>
              </li>
            ))}
          </ul>
          {data.providers.length > 0 && (
            <ul className="mt-3 text-sm">
              {data.providers.map((p) => (
                <li key={p.id} className="flex justify-between py-1">
                  {p.name}
                  <button type="button" className="text-red-700" onClick={() => remove('providers', p.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="font-semibold text-ocean">Find a medication</h2>
          <input
            className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3"
            placeholder="Search medication"
            value={qRx}
            onChange={(e) => setQRx(e.target.value)}
          />
          <ul className="mt-3 space-y-2">
            {rxs.map((m) => (
              <li key={m.id}>
                <Choice
                  selected={data.medications.some((x) => x.id === m.id)}
                  onClick={() => add('medications', m)}
                >
                  {m.name}
                </Choice>
              </li>
            ))}
          </ul>
          {data.medications.length > 0 && (
            <ul className="mt-3 text-sm">
              {data.medications.map((m) => (
                <li key={m.id} className="flex justify-between py-1">
                  {m.name}
                  <button type="button" className="text-red-700" onClick={() => remove('medications', m.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button to="/preferences" variant="secondary">
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/paths" variant="secondary">
            Skip for now
          </Button>
          <Button to="/paths">Continue</Button>
        </div>
      </div>
    </div>
  )
}
