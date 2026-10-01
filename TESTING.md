# TESTING.md

## Runtime

Use Node.js 22 from `.nvmrc` and the npm lockfile v3. Reproduce dependencies with `nvm use 22 && npm ci`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run models:check` | Validate model schema, official source hostnames, verification dates, pricing schedules/status, output token limits, and the exact route allowlist. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm test` | Test the nine-route contract, source-backed model data, date schedule selection, calculator formulas and unavailable pricing, GA4/GSC configuration and event payload allowlists; also cover CSP and release-readiness utilities. |
| `npm run build` | Model validation, Next.js static export, generated CSP/Pages headers, and output artifact checks. |
| `npm run artifacts:check` | Validate the current `out/` directory; does not rebuild it. |
| `npm run smoke` | HTTP checks for all nine routes, canonical/metadata/index directives, exact sitemap, robots access, and real 404s for retired routes. |
| `npm run cloudflare:build` | CI sequence: lint, typecheck, test, and build. |
| `npm run release:check` | Require Node 22, full HEAD SHA, credential-free GitHub origin, clean worktree, and tracked release files. |

Static export does not support `next start`. For a Pages-compatible local HTTP smoke, run `npx --yes wrangler@4.124.0 pages dev out --ip 127.0.0.1 --port 4173`, then run `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke` in another terminal. A generic directory server may expose directory listings for paths that Cloudflare Pages correctly treats as 404.

## Required Invariants

- Exactly nine content routes are registered, exported, indexable, and listed in `sitemap.xml`.
- Model data does not generate detail routes; Jev and Gemini 4 Argon are the only explicitly approved detail routes.
- `not_public` rates never produce numeric cost estimates; `not_applicable` output billing is not represented as a zero rate.
- Argon's 1M value is labeled as an output-token limit; no input context window is inferred.
- GA4 is absent without a valid ID; when enabled, event payloads exclude calculator quantities, raw search text, and query strings.
- Every model has an official pricing source and verification date; every source uses HTTPS and an approved official host.
- Missing context, cached rates, release dates, or API facts remain explicitly unknown.
- Calculator estimates use shared data, one-million-token units, 30 days per month, and 365 days per year.
- Source URLs and verification dates appear in the pricing output; Jev and Argon show official sources, access/pricing state, FAQs, and accurate token-limit status.
- Retired `/tools/`, `/guides/`, `/best/`, `/alternatives/`, `/mcp/`, `/self-hosted/`, generated model routes, `/404`, and `/404.html` return real 404s.
- No legacy product URL appears in internal links or sitemap.
- Mobile pricing remains usable with horizontal table scrolling; calculator controls stack at narrow widths.

Tests and build output prove implementation state, not live provider terms or Google indexing. Recheck official price sources before release and record current results in `TASK.md`.
