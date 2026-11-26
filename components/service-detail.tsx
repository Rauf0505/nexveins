"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { PageNav } from "@/components/page-nav";
import { PageFooter } from "@/components/page-footer";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";
import { serviceGlyphs } from "@/content/service-glyphs";
import { services, type Service } from "@/content/services";

export function ServiceDetail({ service }: { service: Service }) {
  const position = services.findIndex((item) => item.slug === service.slug);
  const previous = services[(position - 1 + services.length) % services.length];
  const following = services[(position + 1) % services.length];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <PageNav current="services" />

        <section className="sd-hero" id="top" aria-labelledby="sd-title">
          <div className="sd-hero-grid page-wrap">
            <div className="sd-hero-copy">
              <p className="sd-crumb">
                <a href="/services"><ArrowLeft size={13} weight="bold" aria-hidden="true" /> Services</a>
                <span aria-hidden="true">/</span>
                <span>{service.index}</span>
              </p>
              <h1 id="sd-title">{service.title}</h1>
              <p className="sd-summary">{service.summary}</p>
              <p className="sd-lede">{service.lede}</p>
            </div>
            <div className="sd-hero-media" style={{ "--media-ratio": service.ratio } as CSSProperties}>
              <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 88vw, 620px" priority />
            </div>
          </div>
        </section>

        <section className="sd-points" aria-labelledby="sd-points-title">
          <div className="sd-points-inner page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> What we build</p>
              <h2 id="sd-points-title">{service.title} <span>in practice</span></h2>
            </Reveal>

            <Reveal className="sd-point-list" delay={0.08}>
              {service.points.map((point, index) => (
                <div className="sd-point" key={point.label}>
                  <span className="sd-point-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{point.label}</h3>
                  <p>{point.body}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="sd-middle" aria-label="Who this suits and how we approach it">
          <div className="page-wrap">
            <Reveal className="sd-split">
              <div className="sd-column">
                <h2>Who this suits</h2>
                <ul>{service.suits.map((line) => <li key={line}>{line}</li>)}</ul>
              </div>
              <div className="sd-column">
                <h2>How we approach it</h2>
                <ul>{service.approach.map((line) => <li key={line}>{line}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="sd-connects" aria-labelledby="sd-connects-title">
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> Where it connects</p>
              <h2 id="sd-connects-title">Two services that make <span>this one work harder</span></h2>
            </Reveal>

            <Reveal className="sd-connect-grid" delay={0.08}>
              {service.connects.map((connect) => {
                const Icon = serviceGlyphs[connect.slug];
                return (
                  <a className="sd-connect" href={`/services/${connect.slug}`} key={connect.slug}>
                    <h3>
                      <span className="sd-connect-label"><span className="sv-icon"><Icon size={19} weight="light" aria-hidden="true" /></span>{connect.label}</span>
                      <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                    </h3>
                    <p>{connect.body}</p>
                  </a>
                );
              })}
            </Reveal>

            <nav className="sd-pager" aria-label="More services">
              <a href={`/services/${previous.slug}`}>
                <span>Previous service</span>
                <strong>{previous.title}</strong>
              </a>
              <a href={`/services/${following.slug}`}>
                <span>Next service</span>
                <strong>{following.title}</strong>
              </a>
            </nav>
          </div>
        </section>

        <ContactSection />
      </main>

      <PageFooter />
    </>
  );
}
