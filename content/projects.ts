export type Project = {
  name: string;
  tags: string;
  description: string;
  image: string;
  alt: string;
  url: string;
  host: string;
};

/* The four live builds, in the order home shows them. Plain data with no icons
   so server route files can import it — @phosphor-icons/react calls createContext
   at module scope, which a server component cannot evaluate. */
export const projects: Project[] = [
  {
    name: "German Fitness",
    tags: "E-commerce • Gym • Web",
    description: "A fitness and equipment storefront presenting training services, premium brands and product discovery for a gym audience.",
    image: "/projects/german-fitness.jpg",
    alt: "German Fitness website: a barbell photo behind the headline “Become Unstoppable”, with navigation for brands, products and services.",
    url: "https://thegermanfitness.com/",
    host: "thegermanfitness.com",
  },
  {
    name: "RoyalCarHub",
    tags: "Car Rental • Booking • Web",
    description: "Premium car rental across 127+ locations in Pakistan — browse the fleet by city and class, then book through WhatsApp or the enquiry form.",
    image: "/projects/royalcarhub.jpg",
    alt: "RoyalCarHub homepage: the headline “Premium Car Rental in Pakistan” over a dark street scene with a luxury car, a red Browse Cars button and navigation for All Cars, Categories and Cities.",
    url: "https://royalcarhub.com/",
    host: "royalcarhub.com",
  },
  {
    name: "ServePilot",
    tags: "SaaS • Point of Sale • Web",
    description: "A restaurant management and POS platform that brings checkout, inventory, menu work, staff operations and reporting into one workspace.",
    image: "/projects/servepilot.jpg",
    alt: "ServePilot website: the headline “Run every service with confidence” beside a dashboard preview showing daily sales, orders and low stock.",
    url: "https://nexveins.vercel.app/",
    host: "nexveins.vercel.app",
  },
  {
    name: "Arch ERP",
    tags: "ERP • Construction & Interiors • Live demo",
    description: "Business management for construction and interior projects — jobs, clients, cash in and out, labour, vendors and reports in one workspace, installable from the browser.",
    image: "/projects/arch-erp.jpg",
    alt: "Arch ERP dashboard: a dark sidebar listing projects, customers, cash in and out, labour, contractors and vendors, beside an Operations Overview with four summary cards, a cash flow chart and a budget panel.",
    url: "https://arch-demo-inky.vercel.app/login",
    host: "arch-demo-inky.vercel.app",
  },
];
