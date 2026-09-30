import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site-config.mjs";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [{ userAgent: "*", allow: ["/", "/models/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
