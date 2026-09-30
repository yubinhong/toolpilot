# ADR-0011: Demand-Driven Eight-Page V1

- Status: Accepted
- Date: 2026-09-30
- Replaces product scope in ADR-0009 where it assumes developer-tool content routes remain active. ADR-0009 remains historical implementation evidence for the removed content system.

## Context

The product owner has replaced the developer-tool discovery product with an AI model pricing, cost calculator, and comparison platform. The user explicitly capped V1 at eight public pages and limited model detail pages to `/models/jev/`. The repository has an accepted Next.js static-export and Cloudflare Pages architecture, a single shared source-of-truth requirement for prices, and a strict prohibition on fabricated or unsourced facts.

## Decision

- Retain Next.js static export and Cloudflare Pages; do not add a server, database, model provider API, or runtime web scraper.
- Store validated model records as static structured data in `content/models.json`.
- Derive model search, pricing, cost calculations, comparison, and the Jev page from the same records.
- Keep page creation separate from model data. `lib/routes` explicitly lists the eight V1 URLs; model records never register routes automatically.
- Only `/models/jev/` has a model detail page in V1.
- Retain `/pricing/` and `/compare/` while replacing their old content. Remove other legacy product routes/data. Unknown routes resolve to a real 404; two exact Pages Functions intercept the static host's `/404` and `/404.html` error-document aliases. No blanket redirects are created.
- Generate canonical metadata and sitemap from the explicit route allowlist. Index no URL outside the allowlist.
- Support GSC verification metadata and optional GA4 events via build-time environment values. Do not load GA4 when no valid ID is configured, and never send calculator quantities or free-text queries.
- Keep AdSense runtime, Affiliate relationships, accounts, and model-provider API integrations out of V1. Cloudflare Pages Web Analytics remains a separate Dashboard privacy decision.

## Consequences

- Adding or changing model data requires a reviewed source update and a static rebuild/deployment.
- A model can appear in discovery and tools without having an SEO landing page.
- Provider pricing variants must be represented explicitly; calculator assumptions must be visible.
- The 8-page limit is easy to verify mechanically through route-registry, sitemap, generated-file, and HTTP smoke checks.
- Any new SEO page requires demand evidence and explicit product-owner approval before the route, links, metadata, and sitemap are added.

## Rollback

Revert the reviewed TASK-008 source/docs commit and redeploy the last reviewed Cloudflare Pages deployment. No database migration or external resource change is involved. Removed legacy source remains recoverable through Git history; no redirect behavior is introduced.
