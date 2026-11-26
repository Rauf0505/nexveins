"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PageNav } from "@/components/page-nav";
import { PageFooter } from "@/components/page-footer";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";

export function ProjectsContent() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <PageNav current="projects" />

        <section className="pj-hero" id="top" aria-labelledby="pj-hero-title">
          <div className="pj-hero-inner page-wrap">
            <p className="eyebrow pj-hero-eyebrow"><span className="eyebrow-mark" /> Projects</p>
            <h1 id="pj-hero-title">Live products,<br /><span>not mockups</span></h1>
            <p className="pj-lede">
              Four builds running for real businesses — a fitness storefront, a car rental site, a restaurant platform
              and an ERP for construction and interiors. Every one of them opens in a new tab, so you can judge the work
              by using it.
            </p>
          </div>
        </section>

        <section className="section-pad" aria-labelledby="pj-work-title">
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> Selected work</p>
              <h2 id="pj-work-title">What we built, <span>and where it runs</span></h2>
            </Reveal>

            <Reveal className="pj-list" delay={0.08}>
              {projects.map((project, index) => (
                <article className="pj-row" key={project.name}>
                  <a
                    className="pj-thumb"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} on ${project.host}`}
                  >
                    <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 88vw, 560px" />
                    <span className="pj-thumb-index">{String(index + 1).padStart(2, "0")}</span>
                  </a>
                  <div className="pj-body">
                    <h3>{project.name}</h3>
                    <p className="pj-tags">{project.tags}</p>
                    <p className="pj-description">{project.description}</p>
                    <a className="pj-open" href={project.url} target="_blank" rel="noopener noreferrer">
                      Open {project.host} <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        <ContactSection />
      </main>

      <PageFooter />
    </>
  );
}
