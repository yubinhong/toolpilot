# PageSpeed Insights API recheck — 2026-09-29

## Scope

One read-only, no-key request to the [PageSpeed Insights v5 API](https://developers.google.com/speed/docs/insights/v5/get-started) for the public ToolPilot homepage, mobile strategy, and Performance category. The request did not include an API key.

## Result

| Probe | Result | Interpretation |
| --- | --- | --- |
| `https://toolpilot.cc/`, `strategy=mobile`, `category=performance` | HTTP 429, `RESOURCE_EXHAUSTED`; API message says the daily query quota is exhausted | The request returned no `lighthouseResult`, `loadingExperience`, or `originLoadingExperience`. No lab or field metric was obtained. |

The API error response included a Google Cloud consumer project number; it is intentionally omitted from this public repository record. This quota failure is not evidence of site performance, Core Web Vitals, indexing, or data availability in Search Console. The request should be retried only after quota resets or with an Owner-provided authorized API key; a key alone does not establish that field data exists.

## Reproduction

```sh
curl -sS --max-time 60 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Ftoolpilot.cc%2F&strategy=mobile&category=performance'
```
