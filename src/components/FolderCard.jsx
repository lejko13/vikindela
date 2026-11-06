// Priečinok ako na Macu: vzadu chrbát s uškom, vpredu predná strana s fotkou projektu.
// Pri hoveri (alebo po kliknutí – `open`) fotka ostáva a zo zadu hore vykukne biely papier.
// Projekt bez fotky (placeholder) je prázdny priečinok.
export default function FolderCard({ image, open = false, label }) {
  return (
    <div className={`folder ${open ? 'is-open' : ''}`} role="img" aria-label={label}>
      <svg className="folder__back" viewBox="0 0 125 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7ac0ea" />
            <stop offset="1" stopColor="#5da7d7" />
          </linearGradient>
        </defs>
        <path fill="url(#folder-back)" d="M0 7 Q0 1 6 1 H33 Q37 1 39.5 4 L42 7.2 Q44.5 10 48.5 10 H119 Q125 10 125 16 V94 Q125 100 119 100 H6 Q0 100 0 94 Z" />
      </svg>
      <div className="folder__sheet" />
      <div className="folder__front">
        {image && <div className="folder__photo"><img src={image} alt="" draggable="false" decoding="async" /></div>}
      </div>
    </div>
  )
}
