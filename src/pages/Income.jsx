import { useNavigate, useLocation } from 'react-router-dom'
import { Choice, Field, Notice, TextInput } from '../components/ui'
import { AssessmentShell } from '../components/FourStepProgress'
import { NavRow } from '../components/StepProgress'
import { incomeRanges } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'
import { useToast } from '../components/Toast'

export default function Income() {
  const { data, update, annualIncome } = useAssessment()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const toast = useToast()

  const handleNext = () => {
    toast.success('Income details saved!')
    navigate('/eligibility-questions')
  }

  return (
    <AssessmentShell
      step={1}
      pathname={pathname}
      title="Income & Current Coverage"
      subtitle="Rough estimates are completely fine. We screen for Medicaid thresholds and ACA tax subsidies."
    >
      <div className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-indigo-600">
              How would you like to state income?
            </label>
            <div className="flex gap-3">
              <Choice
                selected={data.incomeMode === 'exact'}
                onClick={() => {
                  update({ incomeMode: 'exact' })
                  toast.info('Switched to exact income input')
                }}
              >
                Exact Dollar Amount
              </Choice>
              <Choice
                selected={data.incomeMode === 'range'}
                onClick={() => {
                  update({ incomeMode: 'range' })
                  toast.info('Switched to income range selection')
                }}
              >
                Estimated Range
              </Choice>
            </div>
          </div>

          {data.incomeMode === 'exact' ? (
            <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <Field label="Estimated Household Income">
                <TextInput
                  inputMode="decimal"
                  placeholder="e.g. 45000"
                  value={data.incomeAmount}
                  onChange={(e) => update({ incomeAmount: e.target.value })}
                  className="font-semibold text-lg"
                />
              </Field>
              <Field label="Frequency">
                <div className="flex gap-2">
                  <Choice
                    selected={data.incomePeriod === 'annual'}
                    onClick={() => update({ incomePeriod: 'annual' })}
                  >
                    Per Year
                  </Choice>
                  <Choice
                    selected={data.incomePeriod === 'monthly'}
                    onClick={() => update({ incomePeriod: 'monthly' })}
                  >
                    Per Month
                  </Choice>
                </div>
              </Field>
            </div>
          ) : (
            <div className="space-y-2">
              {incomeRanges.map((r) => (
                <Choice
                  key={r.id}
                  selected={data.incomeRangeId === r.id}
                  onClick={() => {
                    update({ incomeRangeId: r.id })
                    toast.info(`Selected range: ${r.label}`)
                  }}
                >
                  {r.label}
                </Choice>
              ))}
            </div>
          )}

          {annualIncome > 0 && (
            <Notice tone="info">
              Screening benchmark: Approx <strong>${annualIncome.toLocaleString()}/yr</strong> for a household of {data.members.length}.
            </Notice>
          )}

          <Field label="Does a job offer health coverage to anyone in your household?">
            <div className="grid gap-2 sm:grid-cols-3">
              {['Yes', 'No', 'Not sure'].map((v) => (
                <Choice
                  key={v}
                  selected={data.employerCoverage === v}
                  onClick={() => update({ employerCoverage: v })}
                >
                  {v}
                </Choice>
              ))}
            </div>
          </Field>

          <Field label="What coverage do you have right now?">
            <div className="grid gap-2 sm:grid-cols-2">
              {['None', 'Medicaid / Public Program', 'Marketplace / ACA Plan', 'Employer-Based Plan', 'Medicare', 'Not sure'].map(
                (v) => (
                  <Choice
                    key={v}
                    selected={data.currentCoverage === v}
                    onClick={() => update({ currentCoverage: v })}
                  >
                    {v}
                  </Choice>
                ),
              )}
            </div>
          </Field>

          <Field label="Did anyone lose coverage recently?" hint="A recent loss opens a Special Enrollment Period (SEP).">
            <TextInput
              placeholder="e.g. Lost job coverage 4 weeks ago — or leave blank"
              value={data.coverageLoss}
              onChange={(e) => update({ coverageLoss: e.target.value })}
            />
          </Field>
      </div>

      <NavRow back="/household" onNext={handleNext} nextLabel="Continue to Eligibility →" />
    </AssessmentShell>
  )
}
