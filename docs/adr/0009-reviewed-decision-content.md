# ADR-0009: Versioned decision content and draft indexing

- Status: Accepted for the user-approved TASK-005 implementation; individual editorial approvals pending.
- Date: 2026-09-27
- Extends ADR-0006 without changing the original 2026-08-20 snapshot.

## Decision

Keep Next.js static export and the existing 50 research identities. Add structured JSON for eight deep profiles and decision records. `lib/catalog.mjs` retains `researchTools` and exposes a current `tools` compatibility overlay; new Claude Code/Cline identities have no invented historical link checks.

The server-only loader validates all records. TypeScript defines the content shape; a pure Node policy implements runtime invariants. Only an explicit public-tool DTO crosses the client boundary. Historical affiliate-program research never serves as an actual ToolPilot relationship.

Review states are draft, in-review and published. Publication requires owner identity, date, actual decision reference, exact revision and a SHA-256 digest of all editorial fields. Dependency references bind both revision and digest. Material content changes invalidate approval even if an editor forgets to increment the revision. Source reading, HTTP reachability, formal approval and hands-on testing remain separate.

The digest is a consistency check, not identity authentication or a digital signature. Real approval is established by the owner decision record and repository review process. Agents must not invent it. The checker does not replace substantive editorial review.

A shared route registry drives metadata and sitemap. Pending details keep their URLs and return 200 with noindex,follow. Hubs become indexable when they have an approved child. Unknown URLs return 404. No blanket homepage redirects or robots disallow of draft pages.

## Compatibility and migration

Existing slugs and historical fields remain; production smoke has an explicit legacy profile until authorized cutover. New client components accept the public DTO. No runtime API or database is introduced. No automatic data or approval migration occurs.

Historical tests continue asserting the original snapshot; current-content tests assert validation, approval, dependency and indexing behavior. JSON collections may grow without a forced all-draft state. Artifacts are checked for metadata, local links and client leakage.

## Consequences and rollback

There are initially no formally approved decision pages; the sitemap is intentionally small. Unknown key claims may block approval. Editing tool evidence can invalidate dependent decisions, requiring deliberate review. Price freshness is reported after 30 days and other facts after 90 days, without changing dates or approval automatically.

Rollback uses this task's reviewed diff while preserving earlier workspace changes. A production rollback remains separately authorized and follows ADR-0008; old Direct Upload resources stay intact. Unapproved records must not become indexed during rollback.
