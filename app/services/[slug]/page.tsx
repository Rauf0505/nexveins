import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { findService, services } from "@/content/services";
import "../services.css";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return { title: "Service not found | NexVeins®" };
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [service.title, ...service.points.map((point) => point.label), "NexVeins"],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = findService((await params).slug);
  if (!service) return notFound();
  return <ServiceDetail service={service} />;
}
