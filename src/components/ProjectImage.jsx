import { categoryById } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'

// Fotka projektu, alebo šedý placeholder s názvom kategórie, ak projekt nemá `image`.
export default function ProjectImage({ project, alt, className = '', imgClassName = '', showLabel = true }) {
  const { language } = useLanguage()
  if (project?.image) {
    return <img draggable="false" src={project.image} alt={alt} loading="lazy" decoding="async" className={`${className} ${imgClassName}`} />
  }
  const category = categoryById[project?.group]
  return (
    <div role="img" aria-label={alt} className={`relative ${className}`} style={{ backgroundColor: category?.tone || '#e9e9e6' }}>
      {showLabel && (
        <span className="absolute bottom-[6%] left-[8%] max-w-[84%] bg-paper px-[5px] py-[3px] text-[clamp(8px,.72vw,12px)] font-black uppercase leading-[1] tracking-[-.02em]" style={{ color: category?.color }}>
          {category?.label[language] || category?.label.en}
        </span>
      )}
    </div>
  )
}
