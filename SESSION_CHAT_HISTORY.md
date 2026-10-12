# Session Chat History

## Session Summary
This file records the major requests and implemented changes from the current development session for `sudiptawebsolutions`.

## Timeline
1. Created contributor guide: `AGENTS.md` titled **Repository Guidelines**.
2. Ran frontend dev server with host mode (`npm run dev -- --host`).
3. Renamed project package to `sudiptawebsolutions` in `package.json` and `package-lock.json`.
4. Replaced branding text `SUDIPTAINFOTECH` with `sudiptawebsolutions` in navbar/footer.
5. Added SEO improvements:
   - Dynamic route-based SEO meta handling in `src/lib/seo.ts` and `src/App.tsx`
   - Updated `index.html` meta tags
   - Added `public/robots.txt`, `public/sitemap.xml`, and `public/og-image.svg`
6. Updated UI wording from “Demo Appointment” to “Book Appointment” across components/pages.
7. Added legal SEO entity name: `SUDIPTA WEB SOLUTIONS PVT LTD`.
8. Built PHP backend in `backend/`:
   - Endpoints: `/api/health`, `/api/project-queries`, `/api/appointments`, `/api/subscribers`
   - SQL schema and DB tables added
   - Frontend forms wired to backend API
9. Added Swagger docs:
   - `backend/public/docs/index.html`
   - `backend/public/docs/openapi.yaml`
   - Fixed `/docs` and OpenAPI path resolution.
10. Added protected admin data endpoint:
    - `GET /api/project-queries` with `ADMIN_API_KEY`
    - Project query email notification support.
11. Migrated email sending from PHP `mail()` to SMTP with configurable `.env` values.
12. Added React admin panel:
    - Route: `/admin`
    - Password login (uses backend admin key)
    - Leads table with pagination and refresh.
13. Added `admins` table in MySQL schema (`email`, `password`) and applied migration.

## Notes
- SMTP currently requires valid `SMTP_PASSWORD` (Gmail app password) in `backend/.env`.
- Backend and frontend were both started and tested during the session.
