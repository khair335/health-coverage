import { useNavigate } from 'react-router-dom'
import { Choice, Notice, PageTitle } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

const q = (label, key, options) => ({ label, key, options })

export default function EligibilityQuestions() {
  const { data, update } = useAssessment()
  const navigate = useNavigate()
  const toast = useToast()

  const questions = [
    q('Does anyone in the household live in New Jersey most of the year?', 'residency', [
      'Yes',
      'No',
      'Not sure',
    ]),
    q('Is anyone in the household currently pregnant?', 'pregnancy', ['Yes', 'No', 'Not sure']),
    q('Does anyone have a disability or receive SSI/SSDI benefits?', 'disability', ['Yes', 'No', 'Not sure']),
    q('Is anyone enrolled in Medicare or turning 65 soon?', 'medicare', ['Yes', 'No', 'Not sure']),
    q(
      'Immigration / Lawful presence (optional — for state program screening only):',
      'immigration',
      ['U.S. Citizen or National', 'Lawful Permanent Resident / Visa', 'Prefer not to say', 'Not sure'],
    ),
  ]

  const handleNext = () => {
    toast.success('Eligibility factors saved!')
    navigate('/preferences')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <StepProgress current="/eligibility-questions" />

      <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-500/5">
        <PageTitle
          kicker="Step 4 · Program Qualifications"
          title="A Few More Screening Facts"
          subtitle="We only ask what public health programs require for screening. 'Not sure' is always a valid choice."
        />

        <Notice tone="info">
          Privacy guarantee: We do not store or transmit Social Security Numbers or medical records.
        </Notice>

        <div className="mt-6 space-y-6">
          {questions.map((item) => (
            <fieldset key={item.key} className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
              <legend className="px-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                {item.label}
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
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

          <label className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm font-medium text-indigo-900 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-md text-[#4338ca] focus:ring-[#4338ca]"
              checked={data.unsureEligibility}
              onChange={(e) => {
                update({ unsureEligibility: e.target.checked })
                if (e.target.checked) toast.info('Results will be flagged as estimated options')
              }}
            />
            <span>I am unsure about several factors — please mark screening results as estimates.</span>
          </label>
        </div>

        <NavRow back="/income" onNext={handleNext} nextLabel="Continue to Coverage Needs" />
      </div>
    </div>
  )
}
