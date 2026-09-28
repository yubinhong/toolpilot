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
| Scan-result API for the public scan ID | HTTP 403 with `You're not logged in!` | The search summary was available, but request URLs, page links and DOM could not be enumerated. |

The [public scan result](https://urlscan.io/result/019f4af1-db87-72b9-886f-4db891761581/) is the permalink for this record; the search API summary provides its submitted URL and root-page title. The scan is not a web-archive capture and does not recover any non-root route. The public summary reports 20 page requests, but the restricted result API prevents classifying those requests as internal paths. No additional path was added to the URL inventory.

## Decision

No non-root historical path was recovered, and the homepage path is already present in the current source inventory. Keep `indexed` and `has_backlink` as `unknown`; make no bulk redirect, 301, 410, or homepage redirect. TODO-306 still needs an owner-provided Search Console export, old sitemap or complete legacy URL list, and a verifiable backlink/log source before migration decisions.
