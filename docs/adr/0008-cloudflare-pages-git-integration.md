# ADR-0008: Cloudflare Pages Git Integration Deployment

- Status: Accepted as the target production deployment model; external migration pending
- Date: 2026-08-21
- Owner: Technical lead

## Context

The current Cloudflare Pages project `toolpilot` was created with Direct Upload. Wrangler confirms `Git Provider: No`. Cloudflare Pages does not allow a Direct Upload project to be converted into a Git-integrated project, so automatic GitHub deployment requires a new Pages project and a controlled custom-domain migration.

The repository is a Next.js static export. The build output is `out/`, the runtime requirement is Node 22, and the public production domain is `https://toolpilot.cc`.

## Decision

Use Cloudflare Pages Git Integration as the normal production deployment path:

- GitHub repository: `yubinhong/toolpilot`
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run cloudflare:build`
- Build output directory: `out`
- Build variable: `NODE_VERSION=22`
- Public build variable: `NEXT_PUBLIC_SITE_URL=https://toolpilot.cc`
- Preview branches: enabled according to the Cloudflare Pages branch-control setting

The `cloudflare:build` script runs lint, typecheck, tests, and the static build. GitHub CI remains the repository quality signal. The manual Cloudflare API-token release workflow is removed from the normal path; production rollback is handled through the Git-integrated Pages deployment history after the new project is verified.

Retain the existing Direct Upload project and its last verified deployment as the recovery target. Do not delete it. The Git-integrated project's successful build and `pages.dev` smoke are prerequisites, not proof that `toolpilot.cc` has migrated; custom-domain cutover still requires its own authorization and production smoke.

## Consequences

- Pushing to `main` will trigger a Cloudflare Pages production build after the GitHub integration is enabled.
- Pull requests and non-production branches can receive Cloudflare preview deployments.
- Normal production deployment no longer requires `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` in GitHub Actions.
- The Cloudflare GitHub App receives repository access and must be limited to this repository where possible.
- Direct Upload and Git Integration are separate Pages project modes; the existing project and custom domain require a controlled migration.
- Cloudflare build settings are external configuration and must be verified in the Dashboard before the migration is considered complete.

## Verification and rollback

Before moving `toolpilot.cc`, verify the new project build, source commit, `robots.txt`, `sitemap.xml`, representative pages, review markers, and all production smoke checks. Then attach the custom domain to the new project and repeat the same checks. Keep the old project available until the new production path is accepted.

For rollback, select a previous verified deployment in the Git-integrated Pages deployment history or redeploy its reviewed Git commit through the Pages integration. Do not delete the old project or change DNS during an incident without recording the current deployment, target deployment, operator, reason, and before/after smoke results.

## Current migration evidence — 2026-09-27

- Git-integrated project `toolpilot-git` is connected to `yubinhong/toolpilot` on `main`; deployment from source `fc139ca1b88b76bb8b65c95f4a3f15cbfac736c9` and subsequent main pushes passed Cloudflare Pages checks and 88-route current smoke on `pages.dev`.
- `toolpilot.cc` remains on the legacy Direct Upload project. Current-profile smoke fails against its old content; legacy smoke passes. A custom-domain transfer attempt was rolled back.
- No domain migration is authorized by TASK-005. Keep the legacy project and production monitor profile until the owner authorizes cutover and production-domain smoke passes.
