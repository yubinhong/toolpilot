# ADR-0010: Static Cloudflare Pages security headers and route CSP

- Status: Accepted for TASK-007 implementation; local browser verification passed, deployment verification pending.
- Date: 2026-09-27
- Context: TODO-315; Next.js 16.3.6 App Router with `output: export`, hosted as static assets on Cloudflare Pages.

## Decision

Keep static export and generate Cloudflare Pages `out/_headers` after Next.js produces the final HTML. Apply shared clickjacking, MIME-sniffing, referrer, permissions, and baseline CSP protections with one `/*` rule. Apply a second strict CSP to each currently registered HTML path using SHA-256 hashes computed from that route's executable inline scripts. The route policy defaults resources to same-origin, disables inline event handlers, objects, and framing, and allows only inline script bodies present in that built route. JSON-LD and `application/json` data blocks do not execute as JavaScript and are excluded from the script hash set.

The generator must fail closed if a route artifact is missing, a route pattern is unsafe or duplicated, any policy line exceeds Cloudflare's documented 2,000-character limit, or shared plus per-route rules exceed the documented 100-rule limit. It must regenerate from every build, and artifact checks must compare the emitted policy to the exact current route registry and HTML. The current 97 routes require 98 rules. Unknown-path responses still receive shared X-Frame-Options, Permissions-Policy and baseline CSP from `/*`; exact script-hash policies apply to registered pages.

Do not enable `unsafe-inline`, nonce-based dynamic rendering, experimental Next.js SRI, or HSTS in this change. Static per-route hashes preserve the approved architecture; HSTS requires Owner confirmation of the affected host/subdomain scope and `max-age`.

## Consequences

Any route or inline script change regenerates CSP automatically. Limits are checked in the build so a new route cannot silently ship without policy coverage. A new framework-generated inline script is allowed only on pages whose fresh output contains its exact hash. Chromium verification under Wrangler Pages preview passed all 97 routes with zero browser errors or CSP violations; theme keyboard/persistence, search states, and comparison navigation also passed. After deployment, preview and production both returned the required headers and passed the 97-page smoke. Production browser interactions passed but its response attempted to load `static.cloudflareinsights.com/beacon.min.js`; the strict CSP blocked the external script and recorded one violation. Cloudflare documents that enabling [Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/) automatically injects its beacon on a subsequent deployment. The dashboard setting has not been verified or changed; the Owner must decide whether to disable it or approve the analytics/privacy scope before any allowlist change. Immutable preview had no beacon or CSP violation. The policy may need deliberate extension if ToolPilot later adds approved third-party scripts, external images/fonts, analytics, forms or APIs.

## Rollback

Revert the reviewed generator/header policy and redeploy the preceding verified Pages deployment. Repeat current-profile smoke and verify the new response headers are absent. Do not change domain, Pages dashboard, or DNS configuration. HSTS is excluded because browser HSTS state persists after deployment rollback.
