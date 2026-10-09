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
if (JSON.stringify(routeHtmlPaths) !== JSON.stringify(expectedPaths)) failures.push(`exported content routes differ from the approved allowlist: ${routeHtmlPaths.join(", ")}`);
if (JSON.stringify(sitemapUrls) !== JSON.stringify(expectedSitemap)) failures.push("sitemap.xml must contain exactly the approved canonical URLs");
if (htmlFiles.some((file) => file !== "404.html" && file !== "index.html" && !file.endsWith("/index.html"))) failures.push(`unexpected standalone HTML output: ${htmlFiles.filter((file) => file !== "404.html" && file !== "index.html" && !file.endsWith("/index.html")).join(", ")}`);
if (htmlFiles.some((file) => ["404/index.html", "_not-found/index.html"].includes(file))) failures.push("internal Next.js 404 route artifacts must not be exposed as public paths");

const robotsPath = "out/robots.txt";
if (!existsSync(robotsPath)) failures.push("missing robots.txt");
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes("Allow: /") || !robots.includes("/models/")) failures.push("robots.txt must allow the site and approved model paths");
  if (!robots.includes(`${site}/sitemap.xml`)) failures.push("robots.txt must reference sitemap.xml");
  if (/Disallow:\s*\/models\//i.test(robots)) failures.push("robots.txt must not block /models/");
}

const faviconPath = "out/favicon.svg";
if (!existsSync(faviconPath)) failures.push("missing exported favicon.svg");
else if (!/viewBox="0 0 48 48"/.test(readFileSync(faviconPath, "utf8"))) failures.push("favicon.svg must be a valid 48px vector site icon");

const metadata = [];
for (const route of routes) {
  const output = join("out", route.path, "index.html");
  if (!existsSync(output)) {
    failures.push(`${route.path}: missing exported page`);
    continue;
  }
  const html = readFileSync(output, "utf8");
  const iconLink = [...html.matchAll(/<link\b[^>]*>/g)].some(([link]) => /\brel="icon"/.test(link) && /\bhref="\/favicon\.svg(?:\?[^"]*)?"/.test(link));
  if (!iconLink) failures.push(`${route.path}: missing favicon link`);
  if (!html.includes('class="brand-mark"') || !html.includes('src="/favicon.svg"')) failures.push(`${route.path}: missing shared header brand icon`);
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
if (!pricingHtml.includes("Gemini 4 Argon") || !pricingHtml.includes("API model ID not published") || !pricingHtml.includes("effective date not announced") || !pricingHtml.includes("$2.00") || !pricingHtml.includes("$10.00")) failures.push("/pricing/: Gemini 4 Argon must show officially announced rates and its unpublished API ID and schedule date");
if (!pricingHtml.includes("/models/gemini-4-argon/") || !pricingHtml.includes("Context Not public") || !pricingHtml.includes("Max output 1,000,000 tokens")) failures.push("/pricing/: Argon landing link, unknown context, and documented output-token limit must be visible");
if (!pricingHtml.includes("Off-peak") || !pricingHtml.includes("Peak window:") || !pricingHtml.includes("all other hours are off-peak")) failures.push("/pricing/: DeepSeek peak and off-peak schedules must be explicit");
if (!pricingHtml.includes("https://api-docs.deepseek.com/news/news260910/")) failures.push("/pricing/: legacy DeepSeek V4 Pro routing note must link to its official announcement");

const calculatorHtml = readFileSync("out/calculator/index.html", "utf8");
if (!calculatorHtml.replaceAll("<!-- -->", "").includes("Estimated using the Standard schedule.")) failures.push("/calculator/: estimates must identify their selected pricing schedule");
if (!calculatorHtml.includes("Gemini 4 Argon") || !calculatorHtml.includes("How AI API cost is calculated")) failures.push("/calculator/: Argon must be selectable and cost calculation guidance must be present");

const compareHtml = readFileSync("out/compare/index.html", "utf8");
if (!compareHtml.includes("Pricing schedule") || !compareHtml.includes("DeepSeek Off-peak and Peak rates are separate time-based prices")) failures.push("/compare/: comparison must label pricing schedules and explain DeepSeek time-based rates");
if (!compareHtml.includes("Gemini 4 Argon")) failures.push("/compare/: Gemini 4 Argon must be selectable for comparison");
if (!compareHtml.includes("/compare/gpt-6-1-sol-vs-astra/")) failures.push("/compare/: focused GPT 6.1 Sol vs Astra article must have an internal link");

const solVsAstraHtml = readFileSync("out/compare/gpt-6-1-sol-vs-astra/index.html", "utf8");
const articleHtml = solVsAstraHtml.match(/<article\b[^>]*class="[^"]*\bseo-comparison\b[^"]*"[\s\S]*?<\/article>/)?.[0] ?? "";
const articleText = articleHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const keyword = "gpt 6.1 sol vs astra";
const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const keywordCount = [...articleText.matchAll(new RegExp(escapedKeyword, "gi"))].length;
const hanCount = [...articleText].filter((character) => /\p{Script=Han}/u.test(character)).length;
const articleWordCount = [...new Intl.Segmenter("zh-CN", { granularity: "word" }).segment(articleText)].filter(({ isWordLike }) => isWordLike).length;
const keywordWordCount = keyword.split(/\s+/u).length;
const keywordDensity = articleWordCount ? keywordCount * keywordWordCount / articleWordCount * 100 : 0;
if (!articleHtml) failures.push("/compare/gpt-6-1-sol-vs-astra/: missing article content");
if (hanCount < 600 || hanCount > 1000) failures.push(`/compare/gpt-6-1-sol-vs-astra/: expected 600-1,000 Han characters, found ${hanCount}`);
if (keywordDensity < 3 || keywordDensity > 5) failures.push(`/compare/gpt-6-1-sol-vs-astra/: expected 3-5% keyword density, found ${keywordDensity.toFixed(2)}% (${keywordCount}/${articleWordCount} words)`);
for (let level = 1; level <= 6; level += 1) {
  const headings = [...articleHtml.matchAll(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "gi"))];
  const text = headings[0]?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase() ?? "";
  if (headings.length !== 1 || !text.includes(keyword)) failures.push(`/compare/gpt-6-1-sol-vs-astra/: keyword must appear in one H${level} heading`);
}
const solModel = models.find(({ id }) => id === "gpt-6-1-sol");
const astraModel = models.find(({ id }) => id === "gpt-6-astra");
for (const model of [solModel, astraModel]) {
  for (const source of model?.sources ?? []) {
    if (!solVsAstraHtml.includes(source.url)) failures.push(`/compare/gpt-6-1-sol-vs-astra/: missing official source ${source.url}`);
  }
  if (model && !solVsAstraHtml.includes(model.lastVerifiedAt)) failures.push(`/compare/gpt-6-1-sol-vs-astra/: missing verification date for ${model.id}`);
}
for (const source of ["https://openai.com/index/introducing-gpt-6-1-sol/", "https://developers.openai.com/api/docs/guides/prompt-caching"]) {
  if (!solVsAstraHtml.includes(source)) failures.push(`/compare/gpt-6-1-sol-vs-astra/: missing official source ${source}`);
}

const homeHtml = readFileSync("out/index.html", "utf8");
if (!homeHtml.includes("Gemini 4 Argon") || !homeHtml.includes("API model ID not published") || !homeHtml.includes("Context Not public") || !homeHtml.includes("Max output 1,000,000 tokens") || !homeHtml.includes("Estimate cost")) failures.push("/: Gemini 4 Argon must appear in discovery with unknown input context, official output limit, and calculator link");
const popularCount = [...homeHtml.matchAll(/class="model-card"/g)].length;
if (popularCount < 5 || popularCount > 6) failures.push(`/: Popular Models must contain 5-6 records; found ${popularCount}`);
const latestStart = homeHtml.indexOf("id=\"latest-heading\"");
const pricingPreviewStart = homeHtml.indexOf("id=\"pricing-preview-heading\"");
const latestHtml = latestStart >= 0 && pricingPreviewStart > latestStart ? homeHtml.slice(latestStart, pricingPreviewStart) : "";
const latestCount = [...latestHtml.matchAll(/<article\b/g)].length;
if (latestCount < 3 || latestCount > 5) failures.push(`/: Latest Models must contain 3-5 records; found ${latestCount}`);
for (const match of homeHtml.matchAll(/href="(\/models\/[^"]+)"/g)) {
  if (!["/models/jev/", "/models/gemini-4-argon/"].includes(match[1])) failures.push(`/: unapproved model detail link ${match[1]}`);
}

const jevHtml = readFileSync("out/models/jev/index.html", "utf8");
for (const source of models.find(({ id }) => id === "jev")?.sources ?? []) {
  if (!jevHtml.includes(source.url)) failures.push(`/models/jev/: missing official source ${source.url}`);
}
if (!jevHtml.includes("Not publicly specified") && !jevHtml.includes("Not publicly available")) failures.push("/models/jev/: unknown context or cached pricing should be explicit");
if (!jevHtml.includes("Not token-billed") || jevHtml.includes("$0.000000")) failures.push("/models/jev/: output-token pricing must not render numeric zero");
if (!jevHtml.includes("Jev is TypeSafe AI") || !jevHtml.includes("not a traditional generative LLM")) failures.push("/models/jev/: System One product distinction is missing");
for (const question of ["What is Jev AI?", "Is Jev an LLM?", "How much does the Jev API cost?", "How do I access the Jev API?"]) {
  if (!jevHtml.includes(question)) failures.push(`/models/jev/: missing FAQ ${question}`);
}

const argonHtml = readFileSync("out/models/gemini-4-argon/index.html", "utf8");
for (const source of models.find(({ id }) => id === "gemini-4-argon")?.sources ?? []) {
  if (!argonHtml.includes(source.url)) failures.push(`/models/gemini-4-argon/: missing official source ${source.url}`);
}
for (const answer of ["Gemini 4 Argon Pricing &amp; API Access", "September 30, 2026", "Not publicly listed", "1,000,000 tokens", "Google-reported benchmark results", "$2", "$10"]) {
  if (!argonHtml.includes(answer)) failures.push(`/models/gemini-4-argon/: missing answer-first model content ${answer}`);
}
for (const question of ["What is Gemini 4 Argon?", "Is Gemini 4 Argon available through the Gemini API?", "How much does Gemini 4 Argon cost?", "What is the Gemini 4 Argon token limit?", "How can I access Gemini 4 Argon?", "When will Gemini 4 Argon be publicly available?"]) {
  if (!argonHtml.includes(question)) failures.push(`/models/gemini-4-argon/: missing FAQ ${question}`);
}

const notFound = readFileSync("out/404.html", "utf8");
if (!/name="robots" content="noindex, follow"/.test(notFound)) failures.push("404 page must be noindex, follow");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Artifact checks passed: ${routes.length} exported content pages, ${sitemapUrls.length} sitemap URLs, dated official pricing sources, canonicals, metadata, robots, and 404 aliases. The GPT 6.1 Sol vs Astra article has ${hanCount} Han characters and ${keywordDensity.toFixed(2)}% keyword density.`);
}
