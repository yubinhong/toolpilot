# Lovable evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 4. Digest: `393d76ff554d10a8323b98294fb0ed7093fecd25ea7480b60646efecc2fca237`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Welcome to Lovable](https://docs.lovable.dev/introduction/welcome) — Lovable; accessed 2026-09-27

- [Plans and billing](https://docs.lovable.dev/introduction/subscription-plans) — Lovable; accessed 2026-09-27

- [Credits and usage](https://docs.lovable.dev/introduction/credits-and-usage) — Lovable; accessed 2026-09-27

- [Deployment, hosting and ownership](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership) — Lovable; accessed 2026-09-27

- [Privacy Policy](https://lovable.dev/id/privacy) — Lovable; effective and last updated 2026-09-15; accessed 2026-09-28

- [Terms of Service](https://lovable.dev/terms) — Lovable; effective 2026-08-15, last updated 2026-08-28; accessed 2026-09-28

- [Data Processing Agreement](https://lovable.dev/data-processing-agreement) — Lovable; last updated 2025-11-06; applies to Business/Enterprise plans; accessed 2026-09-28

- [Security](https://lovable.dev/security) — Lovable; accessed 2026-09-28

## Field evidence

- **Workflow**: Natural-language web application builder Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: The 2026-09-15 Privacy Policy says Customer Content and Usage Data may be used for model training; its free settings opt-out applies prospectively on any plan. It excludes Business/Enterprise content and Usage Data, account/billing details and Your Users' Data. The Aug 2026 Terms separately grant a broader training license subject to prospective opt-out and defer personal-data conflicts to the Privacy Policy; the Nov 2025 Business/Enterprise DPA bars model training on Customer Personal Data but allows Service Data training and says customers cannot opt out of Service Data processing while customers. These documents use different data classes and dates; the account plan, organization agreement and setting were not checked. Sources: privacy, terms, dpa, security; checked: 2026-09-28.
- **Lovable Cloud hosting regions**: The Security page says Cloud customer data can be hosted in the EU, US and Asia Pacific, and data in the selected region does not move across regions by default. The Privacy Policy says Lovable and service providers process Personal Data in multiple countries, including the US. The regional statement is specific to Lovable Cloud and does not map every data category, subprocessor or model-provider flow; no account/workspace region was checked. Sources: security, privacy; checked: 2026-09-28.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Project code can be synchronized with Git providers; database and service migration still need a separate plan. Sources: product; checked: 2026-09-27.

- **Usage basis**: Credits cover build and runtime usage categories; inspect the workspace usage breakdown. Sources: usage; checked: 2026-09-27.

## Pricing basis

- Pro — 100 monthly credits: USD 25 / month; Monthly billing. Allowance: 100 monthly credits. Overage: unknown. Taxes: unknown. Sources: pricing.

- Pro — annual commitment: USD 250 / year; Annual total, not a monthly charge. Allowance: 100 monthly credits. Overage: unknown. Taxes: unknown. Sources: pricing.

## Proposed judgment

Shortlist Lovable for a web prototype whose code and deployment ownership you can review before launch. Budget iteration and ongoing operation separately.

Consider for: Founders validating a web-app workflow. Not for: Teams treating generated output as production-ready without security review.

Before committing, rehearse code handoff, database export and secret replacement. Moving code alone does not prove the complete service can be operated elsewhere.

## Documented strengths, constraints and FAQs

- Strength: project code can sync to GitHub, GitLab or Bitbucket, and workspaces support shared projects and credits. Source: product.
- Constraint: credit consumption varies by feature and activity; code sync alone does not establish a complete database, hosting or secret migration. Sources: usage, product, ownership.
- Constraint: do not rely on a blanket no-training claim; public documents distinguish plan, workspace and data categories, and the Free/Pro opt-out is prospective. Confirm the applicable agreement and setting before sending sensitive code. Sources: privacy, terms, dpa, security.
- Constraint: a selected Lovable Cloud region is not a complete platform-wide residency map; the Privacy Policy says service providers may process Personal Data in multiple countries, including the US. Sources: security, privacy.
- FAQ: Lovable documents Git sync for code, while runtime services need a separate handoff plan. Sources: product, ownership.
- FAQ: the current Privacy Policy allows prospective opt-out on any plan, while the older Business/Enterprise DPA says Service Data may be used for training without customer opt-out; their data definitions differ. Verify the actual workspace agreement and setting. Sources: privacy, terms, dpa, security.
- FAQ: Lovable documents EU, US and Asia Pacific Lovable Cloud regions, while its Privacy Policy describes multi-country Personal Data processing. Confirm the workspace region and provider scope for the actual account. Sources: security, privacy.

## Gaps

- Confirm the account plan, effective Privacy Policy/Terms, any organization-managed workspace agreement or Business/Enterprise Order Form/DPA, and the model-training setting; no account or agreement was inspected.
- Determine which project data falls under Customer Content, Usage Data, Customer Personal Data, Service Data or Your Users' Data, and confirm connected integrations and model-provider routing for the actual workflow.
- Confirm the selected Lovable Cloud region and the scope of any residency requirement against subprocessors, integrations and model providers; the Security page is Cloud-scoped while the Privacy Policy describes multi-country Personal Data processing, and no account/workspace region was checked.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy scope, model-training opt-out, migration and account requirements reviewed for the exact workspace.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
