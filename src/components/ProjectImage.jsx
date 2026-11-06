import { categoryById } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

// Fotka projektu, alebo šedý placeholder s názvom kategórie, ak projekt nemá `image`.
export default function ProjectImage({ project, alt, className = '', imgClassName = '', showLabel = true }) {
  const { language } = useLanguage()
  if (project?.image) {
    return <img draggable="false" src={project.image} alt={alt} className={`${className} ${imgClassName}`} />
  }
  const category = categoryById[project?.group]
  return (
    <div role="img" aria-label={alt} className={`relative ${className}`} style={{ backgroundColor: category?.tone || '#e9e9e6' }}>
      {showLabel && (
        <span className="absolute bottom-[6%] left-[8%] right-[8%] text-[clamp(6px,.62vw,10px)] font-black uppercase leading-[.95] tracking-[-.03em] text-ink/45">
          {category?.label[language] || category?.label.en}
        </span>
      )}
    </div>
  )
}
