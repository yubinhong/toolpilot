import assert from "node:assert/strict";
import test from "node:test";
import { getGoogleAnalyticsId, getSearchConsoleVerification } from "../lib/analytics-config.mjs";
import { trackEvent } from "../lib/analytics.ts";

test("analytics and Search Console configuration accept only expected public identifiers", () => {
  assert.equal(getGoogleAnalyticsId("G-ABC12345"), "G-ABC12345");
  assert.equal(getGoogleAnalyticsId("https://example.com"), null);
  assert.equal(getSearchConsoleVerification("A1b2_C3-d4e5"), "A1b2_C3-d4e5");
  assert.equal(getSearchConsoleVerification("<script>"), null);
});

test("tracking is disabled without GA4 configuration", () => {
  const previousId = process.env.NEXT_PUBLIC_GA_ID;
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const calls: unknown[][] = [];
  process.env.NEXT_PUBLIC_GA_ID = "";
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { origin: "https://toolpilot.cc", pathname: "/calculator/" }, gtag: (...args: unknown[]) => calls.push(args) } });
  try {
    trackEvent("calculator_use", { model_id: "jev" });
    assert.deepEqual(calls, []);
  } finally {
    if (previousId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previousId;
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});

test("tracking allowlists event fields and does not send calculator quantities", () => {
  const previousId = process.env.NEXT_PUBLIC_GA_ID;
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const calls: unknown[][] = [];
  process.env.NEXT_PUBLIC_GA_ID = "G-ABC12345";
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { origin: "https://toolpilot.cc", pathname: "/calculator/" }, gtag: (...args: unknown[]) => calls.push(args) } });
  try {
    const parameters = { model_id: "jev", input_tokens: 12000, requests_per_day: 45 };
    trackEvent("calculator_use", parameters);
    assert.deepEqual(calls, [["event", "calculator_use", { model_id: "jev", page_location: "https://toolpilot.cc/calculator/" }]]);
  } finally {
    if (previousId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previousId;
    if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
