// 4 kategórie webu. Poradie = poradie pásov na guli (zhora nadol) aj sekcií na stránke ALL.
// `tone` je odtieň šedej pre placeholdery danej kategórie.
export const projectCategories = [
  { id: 'art-directing', label: { en: 'ART DIRECTING', sk: 'ART DIRECTING' }, tone: '#e6e6e2' },
  { id: 'styling', label: { en: 'STYLING', sk: 'STYLING' }, tone: '#d9d9d4' },
  { id: 'fashion-design', label: { en: 'FASHION DESIGN', sk: 'MÓDNY DIZAJN' }, tone: '#cbcbc5' },
  { id: 'social-media', label: { en: 'SOCIAL MEDIA', sk: 'SOCIÁLNE SIETE' }, tone: '#bdbdb6' },
]

export const categoryById = Object.fromEntries(projectCategories.map((c) => [c.id, c]))

// ─────────────────────────────────────────────────────────────────────────────
// REÁLNE PROJEKTY
// Polia projektu:
//   image   – náhľad (globus, zoznam, ALL). Pri videu je to obrázok z videa.
//   video   – (voliteľné) .mp4 v /public, zobrazí sa na detaile projektu
//   gallery – (voliteľné) zoznam fotiek na detaile projektu
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
    role: 'ART DIRECTOR',
    services: ['ART DIRECTING', 'VIDEO'],
    description: '',
    translations: {
      sk: { description: '' },
    },
    image: '/projects/who-am-i-to-love-you.jpg',
    video: '/projects/who-am-i-to-love-you.mp4',
  },
  {
    slug: 'me-myself-and-others',
    title: 'ME, MYSELF AND OTHERS',
    group: 'art-directing',
    client: 'Personal project',
    year: '2025',
    category: 'ART DIRECTING',
    location: '—',
    role: 'ART DIRECTOR',
    services: ['ART DIRECTING', 'VIDEO'],
    description: '',
    translations: {
      sk: { client: 'Osobný projekt', description: '' },
    },
    image: '/projects/me-myself-and-others.jpg',
    video: '/projects/me-myself-and-others.mp4',
  },
  {
    slug: 'in-my-melancholic-era',
    title: 'IN MY MELANCHOLIC ERA',
    group: 'art-directing',
    client: 'Student project',
    year: '2023',
    category: 'ART DIRECTING',
    location: '—',
    role: 'ART DIRECTOR',
    services: ['ART DIRECTING', 'VIDEO'],
    description: '',
    translations: {
      sk: { client: 'Študentský projekt', description: '' },
    },
    image: '/projects/in-my-melancholic-era.jpg',
    video: '/projects/in-my-melancholic-era.mp4',
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
    gallery: Array.from({ length: 8 }, (_, i) => `/projects/styling/styling-${String(i + 1).padStart(2, '0')}.jpg`),
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
