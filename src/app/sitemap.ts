import type { MetadataRoute } from "next";
import { algorithms } from "@/data/algorithms";

export const dynamic = "force-static";

const baseUrl = "https://algograss.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...algorithms.map((algorithm) => ({
      url: `${baseUrl}/algorithms/${algorithm.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
