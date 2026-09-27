import { writeFileSync } from 'node:fs';
import { getRoutes } from '../lib/routes.mjs';
import { buildUrlAuditCsv } from '../lib/url-audit.mjs';

writeFileSync('docs/url-audit.csv', buildUrlAuditCsv(getRoutes()));
console.log(`Wrote source-only URL inventory for ${getRoutes().length} registered routes.`);
