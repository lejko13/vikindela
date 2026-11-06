import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import ProjectImage from '../components/ProjectImage'
import { projects } from '../data/projects'
import { localized, useLanguage } from '../context/LanguageContext'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { language, t } = useLanguage()
  const raw = projects.find(p => p.slug === slug)

  if (!raw) return <main className="min-h-screen bg-paper p-6 pt-28 text-ink"><SiteHeader/><h1 className="text-5xl font-black">404</h1></main>

  const project = localized(raw, language)
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const rawNext = projects[(currentIndex + 1) % projects.length]
  const nextProject = localized(rawNext, language)

  return (
    <main className="min-h-screen bg-paper px-3 pt-[92px] pb-10 text-ink md:grid md:grid-cols-[minmax(270px,30vw)_minmax(0,1fr)] md:gap-[42px] md:px-6 md:pt-28 md:pb-[70px]">
      <SiteHeader />

      <aside className="mb-9 w-full text-[14px] font-black md:sticky md:top-28 md:mb-0 md:max-w-[440px] md:self-start md:text-[9px]">
        <div className="mb-[22px] text-[14px] uppercase leading-none md:mb-[18px] md:text-[clamp(11px,.9vw,14px)]">{project.category} / {project.year}</div>
        <h1 className="m-0 mb-2 text-[clamp(42px,13vw,58px)] font-black uppercase leading-[.86] tracking-[-.07em] md:text-[clamp(32px,4vw,62px)]">{project.title}</h1>
        <h2 className="m-0 mb-[46px] text-[clamp(30px,8.5vw,42px)] font-black uppercase leading-[.9] tracking-[-.06em] md:mb-[34px] md:text-[clamp(22px,2.7vw,42px)]">{project.client}</h2>
        <p className="m-0 mb-[38px] max-w-full text-[15px] uppercase leading-[1.08] md:mb-[34px] md:max-w-[370px] md:text-[9px] md:leading-[1.12]">{project.description}</p>

        <dl className="mb-[30px] grid gap-[14px] text-[15px] leading-[1.05] tracking-[-.035em] md:mb-[34px] md:gap-[9px] md:text-[clamp(16px,1.25vw,21px)]">
          {[[t.client,project.client],[t.year,project.year],[t.type,project.category],[t.role,project.role],[t.location,project.location]].map(([label,value]) => (
            <div key={label} className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 md:grid-cols-[138px_minmax(0,1fr)] md:gap-[18px]"><dt className="uppercase">{label}</dt><dd className="m-0 uppercase">{String(value).toUpperCase()}</dd></div>
          ))}
        </dl>

        {project.credits?.length > 0 && (
          <dl className="mb-[30px] grid gap-[10px] text-[13px] uppercase leading-[1.08] md:mb-[34px] md:gap-[7px] md:text-[9px]">
            {project.credits.map(([role, name]) => (
              <div key={role} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 md:gap-[18px]"><dt>{role}</dt><dd className="m-0">{name}</dd></div>
            ))}
          </dl>
        )}

        <div className="flex max-w-none flex-wrap gap-2.5 md:max-w-[360px] md:gap-[5px]">
          {project.services.map(service => <span key={service} className="border border-current px-2 py-[6px] text-[15px] uppercase leading-none tracking-[-.035em] md:px-[10px] md:py-[7px] md:text-[clamp(16px,1.25vw,21px)]">{service}</span>)}
        </div>
      </aside>

      <section className="grid min-w-0 gap-3 md:pt-16">
        {project.video ? (
          <figure className="m-0 overflow-hidden bg-black">
            <video src={project.video} poster={project.image || undefined} controls playsInline preload="metadata" className="block h-auto w-full md:max-h-[82vh]" />
            <figcaption className="bg-paper pt-[6px] pb-3 text-[10px] font-black uppercase md:pt-[5px] md:pb-0 md:text-[8px]">01 / {project.title}</figcaption>
          </figure>
        ) : project.gallery?.length ? (
          project.gallery.map((src, index) => (
            <figure key={src} className={`m-0 overflow-hidden ${index % 3 === 1 ? 'md:ml-[11%] md:w-[78%]' : index % 3 === 2 ? 'md:w-[88%]' : ''}`}>
              <img src={src} alt={`${project.title} ${index + 1}`} loading={index < 2 ? 'eager' : 'lazy'} className="block h-auto w-full object-contain md:max-h-[82vh] md:w-auto md:max-w-full" />
              <figcaption className="pt-[6px] pb-3 text-[10px] font-black uppercase md:pt-[5px] md:pb-0 md:text-[8px]">{String(index + 1).padStart(2, '0')} / {project.title}</figcaption>
            </figure>
          ))
        ) : [0,1,2].map((index)=>(
          <figure key={index} className={`m-0 overflow-hidden bg-[#eee] ${index===1?'md:ml-[11%] md:w-[78%]':index===2?'md:w-[88%]':''}`}>
            {project.image
              ? <img src={project.image} alt={project.title} className="block h-auto w-full object-cover md:max-h-[82vh]" />
              : <ProjectImage project={project} alt={project.title} showLabel={false} className="block aspect-[4/5] w-full md:max-h-[82vh]" />}
            <figcaption className="pt-[6px] pb-3 text-[10px] font-black uppercase md:pt-[5px] md:pb-0 md:text-[8px]">0{index+1} / {index===0?project.title:index===1?t.detail:t.campaign}</figcaption>
          </figure>
        ))}
        <Link to={`/work/${rawNext.slug}`} className="mt-[34px] flex items-end justify-between gap-5 pt-7 uppercase transition-colors hover:text-pink md:mt-11 md:pt-[42px]">
          <span className="text-[10px] font-black">{t.nextProject}</span><strong className="text-right text-[clamp(26px,4vw,68px)] font-black leading-[.85] tracking-[-.065em]">{nextProject.title}</strong>
        </Link>
      </section>
    </main>
  )
}
