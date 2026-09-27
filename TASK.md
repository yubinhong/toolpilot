# TASK-005 — ToolPilot decision content remediation

- Status: IN_PROGRESS
- Date: 2026-09-27
- Authorization: user requested implementation and then explicitly authorized production deployment with online verification for each deliverable progress.
- Content approver: project owner (user); no formal content approval granted yet.
- Baseline: docs/tasks/remediation-baseline.md
- Previous task: docs/tasks/TASK-004-before-remediation.md; Cloudflare migration remains incomplete.

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
- [ ] R09 Engineering verification and release handoff

## Boundaries

Production deployment and online verification are authorized for each deliverable progress. This does not approve editorial content or commercial relationships. No analytics, advertising, affiliate activation, domain migration or deletion of the legacy Pages project. All new editorial content stays draft/in-review until owner approval of the exact revision.

## Remaining external gates

Owner content approval, operator/contact/legal details, unrestricted production/GSC checks, a separately authorized `toolpilot.cc` DNS cutover, and the TASK-004 production rollback exercise remain separate gates. Pending content must remain noindex.

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
- Cloudflare Pages Git Integration is confirmed by project `toolpilot-git`, connected to `yubinhong/toolpilot` on `main` with `npm run cloudflare:build`, output `out`, and Node 22. Deployment `000a4a88-b061-4f48-afe7-d7bc3d78d202` completed from the full source SHA above.
- `SMOKE_BASE_URL=https://000a4a88.toolpilot-git.pages.dev SMOKE_PROFILE=current npm run smoke`: passed online for 88 pages, robots, sitemap and a real 404.
- `SMOKE_PROFILE=current npm run smoke` against `https://toolpilot.cc` still fails because the domain serves the prior Direct Upload release. `SMOKE_PROFILE=legacy npm run smoke` passed against the retained old deployment and the restored public domain.
- A custom-domain transfer attempt was rolled back. The legacy Direct Upload project remains the public endpoint and recovery target; Cloudflare currently reports its domain validation as pending although the runtime legacy smoke passes. The DNS CNAME and any future domain cutover require separate owner authorization and DNS write access. The current OAuth grant only has `account:read` and `pages:write`.
- Public production requests from this environment previously returned 403 for sampled paths; this is recorded in `docs/research/public-audit-2026-09-27.json` and does not establish global unavailability. GSC remains unverified.
- `out/` exists after the current build and contains `sitemap.xml`; generated output remains local and is not treated as production evidence.

### Remaining gates

Current-profile smoke on `toolpilot.cc` after a separately authorized DNS cutover; owner approval of exact content revisions; operator/contact/privacy/legal facts; independent GSC checks; TASK-004 production rollback exercise. The Git Integration deployment and its `pages.dev` current smoke are verified, but the public domain still serves the old release, so R09 stays incomplete.

Rollback must preserve the pre-existing baseline. After a live release, use the verified previous Pages deployment or revert the reviewed release commit, then repeat the current-profile online smoke. No data migration is involved.
