import type { Metadata } from 'next';
import { getRoute } from './routes.mjs';
import { getSiteUrl } from './site-config.mjs';

export function pageMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) return { title: 'Page not found', robots: { index: false, follow: true } };
  const imageUrl = `${getSiteUrl()}/og-default.png`;
  const image = { url: imageUrl, width: 1200, height: 630, alt: 'ToolPilot developer tool decision guide' };
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `${getSiteUrl()}${path}` },
    robots: { index: route.index, follow: true },
    openGraph: { title: route.title, description: route.description, url: `${getSiteUrl()}${path}`, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title: route.title, description: route.description, images: [imageUrl] },
  };
}
