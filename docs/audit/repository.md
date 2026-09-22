# Audit — Festive Occasions

## Repository audit (2026-09-22)

- **Framework:** Next.js 16.3.5 (App Router), React 19.2.8, TypeScript 5
- **Styling:** Tailwind CSS v4 (@tailwindcss/postcss)
- **State:** Single commit "Initial commit from Create Next App" — clean scaffold
- **Existing code:** Only default create-next-app template (`app/page.tsx`, `layout.tsx`, `globals.css`)
- **No existing assets of value** (public/ has only default SVGs)
- **Branch:** `feature/premium-christmas-revamp` created

## Live site audit

- No live production site detected in repo (no vercel config, no custom domain configured).
- Pending: crawl current routes (none beyond `/`), create `docs/seo/url-map.md` before any renames.

## Assets audit

- `public/`: next.svg, vercel.svg, file.svg, globe.svg, window.svg — starter SVGs, no business value.
- **No client images provided yet.** Placeholder system required (locally-generated, premium, clearly replaceable). NO downloads.

## Technical SEO audit (to implement)

- sitemap.xml (generated via `app/sitemap.ts`)
- robots.txt (via `app/robots.ts`)
- Canonical URLs (native metadata)
- Clean URLs, semantic HTML, heading hierarchy, alt text, crawlable links
- 404 page (premium branded)
- OpenGraph + Twitter metadata
- Structured data (JSON-LD: LocalBusiness/Organization, Service, BreadcrumbList, WebSite) — only accurate info

## Dependencies

Installed: `gsap`, `@gsap/react`, `lenis`, `react-icons`.
No vulnerabilities (npm audit clean).