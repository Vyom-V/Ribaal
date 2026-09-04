# Rybel Editorial Storefront

A self-contained, share-ready Next.js implementation of the Rybel luxury sherwani homepage.

## Included

- Sticky Rybel header with expanding search, login preview and collapsible navigation curtain.
- Editorial hero, featured collection, craft story, four collection categories and patterned footer.
- Lenis smooth scrolling synchronized with GSAP ScrollTrigger.
- Responsive desktop/mobile layouts and a reduced-motion fallback.
- Eight original runtime assets in public/rybel.
- Static production export support.

## Run locally

Requires Node.js 22.13 or newer.

    npm install
    npm run dev

Open http://localhost:3000/.

## Verify

    npm run verify

This runs ESLint, the bundle tests and a production build.

## Share or deploy

After npm run build, the deploy-ready static website is written to the out folder. Upload the contents of out to any static web host, or share this source folder so another developer can run npm install.

The source ZIP intentionally excludes node_modules and Next.js build caches. The checked-in package-lock.json preserves exact dependency versions.

## Project map

- app/page.tsx — page metadata and entry point.
- app/RybelHome.tsx — sections, interactions and scroll-animation lifecycle.
- app/rybel.module.css — the complete isolated design system.
- public/rybel — photography, collection sprite and repeatable SVG patterns.
- tests/bundle.test.mjs — source, dependency and asset-integrity checks.

## Integration boundaries

Search feedback and account login are frontend previews. Replace the rybel.example metadata/contact values and connect real catalog, authentication and destination routes before production use.
