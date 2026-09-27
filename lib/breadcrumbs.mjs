import { getRoute } from './routes.mjs';

export function getBreadcrumbItems(path) {
  const route = getRoute(path);
  if (!route || route.path === '/') return [];

  const items = [{ label: 'Home', href: '/' }];
  const segments = route.path.split('/').filter(Boolean);
  let parentPath = '';

  for (const segment of segments.slice(0, -1)) {
    parentPath += `/${segment}/`;
    const parent = getRoute(parentPath);
    if (parent) items.push({ label: parent.title, href: parent.path });
  }

  items.push({ label: route.title, href: route.path, current: true });
  return items;
}

export function breadcrumbList(items, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };
}

export function serializeJsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
