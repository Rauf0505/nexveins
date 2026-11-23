"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Globe, MagnifyingGlass, Megaphone, Robot, TerminalWindow } from "@phosphor-icons/react";

const services = [
  {
    title: "System Software Development",
    slug: "system-software-development",
    icon: TerminalWindow,
    summary: "Software that runs your daily operations in one place.",
    points: ["POS Systems", "CRM Systems", "ERP Solutions", "Business Management Software", "Custom SaaS Applications"],
    image: "/services/system-software-development.jpg",
    ratio: "1537 / 1023",
    alt: "A developer at a desk, seen from behind, typing in front of a monitor whose screen shows a dark code editor carrying the words System Software and Smart solutions. Stronger business. beside a glowing gear.",
  },
  {
    title: "Website Development",
    slug: "website-development",
    icon: Globe,
    summary: "Fast websites that turn visitors into enquiries.",
    points: ["Business Websites", "E-commerce Websites", "Portfolio Websites", "Landing Pages", "Custom Web Applications"],
    image: "/services/website-development.jpg",
    ratio: "3 / 2",
    alt: "A hand pointing at a WEB DESIGN label on a blue board, ringed by handwritten boxes reading Layout, Content, Homepage, Publish, Media, Hosting, Design, CSS, CMS, Internet and Usability.",
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    icon: Megaphone,
    summary: "A recognisable brand, in front of the right people.",
    points: ["Social Media Management", "Content Strategy", "Social Media Campaigns", "Brand Awareness", "Digital Advertising"],
    image: "/services/social-media-marketing.jpg",
    ratio: "1537 / 1023",
    alt: "A bright blue illustration headed Social Media Marketing — Build your brand. Engage your audience. Grow your business. — with three icon rows reading increase brand awareness, engage your audience and drive traffic & boost sales, beside a phone and a megaphone ringed by the Facebook, Instagram, Twitter, YouTube and LinkedIn logos.",
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    icon: MagnifyingGlass,
    summary: "Be found in search before they ever contact you.",
    points: ["On-Page SEO", "Technical SEO", "Keyword Research", "Website Optimization", "Content Optimization"],
    image: "/services/seo-optimization.jpg",
    ratio: "3 / 2",
    alt: "A pale blue illustration headed Boost Your Website SEO — Rank Higher. Get Found. Grow More. — with four icon rows reading keyword research, on-page optimization, quality backlinks and fast & mobile friendly, beside a monitor showing SEO above a rising green arrow, with a search bar, two charts and a target.",
  },
  {
    title: "AI Automation",
    slug: "ai-automation",
    icon: Robot,
    summary: "Repetitive work moved off your team, done the same way every time.",
    points: ["AI Chatbots", "Business Workflow Automation", "AI-Powered Tools", "Automated Customer Support", "Intelligent Business Processes"],
    image: "/services/ai-automation.jpg",
    ratio: "3 / 2",
    alt: "A pale violet illustration headed AI Automation, Smarter workflows, Better Results: a robot on a monitor linked to a document, a database and an envelope, above four feature plates reading AI-Powered, Streamline, Boost Productivity and Reliable & Secure, with an Automate. Optimize. Grow. button.",
  },
];

/* How far above the bottom edge the cards rest while they travel. The same
   number is handed to the sticky rule, so the two cannot drift apart. */
const HOLD_GAP = 90;

export function ServicesTrack() {
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const travelValue = useMotionValue(0);
  /* Both ends of the sideways window are measured, not guessed. It opens the
     moment the cards stop being cropped on the way in, so the block arrives
     still, and the page itself pays for the travel: the section holds at the
     fold for exactly as far as the row has to move. */
  const anchorValue = useMotionValue(0);
  const spanValue = useMotionValue(1);
  const [hold, setHold] = useState({ travel: 0, block: 0 });
  const [framed, setFramed] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const { scrollY } = useScroll();
  const slideAt = (y: number) => Math.min(1, Math.max(0, (y - anchorValue.get()) / spanValue.get()));
  const x = useTransform([scrollY, anchorValue, spanValue, travelValue], ([y, anchor, span, distance]: number[]) => -Math.min(1, Math.max(0, (y - anchor) / span)) * distance);

  /* The pinned slide only runs on desktop with motion allowed; otherwise the
     row is a native swipe container and the focus has to be measured instead. */
  const isPinned = () => window.matchMedia("(min-width: 821px) and (prefers-reduced-motion: no-preference)").matches;

  useEffect(() => {
    const pin = pinRef.current;
    const frame = frameRef.current;
    const stage = stageRef.current;
    const row = rowRef.current;
    if (!pin || !frame || !stage || !row) return;
    const measure = () => {
      /* The travel runs to the row's own end, so the last card lands whole in the
         right corner when the hold closes. */
      const distance = Math.max(0, row.scrollWidth - stage.clientWidth);
      const block = frame.offsetHeight;
      travelValue.set(distance);
      /* The frame holds with the cards sitting low-centre — a hand's width clear of
         the bottom edge — and that is where the slide opens. */
      anchorValue.set(pin.getBoundingClientRect().top + window.scrollY + block + HOLD_GAP - window.innerHeight);
      spanValue.set(distance || 1);
      const travel = isPinned() && distance > 0 ? distance : 0;
      setHold((current) => (current.travel === travel && current.block === block ? current : { travel, block }));
    };
    measure();
    /* The hold opens at a fixed point of the page, so that point is re-read
       whenever anything above the cards changes the page's height. */
    const watcher = new ResizeObserver(measure);
    watcher.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      watcher.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [travelValue, anchorValue, spanValue]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isPinned()) return;
    setFramed(y >= anchorValue.get());
    const last = services.length - 1;
    setFocusIndex(Math.min(last, Math.max(0, Math.round(slideAt(y) * last))));
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
      /* Nothing is waiting on a scroll window here: the row swipes itself, and the
         section spends no extra height on a hold it cannot use. */
      setHold((current) => (current.travel === 0 && current.block === 0 ? current : { travel: 0, block: 0 }));
      setFramed(true);
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
      <div className="service-pin" ref={pinRef}>
        <div
          className={`service-frame${hold.travel > 0 ? " is-held" : ""}`}
          ref={frameRef}
          style={{ "--block-h": `${hold.block}px`, "--hold-gap": `${HOLD_GAP}px` } as CSSProperties}
        >
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> Services</p>
              <h2 id="services-title">Solutions that move your <span>business forward.</span></h2>
              <p className="services-lead">Software, websites, social media, search and automation — the parts that keep your business running and make it easy to find.</p>
            </Reveal>
          </div>

          <div className="service-stage" ref={stageRef}>
            <motion.div className={`service-row${framed ? " is-framed" : ""}`} ref={rowRef} style={{ x }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className={`service-card${index === focusIndex ? " is-focus" : ""}`} key={service.title}>
                  <div className="service-card-media" style={{ "--media-ratio": service.ratio } as CSSProperties}>
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 820px) min(80vw, 380px), min(42vw, 600px)"
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={85}
                      decoding="async"
                    />
                  </div>
                  <div className="service-card-body">
                    <span className="service-card-icon"><Icon size={22} weight="light" aria-hidden="true" /></span>
                    <h3>{service.title}</h3>
                    <p className="service-card-summary">{service.summary}</p>
                  </div>
                  <Link
                    className="service-card-link"
                    href={`/services/${service.slug}`}
                    aria-label={`View the ${service.title} service`}
                  />
                </article>
              );
            })}
            </motion.div>
          </div>
        </div>

        {/* The section spends exactly as much height as the row spends width, so the
            scroll that used to move the page is spent moving the cards. */}
        {hold.travel > 0 && <div className="service-hold" style={{ height: hold.travel }} aria-hidden="true" />}
      </div>
    </div>
  );
}
