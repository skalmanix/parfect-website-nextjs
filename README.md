# Parfect Website

Marketing site for [Parfect](https://github.com/skalmanix/Parfect) — the private couples app for intimate chat, shared fantasies, and turning dreams into real date nights.

**Live site:** [parfect.app](https://parfect.app)

## Overview

This is a fast, SEO-optimized Next.js landing page designed to drive App Store and Play Store downloads. The design mirrors the mobile app's warm, intimate aesthetic so visitors feel the connection before they install.

Built with:

- **Next.js 16** (App Router, static generation)
- **React 19**
- **Tailwind CSS 4**
- **OpenNext Cloudflare** adapter for deployment on Cloudflare Workers

## Features

- Couples-focused landing page with hero, app preview, three pillars, and CTA sections
- Brand assets and copy sourced from the Parfect app repo
- Official App Store and Google Play download badges
- SEO: metadata, Open Graph, JSON-LD schema, sitemap, robots.txt, web manifest
- Fully responsive layout for mobile, tablet, and desktop
- Minimal client JavaScript for fast load times

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
git clone https://github.com/skalmanix/parfect-website-nextjs.git
cd parfect-website-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js will use another port if 3000 is taken).

### Environment variables

Create a `.env.local` file for production URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://parfect.app
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/idYOUR_APP_ID
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.app.parfect
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO and sitemap |
| `NEXT_PUBLIC_APP_STORE_URL` | Apple App Store listing URL |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Google Play listing URL |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |
| `npm run check` | Build and type-check |
| `npm run preview` | Preview Cloudflare build locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

## Project Structure

```
src/
  app/              # Next.js routes, layout, global styles, SEO files
  components/       # Landing page sections (hero, pillars, CTA, etc.)
  lib/              # Constants and JSON-LD schema helpers
public/
  images/           # App screenshots, logo, and store badges
```

## Deployment

The site deploys to Cloudflare Workers via OpenNext (not as a static Pages export):

```bash
npm run deploy
```

### Cloudflare Workers Builds settings

If deploying from the Cloudflare dashboard (Git-connected), use:

| Field | Value |
|---|---|
| Build command | `npm run bundle-messages && npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Non-production deploy | `npx opennextjs-cloudflare upload` |

Do **not** set an output directory like `.next` or `out`.

`wrangler.jsonc` must include the `IMAGES` and `WORKER_SELF_REFERENCE` bindings — without `IMAGES`, every `/_next/image` request throws Worker errors.

### Caching (Error 1102)

The site is fully static (SSG). `open-next.config.ts` uses the **Workers Static Assets incremental cache** with **cache interception** so prerendered HTML is served from the edge without booting the Next.js server on every request. The deploy step automatically copies build-time cache entries into static assets.

If you still see intermittent `Worker exceeded resource limits` errors, upgrade to **Workers Paid** for higher CPU limits (10 ms free → 30 s paid).

Configure your domain in the Cloudflare dashboard to point to the Worker.

## Related

- **Mobile app:** [github.com/skalmanix/Parfect](https://github.com/skalmanix/Parfect)
- **API:** [api.parfect.app](https://api.parfect.app)
- **Privacy:** [api.parfect.app/privacy](https://api.parfect.app/privacy)

## License

Private project. All rights reserved.
