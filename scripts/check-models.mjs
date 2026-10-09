import { readFileSync } from "node:fs";
import { getRoutes } from "../lib/routes.mjs";

const models = JSON.parse(readFileSync(new URL("../content/models.json", import.meta.url), "utf8"));
const allowedHosts = {
  openai: new Set(["developers.openai.com"]),
  anthropic: new Set(["platform.claude.com"]),
  google: new Set(["ai.google.dev", "blog.google", "deepmind.google"]),
  deepseek: new Set(["api-docs.deepseek.com"]),
  typesafe: new Set(["typesafe.ai", "docs.typesafe.ai"]),
};
const expectedRoutes = ["/", "/pricing/", "/calculator/", "/compare/", "/compare/gpt-6-1-sol-vs-astra/", "/compare/haiku-5-5-vs-luna-6/", "/compare/fable-5-1-vs-opus-5-5/", "/compare/opus-5-5-vs-astra/", "/models/jev/", "/models/gemini-4-argon/", "/about/", "/privacy/", "/terms/"];
const landingRoutes = new Map([["jev", "/models/jev/"], ["gemini-4-argon", "/models/gemini-4-argon/"]]);
const errors = [];
const ids = new Set();

function validPricingDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?$/.test(value) && Number.isFinite(Date.parse(value));
}

if (JSON.stringify(getRoutes().map(({ path }) => path)) !== JSON.stringify(expectedRoutes)) {
  errors.push("route registry must match the exact thirteen-page approved allowlist");
}

for (const model of models) {
  const at = `model ${model.id ?? "(missing id)"}`;
  if (!model.id || ids.has(model.id)) errors.push(`${at}: missing or duplicate id`);
  ids.add(model.id);
  const hasApiModelId = typeof model.apiModelId === "string" && model.apiModelId.trim().length > 0;
  if (!model.name || !model.provider?.id || !model.provider?.name || (!hasApiModelId && model.apiModelId !== null)) errors.push(`${at}: missing identity fields`);
  if (model.pricing?.currency !== "USD" || model.pricing?.unit !== "1M tokens") errors.push(`${at}: pricing currency and token unit must be explicit`);
  const pricingStatus = model.pricingStatus;
  if (!["public", "announced", "not_public"].includes(pricingStatus)) errors.push(`${at}: invalid pricingStatus`);
  if (!Array.isArray(model.schedules) || !model.schedules.length) errors.push(`${at}: no pricing schedules`);
  if (!model.schedules?.some(({ id }) => id === model.defaultSchedule)) errors.push(`${at}: default schedule is missing`);
  if (new Set(model.schedules?.map(({ id }) => id)).size !== model.schedules?.length) errors.push(`${at}: duplicate pricing schedule id`);
  if (!model.sources?.length || !model.sources.some(({ label }) => /pricing/i.test(label))) errors.push(`${at}: official pricing source is missing`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(model.lastVerifiedAt ?? "")) errors.push(`${at}: lastVerifiedAt must be an ISO date`);
  if (model.contextWindow !== null && (!Number.isInteger(model.contextWindow) || model.contextWindow <= 0)) errors.push(`${at}: contextWindow must be a positive integer or null`);
  if (model.outputTokenLimit != null && (!Number.isInteger(model.outputTokenLimit) || model.outputTokenLimit <= 0)) errors.push(`${at}: outputTokenLimit must be a positive integer or null`);
  if (model.landingPath !== (landingRoutes.get(model.id) ?? null)) errors.push(`${at}: only the explicitly approved Jev and Gemini 4 Argon landing pages may have detail routes`);
  const landing = model.landing;
  const validFaq = Array.isArray(landing?.faq) && landing.faq.length > 0 && landing.faq.every((item) => item && typeof item.question === "string" && item.question.trim() && typeof item.answer === "string" && item.answer.trim());
  const validBenchmarks = landing?.benchmarks == null || (Array.isArray(landing.benchmarks) && landing.benchmarks.every((item) => item && typeof item.name === "string" && item.name.trim() && typeof item.result === "string" && item.result.trim() && typeof item.note === "string" && item.note.trim()));
  if (model.landingPath && (!landing || [landing.category, landing.heading, landing.summary, landing.apiAccessNote].some((value) => typeof value !== "string" || !value.trim()) || !validFaq || !validBenchmarks)) errors.push(`${at}: an approved landing route requires complete structured content and FAQ answers`);
  if (!model.landingPath && landing) errors.push(`${at}: landing content is only allowed for an explicitly approved model route`);

  for (const schedule of model.schedules ?? []) {
    if (schedule.input !== null && (typeof schedule.input !== "number" || !Number.isFinite(schedule.input) || schedule.input < 0)) errors.push(`${at}/${schedule.id}: invalid input rate`);
    if (schedule.output !== "not_applicable" && schedule.output !== null && (typeof schedule.output !== "number" || !Number.isFinite(schedule.output) || schedule.output < 0)) errors.push(`${at}/${schedule.id}: invalid output rate`);
    for (const key of ["cachedInput", "cacheWrite"]) {
      if (schedule[key] != null && (typeof schedule[key] !== "number" || !Number.isFinite(schedule[key]) || schedule[key] < 0)) errors.push(`${at}/${schedule.id}: invalid ${key} rate`);
    }
    if (schedule.priceType != null && !["standard", "introductory", "time_based"].includes(schedule.priceType)) errors.push(`${at}/${schedule.id}: invalid priceType`);
    if (schedule.cacheWriteOptions != null) {
      if (!Array.isArray(schedule.cacheWriteOptions)) errors.push(at + "/" + schedule.id + ": cacheWriteOptions must be an array");
      else for (const option of schedule.cacheWriteOptions) {
        if (!option || typeof option.label !== "string" || !option.label.trim() || typeof option.rate !== "number" || !Number.isFinite(option.rate) || option.rate < 0) errors.push(at + "/" + schedule.id + ": invalid cache write option");
      }
    }
    if (schedule.longContext) {
      const tier = schedule.longContext;
      if (!Number.isInteger(tier.threshold) || tier.threshold <= 0) errors.push(at + "/" + schedule.id + ": longContext threshold must be a positive integer");
      if (tier.input !== null && (typeof tier.input !== "number" || !Number.isFinite(tier.input) || tier.input < 0)) errors.push(at + "/" + schedule.id + ": invalid longContext input rate");
      if (tier.output !== "not_applicable" && tier.output !== null && (typeof tier.output !== "number" || !Number.isFinite(tier.output) || tier.output < 0)) errors.push(at + "/" + schedule.id + ": invalid longContext output rate");
      for (const key of ["cachedInput", "cacheWrite"]) {
        if (tier[key] != null && (typeof tier[key] !== "number" || !Number.isFinite(tier[key]) || tier[key] < 0)) errors.push(at + "/" + schedule.id + ": invalid longContext " + key + " rate");
      }
      if (tier.cacheWriteOptions != null) {
        if (!Array.isArray(tier.cacheWriteOptions)) errors.push(at + "/" + schedule.id + ": longContext cacheWriteOptions must be an array");
        else for (const option of tier.cacheWriteOptions) {
          if (!option || typeof option.label !== "string" || !option.label.trim() || typeof option.rate !== "number" || !Number.isFinite(option.rate) || option.rate < 0) errors.push(at + "/" + schedule.id + ": invalid longContext cache write option");
        }
      }
    }
    for (const key of ["validFrom", "validUntil"]) {
      if (schedule[key] != null && !validPricingDate(schedule[key])) errors.push(`${at}/${schedule.id}: ${key} must be an ISO date or UTC timestamp`);
    }
    if (schedule.validFrom && schedule.validUntil && Date.parse(schedule.validFrom) > Date.parse(schedule.validUntil)) errors.push(`${at}/${schedule.id}: validFrom is after validUntil`);
    if (schedule.nextPricing != null) {
      const next = model.schedules.find(({ id }) => id === schedule.nextPricing.scheduleId);
      const nextValidFrom = schedule.nextPricing.validFrom;
      if (!next || (nextValidFrom !== null && !validPricingDate(nextValidFrom)) || next.validFrom !== nextValidFrom) errors.push(`${at}/${schedule.id}: nextPricing must reference a schedule with the same validFrom`);
    }
    if (schedule.pricingSchedule != null) {
      const pricingSchedule = schedule.pricingSchedule;
      if (!["standard", "effective_date", "time_of_day"].includes(pricingSchedule.type)) errors.push(`${at}/${schedule.id}: invalid pricingSchedule type`);
      if (pricingSchedule.type === "time_of_day" && (!pricingSchedule.timezone || !pricingSchedule.window || !["peak", "off_peak"].includes(pricingSchedule.period))) errors.push(`${at}/${schedule.id}: time_of_day pricingSchedule needs a timezone, period, and window`);
    }
    if (schedule.pricingNotes != null && (!Array.isArray(schedule.pricingNotes) || schedule.pricingNotes.some((note) => typeof note !== "string" || !note.trim()))) errors.push(`${at}/${schedule.id}: pricingNotes must be non-empty strings`);
    if ("effectiveFrom" in schedule || "effectiveTo" in schedule || "scheduleNote" in schedule) errors.push(`${at}/${schedule.id}: use validFrom, validUntil, and pricingNotes instead of legacy schedule fields`);
  }

  if (pricingStatus === "not_public" && model.schedules.some((schedule) => [schedule.input, schedule.output, schedule.cachedInput, schedule.cacheWrite, ...(schedule.cacheWriteOptions ?? []).map(({ rate }) => rate), ...(schedule.additionalPrices ?? []).map(({ rate }) => rate), ...(schedule.longContext ? [schedule.longContext.input, schedule.longContext.cachedInput, schedule.longContext.output] : [])].some((value) => typeof value === "number"))) errors.push(`${at}: not_public pricing cannot contain numeric token rates`);
  if (pricingStatus === "not_public" && model.schedules.some((schedule) => typeof schedule.longContext?.cacheWrite === "number" || (Array.isArray(schedule.longContext?.cacheWriteOptions) && schedule.longContext.cacheWriteOptions.some((option) => typeof option?.rate === "number")))) errors.push(at + ": not_public pricing cannot contain numeric prompt-tier cache-write rates");
  if (pricingStatus === "announced" && !model.schedules.some(({ input, output }) => typeof input === "number" || typeof output === "number")) errors.push(`${at}: announced pricing must retain at least one officially announced numeric rate`);

  if (model.provider.id === "deepseek") {
    const periods = new Set(model.schedules.map(({ pricingSchedule }) => pricingSchedule?.type === "time_of_day" ? pricingSchedule.period : null));
    if (!periods.has("off_peak") || !periods.has("peak")) errors.push(`${at}: DeepSeek must expose both off_peak and peak schedules`);
  }
  if (model.id === "jev" && model.schedules.some(({ output }) => output !== "not_applicable")) errors.push("Jev output-token pricing must be marked not_applicable, never numeric zero");
  if (model.id === "gemini-4-argon" && (pricingStatus !== "announced" || model.outputTokenLimit !== 1000000 || model.contextWindow !== null)) errors.push("Gemini 4 Argon must preserve announced pricing, a 1M output limit, and an unknown input context window");

  for (const source of model.sources ?? []) {
    try {
      const url = new URL(source.url);
      if (url.protocol !== "https:" || !allowedHosts[model.provider.id]?.has(url.hostname)) errors.push(`${at}: non-official or insecure source ${source.url}`);
    } catch {
      errors.push(`${at}: invalid source URL ${source.url}`);
    }
  }
}

if (models.filter(({ landingPath }) => landingPath).length !== landingRoutes.size) errors.push("only the two approved model landing pages may be registered");
for (const provider of Object.keys(allowedHosts)) {
  if (!models.some((model) => model.provider.id === provider)) errors.push(`missing provider data: ${provider}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Model data passed: ${models.length} source-backed records; ${expectedRoutes.length} explicit public routes.`);
}
