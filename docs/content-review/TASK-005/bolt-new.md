# Bolt.new evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 4. Digest: `5ded72a4a6c991c4557932cf1679147ba8a6d7fc726a5dd9419c9b9624e921a6`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Intro to Bolt](https://support.bolt.new/get-started/intro-bolt) — Bolt.new; accessed 2026-09-27

- [Plans and billing](https://bolt.new/pricing) — Bolt.new; accessed 2026-09-27

- [GitHub for version control](https://support.bolt.new/integrations/git) — Bolt; accessed 2026-09-27

- [Privacy Policy](https://stackblitz.com/privacy-policy) — StackBlitz / Bolt; published 2026-09-14, updated 2026-09-22, accessed 2026-09-28

- [Security & Trust](https://bolt.new/platform/security) — Bolt; accessed 2026-09-28

- [Bolt Forge: build with open-source AI models in Bolt](https://support.bolt.new/account-and-subscription/bolt-forge) — Bolt; accessed 2026-09-28

- [What is Bolt Forge?](https://bolt.new/blog/what-is-bolt-forge) — Bolt; accessed 2026-09-28

- [Choose an agent](https://support.bolt.new/building/using-bolt/agents) — Bolt; accessed 2026-09-28

## Field evidence

- **Workflow**: JavaScript web apps; mobile path uses Expo Sources: product; checked: 2026-09-27.

- **Privacy / data handling**: The general policy describes prospective model-development and de-identified dataset-licensing uses for eligible Bolt AI content unless opted out, no earlier than 2026-10-07 or a later account Terms date. Forge is a separate affirmative-consent path; its Help Center lists prompts, code, project files, configuration, tool calls, edit histories and fix traces as de-identified data used by partners to train open-source models, excluding EEA, UK and Swiss sessions. Leaving Forge stops new collection, but already collected material is not automatically deleted. Sources: privacy and forge; checked: 2026-09-28.

- **Product self-hosting**: Bolt advertises BYOK deployment to a customer's AWS or Azure tenant with isolated compute. The public page does not detail component scope, architecture, eligibility or inference placement; no account or deployment was inspected. Source: security; checked: 2026-09-28.

- **Local model inference**: Unknown. Forge runs on Bolt-reserved hardware; model selection is described behind the scenes and app execution uses browser WebContainers. Those pages do not document an on-device model or customer-selected local endpoint. Sources: forge-runtime and agents; checked: 2026-09-28.

- **Code / data portability**: Official documentation provides a GitHub version-control integration. Sources: git; checked: 2026-09-27.

## Pricing basis

- Free: USD 0 / month; Free tier. Allowance: 1M tokens/month with a 300K daily cap. Overage: unknown. Taxes: unknown. Sources: pricing.

- Pro: USD 25 / month; Monthly billing. Allowance: Starts at 10M tokens/month. Overage: unknown. Taxes: unknown. Sources: pricing.

- Lite: USD 9 / month; monthly, but waitlist/access code required. Forge only; no Standard/Max agents and no extra Forge usage purchases. October 14, 2026 is the last signup day; existing Lite subscribers can continue after the preview. Overage and taxes: unknown. The ordinary pricing page does not list Lite. Source: forge.

- Forge research preview: 2026-09-14 through 2026-10-14. Forge continues as a working lab afterward; Pro Forge access and its no-extra-cost preview benefit end on October 14. Teams and Enterprise are unsupported. Source: forge.

## Proposed judgment

Shortlist Bolt for a prototype that fits its documented technology scope. Treat customer-cloud deployment as an advertised option requiring architecture and eligibility review; validate export/deployment steps and confirm account access before choosing a paid tier.

Consider for: Builders evaluating JavaScript web applications. Not for: Projects assuming every backend language is supported.

Rehearse the GitHub handoff, then build from a clean checkout. Inventory database, hosting and secret configuration separately from the code.

## Documented strengths, constraints and FAQs

- Strength: the official guide describes JavaScript-based web frameworks, an Expo mobile path, GitHub version control, and Bolt Cloud hosting/database options. Sources: product, git.
- Constraint: verify language/framework compatibility; the GitHub integration should be tested as a handoff and the docs do not establish an in-product merge workflow. Sources: product, git.
- FAQ: existing GitHub repositories can be imported according to the product introduction; test a clean checkout and external services before relying on it. Source: product.
- Constraint: the published privacy policy describes prospective model-development and dataset-licensing uses for eligible Bolt AI content; account effective dates, Forge consent, exclusions and opt-out controls require account-specific review. Source: privacy.
- Strength: Bolt advertises a customer AWS/Azure deployment option with isolated compute; the public page does not explain component scope, eligibility or inference placement. Source: security.
- Constraint: Forge's research preview ends 2026-10-14, after which Forge continues as a working lab; Pro access ends, while existing Lite subscribers can continue. Lite waitlist signups close that day, and Teams/Enterprise are unsupported. Source: forge.
- FAQ: Forge is described as running on Bolt-reserved hardware. This is not evidence of local inference on the user's device or a customer-selected endpoint; local-model support remains unknown. Sources: forge-runtime, agents.
- FAQ: Lite is listed at USD 9/month through a waitlist/access-code path, supports Forge only and does not allow extra Forge usage purchases; October 14, 2026 is the last signup day, while existing Lite subscribers can continue after the preview. Source: forge.
- FAQ: the 2026-09-14 to 2026-10-14 research preview ends the special Pro Forge access, but Forge continues as a working lab and existing Lite subscribers keep access; Teams and Enterprise are unsupported. Source: forge.
- FAQ: the general privacy policy and Forge's affirmative-consent path have separate scopes. Verify the actual account's Terms date, region and consent; no account settings were inspected. Sources: privacy, forge.

## Gaps

- Verify the account's applicable Terms effective date, region, organization-managed status, model-development opt-out and any Bolt Forge consent; no account settings or agreement were inspected.
- Confirm eligibility, component scope and operational requirements for customer-cloud BYOK; verify Lite access and Forge consent/data-use controls in the actual account. No account, deployment, endpoint or checkout was inspected.
- Assess all other unknown fields above against the proposed recommendation.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
