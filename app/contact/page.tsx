import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbNode, graph, webPageNode } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import "./contact.css";

const TITLE = "Contact NexVeins® | Start a Software Project";
const DESCRIPTION =
  "Talk to NexVeins about a project — call, email, WhatsApp or send the brief from this page. Nothing is stored on the site; your email app does the sending.";

export const metadata: Metadata = pageSeo({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
  keywords: ["contact NexVeins", "start a project", "software enquiry", "hire a development studio", "NexVeins"],
  ogTitle: "Tell us what you want to build",
  ogLabel: "Start a project",
});

const contactGraph = graph([
  webPageNode({ path: "/contact", title: TITLE, description: DESCRIPTION, type: "ContactPage" }),
  breadcrumbNode([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
]);

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <StructuredData data={contactGraph} />
    </>
  );
}
