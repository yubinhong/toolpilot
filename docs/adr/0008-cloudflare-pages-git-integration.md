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

The existing Direct Upload project remains untouched until the new Git-integrated project has a successful build, preview smoke, production custom-domain smoke, and a recorded source commit. The old project must not be deleted as part of this migration.

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
