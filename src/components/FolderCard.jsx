// Priečinok na guli. Dva vzhľady:
//   'mac'   – modrý priečinok ako na Macu: vzadu chrbát s uškom, vpredu predná strana s fotkou projektu
//   'pixel' – žltý pixelový priečinok (retro), tiež s fotkou vpredu
// Pri hoveri (alebo po kliknutí – `open`) fotka ostáva a zo zadu hore vykukne papier.
// Projekt bez fotky (placeholder) je prázdny priečinok.
export default function FolderCard({ image, open = false, label, variant = 'mac' }) {
  const photo = image && <div className="folder__photo"><img src={image} alt="" draggable="false" decoding="async" /></div>

  if (variant === 'pixel') {
    // Kreslené na mriežke 30 × 24 „pixelov" (rovnaký pomer 1,25 : 1 ako modrý priečinok)
    return (
      <div className={`folder folder--pixel ${open ? 'is-open' : ''}`} role="img" aria-label={label}>
        <svg className="folder__back" viewBox="0 0 30 24" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
          <path fill="#232023" d="M2 1 H11 V2 H12 V3 H27 V4 H28 V23 H1 V2 H2 Z" />
          <path fill="#d6a75f" d="M2 2 H11 V3 H12 V4 H27 V22 H2 Z" />
          <path fill="#eedf90" d="M2 2 H11 V3 H2 Z M12 4 H27 V5 H12 Z" />
        </svg>
        <div className="folder__sheet">
          <svg viewBox="0 0 24 5" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
            <path fill="#4a3a1f" d="M0 0 H24 V1 H0 Z" />
            <path fill="#f3eccb" d="M0 1 H24 V5 H0 Z" />
          </svg>
        </div>
        <div className="folder__front">
          <svg viewBox="0 0 30 18" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
            <path fill="#9d9b9b" d="M28 2 H29 V18 H28 Z" />
            <path fill="#232023" d="M3 0 H28 V18 H1 V8 H2 V3 H3 Z" />
            <path fill="#f0de91" d="M4 1 H27 V16 H2 V9 H3 V4 H4 Z" />
            <path fill="#d2a85f" d="M2 16 H27 V17 H2 Z M26 10 H27 V16 H26 Z" />
          </svg>
          {photo}
        </div>
      </div>
    )
  }

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
      <div className="folder__front">{photo}</div>
    </div>
  )
}
