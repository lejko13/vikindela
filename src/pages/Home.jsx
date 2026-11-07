import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import ProjectImage from '../components/ProjectImage'
import FolderCard from '../components/FolderCard'
import SiteLogo from '../components/SiteLogo'
import { projects, projectCategories, categoryById, thumbFor } from '../data/projects'
import { localized, useLanguage } from '../context/LanguageContext'

const DESKTOP_DISPLAY_COUNT = 30
const MOBILE_DISPLAY_COUNT = 20
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
// Guľa sa sama pomaly otáča sprava doľava (radiány za sekundu). Pri ťahaní, scrollovaní
// alebo keď je myš na kartičke zastane a po chvíli sa plynulo rozbehne znova.
const AUTO_ROTATE_SPEED = 0.182
const AUTO_ROTATE_RESUME_MS = 250
const AUTO_ROTATE_EASE_MS = 250 // ako rýchlo sa rozbehne / zastane
// Zoznam (LIST) sa sám posúva sprava doľava o toľko rýchlejšie než predná strana gule
const LIST_SPEED_FACTOR = 1.2
// Guľa sa dá chytiť a ťahať len v kruhu okolo nej (násobok polomeru gule), nie po celej stránke.
const DRAG_ARENA_SCALE = 1.4
// Prst pri ťahaní: guľa sa k nemu plynulo dotiahne (čím viac, tým rýchlejšie)
const TOUCH_FOLLOW = 0.34
// Priečinok je širší než vyšší (ako ikona priečinka na Macu)
const FOLDER_RATIO = 1.25
// Po kliknutí sa priečinok najprv otvorí, až potom sa prejde na kategóriu
const FOLDER_OPEN_MS = 320


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
      const sources = [p.image, ...(p.gallery || []).map((photo) => photo.src)].filter(Boolean).map(thumbFor)
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
      // 35 % priečinkov je disko pixelových (7 z každých 20, rozhádzané po guli)
      variant: (i * 7) % 20 < 7 ? 'disco' : 'mac',
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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [viewport, setViewport] = useState({ w: 1440, h: 900 })
  const [view, setView] = useState('globe')
  const [openFolder, setOpenFolder] = useState(null)

  // Natočenie gule nie je React stav – mení sa 60× za sekundu, preto sa kartičky posúvajú
  // priamo cez ich štýly (bez prekresľovania celej stránky). `target` je kam sa má guľa dotočiť.
  const rotationRef = useRef({ x: -0.12, y: -0.32 })
  const targetRotationRef = useRef({ x: -0.12, y: -0.32 })
  const nodeElsRef = useRef([])
  const captionElsRef = useRef([])
  const homeRef = useRef(null)
  const listRef = useRef(null)
  const listRowRef = useRef(null)
  const listMotionRef = useRef({ pos: 0, velocity: 0, dragging: false, moved: false })
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

  const isMobile = viewport.w < 760

  const radius = useMemo(() => {
    const byHeight = viewport.h * (isMobile ? 0.245 : 0.37)
    const byWidth = viewport.w * (isMobile ? 0.35 : 0.30)
    return Math.max(isMobile ? 112 : 220, Math.min(byHeight, byWidth, isMobile ? 182 : 430))
  }, [viewport, isMobile])

  // Zoznam sa posúva sám – obsahuje projekty trikrát za sebou (aj na širokom monitore je čo posúvať), takže keď prejde jednu sadu,
  // nenápadne skočí späť o jej šírku a ide dookola. Posúva sa cez transform (grafická karta), nie cez scroll –
  // je to plynulé aj v Safari. Koliesko, ťahanie myšou/prstom so zotrvačnosťou; pri hoveri zastane.
  useEffect(() => {
    if (loading || view !== 'list') return
    const el = listRef.current
    const row = listRowRef.current
    if (!el || !row) return
    hoveringCardRef.current = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const pxPerSecond = radius * AUTO_ROTATE_SPEED * LIST_SPEED_FACTOR
    const loopWidth = row.children[projects.length].offsetLeft - row.children[0].offsetLeft
    let raf
    let last = performance.now()
    let speed = 0
    let shown = NaN
    const tick = (now) => {
      const dt = Math.min(50, now - last)
      last = now
      const list = listMotionRef.current
      if (!list.dragging) {
        // zotrvačnosť po pustení
        if (Math.abs(list.velocity) > 0.01) {
          list.pos += list.velocity * dt
          list.velocity *= Math.pow(0.94, dt / 16.67)
          lastInteractionRef.current = now
        } else list.velocity = 0
        const idle = !reduced && !hoveringCardRef.current && now - lastInteractionRef.current > AUTO_ROTATE_RESUME_MS
        speed += ((idle ? pxPerSecond : 0) - speed) * Math.min(1, dt / AUTO_ROTATE_EASE_MS)
        list.pos += (speed * dt) / 1000
      } else speed = 0
      list.pos = ((list.pos % loopWidth) + loopWidth) % loopWidth
      if (list.pos !== shown) {
        row.style.transform = `translate3d(${(-list.pos).toFixed(2)}px,0,0)`
        shown = list.pos
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loading, view, radius])

  const startListDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    listMotionRef.current = { ...listMotionRef.current, dragging: true, moved: false, x: event.clientX, lastX: event.clientX, lastT: performance.now(), velocity: 0, pointerId: event.pointerId }
  }
  const moveListDrag = (event) => {
    const list = listMotionRef.current
    if (!list.dragging || list.pointerId !== event.pointerId) return
    const dx = event.clientX - list.lastX
    if (!list.moved && Math.abs(event.clientX - list.x) > 6) list.moved = true
    if (list.moved) {
      const now = performance.now()
      list.pos -= dx
      list.velocity = -dx / Math.max(1, now - list.lastT)
      list.lastT = now
      lastInteractionRef.current = now
    }
    list.lastX = event.clientX
  }
  const endListDrag = (event) => {
    const list = listMotionRef.current
    if (!list.dragging || list.pointerId !== event.pointerId) return
    list.dragging = false
    if (list.moved) {
      suppressClickRef.current = true
      setTimeout(() => { suppressClickRef.current = false }, 0)
    }
    lastInteractionRef.current = performance.now()
  }

  // Desktop má 30 priečinkov, mobil 20. LIST nižšie ukazuje všetky projekty.
  const globeDisplayCount = isMobile ? MOBILE_DISPLAY_COUNT : DESKTOP_DISPLAY_COUNT
  const nodes = useMemo(
    () => makeSphereNodes(radius, globeDisplayCount),
    [radius, globeDisplayCount]
  )
  const folderWidth = isMobile ? Math.max(48, Math.min(viewport.w * 0.155, 74)) : Math.max(76, Math.min(viewport.w * 0.074, 136))

  // Jedna slučka pre guľu: samootáčanie, dotiahnutie k prstu a posunutie priečinkov na nové miesta
  useEffect(() => {
    if (view !== 'globe') return
    hoveringCardRef.current = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const last = { opacity: [], z: [], caption: [] }

    const depths = new Array(nodes.length).fill(0)
    const order = nodes.map((_, i) => i)
    const place = () => {
      const { x: rx, y: ry } = rotationRef.current
      nodes.forEach((node, i) => {
        const el = nodeElsRef.current[i]
        if (!el) return
        const p = rotatePoint(node.base, rx, ry)
        const depth = (p.z + radius) / (radius * 2)
        depths[i] = depth
        const scale = 0.76 + depth * 0.5
        el.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${scale.toFixed(3)})`
        // Priehľadnosť v krokoch po 2 % – prehliadač nemusí prepisovať štýl pri každom snímku
        const opacity = (Math.round((0.10 + depth * 0.90) * 50) / 50).toFixed(2)
        if (last.opacity[i] !== opacity) { el.style.opacity = opacity; last.opacity[i] = opacity }
        // Zadné (vyblednuté) priečinky nemajú popisok, aby guľa nebola preplnená
        const caption = depth > 0.45 ? 'visible' : 'hidden'
        const captionEl = captionElsRef.current[i]
        if (captionEl && last.caption[i] !== caption) { captionEl.style.visibility = caption; last.caption[i] = caption }
      })
      // Poradie vpredu/vzadu: z-index = poradie podľa hĺbky. Mení sa len pri pár priečinkoch,
      // keď sa naozaj prekryjú inak – nie pri každom snímku pri všetkých (to brzdilo).
      order.sort((a, b) => depths[a] - depths[b])
      order.forEach((i, rank) => {
        const el = nodeElsRef.current[i]
        if (el && last.z[i] !== rank) { el.style.zIndex = String(rank + 1); last.z[i] = rank }
      })
    }

    const placed = { x: NaN, y: NaN }
    const placeIfMoved = () => {
      const rot = rotationRef.current
      if (rot.x === placed.x && rot.y === placed.y) return
      placed.x = rot.x; placed.y = rot.y
      place()
    }
    placeIfMoved()
    let raf
    let prev = performance.now()
    let speed = 0
    const tick = (now) => {
      const dt = Math.min(50, now - prev)
      prev = now
      const target = targetRotationRef.current
      if (dragRef.current.active) {
        speed = 0
      } else if (!loading && !reduced) {
        const idle = !hoveringCardRef.current && now - lastInteractionRef.current > AUTO_ROTATE_RESUME_MS
        speed += ((idle ? AUTO_ROTATE_SPEED : 0) - speed) * Math.min(1, dt / AUTO_ROTATE_EASE_MS)
        if (speed > 0.0005) target.y -= (speed * dt) / 1000
      }
      const rot = rotationRef.current
      const dx = target.x - rot.x, dy = target.y - rot.y
      if (Math.abs(dx) + Math.abs(dy) > 0.00001) {
        const k = 1 - Math.pow(1 - TOUCH_FOLLOW, dt / 16.67)
        rot.x += dx * k
        rot.y += dy * k
      }
      placeIfMoved()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [view, loading, nodes, radius])

  // Myš a koliesko točia guľou hneď, prst cez plynulé dotiahnutie (target)
  const rotateBy = (dx, dy, immediate) => {
    const target = targetRotationRef.current
    target.x += dx
    target.y += dy
    if (immediate) {
      rotationRef.current.x = target.x
      rotationRef.current.y = target.y
    }
  }

  useEffect(() => {
    const el = homeRef.current
    if (!el) return
    const onWheel = (event) => {
      if (document.body.classList.contains('menu-locked')) { event.preventDefault(); return }
      if (event.ctrlKey) return
      event.preventDefault(); event.stopPropagation()
      lastInteractionRef.current = performance.now()
      if (view === 'globe') {
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.h : 1
        rotateBy(-event.deltaY * unit * 0.00235, event.deltaX * unit * 0.00235, true)
      } else {
        listMotionRef.current.pos += event.deltaX + event.deltaY
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [view, viewport.h])

  const startDrag = (event) => {
    if (view !== 'globe' || (event.pointerType === 'mouse' && event.button !== 0)) return
    if (event.target.closest?.('header, footer, [data-menu-overlay]')) return
    const center = globeCenterRef.current?.getBoundingClientRect()
    if (!center || Math.hypot(event.clientX - center.left, event.clientY - center.top) > radius * DRAG_ARENA_SCALE) return
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
      const touch = event.pointerType === 'touch'
      const s = touch ? 0.0058 : 0.0054
      rotateBy(-dy * s, dx * s, !touch)
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

  // Klik na priečinok: najprv sa otvorí, potom sa prejde na kategóriu
  const openProject = (event, key, destination) => {
    event.preventDefault()
    if (suppressClickRef.current || openFolder) { event.stopPropagation(); return }
    setOpenFolder(key)
    setTimeout(() => navigate(destination), FOLDER_OPEN_MS)
  }

  return (
    <main ref={homeRef} className="fixed inset-0 min-h-0 select-none overflow-hidden bg-paper [touch-action:none]"
      onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}
      onPointerLeave={(e) => dragRef.current.active && e.buttons === 0 && endDrag(e)}>

      <div className={`absolute inset-0 z-[20000] flex flex-col justify-between bg-paper px-[14px] pt-[15px] pb-[14px] transition-all duration-700 md:px-6 md:pt-[22px] md:pb-5 ${loading ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible pointer-events-none'}`}>
        <div className="-mt-[7px] -mb-[4px] md:-mt-[10px] md:-mb-[6px]"><SiteLogo /></div>
        <div className="flex items-end justify-between text-[13px] font-black tracking-[-.04em] md:text-[clamp(13px,1.2vw,18px)]"><span>{t.loading}</span><span>{String(loadingProgress).padStart(2,'0')}</span></div>
      </div>

      <div className={`absolute inset-0 transition-all duration-500 ${loading ? 'translate-y-2.5 opacity-0' : 'translate-y-0 opacity-100'}`}>
        {/* Pozadie: kresba čiarami (public/background-lines.png – priehľadné PNG bez zeleného podkladu) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('/background-lines.png')] bg-cover bg-center bg-no-repeat" />
        <SiteHeader />

        {/* Nadpis je skrytý (vizuálne odstránený), ostáva len pre vyhľadávače a čítačky obrazovky */}
        <h1 className="sr-only">{t.introLine1} {t.introLine2}</h1>

        {view === 'globe' ? (
          <div ref={globeCenterRef} className="absolute left-1/2 top-[51%] z-10 h-0 w-0 md:top-1/2">
            {/* Aréna na chytanie gule – neviditeľný kruh, v ktorom je kurzor „ruka" */}
            <div aria-hidden="true" className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full"
              style={{ width: radius * DRAG_ARENA_SCALE * 2, height: radius * DRAG_ARENA_SCALE * 2 }} />
            {nodes.map((node, i) => {
              const project = localized(node.project, language)
              const category = categoryById[project.group]
              const width = folderWidth * node.size
              const destination = destinationForIndex(node.index, nodes.length)
              return (
                <Link key={node.key} to={destination} ref={(el) => { nodeElsRef.current[i] = el }}
                  onClick={(event) => openProject(event, node.key, destination)}
                  onMouseEnter={() => { hoveringCardRef.current = true }}
                  onMouseLeave={() => { hoveringCardRef.current = false; lastInteractionRef.current = performance.now() }}
                  className="group absolute left-0 top-0 cursor-pointer will-change-transform"
                  style={{ width, height: width / FOLDER_RATIO, opacity: 0 }}>
                  <FolderCard image={project.image} open={openFolder === node.key} label={project.title} variant={node.variant} />
                  {/* Popisok pod priečinkom: kategória + názov projektu */}
                  <span ref={(el) => { captionElsRef.current[i] = el }}
                    className="pointer-events-none absolute left-0 top-[calc(100%+3px)] bg-paper px-[3px] py-[2px] font-black uppercase leading-[1.08] tracking-[-.02em]"
                    style={{ fontSize: Math.max(8, Math.min(12, width * 0.088)), color: category?.color, visibility: 'hidden' }}>
                    <span className="block whitespace-nowrap">{category?.label[language] || category?.label.en}</span>
                    <span className="block whitespace-nowrap opacity-65">{project.placeholder ? t.comingSoon : project.title}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        ) : (
          <section ref={listRef} className="absolute left-0 right-0 top-1/2 z-[1200] -translate-y-1/2 cursor-grab overflow-hidden px-0 py-6 [touch-action:none]"
            onPointerDown={startListDrag} onPointerMove={moveListDrag} onPointerUp={endListDrag} onPointerCancel={endListDrag} onPointerLeave={endListDrag}
            onClickCapture={(event) => { if (suppressClickRef.current) { event.preventDefault(); event.stopPropagation() } }}>
            <div ref={listRowRef} className="flex w-max min-w-full items-center gap-4 px-4 will-change-transform md:gap-[27px] md:px-[30px]">
              {[...projects, ...projects, ...projects].map((project, index) => (
                <Link key={`${project.slug}-${index}`} to={`/work/${project.slug}`} draggable="false"
                  onMouseEnter={() => { hoveringCardRef.current = true }}
                  onMouseLeave={() => { hoveringCardRef.current = false; lastInteractionRef.current = performance.now() }}
                  className="pink-hover group relative block h-[114px] w-[94px] shrink-0 md:h-[clamp(108px,7.6vw,150px)] md:w-[clamp(96px,6.5vw,132px)]">
                  <ProjectImage project={{ ...project, image: thumbFor(project.image) }} alt={localized(project, language).title} className="h-full w-full transition group-hover:scale-[1.035]" imgClassName="object-cover" />
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
