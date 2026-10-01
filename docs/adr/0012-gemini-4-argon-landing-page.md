# ADR-0012: Gemini 4 Argon Demand-Driven Landing Page

- Status: Accepted
- Date: 2026-10-01
- Supersedes: The eight-URL limit in ADR-0011 for this single approved Argon route only

## Context

After the initial AI pricing launch, the product owner identified a clear search-demand signal for Gemini 4 Argon and explicitly approved `/models/gemini-4-argon/`. The current public route count is therefore nine. The original rule remains: model records do not automatically create pages, and no tenth route is approved.

Google's official September 30, 2026 announcement publishes introductory rates of $2 per million input tokens and $10 per million output tokens, a 95% cached-input discount, and later rates of $4/$20 after the introductory period. Google has not published the schedule's effective dates or an Argon API model ID. Access is currently limited through Fairwind; broad developer API availability is not live. Google's announcement identifies 1,000,000 as the maximum output-token limit, not the input context window.

## Decision

- Add exactly `/models/gemini-4-argon/` as the ninth indexable route; keep Jev as the only other model landing route.
- Keep model facts, pricing schedules, pricing state, token limits, FAQs, benchmark notes, official URLs, and verification dates in the shared static model record. Do not generate routes from records.
- Mark Argon pricing `announced`, since Google explicitly published numeric future launch rates. Label API access as limited and the introductory/effective dates as unannounced. Do not present Argon as generally available.
- Store the 1,000,000 maximum output limit separately from `contextWindow`, which remains unknown.
- Support `not_public` pricing in the shared cost engine. Calculator and Compare must return an unavailable result instead of a numeric estimate for a model with `pricingStatus: "not_public"` or an unknown rate required by the chosen workload.
- Render Jev and Argon through one shared model landing-page component. Preserve separate visible answers, FAQs, sources, and pricing/access states.
- Update route, metadata, canonical, robots, sitemap, generated-artifact, and HTTP smoke allowlists to exactly nine URLs. Keep old model/tool paths as real 404s and do not add broad redirects.
- Do not add an Argon-vs-model route, a provider route, or any other public URL.

## Consequences

- Google's officially announced Argon token rates can be used for clearly labeled estimates even though public API access is still limited.
- If the announcement is withdrawn or official pricing changes, update only the shared record, recheck all five model surfaces, and update `lastVerifiedAt`.
- `not_public` status is fail-closed for every cost surface and remains covered by unit tests even though no current public model has that status.
- The sitemap contains nine URLs, and every page remains self-canonical and indexable.

## Rollback

Revert the reviewed TASK-009 code/data/docs change and redeploy the previous reviewed Pages artifact. Remove the Argon route entry and page file together if the demand-driven approval is withdrawn; model records still do not create routes. No database, DNS, or external resource migration is required.

## Official sources checked 2026-10-01

- Google announcement, pricing, rollout, release date, and output limit: <https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/>
- Google DeepMind model overview and capabilities: <https://deepmind.google/models/gemini/>
- Google-reported benchmark methodology: <https://deepmind.google/models/evals-methodology/gemini-4-argon>
- Gemini API model catalog: <https://ai.google.dev/gemini-api/docs/models>
