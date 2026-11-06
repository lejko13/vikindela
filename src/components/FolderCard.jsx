// Priečinok ako na Macu: vzadu chrbát s uškom, v ňom fotka projektu, vpredu predná strana.
// Pri hoveri (alebo po kliknutí – `open`) sa priečinok otvorí: predná strana sa sklopí a fotka sa vysunie.
// Projekt bez fotky (placeholder) má v priečinku šedý papier v odtieni svojej kategórie.
export default function FolderCard({ image, tone, open = false, label }) {
  return (
    <div className={`folder ${open ? 'is-open' : ''}`} role="img" aria-label={label}>
      <div className="folder__back" />
      <div className="folder__sheet" style={image ? undefined : { backgroundColor: tone }}>
        {image && <img src={image} alt="" draggable="false" decoding="async" />}
      </div>
      <div className="folder__front" />
    </div>
  )
}
