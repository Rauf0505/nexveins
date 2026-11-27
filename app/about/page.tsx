import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import "./about.css";

const TITLE = "About NexVeins® | The studio behind the software";
const DESCRIPTION =
  "How NexVeins works: read the business before writing code, agree the outcome, then build software, websites, SEO and AI automation backwards from it.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
  keywords: ["about NexVeins", "software house", "product engineering studio", "custom software", "AI automation"],
  ogTitle: "The studio behind the software",
  ogLabel: "About the studio",
});

const aboutGraph = graph([
  webPageNode({ path: "/about", title: TITLE, description: DESCRIPTION, type: "AboutPage" }),
  breadcrumbNode([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
]);

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <StructuredData data={aboutGraph} />
    </>
  );
}
