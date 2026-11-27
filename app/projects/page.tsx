import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbNode, collectionNode, graph, projectsListNode, webPageNode } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import "./projects.css";

const TITLE = "Selected Work — Live Software Built by NexVeins®";
const DESCRIPTION =
  "Four live builds: German Fitness and RoyalCarHub storefronts, ServePilot restaurant POS and Arch ERP for construction — each one openable in a new tab.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/projects",
  keywords: ["software case studies", "POS system", "ERP software", "web applications", "NexVeins projects"],
  ogTitle: "Selected work — four products running today",
  ogLabel: "Selected work",
});

const projectsGraph = graph([
  webPageNode({ path: "/projects", title: TITLE, description: DESCRIPTION }),
  collectionNode({ path: "/projects", title: TITLE, description: DESCRIPTION }),
  breadcrumbNode([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]),
  projectsListNode(),
]);

export default function ProjectsPage() {
  return (
    <>
      <ProjectsContent />
      <StructuredData data={projectsGraph} />
    </>
  );
}
