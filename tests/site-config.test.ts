import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { DEFAULT_SITE_URL, getSiteUrl } from "../lib/site-config.mjs";
import { getRoutes } from "../lib/routes.mjs";
import { pageMetadata } from "../lib/metadata.ts";

test("route registry contains the exact thirteen approved routes, each indexable", () => {
  assert.deepEqual(getRoutes().map(({ path }) => path), ["/", "/pricing/", "/api-cost-calculator/", "/compare/", "/compare/gpt-6-1-sol-vs-astra/", "/compare/haiku-5-5-vs-luna-6/", "/compare/fable-5-1-vs-opus-5-5/", "/compare/opus-5-5-vs-astra/", "/models/jev/", "/models/gemini-4-argon/", "/about/", "/privacy/", "/terms/"]);
  assert.ok(getRoutes().every((route) => route.index));
});

test("the old calculator URL is only an exact redirect and is not an indexable route", () => {
  assert.equal(getRoutes().some(({ path }) => path === "/calculator/"), false);
  assert.equal(readFileSync(new URL("../public/_redirects", import.meta.url), "utf8"), "/calculator /api-cost-calculator/ 301\n/calculator/ /api-cost-calculator/ 301\n");
});

test("only the two approved trend-model landing pages are in the registry", () => {
  assert.equal(getRoutes().some(({ path }) => path === "/models/"), false);
  assert.deepEqual(getRoutes().filter(({ path }) => path.startsWith("/models/")).map(({ path }) => path), ["/models/jev/", "/models/gemini-4-argon/"]);
});

test("every approved route has a self-canonical and index-follow metadata", () => {
  for (const route of getRoutes()) {
    const metadata = pageMetadata(route.path);
    assert.equal(metadata.alternates?.canonical, `${DEFAULT_SITE_URL}${route.path}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.deepEqual(metadata.openGraph?.images, [{ url: `${DEFAULT_SITE_URL}/og-toolpilot.png`, width: 1200, height: 630, alt: "ToolPilot AI model pricing comparison" }]);
    assert.equal((metadata.twitter as { card?: string } | undefined)?.card, "summary_large_image");
  }
});

test("site config removes trailing slashes from the canonical origin", () => {
  const previousUrl = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.test///";
  try {
    assert.equal(getSiteUrl(), "https://example.test");
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousUrl;
  }
  assert.equal(DEFAULT_SITE_URL, "https://toolpilot.cc");
});

test("site config rejects invalid or credential-bearing canonical origins", () => {
  const previousUrl = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    for (const invalid of ["javascript:alert(1)", "https://user:secret@example.com", "https://example.com/base", "https://example.com?token=private"]) {
      process.env.NEXT_PUBLIC_SITE_URL = invalid;
      assert.throws(() => getSiteUrl(), /NEXT_PUBLIC_SITE_URL/);
    }
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousUrl;
  }
});
