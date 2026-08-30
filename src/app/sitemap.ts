import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getBaseUrl(),
      lastModified: new Date("2026-08-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
