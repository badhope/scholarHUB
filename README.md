# ScholarHUB

> An open shelf of papers, books, and datasets.
>
> A community-curated index of open academic resources, organised by discipline and topic.

## Overview

ScholarHUB aggregates freely-downloadable papers, textbooks, and public datasets
scattered across preprint servers, publishers, and open data platforms. No
backend, no login, no paywall — the site is a static SPA hosted on GitHub
Pages, and the catalogue is plain data files in the repository.

## Features

- **8 pages** — Home, Resources list, Resource detail, Discipline, Search,
  Favorites, Settings, About.
- **6 disciplines** and **4 resource types** (papers, books, datasets,
  tutorials), with seeded data you can browse end-to-end.
- **Bilingual UI** — English by default with a one-click toggle to Chinese.
- **Per-resource citations** in APA, MLA, GB/T 7714, and BibTeX with
  one-click clipboard copy.
- **Local-first favorites** — saved in `localStorage`, exportable as JSON.
- **Three setting groups** — Theme (light / dark / auto), Font size
  (standard / large), Motion (full / reduced / off), plus the language
  toggle. All persist across sessions.
- **Accessibility** — keyboard focus rings, `aria-expanded` / `aria-pressed`
  on disclosure controls, `aria-label` on icon buttons, and `<html lang>`
  synced to the active language.

## Tech stack

- React 18 + TypeScript + Vite 7
- Tailwind CSS 3 with a custom serif theme (ink-black / paper-white /
  moss / ochre palette)
- React Router 6 (HashRouter, GitHub-Pages-friendly)
- Zustand with `persist` middleware for settings & favorites
- lucide-react icons
- A tiny, dependency-free i18n layer (Context + typed dictionary + `useT()`)

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:5173/scholarHUB/>.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds the project and publishes to GitHub Pages.

## Data maintenance

Resources are TypeScript files in `src/data/`. To add a new entry, edit
`src/data/resources.ts` following the existing shape; bilingual strings
live in `src/i18n/dict.ts`.

## License

This project is released under the MIT License. The resource metadata is
licensed under CC BY 4.0; the underlying resources remain under their
original licenses — see each detail page for attribution.
