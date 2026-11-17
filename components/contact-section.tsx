"use client"
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, EnvelopeSimple, Phone, X } from "@phosphor-icons/react";
import { useEnquiry } from "@/components/enquiry-dialog";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  const openEnquiry = useEnquiry();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openedOnce = useRef(false);

  useEffect(() => {
    if (!detailsOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [detailsOpen]);

  useEffect(() => {
    if (detailsOpen) {
      openedOnce.current = true;
      closeRef.current?.focus();
    } else if (openedOnce.current) {
      triggerRef.current?.focus();
    }
  }, [detailsOpen]);

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-inner page-wrap">
        <div className="contact-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Contact us</p>
          <h2 id="contact-title">Let's talk about your <span>next project.</span></h2>
          <p>Have a project in mind? Tell us what you're planning, and let's discuss how NexVeins can help.</p>
          <div className="contact-actions">
            <button type="button" className="button button-primary contact-enquiry-toggle" onClick={openEnquiry}>
              Start a project <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="button button-outline contact-details-toggle"
              ref={triggerRef}
              aria-expanded={detailsOpen}
              aria-controls="contact-details-popup"
              onClick={() => setDetailsOpen(true)}
            >
              Call or email us <Phone size={17} weight="light" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      {/* Outside the Reveal on purpose: the reveal animates with a transform, and a
          transformed ancestor would capture this fixed layer and pin it to the copy. */}
      <div
        className={`contact-details${detailsOpen ? " is-open" : ""}`}
        id="contact-details-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-details-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) setDetailsOpen(false);
        }}
      >
        <div className="contact-details-panel">
          <div className="contact-details-head">
            <p className="eyebrow"><span className="eyebrow-mark" /> Contact us</p>
            <button
              type="button"
              className="contact-details-close"
              ref={closeRef}
              onClick={() => setDetailsOpen(false)}
              aria-label="Close contact details"
            >
              <X size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
          <h3 className="contact-details-title" id="contact-details-title">Reach NexVeins directly</h3>
          <p className="contact-details-note">Call for a quick conversation, or email the brief and we'll come back with a plan.</p>
          <div className="contact-cards">
            <a className="contact-card" href="tel:+923193360773">
              <span className="contact-card-icon"><Phone size={20} weight="light" aria-hidden="true" /></span>
              <span className="contact-card-text">
                <span className="contact-card-label">Call us</span>
                <span className="contact-card-value">+92 319 336 0773</span>
              </span>
            </a>
            <a className="contact-card" href="mailto:info@nexveins.com">
              <span className="contact-card-icon"><EnvelopeSimple size={20} weight="light" aria-hidden="true" /></span>
              <span className="contact-card-text">
                <span className="contact-card-label">Email us</span>
                <span className="contact-card-value">info@nexveins.com</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
