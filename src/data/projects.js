// 4 kategórie webu. Poradie = poradie pásov na guli (zhora nadol) aj sekcií na stránke ALL.
// `tone` je odtieň šedej pre placeholdery danej kategórie.
// `color` je farba textov kategórie (popisky na guli, nadpis na ALL, detail projektu).
// Žltá = Pantone 0131 C, modrá = Pantone 072 C.
export const projectCategories = [
  { id: 'art-directing', label: { en: 'ART DIRECTING', sk: 'ART DIRECTING' }, tone: '#e6e6e2', color: '#f2c75c' },
  { id: 'styling', label: { en: 'STYLING', sk: 'STYLING' }, tone: '#d9d9d4', color: '#050505' },
  { id: 'fashion-design', label: { en: 'FASHION DESIGN', sk: 'MÓDNY DIZAJN' }, tone: '#cbcbc5', color: '#10069f' },
  { id: 'social-media', label: { en: 'SOCIAL MEDIA', sk: 'SOCIÁLNE SIETE' }, tone: '#bdbdb6', color: '#e84cdb' },
]

export const categoryById = Object.fromEntries(projectCategories.map((c) => [c.id, c]))

// Zmenšená verzia fotky (public/projects/thumbs, max 520 px) – na guľu, zoznam a kartičky v ALL,
// kde sa fotka ukazuje malá. Plná fotka sa načíta až na detaile projektu.
export const thumbFor = (src) => (src?.startsWith('/projects/') ? src.replace('/projects/', '/projects/thumbs/') : src)

// ─────────────────────────────────────────────────────────────────────────────
// REÁLNE PROJEKTY
// Polia projektu:
//   image   – náhľad (globus, zoznam, ALL). Pri videu je to obrázok z videa.
//   video   – (voliteľné) .mp4 v /public, zobrazí sa na detaile projektu a spustí sa samo
//   poster  – prvý snímok videa (rovnaký pomer strán, aby video pri spustení neposkočilo)
//   videoSize – [šírka, výška] videa v pixeloch
//   gallery – (voliteľné) zoznam fotiek { src, width, height } na detaile projektu
//   credits – (voliteľné) zoznam [rola, meno] na detaile projektu
// ─────────────────────────────────────────────────────────────────────────────
const realProjects = [
  {
    slug: 'who-am-i-to-love-you',
    title: 'WHO AM I TO LOVE YOU',
    group: 'art-directing',
    client: '—',
    year: '2024',
    category: 'ART DIRECTING',
    location: '—',
    role: 'ART DIRECTING, STYLING, OUTFITS DESIGN',
    services: ['ART DIRECTING', 'STYLING', 'OUTFITS DESIGN', 'VIDEO'],
    description: '',
    credits: [
      ['Camera, video edit', 'Daniel Rázus'],
      ['Art directing, styling, outfits design', 'Viktória Kubincová'],
      ['Sound', '01A2FB by WEN'],
      ['Voicemail', 'Radka Dzurčaninová'],
      ['Models', 'Radka Dzurčaninová, Sofia Konečná, Karin Sasaraková, Jakub Mehaj, Alex Mellif, Jakub Kuchár, Sofia Valkovičová, Ema Langová, Sofia Philippi'],
    ],
    translations: {
      sk: {
        role: 'ART DIRECTING, STYLING, NÁVRH OUTFITOV',
        services: ['ART DIRECTING', 'STYLING', 'NÁVRH OUTFITOV', 'VIDEO'],
        description: '',
        credits: [
          ['Kamera, strih videa', 'Daniel Rázus'],
          ['Art directing, styling, návrh outfitov', 'Viktória Kubincová'],
          ['Hudba', '01A2FB by WEN'],
          ['Hlasová správa', 'Radka Dzurčaninová'],
          ['Modelky a modeli', 'Radka Dzurčaninová, Sofia Konečná, Karin Sasaraková, Jakub Mehaj, Alex Mellif, Jakub Kuchár, Sofia Valkovičová, Ema Langová, Sofia Philippi'],
        ],
      },
    },
    image: '/projects/who-am-i-to-love-you.jpg',
    video: '/projects/who-am-i-to-love-you.mp4',
    poster: '/projects/who-am-i-to-love-you-poster.jpg',
    videoSize: [1280, 720],
  },
  {
    slug: 'me-myself-and-others',
    title: 'ME, MYSELF AND OTHERS',
    group: 'art-directing',
    client: 'Student project',
    year: '2025',
    category: 'ART DIRECTING',
    location: '—',
    role: 'CONCEPT, CAMERA, VIDEO EDIT',
    services: ['ART DIRECTING', 'CONCEPT', 'VIDEO'],
    description: '',
    credits: [
      ['Concept, camera, video edit', 'Viktória Kubincová'],
      ['Sound', 'Hujdy, Saul – Voľný pád; Britney Spears – Gimme More; Kanye West, Pusha T – Runaway'],
    ],
    translations: {
      sk: {
        client: 'Študentský projekt',
        role: 'KONCEPT, KAMERA, STRIH VIDEA',
        services: ['ART DIRECTING', 'KONCEPT', 'VIDEO'],
        description: '',
        credits: [
          ['Koncept, kamera, strih videa', 'Viktória Kubincová'],
          ['Hudba', 'Hujdy, Saul – Voľný pád; Britney Spears – Gimme More; Kanye West, Pusha T – Runaway'],
        ],
      },
    },
    image: '/projects/me-myself-and-others.jpg',
    video: '/projects/me-myself-and-others.mp4',
    poster: '/projects/me-myself-and-others-poster.jpg',
    videoSize: [852, 478],
  },
  {
    slug: 'in-my-melancholic-era',
    title: 'IN MY MELANCHOLIC ERA',
    group: 'art-directing',
    client: '—',
    year: '2023',
    category: 'ART DIRECTING',
    location: '—',
    role: 'VIDEO EDIT, ART DIRECTING, STYLING, OUTFITS DESIGN',
    services: ['ART DIRECTING', 'STYLING', 'OUTFITS DESIGN', 'VIDEO'],
    description: '',
    credits: [
      ['Camera', 'Daniel Rázus'],
      ['Video edit, art directing, styling, outfits design', 'Viktória Kubincová'],
      ['Sound', 'Saul – Premena'],
      ['Models', 'Radka Dzurčaninová, Karin Sasaraková, Alex Duleba, Sofia Valkovičová, Dávid Gajdoš, Alex Mellif, Jakub Mehaj, Viktória Kubincová'],
    ],
    translations: {
      sk: {
        role: 'STRIH VIDEA, ART DIRECTING, STYLING, NÁVRH OUTFITOV',
        services: ['ART DIRECTING', 'STYLING', 'NÁVRH OUTFITOV', 'VIDEO'],
        description: '',
        credits: [
          ['Kamera', 'Daniel Rázus'],
          ['Strih videa, art directing, styling, návrh outfitov', 'Viktória Kubincová'],
          ['Hudba', 'Saul – Premena'],
          ['Modelky a modeli', 'Radka Dzurčaninová, Karin Sasaraková, Alex Duleba, Sofia Valkovičová, Dávid Gajdoš, Alex Mellif, Jakub Mehaj, Viktória Kubincová'],
        ],
      },
    },
    image: '/projects/in-my-melancholic-era.jpg',
    video: '/projects/in-my-melancholic-era.mp4',
    poster: '/projects/in-my-melancholic-era-poster.jpg',
    videoSize: [960, 720],
  },
  {
    slug: 'slovakia-futura',
    title: 'SLOVAKIA FUTURA',
    group: 'art-directing',
    client: '—',
    year: '2026',
    category: 'ART DIRECTING',
    location: '—',
    role: 'PHOTOS, EDIT, STYLING',
    services: ['ART DIRECTING', 'PHOTOGRAPHY', 'STYLING'],
    description: '',
    credits: [
      ['Photos, edit, styling', 'Viktória Kubincová'],
      ['Model', 'Paulina Pojednicova'],
    ],
    translations: {
      sk: {
        role: 'FOTOGRAFIE, ÚPRAVA, STYLING',
        services: ['ART DIRECTING', 'FOTOGRAFIA', 'STYLING'],
        description: '',
        credits: [
          ['Fotografie, úprava, styling', 'Viktória Kubincová'],
          ['Modelka', 'Paulina Pojednicova'],
        ],
      },
    },
    image: '/projects/slovakia-futura/slovakia-futura-01.jpg',
    // [súbor, šírka, výška]; `medium` je 1000 px verzia (public/projects/slovakia-futura/1000)
    gallery: [
      ['slovakia-futura-01.jpg', 1902, 2000], ['slovakia-futura-02.jpg', 2000, 1795], ['slovakia-futura-03.jpg', 1558, 2000],
      ['slovakia-futura-04.jpg', 2000, 1506], ['slovakia-futura-05.jpg', 1453, 2000], ['slovakia-futura-06.jpg', 1500, 2000],
      ['slovakia-futura-07.jpg', 1624, 2000],
    ].map(([file, width, height]) => ({ src: `/projects/slovakia-futura/${file}`, medium: `/projects/slovakia-futura/1000/${file}`, width, height })),
  },
  {
    slug: 'styling-editorial',
    title: 'EDITORIAL',
    group: 'styling',
    client: '—',
    year: '2024',
    category: 'STYLING',
    location: '—',
    role: 'ART DIRECTING, STYLING, FASHION DESIGN, SET DESIGN',
    services: ['ART DIRECTING', 'STYLING', 'FASHION DESIGN', 'SET DESIGN'],
    description: 'Art directing, styling and outfits by Viktória Kubincová. Photography and production by Daniel Rázus.',
    credits: [
      ['Art directing, styling, outfits & fashion design', 'Viktória Kubincová'],
      ['Photography, production', 'Daniel Rázus'],
      ['Set design', 'Viktória Kubincová'],
      ['Assistance', 'Radka Dzurčaninová'],
    ],
    translations: {
      sk: {
        role: 'ART DIRECTING, STYLING, MÓDNY DIZAJN, SET DESIGN',
        services: ['ART DIRECTING', 'STYLING', 'MÓDNY DIZAJN', 'SET DESIGN'],
        description: 'Art directing, styling a outfity: Viktória Kubincová. Fotografia a produkcia: Daniel Rázus.',
        credits: [
          ['Art directing, styling, outfity a módny dizajn', 'Viktória Kubincová'],
          ['Fotografia, produkcia', 'Daniel Rázus'],
          ['Set design', 'Viktória Kubincová'],
          ['Asistencia', 'Radka Dzurčaninová'],
        ],
      },
    },
    image: '/projects/styling/styling-06.jpg',
    // [súbor, šírka, výška] – rozmery držia na detaile miesto pre fotku ešte pred načítaním.
    // `medium` je 1000 px verzia (public/projects/styling/1000) – menšie obrazovky si stiahnu ju namiesto originálu.
    gallery: [
      ['styling-01.jpg', 2000, 1335], ['styling-02.jpg', 1335, 2000], ['styling-03.jpg', 2000, 1335], ['styling-04.jpg', 1335, 2000],
      ['styling-05.jpg', 2000, 1335], ['styling-06.jpg', 2000, 1335], ['styling-07.jpg', 1335, 2000], ['styling-08.jpg', 1335, 2000],
    ].map(([file, width, height]) => ({ src: `/projects/styling/${file}`, medium: `/projects/styling/1000/${file}`, width, height })),
  },
]

// PLACEHOLDERY — len pre kategórie, ktoré ešte nemajú reálny projekt.
// Keď pridáš projekt do kategórie, placeholdery v nej automaticky zmiznú.
const PLACEHOLDERS_PER_CATEGORY = 3

const placeholders = projectCategories
  .filter((category) => !realProjects.some((p) => p.group === category.id))
  .flatMap((category) =>
    Array.from({ length: PLACEHOLDERS_PER_CATEGORY }, (_, i) => {
      const n = String(i + 1).padStart(2, '0')
      return {
        slug: `${category.id}-${n}`,
        placeholder: true,
        title: `Project ${n}`,
        group: category.id,
        client: 'Placeholder',
        year: '2026',
        category: category.label.en,
        location: '—',
        role: category.label.en,
        services: [category.label.en],
        description: 'Placeholder project. Content coming soon.',
        translations: {
          sk: {
            title: `Projekt ${n}`,
            category: category.label.sk,
            role: category.label.sk,
            services: [category.label.sk],
            description: 'Placeholder projekt. Obsah čoskoro.',
          },
        },
        image: null,
      }
    })
  )

// Zoradené podľa poradia kategórií
export const projects = projectCategories.flatMap((category) =>
  [...realProjects, ...placeholders].filter((p) => p.group === category.id)
)

// Krátky popis pod kartičkou – o aký projekt ide (osobný, študentský…) a rola. Placeholder = „pripravujeme“.
// `project` má byť už preložený cez localized(), `t` sú texty webu v danom jazyku.
export function projectCaption(project, t) {
  if (project.placeholder) return t.comingSoon
  return [project.client, project.role].filter((value) => value && value !== '—').join(' · ')
}
