"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { PageNav } from "@/components/page-nav";
import { PageFooter } from "@/components/page-footer";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";
import { services } from "@/content/services";
import { serviceGlyphs } from "@/content/service-glyphs";

export function ServicesContent() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <PageNav current="services" />

        <section className="sv-hero" id="top" aria-labelledby="sv-hero-title">
          <div className="sv-hero-inner page-wrap">
            <p className="eyebrow sv-hero-eyebrow"><span className="eyebrow-mark" /> Services</p>
            <h1 id="sv-hero-title">Five ways we <span>remove friction.</span></h1>
            <p className="sv-lede">
              Each service has its own page: what it covers, who it suits and how we work on it. Start with the one closest
              to the problem you are trying to solve — most projects turn out to need two or three of them together.
            </p>
            <div className="sv-actions">
              <a className="button button-primary" href="#contact">
                Start a project <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <a className="button button-outline" href="/projects">
                See selected work <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="intro-band" aria-labelledby="sv-statement-title">
          <Reveal className="intro-grid page-wrap">
            <p className="eyebrow">How they fit together</p>
            <h2 className="intro-statement" id="sv-statement-title">
              One brief, <em>five disciplines.</em>
            </h2>
            <p className="intro-note">
              Tell us the outcome you want and we will say which of these actually matter for it — and which you can skip.
            </p>
          </Reveal>
        </section>

        <section className="section-pad" aria-labelledby="sv-offer-title">
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> The five services</p>
              <h2 id="sv-offer-title">Open any one for <span>the full detail.</span></h2>
            </Reveal>

            <Reveal className="sv-list" delay={0.08}>
              {services.map((service) => {
                const Icon = serviceGlyphs[service.slug];
                return (
                  <a className="sv-row" href={`/services/${service.slug}`} key={service.slug} aria-label={`${service.title} — see details`}>
                    <span className="sv-thumb" style={{ "--media-ratio": service.ratio } as CSSProperties}>
                      <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 88vw, 300px" />
                      <span className="sv-thumb-index">{service.index}</span>
                    </span>
                    <span className="sv-body">
                      <h3><span className="sv-icon"><Icon size={22} weight="light" aria-hidden="true" /></span>{service.title}</h3>
                      <p>{service.summary}</p>
                      <ul className="service-card-points">
                        {service.points.map((point) => <li key={point.label}>{point.label}</li>)}
                      </ul>
                    </span>
                    <span className="sv-arrow" aria-hidden="true"><ArrowRight size={18} weight="bold" aria-hidden="true" /></span>
                  </a>
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
