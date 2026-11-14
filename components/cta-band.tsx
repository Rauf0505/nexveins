"use client"
import { ArrowUpRight, ChatCenteredText } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";

export function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <Reveal className="cta-inner page-wrap">
        <p className="eyebrow"><span className="eyebrow-mark" /> Next step</p>
        <h2 id="cta-title">Have an idea? Let's build <span>something great.</span></h2>
        <p className="cta-note">Whether you need custom software, a professional website or intelligent automation, NexVeins is ready to help turn your ideas into reality.</p>
        <div className="cta-actions">
          <a className="button button-primary" href="#contact">
            Start a project <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </a>
          <a className="button button-outline" href="mailto:info@nexveins.com">
            Contact us <ChatCenteredText size={17} weight="light" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}