import { Link } from 'react-router-dom'
import { Button, Card, Select } from '../components/ui'
import { states } from '../data/mock'
import { useAssessment } from '../context/AssessmentContext'

const steps = [
  {
    n: '01',
    title: 'Share your situation',
    body: 'ZIP, household, income, and what matters for care — in everyday words. You can skip anything you are not sure about.',
  },
  {
    n: '02',
    title: 'See paths that fit',
    body: 'We screen public programs, Marketplace plans, and community help. If insurance is too expensive, we still show a next step.',
  },
  {
    n: '03',
    title: 'Talk to a licensed producer',
    body: 'A real person reviews your answers, confirms the facts, and helps you enroll through official channels — not on this website.',
  },
]

const audiences = [
  {
    title: 'New to U.S. coverage',
    body: 'If the insurance system feels confusing, we start with simple questions — not jargon.',
  },
  {
    title: 'Lost or changing coverage',
    body: 'Job change, moving, or a gap in coverage. We’ll flag paths that may still be open.',
  },
  {
    title: 'Need help paying for care',
    body: 'We look at public programs, financial help, and community clinics — not only private plans.',
  },
]

const promises = [
  ['No Social Security number', 'The public questionnaire never asks for your SSN.'],
  ['No medical records', 'We only ask what is needed to screen options and match preferences.'],
  ['No fake enrollment', 'This site does not sell a policy or decide Medicaid for you.'],
  ['No commission ranking', 'Plan order is based on your needs and costs — not producer pay.'],
]

const faqs = [
  {
    q: 'Is this free?',
    a: 'Yes. The screening and guidance are free. If you buy a plan, you pay the carrier or Marketplace — not a fee to use this site.',
  },
  {
    q: 'Will this enroll me automatically?',
    a: 'No. We screen and explain. A licensed producer verifies your facts and enrollment happens through official channels.',
  },
  {
    q: 'What if I don’t qualify for insurance?',
    a: 'We still show charity care, community clinics, and other legitimate help. The flow never ends in a blank “not eligible” dead end.',
  },
  {
    q: 'Do you need my Social Security number?',
    a: 'No. The public questionnaire does not ask for an SSN or medical records.',
  },
  {
    q: 'Which states are supported?',
    a: 'New Jersey is live for licensed sales help. New York and Florida are planned next. You can leave interest if your state is not ready.',
  },
]

const trustPoints = [
  {
    title: 'Plain language',
    body: 'We explain terms like deductible and out-of-pocket in everyday words — or let you say “I’m not sure.”',
  },
  {
    title: 'Documented trail',
    body: 'Your answers and the sample recommendation stay together so a producer can review what the system suggested.',
  },
  {
    title: 'Assistance when needed',
    body: 'Public programs and community care appear alongside plans when they may fit better.',
  },
]

export default function Landing() {
  const { data, update } = useAssessment()

  return (
    <div className="pb-12 sm:pb-16">
      <section className="relative min-h-[78vh] overflow-hidden bg-ocean text-white sm:min-h-[85vh]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(232,93,76,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(214,230,240,0.2), transparent 50%)',
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-14 sm:py-20 md:min-h-[85vh] md:py-28">
          <p className="animate-fade-up font-serif text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Health Coverage Navigator
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-2xl font-serif text-lg font-medium leading-snug text-mist sm:mt-6 sm:text-3xl lg:text-4xl">
            Clearer coverage choices for your household — not a sales script
          </h1>
          <p className="animate-fade-up-delay mt-3 max-w-xl text-sm leading-relaxed text-mist/90 sm:mt-5 sm:text-lg">
            Answer a few plain questions. We’ll narrow your options and connect you with a licensed
            producer.
          </p>
          <div className="animate-fade-up-delay mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
            <Button to="/location" className="sm:min-w-48">
              Start assessment
            </Button>
            <a
              href="#start"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base"
            >
              Choose your state
            </a>
          </div>
        </div>
      </section>

      <section id="start" className="scroll-mt-20 bg-sky sm:scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">
              New Jersey first
            </p>
            <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl md:text-4xl">
              Start your coverage review
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              About 8–10 minutes. You can say “I’m not sure” at any step. Sales help is live for New
              Jersey; other states can leave interest.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="font-semibold text-coral">•</span> No SSN in the public questionnaire
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-coral">•</span> Progress saved in this browser
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-coral">•</span> Producer contact only if you ask
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
            <p className="mb-1.5 text-xs font-semibold text-ocean sm:text-sm">Where do you live?</p>
            <Select
              value={data.state}
              onChange={(e) => update({ state: e.target.value, zip: '', county: '' })}
              options={states.map((s) => ({
                value: s.code,
                label: s.supported ? s.name : `${s.name} — coming soon`,
              }))}
            />
            <Button to="/location" className="mt-4 w-full sm:mt-5">
              Find my coverage options
            </Button>
            <p className="mt-3 text-[11px] leading-relaxed text-muted sm:mt-4 sm:text-xs">
              Answers are used for screening and, if you ask, to contact a licensed producer.{' '}
              <Link to="/privacy" className="font-semibold text-coral hover:underline">
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">How it works</p>
        <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl md:text-4xl">Three steps. No dead ends.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
          The platform screens and explains. A licensed producer verifies and completes any sale or
          public-program handoff through official channels.
        </p>
        <ol className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-6">
              <span className="font-serif text-2xl text-coral sm:text-3xl">{s.n}</span>
              <h3 className="mt-2 text-base font-semibold text-ocean sm:mt-3 sm:text-xl">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">Why people trust it</p>
          <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl">Guidance built for real households</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
            {trustPoints.map((t) => (
              <Card key={t.title}>
                <h3 className="text-base font-semibold text-ocean sm:text-lg">{t.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{t.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="who" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">Who this helps</p>
        <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl">
          Built for people the system often leaves confused
        </h2>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title}>
              <h3 className="text-base font-semibold text-ocean sm:text-lg">{a.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{a.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-sky/70">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">
                What we will not do
              </p>
              <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl">Honest screening, not a hard sell</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
                If public coverage or a community clinic is the better next step, we show that even when
                there is no commission. Rankings never use producer pay as an input.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {promises.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-white p-3.5 sm:p-4">
                  <p className="text-sm font-semibold text-ocean">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-coral sm:text-sm">FAQ</p>
        <h2 className="mt-2 font-serif text-2xl text-ocean sm:text-3xl">Common questions</h2>
        <div className="mt-6 space-y-3 sm:mt-8">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-white px-4 py-3 open:shadow-sm sm:px-5 sm:py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-ocean marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-coral transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-ocean px-5 py-8 text-white sm:rounded-3xl sm:px-10 sm:py-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm text-mist sm:text-base">
              Start with your ZIP code. We’ll save your progress in this browser so you can finish the
              review in one sitting.
            </p>
          </div>
          <Button to="/location" className="mt-5 shrink-0 sm:mt-6 md:mt-0">
            Start assessment
          </Button>
        </div>
      </section>
    </div>
  )
}
