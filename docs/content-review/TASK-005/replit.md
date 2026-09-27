# Replit evidence pack

Date: 2026-09-27. Research by Codex agent; final approver: site owner (pending).

Revision: 2. Digest: `dd3cc7971dda7d7160e9cf16afc6bbbbec5a28d90b70dddf8124fa03c7c31ef6`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Replit Agent overview](https://docs.replit.com/features/agent/overview) — Replit; accessed 2026-09-27

- [Plans and billing](https://replit.com/pricing) — Replit; accessed 2026-09-27

- [Replit Core](https://docs.replit.com/billing/plans/replit-core) — Replit; accessed 2026-09-27

- [Checkpoints and rollbacks](https://docs.replit.com/features/version-control/checkpoints-and-rollbacks) — Replit; accessed 2026-09-27

## Field evidence

- **Workflow**: Natural-language agent for building applications Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

## Pricing basis

- Current paid plan: Unknown; Exact plan and checkout terms pending. Allowance: unknown. Overage: unknown. Taxes: unknown. Sources: pricing.

## Proposed judgment

Evaluate the full build-to-operation loop, not just the first demo. Require a separate estimate for editing and the live application.

Consider for: Builders comparing a hosted development workflow. Not for: Projects with an unverified residency or private-network requirement.

Keep application code, database backups and environment-variable names portable. Test an independent build before considering a migration complete.

## Documented strengths, constraints and FAQs

- Strength: Replit describes Agent as a plain-language workflow from project setup through checking and deployment; checkpoints can preserve app state including project files and connected database state. Sources: product, checkpoints.
- Constraint: checkpoint recovery is a Replit feature, not an independently tested export path; the current plan amount and allowance remain unresolved. Sources: checkpoints, pricing.
- FAQ: test a separate export/recovery path if the project must operate outside Replit. Source: checkpoints.

## Gaps

- Public pricing extract did not expose reliable plan amounts; confirm the current plan and included allowance.

- Confirm data residency and export requirements for the proposed deployment.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
