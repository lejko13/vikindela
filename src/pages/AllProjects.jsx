import SiteHeader from '../components/SiteHeader'
import { projectCategories, projects } from '../data/projects'
import { localized, useLanguage } from '../context/LanguageContext'

export default function AllProjects() {
  const { language, t } = useLanguage()
  return (
    <main className="min-h-screen bg-paper pt-[84px] text-ink md:pt-28">
      <SiteHeader />
      <header className="block px-[14px] pt-5 pb-11 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:items-end md:gap-6 md:px-6 md:pt-0 md:pb-[74px]">
        <span className="mb-[18px] block text-[9px] font-black uppercase md:mb-0 md:text-[11px]">{t.selectedWork}</span>
        <h1 className="m-0 text-[clamp(50px,16vw,82px)] font-black uppercase leading-[.78] tracking-[-.08em] md:text-[clamp(72px,10.2vw,180px)] md:leading-[.72]">{t.allProjects}</h1>
      </header>

      <div>
        {projectCategories.map((category, sectionIndex) => {
          const items = projects.filter(p => p.group === category.id).map(raw => ({ raw, project: localized(raw, language) }))
          return (
            <section key={category.id} className="px-[14px] py-6 md:min-h-[420px] md:px-6 md:pt-[34px] md:pb-12">
              <div className="mb-5 flex items-start justify-between gap-6 md:mb-[30px]">
                <div className="flex items-start gap-2.5 md:gap-[18px]">
                  <span className="text-[8px] font-black md:text-[10px]">{String(sectionIndex+1).padStart(2,'0')}</span>
                  <h2 className="m-0 text-[clamp(32px,10vw,48px)] font-black uppercase leading-[.82] tracking-[-.065em] md:text-[clamp(40px,4.4vw,78px)]">{category.label[language] || category.label.en}</h2>
                </div>
                <span className="text-[8px] font-black uppercase md:text-[10px]">{String(items.length).padStart(2,'0')} {t.projects}</span>
              </div>

              <div className="no-scrollbar -mr-[14px] flex gap-[14px] overflow-x-auto pr-[14px] md:mr-0 md:gap-6 md:pr-0">
                {items.map(({ raw, project }, index) => (
                  <a href={`/work/${raw.slug}`} key={raw.slug} className="group block w-[132px] shrink-0 md:w-[clamp(150px,11.5vw,220px)]">
                    <div className="aspect-[4/5] overflow-hidden bg-[#eee]">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.035] group-hover:brightness-[.82]" />
                    </div>
                    <div className="grid grid-cols-[20px_minmax(0,1fr)_30px] items-baseline gap-1 pt-2 text-[7px] font-black uppercase md:grid-cols-[26px_minmax(0,1fr)_40px] md:gap-[7px] md:text-[8px]">
                      <span>{String(index+1).padStart(2,'0')}</span><strong className="truncate text-[8px] md:text-[10px]">{project.title}</strong><span className="text-right">{project.year}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
