// Priečinok na guli. Dva vzhľady:
//   'mac'   – modrý priečinok ako na Macu: vzadu chrbát s uškom, vpredu predná strana s fotkou projektu
//   'disco' – pixelový priečinok s čiernobielou mozaikou ako disko guľa, tiež s fotkou vpredu
// Pri hoveri (alebo po kliknutí – `open`) fotka ostáva a zo zadu hore vykukne papier.
// Projekt bez fotky (placeholder) je prázdny priečinok.
export default function FolderCard({ image, open = false, label, variant = 'mac' }) {
  const photo = image && <div className="folder__photo"><img src={image} alt="" draggable="false" decoding="async" /></div>

  if (variant === 'disco') {
    // Pixelový priečinok s čiernobielou mozaikou ako disko guľa. Chrbát a predná strana sú malé PNG
    // (30 × 24 a 30 × 18 pixelov), ktoré sa zväčšia bez rozmazania (image-rendering: pixelated).
    return (
      <div className={`folder folder--disco ${open ? 'is-open' : ''}`} role="img" aria-label={label}>
        <img className="folder__back" src="/folder-disco-back.png" alt="" draggable="false" />
        <div className="folder__sheet">
          <svg viewBox="0 0 24 5" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden="true">
            <path fill="#232023" d="M0 0 H24 V1 H0 Z" />
            <path fill="#f4f4f4" d="M0 1 H24 V5 H0 Z" />
          </svg>
        </div>
        <div className="folder__front">
          <img className="folder__front-art" src="/folder-disco-front.png" alt="" draggable="false" />
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
