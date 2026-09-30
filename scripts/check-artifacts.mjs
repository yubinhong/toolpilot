import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { getRoutes } from "../lib/routes.mjs";
import { getSiteUrl } from "../lib/site-config.mjs";
import { injectCspMeta } from "./generate-security-headers.mjs";

const failures = [];
const models = JSON.parse(readFileSync("content/models.json", "utf8"));
const routes = getRoutes();
const site = getSiteUrl();
const expectedPaths = routes.map(({ path }) => path).sort();
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
const expectedSitemap = routes.map(({ path }) => `${site}${path}`).sort();
const htmlFiles = [];

function scan(directory, prefix = "") {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relative = join(prefix, entry.name);
    if (entry.isDirectory()) scan(join(directory, entry.name), relative);
    else if (entry.name.endsWith(".html")) htmlFiles.push(relative.replaceAll("\\", "/"));
  }
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;");
}

scan("out");
const routeHtmlPaths = htmlFiles.filter((file) => file.endsWith("/index.html") || file === "index.html").map((file) => file === "index.html" ? "/" : `/${file.slice(0, -"/index.html".length)}/`).sort();
if (JSON.stringify(routeHtmlPaths) !== JSON.stringify(expectedPaths)) failures.push(`exported content routes differ from the eight-page allowlist: ${routeHtmlPaths.join(", ")}`);
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemap)) failures.push("sitemap.xml must contain exactly the eight allowlisted canonical URLs");
if (htmlFiles.some((file) => file !== "404.html" && file !== "index.html" && !file.endsWith("/index.html"))) failures.push(`unexpected standalone HTML output: ${htmlFiles.filter((file) => file !== "404.html" && file !== "index.html" && !file.endsWith("/index.html")).join(", ")}`);
if (htmlFiles.some((file) => ["404/index.html", "_not-found/index.html"].includes(file))) failures.push("internal Next.js 404 route artifacts must not be exposed as public paths");

const robotsPath = "out/robots.txt";
if (!existsSync(robotsPath)) failures.push("missing robots.txt");
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes("Allow: /") || !robots.includes("/models/")) failures.push("robots.txt must allow the site and Jev model path");
  if (!robots.includes(`${site}/sitemap.xml`)) failures.push("robots.txt must reference sitemap.xml");
  if (/Disallow:\s*\/models\//i.test(robots)) failures.push("robots.txt must not block /models/");
}

const metadata = [];
for (const route of routes) {
  const output = join("out", route.path, "index.html");
  if (!existsSync(output)) {
    failures.push(`${route.path}: missing exported page`);
    continue;
  }
  const html = readFileSync(output, "utf8");
  try {
    if (injectCspMeta(html) !== html) failures.push(`${route.path}: missing CSP meta or script hashes do not match this document`);
  } catch (error) {
    failures.push(`${route.path}: CSP validation failed: ${error.message}`);
  }
  const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0] ?? "";
  if (!canonical.includes(`href="${site}${route.path}"`)) failures.push(`${route.path}: incorrect canonical`);
  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0] ?? "";
  if (!/content="index, follow"/.test(robots)) failures.push(`${route.path}: page must be index, follow`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
  if (title !== escapeHtml(route.title)) failures.push(`${route.path}: title does not match route registry (${title})`);
  if (description !== escapeHtml(route.description)) failures.push(`${route.path}: description does not match route registry`);
  metadata.push({ path: route.path, title, description });

  for (const match of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const localPath = href.split(/[?#]/)[0];
    const target = join("out", localPath, localPath.endsWith("/") ? "index.html" : "");
    if (!existsSync(target)) failures.push(`${route.path}: broken local link ${href}`);
  }
  if (/href="\/(tools|guides|best|alternatives|mcp|self-hosted|stacks|disclosure|editorial-policy|contact)\//.test(html)) failures.push(`${route.path}: legacy internal URL remains`);
  if (/Approximately 20%|Cash affiliate|commission terms|approvedDigest/.test(html)) failures.push(`${route.path}: historical commercial research is exposed`);
}

if (new Set(metadata.map(({ title }) => title)).size !== routes.length) failures.push("page titles must be unique");
if (new Set(metadata.map(({ description }) => description)).size !== routes.length) failures.push("page descriptions must be unique");

const pricingHtml = readFileSync("out/pricing/index.html", "utf8");
for (const model of models) {
  if (!pricingHtml.includes(model.name)) failures.push(`/pricing/: missing model ${model.id}`);
  if (!pricingHtml.includes(model.lastVerifiedAt)) failures.push(`/pricing/: missing last verified date for ${model.id}`);
  const pricingSource = model.sources.find((source) => /pricing/i.test(source.label));
  if (!pricingSource || !pricingHtml.includes(pricingSource.url)) failures.push(`/pricing/: missing official pricing source for ${model.id}`);
}
if (!pricingHtml.includes("Off-peak") || !pricingHtml.includes("Peak window:") || !pricingHtml.includes("all other hours are off-peak")) failures.push("/pricing/: DeepSeek peak and off-peak schedules must be explicit");
if (!pricingHtml.includes("https://api-docs.deepseek.com/news/news260910/")) failures.push("/pricing/: legacy DeepSeek V4 Pro routing note must link to its official announcement");

const calculatorHtml = readFileSync("out/calculator/index.html", "utf8");
if (!calculatorHtml.replaceAll("<!-- -->", "").includes("Estimated using the Standard schedule.")) failures.push("/calculator/: estimates must identify their selected pricing schedule");

const compareHtml = readFileSync("out/compare/index.html", "utf8");
if (!compareHtml.includes("Pricing schedule") || !compareHtml.includes("DeepSeek Off-peak and Peak rates are separate time-based prices")) failures.push("/compare/: comparison must label pricing schedules and explain DeepSeek time-based rates");

const jevHtml = readFileSync("out/models/jev/index.html", "utf8");
for (const source of models.find(({ id }) => id === "jev")?.sources ?? []) {
  if (!jevHtml.includes(source.url)) failures.push(`/models/jev/: missing official source ${source.url}`);
}
if (!jevHtml.includes("Not publicly specified") && !jevHtml.includes("Not publicly available")) failures.push("/models/jev/: unknown context or cached pricing should be explicit");
if (!jevHtml.includes("Not token-billed") || jevHtml.includes("$0.000000")) failures.push("/models/jev/: output-token pricing must not render numeric zero");
if (!jevHtml.includes("Jev is TypeSafe AI") || !jevHtml.includes("not a traditional generative LLM")) failures.push("/models/jev/: System One product distinction is missing");

const notFound = readFileSync("out/404.html", "utf8");
if (!/name="robots" content="noindex, follow"/.test(notFound)) failures.push("404 page must be noindex, follow");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Artifact checks passed: ${routes.length} exported content pages, ${sitemapUrls.length} sitemap URLs, dated official pricing sources, canonicals, metadata, robots, and 404 aliases.`);
}
