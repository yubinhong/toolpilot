# CrUX Vis history recheck — 2026-09-28

## Scope

Read-only check of the public Chrome UX Report (CrUX) History dataset for the ToolPilot origin and homepage URL. The responses were received at 2026-09-28 17:53 UTC. The request asked for up to 40 weekly collection periods and did not specify a form factor, matching the CrUX Vis aggregate query shape.

## Results

| Query | Result |
| --- | --- |
| Origin `https://toolpilot.cc` | HTTP 404, `NOT_FOUND`: `chrome ux report data not found` |
| URL `https://toolpilot.cc/` | HTTP 404, `NOT_FOUND`: `chrome ux report data not found` |

Neither query returned a record, collection period, or metric values. This means the public CrUX dataset did not return data for these keys at the time of the check. It is not evidence that Core Web Vitals pass or fail, and it does not replace Search Console indexing/performance data.

## Reproduction

- CrUX Vis origin view: <https://cruxvis.withgoogle.com/#/?view=cwvsummary&url=https%3A%2F%2Ftoolpilot.cc%2F&identifier=origin&device=ALL&periodStart=0&periodEnd=-1&display=p75s>
- Official CrUX History API guide: <https://developer.chrome.com/docs/crux/guides/history-api>
- Official CrUX Vis documentation: <https://developer.chrome.com/docs/crux/vis>

The two read-only API request bodies were `{"origin":"https://toolpilot.cc","collectionPeriodCount":40}` and `{"url":"https://toolpilot.cc/","collectionPeriodCount":40}`. No API key or credential is recorded in this evidence file.

## Remaining evidence

TODO-311 remains open. The owner must provide dated Search Console access/export with property, measurement window and URL coverage, plus field CWV data if available from CrUX/PSI. The no-data response above cannot be used as a performance result.
