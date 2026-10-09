# PROJECT.md - ToolPilot

## Current Product Baseline

- Status: ToolPilot AI Model Pricing V1; TASK-013 deployed the fourth approved comparison article and compact article menu
- Last updated: 2026-10-09
- Product: AI Model Pricing & API Cost Tools Platform
- Primary users: AI developers, indie hackers, SaaS developers, API users, and AI builders
- Domain: `https://toolpilot.cc`
- Current PRD: [PRD-002](docs/PRD-002-ai-model-pricing.md); page-growth decisions: [ADR-0011](docs/adr/0011-demand-driven-eight-page-v1.md), superseded for the Argon exception by [ADR-0012](docs/adr/0012-gemini-4-argon-landing-page.md); comparison-page approvals are recorded in TASK-010 through TASK-013

ToolPilot helps users answer how much an AI model/API will cost for a workload and compare the rates of multiple providers. It is not a general online-tools directory.

## V1 Scope

The thirteen approved target content routes are `/`, `/pricing/`, `/calculator/`, `/compare/`, `/compare/gpt-6-1-sol-vs-astra/`, `/compare/haiku-5-5-vs-luna-6/`, `/compare/fable-5-1-vs-opus-5-5/`, `/compare/opus-5-5-vs-astra/`, `/models/jev/`, `/models/gemini-4-argon/`, `/about/`, `/privacy/`, and `/terms/`. The four owner-approved comparison articles appear in a compact, expandable menu on `/compare/`; no general or batch comparison pages are generated.

The model database lives in `content/models.json`. The homepage, pricing page, calculator, comparison page, all four comparison articles, and Jev/Argon detail pages read the same records. Each price record includes an official source and verification date; unknown values remain unknown. Model records do not create SEO routes. Jev and Gemini 4 Argon are the only approved detail pages.

V1 does not include accounts, API services, a database, a blog, AdSense scripts, affiliate links, or sponsored placement. Reusable empty ad-slot mount points render nothing until content is supplied. GSC verification metadata and GA4 are optional build-time integrations; when enabled, the event allowlist excludes calculator quantities and raw search text.

## Technical Baseline

| Layer | Current implementation |
| --- | --- |
| Web | Next.js App Router, React, TypeScript/TSX |
| Rendering | Static export using `output: "export"` and trailing slashes |
| Model data | Static JSON in `content/models.json`, loaded through `lib/models.ts` |
| Pricing math | Shared pure functions in `lib/model-cost.ts` |
| Route allowlist | Explicit thirteen-route registry in `lib/routes.mjs` |
| Hosting | Cloudflare Pages Git Integration; `toolpilot-git` is the current project for `toolpilot.cc` |
| Runtime | Node.js 22 (`.nvmrc`), npm with lockfile v3 |
| Quality | ESLint 9 flat config, TypeScript 5.9, Node test runner, static artifact checks, HTTP smoke |

There is no application server, database, CMS, account system, or pricing API. User calculator inputs are processed in the browser.

## Environments and Release Boundary

- Local: `npm run dev`; synthetic/public model data only.
- Static build: `npm run build` writes `out/`, validates source records, creates shared security headers, and checks the exported pages.
- Production: Cloudflare Pages Git Integration on `main`; release status and preview/production smoke are recorded in `TASK.md` and `RUNBOOK.md`.
- Previous Direct Upload Pages project `toolpilot` remains an operational recovery target; it is not part of the application architecture.

Current source, build, smoke, and deployment evidence is recorded in `TASK.md` and `RUNBOOK.md`. A source route or successful local export is not evidence of Google indexing or search traffic.

## Product Rules

- Use official provider sources for prices, API status, context, and capabilities.
- Record `lastVerifiedAt`; never infer a missing fact from general model knowledge.
- Preserve price variants that change estimates, such as effective dates, context tiers, cached input, and peak/off-peak rates.
- Show objective costs and documented facts; do not make a universal “best model” claim.
- Add an additional model SEO page only after the demand and official-source checks in PRD-002 and explicit product-owner approval.
