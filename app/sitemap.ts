import type { MetadataRoute } from "next";
import { guides, tools } from "../lib/catalog.mjs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toolpilot.cc";
  const staticRoutes = [
    "",
    "/tools",
    "/compare",
    "/alternatives",
    "/stacks",
    "/guides",
    "/about",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: "monthly" as const })),
    ...tools.map((tool) => ({ url: `${siteUrl}/tools/${tool.slug}`, changeFrequency: "monthly" as const })),
    ...guides.map((guide) => ({ url: `${siteUrl}/guides/${guide.slug}`, changeFrequency: "monthly" as const })),
  ];
}
