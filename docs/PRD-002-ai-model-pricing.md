# PRD-002 — ToolPilot AI Model Pricing Platform

## Status

- Status: Accepted on 2026-09-30; route scope amended by explicit product-owner approvals on 2026-10-01 and 2026-10-09 (TASK-010 through TASK-012)
- Replaces: PRD-001 / TASK-005 / TASK-006 product scope
- Implementation tasks: TASK-008, TASK-010, TASK-011, TASK-012
- Primary architecture: Next.js App Router static export on Cloudflare Pages

## Product Goal

ToolPilot helps AI developers, indie hackers, SaaS builders, API users, and agent developers discover model pricing, estimate API usage cost, and compare models using dated official data.

V1 is an AI Model Pricing & API Cost Tools Platform. It is not a general online-tools directory.

## Public Page Allowlist

The approved public content URLs are:

1. `/`
2. `/pricing/`
3. `/calculator/`
4. `/compare/`
5. `/compare/gpt-6-1-sol-vs-astra/`
6. `/compare/haiku-5-5-vs-luna-6/`
7. `/compare/fable-5-1-vs-opus-5-5/`
8. `/models/jev/`
9. `/models/gemini-4-argon/`
10. `/about/`
11. `/privacy/`
12. `/terms/`

The route registry and sitemap must contain exactly these twelve URLs. A model record does not create a page. Gemini 4 Argon is the second explicitly approved trend-driven model landing page under ADR-0012. The three explicitly approved, source-backed model-comparison articles are listed in the dedicated article menu on `/compare/`. TASK-011 added Haiku 5.5 vs Luna 6; TASK-012 adds Fable 5.1 vs Opus 5.5 after current comparison-intent and official-source review, with explicit product-owner approval. Any further SEO route still requires documented trend, independent demand, search-intent/SERP, official-source validation, and explicit product-owner approval before implementation. Do not create `/models/`, provider pages, blogs, guides, alternatives, best pages, or bulk/generated model-comparison pages.

## Core Workflows

- Search models on the home page. Results without an approved landing page link to Pricing, Calculator, or Compare.
- Filter and sort an official-source-backed pricing table.
- Calculate per-request, daily, monthly, and annual costs from the shared model database.
- Compare up to three selected models using the same workload assumptions.
- Browse the three approved model-comparison articles from a dedicated menu on `/compare/`.
- Read the approved Haiku 5.5 vs Luna 6 and Fable 5.1 vs Opus 5.5 articles with official pricing, workload guidance, source links, and verification dates.
- Read the Jev or Gemini 4 Argon overview, pricing state, API access, capabilities, calculator, official sources, and verification date.

All visible model prices, capabilities, API identifiers, and links must be supported by official provider sources. Store the source URL and `lastVerifiedAt` with each model. Unknown facts stay unknown; do not infer unlisted prices or context limits.

## Shared Model Data

Use one static model data layer for homepage discovery, Pricing, Calculator, Compare, and both approved detail pages. Each model record includes stable ID/slug, public name, provider, official API model ID when published, API availability, `pricingStatus` (`public`, `announced`, or `not_public`), input/output/cache rates, unit/currency, context window, output-token limit when published, capabilities, release date, official URLs, source records, and `lastVerifiedAt`. An unpublished API model ID stays null and is labeled as unknown in the UI. A price schedule may include `priceType`, `validFrom`, `validUntil`, `nextPricing`, `pricingSchedule`, and `pricingNotes` so introductory, future-effective, and time-of-day prices remain explicit; an unannounced schedule date remains null and must be called out. `not_public` rates must never produce a numeric cost estimate.

Price schedules must preserve provider pricing variants when they materially affect cost, including effective dates, prompt-length tiers, caching, or peak/off-peak rates. Pricing lists all applicable schedule variants; Calculator and Compare identify the selected schedule and calculate against the applicable prompt-length tier. In particular, DeepSeek Off-peak and Peak rates must not be presented as unqualified equivalents to another provider's standard rate. An output rate that does not apply must use `not_applicable`, never numeric zero, and render as not token-billed. Do not label a cached-input estimate as a guaranteed cache hit or include cache-write/storage/tool-call charges unless the input model supports those costs.

## Landing Page Growth

Gemini 4 Argon was approved on 2026-10-01 as a demand-signaled second model landing page after official-source verification. The owner approved `/compare/gpt-6-1-sol-vs-astra/` on 2026-10-09 after a release-week trend signal, comparison-intent SERP review, independent developer-discussion signal, and official OpenAI price/model-source verification. On 2026-10-09 the owner approved `/compare/haiku-5-5-vs-luna-6/` after current comparison-intent review and official Anthropic/OpenAI price/model-source verification. The owner approved `/compare/fable-5-1-vs-opus-5-5/` after current comparison SERP review and official Anthropic model, pricing, and guidance verification. Current SERPs and developer discussion support comparison intent but do not establish quantified search volume. Any further SEO route requires the same validation and explicit product-owner approval recorded before adding its route, metadata, internal links, or sitemap entry. Model data alone never creates a route.

## Analytics

- Support Google Search Console site verification through an optional build-time `NEXT_PUBLIC_GSC_VERIFICATION` metadata value; the site sitemap remains the crawler submission artifact.
- Support GA4 through an optional build-time `NEXT_PUBLIC_GA_ID`. An unset or invalid value must not load Google scripts.
- Track `page_view`, `model_search`, `calculator_use`, `model_compare`, `pricing_filter`, `model_page_view`, and `external_official_link`.
- Event payloads may include model/provider IDs, filter type, sort type, source type, canonical path, and page title. Never send token counts, request volume, cached-input percentage, raw search text, or URL query strings.
- The calculator and comparison remain browser-only; analytics receives event categories and identifiers only.

## SEO and URL Migration

- Every allowlisted page has unique title, description, self-canonical, Open Graph metadata, and indexability assertions.
- All public pages use the shared branded SVG icon in browser metadata and the site header.
- `sitemap.xml` contains exactly the twelve allowlisted URLs. `robots.txt` allows crawling and points to the sitemap.
- Use `WebSite`, `WebApplication`, and `BreadcrumbList` structured data only where appropriate. Add `FAQPage` only where visible page content contains a real FAQ.
- Retain `/pricing/` and `/compare/` but replace their content completely.
- Remove old product routes and links. Unknown old paths return a real 404; do not redirect every removed path to `/`.
- Do not claim Search Console traffic or indexing from source/build state.

## Out of Scope

No accounts, database, server API, provider integration, user comments, blog, advertising runtime, AdSense script, affiliate integration, provider pages, generic model-detail pages, or generated/bulk model-vs-model pages. The only comparison-article routes are `/compare/gpt-6-1-sol-vs-astra/`, `/compare/haiku-5-5-vs-luna-6/`, and `/compare/fable-5-1-vs-opus-5-5/`. Reusable empty `AdSlot` mount points may exist at the approved placements; they render nothing without supplied content, so V1 has no ad requests, blank space, or layout shift. GA4/GSC support is limited to the optional integrations above; Cloudflare Pages Web Analytics is not enabled by this application.

## Acceptance

- The explicit route registry has exactly twelve page routes; only these are indexable and listed in the sitemap.
- The branded SVG site icon is exported and referenced by every public page.
- All models in the data layer have official pricing/source records and a dated verification timestamp, or explicit unknown values where official data is unavailable.
- Pricing, Calculator, Compare, Jev, Gemini 4 Argon, and all three comparison articles read the same validated model records.
- The Haiku 5.5 vs Luna 6 article is English-only, 600–1,000 English words, contains its target phrase in the title and H1–H6, and has 3–5% phrase density.
- The Fable 5.1 vs Opus 5.5 article is English-only, 600–1,000 English words, contains its target phrase in the title and H1–H6, and has 3–5% phrase density; `/compare/` exposes all three approved articles through a dedicated menu.
- New model data does not create a route.
- Removed legacy paths return a real 404 and are absent from internal links and sitemap.
- Tests, typecheck, lint, production static build, generated artifact checks, and local HTTP smoke pass.
