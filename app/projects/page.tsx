import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";
import "./projects.css";

export const metadata: Metadata = {
  title: "Projects | NexVeins®",
  description:
    "Four live builds from NexVeins — ServePilot, Arch ERP, German Fitness and RoyalCarHub — with the screenshots, what each one does and links to the products running today.",
  keywords: ["projects", "case studies", "ServePilot", "Arch ERP", "German Fitness", "RoyalCarHub"],
  openGraph: {
    title: "Projects | NexVeins®",
    description: "Restaurant POS, construction ERP, a fitness storefront and a car rental platform — all live, all openable in a new tab.",
    type: "website",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
