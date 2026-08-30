# ADR-0007: CI, Production Smoke, and Controlled Pages Release

- Status: Accepted for CI and monitoring; manual Pages API-token release path superseded by ADR-0008
- Date: 2026-08-20
- Owner: Technical lead

## Context

The static site was deployed successfully, but releases were manual and there was no repeatable CI, scheduled production check, notification path, or reviewed rollback entry. The repository has no server-side runtime, so monitoring must validate public HTTP behavior rather than application logs.

## Decision

- `.github/workflows/ci.yml` runs on pushes to `main`/`master` and pull requests. It uses Node 22, `npm ci`, the high-severity npm audit, lint, typecheck, tests, build, and a local static smoke test.
- `.github/workflows/production-monitor.yml` runs every 15 minutes and on demand against `https://toolpilot.cc`. A failed workflow is the first alert signal; GitHub notification routing remains a repository-owner configuration and is `TBD`.
- The former `.github/workflows/pages-release.yml` manual API-token release path has been removed. Normal production deployment is targeted to Cloudflare Pages Git Integration, which builds the connected `main` branch with the repository's `cloudflare:build` command. The repository does not store a Cloudflare API Token.
- Before installation or build, `npm run release:check` requires Node 22, a full lowercase `HEAD`, a credential-free GitHub `origin`, a clean worktree, and tracked release-control files. It does not read or print credentials.
- `npm run release:check` remains a local and review-time repository gate. After Git Integration is enabled, rollback uses a verified deployment in the new Pages project's deployment history or rebuilds a reviewed commit; the old Direct Upload project remains available during migration.

## Consequences

- CI and smoke behavior is reproducible without introducing a new runtime dependency or a monitoring service.
- Production monitoring can detect public availability, required review markers, and sitemap completeness, but it cannot detect stale or incorrect editorial facts.
- Live Git Integration still requires a GitHub repository authorization, a new Pages project, build settings, custom-domain migration, and notification configuration. None of those external settings are asserted by repository files.
- Reviewed commit `4776027` is pushed to `origin/main`, passes `release:check`, and is deployed as the current Cloudflare Production source. The deployment ID is `be8ecb81-fcad-4058-8909-e80befb441ab`; public smoke passed. GitHub CI run `32442681654` is successful; production environment activation and a real rollback exercise remain pending.
- A rollback requires an immutable reviewed commit SHA and a successful rebuild; this is safer and more auditable for a static site than deploying an unknown local directory or a movable branch name.
