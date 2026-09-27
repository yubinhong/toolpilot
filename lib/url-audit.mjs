import { HUBS } from './routes.mjs';

export const URL_AUDIT_HEADER = ['url', 'status', 'title', 'page_type', 'indexed', 'has_backlink', 'action', 'redirect_target', 'notes'];

function csvCell(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function pageType(path) {
  if (path === '/') return 'homepage';
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 1 && HUBS[segments[0]]) return `${segments[0]}-hub`;
  if (segments.length === 1) return 'static-page';
  return `${segments[0]}-detail`;
}

export function buildUrlAuditCsv(routes) {
  const rows = routes.map(route => [
    route.path,
    'source-registered',
    route.title,
    pageType(route.path),
    'unknown',
    'unknown',
    'preserve-current-route',
    '',
    `Present in source route registry. Registry index eligibility is ${route.index ? 'yes' : 'no'}; live HTTP status, actual indexing, backlinks and historical URL coverage are unknown.`,
  ]);
  return [URL_AUDIT_HEADER, ...rows].map(row => row.map(csvCell).join(',')).join('\n') + '\n';
}
