import type { Metadata } from 'next';
import { getRoute } from './routes.mjs';
import { getSiteUrl } from './site-config.mjs';

export function pageMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) return { title: { absolute: "Page not found | ToolPilot" }, robots: { index: false, follow: true } };
  const canonical = `${getSiteUrl()}${path}`;
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title: route.title, description: route.description, url: canonical, type: 'website' },
    twitter: { card: 'summary', title: route.title, description: route.description },
  };
}
