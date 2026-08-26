import { Badge, Button, Card, Notice, PageTitle } from '../components/ui'
import { StepProgress } from '../components/StepProgress'
import { paths } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Paths() {
  const { showPublicPath, annualIncome, householdSize } = useAssessment()

  const ordered = showPublicPath
    ? paths
    : [paths[1], paths[2], { ...paths[0], primary: false, statusLabel: 'Less likely at this income estimate' }]

  return (
    <div>
      <StepProgress current="/paths" />
      <PageTitle
        kicker="S08 · Path summary"
        title="Likely coverage paths"
        subtitle="These are screening results, not official determinations. A licensed producer will verify before any enrollment."
      />
      <Notice>
        Household of {householdSize}
        {annualIncome ? ` · about $${annualIncome.toLocaleString()}/year` : ''}. Sample NJ rules only.
      </Notice>

      <div className="mt-6 space-y-4">
        {ordered.map((p, i) => (
          <Card
            key={p.id}
            className={
              p.primary || i === 0
                ? 'border-ocean/20 bg-gradient-to-br from-white to-mist/40 ring-2 ring-ocean/30'
                : ''
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              {(p.primary || i === 0) && <Badge tone="coral">Start here</Badge>}
              <Badge tone="gray">{p.statusLabel}</Badge>
            </div>
            <h2 className="mt-3 font-serif text-xl text-ocean md:text-2xl">{p.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{p.blurb}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/plans">View sample plans</Button>
        <Button to="/assistance" variant="secondary">
          View assistance
        </Button>
        <Button to="/contact" variant="secondary">
          Request agent help
        </Button>
      </div>
    </div>
  )
}
