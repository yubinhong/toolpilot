import assert from "node:assert/strict";
import test from "node:test";
import { estimateRequestCost, estimateUsage } from "../lib/model-cost.ts";
import { getActiveSchedule, getModel, models } from "../lib/models.ts";
import { getRoutes } from "../lib/routes.mjs";

const allowedRoutes = ["/", "/pricing/", "/calculator/", "/compare/", "/models/jev/", "/about/", "/privacy/", "/terms/"];

test("the public route registry is exactly the approved eight pages", () => {
  assert.deepEqual(getRoutes().map(({ path }) => path), allowedRoutes);
});

test("the shared model database includes official prices and dated official sources", () => {
  assert.ok(models.length > 8);
  assert.deepEqual(new Set(models.map((model) => model.provider.id)), new Set(["openai", "anthropic", "google", "deepseek", "typesafe"]));
  for (const model of models) {
    assert.deepEqual(model.pricing, { currency: "USD", unit: "1M tokens" }, model.id);
    assert.match(model.lastVerifiedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(model.sources.some(({ label }) => /pricing/i.test(label)), model.id);
    for (const source of model.sources) assert.equal(new URL(source.url).protocol, "https:");
  }
});

test("only Jev model data maps to an independent landing page", () => {
  assert.equal(getModel("jev")?.landingPath, "/models/jev/");
  assert.ok(models.filter((model) => model.landingPath).every((model) => model.id === "jev"));
  assert.equal(getRoutes().some(({ path }) => path === "/models/"), false);
});

test("cost estimate uses official long-context rates when the input threshold is exceeded", () => {
  const astra = getModel("gpt-6-astra");
  assert.ok(astra);
  const estimate = estimateRequestCost(astra, { inputTokens: 300000, outputTokens: 0 });
  assert.equal(estimate.usedLongContextRate, true);
  assert.equal(estimate.inputCost, 6);
});

test("current GPT-6.1 Sol and Gemini 3.8 Flash prices are available to shared model workflows", () => {
  const sol = getModel("gpt-6.1-sol");
  const gemini = getModel("gemini-3.8-flash");
  assert.ok(sol);
  assert.ok(gemini);
  assert.equal(sol.schedules[0].input, 2);
  assert.equal(sol.schedules[0].longContext?.threshold, 272000);
  assert.equal(sol.contextWindow, 1050000);
  assert.equal(gemini.schedules[0].input, 0.75);
  assert.equal(gemini.schedules[0].output, 3.75);
  assert.equal(gemini.schedules[0].effectiveTo, "2026-12-31");
  assert.equal(getActiveSchedule(gemini, "2027-01-01").input, 1.5);
  assert.equal(sol.landingPath, null);
  assert.equal(gemini.landingPath, null);
});

test("cached token share and monthly/annual workload estimates use the shared price schedule", () => {
  const flash = getModel("deepseek-flash");
  assert.ok(flash);
  const estimate = estimateUsage(flash, { inputTokens: 1000000, outputTokens: 1000000, cachedInputPercent: 50, requestsPerDay: 2 });
  assert.equal(estimate.requestCost, 0.6765);
  assert.ok(Math.abs(estimate.monthly - 40.59) < 0.000001);
  assert.ok(Math.abs(estimate.annual - 493.845) < 0.000001);
});

test("scheduled provider prices switch by effective date", () => {
  const flash = getModel("gemini-3-6-flash");
  assert.ok(flash);
  assert.equal(getActiveSchedule(flash, "2026-09-30").input, 0.75);
  assert.equal(getActiveSchedule(flash, "2027-01-01").input, 1.5);
});

test("Jev preserves public unknowns and its published zero output rate", () => {
  const jev = getModel("jev");
  assert.ok(jev);
  assert.equal(jev.contextWindow, null);
  assert.equal(jev.schedules[0].cachedInput, null);
  assert.equal(estimateRequestCost(jev, { inputTokens: 1000000, outputTokens: 1000000 }).requestCost, 0.042);
});
