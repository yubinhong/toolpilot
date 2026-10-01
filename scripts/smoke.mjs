import { getRoutes } from "../lib/routes.mjs";
import { getSiteUrl } from "../lib/site-config.mjs";

const base = new URL(process.argv.find((arg) => arg.startsWith("--base-url="))?.slice(11) || process.env.SMOKE_BASE_URL || "https://toolpilot.cc");
if (!["http:", "https:"].includes(base.protocol) || base.username || base.password) throw new Error("Invalid smoke base URL");

const routes = getRoutes();
const expectedPaths = ["/", "/pricing/", "/calculator/", "/compare/", "/models/jev/", "/models/gemini-4-argon/", "/about/", "/privacy/", "/terms/"];
const failures = [];
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
if (JSON.stringify(routes.map(({ path }) => path)) !== JSON.stringify(expectedPaths)) failures.push("route registry differs from the exact nine-page approved allowlist");
const get = (path) => fetch(new URL(path, base), { signal: AbortSignal.timeout(20000), redirect: "manual" });

await Promise.all(routes.map(async (route) => {
  try {
    const response = await get(route.path);
    const html = await response.text();
    if (response.status !== 200) throw new Error(`expected 200; got ${response.status}`);
    if (!html.includes(`rel="canonical" href="${getSiteUrl()}${route.path}"`)) throw new Error("canonical mismatch");
    const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0] ?? "";
    if (!/content="index, follow"/.test(robots)) throw new Error("expected index, follow");
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    if (title !== escapeHtml(route.title) || description !== escapeHtml(route.description)) throw new Error("title or description mismatch");
  } catch (error) {
    failures.push(`${route.path}: ${error.message}`);
  }
}));

try {
  const sitemapResponse = await get("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  if (sitemapResponse.status !== 200) throw new Error("sitemap not HTTP 200");
  const actual = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  const expected = expectedPaths.map((path) => `${getSiteUrl()}${path}`).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`expected exactly ${expected.length} sitemap URLs, received ${actual.length}`);

  const robotsResponse = await get("/robots.txt");
  const robots = await robotsResponse.text();
  if (robotsResponse.status !== 200 || !robots.includes(`${getSiteUrl()}/sitemap.xml`)) throw new Error("robots.txt sitemap reference missing");
  if (!robots.includes("Allow: /") || !robots.includes("/models/") || /Disallow:\s*\/models\//i.test(robots)) throw new Error("robots.txt must allow the approved model landing routes");

  const removedPaths = ["/tools/", "/tools/cursor/", "/guides/", "/guides/old-guide/", "/best/", "/alternatives/", "/mcp/", "/self-hosted/", "/stacks/", "/models/", "/models/gpt-6-astra/", "/pricing/old-model/", "/compare/old-pair/", "/_not-found/", "/404", "/404.html"];
  for (const path of removedPaths) {
    const response = await get(path);
    if (response.status !== 404) throw new Error(`${path} should return a real 404; got ${response.status}`);
  }
} catch (error) {
  failures.push(error.message);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Smoke passed: ${routes.length} indexable pages, exact sitemap, robots access, and removed routes returning real 404.`);
}
