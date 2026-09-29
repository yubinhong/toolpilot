# Supplemental Public Historical-URL Search — 2026-09-28

Task: TODO-306. This check looked for additional public evidence of historical `toolpilot.cc` paths. It found a public scan of the current homepage carrying the former CryptoClarity title, but no non-root historical path. It does not establish Google indexing, backlinks, URL absence, or a redirect action.

## Internet Archive CDX

The [CDX API](https://web.archive.org/cdx/search/cdx) was queried for wildcard paths with `output=json`, `fl=original,timestamp,statuscode`, `filter=statuscode:200`, and `collapse=urlkey`:

| Query host | Result | Interpretation |
| --- | --- | --- |
| `http://toolpilot.cc/*` | HTTP 200, empty array | No matching capture was returned by this query. This does not prove that no route existed. |
| `www.toolpilot.cc/*` | Generic HTTP 504 gateway response | No archive result; the query did not complete successfully. |
| `toolpilot.cc/*` (scheme omitted) | One request returned an empty array; a retry timed out with HTTP 000 | Inconsistent/unavailable response; do not count it as reliable absence evidence. |

The prior domain-wide CDX query and its exact limits are recorded in `archive-recheck-2026-09-27.json`.

## Search and Other Archive Services

The available web-search interface returned no results for these exact queries:

- `site:toolpilot.cc/crypto`
- `site:toolpilot.cc APY DeFi`
- `site:toolpilot.cc gas calculator`
- `"toolpilot.cc" "P&L"`

Search-engine result absence is not a Search Console export and does not establish non-indexing. The first Common Crawl catalog attempt returned a non-JSON body; a retry to the [official index catalog](https://index.commoncrawl.org/collinfo.json) returned JSON and identified `CC-MAIN-2026-39` as the September 2026 index, covering 2026-09-04 through 2026-09-17.

### Common Crawl annual sample — retry on 2026-09-28

The current catalog was sampled at the latest listed index for each year from 2018 through 2026: `CC-MAIN-2026-39`, `2025-51`, `2024-51`, `2023-50`, `2022-49`, `2021-49`, `2020-50`, `2019-51` and `2018-51`. Each index query used `matchType=domain` for both `toolpilot.cc` and `www.toolpilot.cc`.

| Probe | Result | Interpretation |
| --- | --- | --- |
| `CC-MAIN-2026-39`, `toolpilot.cc` | HTTP 404, response: `No Captures found for: toolpilot.cc` | No matching record in this one index/query. It does not rule out other indexes or historical URLs omitted from the domain-level lookup. |
| `CC-MAIN-2026-39`, `www.toolpilot.cc` | HTTP 503 | Service unavailable; no capture conclusion. |
| Annual samples `2025-51` through `2018-51`, `toolpilot.cc` | Seven HTTP 503 responses; `2022-49` timed out | These indexes could not be verified. |
| Annual samples `2025-51` through `2018-51`, `www.toolpilot.cc` | Eight HTTP 503 responses | These indexes could not be verified. |

This annual sample is not a complete Common Crawl census. It recovered no historical path; the successful 2026 response and unavailable older indexes must remain separate evidence states. No route, index status, backlink status or redirect decision was inferred.

## URLScan public scan search — 2026-09-28

The public [URLScan search API](https://urlscan.io/api/v1/search/?q=domain%3Atoolpilot.cc&size=100) was queried with `domain:toolpilot.cc` and `size=100`:

| Probe | Result | Interpretation |
| --- | --- | --- |
| `domain:toolpilot.cc` | HTTP 200; `total=1`; public scan `019f4af1-db87-72b9-886f-4db891761581`; submitted URL `https://toolpilot.cc/`; scan time `2026-07-10T07:33:19.226Z`; title `CryptoClarity — Know what your crypto really costs` | Confirms that the current root path was publicly scanned with the former CryptoClarity branding. It is one scanner submission, not evidence of Google indexing, backlinks or a complete historical URL list. |
| `domain:www.toolpilot.cc` | HTTP 200; `total=0` | No matching public scan was returned by this query; this does not prove that the hostname or its paths never existed. |
| Scan-result API for the public scan ID | HTTP 403 with `You're not logged in!` | The search summary was available, but request URLs, page links and DOM could not be enumerated. URLScan's [2026 API authentication notice](https://urlscan.io/blog/2026/03/18/api-auth-required/) says authentication became mandatory on 2026-05-04 for `GET /api/v1/result/{scanId}/` and `GET /dom/{scanId}/`. Its [Result API reference](https://urlscan.io/docs/result/) describes requests/responses and links in the top-level `data` object, with HTTP transactions listed under `data.requests`. |

The [public scan result](https://urlscan.io/result/019f4af1-db87-72b9-886f-4db891761581/) is the permalink for this record; the search API summary provides its submitted URL and root-page title. The scan is not a web-archive capture and does not recover any non-root route. The public summary reports 20 page requests, but the result/DOM APIs now require authentication, preventing classification of those requests as internal paths. URLScan's Result API reference describes request/response and link data separately within the scan result. No additional path was added to the URL inventory.

The [scan screenshot](https://urlscan.io/screenshots/019f4af1-db87-72b9-886f-4db891761581.png) returned HTTP 200 as `image/png`; its `Last-Modified` header was `2026-07-10T07:33:19Z`, matching the scan timestamp. Visible navigation labels include Tools (`Overview`, `Gas Fees`, `DeFi Yields`, `Profit & Loss`, `CEX vs DEX`, `Bridge Cost`) and Resources (`Guides`, `Glossary`, `About`, `Contact`). The homepage also displays cards named Gas Fee Estimator, DeFi Yield Calculator, Crypto P&L Calculator, CEX vs DEX Fee Calculator and Bridge Cost Calculator. Visible guide titles are `What are gas fees?`, `How DeFi yields work`, `Calculate your crypto P&L`, `CEX vs DEX fees` and `Estimate bridge costs`. These are visible content labels only: the screenshot does not expose their `href` values, so they are candidates for follow-up evidence, not exact URLs for `docs/url-audit.csv`.

Four targeted web searches returned no results: `site:toolpilot.cc CryptoClarity`, the exact former title, `"toolpilot.cc" crypto calculator` and `"toolpilot.cc" DeFi CryptoClarity`. Search result absence is not evidence of non-indexing or URL absence.

### URLScan access-policy recheck — 2026-09-29

The public Search API was re-queried and again returned HTTP 200 with the same single apex-root scan and former CryptoClarity title. The screenshot endpoint again returned HTTP 200 (`image/png`) with `Last-Modified: 2026-07-10T07:33:19Z`; the scan-result API again returned HTTP 403. URLScan's official [authentication notice](https://urlscan.io/blog/2026/03/18/api-auth-required/) states that result and DOM endpoints require authentication starting 2026-05-04. The observed behavior matches the published policy; no alternate route was used to bypass it.

## Decision

No exact non-root historical path was recovered, although the screenshot provides old-site section and card labels whose destinations remain unknown. The homepage path is already present in the current source inventory. Keep `indexed` and `has_backlink` as `unknown`; make no bulk redirect, 301, 410, or homepage redirect. TODO-306 still needs an owner-provided Search Console export, old sitemap or complete legacy URL list, and a verifiable backlink/log source before migration decisions.
