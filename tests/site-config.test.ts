import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_SITE_URL, getSiteUrl } from "../lib/site-config.mjs";

import { getRoutes } from "../lib/routes.mjs";

test("site config keeps static routes unique and local", () => {
  const STATIC_ROUTES = getRoutes().map(r => r.path);
  assert.equal(new Set(STATIC_ROUTES).size, STATIC_ROUTES.length);
  assert.ok(STATIC_ROUTES.every((route) => route === "" || route.startsWith("/")));
});

test("home metadata matches the rebuild plan", () => {
  const home = getRoutes().find(route => route.path === "/");
  assert.equal(home?.title, "ToolPilot — Compare AI & Developer Tools");
  assert.equal(home?.description, "Compare AI coding tools, developer platforms and AI agents by pricing, features, self-hosting, MCP support and real-world use cases.");
});

test("trust pages use the rebuild plan names without adding duplicate routes", () => {
  const routes = getRoutes();
  assert.deepEqual(
    routes.filter(route => ["/editorial-policy/", "/disclosure/"].includes(route.path)).map(({ path, title, index }) => ({ path, title, index })),
    [
      { path: "/editorial-policy/", title: "Methodology", index: true },
      { path: "/disclosure/", title: "Affiliate Disclosure", index: true },
    ],
  );
  assert.equal(routes.some(route => ["/methodology/", "/affiliate-disclosure/"].includes(route.path)), false);
});

test("site config removes trailing slashes from the public site URL", () => {
  const previousUrl = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.test///";

  try {
    assert.equal(getSiteUrl(), "https://example.test");
  } finally {
    if (previousUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = previousUrl;
    }
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
