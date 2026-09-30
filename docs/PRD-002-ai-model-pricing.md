# PRD-002 — ToolPilot AI Model Pricing Platform

## Status

- Status: Accepted by the product owner on 2026-09-30
- Replaces: PRD-001 / TASK-005 / TASK-006 product scope
- Implementation task: TASK-008
- Primary architecture: Next.js App Router static export on Cloudflare Pages

## Product Goal

ToolPilot helps AI developers, indie hackers, SaaS builders, API users, and agent developers discover model pricing, estimate API usage cost, and compare models using dated official data.

V1 is an AI Model Pricing & API Cost Tools Platform. It is not a general online-tools directory.

## Public Page Allowlist

V1 has exactly eight public content URLs:

1. `/`
2. `/pricing/`
3. `/calculator/`
4. `/compare/`
5. `/models/jev/`
6. `/about/`
7. `/privacy/`
8. `/terms/`

The route registry and sitemap must contain no more than these eight URLs. A model record does not create a page. Do not create `/models/`, provider pages, blogs, guides, alternatives, best pages, or bulk model-comparison pages. Only Jev has a V1 detail page.

## Core Workflows

- Search models on the home page. Results without an approved landing page link to Pricing, Calculator, or Compare.
- Filter and sort an official-source-backed pricing table.
- Calculate per-request, daily, monthly, and annual costs from the shared model database.
- Compare up to three selected models using the same workload assumptions.
- Read the Jev overview, pricing, API access, capabilities, calculator, official sources, and price verification date.

All visible model prices, capabilities, API identifiers, and links must be supported by official provider sources. Store the source URL and `lastVerifiedAt` with each model. Unknown facts stay unknown; do not infer unlisted prices or context limits.

## Shared Model Data

Use one static model data layer for homepage discovery, Pricing, Calculator, Compare, and Jev. Each model record includes stable ID/slug, public name, provider, official API model ID, API availability, input/output/cache rates, unit/currency, context window when published, capabilities, release date when published, official URLs, source records, and `lastVerifiedAt`.

Price schedules must preserve provider pricing variants when they materially affect cost, including effective dates, context tiers, caching, or peak/off-peak rates. Calculations must state which rate option they use. Do not label a cached-input estimate as a guaranteed cache hit or include cache-write/storage/tool-call charges unless the input model supports those costs.

## Landing Page Growth

Additional model landing pages require a documented trend signal, independent demand validation, search-intent and SERP validation, and official-source verification. Approval must be recorded before adding the explicit route, metadata, internal links, or sitemap entry. Model data alone never creates a route. No page is added to V1 without product-owner approval.

## Analytics

- Support Google Search Console site verification through an optional build-time `NEXT_PUBLIC_GSC_VERIFICATION` metadata value; the site sitemap remains the crawler submission artifact.
- Support GA4 through an optional build-time `NEXT_PUBLIC_GA_ID`. An unset or invalid value must not load Google scripts.
- Track `page_view`, `model_search`, `calculator_use`, `model_compare`, `pricing_filter`, `model_page_view`, and `external_official_link`.
- Event payloads may include model/provider IDs, filter type, sort type, source type, canonical path, and page title. Never send token counts, request volume, cached-input percentage, raw search text, or URL query strings.
- The calculator and comparison remain browser-only; analytics receives event categories and identifiers only.

## SEO and URL Migration

- Every allowlisted page has unique title, description, canonical, Open Graph metadata, and indexability assertions.
- `sitemap.xml` contains at most the eight allowlisted URLs. `robots.txt` allows crawling and points to the sitemap.
- Use `WebSite`, `WebApplication`, and `BreadcrumbList` structured data only where appropriate. Add `FAQPage` only where visible page content contains a real FAQ.
- Retain `/pricing/` and `/compare/` but replace their content completely.
- Remove old product routes and links. Unknown old paths return a real 404; do not redirect every removed path to `/`.
- Do not claim Search Console traffic or indexing from source/build state.

## Out of Scope

No accounts, database, server API, provider integration, user comments, blog, advertising runtime, AdSense script, affiliate integration, provider pages, generic model-detail pages, or generated model-vs-model pages. Reusable empty `AdSlot` mount points may exist at the approved placements; they render nothing without supplied content, so V1 has no ad requests, blank space, or layout shift. GA4/GSC support is limited to the optional integrations above; Cloudflare Pages Web Analytics is not enabled by this application.

## Acceptance

- The explicit route registry has exactly eight page routes; only these are indexable and listed in the sitemap.
- All models in the data layer have official pricing/source records and a dated verification timestamp, or explicit unknown values where official data is unavailable.
- Pricing, Calculator, Compare, and Jev read the same validated model records.
- New model data does not create a route.
- Removed legacy paths return a real 404 and are absent from internal links and sitemap.
- Tests, typecheck, lint, production static build, generated artifact checks, and local HTTP smoke pass.
