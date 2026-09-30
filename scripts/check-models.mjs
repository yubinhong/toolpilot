import { readFileSync } from "node:fs";
import { getRoutes } from "../lib/routes.mjs";

const models = JSON.parse(readFileSync(new URL("../content/models.json", import.meta.url), "utf8"));
const allowedHosts = {
  openai: new Set(["developers.openai.com"]),
  anthropic: new Set(["platform.claude.com"]),
  google: new Set(["ai.google.dev"]),
  deepseek: new Set(["api-docs.deepseek.com"]),
  typesafe: new Set(["typesafe.ai", "docs.typesafe.ai"]),
};
const expectedRoutes = ["/", "/pricing/", "/calculator/", "/compare/", "/models/jev/", "/about/", "/privacy/", "/terms/"];
const errors = [];
const ids = new Set();

if (JSON.stringify(getRoutes().map(({ path }) => path)) !== JSON.stringify(expectedRoutes)) {
  errors.push("route registry must match the exact eight-page V1 allowlist");
}

for (const model of models) {
  const at = `model ${model.id ?? "(missing id)"}`;
  if (!model.id || ids.has(model.id)) errors.push(`${at}: missing or duplicate id`);
  ids.add(model.id);
  if (!model.name || !model.provider?.id || !model.provider?.name || !model.apiModelId) errors.push(`${at}: missing identity fields`);
  if (model.pricing?.currency !== "USD" || model.pricing?.unit !== "1M tokens") errors.push(`${at}: pricing currency and token unit must be explicit`);
  if (!Array.isArray(model.schedules) || !model.schedules.length) errors.push(`${at}: no pricing schedules`);
  if (!model.schedules?.some(({ id }) => id === model.defaultSchedule)) errors.push(`${at}: default schedule is missing`);
  if (!model.sources?.length || !model.sources.some(({ label }) => /pricing/i.test(label))) errors.push(`${at}: official pricing source is missing`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(model.lastVerifiedAt ?? "")) errors.push(`${at}: lastVerifiedAt must be an ISO date`);
  if (model.contextWindow !== null && (!Number.isInteger(model.contextWindow) || model.contextWindow <= 0)) errors.push(`${at}: contextWindow must be a positive integer or null`);
  if (model.landingPath && model.landingPath !== "/models/jev/") errors.push(`${at}: only Jev may have a detail landing page`);
  if (model.id === "jev" && model.landingPath !== "/models/jev/") errors.push("Jev must be the only explicit model landing page");
  if (model.id !== "jev" && model.landingPath !== null) errors.push(`${at}: model records do not generate detail routes`);

  for (const schedule of model.schedules ?? []) {
    for (const key of ["input", "output"]) {
      if (typeof schedule[key] !== "number" || !Number.isFinite(schedule[key]) || schedule[key] < 0) errors.push(`${at}/${schedule.id}: invalid ${key} rate`);
    }
    for (const key of ["cachedInput", "cacheWrite"]) {
      if (schedule[key] != null && (typeof schedule[key] !== "number" || !Number.isFinite(schedule[key]) || schedule[key] < 0)) errors.push(`${at}/${schedule.id}: invalid ${key} rate`);
    }
  }

  for (const source of model.sources ?? []) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:" || !allowedHosts[model.provider.id]?.has(url.hostname)) errors.push(`${at}: non-official or insecure source ${source.url}`);
    } catch {
      errors.push(`${at}: invalid source URL ${source.url}`);
    }
  }
}

if (models.filter(({ landingPath }) => landingPath).length !== 1) errors.push("exactly one model may have a detail landing page");
for (const provider of Object.keys(allowedHosts)) {
  if (!models.some((model) => model.provider.id === provider)) errors.push(`missing provider data: ${provider}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Model data passed: ${models.length} source-backed records; ${expectedRoutes.length} explicit public routes.`);
}
