import type { MetadataRoute } from 'next';
import { getRoutes } from '../lib/routes.mjs';
import { getSiteUrl } from '../lib/site-config.mjs';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return getRoutes().map(r => ({ url: `${getSiteUrl()}${r.path}` }));
}
