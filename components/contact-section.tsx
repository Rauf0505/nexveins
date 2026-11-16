"use client"
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-inner page-wrap">
        <div className="contact-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Contact us</p>
          <h2 id="contact-title">Let's talk about your <span>next project.</span></h2>
          <p>Have a project in mind? Tell us what you're planning, and let's discuss how NexVeins can help.</p>
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
        <ContactForm />
      </Reveal>
    </section>
  );
}