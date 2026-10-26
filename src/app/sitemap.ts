import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/data/projects";
import { site } from "@/lib/site";

/**
 * `site.url` stays empty until NEXT_PUBLIC_SITE_URL is set for the production
 * deploy. Falling back to localhost keeps the generated XML valid instead of
 * emitting a broken "https://" origin.
 * TODO: set NEXT_PUBLIC_SITE_URL once the domain is live.
 */
const BASE_URL = (site.url || "http://localhost:3000").replace(/\/+$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // case-study detail routes live at /work/<slug>
    ...caseStudyProjects.map((project) => ({
      url: `${BASE_URL}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
