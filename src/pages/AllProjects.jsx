import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import ProjectImage from '../components/ProjectImage'
import { projectCaption, projectCategories, projects, thumbFor } from '../data/projects'
import { localized, useLanguage } from '../context/LanguageContext'

export default function AllProjects() {
  const { language, t } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.slice(1))
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [location.hash])

  return (
    <main className="min-h-screen bg-paper pt-[84px] text-pink-strong md:pt-28">
      <SiteHeader />
      <header className="block px-[14px] pt-5 pb-11 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:items-end md:gap-6 md:px-6 md:pt-0 md:pb-[74px]">
        <span className="mb-[18px] block text-[9px] font-black uppercase md:mb-0 md:text-[11px]">{t.selectedWork}</span>
        <h1 className="m-0 text-[clamp(50px,16vw,82px)] font-black uppercase leading-[.78] tracking-[-.08em] md:text-[clamp(72px,10.2vw,180px)] md:leading-[.72]">{t.allProjects}</h1>
      </header>

      <div>
        {projectCategories.map((category, sectionIndex) => {
          const items = projects.filter(p => p.group === category.id).map(raw => ({ raw, project: localized(raw, language) }))
          return (
            <section key={category.id} id={category.id} style={{ color: category.color }} className="scroll-mt-[63px] px-[14px] py-6 last:min-h-[calc(100svh-63px)] md:scroll-mt-[clamp(79px,calc(4.97vw+24px),113px)] md:min-h-[420px] md:last:min-h-[calc(100svh-clamp(79px,calc(4.97vw+24px),113px))] md:px-6 md:pt-[34px] md:pb-12">
              <div className="mb-5 flex items-start justify-between gap-6 md:mb-[30px]">
                <div className="flex items-start gap-2.5 md:gap-[18px]">
                  <span className="text-[8px] font-black md:text-[10px]">{String(sectionIndex+1).padStart(2,'0')}</span>
                  <h2 className="m-0 text-[clamp(32px,10vw,48px)] font-black uppercase leading-[.82] tracking-[-.065em] md:text-[clamp(40px,4.4vw,78px)]">{category.label[language] || category.label.en}</h2>
                </div>
                <span className="text-[8px] font-black uppercase md:text-[10px]">{String(items.length).padStart(2,'0')} {t.projects}</span>
              </div>

              <div className="no-scrollbar -mr-[14px] flex gap-[14px] overflow-x-auto pr-[14px] md:mr-0 md:gap-6 md:pr-0">
                {items.map(({ raw, project }, index) => (
                  <Link to={`/work/${raw.slug}`} key={raw.slug} className="group block w-[132px] shrink-0 md:w-[clamp(150px,11.5vw,220px)]">
                    <div className="pink-hover relative aspect-[4/5] overflow-hidden bg-[#eee]">
                      <ProjectImage project={{ ...project, image: thumbFor(project.image) }} alt={project.title} className="h-full w-full transition duration-200 group-hover:scale-[1.035]" imgClassName="object-cover" />
                    </div>
                    <div className="grid grid-cols-[20px_minmax(0,1fr)_30px] items-baseline gap-x-1 gap-y-[3px] pt-2.5 transition-opacity group-hover:opacity-60 text-[8px] font-black uppercase md:grid-cols-[28px_minmax(0,1fr)_40px] md:gap-x-[7px] md:text-[10px]">
                      <span>{String(index+1).padStart(2,'0')}</span><strong className="truncate text-[10px] md:text-[13px]">{project.title}</strong><span className="text-right">{project.year}</span>
                      <span className="col-span-2 col-start-2 truncate opacity-65">{projectCaption(project, t)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
