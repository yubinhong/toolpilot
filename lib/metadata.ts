import type { Metadata } from 'next';
import { getRoute } from './routes.mjs';
import { getSiteUrl } from './site-config.mjs';

export function pageMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) return { title: 'Page not found', robots: { index: false, follow: true } };
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `${getSiteUrl()}${path}` },
    robots: { index: route.index, follow: true },
    openGraph: { title: route.title, description: route.description, url: `${getSiteUrl()}${path}`, type: 'website' },
  };
}
