import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../../client-design-preview')
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = 'http://localhost:5173'

const sample = {
  language: 'en',
  state: 'NJ',
  zip: '07746',
  county: 'Marlboro, Monmouth County',
  zipError: '',
  members: [
    { id: '1', relationship: 'Self', age: '42', dependent: false },
    { id: '2', relationship: 'Spouse / partner', age: '40', dependent: false },
    { id: '3', relationship: 'Child', age: '12', dependent: true },
  ],
  incomeMode: 'exact',
  incomePeriod: 'annual',
  incomeAmount: '42000',
  incomeRangeId: '',
  employerCoverage: 'No',
  currentCoverage: 'None',
  coverageLoss: '',
  pregnancy: 'No',
  disability: 'No',
  medicare: 'No',
  residency: 'Yes',
  immigration: 'Citizen or national',
  unsureEligibility: false,
  priorities: ['premium', 'doctors'],
  usage: 'sometimes',
  budget: 'under $300',
  unsureNeeds: false,
  providers: [{ id: 'p1', name: 'Dr. Amina Rahman, Family Medicine', city: 'Newark' }],
  medications: [{ id: 'm1', name: 'Metformin 500mg' }],
  selectedPlanId: 'PLAN-XYZ',
  compareIds: ['PLAN-XYZ', 'PLAN-ABC', 'PLAN-DEF'],
  contact: {
    name: 'Maria Gomez',
    phone: '(732) 555-0144',
    email: 'maria.g@example.com',
    method: 'phone',
    time: 'Weekday mornings',
    language: 'en',
    consentContact: true,
    consentShare: true,
  },
  caseId: 'CASE-100234',
}

const pages = [
  { file: '01-home.png', path: '/', full: true },
  { file: '02-step1-location.png', path: '/location' },
  { file: '03-step2-preferences.png', path: '/preferences' },
  { file: '04-step3-paths.png', path: '/paths' },
  { file: '05-step4-coverage-value.png', path: '/coverage-value' },
  { file: '06-coverage-modal.png', path: '/coverage-value', modal: true },
  { file: '07-contact.png', path: '/contact' },
  { file: '08-confirmation.png', path: '/confirmation' },
  { file: '09-agent-dashboard.png', path: '/agent' },
  { file: '10-agent-case.png', path: '/agent/cases/CASE-100234' },
]

await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
await page.evaluateOnNewDocument((data) => {
  sessionStorage.setItem('hcn-assessment', JSON.stringify(data))
}, sample)

for (const item of pages) {
  await page.goto(base + item.path, { waitUntil: 'networkidle0', timeout: 20000 })

  if (item.modal) {
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) =>
        b.textContent.includes('View Coverage & Benefits'),
      )
      btn?.click()
    })
    await new Promise((r) => setTimeout(r, 400))
  }

  await page.screenshot({
    path: join(outDir, item.file),
    fullPage: Boolean(item.full) || true,
    type: 'png',
  })
  console.log('saved', item.file)
}

await browser.close()
console.log('done', outDir)
