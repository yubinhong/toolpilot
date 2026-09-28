# ADR-0010: Static Cloudflare Pages security headers and route CSP

- Status: Accepted; per-document CSP meta capacity follow-up is implemented locally and awaits full validation/release. Production remains on the previously deployed route-header plus 404-meta model until a verified deployment completes. Analytics and HSTS owner gates remain open.
- Date: 2026-09-27
- Context: TODO-315; Next.js 16.3.6 App Router with `output: export`, hosted as static assets on Cloudflare Pages.

## Decision

Keep static export and transform each final HTML document after Next.js produces it. Generate an exact strict CSP meta for every registered route and `404.html`, using SHA-256 hashes computed from that document's executable inline scripts. The document policy defaults resources to same-origin, disables inline event handlers, objects, and forms, and allows only inline script bodies present in that built document. JSON-LD and `application/json` data blocks do not execute as JavaScript and are excluded from the script hash set. Place the meta immediately after an existing charset declaration (or immediately after `<head>` if absent) so the CSP is parsed before document scripts without pushing UTF-8 detection later in the byte stream.

The `/*` response rule remains responsible for shared clickjacking, MIME-sniffing, referrer, permissions, and CSP protections; its CSP includes `object-src 'none'`, `base-uri 'self'`, and `frame-ancestors 'none'`. The latter stays in a response header because `frame-ancestors` is not supported in a CSP meta element. Do not union per-route hashes into the shared response policy: matched CSP policies are intersected, and a global hash union is both unnecessary and too large for a header value. Per-document metas preserve each document's exact script allowlist while keeping `_headers` at one rule as the route registry grows.

The generator must fail closed if a route or 404 artifact is missing, a route pattern is unsafe or duplicated, a CSP meta is malformed/misplaced/duplicated, or a shared header line exceeds Cloudflare's documented 2,000-character limit. It must regenerate from every build, and artifact checks must require exactly one matching document CSP on every current route and 404 and exactly one shared `_headers` rule. Unknown-path responses receive shared response headers plus the 404 document's hash-based CSP meta.

Do not enable `unsafe-inline`, nonce-based dynamic rendering, experimental Next.js SRI, or HSTS in this change. Static per-route hashes preserve the approved architecture; HSTS requires Owner confirmation of the affected host/subdomain scope and `max-age`.

## Consequences

Any route or inline script change regenerates CSP automatically. Checks ensure a new route cannot silently ship without a matching document policy. A new framework-generated inline script is allowed only on documents whose fresh output contains its exact hash. The capacity follow-up is not deployed yet; prior production browser evidence applies to route CSP headers and the 404 meta only. On the new policy, Chromium must verify registered pages and 404 render/hydrate under their own meta policy, representative navigation/search/theme interactions, and that a production-style post-head third-party script remains blocked. Cloudflare documents that enabling [Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/) automatically injects its beacon. The dashboard setting has not been verified or changed; the Owner must decide whether to disable it or approve the analytics/privacy scope before any allowlist change or zero-violation acceptance. HSTS host/subdomain scope and `max-age` also remain Owner decisions. The policy may need deliberate extension if ToolPilot later adds approved third-party scripts, external images/fonts, analytics, forms or APIs.

## Rollback

Revert the reviewed generator/header policy and redeploy the preceding verified Pages deployment. Repeat current-profile smoke and verify the new response headers are absent. Do not change domain, Pages dashboard, or DNS configuration. HSTS is excluded because browser HSTS state persists after deployment rollback.
