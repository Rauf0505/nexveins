import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { StructuredData } from "@/components/structured-data";
import { findService, services } from "@/content/services";
import { breadcrumbNode, graph, serviceNode, webPageNode } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import "../services.css";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return { title: "Service not found | NexVeins®", robots: { index: false } };
  return pageSeo({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: [service.title, ...service.points.map((point) => point.label), "NexVeins"],
    ogTitle: service.title,
    ogDescription: service.summary,
    ogLabel: "Service",
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = findService((await params).slug);
  if (!service) return notFound();
  const path = `/services/${service.slug}`;
  const detailGraph = graph([
    webPageNode({ path, title: service.metaTitle, description: service.metaDescription }),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path },
    ]),
    serviceNode(service),
  ]);
  return (
    <>
      <ServiceDetail service={service} />
      <StructuredData data={detailGraph} />
    </>
  );
}
