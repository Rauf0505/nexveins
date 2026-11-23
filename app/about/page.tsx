import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";
import "./about.css";

export const metadata: Metadata = {
  title: "About NexVeins® | The studio behind the software",
  description:
    "How NexVeins works: understand the business before writing code, agree what success looks like, then build custom systems, websites, SEO and AI automation backwards from it.",
  keywords: ["about NexVeins", "software house", "digital studio", "custom software", "AI automation"],
  openGraph: {
    title: "About NexVeins® | The studio behind the software",
    description: "Creativity, technology and innovation applied to real business problems — custom systems, websites, marketing, SEO and AI automation.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
