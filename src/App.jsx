import { useEffect, useLayoutEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AllProjects from './pages/AllProjects'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import CookieBanner from './components/CookieBanner'
import EntryGate, { ENTRY_EXIT_MS } from './components/EntryGate'

// Každá nová stránka sa otvorí úplne hore (aj pri Späť/Dopredu v prehliadači).
// Výnimka: odkaz s kotvou (/all#styling) – tam sa posúva na danú kategóriu v AllProjects.
function useScrollToTopOnPageChange() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])
  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function App() {
  useScrollToTopOnPageChange()
  // 'gate' = úvodná obrazovka, 'leaving' = prechod (web sa už načítava pod ňou), 'done' = úvod je preč
  // Úvod sa ukáže len raz za návštevu — po kliknutí si to zapamätáme (aj pri obnovení stránky).
  const [stage, setStage] = useState(() => {
    try { return sessionStorage.getItem('vikindela-entered') === '1' ? 'done' : 'gate' } catch { return 'gate' }
  })

  const enter = () => {
    try { sessionStorage.setItem('vikindela-entered', '1') } catch {}
    setStage('leaving')
  }

  useEffect(() => {
    if (stage !== 'leaving') return
    const timer = setTimeout(() => setStage('done'), ENTRY_EXIT_MS)
    return () => clearTimeout(timer)
  }, [stage])

  return (
    <>
      {stage !== 'gate' && (
        <>
          <Routes>
            <Route path="/" element={<Home introDelay={stage === 'leaving' ? ENTRY_EXIT_MS * 0.6 : 0} />} />
            <Route path="/all" element={<AllProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
          </Routes>
          <CookieBanner />
        </>
      )}
      {stage !== 'done' && (
        <EntryGate leaving={stage === 'leaving'} onEnter={enter} />
      )}
    </>
  )
}
