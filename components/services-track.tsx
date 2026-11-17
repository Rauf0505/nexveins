"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Globe, MagnifyingGlass, Megaphone, Robot, TerminalWindow } from "@phosphor-icons/react";

const services = [
  {
    title: "System Software Development",
    icon: TerminalWindow,
    summary: "Software that runs your daily operations in one place.",
    points: ["POS Systems", "CRM Systems", "ERP Solutions", "Business Management Software", "Custom SaaS Applications"],
    image: "/services/system-software-development.jpg",
    alt: "Abstract illustration of stacked modular panels interlocking into a structure, drawn in cyan line-work on a dark navy background.",
  },
  {
    title: "Website Development",
    icon: Globe,
    summary: "Fast websites that turn visitors into enquiries.",
    points: ["Business Websites", "E-commerce Websites", "Portfolio Websites", "Landing Pages", "Custom Web Applications"],
    image: "/services/website-development.jpg",
    alt: "Abstract illustration of translucent browser window frames floating in receding perspective, drawn in cyan line-work on a dark navy background.",
  },
  {
    title: "Social Media Marketing",
    icon: Megaphone,
    summary: "A recognisable brand, in front of the right people.",
    points: ["Social Media Management", "Content Strategy", "Social Media Campaigns", "Brand Awareness", "Digital Advertising"],
    image: "/services/social-media-marketing.jpg",
    alt: "Abstract illustration of a glowing hub sending out concentric ripples with small content cards orbiting along them, in cyan on a dark navy background.",
  },
  {
    title: "SEO Optimization",
    icon: MagnifyingGlass,
    summary: "Be found in search before they ever contact you.",
    points: ["On-Page SEO", "Technical SEO", "Keyword Research", "Website Optimization", "Content Optimization"],
    image: "/services/seo-optimization.jpg",
    alt: "Abstract illustration of a rising chart made of thin glowing strokes over contour lines, with a magnifying glass catching the light, in cyan on a dark navy background.",
  },
  {
    title: "AI Automation",
    icon: Robot,
    summary: "Repetitive work moved off your team, done the same way every time.",
    points: ["AI Chatbots", "Business Workflow Automation", "AI-Powered Tools", "Automated Customer Support", "Intelligent Business Processes"],
    image: "/services/ai-automation.jpg",
    alt: "Abstract illustration of curved neural pathways converging on a softly glowing core with streams of light particles, in cyan on a dark navy background.",
  },
];

export function ServicesTrack() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const travelValue = useMotionValue(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, travelValue], ([progress, distance]: number[]) => -progress * distance);

  /* The pinned slide only runs on desktop with motion allowed; otherwise the
     row is a native swipe container and the focus has to be measured instead. */
  const isPinned = () => window.matchMedia("(min-width: 821px) and (prefers-reduced-motion: no-preference)").matches;

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const measure = () => travelValue.set(Math.max(0, row.scrollWidth - document.documentElement.clientWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [travelValue]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!isPinned()) return;
    const last = services.length - 1;
    setFocusIndex(Math.min(last, Math.max(0, Math.round(progress * last))));
  });

  useEffect(() => {
    const stage = stageRef.current;
    const row = rowRef.current;
    if (!stage || !row) return;
    const cards = Array.from(row.querySelectorAll<HTMLElement>(".service-card"));
    let frame = 0;
    const settle = () => {
      frame = 0;
      if (isPinned()) return;
      const centre = stage.getBoundingClientRect().left + stage.clientWidth / 2;
      let closest = Number.POSITIVE_INFINITY;
      let nearest = 0;
      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - centre);
        if (distance < closest) {
          closest = distance;
          nearest = index;
        }
      });
      setFocusIndex(nearest);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(settle);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    row.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      row.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div className="services-track">
      <div className="page-wrap">
        <Reveal className="section-heading">
          <p className="eyebrow"><span className="eyebrow-mark" /> Services</p>
          <h2 id="services-title">Solutions that move your <span>business forward.</span></h2>
        </Reveal>
        <Reveal className="services-hint" delay={0.1}>
          <span>Keep scrolling</span>
          <span className="services-hint-arrow" aria-hidden="true">
            <svg viewBox="0 0 44 8" width="44" height="8" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M0 4h40M36 1l4 3-4 3" />
            </svg>
          </span>
          <span>five services, one slide</span>
        </Reveal>
      </div>

      <div className="service-pin" ref={pinRef}>
        <div className="service-stage" ref={stageRef}>
          <motion.div className="service-row" ref={rowRef} style={{ x }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className={`service-card${index === focusIndex ? " is-focus" : ""}`} key={service.title}>
                  <div className="service-card-media">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      width={1400}
                      height={800}
                      sizes="(max-width: 820px) min(80vw, 380px), min(42vw, 600px)"
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={85}
                      decoding="async"
                    />
                    <span className="service-card-number">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="service-card-body">
                    <span className="service-card-icon"><Icon size={22} weight="light" aria-hidden="true" /></span>
                    <h3>{service.title}</h3>
                    <p className="service-card-summary">{service.summary}</p>
                    <ul className="service-card-points">
                      {service.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
