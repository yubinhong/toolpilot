import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_SITE_URL, getSiteUrl } from "../lib/site-config.mjs";
import { getRoutes } from "../lib/routes.mjs";
import { pageMetadata } from "../lib/metadata.ts";

test("route registry contains the exact thirteen approved routes, each indexable", () => {
  assert.deepEqual(getRoutes().map(({ path }) => path), ["/", "/pricing/", "/calculator/", "/compare/", "/compare/gpt-6-1-sol-vs-astra/", "/compare/haiku-5-5-vs-luna-6/", "/compare/fable-5-1-vs-opus-5-5/", "/compare/opus-5-5-vs-astra/", "/models/jev/", "/models/gemini-4-argon/", "/about/", "/privacy/", "/terms/"]);
  assert.ok(getRoutes().every((route) => route.index));
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
