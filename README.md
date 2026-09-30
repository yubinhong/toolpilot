# ToolPilot

ToolPilot is an AI model pricing and API cost tools platform. V1 contains exactly eight public pages and one independent model landing page for Jev. The model database powers search, pricing, calculations, and comparisons without generating model routes.

## Start locally

    nvm use 22
    npm ci
    npm run dev -- --hostname 127.0.0.1 --port 3001

Open http://127.0.0.1:3001.

## Quality checks

    npm run models:check
    npm run lint
    npm run typecheck
    npm test
    npm run build
    npx --yes wrangler@4.124.0 pages dev out --ip 127.0.0.1 --port 4173
    SMOKE_BASE_URL=http://127.0.0.1:4173 npm run smoke

npm run build writes the static export to out/. Use Wrangler Pages dev for HTTP smoke so local path and 404 behavior match Cloudflare Pages. Cloudflare Pages Git Integration uses npm run cloudflare:build and publishes out/.

Optional build-time configuration: `NEXT_PUBLIC_GSC_VERIFICATION` adds the Google Search Console verification meta tag; a valid `NEXT_PUBLIC_GA_ID` enables the allowlisted GA4 page and product events. Both are unset by default. The app never sends calculator token/request inputs or free-text searches.

## Project documents

Read AGENTS.md, AI_CONTEXT.md, PROJECT.md, and TASK.md first. The accepted product scope is docs/PRD-002-ai-model-pricing.md, with docs/adr/0011-demand-driven-eight-page-v1.md defining the eight-page route boundary.
