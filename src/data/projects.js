export const projectCategories = [
  { id: 'fashion', label: { en: 'FASHION', sk: 'MÓDA' } },
  { id: 'editorial', label: { en: 'EDITORIAL', sk: 'EDITORIAL' } },
  { id: 'objects', label: { en: 'OBJECTS', sk: 'OBJEKTY' } },
  { id: 'spaces', label: { en: 'SPACES', sk: 'PRIESTORY' } },
]

export const projects = [
  {
    slug: 'motion-theory', title: 'Motion Theory', group: 'fashion', client: 'Montek', year: '2026', category: 'Campaign', location: 'London',
    role: 'Photography / Creative Direction', services: ['Creative Direction', 'Photography', 'Art Direction'],
    description: 'A product launch campaign combining bold compositions with motion-first storytelling.',
    translations: {
      sk: {"description": "Kampaň k uvedeniu produktu spájajúca výrazné kompozície s vizuálnym príbehom založeným na pohybe.", "category": "Kampaň", "location": "Londýn", "role": "Fotografia / Kreatívne vedenie", "services": ["Kreatívne vedenie", "Fotografia", "Art direction"]}
    },
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'black-form', title: 'Black Form', group: 'fashion', client: 'Editorial', year: '2026', category: 'Still Life', location: 'Studio',
    role: 'Photography', services: ['Photography', 'Lighting', 'Retouch'],
    description: 'A dark product study focused on shape, surface and controlled light.',
    translations: {
      sk: {"description": "Tmavá produktová štúdia zameraná na tvar, povrch a kontrolované svetlo.", "category": "Zátišie", "location": "Ateliér", "role": "Fotografia", "services": ["Fotografia", "Svetlo", "Retuš"]}
    },
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'soft-objects', title: 'Soft Objects', group: 'objects', client: 'Personal', year: '2026', category: 'Objects', location: 'New York',
    role: 'Creative Direction / Photography', services: ['Concept', 'Photography', 'Set Design'],
    description: 'A tactile still-life series built around soft forms and graphic compositions.',
    translations: {
      sk: {"description": "Taktilná séria zátiší postavená na mäkkých formách a grafických kompozíciách.", "category": "Objekty", "location": "New York", "role": "Kreatívne vedenie / Fotografia", "services": ["Koncept", "Fotografia", "Scénografia"]}
    },
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'red-line', title: 'Red Line', group: 'objects', client: 'Studio', year: '2026', category: 'Material Study', location: 'Paris',
    role: 'Photography', services: ['Photography', 'Set Design'],
    description: 'A vivid material experiment centered around a single recurring red form.',
    translations: {
      sk: {"description": "Výrazný materiálový experiment postavený okolo jedného opakujúceho sa červeného prvku.", "category": "Materiálová štúdia", "location": "Paríž", "role": "Fotografia", "services": ["Fotografia", "Scénografia"]}
    },
    image: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'green-room', title: 'Green Room', group: 'spaces', client: 'Architecture', year: '2025', category: 'Architecture', location: 'Berlin',
    role: 'Photography / Art Direction', services: ['Photography', 'Art Direction'],
    description: 'An architectural color study using monochromatic space and angular objects.',
    translations: {
      sk: {"description": "Architektonická farebná štúdia využívajúca monochromatický priestor a hranaté objekty.", "category": "Architektúra", "location": "Berlín", "role": "Fotografia / Art direction", "services": ["Fotografia", "Art direction"]}
    },
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'object-study', title: 'Object Study', group: 'objects', client: 'Personal', year: '2025', category: 'Still Life', location: 'Studio',
    role: 'Photography', services: ['Photography', 'Styling'],
    description: 'A minimal still-life series exploring proportion, balance and texture.',
    translations: {
      sk: {"description": "Minimalistická séria zátiší skúmajúca proporcie, rovnováhu a textúru.", "category": "Zátišie", "location": "Ateliér", "role": "Fotografia", "services": ["Fotografia", "Styling"]}
    },
    image: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'portrait-one', title: 'Portrait No. 01', group: 'editorial', client: 'Editorial', year: '2025', category: 'Portrait', location: 'London',
    role: 'Photography', services: ['Photography', 'Direction'],
    description: 'Portrait imagery with a restrained palette and close attention to form.',
    translations: {
      sk: {"description": "Portrétna séria s tlmenou paletou a dôrazom na formu.", "category": "Portrét", "location": "Londýn", "role": "Fotografia", "services": ["Fotografia", "Réžia"]}
    },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'structure', title: 'Structure', group: 'spaces', client: 'Studio', year: '2025', category: 'Architecture', location: 'Copenhagen',
    role: 'Photography', services: ['Photography', 'Retouch'],
    description: 'Graphic architectural photography reduced to rhythm, geometry and light.',
    translations: {
      sk: {"description": "Grafická architektonická fotografia redukovaná na rytmus, geometriu a svetlo.", "category": "Architektúra", "location": "Kodaň", "role": "Fotografia", "services": ["Fotografia", "Retuš"]}
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'material', title: 'Material', group: 'fashion', client: 'Research', year: '2025', category: 'Research', location: 'Studio',
    role: 'Creative Direction / Photography', services: ['Research', 'Photography', 'Set Design'],
    description: 'A material-led image series exploring texture and simple constructed scenes.',
    translations: {
      sk: {"description": "Obrazová séria vedená materiálom, skúmajúca textúru a jednoduché konštruované scény.", "category": "Výskum", "location": "Ateliér", "role": "Kreatívne vedenie / Fotografia", "services": ["Výskum", "Fotografia", "Scénografia"]}
    },
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'detail', title: 'Detail', group: 'editorial', client: 'Editorial', year: '2024', category: 'Editorial', location: 'Milan',
    role: 'Photography', services: ['Photography', 'Retouch'],
    description: 'Close-up object photography focused on subtle changes in light and surface.',
    translations: {
      sk: {"description": "Detailná objektová fotografia zameraná na jemné zmeny svetla a povrchu.", "category": "Editorial", "location": "Miláno", "role": "Fotografia", "services": ["Fotografia", "Retuš"]}
    },
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'workspace', title: 'Workspace', group: 'spaces', client: 'Architecture', year: '2024', category: 'Architecture', location: 'London',
    role: 'Photography', services: ['Photography', 'Art Direction'],
    description: 'A clean workplace story balancing human scale with spatial composition.',
    translations: {
      sk: {"description": "Čistý príbeh pracovného priestoru balansujúci ľudskú mierku a priestorovú kompozíciu.", "category": "Architektúra", "location": "Londýn", "role": "Fotografia", "services": ["Fotografia", "Art direction"]}
    },
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88',
  },
  {
    slug: 'portrait-two', title: 'Portrait No. 02', group: 'editorial', client: 'Editorial', year: '2024', category: 'Portrait', location: 'Paris',
    role: 'Photography', services: ['Photography', 'Direction'],
    description: 'A second portrait study built around direct framing and quiet color.',
    translations: {
      sk: {"description": "Druhá portrétna štúdia postavená na priamom rámovaní a pokojnej farebnosti.", "category": "Portrét", "location": "Paríž", "role": "Fotografia", "services": ["Fotografia", "Réžia"]}
    },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=88',
  },
]
