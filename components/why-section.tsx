"use client"

import { useState } from "react";
import { ArrowsCounterClockwise, Code, Gauge, ShieldCheck, SlidersHorizontal, UsersThree } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";

const reasons = [
  { icon: SlidersHorizontal, title: "Customized Solutions", body: "Every build starts from how your business actually operates, so the software fits the work instead of the other way round." },
  { icon: Code, title: "Modern Technology", body: "Current frameworks and well-maintained dependencies, chosen for the job and documented for whoever comes next." },
  { icon: UsersThree, title: "User-Centered Design", body: "Screens are designed for the person using them all day — clear labels, sensible defaults, fewer clicks." },
  { icon: Gauge, title: "Performance-Focused Development", body: "Fast loading and responsive interaction are treated as requirements, not a clean-up task at the end." },
  { icon: ShieldCheck, title: "Reliable Support", body: "Launch is not the finish line. We stay reachable when something needs adjusting, explaining or fixing." },
  { icon: ArrowsCounterClockwise, title: "Business-Oriented Thinking", body: "Decisions are weighed against what they do for operations, cost and growth — not how impressive they look." },
];

export function WhySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-pad why-section" id="why" aria-labelledby="why-title">
      <div className="page-wrap">
        <Reveal className="section-heading">
          <p className="eyebrow"><span className="eyebrow-mark" /> Why NexVeins</p>
          <h2 id="why-title">Why businesses <span>choose NexVeins.</span></h2>
        </Reveal>

        <Reveal className="why-split">
          <ul className="why-list">
            {reasons.map((reason, index) => (
              <li className={`why-row${index === active ? " is-current" : index < active ? " is-past" : ""}`} key={reason.title}>
                <button type="button" onClick={() => setActive(index)} aria-current={index === active}>
                  <span className="why-row-rail" aria-hidden="true"><span className="why-row-dot" /></span>
                  <span className="why-row-title">{reason.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="why-panels" aria-live="polite">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div className={`why-panel${index === active ? " is-active" : ""}`} key={reason.title} aria-hidden={index !== active}>
                  <span className="why-panel-icon"><Icon size={30} weight="light" aria-hidden="true" /></span>
                  <h3>{reason.title}</h3>
                  <p className="why-panel-body">{reason.body}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
