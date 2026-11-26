import type { Metadata } from "next";

/* One place where the site describes itself. Canonicals, the sitemap, the share
   cards and every JSON-LD node read from here, so the address the search engine
   is told and the address a crawler finds can never disagree — a split between
   those two is the most common way a small site loses its ranking. */
export const SITE_URL = "https://nexveins.com";
export const SITE_NAME = "NexVeins";
export const SITE_DESCRIPTION =
  "NexVeins builds custom business software, fast websites, SEO and AI automation for teams turning complex ideas into systems people actually use.";
export const SITE_EMAIL = "info@nexveins.com";
export const SITE_PHONE = "+923193360773";
export const SITE_PHONE_LABEL = "+92 319 336 0773";

/* The home page is the route the root layout describes, and its own structured
   data repeats the same two lines — one place, so they cannot drift. */
export const HOME_TITLE = "Custom Software, Websites, SEO & AI Automation | NexVeins®";
export const HOME_OG_TITLE = "NexVeins® — custom software, websites, SEO and AI automation";
export const HOME_OG_DESCRIPTION =
  "Product thinking, design craft and serious engineering in one close-knit team. Systems, websites, search, social and automation built backwards from the outcome you want.";

export const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/nex-veins/" },
  { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61594916004272" },
  { label: "Instagram", url: "https://www.instagram.com/nexveins/" },
  { label: "WhatsApp", url: "https://wa.me/923193360773" },
];

/* The two nodes every page points back to, so the graph is one connected thing
   instead of a pile of pages that each invent their own company. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}

/** The branded 1200×630 card a shared link renders with (app/api/og). */
export function ogUrl({ title, text, label }: { title: string; text?: string; label?: string }) {
  const params = new URLSearchParams({ title });
  if (label) params.set("label", label);
  if (text) params.set("text", text);
  return absolute(`/api/og?${params.toString()}`);
}

/**
 * Metadata for one page: the full title as it should appear in the tab and the
 * result, a description that fits inside the snippet, the canonical address, and
 * the same words handed to Open Graph and Twitter in the large-image shape.
 */
export function pageSeo({
  title,
  description,
  path,
  keywords,
  ogTitle,
  ogDescription,
  ogLabel,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogLabel?: string;
  type?: "website" | "article";
}): Metadata {
  const card = { title: ogTitle ?? title, description: ogDescription ?? description };
  const image = ogUrl({ title: card.title, text: card.description, label: ogLabel });
  const alt = `${title} — ${SITE_NAME}`;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      ...card,
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      ...card,
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
  };
}
