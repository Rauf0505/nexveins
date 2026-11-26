"use client";

import {
  ArrowsCounterClockwise,
  ArrowUpRight,
  Brain,
  Code,
  Compass,
  Flag,
  Gauge,
  Globe,
  MagnifyingGlass,
  Megaphone,
  Robot,
  ShieldCheck,
  SlidersHorizontal,
  TerminalWindow,
  UsersThree,
} from "@phosphor-icons/react";
import { PageNav } from "@/components/page-nav";
import { PageFooter } from "@/components/page-footer";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";

/* The whole page body lives here because the icon set calls createContext, which
   a server component may not evaluate. The route file stays on the server so it
   can export metadata. */
const pillars = [
  { icon: Flag, title: "Our mission", body: "Help businesses grow in the digital world by building software, websites and automation that remove real friction — not decoration." },
  { icon: Compass, title: "Our approach", body: "Understand the business before writing code. Agree what success looks like, then design and build backwards from it." },
  { icon: Brain, title: "Technology & innovation", body: "Current, well-supported tools chosen for the job, with automation and AI applied where they genuinely save time." },
];

const capabilities = [
  {
    icon: TerminalWindow,
    title: "System Software Development",
    summary: "Software that runs your daily operations in one place.",
    points: ["POS Systems", "CRM Systems", "ERP Solutions", "Business Management Software", "Custom SaaS Applications"],
  },
  {
    icon: Globe,
    title: "Website Development",
    summary: "Fast websites that turn visitors into enquiries.",
    points: ["Business Websites", "E-commerce Websites", "Portfolio Websites", "Landing Pages", "Custom Web Applications"],
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    summary: "A recognisable brand, in front of the right people.",
    points: ["Social Media Management", "Content Strategy", "Social Media Campaigns", "Brand Awareness", "Digital Advertising"],
  },
  {
    icon: MagnifyingGlass,
    title: "SEO Optimization",
    summary: "Be found in search before they ever contact you.",
    points: ["On-Page SEO", "Technical SEO", "Keyword Research", "Website Optimization", "Content Optimization"],
  },
  {
    icon: Robot,
    title: "AI Automation",
    summary: "Repetitive work moved off your team, done the same way every time.",
    points: ["AI Chatbots", "Business Workflow Automation", "AI-Powered Tools", "Automated Customer Support", "Intelligent Business Processes"],
  },
];

const values = [
  { icon: SlidersHorizontal, title: "Customized Solutions", body: "Every build starts from how your business actually operates, so the software fits the work instead of the other way round." },
  { icon: Code, title: "Modern Technology", body: "Current frameworks and well-maintained dependencies, chosen for the job and documented for whoever comes next." },
  { icon: UsersThree, title: "User-Centered Design", body: "Screens are designed for the person using them all day — clear labels, sensible defaults, fewer clicks." },
  { icon: Gauge, title: "Performance-Focused Development", body: "Fast loading and responsive interaction are treated as requirements, not a clean-up task at the end." },
  { icon: ShieldCheck, title: "Reliable Support", body: "Launch is not the finish line. We stay reachable when something needs adjusting, explaining or fixing." },
  { icon: ArrowsCounterClockwise, title: "Business-Oriented Thinking", body: "Decisions are weighed against what they do for operations, cost and growth — not how impressive they look." },
];

export function AboutContent() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <PageNav current="about" />

        <section className="ab-hero" id="top" aria-labelledby="ab-hero-title">
          <div className="ab-hero-inner page-wrap">
            <p className="eyebrow ab-hero-eyebrow"><span className="eyebrow-mark" /> About NexVeins</p>
            <h1 id="ab-hero-title">A studio built around <span>one question</span></h1>
            <p className="ab-hero-intro">
              Does this remove real friction? It is the first thing we ask about a feature, a screen, an automation — and the
              reason our work ends up as software, websites and marketing that a business can actually run on.
            </p>
          </div>
        </section>

        <section className="intro-band" aria-labelledby="ab-statement-title">
          <Reveal className="intro-grid page-wrap">
            <p className="eyebrow">What we believe</p>
            <h2 className="intro-statement" id="ab-statement-title">
              Software should <em>remove friction,</em> not add decoration
            </h2>
            <p className="intro-note">
              Everything here follows from that: understand the business, agree what success looks like, then design and build
              backwards from it.
            </p>
          </Reveal>
        </section>

        <section className="section-pad ab-story" aria-labelledby="ab-story-title">
          <div className="approach page-wrap">
            <Reveal className="approach-lead">
              <p className="eyebrow"><span className="eyebrow-mark" /> Who we are</p>
              <h2 id="ab-story-title">Creativity, technology <span>and follow-through</span></h2>
              <p>
                At NexVeins, we combine creativity, technology and innovation to help businesses grow in the digital world.
                From custom software solutions to modern websites and intelligent automation, we build digital experiences
                that solve real business problems.
              </p>
              <p>
                We work as a close-knit team, which means the people who scope your project are the people who build it. No
                hand-off to a queue, no rewriting the brief for a third party.
              </p>
              <a className="button button-outline about-cta" href="/services">
                Explore our services <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal className="principle-list" delay={0.12}>
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div className="principle-row" key={pillar.title}>
                    <span className="principle-number"><Icon size={19} weight="light" aria-hidden="true" /></span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="ab-caps" aria-labelledby="ab-caps-title">
          <div className="ab-caps-inner page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> What we do</p>
              <h2 id="ab-caps-title">Five disciplines, <span>one team</span></h2>
            </Reveal>

            <Reveal className="ab-cap-list" delay={0.1}>
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <div className="ab-cap" key={capability.title}>
                    <span className="ab-cap-index">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="ab-cap-title">
                      <span className="ab-cap-icon"><Icon size={21} weight="light" aria-hidden="true" /></span>
                      {capability.title}
                    </h3>
                    <p>{capability.summary}</p>
                    <ul className="service-card-points ab-cap-points">
                      {capability.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section className="section-pad ab-values" aria-labelledby="ab-values-title">
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> How we work</p>
              <h2 id="ab-values-title">The standards we <span>hold ourselves to</span></h2>
            </Reveal>

            <Reveal className="ab-value-grid" delay={0.1}>
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div className="ab-value" key={value.title}>
                    <span className="ab-value-icon"><Icon size={28} weight="light" aria-hidden="true" /></span>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <ContactSection />
      </main>

      <PageFooter />
    </>
  );
}
