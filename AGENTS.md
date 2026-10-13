# AGENTS.md

## Commands
```bash
npm run dev       # Vite dev server → http://localhost:5173
npm run build     # Production → dist/index.html (single file)
npm run preview   # Serve dist/ locally
npx tsc --noEmit  # TypeScript check (no lint/test scripts)
```

## Build Gotcha
`vite-plugin-singlefile` bundles everything into ONE `dist/index.html`. You never deploy individual JS/CSS files — only the HTML. Build output is always a single 1MB+ file.

## Stack
- Vite 7 + React 19 + TypeScript + TailwindCSS v4
- React Router DOM v7 (BrowserRouter in `src/main.tsx`)
- shadcn + @base-ui/react primitives (not Radix)
- Lucide React + React Icons for icons
- Lenis for smooth scroll, Three.js for 3D effects

## Tailwind v4 Quirks
- **No `tailwind.config.*` file.** All theme vars are in `src/index.css` via `@theme { ... }`.
- Custom classes (`.glass`, `.surface`, `.card-hover`, `.btn-primary`, `.btn-secondary`, `.section-kicker`, `.section-title`, `.section-description`, `.gradient-text`) are defined in `src/index.css` — use these before writing raw Tailwind.
- `cn()` from `@/lib/utils` merges classes with tailwind-merge.

## Routing — Where To Change Things
- **Routes**: `src/App.tsx` → `<Routes>` block. Pages live in `src/pages/`.
- **SEO**: `src/App.tsx` → `getSeoMeta()` function. Every route needs an entry here. The `applySeo()` call in the `useEffect` injects `<title>`, meta/OG tags, and JSON-LD.
- **Add a route**: import page → add to `getSeoMeta()` → add `<Route>`.
- **`@/` alias** maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).

## Current Routes
| Path | Page | Notes |
|---|---|---|
| `/` | `HomePage` | Hero, services grid, process, testimonials |
| `/services` | `ServicesPage` | All 8 services |
| `/services/:slug` | `ServiceDetailsPage` | Dynamic — slug must match `src/data/services.ts` |
| `/about` | `AboutPage` | |
| `/reviews` | `ReviewsPage` | |
| `/contact` | `ContactPage` | |
| `/computer-academy` | `ComputerAcademyPage` | Feature cards, hero, tabbed program grids |
| `/computer-academy/free-counselling` | `HigherStudyCounsellingPage` | Higher-study counselling form |
| `/computer-academy/register-teacher` | `RegisterTeacherPage` | Teacher registration form |
| `/admin` | `AdminPage` | Protected — session token in sessionStorage |
| `*` | → `/` | Catch-all redirect |

## Data Sources
- **Services catalog**: `src/data/services.ts` — array of `ServiceItem`. The `slug` field drives `/services/:slug`. When adding a service, update this file, the SEO block in `App.tsx`, and `services.ts`.

## API Client
`src/lib/api.ts` — thin fetch wrapper (`apiPost`, `apiGet`). Base URL resolves from `VITE_API_BASE_URL` env, falling back to `http://127.0.0.1:8080/api` (dev) or `https://api.sudiptawebsolutions.in/api` (prod). Admin endpoints send `X-Admin-Key` header.

## Backend (`backend/`)
PHP 8.4 + MySQL API. Entrypoint: `backend/public/index.php`. Full setup in `backend/README.md`.
- `laravel-backend/` is stale — ignore.

## Color Palette (Tailwind @theme)
- `--color-primary`: `#0d9488` (teal)
- `--color-primary-light`: `#14b8a6`
- `--color-accent`: `#f97316` (orange)
- `--color-dark`: `#05080d`
- `--color-dark-light`: `#0b1320`
- `--color-dark-card`: `#111c2d`
- `--color-dark-border`: `#1f3049`

## Verification Before Deploy
1. `npm run build` — must produce `dist/index.html`
2. `npx tsc --noEmit` — catch type errors (pre-existing: `three` and `ImportMeta.env` need `@types/three` and `vite/client` types — not blockers)
3. Manual smoke: `/computer-academy`, `/computer-academy/register-teacher`
