import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AssessmentProvider } from './context/AssessmentContext'
import { Layout } from './components/Layout'
import Landing from './pages/Landing'
import Location from './pages/Location'
import Household from './pages/Household'
import Income from './pages/Income'
import EligibilityQuestions from './pages/EligibilityQuestions'
import Preferences from './pages/Preferences'
import Care from './pages/Care'
import Paths from './pages/Paths'
import Plans from './pages/Plans'
import Recommendation from './pages/Recommendation'
import Assistance from './pages/Assistance'
import Contact from './pages/Contact'
import Confirmation from './pages/Confirmation'
import Dashboard from './pages/agent/Dashboard'
import CaseDetail from './pages/agent/CaseDetail'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/location" element={<Location />} />
            <Route path="/household" element={<Household />} />
            <Route path="/income" element={<Income />} />
            <Route path="/eligibility-questions" element={<EligibilityQuestions />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/care" element={<Care />} />
            <Route path="/paths" element={<Paths />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>
          <Route element={<Layout agent />}>
            <Route path="/agent" element={<Dashboard />} />
            <Route path="/agent/cases/:id" element={<CaseDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AssessmentProvider>
  )
}
