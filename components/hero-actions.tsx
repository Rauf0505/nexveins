"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export function HeroActions() {
  return (
    <div className="hero-actions">
      <a className="button button-primary" href="#contact">
        Start a project <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
      </a>
      <a className="text-link" href="#work">
        Explore our work <ArrowDown size={15} weight="bold" aria-hidden="true" />
      </a>
    </div>
  );
}
