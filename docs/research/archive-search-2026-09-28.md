# Supplemental Public Historical-URL Search — 2026-09-28

Task: TODO-306. This check looked for additional public evidence of historical `toolpilot.cc` paths. It did not recover a URL and does not establish Google indexing, backlinks, URL absence, or a redirect action.

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

Search-engine result absence is not a Search Console export and does not establish non-indexing. A current Common Crawl index-catalog request returned a non-JSON error body in this environment, so no new Common Crawl index result is claimed.

## Decision

No historical path was added to `docs/url-audit.csv`. Keep `indexed` and `has_backlink` as `unknown`; make no bulk redirect, 301, 410, or homepage redirect. TODO-306 still needs an owner-provided Search Console export, old sitemap or complete legacy URL list, and a verifiable backlink/log source before migration decisions.
