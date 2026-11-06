import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import { useLanguage } from '../context/LanguageContext'
import { aboutData, contactData } from '../data/siteContent'
import { projectCategories } from '../data/projects'

// Stránka O MNE – texty sú v src/data/siteContent.js (aboutData)
export default function About() {
  const { language, t } = useLanguage()
  const about = aboutData[language] || aboutData.en

  return (
    <main className="min-h-screen bg-paper px-[14px] pt-[92px] pb-10 md:px-6 md:pt-[124px] md:pb-16">
      <SiteHeader />
      <section>
        <p className="m-0 mb-5 text-[11px] font-black">{t.about}</p>
        <h1 className="m-0 max-w-[1400px] text-[clamp(50px,15vw,92px)] font-black uppercase leading-[.78] tracking-[-.08em] md:text-[clamp(64px,9.5vw,170px)] md:leading-[.74]">{about.name}</h1>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(240px,28vw)] md:gap-16">
        <div className="min-w-0">
          <p className="m-0 max-w-[1000px] text-[clamp(24px,7vw,40px)] font-black uppercase leading-[.95] tracking-[-.05em] md:text-[clamp(26px,2.9vw,52px)]">{about.bio}</p>

          <dl className="mt-12 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-x-10 md:gap-y-12 xl:grid-cols-4">
            {/* Zameranie = kategórie webu vo svojich farbách, každá vedie na svoju sekciu v ALL */}
            <div className="flex flex-col gap-3">
              <dt className="text-[10px] font-black">{about.focusLabel}</dt>
              {projectCategories.map((category) => (
                <dd key={category.id} className="m-0">
                  <Link to={`/all#${category.id}`} style={{ color: category.color }}
                    className="text-[clamp(15px,1.5vw,24px)] font-black uppercase tracking-[-.04em] transition-opacity hover:opacity-60">
                    {category.label[language] || category.label.en}
                  </Link>
                </dd>
              ))}
            </div>
            {about.sections.map((section) => (
              <div key={section.label} className="flex flex-col gap-3">
                <dt className="text-[10px] font-black">{section.label}</dt>
                {section.lines.map((line) => (
                  <dd key={line} className="m-0 text-[clamp(15px,1.5vw,24px)] font-black uppercase tracking-[-.04em]">{line}</dd>
                ))}
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 md:mt-20">
            <Link to="/contact" className="text-[clamp(15px,1.5vw,24px)] font-black uppercase tracking-[-.04em] transition-colors hover:text-pink">{t.contact} →</Link>
            <a href={contactData.instagramHref} target="_blank" rel="noreferrer" className="text-[clamp(15px,1.5vw,24px)] font-black uppercase tracking-[-.04em] transition-colors hover:text-pink">{contactData.instagramLabel} ↗</a>
          </div>
        </div>

        <figure className="m-0 md:sticky md:top-28 md:self-start">
          {aboutData.photo
            ? <img src={aboutData.photo} alt={about.name} className="block aspect-[4/5] w-full object-cover" />
            : <div role="img" aria-label={about.name} className="aspect-[4/5] w-full bg-[#d9d9d4]" />}
        </figure>
      </div>
    </main>
  )
}
