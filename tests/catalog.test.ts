import assert from "node:assert/strict";
import test from "node:test";
import { categories, decisionPages, tools } from "../lib/catalog.mjs";

test("catalog covers the initial ToolPilot categories", () => {
  assert.deepEqual(categories, [
    "AI Coding",
    "AI App Builders",
    "Databases",
    "Deployment",
    "Authentication",
    "Email & Marketing",
    "Automation",
    "Monitoring & Analytics",
    "SEO & Growth",
    "Developer Infrastructure",
  ]);
});

test("catalog contains the 50 research snapshot products", () => {
  const slugs = new Set(tools.map((tool) => tool.slug));
  const productUrls = new Set(tools.map((tool) => tool.productUrl));

  assert.equal(tools.length, 50);
  assert.equal(slugs.size, tools.length);
  assert.equal(productUrls.size, tools.length);
  assert.ok(tools.every((tool) => /^https:\/\//.test(tool.productUrl)));
  assert.ok(tools.every((tool) => tool.status === "Draft"));
  assert.ok(tools.every((tool) => tool.source === "Research snapshot 2026-08-20"));
  assert.ok(tools.every((tool) => ["cash-affiliate", "partner", "referral", "popular", "pending"].includes(tool.affiliateStatus)));
  assert.ok(tools.every((tool) => tool.verifiedAt === null));
  assert.ok(tools.every((tool) => tool.researchSnapshotDate === "2026-08-20"));
  assert.ok(tools.every((tool) => tool.reviewStatus === "pending-editorial"));
  assert.ok(tools.every((tool) => tool.reviewOwner === "TBD"));
  assert.ok(tools.every((tool) => tool.reviewedAt === null));
  assert.equal(tools.filter((tool) => tool.productLinkCheck.status === "http-ok").length, 42);
  assert.equal(tools.filter((tool) => tool.productLinkCheck.status === "reachable-restricted").length, 8);
  assert.equal(tools.filter((tool) => tool.sourceStatus === "provided").length, 45);
  assert.equal(tools.filter((tool) => tool.sourceStatus === "missing").length, 5);
  assert.equal(tools.filter((tool) => tool.sourceLinkCheck.status === "http-ok").length, 39);
  assert.equal(tools.filter((tool) => tool.sourceLinkCheck.status === "reachable-restricted").length, 6);
  assert.equal(tools.filter((tool) => tool.sourceLinkCheck.status === "missing").length, 5);
  assert.deepEqual(
    tools.filter((tool) => !tool.sourceUrl).map((tool) => tool.slug),
    ["docker", "neon", "railway", "render", "sentry"],
  );
  assert.ok(tools.filter((tool) => tool.sourceUrl).every((tool) => !tool.sourceUrl.includes("utm_source=")));
});

test("decision page entry points are unique and local", () => {
  const hrefs = decisionPages.map((page) => page.href);

  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.ok(hrefs.every((href) => href.startsWith("/")));
});
