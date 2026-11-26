import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

/* The name a phone shows if someone adds the site to a home screen, and the
   colour behind it. Cheap to declare, and it stops the browser inventing both. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NexVeins® — custom software, websites, SEO and AI automation",
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050914",
    theme_color: "#050914",
    lang: "en",
    dir: "ltr",
    icons: [
      { src: "/nexveins-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/nexveins-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
