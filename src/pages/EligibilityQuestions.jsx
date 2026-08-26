import { Choice, Notice, PageTitle } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { useAssessment } from '../context/AssessmentContext'

const q = (label, key, options) => ({ label, key, options })

export default function EligibilityQuestions() {
  const { data, update } = useAssessment()

  const questions = [
    q('Does anyone in the household live in New Jersey most of the year?', 'residency', [
      'Yes',
      'No',
      'Not sure',
    ]),
    q('Is anyone pregnant?', 'pregnancy', ['Yes', 'No', 'Not sure']),
    q('Does anyone have a disability or get SSI/SSDI?', 'disability', ['Yes', 'No', 'Not sure']),
    q('Is anyone on Medicare or about to turn 65?', 'medicare', ['Yes', 'No', 'Not sure']),
    q(
      'Immigration / lawful presence (only if needed for public programs). You can skip this.',
      'immigration',
      ['Citizen or national', 'Lawful presence (customer-provided)', 'Prefer not to say', 'Not sure'],
    ),
  ]

  return (
    <div>
      <StepProgress current="/eligibility-questions" />
      <PageTitle
        kicker="S05 · Eligibility factors"
        title="A few more facts for screening"
        subtitle="We only ask what state programs may need. Sensitive answers are optional. “Not sure” is always OK — that becomes “needs verification,” not a guessed yes or no."
      />

      <Notice>
        These questions are for screening. An official program decides public coverage. We do not
        store a Social Security number.
      </Notice>

      <div className="mt-6 space-y-6">
        {questions.map((item) => (
          <fieldset key={item.key}>
            <legend className="mb-2 font-semibold text-ocean">{item.label}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.options.map((opt) => (
                <Choice
                  key={opt}
                  selected={data[item.key] === opt}
                  onClick={() => update({ [item.key]: opt })}
                >
                  {opt}
                </Choice>
              ))}
            </div>
          </fieldset>
        ))}
        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1"
            checked={data.unsureEligibility}
            onChange={(e) => update({ unsureEligibility: e.target.checked })}
          />
          I’m not sure about several of these — please treat results as estimates.
        </label>
      </div>

      <NavRow back="/income" next="/preferences" />
    </div>
  )
}
