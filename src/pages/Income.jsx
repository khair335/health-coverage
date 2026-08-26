import { Choice, Field, Notice, PageTitle, TextInput } from '../components/ui'
import { StepProgress, NavRow } from '../components/StepProgress'
import { incomeRanges } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

export default function Income() {
  const { data, update, annualIncome } = useAssessment()

  return (
    <div>
      <StepProgress current="/income" />
      <PageTitle
        kicker="S04 · Income & coverage"
        title="Income and current coverage"
        subtitle="Estimates are enough. This is not tax advice. Results will be flagged as estimates if you’re unsure."
      />

      <div className="space-y-6 md:max-w-xl">
        <div className="flex gap-2">
          <Choice selected={data.incomeMode === 'exact'} onClick={() => update({ incomeMode: 'exact' })}>
            Enter an amount
          </Choice>
          <Choice selected={data.incomeMode === 'range'} onClick={() => update({ incomeMode: 'range' })}>
            Choose a range
          </Choice>
        </div>

        {data.incomeMode === 'exact' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estimated household income">
              <TextInput
                inputMode="decimal"
                placeholder="42000"
                value={data.incomeAmount}
                onChange={(e) => update({ incomeAmount: e.target.value })}
              />
            </Field>
            <Field label="This amount is">
              <div className="flex gap-2">
                <Choice
                  selected={data.incomePeriod === 'annual'}
                  onClick={() => update({ incomePeriod: 'annual' })}
                >
                  Yearly
                </Choice>
                <Choice
                  selected={data.incomePeriod === 'monthly'}
                  onClick={() => update({ incomePeriod: 'monthly' })}
                >
                  Monthly
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
                onClick={() => update({ incomeRangeId: r.id })}
              >
                {r.label}
              </Choice>
            ))}
          </div>
        )}

        {annualIncome > 0 && (
          <Notice>We’re using about ${annualIncome.toLocaleString()} per year for screening.</Notice>
        )}

        <Field label="Does a job offer health insurance to anyone in the household?">
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

        <Field label="Current coverage">
          <div className="grid gap-2">
            {['None', 'Medicaid / public', 'Marketplace / private', 'Job-based', 'Medicare', 'Not sure'].map(
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

        <Field label="Did anyone lose coverage recently?" hint="A recent loss can open a special enrollment window.">
          <TextInput
            placeholder="e.g. Lost job coverage 6 weeks ago — or leave blank"
            value={data.coverageLoss}
            onChange={(e) => update({ coverageLoss: e.target.value })}
          />
        </Field>
      </div>

      <NavRow back="/household" next="/eligibility-questions" />
    </div>
  )
}
