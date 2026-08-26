import { Badge, Button, Card, Notice, PageTitle } from '../components/ui'
import { assistanceResources } from '../data/mock'

export default function Assistance() {
  return (
    <div>
      <PageTitle
        kicker="S11 · Charity & community"
        title="Help if insurance is not enough"
        subtitle="These are assistance programs, not insurance products, and not a sales pitch. Phone numbers and hours should be confirmed on official sites."
      />
      <Notice>
        Insurance may still be recommended. A producer can help you decide without forcing a plan
        purchase.
      </Notice>

      <div className="mt-6 space-y-4">
        {assistanceResources.map((r) => (
          <Card key={r.id}>
            <Badge tone="gray">{r.type}</Badge>
            <h2 className="mt-2 font-serif text-xl text-ocean">{r.title}</h2>
            <p className="mt-2 text-muted leading-relaxed">{r.summary}</p>
            <p className="mt-3 font-medium text-ocean">{r.action}</p>
            <p className="mt-2 text-xs text-muted">Source date: {r.sourceDate}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/paths" variant="secondary">
          Back to paths
        </Button>
        <Button to="/contact">Request agent guidance</Button>
      </div>
    </div>
  )
}
