# ADR-0006: Research Snapshot Content Review Gate

- Status: Accepted for current draft catalog
- Date: 2026-08-20
- Owner: Technical lead

## Context

ToolPilot has 50 research-derived product entries. A reachable product URL is useful evidence, but it does not verify pricing, features, limitations, affiliate terms, or editorial conclusions. Five entries do not have a source URL in the research snapshot, and several product/source pages return anti-bot or rate-limit responses.

## Decision

Keep product and research-source URLs as separate fields and record the review state on every catalog entry:

- `researchSnapshotDate`: date of the research input.
- `productLinkCheck` and `sourceLinkCheck`: date plus `http-ok`, `reachable-restricted`, or `missing` status.
- `sourceStatus`: `provided` or `missing`.
- `reviewStatus`, `reviewOwner`, and `reviewedAt`: editorial workflow fields.
- `verifiedAt`: formal fact-verification timestamp; it remains `null` until an authorized reviewer confirms the content.

The current catalog may display draft entries and these statuses. It cannot be promoted to formal editorial content until the source, freshness, factual claims, and commercial relationship have been reviewed. Link checks must never be presented as factual verification.

## Verification

- On 2026-08-20, 50 product URLs were checked: 42 returned HTTP 2xx/3xx and 8 were reachable but restricted by 403/429 responses.
- 45 supplied source URLs were checked: 39 returned HTTP 2xx/3xx and 6 were reachable but restricted by 403 responses.
- Five entries have no source URL in the research input: Docker, Neon, Railway, Render, and Sentry.
- Tests assert the counts, statuses, source separation, and null formal verification timestamps.

## Consequences

- New catalog entries require explicit provenance and review metadata rather than a bare URL.
- Manual content review remains necessary for claims and commercial terms, especially where automated checks are restricted.
- A future CMS or database must preserve these fields and add reviewer identity, source version, and audit history without weakening the gate.
