import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/* Nothing is hidden from a crawler — the site is the brochure. The sitemap line
   is what tells a bot where to look instead of making it guess the routes. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
