import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AllProjects from './pages/AllProjects'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import CookieBanner from './components/CookieBanner'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllProjects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
      </Routes>
      <CookieBanner />
    </>
  )
}
