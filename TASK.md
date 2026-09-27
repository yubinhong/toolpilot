# TASK-006 — ToolPilot rebuild plan: P0 foundation and P1 content

- Status: IN_PROGRESS (source-backed URL inventory, first P0 template/SEO tranche, one P1 draft batch and contextual comparison links/source citations implemented; historical URL evidence and owner gates remain open)
- Date: 2026-09-27
- Input: user-provided `TOOLPILOT_REBUILD_PLAN.md` (currently untracked; preserve it as supplied)
- Baseline: branch `main`, HEAD `a419cab0891802f786c61dd4343fe5aeda75c6c7`; only the supplied untracked plan was present before edits. Do not infer live/indexed status from repository code.
- Goal: close the source-verifiable P0 gaps from the rebuild plan while retaining ToolPilot's approved Next.js static-export architecture and existing content-review gates. Keep externally dependent content, URL migration and monetization work in TODO until evidence/owner decisions arrive.

## Current-code comparison

| Rebuild-plan area | Current evidence | Marked status / task treatment |
| --- | --- | --- |
| P0.1 baseline | `main` at `a419cab0891802f786c61dd4343fe5aeda75c6c7`; supplied `TOOLPILOT_REBUILD_PLAN.md` remains untracked and untouched. | Baseline captured; no tag was created or replaced. |
| P0.2 historical URL audit | `docs/url-audit.csv` now lists all 96 routes in `lib/routes.mjs`; the initial inventory covered 88 before the P1 content tranche. Each row separates route registration from actual HTTP/index/backlink status. No complete GSC, backlink, old sitemap or legacy-path inventory is in the checkout. | Current-source inventory delivered; historical census and migration decisions remain blocked on TODO-306. `indexed` and `has_backlink` remain `unknown`; no 301/410 is inferred. |
| P0.3 Crypto cleanup | Current `app/`, `components/`, `lib/`, `content/`, `next.config.mjs` and `package.json` contain no Crypto/DeFi legacy page implementation; the current 96-route build contains no old cluster route. | Current code/build covered; preserve historical/research records. This does not establish which removed URLs existed or their external value. |
| P0.4 design system | Shared page/layout components and `app/globals.css` already provide the current visual system. | Foundation exists. Audit against the plan and change only evidenced gaps; no wholesale restyle. |
| P0.5 data and templates | `content/tools/`, `content/decisions/`, `lib/content-types.ts`, `lib/content-policy.mjs` and `components/content-detail.tsx` provide source/fact/price/review/digest fields and reusable detail/comparison output. Comparison dimensions use the union of facts on the cited tool profiles, and each known comparison cell links directly to its source. Five tool profiles now record official-source MCP capability; dependent comparison dimensions inherit those facts with citations. | Partial. MCP is documented for Cursor, Claude Code, GitHub Copilot, Cline and Continue only; absence remains unknown, not unsupported. API/IDE/team coverage and purpose-specific pros/cons/FAQ contracts still need source-backed records. No claims were added for absent facts. |
| P0.6 information architecture | Tools, Compare, Alternatives, Pricing, Best, Guides, and `/stacks/` exist. `/stacks/` is noindex scaffolding. `/mcp/` and `/self-hosted/` do not exist. Current trust paths are `/editorial-policy/` and `/disclosure/`, not `/methodology/` and `/affiliate-disclosure/`. | Partial. Preserve working URLs; plan has an internal priority conflict: §5/§49 mark MCP/self-hosted routes P0, while §43/§44/§51 describe them as future/P2. Treat them as deferred until TODO-310 resolves intent and there is distinct source-backed content. Do not add empty indexable routes. |
| P0.7 trust/legal pages | About, Contact, Privacy, Terms, editorial policy and disclosure routes exist. Contact/legal copy explicitly awaits operator facts. | Structure covered; real operator/contact/legal details remain blocked by TODO-307 and must not be fabricated. |
| P0.8 technical SEO | Shared metadata creates canonical, robots directives, Open Graph title/description and Twitter summary metadata. Registered non-home routes now have visible breadcrumbs with matching `BreadcrumbList` JSON-LD; artifact checks compare the structured path to the route registry. Canonical, robots, draft noindex, sitemap and 404 behavior are regression-tested; the current build covers 96 pages. | Partial. No OG image asset/permission, GSC evidence or justified 301/410 map is available. Keep those items open; structured data contains route labels only, with no product/rating claims. |
| P1 first content batch | Current content: 12 tools, 11 comparisons, 6 alternatives, 4 pricing pages, 3 Best pages and 2 guides; all 38 are `in-review`. The 4 new tool profiles, 5 missing plan comparisons and a third Best draft are listed in `docs/content-review/TASK-006/README.md`. | Partial. Tool count and Best minimum now meet plan targets; all 10 named comparison topics have drafts, plus the existing off-list Cline vs Claude Code page. The Cursor/Windsurf page remains under reversed slug/title `/compare/windsurf-vs-cursor/`. Alternatives are numerically above target but the plan's `/alternatives/bolt/` vs current `/alternatives/bolt-new/` mapping and the exact named target set remain unresolved. Pricing count meets target. Keep all drafts noindex until exact owner approval. |
| Analytics and monetization | No GA4, AdSense, active Affiliate, user accounts or tracking integration. | Intentionally gated, not an implementation omission. Require separate privacy/legal/owner and partner decisions under TODO-308. |
| Maintenance | Content checks, freshness reporting, safe outbound link checks, sitemap/artifact validation and current-profile smoke scripts exist. | Foundation covered; these checks do not establish facts, broad crawler access, GSC performance or 90-day growth. |

## Scope and order

1. Preserve the supplied plan and exact baseline. Audit routes, content records, metadata, components, tests, build and deployment source before editing. (Done for this tranche.)
2. Produce a source-verifiable current URL inventory. `docs/url-audit.csv` now covers all 96 registered routes; `indexed` and `has_backlink` remain unknown. Historical routes, 301s and 410s still require TODO-306 evidence.
3. Close technical template/SEO deltas supported by the accepted static architecture. Implemented source-backed comparison dimension unions, visible breadcrumbs, route-only `BreadcrumbList`, Twitter summary metadata, contextual decision-link rules and per-cell source citations. OG artwork and broader source-backed comparison content remain open.
4. Resolve plan-vs-code route naming and the MCP/self-hosted priority conflict before public route changes. Preserve current paths unless a source-backed migration map and tests justify a change.
5. Stage the planned content expansion as source-backed drafts only. The first tranche now adds Aider, Continue, n8n and Make, the five missing plan comparisons and `open-source-ai-coding-tools`; formal publication still requires exact owner approval, and content count is not an indexing or quality proxy.
6. Run Node 22 lint, typecheck, tests, build/artifact checks, local current smoke and dependency audit when code changes begin. Review the final diff and record rollback. Production release requires its own valid authorization and online verification.

## Acceptance criteria

- The execution record compares every P0 area above with current code and separates complete, partial, blocked and deferred work.
- A current-source URL inventory is delivered with evidence fields and explicit unknowns; historical URL coverage remains visibly blocked until original evidence arrives. No speculative bulk delete, homepage redirect or 410 is introduced.
- Current static routes, canonical/robots/sitemap behavior, draft noindex rules and 404 behavior remain tested. No unapproved content enters the sitemap.
- Comparison output exposes only documented values; unknown, unsupported and not checked remain distinct. New page types do not ship as empty placeholders.
- The approved Next.js static export and Cloudflare Pages topology remain unchanged unless a separately accepted ADR changes them.
- New factual content is tied to sources and review dates; no fabricated pricing, hands-on testing, affiliate relationship, operator identity, traffic or revenue claim is added.
- Analytics, ads, Affiliate activation and route migration stay behind their TODO gates until the required owner/evidence/legal inputs are recorded.
- Required local quality checks and any authorized deployment verification are recorded with results, residual risks and rollback procedure.

## Dependencies and deferred gates

- TODO-306: original legacy URL/GSC/backlink evidence for final 301/410 decisions.
- TODO-307: real operator, monitored contact, privacy and terms facts.
- TODO-308: separate privacy/consent and commercial approval before tracking or monetization.
- TODO-309: approved content target list and source evidence for the 12/10/5/4/3–5 batch.
- TODO-310: resolve MCP/self-hosted P0-versus-P2 conflict before routes or indexing.
- TODO-302: production rollback exercise remains an independent operator-authorized window.

Rollback: keep existing route and data files until a reviewed replacement and mapping are ready. Revert only reviewed TASK-006 changes; for a live release, use a verified Pages deployment or reviewed commit and rerun current-profile smoke. No database migration is in scope.

## Progress — 2026-09-27

- [x] Captured the `a419cab0891802f786c61dd4343fe5aeda75c6c7` baseline and preserved the user-supplied plan unchanged.
- [x] Added a reproducible source-only inventory at `docs/url-audit.csv`; it initially covered 88 routes and now covers 96 registered routes after the P1 additions. Actual HTTP status, Google indexing, backlinks and absent historical paths are explicitly not inferred.
- [x] Added source-driven comparison dimension union, visible route breadcrumbs, matching `BreadcrumbList` JSON-LD, Twitter summary metadata and generated-artifact regression checks.
- [x] Initial implementation commit `800a817` passed GitHub CI and deployed as Cloudflare Pages deployment `12e9bb9d-b905-47e1-9e98-716988f2bb2f`; preview and production current smoke each passed 88 pages, robots, sitemap and 404 checks.
- [x] Playwright screenshots inspected at 375x812 and 1440x1000 for the comparison template; content and breadcrumb remain within the viewport.
- [x] Follow-up commit `b7e9b0d` keeps each mobile breadcrumb separator with its path item; CI, preview, production and final 375x812/1440x1000 screenshots passed on the deployed revision.
- [x] Added four source-backed tool drafts, five missing named comparison topics and one plan-listed Best draft. All 38 records remain `in-review`; Continue's official upstream read-only/no-maintenance notice is disclosed as a publication/adoption gap.
- [x] Regenerated `docs/url-audit.csv` for 96 registered routes and added regression coverage for the new paths, exact dependency digests and noindex state.
- [x] Tightened related-decision links to page-type-specific evidence overlap, capped each list at five and linked every known comparison value to its source; all 47 tests, Cloudflare build, audit and local 96-page smoke passed.
- [x] Added official-source MCP facts for five tools, refreshed all 18 dependent decision records and exact review handoffs, and kept all 38 records in-review/noindex. Regression coverage, 48 tests, build, artifact checks, audit, official-link check and local 96-page smoke passed; deployment evidence is recorded below after release.
- [ ] Complete the old-route inventory and decide route migration only after TODO-306 evidence is provided.
- [ ] Resolve alternatives route/target-set and Cursor/Windsurf slug mappings; finish remaining source-backed content-contract and page-level internal-link checks plus owner-dependent gates before marking TASK-006 complete.

### P1 draft status

- Current structured content: 12 tools / 11 comparisons / 6 alternatives / 4 pricing pages / 3 Best pages / 2 guides = 38 records; all are `in-review` and not indexable.
- The ten comparison topics named in the rebuild plan now have a corresponding draft. Existing off-list comparison content remains intact. One planned topic, Cursor vs Windsurf, is represented by the current reversed route/title; no alias or redirect was inferred.
- The named alternative inventory is not complete by count alone: `/alternatives/bolt-new/` is retained and the planned `/alternatives/bolt/` mapping, n8n alternative candidates and owner-approved target set remain open.
- MCP facts are source-backed for Cursor, Claude Code, GitHub Copilot, Cline and Continue. Their 18 dependent decision records are revision 2 with current profile digests; the five affected TASK-006 handoff entries were refreshed. All profiles and decisions remain `in-review` and outside the sitemap.
- Exact new revision/digest handoff: `docs/content-review/TASK-006/README.md` and `docs/content-review/TASK-006-review-manifest.json`. No content approval or public indexing was performed.

#### MCP capability evidence tranche — 2026-09-27

- Runtime: Node.js 22.23.2 / npm 10.9.8.
- `npm test`: passed 48 tests, including official MCP source, access-date, revision and pending-review assertions; `npm run content:check`: passed for 38 records.
- `npm run cloudflare:build`: passed lint, typecheck, 48 tests, static export and artifact checks; generated 96 pages with 4 indexable URLs.
- `npm audit --audit-level=high`: passed with 0 vulnerabilities. `npm run links:check`: all five task-specific MCP documentation URLs were reachable; the Cursor docs hostname redirects to Cursor's documentation root, so its link remains source evidence but is not described as same-URL HTTP 200.
- Local output inspection confirmed all five profile facts and five dependent comparison MCP citations render with `noindex`; `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke` passed for 96 pages, robots, sitemap and a real 404.
- Commit `4363baa9821a547641d88a62c461ad2e1e746773` passed `npm run release:check` in a clean temporary worktree and GitHub CI run `36310506062`. Cloudflare Pages deployment `bd8c8795-7ff5-4540-8c5a-559a693fb380` succeeded; preview `https://bd8c8795.toolpilot-git.pages.dev` and `https://toolpilot.cc` each passed current-profile smoke for 96 pages, robots, sitemap and a real 404.
- No source approval, hands-on test, commercial activation or indexability change was made; all 38 content records remain `in-review` and noindex.

### Verification for this tranche

#### Current P1 draft tranche — 2026-09-27

- Runtime: Node.js 22.23.2 / npm 10.9.8.
- `npm run cloudflare:build`: passed lint, typecheck, 44 tests, content validation, static build and artifact checks; generated 96 pages with 4 indexable URLs.
- `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke`: passed for 96 pages, robots, sitemap and a real 404.
- `npm run content:check`: passed for 38 structured records. Regression tests confirm all ten additions and their exact revision/digest manifest remain in-review, noindex and outside the sitemap.
- `npm run content:freshness -- --as-of=2026-09-27`: 40 fact/price fields are unverified; none is marked review-due. Unknown values remain visible as gaps.
- `npm run links:check`: checked 128 URLs: 99 HTTP-ok, 15 restricted, 6 blocked by the exact-host policy after redirects, 6 timed out and 2 had network errors. Make's pricing host returned 403 and Continue's docs root had a transient network error; task-specific official pages were inspected separately. Link access is not content verification.
- `npm audit --audit-level=high`: passed with 0 vulnerabilities.
- `git diff --check`: passed. No source approval, hands-on testing, commercial activation or indexing change was made.
- GitHub run `36307764221` for commit `b46cad0bce3cd68bd6c1437844d0efc4a07a25fd` passed; Cloudflare Pages deployment `0bd56378-041e-466c-85ad-72a2e77f47a0` succeeded. Preview `https://0bd56378.toolpilot-git.pages.dev` and `https://toolpilot.cc` both passed current-profile smoke for 96 pages, robots, sitemap and a real 404.

#### Phase 3 related-source tranche — 2026-09-27

- `npm run cloudflare:build`: passed lint, typecheck, 47 tests, content validation, static build and artifact checks; 96 pages and 4 indexable URLs.
- `npm audit --audit-level=high`: passed with 0 vulnerabilities. Built comparison output was checked for inline official source links and related decision links; the pending comparison remains outside the sitemap.
- `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke`: passed for 96 pages, robots, sitemap and a real 404.
- Commit `98d0be02df01b8322c23a5ab947c7f65e278c4a1` passed `npm run release:check` in a clean temporary worktree and GitHub CI run `36308661143`. Cloudflare Pages deployment `f552840a-c154-4086-9bb5-ec5c5061e2a1` succeeded; `https://f552840a.toolpilot-git.pages.dev` and `https://toolpilot.cc` each passed current-profile smoke for 96 pages, robots, sitemap and a real 404.
- All 38 content records remain unchanged and `in-review`; no content approval or indexability change was made.

#### Initial P0 technical tranche verification

- `npm run cloudflare:build`: previous technical tranche passed after documentation sync; 42 tests, content checks and artifact checks; 88 pages and 4 indexable URLs. The current P1 tranche requires fresh verification below before completion.
- `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke`: passed for 88 pages, robots, sitemap and a real 404.
- `npm audit --audit-level=high`: passed, 0 vulnerabilities.
- `npm run urls:audit`: generated the 88-route source inventory; the regression test requires it to remain synchronized with the route registry.
- `gh run 36303851871`: audit, lint, type check, 42 tests, build and CI static smoke all passed. Cloudflare deployment `12e9bb9d-b905-47e1-9e98-716988f2bb2f` preview (`https://12e9bb9d.toolpilot-git.pages.dev`) and `https://toolpilot.cc` current smoke passed. The source was checked for Twitter, breadcrumb and JSON-LD markers on production.
- Follow-up commit `b7e9b0dea41efae2c024c1c85cccdeef4781190d` passed CI run `36304533365` and deployed as Cloudflare Pages deployment `3c4b4d7a-4b7b-47e0-a384-8d06353218c0`. Preview (`https://3c4b4d7a.toolpilot-git.pages.dev`) and `https://toolpilot.cc` current smoke passed for 88 pages, robots, sitemap and a real 404. Final Playwright screenshots at 375x812 and 1440x1000 show the comparison page and breadcrumb fit without overlap.

# TASK-005 — ToolPilot decision content remediation

- Status: COMPLETE (engineering remediation and release handoff; external owner gates remain open)
- Date: 2026-09-27
- Authorization: user requested implementation and then explicitly authorized production deployment with online verification for each deliverable progress.
- Content approver: project owner (user); no formal content approval granted yet.
- Baseline: docs/tasks/remediation-baseline.md
- Previous task: docs/tasks/TASK-004-before-remediation.md; production now runs through the Git-integrated Pages project, while the rollback exercise remains pending.

## Scope and progress

Implement TP-R00–TP-R09 from PLANS.md: preserve historical research, add review gates and public projections, noindex drafts, decision templates, eight evidence packs and 28 first-batch pages, trust pages, maintenance checks and local validation.

- [x] R00 Baseline, research extraction and plan
- [x] R01 Public reachability and legacy URL evidence
- [x] R02 Content contract and commercial separation
- [x] R03 Metadata, indexing and test migration
- [x] R04 Decision templates
- [x] R05 Eight product evidence packs
- [x] R06 First-batch content
- [x] R07 Home, navigation and trust pages
- [x] R08 Maintenance automation
- [x] R09 Engineering verification and release handoff

## Research report comparison

Compared the user's three-domain research report with TASK-005, TODO and the operating handoff. Core ToolPilot decision pages and review/source gates are covered; the detailed marked matrix is in [toolpilot-task-gap-analysis-2026-09-27.md](docs/research/toolpilot-task-gap-analysis-2026-09-27.md). Key differences: 28 first-batch pages remain drafts versus the report's unverified 40–60-page operating target; static pricing pages do not satisfy its calculator recommendation; Stacks is not an explicit TASK-005 acceptance item; MCP, self-hosted, changelog, Chinese and commercial experiments were deferred. This comparison does not reopen TASK-005 or authorize those deferred items.

Validation: the matrix was checked against the 544-line attachment; a Node check confirmed 15 four-column rows, referenced files resolve, and `git diff --check` passes. No application tests were run because this update changes documentation only.

## Boundaries

Production deployment and online verification are authorized for each deliverable progress. This does not approve editorial content or commercial relationships. No analytics, advertising, affiliate activation, additional DNS changes or deletion of the legacy Pages project. All new editorial content stays draft/in-review until owner approval of the exact revision.

## Remaining external gates

Owner content approval, operator/contact/legal details, independent GSC and broad crawler-access review, GitHub notification setup, and the TASK-004 production rollback exercise remain separate gates. The owner has switched the `toolpilot.cc` CNAME; this agent made no DNS changes. Pending content must remain noindex.

## Verification and rollback

### Verified on 2026-09-27

- `nvm use 22 && npm ci`: passed after dependency updates; runtime is Node `v22.23.2`, npm `10.9.8`, 0 vulnerabilities.
- Dependency fixes: Next.js and eslint-config-next `16.3.6`, sharp `0.35.4`, js-yaml `4.3.2`; no force install or audit suppression.
- `npm audit --audit-level=high`: passed after clean locked install, 0 vulnerabilities.
- `npm run cloudflare:build`: passed on Next.js 16.3.6. Includes lint, typecheck, all 37 tests, content validation, static build and artifact checks; 88 registered page artifacts and 4 indexable sitemap URLs.
- `SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke`: passed against the newly generated `out/`; checked 88 pages, robots, sitemap and a real 404.
- Content manifest comparison: 28/28 records match the current revision/digest; all remain `in-review`. The eight evidence packs are review aids, not owner approval.
- Freshness snapshot matches the current 2026-09-27 queue: 28 unverified fact/price fields, 0 review-due fields; see `docs/content-review/TASK-005-freshness.json`.
- Stored outbound-link audit checked 115 URLs: 91 HTTP-ok, 14 restricted, 6 blocked by policy and 4 temporary errors. See `docs/research/link-check-2026-09-27.json`; reachability is not fact verification.
- `git diff --check`: passed. Playwright evidence covers 8 routes at 375/768/1440px (24 checks), plus search, empty state, filter accessibility and keyboard states; see `docs/tasks/TASK-005-browser-check.json`.
- `npm run release:check`: passed on reviewed full-SHA release commit `fc139ca1b88b76bb8b65c95f4a3f15cbfac736c9`; GitHub CI passed at `https://github.com/yubinhong/toolpilot/actions/runs/36288456469`.
- Current handoff release `4fb09bca29619032588d152e7b971e69fab1f4ad`: `npm audit --audit-level=high` found 0 vulnerabilities; `npm run release:check` passed with Node 22, a clean worktree and full SHA. Workflow YAML parsed with `workflow_dispatch` enabled and `SMOKE_PROFILE: current`.
- GitHub CI run `36299689412` passed audit, lint, typecheck, tests, static build and local smoke. Cloudflare Pages check passed and deployed source `4fb09bc` as deployment `76a9ace8-375f-40fd-b31a-acdb22661512`; immutable preview: `https://76a9ace8.toolpilot-git.pages.dev`.
- `SMOKE_BASE_URL=https://76a9ace8.toolpilot-git.pages.dev SMOKE_PROFILE=current npm run smoke`: passed for 88 pages, robots, sitemap and a real 404. After deployment, `SMOKE_PROFILE=current npm run smoke` against `https://toolpilot.cc` passed the same checks.
- Manual production-monitor workflow run `36299788937` passed on source SHA `4fb09bca29619032588d152e7b971e69fab1f4ad`: GitHub Actions ran `SMOKE_PROFILE=current` against `https://toolpilot.cc`; see `https://github.com/yubinhong/toolpilot/actions/runs/36299788937`.
- The immediately previous scheduled monitor run `36298017064` failed under its old `legacy` profile because the cutover site no longer contained the legacy markers or 50-tool sitemap. The new current-profile manual run passed; this historical failure does not describe the current monitor configuration.
- Cloudflare Pages Git Integration is confirmed by project `toolpilot-git`, connected to `yubinhong/toolpilot` on `main` with `npm run cloudflare:build`, output `out`, and Node 22. Deployment `000a4a88-b061-4f48-afe7-d7bc3d78d202` completed from the full source SHA above.
- `SMOKE_BASE_URL=https://000a4a88.toolpilot-git.pages.dev SMOKE_PROFILE=current npm run smoke`: passed online for 88 pages, robots, sitemap and a real 404.
- Before the owner-reported CNAME cutover, the formal-domain current smoke failed against the then-current legacy release; that result is historical and has been superseded. After the owner-reported cutover, `SMOKE_PROFILE=current npm run smoke` against `https://toolpilot.cc` passed for 88 pages, robots, sitemap and a real 404. This agent did not change DNS records.
- The old Direct Upload Pages project and verified deployment remain available as recovery targets and must not be deleted. The current OAuth grant only has `account:read` and `pages:write`; this agent did not use it to change DNS or custom-domain bindings.
- Public production requests from this environment previously returned 403 for sampled paths; this is recorded in `docs/research/public-audit-2026-09-27.json` and does not establish global unavailability. GSC remains unverified.
- `out/` exists after the current build and contains `sitemap.xml`; generated output remains local and is not treated as production evidence.

### Remaining gates

R09 engineering verification and release handoff are complete. Remaining independent gates are owner approval of exact content revisions, operator/contact/privacy/legal facts, independent GSC and broad crawler-access review, GitHub notification setup, and the TASK-004 production rollback exercise. These gates do not change the `in-review`/noindex state of content.

Rollback must preserve the pre-existing baseline. After a live release, use the verified previous Pages deployment or revert the reviewed release commit, then repeat the current-profile online smoke. No data migration is involved.
