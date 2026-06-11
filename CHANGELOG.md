# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-11

### Added

- **Bilingual UI** with English (default) and Chinese. A `Languages` icon
  in the header toggles language; the choice is also a first-class option
  in Settings and persists across sessions. `<html lang>` is kept in sync
  for accessibility tools.
- **Lightweight i18n layer** — `src/i18n/dict.ts` (typed dictionary)
  + `src/i18n/LangProvider.tsx` (`useT()` hook) — zero external
  dependencies. The same `t(key, vars?)` / `opt(key)` API is used in all
  pages and components.
- **Discipline bilingual fields** — every discipline in
  `src/data/disciplines.ts` now carries a `name` (CN) + `nameEn` (EN) and
  a `blurb` + `blurbEn`, swapped at runtime by the active language.

### Changed

- The summary line on `ResourceCard` is now built from a translated
  template (`{type} · {year} · {tags} tags` / `{type} · {year} · {tags} 个主题`).
- `ResourceCard` no longer always shows the summary — it is only rendered
  when `showSummary` is set, which matches the home page's "featured"
  row usage.

### Removed

- `src/data/filterOptions.ts` — types chips are now built inline in
  `ResourcesPage` with translated labels.
- `formatAuthorsFull`, `resourceSummary`, and `TYPE_LABELS_EN` from
  `src/utils/format.ts` — they were unused or replaced by i18n-aware
  equivalents.

## [1.0.1] - 2026-06-11

### Changed (visual & UX audit)

- Featured resources on the home page are now a horizontal scroll row
  (previously a 2-column grid that left a half-empty row), matching the
  "printed journal" feel.
- The hero search input border is now 1px (was 2px) for consistency with
  the rest of the site's 1px-hairline system.
- The home-page publication kicker and the bottom three-column intro use
  12px / 16px type respectively.
- The detail page action row is now exactly four equal buttons:
  `Download` / `View DOI` / `Copy Cite` / `Save`. The redundant `Source`
  button is gone; when `doi` is absent we fall back to `View Source` so
  the row stays symmetrical, and a small "Also: hostname" link is shown
  when both DOI and external URL exist.
- The redundant `border-t hairline` divider was removed from the detail
  page's abstract region.
- The settings page's "selected" indicator is now a 28×1.5px moss-green
  underline (previously a 4×20px vertical bar), per the 1.5px-underline
  spec.
- The favourite toggle on resource cards is now 32×32px to give a larger
  hit area; the matching remove button on the Favorites page was
  enlarged too.
- The footer copyright line was bumped from 10px to 12px for legibility.
- Discipline card numbering and spacing were tuned, with sizes that adapt
  to the breakpoint.
- The hero search box now shows a `/` kbd hint instead of "Enter".
- Discipline cards and the detail page's abstract/preview buttons expose
  `aria-expanded` / `aria-pressed` for screen readers.

## [1.0.0] - 2026-06-11

### Added

- 8 pages: Home, Resources list, Resource detail, Discipline, Search,
  Favorites, Settings, About.
- 8 seeded resources covering 6 disciplines and 4 resource types.
- 2-line abstract preview, tags, and download / jump actions on every
  resource card.
- Detail page with collapsible full abstract, four citation formats
  (APA / MLA / GB/T 7714 / BibTeX) with one-click copy, and related
  resources.
- Theme (light / dark / auto), motion (full / reduced / off), and font
  size (standard / large) preference groups, persisted in LocalStorage.
- Favorites page with JSON export and clear-all.
- GitHub Actions: CI (lint + build) and Deploy to GitHub Pages.
