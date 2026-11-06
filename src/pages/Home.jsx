import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import ProjectImage from '../components/ProjectImage'
import SiteLogo from '../components/SiteLogo'
import { projects, projectCategories, categoryById } from '../data/projects'
import { localized, useLanguage } from '../context/LanguageContext'

const DESKTOP_DISPLAY_COUNT = 30
const MOBILE_DISPLAY_COUNT = 20
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
// Guľa sa sama pomaly otáča sprava doľava (radiány za sekundu). Pri ťahaní, scrollovaní
// alebo keď je myš na kartičke zastane a po chvíli sa plynulo rozbehne znova.
const AUTO_ROTATE_SPEED = 0.1
const AUTO_ROTATE_RESUME_MS = 1400
// Guľa sa dá chytiť a ťahať len v kruhu okolo nej (násobok polomeru gule), nie po celej stránke.
const DRAG_ARENA_SCALE = 1.4

// Guľa je rozdelená na 4 pásy (zhora nadol) — jeden pás = jedna kategória.
// Klik na ktorýkoľvek obrázok v páse ťa hodí na danú kategóriu na stránke ALL.
// Tvar gule, počet uzlov, veľkosti a pozície zostávajú rovnaké.
const GLOBE_ZONES = projectCategories.map((c) => `/all#${c.id}`)

function bucketForIndex(index, count) {
  return Math.min(GLOBE_ZONES.length - 1, Math.floor((index * GLOBE_ZONES.length) / count))
}

function destinationForIndex(index, count) {
  return GLOBE_ZONES[bucketForIndex(index, count)]
}

function makeSphereNodes(radius, count) {
  // Pre každú kategóriu zoznam „obrázkov" — náhľady projektov + fotky z galérií.
  // Uzly v páse sa nimi striedajú, aby sa ten istý obrázok neopakoval vedľa seba.
  const categoryPool = projectCategories.map((c) => {
    const items = projects.filter((p) => p.group === c.id)
    const pool = items.flatMap((p) => {
      const sources = [p.image, ...(p.gallery || []).map((photo) => photo.src)].filter(Boolean)
      const unique = [...new Set(sources)]
      return unique.length ? unique.map((src) => ({ ...p, image: src })) : [p]
    })
    return pool.length ? pool : [projects[0]]
  })
  const bucketCounters = projectCategories.map(() => 0)
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / Math.max(1, count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const angle = GOLDEN_ANGLE * i
    const bucket = bucketForIndex(i, count)
    const pool = categoryPool[bucket]
    const project = pool[bucketCounters[bucket]++ % pool.length]
    return {
      key: `${project.slug}-${i}`,
      index: i,
      project,
      base: { x: Math.cos(angle) * ring * radius, y: y * radius, z: Math.sin(angle) * ring * radius },
      size: [0.72, 0.96, 1.18, 0.84, 1.08, 0.9][i % 6],
      ratio: [0.78, 0.88, 0.7, 1.0, 0.82][i % 5],
    }
  })
}

function rotatePoint(point, rx, ry) {
  const cosY = Math.cos(ry), sinY = Math.sin(ry)
  const x1 = point.x * cosY + point.z * sinY
  const z1 = -point.x * sinY + point.z * cosY
  const cosX = Math.cos(rx), sinX = Math.sin(rx)
  return { x: x1, y: point.y * cosX - z1 * sinX, z: point.y * sinX + z1 * cosX }
}

export default function Home({ introDelay = 0 }) {
  const { language, t } = useLanguage()
  const { search } = useLocation()
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [viewport, setViewport] = useState({ w: 1440, h: 900 })
  const [rotation, setRotation] = useState({ x: -0.12, y: -0.32 })
  const [view, setView] = useState('globe')

  const rotationRef = useRef(rotation)
  const targetRotationRef = useRef(rotation)
  const touchRafRef = useRef(null)
  const homeRef = useRef(null)
  const listRef = useRef(null)
  const dragRef = useRef({ active: false, moved: false, pointerId: null, x: 0, y: 0 })
  const suppressClickRef = useRef(false)
  const globeCenterRef = useRef(null)
  const lastInteractionRef = useRef(0)
  const hoveringCardRef = useRef(false)

  useEffect(() => {
    setLoading(true)
    setLoadingProgress(0)
    let progress = 0
    let interval
    // Pri príchode z úvodnej obrazovky sa počítadlo rozbehne, až keď sa fotka začne odrolovať
    const start = setTimeout(() => {
      interval = setInterval(() => {
        const remaining = 100 - progress
        const step = Math.max(1, Math.ceil(remaining * (0.08 + Math.random() * 0.10)))
        progress = Math.min(99, progress + step)
        setLoadingProgress(progress)
      }, 70)
    }, introDelay)
    let hide
    const finish = setTimeout(() => {
      clearInterval(interval)
      setLoadingProgress(100)
      hide = setTimeout(() => setLoading(false), 180)
    }, introDelay + 1050)
    return () => { clearTimeout(start); clearInterval(interval); clearTimeout(finish); clearTimeout(hide) }
  }, [])

  useEffect(() => {
    const requested = new URLSearchParams(search).get('view')
    if (requested === 'list' || requested === 'globe') setView(requested)
    const onView = (event) => (event.detail === 'list' || event.detail === 'globe') && setView(event.detail)
    window.addEventListener('portfolio:view', onView)
    return () => window.removeEventListener('portfolio:view', onView)
  }, [search])

  useEffect(() => {
    const resize = () => setViewport({ w: innerWidth, h: innerHeight })
    resize(); addEventListener('resize', resize)
    return () => removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('portfolio-locked')
    document.body.classList.add('portfolio-locked')
    return () => {
      document.documentElement.classList.remove('portfolio-locked')
      document.body.classList.remove('portfolio-locked')
    }
  }, [])

  useEffect(() => {
    rotationRef.current = rotation
    if (!dragRef.current.active) targetRotationRef.current = rotation
  }, [rotation])

  useEffect(() => {
    return () => {
      if (touchRafRef.current) cancelAnimationFrame(touchRafRef.current)
    }
  }, [])

  useEffect(() => {
    if (loading || view !== 'globe') return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    let last = performance.now()
    let speed = 0
    const tick = (now) => {
      const dt = Math.min(50, now - last)
      last = now
      if (dragRef.current.active || touchRafRef.current) {
        speed = 0
      } else {
        const idle = !hoveringCardRef.current && now - lastInteractionRef.current > AUTO_ROTATE_RESUME_MS
        speed += ((idle ? AUTO_ROTATE_SPEED : 0) - speed) * Math.min(1, dt / 700)
        if (speed > 0.0005) {
          const next = { x: rotationRef.current.x, y: rotationRef.current.y - (speed * dt) / 1000 }
          rotationRef.current = next
          targetRotationRef.current = next
          setRotation(next)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loading, view])

  const isMobile = viewport.w < 760

  const radius = useMemo(() => {
    const byHeight = viewport.h * (isMobile ? 0.245 : 0.37)
    const byWidth = viewport.w * (isMobile ? 0.35 : 0.30)
    return Math.max(isMobile ? 112 : 220, Math.min(byHeight, byWidth, isMobile ? 182 : 430))
  }, [viewport, isMobile])

  // Optimization applies ONLY to GLOBE.
  // Desktop keeps 30 visual nodes, phones render only 10.
  // LIST below still maps the complete `projects` array unchanged.
  const globeDisplayCount = isMobile ? MOBILE_DISPLAY_COUNT : DESKTOP_DISPLAY_COUNT
  const nodes = useMemo(
    () => makeSphereNodes(radius, globeDisplayCount),
    [radius, globeDisplayCount]
  )
  const visualNodes = useMemo(() => nodes.map((node) => {
    const p = rotatePoint(node.base, rotation.x, rotation.y)
    const depth = (p.z + radius) / (radius * 2)
    const perspective = 0.76 + depth * 0.5
    const baseWidth = isMobile ? Math.max(44, Math.min(viewport.w * 0.145, 68)) : Math.max(70, Math.min(viewport.w * 0.068, 126))
    const width = baseWidth * node.size * perspective
    return { ...node, p, depth, opacity: 0.10 + depth * 0.90, width, height: width / node.ratio }
  }).sort((a,b) => a.p.z - b.p.z), [nodes, rotation, radius, viewport.w, isMobile])

  const rotateFromWheel = (event) => {
    lastInteractionRef.current = performance.now()
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.h : 1
    const next = {
      x: rotationRef.current.x - event.deltaY * unit * 0.00235,
      y: rotationRef.current.y + event.deltaX * unit * 0.00235,
    }
    rotationRef.current = next
    setRotation(next)
  }

  useEffect(() => {
    const el = homeRef.current
    if (!el) return
    const onWheel = (event) => {
      if (document.body.classList.contains('menu-locked')) { event.preventDefault(); return }
      if (event.ctrlKey) return
      event.preventDefault(); event.stopPropagation()
      if (view === 'globe') rotateFromWheel(event)
      else if (listRef.current) listRef.current.scrollLeft += event.deltaX + event.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [view, viewport.h])

  const runSmoothTouchRotation = () => {
    if (touchRafRef.current) return

    const animate = () => {
      const current = rotationRef.current
      const target = targetRotationRef.current

      // Smoothly approach finger position instead of forcing a React render
      // for every raw touchmove event.
      const ease = 0.34
      const next = {
        x: current.x + (target.x - current.x) * ease,
        y: current.y + (target.y - current.y) * ease,
      }

      rotationRef.current = next
      setRotation(next)

      const distance =
        Math.abs(target.x - next.x) +
        Math.abs(target.y - next.y)

      if (distance > 0.00015) {
        touchRafRef.current = requestAnimationFrame(animate)
      } else {
        rotationRef.current = target
        setRotation(target)
        touchRafRef.current = null
      }
    }

    touchRafRef.current = requestAnimationFrame(animate)
  }

  const startDrag = (event) => {
    if (view !== 'globe' || (event.pointerType === 'mouse' && event.button !== 0)) return
    if (event.target.closest?.('header, footer, [data-menu-overlay]')) return
    const center = globeCenterRef.current?.getBoundingClientRect()
    if (!center || Math.hypot(event.clientX - center.left, event.clientY - center.top) > radius * DRAG_ARENA_SCALE) return
    targetRotationRef.current = rotationRef.current
    dragRef.current = { active: true, moved: false, pointerId: event.pointerId, x: event.clientX, y: event.clientY }
  }

  const moveDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId || view !== 'globe') return
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y
    if (!drag.moved && Math.hypot(dx, dy) >= 8) {
      drag.moved = true
      document.body.classList.add('is-dragging')
    }
    if (drag.moved) {
      event.preventDefault()
      if (event.pointerType === 'touch') {
        // Finger controls a target rotation; RAF interpolates to it smoothly.
        const s = 0.0058
        const target = targetRotationRef.current
        targetRotationRef.current = {
          x: target.x - dy * s,
          y: target.y + dx * s,
        }
        runSmoothTouchRotation()
      } else {
        // Mouse stays immediate and precise.
        const s = 0.0054
        const next = {
          x: rotationRef.current.x - dy * s,
          y: rotationRef.current.y + dx * s,
        }
        rotationRef.current = next
        targetRotationRef.current = next
        setRotation(next)
      }
    }
    drag.x = event.clientX; drag.y = event.clientY
  }

  const endDrag = (event) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return
    lastInteractionRef.current = performance.now()
    if (drag.moved) {
      suppressClickRef.current = true
      setTimeout(() => { suppressClickRef.current = false }, 0)
    }
    document.body.classList.remove('is-dragging')
    dragRef.current = { active: false, moved: false, pointerId: null, x: 0, y: 0 }
  }

  const openProject = (event) => {
    if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation() }
  }

  return (
    <main ref={homeRef} className="fixed inset-0 min-h-0 select-none overflow-hidden bg-paper [touch-action:none]"
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
      onPointerLeave={(e) => dragRef.current.active && e.buttons === 0 && endDrag(e)}>

      <div className={`absolute inset-0 z-[20000] flex flex-col justify-between bg-paper px-[14px] pt-[15px] pb-[14px] transition-all duration-700 md:px-6 md:pt-[22px] md:pb-5 ${loading ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible pointer-events-none'}`}>
        <div className="-my-[9px] md:-my-[clamp(14px,1.05vw,17px)]"><SiteLogo /></div>
        <div className="flex items-end justify-between text-[13px] font-black tracking-[-.04em] md:text-[clamp(13px,1.2vw,18px)]"><span>{t.loading}</span><span>{String(loadingProgress).padStart(2,'0')}</span></div>
      </div>

      <div className={`absolute inset-0 transition-all duration-500 ${loading ? 'translate-y-2.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <SiteHeader />

        {/* Nadpis je skrytý (vizuálne odstránený), ostáva len pre vyhľadávače a čítačky obrazovky */}
        <h1 className="sr-only">{t.introLine1} {t.introLine2}</h1>

        {view === 'globe' ? (
          <div ref={globeCenterRef} className="absolute left-1/2 top-[51%] z-10 h-0 w-0 md:top-1/2">
            {/* Aréna na chytanie gule – neviditeľný kruh, v ktorom je kurzor „ruka" */}
            <div aria-hidden="true" className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full"
              style={{ width: radius * DRAG_ARENA_SCALE * 2, height: radius * DRAG_ARENA_SCALE * 2 }} />
            {visualNodes.map((node) => {
              const project = localized(node.project, language)
              const category = categoryById[project.group]
              return (
                <Link key={node.key} to={destinationForIndex(node.index, nodes.length)} onClick={openProject}
                  onMouseEnter={() => { hoveringCardRef.current = true }}
                  onMouseLeave={() => { hoveringCardRef.current = false; lastInteractionRef.current = performance.now() }}
                  className="group absolute left-0 top-0 cursor-pointer"
                  style={{ width: node.width, height: node.height, opacity: node.opacity, zIndex: Math.round(node.depth * 1000), transform: `translate3d(${node.p.x}px,${node.p.y}px,0) translate(-50%,-50%)` }}>
                  <div className="pink-hover relative h-full w-full overflow-hidden bg-[#e9e9e6]">
                    <ProjectImage project={project} alt={project.title} className="pointer-events-none h-full w-full" imgClassName="object-cover" showLabel={false} />
                  </div>
                  {/* Popisok pod kartičkou: kategória + názov projektu. Zadné (vyblednuté) kartičky ho nemajú, aby guľa nebola preplnená. */}
                  {node.depth > 0.45 && (
                    <span className="pointer-events-none absolute left-0 top-[calc(100%+3px)] bg-paper px-[3px] py-[2px] font-black uppercase leading-[1.08] tracking-[-.02em]"
                      style={{ fontSize: Math.max(9, Math.min(13, node.width * 0.095)), color: category?.color }}>
                      <span className="block whitespace-nowrap">{category?.label[language] || category?.label.en}</span>
                      <span className="block whitespace-nowrap opacity-65">{project.placeholder ? t.comingSoon : project.title}</span>
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <section ref={listRef} className="no-scrollbar absolute left-0 right-0 top-1/2 z-[1200] -translate-y-1/2 overflow-x-auto overflow-y-hidden px-0 py-6 [touch-action:pan-x]">
            <div className="flex w-max min-w-full items-center gap-4 px-4 md:gap-[27px] md:px-[30px]">
              {[...projects, ...projects].map((project, index) => (
                <Link key={`${project.slug}-${index}`} to={`/work/${project.slug}`} className="pink-hover group relative block h-[114px] w-[94px] shrink-0 md:h-[clamp(108px,7.6vw,150px)] md:w-[clamp(96px,6.5vw,132px)]">
                  <ProjectImage project={project} alt={localized(project, language).title} className="h-full w-full transition group-hover:scale-[1.035]" imgClassName="object-cover" />
                  <span className="absolute left-0 top-[calc(100%+7px)] whitespace-nowrap text-[8px] font-black uppercase opacity-0 transition-opacity group-hover:opacity-100" style={{ color: categoryById[project.group]?.color }}>{localized(project, language).title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="absolute bottom-[max(14px,env(safe-area-inset-bottom))] left-[14px] right-[14px] z-[5000] flex items-end justify-between md:bottom-5 md:left-6 md:right-6">
          <button type="button" onClick={() => setView(view === 'globe' ? 'list' : 'globe')} className="ml-auto transition-colors hover:text-pink text-[14px] font-black tracking-[-.045em] md:text-[clamp(14px,1.25vw,20px)]">{view === 'globe' ? t.list : t.globe}</button>
        </footer>
      </div>
    </main>
  )
}