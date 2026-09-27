const profile = process.env.SMOKE_PROFILE || 'current';
if (profile === 'legacy') {
  await import('./smoke-legacy.mjs');
} else if (profile !== 'current') {
  throw new Error('SMOKE_PROFILE must be current or legacy');
} else {
  const { getRoutes } = await import('../lib/routes.mjs');
  const { getSiteUrl } = await import('../lib/site-config.mjs');
  const base = new URL(process.argv.find(a => a.startsWith('--base-url='))?.slice(11) || process.env.SMOKE_BASE_URL || 'https://toolpilot.cc');
  if (!['http:','https:'].includes(base.protocol) || base.username || base.password) throw new Error('Invalid smoke base URL');
  const routes = getRoutes();
  const failures = [];
  const queue = [...routes];
  const get = path => fetch(new URL(path,base),{signal:AbortSignal.timeout(20000),redirect:'manual'});
  await Promise.all(Array.from({length:4},async () => {
    while (queue.length) {
      const r = queue.shift();
      try {
        const response = await get(r.path); const html = await response.text();
        if (response.status !== 200) throw new Error(`expected 200; got ${response.status}`);
        const tag = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0] || '';
        if (r.index ? !/content="index,/.test(tag) : !/content="noindex,/.test(tag)) throw new Error('index directive mismatch');
        if (!html.includes(`rel="canonical" href="${getSiteUrl()}${r.path}"`)) throw new Error('canonical mismatch');
        if (/^\/(tools|compare|alternatives|pricing|best|guides)\/[^/]+\/$/.test(r.path) && !r.index && !/draft|review pending/i.test(html)) throw new Error('missing review marker');
      } catch (e) { failures.push(`${r.path}: ${e.message}`); }
    }
  }));
  try {
    const sitemap = await get('/sitemap.xml'); const xml = await sitemap.text();
    if (sitemap.status !== 200) throw new Error('sitemap not HTTP 200');
    const actual = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).sort();
    const expected = routes.filter(r => r.index).map(r => getSiteUrl()+r.path).sort();
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error('sitemap differs from this source version');
    const robots = await get('/robots.txt');
    if (robots.status !== 200 || !(await robots.text()).includes(`${getSiteUrl()}/sitemap.xml`)) throw new Error('robots mismatch');
    if ((await get('/nonexistent-toolpilot-smoke/')).status !== 404) throw new Error('unknown URL must return 404');
  } catch (e) { failures.push(e.message); }
  if (failures.length) { console.error(failures.join('\n')); process.exitCode=1; }
  else console.log(`Smoke passed: ${routes.length} pages, robots, sitemap and real 404 (${profile}).`);
}
