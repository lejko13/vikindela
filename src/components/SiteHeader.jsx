import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const isHome = pathname === '/'

  useEffect(() => {
    document.documentElement.classList.toggle('menu-locked', open)
    document.body.classList.toggle('menu-locked', open)

    return () => {
      document.documentElement.classList.remove('menu-locked')
      document.body.classList.remove('menu-locked')
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const goHomeView = (view) => {
    setOpen(false)
    if (isHome) {
      window.dispatchEvent(new CustomEvent('portfolio:view', { detail: view }))
    } else {
      navigate(`/?view=${view}`)
    }
  }

  const LanguageSwitch = () => (
    <div className="flex w-[55px] shrink-0 items-center justify-end gap-1 text-[13px] font-black tracking-[-.045em] md:w-[72px] md:text-[clamp(13px,1.2vw,18px)]">
      <button
        type="button"
        onClick={() => setLanguage('sk')}
        className={language === 'sk' ? 'opacity-100' : 'opacity-25'}
      >
        SK
      </button>
      <span className="opacity-25">/</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'opacity-100' : 'opacity-25'}
      >
        EN
      </button>
    </div>
  )

  return (
    <>
      {/* One persistent header is used in both states. Nothing is re-mounted or repositioned. */}
      <header
        className={`fixed z-[13000] flex items-start justify-between leading-none ${
          isHome
            ? `top-[15px] left-[14px] right-[14px] md:top-[22px] md:left-[24px] md:right-[24px] ${open ? 'bg-transparent' : 'bg-transparent'}`
            : 'top-0 left-0 right-0 min-h-[58px] bg-paper px-[14px] pt-[15px] pb-3 md:min-h-[76px] md:px-6 md:pt-[22px] md:pb-[18px]'
        }`}
      >
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-[28px] font-black leading-[.8] tracking-[-.065em] md:text-[clamp(28px,2.55vw,48px)]"
        >
          vikindela
        </Link>

        <div className="flex shrink-0 items-center gap-3 md:gap-[18px]">
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="w-[72px] shrink-0 text-right text-[13px] font-black tracking-[-.045em] md:w-[96px] md:text-[clamp(13px,1.2vw,18px)]"
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        data-menu-overlay
        className={`fixed inset-0 z-[12000] bg-paper transition-opacity duration-200 ${
          open
            ? 'visible pointer-events-auto opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="absolute left-[14px] bottom-[76px] flex flex-col items-start gap-1 md:left-6 md:bottom-[92px]">
          <Link to="/" onClick={() => setOpen(false)} className="text-[clamp(34px,11vw,58px)] font-black uppercase leading-[.82] tracking-[-.07em] transition-opacity hover:opacity-45 md:text-[clamp(36px,6.2vw,108px)]">{t.home}</Link>
          <Link to="/all" onClick={() => setOpen(false)} className="text-[clamp(34px,11vw,58px)] font-black uppercase leading-[.82] tracking-[-.07em] transition-opacity hover:opacity-45 md:text-[clamp(36px,6.2vw,108px)]">{t.all}</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="text-[clamp(34px,11vw,58px)] font-black uppercase leading-[.82] tracking-[-.07em] transition-opacity hover:opacity-45 md:text-[clamp(36px,6.2vw,108px)]">{t.contact}</Link>
          <button type="button" onClick={() => goHomeView('globe')} className="text-[clamp(34px,11vw,58px)] font-black uppercase leading-[.82] tracking-[-.07em] transition-opacity hover:opacity-45 md:text-[clamp(36px,6.2vw,108px)]">{t.globe}</button>
          <button type="button" onClick={() => goHomeView('list')} className="text-[clamp(34px,11vw,58px)] font-black uppercase leading-[.82] tracking-[-.07em] transition-opacity hover:opacity-45 md:text-[clamp(36px,6.2vw,108px)]">{t.list}</button>
        </nav>
      </div>
    </>
  )
}
