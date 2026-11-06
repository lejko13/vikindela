export const siteContent = {
  en: {
    introLine1: 'FASHION DESIGNER',
    introLine2: 'AND CREATIVE DIRECTOR',
    menu: 'MENU', close: 'CLOSE', home: 'HOME', all: 'ALL', about: 'ABOUT', contact: 'CONTACT',
    globe: 'GLOBE', list: 'LIST', selectedWork: 'SELECTED WORK', allProjects: 'ALL PROJECTS',
    contactTitle: 'GET IN TOUCH', messageLabel: 'MESSAGE', messagePlaceholder: 'WRITE YOUR MESSAGE…',
    sendMessage: 'SEND', instagramLabel: 'INSTAGRAM', emailLabel: 'EMAIL',
    nextProject: 'NEXT PROJECT', client: 'CLIENT', year: 'YEAR', type: 'TYPE', role: 'ROLE', location: 'LOCATION',
    detail: 'DETAIL', campaign: 'CAMPAIGN', loading: 'LOADING', clickHere: 'CLICK HERE', cookiesTitle: 'COOKIES',
    cookiesText: 'We use necessary cookies to remember your language and site preferences. Optional cookies can be enabled later.',
    cookiesAccept: 'ACCEPT ALL', cookiesNecessary: 'NECESSARY ONLY', projects: 'PROJECTS', comingSoon: 'COMING SOON',
  },
  sk: {
    introLine1: 'MÓDNY DIZAJNÉR', introLine2: 'A KREATÍVNY RIADITEĽ', menu: 'MENU', close: 'ZAVRIEŤ',
    home: 'DOMOV', all: 'VŠETKO', about: 'O MNE', contact: 'KONTAKT', globe: 'GLOBUS', list: 'ZOZNAM',
    selectedWork: 'VYBRANÉ PRÁCE', allProjects: 'VŠETKY PROJEKTY', contactTitle: 'NAPÍŠ MI',
    messageLabel: 'SPRÁVA', messagePlaceholder: 'NAPÍŠ SPRÁVU…', sendMessage: 'ODOSLAŤ',
    instagramLabel: 'INSTAGRAM', emailLabel: 'EMAIL', nextProject: 'ĎALŠÍ PROJEKT', client: 'KLIENT', year: 'ROK',
    type: 'TYP', role: 'ROLA', location: 'LOKALITA', detail: 'DETAIL', campaign: 'KAMPAŇ', loading: 'NAČÍTAVANIE', clickHere: 'KLIKNI SEM',
    cookiesTitle: 'COOKIES', cookiesText: 'Používame nevyhnutné cookies na zapamätanie jazyka a nastavení webu. Voliteľné cookies môžeš povoliť neskôr.',
    cookiesAccept: 'PRIJAŤ VŠETKO', cookiesNecessary: 'LEN NEVYHNUTNÉ', projects: 'PROJEKTY', comingSoon: 'PRIPRAVUJEME',
  },
}

export const contactData = {
  // Zobrazuje sa na stránke kontakt a na tento e-mail chodí aj správa z formulára
  email: 'viky.kubincova@gmail.com',
  instagramLabel: '@vikindela_',
  instagramHref: 'https://www.instagram.com/vikindela_/',
}

// Stránka O MNE (/about). Texty prepíš tu – v oboch jazykoch.
// `photo` – portrét (napr. '/about-portrait.jpg' v /public); kým je null, ukáže sa šedý rámik.
// `sections` – bloky pod textom (štúdium, skúsenosti…); každý má nadpis a riadky. Blok môžeš pridať aj zmazať.
export const aboutData = {
  photo: '/about-portrait.jpg',
  en: {
    name: 'VIKTÓRIA KUBINCOVÁ',
    bio: 'A SHORT TEXT ABOUT ME IS COMING SOON – WHO I AM, WHAT I DO AND WHAT DRIVES MY WORK.',
    focusLabel: 'FOCUS',
    sections: [
      { label: 'EDUCATION', lines: ['SCHOOL — FIELD OF STUDY', 'YEAR – YEAR'] },
      { label: 'EXPERIENCE', lines: ['PROJECT / CLIENT — ROLE', 'YEAR'] },
      { label: 'BASED IN', lines: ['CITY, COUNTRY'] },
    ],
  },
  sk: {
    name: 'VIKTÓRIA KUBINCOVÁ',
    bio: 'KRÁTKY TEXT O MNE PRIPRAVUJEM – KTO SOM, ČO ROBÍM A ČO MA PRI PRÁCI ŽENIE DOPREDU.',
    focusLabel: 'ZAMERANIE',
    sections: [
      { label: 'ŠTÚDIUM', lines: ['ŠKOLA — ODBOR', 'ROK – ROK'] },
      { label: 'SKÚSENOSTI', lines: ['PROJEKT / KLIENT — ROLA', 'ROK'] },
      { label: 'ŽIJEM V', lines: ['MESTO, KRAJINA'] },
    ],
  },
}
