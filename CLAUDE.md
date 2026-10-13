# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite, http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

No test or lint scripts are configured.

## Architecture Overview

This is a single-page React application (SPA) for SUDIPTA WEB SOLUTIONS PVT LTD — a professional services marketing website with an admin lead management dashboard.

### Routing

Routes are defined in `src/main.tsx` (BrowserRouter) and `src/App.tsx` (route declarations + SEO logic):

- `/` → `HomePage`
- `/services` → `ServicesPage`
- `/services/:slug` → `ServiceDetailsPage` (dynamic, driven by `src/data/services.ts`)
- `/about` → `AboutPage`
- `/reviews` → `ReviewsPage`
- `/contact` → `ContactPage`
- `/admin` → `AdminPage` (protected — email/password login, session token in sessionStorage)
- `*` → redirect to `/`

### SEO System (`src/lib/seo.ts`)

Every route injects dynamic metadata via `getSeoMeta()` in `App.tsx`. The `seo.ts` module manages:
- `<title>`, meta description, keywords
- Open Graph and Twitter Card tags
- JSON-LD structured data (Organization, WebSite, WebPage, Service, ContactPage schemas)
- Canonical URLs and robots tags

When adding a new route, add its SEO entry to the `getSeoMeta()` function in `App.tsx`.

### API Client (`src/lib/api.ts`)

Thin fetch wrapper with two methods:
- `apiPost(path, payload, token?)` — POST with optional Bearer token
- `apiGet(path, token?)` — GET with optional Bearer token

Base URL resolves to:
- Production: `https://api.sudiptawebsolutions.in/api`
- Development: `http://127.0.0.1:8080/api` (or `VITE_API_BASE_URL` env var)

Admin endpoints also send an `X-Admin-Key` header.

### Data Layer (`src/data/services.ts`)

Single source of truth for the 8 service offerings. Each `ServiceItem` has `slug`, `title`, `desc`, `longDesc`, `highlights[]`, `tools[]`, `icon`, and `color`. The slug drives the `/services/:slug` route.

### State Management

No external state library — pure React hooks (`useState`) per component. Admin auth token is persisted in `sessionStorage`.

### Styling

TailwindCSS v4 configured via `@tailwindcss/vite` plugin (no `tailwind.config.ts`). Theme variables are defined in `src/index.css` using the `@theme` directive:

- `--color-primary`: teal (`#0d9488`)
- `--color-accent`: orange (`#f97316`)
- `--color-dark` / `--color-dark-light` / `--color-dark-card` / `--color-dark-border`: dark blue palette

Custom utility classes (`.glass`, `.gradient-text`, `.btn-primary`, `.btn-secondary`, `.card-hover`, etc.) are also defined in `src/index.css`.

### Path Alias

`@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

### Notable Components

- `LightPillar.tsx` — Three.js WebGL 3D effect with custom ShaderMaterial
- `ScrollStack.tsx` — Custom scroll-driven stacking animation
- `AdminPage.tsx` — Full admin dashboard: login, paginated leads table, auto-logout on 401

### Build Note

`vite-plugin-singlefile` is installed and can bundle everything into a single HTML file. Check `vite.config.ts` to see if it's currently active.

## Agent skills

### Issue tracker

Issues and specs live in GitHub Issues; use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo; see `docs/agents/domain.md` for glossary and ADR guidance.
