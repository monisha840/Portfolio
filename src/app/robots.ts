import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Empty until NEXT_PUBLIC_SITE_URL is set for the production deploy. */
const BASE_URL = site.url.replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // robots.txt requires an absolute Sitemap URL, so these two directives are
    // only emitted once the production origin is actually known.
    // TODO: set NEXT_PUBLIC_SITE_URL to turn them on.
    ...(BASE_URL ? { sitemap: `${BASE_URL}/sitemap.xml`, host: BASE_URL } : {}),
  };
}
