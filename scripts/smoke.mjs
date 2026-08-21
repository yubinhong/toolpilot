const defaultBaseUrl = process.env.SMOKE_BASE_URL || "https://toolpilot.cc";
const cliBaseUrl = process.argv.find((argument) => argument.startsWith("--base-url="))?.slice(11);
const baseUrl = new URL(cliBaseUrl || defaultBaseUrl);

if (!/^https?:$/.test(baseUrl.protocol)) {
  throw new Error(`SMOKE_BASE_URL must use http or https: ${baseUrl.href}`);
}

const checks = [
  { path: "/", includes: ["research-derived drafts", "Editorial review"] },
  { path: "/tools/", includes: ["research-derived drafts", "Editorial review"] },
  { path: "/tools/digitalocean/", includes: ["Editorial review", "Pending"] },
  { path: "/tools/cloudways/", includes: ["Reachable but restricted", "Pending"] },
  { path: "/tools/docker/", includes: ["Missing from research snapshot", "Pending"] },
  { path: "/robots.txt", includes: ["Sitemap:"] },
  { path: "/sitemap.xml", includes: [] },
];

const failures = [];

for (const check of checks) {
  const target = new URL(check.path, baseUrl);

  try {
    const response = await fetch(target, {
      redirect: "follow",
      headers: { "user-agent": "toolpilot-smoke/1.0" },
      signal: AbortSignal.timeout(20_000),
    });
    const body = await response.text();

    console.log(`${check.path} ${response.status} ${response.url}`);

    if (response.status !== 200) {
      failures.push(`${check.path}: expected HTTP 200, received ${response.status}`);
    }

    for (const marker of check.includes) {
      if (!body.includes(marker)) {
        failures.push(`${check.path}: missing marker ${JSON.stringify(marker)}`);
      }
    }

    if (check.path === "/sitemap.xml") {
      const toolUrls = body.match(/<loc>[^<]*\/tools\/[^<]+<\/loc>/g) || [];
      if (toolUrls.length !== 50) {
        failures.push(`${check.path}: expected 50 tool URLs, found ${toolUrls.length}`);
      }
    }
  } catch (error) {
    failures.push(`${check.path}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error("Production smoke failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Smoke passed for ${baseUrl.origin}`);
}
