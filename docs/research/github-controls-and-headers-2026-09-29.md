# GitHub controls and production headers recheck — 2026-09-29

Read-only recheck for TODO-004, TODO-314 and TODO-315. No GitHub or Cloudflare settings were changed. This record contains only repository-level settings and response headers, not notification contents or account identifiers.

## GitHub repository controls

| Probe | Result | Interpretation |
| --- | --- | --- |
| `GET /repos/yubinhong/toolpilot/branches/main` | `protected=false` | The default branch is not protected by a branch-protection rule or repository ruleset as reported by this endpoint. |
| `GET /repos/yubinhong/toolpilot/branches/main/protection` | HTTP 404, `Branch not protected` | No branch-protection rule was returned. |
| `GET /repos/yubinhong/toolpilot/rulesets` | Empty list | No repository rulesets were returned. Organization rules are not ruled out by this repository-level query. |
| `GET /repos/yubinhong/toolpilot/rules/branches/main` | Empty list | The effective-branch-rules endpoint returned no rules for `main`. |
| Actions workflow permissions | `default_workflow_permissions=read`; `can_approve_pull_request_reviews=false` | Workflow token defaults remain read-only and cannot approve pull requests. |
| Repository webhooks | Empty list | No repository hooks were returned; Cloudflare-side notifications are separate and were not inspected. |
| `GET /repos/yubinhong/toolpilot/automated-security-fixes` | `enabled=false` | Dependabot security updates are not enabled according to this dedicated endpoint. |
| `GET /repos/yubinhong/toolpilot/code-security-configuration` | HTTP 204, no response body | No configuration object was returned; this response alone does not establish organization-wide defaults. |
| Repository `security_and_analysis` | Dependabot security updates, repository-level secret-scanning setting, non-provider pattern scanning, secret validity checks and repository-level push protection report `disabled` | This does not mean that a public repository receives no baseline protection: GitHub's docs say secret scanning runs automatically for public repositories, and user-level push protection is on by default for public repositories. Non-provider/generic patterns and repository-level push protection are separate settings; the user's account-level state and alert details were not inspected. These states are not evidence of a secret or compromise. |
| GitHub CLI token scope summary | Includes `repo` and `read:org`; does not include `notifications` | The repository subscription endpoint returned an error requesting the missing `notifications` scope, so this recheck did not establish the user's ToolPilot watch/subscription state. No notification content was read or retained. |

GitHub's official [watching API documentation](https://docs.github.com/en/rest/activity/watching) says the subscription endpoint reports the authenticated user's repository subscription and documents 404 for an unsubscribed repository; this credential did not provide a reliable subscription result. The official [branch protection API](https://docs.github.com/en/rest/branches/branch-protection) and [repository rules API](https://docs.github.com/en/rest/repos/rules) describe the queried repository controls. GitHub's current [secret-scanning documentation](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) describes free automatic scanning for public repositories; [push protection documentation](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) separates repository-level and user-level protection; [Dependabot update documentation](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-security-updates) describes its public-repository behavior. These distinctions prevent interpreting repository configuration fields as a complete account/platform protection inventory. No settings were changed.

## Production response headers

A single `HEAD https://toolpilot.cc/` request returned HTTP/2 200. The response included:

- `content-security-policy: object-src 'none'; base-uri 'self'; frame-ancestors 'none'`
- `x-frame-options: DENY`
- `permissions-policy: camera=(), microphone=(), geolocation=()`
- `referrer-policy: strict-origin-when-cross-origin`
- `x-content-type-options: nosniff`

No `strict-transport-security` header was observed on this root response. This request does not verify all route-specific CSP meta policies, Cloudflare Dashboard analytics injection or HSTS configuration. TODO-315 remains open pending the Owner's analytics/privacy and HSTS-scope decisions.
