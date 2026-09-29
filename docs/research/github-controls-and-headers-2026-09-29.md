# GitHub controls and production headers recheck — 2026-09-29

Read-only recheck for TODO-004, TODO-314 and TODO-315. No GitHub or Cloudflare settings were changed. This record contains only repository-level settings and response headers, not notification contents or account identifiers.

## GitHub repository controls

| Probe | Result | Interpretation |
| --- | --- | --- |
| `GET /repos/yubinhong/toolpilot/branches/main` | `protected=false` | The default branch is not protected by a branch-protection rule or repository ruleset as reported by this endpoint. |
| `GET /repos/yubinhong/toolpilot/branches/main/protection` | HTTP 404, `Branch not protected` | No branch-protection rule was returned. |
| `GET /repos/yubinhong/toolpilot/rulesets` | Empty list | No repository rulesets were returned. Organization rules are not ruled out by this repository-level query. |
| Actions workflow permissions | `default_workflow_permissions=read`; `can_approve_pull_request_reviews=false` | Workflow token defaults remain read-only and cannot approve pull requests. |
| Repository webhooks | Empty list | No repository hooks were returned; Cloudflare-side notifications are separate and were not inspected. |
| Repository `security_and_analysis` | Dependabot security updates, secret scanning, non-provider pattern scanning, secret validity checks and push protection all report `disabled` | These are settings states, not evidence of a repository secret or compromise. Plan applicability and enablement scope still require the Owner. |
| GitHub CLI token scope summary | Includes `repo` and `read:org`; does not include `notifications` | The repository subscription endpoint returned an error requesting the missing `notifications` scope, so this recheck did not establish the user's ToolPilot watch/subscription state. No notification content was read or retained. |

GitHub's official [watching API documentation](https://docs.github.com/en/rest/activity/watching) says the subscription endpoint reports the authenticated user's repository subscription and documents 404 for an unsubscribed repository; this credential did not provide a reliable subscription result. The official [branch protection API](https://docs.github.com/en/rest/branches/branch-protection) and [repository rules API](https://docs.github.com/en/rest/repos/rules) describe the queried repository controls. No settings were changed.

## Production response headers

A single `HEAD https://toolpilot.cc/` request returned HTTP/2 200. The response included:

- `content-security-policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none'`
- `x-frame-options: DENY`
- `permissions-policy: camera=(), microphone=(), geolocation=()`
- `referrer-policy: strict-origin-when-cross-origin`
- `x-content-type-options: nosniff`

No `strict-transport-security` header was observed on this root response. This request does not verify all route-specific CSP meta policies, Cloudflare Dashboard analytics injection or HSTS configuration. TODO-315 remains open pending the Owner's analytics/privacy and HSTS-scope decisions.
