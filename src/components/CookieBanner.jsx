import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (!localStorage.getItem('vikindela-cookie-consent')) {
      const timer = setTimeout(() => setVisible(true), 1100)
      return () => clearTimeout(timer)
    }
  }, [])

  const choose = (value) => {
    localStorage.setItem('vikindela-cookie-consent', value)
    setVisible(false)
  }

  if (!visible) return null
  return (
    <aside className="fixed left-3 right-3 bottom-3 z-[30000] border-2 border-ink bg-paper p-[13px] md:left-6 md:right-6 md:bottom-5 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-7 md:p-4">
      <div className="max-w-[720px]">
        <strong className="mb-2 block text-xs font-black md:text-sm">{t.cookiesTitle}</strong>
        <p className="mb-3 max-w-[620px] text-[10px] font-bold uppercase leading-[1.15] md:mb-0 md:text-xs">{t.cookiesText}</p>
      </div>
      <div className="flex flex-wrap justify-stretch gap-2 md:justify-end">
        <button onClick={() => choose('necessary')} className="min-h-[38px] flex-1 border border-ink px-3 py-2 text-[10px] font-black transition-colors hover:border-pink hover:text-pink md:flex-none md:text-[11px]">{t.cookiesNecessary}</button>
        <button onClick={() => choose('all')} className="min-h-[38px] flex-1 border border-ink bg-ink px-3 py-2 text-[10px] font-black text-paper transition-colors hover:border-pink-strong hover:bg-pink-strong hover:text-paper md:flex-none md:text-[11px]">{t.cookiesAccept}</button>
      </div>
    </aside>
  )
}
