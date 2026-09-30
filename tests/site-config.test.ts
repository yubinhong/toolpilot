import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_SITE_URL, getSiteUrl } from "../lib/site-config.mjs";
import { getRoutes } from "../lib/routes.mjs";

test("route registry contains the exact eight V1 routes, each indexable", () => {
  assert.deepEqual(getRoutes().map(({ path }) => path), ["/", "/pricing/", "/calculator/", "/compare/", "/models/jev/", "/about/", "/privacy/", "/terms/"]);
  assert.ok(getRoutes().every((route) => route.index));
});

test("only the approved Jev model landing page is in the registry", () => {
  assert.equal(getRoutes().some(({ path }) => path === "/models/"), false);
  assert.equal(getRoutes().filter(({ path }) => path.startsWith("/models/")).length, 1);
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
