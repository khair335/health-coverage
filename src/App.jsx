import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AssessmentProvider } from './context/AssessmentContext'
import { ToastProvider } from './components/Toast'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import Landing from './pages/Landing'
import Location from './pages/Location'
import Preferences from './pages/Preferences'
import Paths from './pages/Paths'
import CoverageValue from './pages/CoverageValue'
import Contact from './pages/Contact'
import Confirmation from './pages/Confirmation'
import Privacy from './pages/Privacy'
import Dashboard from './pages/agent/Dashboard'
import CaseDetail from './pages/agent/CaseDetail'
import AgentPlaceholder from './pages/agent/AgentPlaceholder'

export default function App() {
  return (
    <ToastProvider>
      <AssessmentProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/location" element={<Location />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/paths" element={<Paths />} />
              <Route path="/coverage-value" element={<CoverageValue />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/privacy" element={<Privacy />} />
              {/* Removed sub-steps — assessment is exactly 4 steps */}
              <Route path="/household" element={<Navigate to="/location" replace />} />
              <Route path="/income" element={<Navigate to="/location" replace />} />
              <Route path="/eligibility-questions" element={<Navigate to="/location" replace />} />
              {/* Legacy routes → new flow */}
              <Route path="/care" element={<Navigate to="/paths" replace />} />
              <Route path="/plans" element={<Navigate to="/coverage-value" replace />} />
              <Route path="/recommendation" element={<Navigate to="/coverage-value" replace />} />
              <Route path="/assistance" element={<Navigate to="/paths" replace />} />
            </Route>
            <Route element={<Layout agent />}>
              <Route path="/agent" element={<Dashboard />} />
              <Route path="/agent/clients" element={<AgentPlaceholder title="Clients" description="Full client list and management tools will appear here. Use the Dashboard to search and manage clients for now." />} />
              <Route path="/agent/tasks" element={<AgentPlaceholder title="Tasks / Follow-Ups" description="Scheduled follow-ups and task queue will appear here." />} />
              <Route path="/agent/reports" element={<AgentPlaceholder title="Reports" description="Enrollment and pipeline reports will appear here." />} />
              <Route path="/agent/cases/:id" element={<CaseDetail />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AssessmentProvider>
    </ToastProvider>
  )
}
