import { Badge, Button, Card, Notice, PageTitle } from '../components/ui'
import { plans } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Recommendation() {
  const { recommendedPlan, data, update } = useAssessment()
  const plan = plans.find((p) => p.id === data.selectedPlanId) || recommendedPlan
  const alts = plans.filter((p) => p.id !== plan.id)

  return (
    <div>
      <PageTitle
        kicker="S10 · Recommended option"
        title="Why this may fit you"
        subtitle="Plain-language reasons first. Numbers second. Commission is never a scoring input."
      />
      <Notice tone="warn">
        This is a screening recommendation. Coverage is not active until enrollment is confirmed
        through an official Marketplace or carrier process.
      </Notice>

      <Card className="mt-6">
        <Badge tone="gold">Recommended</Badge>
        <h2 className="mt-2 font-serif text-2xl text-ocean md:text-3xl">{plan.name}</h2>
        <p className="text-muted">{plan.carrier}</p>

        <div className="mt-5 rounded-xl bg-mist/60 p-4">
          <h3 className="font-semibold text-ocean">Why this fits you</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
            {plan.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
            {data.priorities.includes('premium') && <li>You asked us to weigh monthly premium.</li>}
            {data.providers.length > 0 && (
              <li>You listed doctors to match when sample network data is available.</li>
            )}
          </ul>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Monthly</p>
            <p className="text-lg font-semibold text-ocean">${plan.premium}</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Deductible</p>
            <p className="text-lg font-semibold text-ocean">${plan.deductible.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Max OOP</p>
            <p className="text-lg font-semibold text-ocean">${plan.moop.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-line p-3">
            <p className="text-xs text-muted">Est. annual</p>
            <p className="text-lg font-semibold text-ocean">${plan.annualEstimate.toLocaleString()}</p>
          </div>
        </div>

        <h3 className="mt-6 font-semibold text-ocean">Tradeoffs</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {plan.tradeoffs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-muted">
          Sample data date: Aug 19, 2026. Important limits are on the official plan brochure.
        </p>
      </Card>

      <h3 className="mt-8 font-semibold text-ocean">Alternatives</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {alts.map((p) => (
          <button
            key={p.id}
            type="button"
            className="rounded-2xl border border-line bg-white p-4 text-left transition hover:border-ocean"
            onClick={() => update({ selectedPlanId: p.id })}
          >
            <p className="font-semibold text-ocean">{p.name}</p>
            <p className="text-sm text-muted">
              ${p.premium}/mo · deductible ${p.deductible.toLocaleString()}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/plans" variant="secondary">
          Compare plans
        </Button>
        <Button to="/assistance" variant="secondary">
          If I can’t afford this
        </Button>
        <Button to="/contact">Talk to licensed agent</Button>
      </div>
    </div>
  )
}
