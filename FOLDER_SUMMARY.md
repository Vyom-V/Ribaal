# Rybel Share Package

Standalone source bundle for the Rybel luxury sherwani homepage, assembled on 2026-09-04 from D:\v\FL.

## Boundary

- Includes only the root Rybel experience, its exact runtime imagery/patterns, minimal Next.js configuration, locked dependencies, documentation and portable tests.
- Excludes node_modules, legacy Shop From Bharat routes/components, Vinext/Cloudflare worker infrastructure, databases, prior screenshots and temporary build artifacts.
- The production configuration uses Next.js static export and writes the deployable site to out.

## Validation

- `npm run lint` passed with no findings.
- `npm test` passed all 3/3 portable source, dependency and asset-integrity contracts.
- Standard Next.js 16.2.6 production compilation, TypeScript validation and four-page static generation passed; the deploy-ready output is retained in `out`, while the generated `.next` cache was moved outside this share folder.
- Static HTTP smoke checks returned 200 for the homepage, Rybel icon and hero asset. Live browser checks at 1440x900 and 390x844 confirmed correct composition, zero horizontal overflow, complete lazy image loading, working search feedback, Escape focus restoration, modal scroll locking and no console warnings/errors.
- The build warning about multiple lockfiles is specific to validating this package while it is nested under `D:\v\FL`; it will not apply when this folder is copied out and installed as its own project.
