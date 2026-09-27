# Replit evidence pack

Date: 2026-09-27. Research by Codex agent; final approver: site owner (pending).

Revision: 4. Digest: `b111f881f3d3b9ab07dbdd42afd04fe78356d4c8d836cf79e23de07291d88dc0`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Replit Agent overview](https://docs.replit.com/features/agent/overview) — Replit; accessed 2026-09-27

- [Plans and billing](https://replit.com/pricing) — Replit; accessed 2026-09-27

- [Core pricing update](https://replit.com/blog/pro-plan) — Replit; updated 2026-09-15, accessed 2026-09-27

- [Replit Core](https://docs.replit.com/billing/plans/replit-core) — Replit; accessed 2026-09-27

- [Checkpoints and rollbacks](https://docs.replit.com/features/version-control/checkpoints-and-rollbacks) — Replit; accessed 2026-09-27

## Field evidence

- **Workflow**: Natural-language agent for building applications Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

## Pricing basis

- Replit Core: USD 20/month with monthly billing, or USD 18/month equivalent billed annually. The plan also lists USD 20/month toward its most powerful models. These are base-plan amounts, not a regional checkout or complete application budget; account eligibility, location-dependent tax total, runtime and usage costs remain unconfirmed. Sources: pricing, core-pricing-update; accessed 2026-09-27.

## Proposed judgment

Evaluate the full build-to-operation loop, not just the first demo. Require a separate estimate for editing and the live application.

Consider for: Builders comparing a hosted development workflow. Not for: Projects with an unverified residency or private-network requirement.

Keep application code, database backups and environment-variable names portable. Test an independent build before considering a migration complete.

## Documented strengths, constraints and FAQs

- Strength: Replit describes Agent as a plain-language workflow from project setup through checking and deployment; checkpoints can preserve app state including project files and connected database state. Sources: product, checkpoints.
- Constraint: checkpoint recovery is a Replit feature, not an independently tested export path; the published Core amount is an annual-billed base-plan equivalent and does not establish full application costs. Sources: checkpoints, pricing.
- FAQ: test a separate export/recovery path if the project must operate outside Replit. Source: checkpoints.

## Gaps

- Confirm account eligibility, location-based checkout taxes and total application costs.

- Confirm data residency and export requirements for the proposed deployment.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
