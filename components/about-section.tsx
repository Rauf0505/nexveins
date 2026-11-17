"use client"
import { ArrowUpRight, Brain, Compass, Flag } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";

const pillars = [
  { icon: Flag, title: "Our mission", body: "Help businesses grow in the digital world by building software, websites and automation that remove real friction — not decoration." },
  { icon: Compass, title: "Our approach", body: "Understand the business before writing code. Agree what success looks like, then design and build backwards from it." },
  { icon: Brain, title: "Technology & innovation", body: "Current, well-supported tools chosen for the job, with automation and AI applied where they genuinely save time." },
];

export function AboutSection() {
  return (
    <section className="section-pad about-section" id="about" aria-labelledby="about-title">
      <div className="approach page-wrap">
        <Reveal className="approach-lead">
          <p className="eyebrow"><span className="eyebrow-mark" /> About NexVeins</p>
          <h2 id="about-title">Turning ideas into <span>digital experiences.</span></h2>
          <p>
            At NexVeins, we combine creativity, technology and innovation to help businesses grow in the digital world.
            From custom software solutions to modern websites and intelligent automation, we build digital experiences
            that solve real business problems.
          </p>
          <a className="button button-outline about-cta" href="#process">
            Discover our approach <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="principle-list" delay={0.12}>
          {pillars.map((pillar, index) => {
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
  );
}