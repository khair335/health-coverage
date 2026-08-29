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
      {/* ── Hero ── */}
      <section className="relative min-h-[78vh] overflow-hidden sm:min-h-[85vh]" style={{background: 'linear-gradient(135deg, #1e1147 0%, #2d1f6e 45%, #312e81 100%)'}}>
        {/* Animated mesh gradient blobs */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 70% 55% at 80% 15%, rgba(139,92,246,0.4), transparent 55%), radial-gradient(ellipse 55% 45% at 15% 85%, rgba(99,102,241,0.3), transparent 50%), radial-gradient(ellipse 40% 35% at 60% 70%, rgba(34,197,94,0.12), transparent 45%)',
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-14 sm:py-20 md:min-h-[85vh] md:py-28">
          {/* Brand pill */}
          <div className="animate-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
            <span className="text-xs font-semibold text-white/90 tracking-wide">New Jersey · Live now</span>
          </div>
          <p className="animate-fade-up text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Health Coverage Navigator
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-2xl text-lg font-medium leading-snug text-indigo-200 sm:mt-6 sm:text-3xl lg:text-4xl">
            Clearer coverage choices for your household — not a sales script
          </h1>
          <p className="animate-fade-up-delay mt-3 max-w-xl text-sm leading-relaxed text-indigo-300 sm:mt-5 sm:text-lg">
            Answer a few plain questions. We'll narrow your options and connect you with a licensed
            producer.
          </p>
          <div className="animate-fade-up-delay mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
            <Button to="/location" className="sm:min-w-48 !bg-white !text-[#4338ca] hover:!bg-indigo-50 !shadow-lg">
              Start assessment
            </Button>
            <a
              href="#start"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:min-h-12 sm:px-5 sm:py-3 sm:text-base transition-colors duration-200"
            >
              Choose your state
            </a>
          </div>
          {/* Trust indicators */}
          <div className="animate-fade-up-delay mt-8 flex flex-wrap gap-4 sm:mt-10">
            {['No SSN required', 'Free to use', 'Licensed producers'].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="text-[#22c55e] text-base">✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Start / State chooser ── */}
      <section id="start" className="scroll-mt-20 bg-white sm:scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">
              New Jersey first
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl md:text-4xl">
              Start your coverage review
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              About 8–10 minutes. You can say "I'm not sure" at any step. Sales help is live for New
              Jersey; other states can leave interest.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li className="flex gap-2">
                <span className="font-bold text-[#16a34a]">✓</span> No SSN in the public questionnaire
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#16a34a]">✓</span> Progress saved in this browser
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-[#16a34a]">✓</span> Producer contact only if you ask
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-lg sm:rounded-3xl sm:p-8">
            <p className="mb-1.5 text-xs font-bold text-[#0f172a] sm:text-sm">Where do you live?</p>
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
              <Link to="/privacy" className="font-semibold text-[#4338ca] hover:underline">
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">How it works</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl md:text-4xl">Three steps. No dead ends.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
          The platform screens and explains. A licensed producer verifies and completes any sale or
          public-program handoff through official channels.
        </p>
        <ol className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200 sm:p-6">
              <span className="text-2xl font-extrabold text-[#6366f1] sm:text-3xl">{s.n}</span>
              <h3 className="mt-2 text-base font-bold text-[#0f172a] sm:mt-3 sm:text-xl">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Trust ── */}
      <section className="bg-[#f8faff]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">Why people trust it</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">Guidance built for real households</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
            {trustPoints.map((t) => (
              <Card key={t.title}>
                <h3 className="text-base font-bold text-[#0f172a] sm:text-lg">{t.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{t.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who this helps ── */}
      <section id="who" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">Who this helps</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
          Built for people the system often leaves confused
        </h2>
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title}>
              <h3 className="text-base font-bold text-[#0f172a] sm:text-lg">{a.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">{a.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Promises ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">
                What we will not do
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">Honest screening, not a hard sell</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
                If public coverage or a community clinic is the better next step, we show that even when
                there is no commission. Rankings never use producer pay as an input.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {promises.map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-[#f8faff] p-3.5 shadow-sm hover:shadow-md transition-shadow duration-200 sm:p-4">
                  <p className="text-sm font-bold text-[#0f172a]">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10 sm:scroll-mt-24 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#6366f1] sm:text-sm">FAQ</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">Common questions</h2>
        <div className="mt-6 space-y-3 sm:mt-8">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-line bg-white px-4 py-3 open:shadow-md transition-shadow duration-200 sm:px-5 sm:py-4"
            >
              <summary className="cursor-pointer list-none text-sm font-bold text-[#0f172a] marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-[#6366f1] transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl px-5 py-8 text-white sm:rounded-3xl sm:px-10 sm:py-10 md:flex md:items-center md:justify-between md:gap-8" style={{background: 'linear-gradient(135deg, #1e1147 0%, #312e81 100%)'}}>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready when you are</h2>
            <p className="mt-2 max-w-lg text-sm text-indigo-200 sm:text-base">
              Start with your ZIP code. We'll save your progress in this browser so you can finish the
              review in one sitting.
            </p>
          </div>
          <Button to="/location" className="mt-5 shrink-0 !bg-white !text-[#4338ca] hover:!bg-indigo-50 !shadow-lg sm:mt-6 md:mt-0">
            Start assessment
          </Button>
        </div>
      </section>
    </div>
  )
}
