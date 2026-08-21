# Vikindela — React + Tailwind

Vite + React + Tailwind CSS verzia portfólia.

## Spustenie

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Kde meniť obsah

- `src/data/projects.js` — projekty, kategórie, texty projektov, obrázky
- `src/data/siteContent.js` — SK/EN texty, email, telefón, Instagram

## Routes

- `/` — Globe / List
- `/all` — všetky projekty podľa kategórií
- `/contact` — kontakt
- `/work/:slug` — detail projektu

Pri deployi SPA na hostingu nastav rewrite všetkých neznámych ciest na `/index.html`.
