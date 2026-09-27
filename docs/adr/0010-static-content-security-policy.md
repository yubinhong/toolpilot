# ADR-0010: Static Cloudflare Pages security headers and route CSP

- Status: Accepted; registered-route headers are deployed and the 404 fallback meta follow-up is locally verified, pending release.
- Date: 2026-09-27
- Context: TODO-315; Next.js 16.3.6 App Router with `output: export`, hosted as static assets on Cloudflare Pages.

## Decision

Keep static export and generate Cloudflare Pages `out/_headers` after Next.js produces the final HTML. Apply shared clickjacking, MIME-sniffing, referrer, permissions, and baseline CSP protections with one `/*` rule. Apply a second strict CSP to each currently registered HTML path using SHA-256 hashes computed from that route's executable inline scripts. The route policy defaults resources to same-origin, disables inline event handlers, objects, and framing, and allows only inline script bodies present in that built route. JSON-LD and `application/json` data blocks do not execute as JavaScript and are excluded from the script hash set.

The `/*` header cannot carry only the 404 script hashes: every registered document also receives it, and multiple CSP policies are intersected. A union of all current route and 404 hashes is about 5.7 KB, beyond Cloudflare Pages' 2,000-character per-header-value limit. Therefore, the build adds a separate CSP meta element to the static `404.html`, using hashes extracted from that file alone. The meta policy blocks third-party scripts on unknown-path 404 documents while retaining their own hydration scripts. It omits `frame-ancestors`, which is enforced by the shared response header because that directive is not supported in a CSP meta element. Registered route CSP headers and their hash sets remain unchanged.

The generator must fail closed if a route or 404 artifact is missing, a route pattern is unsafe or duplicated, any policy line exceeds Cloudflare's documented 2,000-character limit, or shared plus per-route rules exceed the documented 100-rule limit. It must regenerate from every build, and artifact checks must compare the emitted route policies and 404 meta policy to the exact current route registry and HTML. The current 97 routes require 98 header rules. Unknown-path responses receive shared response headers plus the 404 document's hash-based CSP meta.

Do not enable `unsafe-inline`, nonce-based dynamic rendering, experimental Next.js SRI, or HSTS in this change. Static per-route hashes preserve the approved architecture; HSTS requires Owner confirmation of the affected host/subdomain scope and `max-age`.

## Consequences

Any route or inline script change regenerates CSP automatically. Limits are checked in the build so a new route cannot silently ship without policy coverage. A new framework-generated inline script is allowed only on pages whose fresh output contains its exact hash. Chromium verification under Wrangler Pages preview passed all 97 routes with zero browser errors or CSP violations; theme keyboard/persistence, search states, and comparison navigation also passed. After deployment, preview and production both returned the required headers and passed the 97-page smoke. Production browser interactions passed but its response attempted to load `static.cloudflareinsights.com/beacon.min.js`; registered-page CSP blocked the external script and recorded one violation. The follow-up 404 meta policy was locally verified in Chromium: the not-found page and theme control work, while a simulated Insights script fails with `requestfailed: csp`. Read-only Chromium inspection of current production confirms that the automatically injected beacon appears in `BODY` after `</head>`, after the 404 meta would be parsed. The follow-up remains source-only until the next deployment. Cloudflare documents that enabling [Pages Web Analytics](https://developers.cloudflare.com/pages/how-to/web-analytics/) automatically injects its beacon on a subsequent deployment. The dashboard setting has not been verified or changed; the Owner must decide whether to disable it or approve the analytics/privacy scope before any allowlist change. Immutable preview had no beacon or CSP violation. The policy may need deliberate extension if ToolPilot later adds approved third-party scripts, external images/fonts, analytics, forms or APIs.

## Rollback

Revert the reviewed generator/header policy and redeploy the preceding verified Pages deployment. Repeat current-profile smoke and verify the new response headers are absent. Do not change domain, Pages dashboard, or DNS configuration. HSTS is excluded because browser HSTS state persists after deployment rollback.
