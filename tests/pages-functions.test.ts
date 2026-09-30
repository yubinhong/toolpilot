import assert from "node:assert/strict";
import test from "node:test";
import { notFoundResponse } from "../functions/_not-found.ts";

test("special Cloudflare Pages 404 aliases return noindex 404 responses with security headers", async () => {
  const response = notFoundResponse();
  const html = await response.text();
  assert.equal(response.status, 404);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(response.headers.get("content-security-policy") ?? "", /default-src 'none'/);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, follow");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});
