import { useState } from 'react'
import SiteHeader from '../components/SiteHeader'
import { useLanguage } from '../context/LanguageContext'
import { contactData } from '../data/siteContent'

export default function Contact() {
  const { t } = useLanguage()
  const [message, setMessage] = useState('')

  const sendMessage = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Vikindela — Contact')
    const body = encodeURIComponent(message.trim())
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="flex min-h-screen flex-col bg-paper px-[14px] pt-[92px] pb-[18px] md:px-6 md:pt-[124px] md:pb-7">
      <SiteHeader />
      <section>
        <p className="m-0 mb-5 text-[11px] font-black">{t.contact}</p>
        <h1 className="m-0 max-w-[1200px] text-[clamp(58px,18vw,92px)] font-black leading-[.72] tracking-[-.08em] md:text-[clamp(72px,12vw,210px)]">{t.contactTitle}</h1>
      </section>

      <section className="mt-[90px] grid grid-cols-1 gap-[34px] pt-[18px] md:mt-auto md:grid-cols-[minmax(260px,1.3fr)_repeat(3,minmax(140px,.7fr))] md:gap-8 md:pt-20">
        <a href={`tel:${contactData.phoneHref}`} className="text-[clamp(34px,10vw,52px)] font-black leading-[.86] tracking-[-.055em] md:text-[clamp(28px,4vw,70px)] md:whitespace-nowrap">{contactData.phoneDisplay}</a>
        <div className="flex flex-col gap-3"><span className="text-[10px] font-black">{t.emailLabel}</span><a href={`mailto:${contactData.email}`} className="text-[clamp(15px,1.5vw,24px)] font-black tracking-[-.04em]">{contactData.email.toUpperCase()}</a></div>
        <div className="flex flex-col gap-3"><span className="text-[10px] font-black">{t.phoneLabel}</span><a href={`tel:${contactData.phoneHref}`} className="text-[clamp(15px,1.5vw,24px)] font-black tracking-[-.04em]">{contactData.phoneDisplay}</a></div>
        <div className="flex flex-col gap-3"><span className="text-[10px] font-black">{t.instagramLabel}</span><a href={contactData.instagramHref} target="_blank" rel="noreferrer" className="text-[clamp(15px,1.5vw,24px)] font-black tracking-[-.04em]">{contactData.instagramLabel.toUpperCase()}</a></div>
      </section>

      <form onSubmit={sendMessage} className="mt-12 grid grid-cols-1 items-start gap-[14px] pt-4 md:mt-[68px] md:grid-cols-[160px_minmax(0,1fr)_auto] md:gap-5">
        <label htmlFor="message" className="text-[10px] font-black">{t.messageLabel}</label>
        <textarea id="message" rows="5" required value={message} onChange={e=>setMessage(e.target.value)} placeholder={t.messagePlaceholder}
          className="min-h-[130px] w-full resize-y bg-transparent p-0 pb-[14px] text-[clamp(28px,8vw,42px)] font-black uppercase leading-[.92] tracking-[-.055em] outline-none placeholder:text-black/20 md:min-h-[150px] md:text-[clamp(24px,3.2vw,56px)]" />
        <button type="submit" className="min-h-11 justify-self-start border-2 border-ink px-[14px] py-[10px] text-xs font-black hover:bg-ink hover:text-paper md:min-w-[100px]">{t.sendMessage}</button>
      </form>
    </main>
  )
}
