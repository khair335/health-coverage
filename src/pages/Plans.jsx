import { Badge, Button, Card, Notice, PageTitle } from '../components/ui'
import { plans } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { Link } from 'react-router-dom'

export default function Plans() {
  const { recommendedPlan, data, update } = useAssessment()
  const ranked = [...plans].sort((a, b) =>
    a.id === recommendedPlan.id ? -1 : b.id === recommendedPlan.id ? 1 : 0,
  )

  const toggleCompare = (id) => {
    const has = data.compareIds.includes(id)
    const next = has ? data.compareIds.filter((x) => x !== id) : [...data.compareIds, id].slice(0, 3)
    update({ compareIds: next })
  }

  return (
    <div>
      <PageTitle
        kicker="S09 · Plan comparison"
        title="Compare eligible plan choices"
        subtitle="Sorted by your stated needs — not commission. Premiums are sample estimates."
      />
      <Notice>Data freshness: sample plan year 2026 · Aug 19, 2026. Confirm with the carrier before enrolling.</Notice>

      <div className="mt-6 space-y-3">
        {ranked.map((plan) => {
          const best = plan.id === recommendedPlan.id
          return (
            <Card key={plan.id} className={`!p-4 sm:!p-5 ${best ? 'ring-2 ring-amber' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {best && <Badge tone="gold">Best fit</Badge>}
                    <Badge>{plan.metal}</Badge>
                    <Badge tone="gray">{plan.network}</Badge>
                  </div>
                  <h2 className="mt-1.5 font-serif text-xl text-ocean sm:text-2xl">{plan.name}</h2>
                  <p className="text-sm text-muted">{plan.carrier}</p>
                </div>
                <p className="text-right">
                  <span className="block text-2xl font-semibold text-ocean sm:text-3xl">${plan.premium}</span>
                  <span className="text-xs text-muted">est. / month</span>
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-line pt-3 text-sm sm:grid-cols-4">
                <div>
                  <p className="text-xs text-muted">Deductible</p>
                  <p className="font-semibold">${plan.deductible.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Max OOP</p>
                  <p className="font-semibold">${plan.moop.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">PCP / specialist</p>
                  <p className="font-semibold">
                    ${plan.pcp} / ${plan.specialist}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted">Est. annual</p>
                  <p className="font-semibold">${plan.annualEstimate.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={data.compareIds.includes(plan.id)}
                    onChange={() => toggleCompare(plan.id)}
                  />
                  Compare
                </label>
                <Link
                  to="/recommendation"
                  className="text-sm font-semibold text-coral hover:underline"
                  onClick={() => update({ selectedPlanId: plan.id })}
                >
                  Open details →
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/paths" variant="secondary">
          Back
        </Button>
        <Button to="/recommendation">See recommended option</Button>
        <Button to="/contact" variant="secondary">
          Request agent help
        </Button>
      </div>
    </div>
  )
}
