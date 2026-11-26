import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { SITE_URL, absolute } from "@/lib/seo";

/* Every page the site has, and nothing it does not. The list is built from the
   same service records the pages are built from, so a new service appears in the
   sitemap the moment it appears on the site — and never before. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absolute("/services"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/projects"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/about"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: absolute("/contact"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  for (const service of services) {
    pages.push({
      url: absolute(`/services/${service.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return pages;
}
