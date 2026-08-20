# ADR-0005: Cloudflare Pages Production Hosting

- Status: Accepted for current MVP
- Date: 2026-08-20
- Owner: Technical lead

## Context

The ToolPilot MVP is a Next.js static export with no server runtime, database, API, or background worker. The user requested a Cloudflare production release using `toolpilot.cc`. The current Cloudflare account had no existing ToolPilot Pages project, so a dedicated Pages project was required.

## Decision

Deploy the generated `out/` directory to the Cloudflare Pages project `toolpilot` using Wrangler and serve it on the custom apex domain `toolpilot.cc`. Cloudflare manages the Pages deployment URL, custom-domain DNS record, and HTTPS certificate lifecycle. Production deploys must run only after the Node 22 quality gate and must be followed by public checks for the homepage, tools directory, representative detail page, `robots.txt`, and `sitemap.xml`.

The current release remains content-draft only. Cloudflare hosting does not make product facts, research claims, affiliate terms, or commission notes verified.

## Consequences

- Static assets are globally hosted without adding an application server or database.
- A Pages deployment can be replaced or rolled back from the Cloudflare dashboard; a rollback rehearsal is still pending.
- CI, monitoring, alerting, and automated rollback are not included in this decision and remain tracked in `TODO-004` and `TODO-302`.
- The custom apex domain is an external state change and must not be reassigned to another project without explicit review.

## Verification

- `npx --yes wrangler whoami` confirmed an authenticated account with Pages write access.
- `npx --yes wrangler pages project create toolpilot --production-branch main` created the dedicated project.
- `npx --yes wrangler pages deploy out --project-name toolpilot --branch main` uploaded 332 files.
- `https://toolpilot.cc/`, `/tools/`, `/tools/digitalocean/`, `/robots.txt`, and `/sitemap.xml` each returned HTTP 200; the production sitemap contains 50 tool URLs.
