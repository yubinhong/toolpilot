# Bolt.new evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 3. Digest: `2f51a00e9a6b3db59aa381305856f79ea6eb90f0ded04faa12f5a8b73d23cb95`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Intro to Bolt](https://support.bolt.new/get-started/intro-bolt) — Bolt.new; accessed 2026-09-27

- [Plans and billing](https://bolt.new/pricing) — Bolt.new; accessed 2026-09-27

- [GitHub for version control](https://support.bolt.new/integrations/git) — Bolt; accessed 2026-09-27

- [Privacy Policy](https://stackblitz.com/privacy-policy) — StackBlitz / Bolt; published 2026-09-14, updated 2026-09-22, accessed 2026-09-28

## Field evidence

- **Workflow**: JavaScript web apps; mobile path uses Expo Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: The policy's general rule says eligible Bolt AI content may be used for model development and de-identified dataset licensing unless opted out, starting no earlier than 2026-10-07 or a later account Terms date. Forge content created/generated from 2026-09-14 may be eligible under separate affirmative consent; account exclusions also apply. Sources: privacy; checked: 2026-09-28.

- **Product self-hosting**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Official documentation provides a GitHub version-control integration. Sources: git; checked: 2026-09-27.

## Pricing basis

- Free: USD 0 / month; Free tier. Allowance: 1M tokens/month with a 300K daily cap. Overage: unknown. Taxes: unknown. Sources: pricing.

- Pro: USD 25 / month; Monthly billing. Allowance: Starts at 10M tokens/month. Overage: unknown. Taxes: unknown. Sources: pricing.

## Proposed judgment

Shortlist Bolt for a prototype that fits its documented technology scope. Validate the export and deployment steps before choosing a paid tier.

Consider for: Builders evaluating JavaScript web applications. Not for: Projects assuming every backend language is supported.

Rehearse the GitHub handoff, then build from a clean checkout. Inventory database, hosting and secret configuration separately from the code.

## Documented strengths, constraints and FAQs

- Strength: the official guide describes JavaScript-based web frameworks, an Expo mobile path, GitHub version control, and Bolt Cloud hosting/database options. Sources: product, git.
- Constraint: verify language/framework compatibility; the GitHub integration should be tested as a handoff and the docs do not establish an in-product merge workflow. Sources: product, git.
- FAQ: existing GitHub repositories can be imported according to the product introduction; test a clean checkout and external services before relying on it. Source: product.
- Constraint: the published privacy policy describes prospective model-development and dataset-licensing uses for eligible Bolt AI content; account effective dates, Forge consent, exclusions and opt-out controls require account-specific review. Source: privacy.
- FAQ: the privacy policy says eligible Bolt AI inputs, outputs, related interaction data and project content processed by Bolt AI features may be used for model development and de-identified dataset licensing unless opted out. For non-Forge content, its earliest date is 2026-10-07 or a later account Terms date; Forge content from 2026-09-14 may be eligible under affirmative consent. This account's date, region, agreement and settings were not checked. Source: privacy.

## Gaps

- Verify the account's applicable Terms effective date, region, organization-managed status, model-development opt-out and any Bolt Forge consent; no account settings or agreement were inspected.
- Assess all other unknown fields above against the proposed recommendation.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
