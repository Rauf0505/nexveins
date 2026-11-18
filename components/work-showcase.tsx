"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

type Project = {
  name: string;
  tags: string;
  description: string;
  image: string;
  alt: string;
  url: string;
  host: string;
};

const projects: Project[] = [
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
];

export function WorkShowcase() {
  const rows: { start: number; items: Project[] }[] = [];
  for (let start = 0; start < projects.length; start += 2) rows.push({ start, items: projects.slice(start, start + 2) });

  return (
    <div className="project-stack">
      {rows.map((row) => (
        <ProjectRow key={row.start} items={row.items} start={row.start} />
      ))}
    </div>
  );
}

function ProjectRow({ items, start }: { items: Project[]; start: number }) {
  const ref = useRef<HTMLDivElement>(null);

  /* One reading for the row, shared by both plates, so the pair always opens on
     the same beat. Measuring each plate separately would let the taller one
     finish later than its neighbour. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  return (
    <div className="project-row" ref={ref}>
      {items.map((project, offset) => (
        <ProjectPlate key={project.name} project={project} number={start + offset + 1} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function ProjectPlate({ project, number, progress }: { project: Project; number: number; progress: MotionValue<number> }) {
  const still = useReducedMotion() === true;

  /* The shot is unveiled from its top edge down and settles from a slight
     over-crop, so scrolling back closes it again. Progress runs from the row's
     top edge appearing at the bottom of the screen until the row sits in the
     middle of it. */
  const curtain = useTransform(progress, [0, 0.72], [100, 0]);
  const clip = useMotionTemplate`inset(0% 0% ${curtain}% 0%)`;
  const zoom = useTransform(progress, [0, 1], [1.14, 1]);
  const textY = useTransform(progress, [0.1, 0.94], [26, 0]);
  const textOpacity = useTransform(progress, [0.08, 0.6], [0, 1]);

  return (
    <article className="project-plate">
      <a className="plate-media-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on ${project.host}`}>
        <div className="plate-media">
          <motion.div className="plate-shot" style={still ? undefined : { clipPath: clip, scale: zoom }}>
            <Image src={project.image} alt={project.alt} width={1400} height={933} sizes="(max-width: 760px) 84vw, (max-width: 1100px) 84vw, 41vw" loading={number === 1 ? "eager" : "lazy"} decoding="async" />
          </motion.div>
          <span className="plate-open" aria-hidden="true"><ArrowUpRight size={20} weight="bold" /></span>
        </div>
      </a>

      <motion.div className="plate-meta" style={still ? undefined : { y: textY, opacity: textOpacity }}>
        <p className="plate-tags">{project.tags}</p>
        <div className="plate-name">
          <span className="plate-arrow" aria-hidden="true"><ArrowRight size={22} weight="light" /></span>
          <h3>{project.name}</h3>
        </div>
        <p className="plate-note">{project.description}</p>
      </motion.div>
    </article>
  );
}
