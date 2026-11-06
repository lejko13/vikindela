import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

// Na výšku (mobil, tablet) sa video na šírku nezmestí – namiesto neho tri výrezy z neho pod sebou.
// Prepína sa v JS, aby mobil nesťahoval veľké video a počítač malé výrezy.
const PORTRAIT_QUERY = '(orientation: portrait)'

function useMatchMedia(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

// Slučka 7 s (video dopredu a späť), bez zvuku – inak by ju prehliadač nespustil sám.
function LoopVideo({ src, poster, play, className = '' }) {
  return <video src={src} poster={poster} autoPlay={play} muted loop playsInline preload="auto" draggable="false" className={className} />
}

// Dĺžka prechodu po kliknutí na CLICK HERE (ms)
export const ENTRY_EXIT_MS = 1100

export default function EntryGate({ onEnter, leaving = false }) {
  const { t } = useLanguage()
  const portrait = useMatchMedia(PORTRAIT_QUERY)
  const play = !useMatchMedia('(prefers-reduced-motion: reduce)')

  return (
    <div
      className={`entry-gate fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 px-6 text-center text-pink-strong ${leaving ? 'is-leaving pointer-events-none' : ''}`}
      aria-hidden={leaving}
    >
      {/* Na šírku celé video, na výšku tri výrezy pod sebou: tablet, oči z notebooku, mobil */}
      {portrait ? (
        <div className="entry-gate__stack" aria-hidden="true">
          <LoopVideo src="/entry-tablet.mp4" poster="/entry-tablet.jpg" play={play} />
          <LoopVideo src="/entry-eyes.mp4" poster="/entry-eyes.jpg" play={play} />
          <LoopVideo src="/entry-phone.mp4" poster="/entry-phone.jpg" play={play} />
        </div>
      ) : (
        <LoopVideo src="/entry-video.mp4" poster="/entry-photo.jpg" play={play} className="entry-gate__video" />
      )}
      <img
        src="/vikindela-logo.png"
        alt="VIKINDELA"
        className="entry-gate__logo logo-lift relative w-[86vw] max-w-[720px] md:w-[46vw]"
        draggable="false"
      />
      <button
        type="button"
        onClick={onEnter}
        disabled={leaving}
        className="entry-gate__button relative border-2 border-pink-strong px-7 py-3 text-[13px] font-black uppercase tracking-[-.03em] transition hover:border-pink hover:bg-pink hover:text-ink md:text-[15px]"
      >
        {t.clickHere}
      </button>
    </div>
  )
}
