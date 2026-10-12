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
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonical,
      type: 'website',
      images: [{ url: `${getSiteUrl()}/og-toolpilot.png`, width: 1200, height: 630, alt: 'ToolPilot AI model pricing comparison' }],
    },
    twitter: { card: 'summary_large_image', title: route.title, description: route.description, images: [`${getSiteUrl()}/og-toolpilot.png`] },
  };
}
