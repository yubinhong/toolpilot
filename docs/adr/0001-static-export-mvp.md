# ADR-0001: Static Export MVP And Content Boundary

- Status: Accepted for MVP
- Date: 2026-08-20
- Owner: Technical lead

## Context

ToolPilot needs a small, reviewable first implementation for developer-tool discovery and decision pages. The current repository was intentionally reset, so there is no existing server, database, CMS, or deployment contract to preserve. The product also requires that unreviewed tool facts remain visibly separate from published editorial claims.

## Decision

The MVP uses Next.js App Router with `output: "export"` and `trailingSlash: true`. Pages live in `app/`, shared presentation components live in `components/`, and the initial catalog seed lives in `lib/catalog.mjs`. `npm run build` produces `out/` for a future static host.

The catalog seed is draft-only. Entries carry a review state, research snapshot marker, product URL, optional source URL, commercial status, and verification field; the current `Draft` / `Research snapshot` values prevent the seed from being treated as a verified production catalog. No account, vendor submission, analytics, payment, or server API is part of this MVP.

## Consequences

- The first user path is fast to build, cache, inspect, and deploy once a host is approved.
- Content changes are code changes until a source/version workflow is chosen.
- Dynamic submissions, account workflows, analytics, and personalized recommendations require a new architecture decision.
- A future CMS or API must preserve source, review date, commercial relationship, and independent-evaluation boundaries.

## Verification

- `next.config.mjs` declares static export.
- Node 22.23.0: `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` pass.
- `out/` contains the generated pages, `robots.txt`, and `sitemap.xml`.
