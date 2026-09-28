# Replit evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 9. Digest: `301b74baa7471a3c2e20eca537b4122e10750a5d7ab0204a663ced35685498c3`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Replit Agent overview](https://docs.replit.com/features/agent/overview) — Replit; accessed 2026-09-27

- [Plans and billing](https://replit.com/pricing) — Replit; accessed 2026-09-27

- [Core pricing update](https://replit.com/blog/pro-plan) — Replit; updated 2026-09-15, accessed 2026-09-27

- [Replit Core](https://docs.replit.com/billing/plans/replit-core) — Replit; accessed 2026-09-27

- [Checkpoints and rollbacks](https://docs.replit.com/features/version-control/checkpoints-and-rollbacks) — Replit; accessed 2026-09-27

- [Geography](https://docs.replit.com/features/security/geography) — Replit; accessed 2026-09-27

- [Privacy Policy](https://replit.com/privacy-policy) — Replit; accessed 2026-09-27

- [Version control](https://docs.replit.com/learn/projects-and-artifacts/version-control) — Replit; accessed 2026-09-28

- [Disaster recovery](https://docs.replit.com/features/version-control/disaster-recovery) — Replit; accessed 2026-09-28

- [Import from providers](https://docs.replit.com/build/import-from-providers) — Replit; accessed 2026-09-28

- [Replit AI Integrations](https://docs.replit.com/features/integrations/replit-ai-integrations) — Replit; accessed 2026-09-28

- [Model selector](https://docs.replit.com/features/agent/model-selector) — Replit; accessed 2026-09-28

- [Intelligent Model Routing](https://replit.com/blog/intelligent-model-routing) — Replit; published 2026-08-26, updated 2026-08-27, accessed 2026-09-28

- [Enterprise](https://replit.com/enterprise) — Replit; accessed 2026-09-28

## Field evidence

- **Workflow**: Natural-language agent for building applications Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: Replit's policy says its Services are primarily hosted in the United States and may also be hosted elsewhere; use can transfer data to the United States and other hosting jurisdictions. This does not identify every project resource or account setting. Source: privacy-policy; checked: 2026-09-27.

- **Product self-hosting / Enterprise hosting**: Replit's Sales-Assisted Enterprise page lists a dedicated GCP project and a single-tenant option under custom pricing and an annual commitment. It does not say who owns or operates the project, which platform components are included, or whether customers can operate the Replit platform; this does not establish customer-operated self-hosting. Sources: enterprise; checked: 2026-09-28. No account, agreement or deployment was inspected.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Agent model routing / application AI integrations**: Replit's AI Integrations docs describe managed provider API calls for apps being built, billed at provider API prices through Replit credits, or app BYOK billed by the provider. The Model selector describes Agent choices. Replit's August 2026 announcement says it routes models per task; users start in Free Mode and are notified when work escalates to higher-powered modes that can incur usage costs, Core/Pro users may select models, and Enterprise administrators may define approved models. The announcement does not say where routed models run or establish local inference. Local-model support remains unknown. Sources: ai-integrations, agent-model-selector, intelligent-model-routing; checked: 2026-09-28. No account, endpoint, integration or model was tested.

- **Code / data portability**: Replit documents Git/GitHub workflows and an App-managed `gitsafe-backup` remote for recovering Git commit history after local repository corruption. Its import guide lists GitHub, Bitbucket, ZIP and named builder sources; provider-specific secrets, records and services may need separate setup, and one Supabase import path says existing records and secrets are not imported. Agent checkpoints support rollback inside Replit, with optional development-database restoration; production database restore is not automatic. These sources do not establish a tested full external app export or migration. Sources: version-control, disaster-recovery, import-providers, checkpoints; checked: 2026-09-28.
- **Published app geography**: Core, Pro and Enterprise can select North America, Europe (EU), Asia, South America or Australia; Free publishes to North America by default. Published compute, database and Object Storage are colocated. Selection is permanent after publish and pre-publish resources may remain elsewhere. Source: geography; checked: 2026-09-27.
- **Development workspace geography**: Separate from publishing geography, selected at workspace creation, Pro-only and immutable; it need not match the published app region. Source: geography; checked: 2026-09-27.

## Pricing basis

- Replit Core: USD 20/month with monthly billing, or USD 18/month equivalent billed annually. The plan also lists USD 20/month toward its most powerful models. These are base-plan amounts, not a regional checkout or complete application budget; account eligibility, location-dependent tax total, runtime and usage costs remain unconfirmed. Sources: pricing, core-pricing-update; accessed 2026-09-27.

## Proposed judgment

Evaluate the full build-to-operation loop, not just the first demo. Require a separate estimate for editing and the live application.

Consider for: Builders comparing a hosted development workflow. Not for: Projects with an unverified residency or private-network requirement.

Keep application code, database backups and environment-variable names portable. Test an independent build before considering a migration complete.

## Documented strengths, constraints and FAQs

- Strength: Replit describes Agent as a plain-language workflow from project setup through checking and deployment; checkpoints can preserve app state including project files and connected database state. Sources: product, checkpoints.
- Constraint: Git-history recovery, listed import paths and checkpoint rollback have different scopes; none establishes a full external app export, production-data restore or independent deployment. The published Core amount is a base-plan price and does not establish full application costs. Sources: version-control, disaster-recovery, import-providers, checkpoints, pricing.
- FAQ: test a separate export and independent deployment path if the project must operate outside Replit; inventory database records, secrets, domains, deployment settings and connected services. No import or restore was tested. Sources: version-control, disaster-recovery, import-providers, checkpoints.
- FAQ: distinguish Replit Agent's own model selector from AI Integrations used to build app-level API calls. Managed provider use is billed through Replit credits; BYOK is billed by the provider. The docs do not establish local inference for Replit Agent, and no account, endpoint or model was tested. Sources: ai-integrations, agent-model-selector.
- FAQ: Replit's Sales-Assisted Enterprise page lists a dedicated GCP project and single-tenant option at custom pricing with an annual commitment. It does not specify project ownership, operation or included platform components, so this does not establish customer-hosted Replit. Confirm the architecture and terms with Replit; no account or deployment was checked. Source: enterprise.

## Gaps

- Confirm account eligibility, location-based checkout taxes and total application costs.

- Confirm that workspace, publishing, pre-existing storage and connected-service locations meet the proposed residency requirement; no account or deployment was checked, and publishing geography cannot be changed after release.
- Review applicable data-processing terms; the general privacy policy is not an account-specific service-location map or a legal review.
- Confirm the required code, database, production data, secrets, domains, deployment configuration and connected-service migration scope; no export, import, restore or independent deployment was tested.
- Confirm whether Replit Agent supports local-model inference or a local endpoint; the reviewed app integrations and Agent model-selection pages do not establish it.
- Clarify who owns and operates the Enterprise dedicated GCP project, which components it includes, and whether Replit offers a customer-managed platform; the public page does not answer these questions.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
