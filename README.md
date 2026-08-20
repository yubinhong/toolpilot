# ToolPilot

ToolPilot is a decision workspace for developers, indie hackers, and AI builders choosing tools and stacks. The current repository contains the first local static MVP, not a production catalog.

## Current status

- Version: `0.1.0` (unreleased)
- Runtime: Node.js `22` from `.nvmrc`
- Framework: Next.js `16.3.1` App Router with static export
- Content: draft-only entries in `lib/catalog.mjs`; all entries show `Draft` and `Source pending`
- Production: not deployed; CI, hosting, DNS, analytics, accounts, CMS, and vendor submissions are not configured

## Start locally

```bash
nvm use 22
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Open <http://127.0.0.1:3001>.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run build` writes the static site to `out/`. Before any public release, run the checks in `TESTING.md` and complete the content-source and commercial-disclosure review.

## Reading order for Codex

1. `AGENTS.md` for repository rules and command policy.
2. `AI_CONTEXT.md` for the current snapshot and next checkpoint.
3. `PROJECT.md` for stable product scope and environment facts.
4. `TASK.md` for the current task.
5. `PRD.md`, `ARCHITECTURE.md`, `TESTING.md`, `SECURITY.md`, and `RUNBOOK.md` as required.
6. `DECISIONS.md` and `docs/adr/` for accepted architecture decisions.

## Product boundaries

ToolPilot distinguishes independent evaluation from Affiliate, Featured, and Sponsor relationships. Paid exposure may buy a clearly labeled placement, never an objective conclusion or natural ranking. Unverified tool facts remain draft or `TBD` until a source and review date are recorded.
