import { projects } from "@/content/projects";
import { services } from "@/content/services";
import type { Service } from "@/content/services";
import {
  ORG_ID,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_ID,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
  absolute,
  socials,
} from "@/lib/seo";

type Node = Record<string, unknown>;

/* Wraps whatever a page needs into one graph, so every node can point at the
   same organisation instead of describing the company from scratch each time. */
export function graph(nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/* The company, said once. No postal address and no city: the studio sells the
   work wherever it lands, and a LocalBusiness profile would aim the whole site
   at one place. */
export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: { "@type": "ImageObject", url: absolute("/nexveins-emblem.png"), width: 560, height: 423 },
    image: absolute("/nexveins-emblem.png"),
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    sameAs: socials.map((social) => social.url),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: SITE_EMAIL,
        telephone: SITE_PHONE,
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function webPageNode({
  path,
  title,
  description,
  type = "WebPage",
}: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage";
}): Node {
  return {
    "@type": type,
    "@id": `${absolute(path)}#webpage`,
    url: absolute(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function breadcrumbNode(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

/* One service, as the detail page describes it. Prices, timelines and client
   names are never stated here because the site does not state them anywhere. */
export function serviceNode(service: Service): Node {
  const path = `/services/${service.slug}`;
  return {
    "@type": "Service",
    "@id": `${absolute(path)}#service`,
    name: service.title,
    slogan: service.summary,
    description: service.metaDescription,
    url: absolute(path),
    image: absolute(service.image),
    serviceType: service.title,
    areaServed: "Worldwide",
    provider: { "@id": ORG_ID },
  };
}

export function servicesListNode(): Node {
  return {
    "@type": "ItemList",
    name: "NexVeins services",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absolute(`/services/${service.slug}`),
      name: service.title,
    })),
  };
}

/* The live builds, each pointing at the product running today — a crawler can
   follow the claim and see the software working. */
export function projectsListNode(): Node {
  return {
    "@type": "ItemList",
    name: "NexVeins projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        applicationCategory: "BusinessApplication",
        description: project.description,
        image: absolute(project.image),
        url: project.url,
        sameAs: project.url,
        publisher: { "@id": ORG_ID },
      },
    })),
  };
}

export function collectionNode({ path, title, description }: { path: string; title: string; description: string }): Node {
  return {
    "@type": "CollectionPage",
    "@id": `${absolute(path)}#collection`,
    url: absolute(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
  };
}
