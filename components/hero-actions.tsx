"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { useEnquiry } from "@/components/enquiry-dialog";

export function HeroActions() {
  const openEnquiry = useEnquiry();
  return (
    <div className="hero-actions">
      <a className="button button-primary" href="#contact" aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); openEnquiry(); }}>
        Start a project <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
      </a>
      <a className="text-link" href="#work">
        Explore our work <ArrowDown size={15} weight="bold" aria-hidden="true" />
      </a>
    </div>
  );
}
