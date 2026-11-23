import type { Metadata } from "next";
import { ServicesContent } from "@/components/services-content";
import "./services.css";

export const metadata: Metadata = {
  title: "Services | NexVeins®",
  description:
    "System software development, website development, social media marketing, SEO optimization and AI automation — what each one covers, who it suits and how NexVeins works on it.",
  keywords: ["services", "system software development", "website development", "social media marketing", "SEO", "AI automation"],
  openGraph: {
    title: "Services | NexVeins®",
    description: "Five disciplines, one team: custom systems, websites, social media, SEO and AI automation — each with its own detail page.",
    type: "website",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
