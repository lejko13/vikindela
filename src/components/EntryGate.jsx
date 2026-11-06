import { useLanguage } from '../context/LanguageContext'

// Dĺžka prechodu po kliknutí na CLICK HERE (ms)
export const ENTRY_EXIT_MS = 1100

export default function EntryGate({ onEnter, leaving = false }) {
  const { t } = useLanguage()

  return (
    <div
      className={`entry-gate fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 px-6 text-center text-paper ${leaving ? 'is-leaving pointer-events-none' : ''}`}
      aria-hidden={leaving}
    >
      <img
        src="/vikindela-logo.png"
        alt="VIKINDELA"
        className="entry-gate__logo w-[86vw] max-w-[720px] md:w-[46vw]"
        draggable="false"
      />
      <button
        type="button"
        onClick={onEnter}
        disabled={leaving}
        className="entry-gate__button border-2 border-paper px-7 py-3 text-[13px] font-black uppercase tracking-[-.03em] transition hover:border-pink hover:bg-pink hover:text-ink md:text-[15px]"
      >
        {t.clickHere}
      </button>
    </div>
  )
}
