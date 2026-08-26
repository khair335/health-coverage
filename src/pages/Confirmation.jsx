import { useNavigate } from 'react-router-dom'
import { Button, Card, Notice, PageTitle } from '../components/ui'
import { useAssessment } from '../context/AssessmentContext'

export default function Confirmation() {
  const { data, recommendedPlan, reset } = useAssessment()
  const navigate = useNavigate()

  return (
    <div>
      <PageTitle
        kicker="S13 · Confirmation"
        title="We received your request"
        subtitle="A licensed producer will follow up using the contact method you chose. Coverage is not active yet."
      />
      <Notice>
        Enrollment — if you choose it — happens through an official Marketplace, carrier, or public
        program. This website does not start your coverage.
      </Notice>

      <Card className="mt-6">
        <dl className="space-y-3">
          <div>
            <dt className="text-sm text-muted">Reference number</dt>
            <dd className="font-serif text-2xl text-ocean">{data.caseId || 'CASE-PENDING'}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Recommended path (sample)</dt>
            <dd className="font-semibold">{recommendedPlan.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">What happens next</dt>
            <dd className="text-muted leading-relaxed">
              Expect a call or email within one business day in this demo. Bring household size,
              income estimate, and any doctor or medication names you care about.
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Documents you may need later</dt>
            <dd className="text-muted">Photo ID, proof of NJ residency, income proof, current coverage letters.</dd>
          </div>
        </dl>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button to="/paths" variant="secondary">
          Return to summary
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            reset()
            navigate('/')
          }}
        >
          Start over
        </Button>
      </div>
    </div>
  )
}
