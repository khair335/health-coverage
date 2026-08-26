import { PageTitle } from '../components/ui'
import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="max-w-2xl">
      <PageTitle
        title="Privacy"
        subtitle="Sample notice for the frontend demo. Final legal language requires compliance review."
      />
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          This demo stores your answers in this browser (session storage) so you can move between
          pages. It does not send data to a server.
        </p>
        <p>
          We do not ask for a Social Security number or medical records in the public questionnaire.
          If you request producer help, you choose to share contact details and screening answers.
        </p>
        <p>
          Screening results are estimates. Official programs and carriers make final eligibility and
          enrollment decisions.
        </p>
        <Link to="/" className="font-semibold text-coral">
          Back to home
        </Link>
      </div>
    </div>
  )
}
