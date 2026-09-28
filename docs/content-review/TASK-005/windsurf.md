# Windsurf evidence pack

Date: 2026-09-28. Research by Codex agent; final approver: site owner (pending).

Revision: 6. Digest: `eb1058027adc67be57e8c91ce30268d3cfef01566b2c874cac46e51252084ce9`.

No hands-on benchmark performed. Source access is not formal fact verification.

## Sources

- [Cascade overview (redirected from Windsurf)](https://docs.devin.ai/desktop/cascade/cascade) — Devin; accessed 2026-09-27

- [Plans and Pricing](https://devin.ai/pricing) — Devin; accessed 2026-09-28

- [Devin Desktop](https://devin.ai/desktop) — Devin; accessed 2026-09-28

- [Windsurf editor page (redirects to Devin Desktop)](https://windsurf.com/editor) — Windsurf; accessed 2026-09-27

- [Privacy Policy](https://cognition.com/legal/privacy-policy) — Cognition; last updated 2026-03-09; accessed 2026-09-28

- [Platform Terms of Service](https://cognition.com/legal/platform-terms-of-service) — Cognition; last updated 2026-06-30; accessed 2026-09-28

- [Data Processing Agreement](https://cognition.com/legal/data-processing-statement) — Cognition; last updated 2026-07-23; accessed 2026-09-28

- [Windsurf Master Services Agreement (Exafunction Services only)](https://windsurf.com/docs/MSA.pdf) — Windsurf; accessed 2026-09-28

- [Codeium Enterprise Updater](https://marketplace.windsurf.com/extension/Codeium/codeium-enterprise-updater/changes) — Codeium; accessed 2026-09-28

## Field evidence

- **Workflow**: The official FAQ calls Devin Desktop the new name for Windsurf and says the standard update preserves the existing plan/pricing, including legacy Windsurf Enterprise. Sources: desktop; checked: 2026-09-28.

- **Privacy / data handling**: Cognition's Privacy Policy says User Content may be used for training depending on applicable terms. The June 2026 Platform Terms permit Customer Data training and let paid tiers opt out (Teams requires an administrator); opting out enables provider Zero Data Retention, subject to safety/abuse and legal exceptions. The July 2026 DPA scopes processing of personal Customer Data and requires restrictions preventing subprocessors from training on Customer Data. The separate Windsurf MSA is marked specific to Exafunction Services only and says Customer Data is not trained and is deleted after output, with listed persistent-feature, AUP and profile-data exceptions. The documents cover different data categories, roles and agreements; no account plan, assignment notice, executed Order Form/DPA, opt-out or feature setting was checked. Sources: privacy-policy, terms, dpa, exafunction-msa; checked 2026-09-28.

- **Product self-hosting**: Codeium's current Windsurf Marketplace listing describes the Codeium Enterprise Updater as for self-hosted enterprise customers only. This is bounded evidence of a self-hosted Enterprise customer path for the listed Codeium product. The public listing does not specify deployment architecture, which service components or data are self-hosted, model inference location, whether this path remains available to users of the Devin Desktop continuation, or new-customer eligibility. The older Windsurf plugin setup page redirects and was not used as current evidence. No account or installation was inspected. Source: enterprise-updater; checked: 2026-09-28.

- **Local model inference**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

- **Code / data portability**: Unknown — research needed if material to the decision. Sources: none; checked: not checked.

## Documented strengths, constraints and FAQs

- Strength: the official FAQ identifies Devin Desktop as the new name for Windsurf and says the full IDE remains available. Source: desktop.
- Constraint: the vendor describes a standard transition, but this review has not tested an individual account or entitlement. Source: desktop.
- Strength: the current plan page lists Free at USD 0/month, Pro at USD 20/month, Max at USD 200/month, and Teams at USD 80/month plus USD 40/month per full developer seat. Paid allowances refresh daily and weekly; additional use is available at API pricing. Source: pricing.
- Strength: paid Service Tiers may opt out of Customer Data model training; the Platform Terms say that this enables Zero Data Retention with model providers, subject to stated exceptions. Source: terms.
- Strength: the Codeium Marketplace lists an Enterprise updater specifically for self-hosted enterprise customers, a narrow signal that a self-hosted Enterprise customer path exists for the listed Codeium product. Source: enterprise-updater.
- Constraint: current Cognition terms, the DPA and the Exafunction-specific Windsurf MSA describe different training and retention conditions. Confirm which agreement applies before making an account-specific privacy claim. Sources: terms, dpa, exafunction-msa.
- Constraint: the Codeium Enterprise updater listing does not describe deployment topology, service or data placement, inference location, new-customer eligibility or continuity into Devin Desktop; no account or installation was checked. Source: enterprise-updater.
- FAQ: the standard over-the-air update carries plans, pricing, extensions, settings and in-progress work. The FAQ says plan pricing remains unchanged, including legacy Enterprise. Sources: desktop.
- FAQ: Cognition's privacy policy says training use depends on applicable terms; paid-tier opt-out and the Exafunction-specific MSA have different scopes. Verify the account's controlling agreement, plan, setting and enabled persistent features. Sources: privacy-policy, terms, dpa, exafunction-msa.
- FAQ: the Windsurf Marketplace lists a Codeium Enterprise Updater for self-hosted Enterprise customers. This does not establish its deployment architecture or applicability to Devin Desktop, and no account or installation was checked. Source: enterprise-updater.

## Pricing basis

- Free: USD 0/month; light quota, limited model availability, unlimited inline edits and Tab completions. Source: pricing; checked 2026-09-28.
- Pro: USD 20/month; increased quotas and full model availability. Included usage refreshes daily/weekly; extra usage is at API pricing. Source: pricing; checked 2026-09-28.
- Max: USD 200/month; significantly higher quotas than Pro. Included usage refreshes daily/weekly; extra usage is at API pricing. Source: pricing; checked 2026-09-28.
- Teams: USD 80/month base plus USD 40/month per full developer seat; up to 200 users. Source: pricing; checked 2026-09-28.
- Legacy Windsurf account entitlement: amount remains account-specific and was not inspected. The vendor says plan/pricing carry over; public prices are not a personal quote. Sources: desktop, pricing.

Training and retention scope is also account-specific: confirm whether Cognition or Exafunction terms govern, the Service Tier, any Order Form/DPA, opt-out state and persistent features. Do not generalize the Exafunction-only data rule to all Devin Desktop plans.

## Proposed judgment

Treat Devin Desktop as the documented continuation of Windsurf; use public prices for general comparison, and confirm account-specific legacy terms, usage and update experience before acting. This entry preserves the existing Windsurf URL.

Consider for: Existing users checking continuity of their editor workflow. Not for: New buyers relying on old Windsurf prices.

Record the current account and editor settings, confirm the official update applies, and rehearse the workflow before changing a production setup.

## Gaps

- No account-specific transition or legacy entitlement was tested; public base plan prices do not establish the exact account quote, regional checkout taxes or actual usage cost.
- The applicable Cognition or Exafunction agreement, Service Tier, any executed DPA or Order Form, training setting and persistent features were not checked.
- The public Codeium Enterprise updater listing does not establish whether it applies to the specific Devin Desktop continuation or which components/data it covers; no customer account or enterprise portal was inspected.

## Owner checklist

- [ ] Current official facts, billing basis and unknowns reviewed.

- [ ] Privacy, migration and account requirements adequate for this recommendation.

- [ ] Commercial relationship status checked.

- [ ] Exact revision and digest approved in an authentic owner decision.

- [ ] Dependent decisions reviewed after this product.

- [ ] Deployment authorization obtained separately.
