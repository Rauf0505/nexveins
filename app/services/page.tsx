import type { Metadata } from "next";
import { ServicesContent } from "@/components/services-content";
import { StructuredData } from "@/components/structured-data";
import { pageSeo } from "@/lib/seo";
import { breadcrumbNode, collectionNode, graph, servicesListNode, webPageNode } from "@/lib/schema";
import "./services.css";

const TITLE = "Custom Software, Website, SEO & AI Services | NexVeins®";
const DESCRIPTION =
  "Five services, one studio: system software, fast websites, social media marketing, SEO and AI automation — scoped around how your business actually works.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
  keywords: [
    "software development services",
    "custom system software",
    "website development services",
    "SEO services",
    "AI automation services",
    "social media marketing",
  ],
  ogTitle: "Services — systems, websites, search and automation",
  ogLabel: "What we build",
});

const servicesGraph = graph([
  webPageNode({ path: "/services", title: TITLE, description: DESCRIPTION }),
  collectionNode({ path: "/services", title: TITLE, description: DESCRIPTION }),
  breadcrumbNode([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
  servicesListNode(),
]);

export default function ServicesPage() {
  return (
    <>
      <ServicesContent />
      <StructuredData data={servicesGraph} />
    </>
  );
}
