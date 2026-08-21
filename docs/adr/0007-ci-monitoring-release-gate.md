# ADR-0007: CI, Production Smoke, and Controlled Pages Release

- Status: Accepted for current static MVP
- Date: 2026-08-20
- Owner: Technical lead

## Context

The static site was deployed successfully, but releases were manual and there was no repeatable CI, scheduled production check, notification path, or reviewed rollback entry. The repository has no server-side runtime, so monitoring must validate public HTTP behavior rather than application logs.

## Decision

- `.github/workflows/ci.yml` runs on pushes to `main`/`master` and pull requests. It uses Node 22, `npm ci`, the high-severity npm audit, lint, typecheck, tests, build, and a local static smoke test.
- `.github/workflows/production-monitor.yml` runs every 15 minutes and on demand against `https://toolpilot.cc`. A failed workflow is the first alert signal; GitHub notification routing remains a repository-owner configuration and is `TBD`.
- `.github/workflows/pages-release.yml` is manual-only. It accepts an immutable, full 40-character SHA for a reviewed Git commit, verifies the checked-out `HEAD`, builds and smoke-tests it, then deploys with the pinned Wrangler version `4.124.0` using `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` GitHub environment secrets.
- Before installation or build, `npm run release:check` requires Node 22, a full lowercase `HEAD`, a credential-free GitHub `origin`, a clean worktree, and tracked release-control files. It does not read or print credentials.
- The same manual workflow is the controlled rollback entry: select a previously reviewed commit SHA and redeploy it. It does not delete deployments or claim an unverified Cloudflare-native rollback API. Cloudflare Dashboard rollback remains the emergency fallback.
- Production deploys use a `production` environment and a concurrency lock so two release operations cannot run simultaneously.

## Consequences

- CI and smoke behavior is reproducible without introducing a new runtime dependency or a monitoring service.
- Production monitoring can detect public availability, required review markers, and sitemap completeness, but it cannot detect stale or incorrect editorial facts.
- Live workflow activation still requires a GitHub repository, production environment approval rules, Cloudflare secrets, and notification recipients. None of those external settings are asserted by repository files.
- Reviewed commit `4776027` is pushed to `origin/main`, passes `release:check`, and is deployed as the current Cloudflare Production source. The deployment ID is `be8ecb81-fcad-4058-8909-e80befb441ab`; public smoke passed. GitHub CI run `32442681654` is successful; production environment activation and a real rollback exercise remain pending.
- A rollback requires an immutable reviewed commit SHA and a successful rebuild; this is safer and more auditable for a static site than deploying an unknown local directory or a movable branch name.
