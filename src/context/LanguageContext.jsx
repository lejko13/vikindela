import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { siteContent } from '../data/siteContent'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('vikindela-language')
    const initial = saved === 'sk' || saved === 'en' ? saved : 'en'
    setLanguageState(initial)
    document.documentElement.lang = initial
  }, [])

  const setLanguage = (next) => {
    if (next !== 'sk' && next !== 'en') return
    setLanguageState(next)
    localStorage.setItem('vikindela-language', next)
    document.documentElement.lang = next
  }

  const value = useMemo(() => ({ language, setLanguage, t: siteContent[language] }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

export function localized(project, language) {
  return project?.translations?.[language] ? { ...project, ...project.translations[language] } : project
}
