import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact | NexVeins®",
  description:
    "Talk to NexVeins about a project — call, email, WhatsApp or send the brief from this page. Nothing is stored on the website; your email app does the sending.",
  keywords: ["contact", "enquiry", "start a project", "NexVeins"],
  openGraph: {
    title: "Contact | NexVeins®",
    description: "Three ways to reach the studio, plus a brief form that writes the email for you.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
