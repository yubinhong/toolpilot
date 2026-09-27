import assert from "node:assert/strict";
import test from "node:test";
import { categories, tools } from "../lib/catalog.mjs";
import { content } from "../lib/content.mjs";
import {
  categoryAnchor,
  getHomepageContent,
  HOME_CATEGORY_SHORTCUTS,
  HOME_COMPARISON_SLUGS,
} from "../lib/homepage.mjs";

test("homepage category shortcuts point to non-empty catalog groups with unique anchors", () => {
  const anchors = HOME_CATEGORY_SHORTCUTS.map(item => categoryAnchor(item.category));
  assert.equal(new Set(anchors).size, anchors.length);
  for (const item of HOME_CATEGORY_SHORTCUTS) {
    assert.ok(categories.includes(item.category));
    assert.ok(tools.some(tool => tool.category === item.category));
  }
  assert.equal(categoryAnchor("Developer Infrastructure"), "category-developer-infrastructure");
});

test("homepage comparisons use existing plan-listed drafts and never claim popularity", () => {
  const home = getHomepageContent(content);
  assert.deepEqual(home.comparisons.map(record => record.slug), HOME_COMPARISON_SLUGS);
  assert.ok(home.comparisons.every(record => record.kind === "compare" && record.review.state !== "published"));
});

test("pricing updates display record dates and preserve review state", () => {
  const home = getHomepageContent(content);
  const expected = content.filter(record => record.kind === "pricing").sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.title.localeCompare(right.title));
  assert.deepEqual(home.pricingUpdates.map(record => [record.slug, record.updatedAt, record.review.state]), expected.map(record => [record.slug, record.updatedAt, record.review.state]));
});

test("recently verified tools require both publication and a verification date", () => {
  const home = getHomepageContent(content);
  const eligible = content.filter(record => record.kind === "tools" && record.review.state === "published" && record.verifiedAt);
  assert.deepEqual(home.recentlyVerified.map(record => record.slug), eligible.map(record => record.slug));
  assert.ok(home.recentlyVerified.every(record => record.verifiedAt && record.review.state === "published"));
  assert.equal(home.recentlyVerified.length, 0);
});
