"use client";

import { ArrowUpRight, EnvelopeSimple, FacebookLogo, InstagramLogo, LinkedinLogo, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { PageNav } from "@/components/page-nav";
import { PageFooter } from "@/components/page-footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

const channels = [
  { label: "Call us", value: "+92 319 336 0773", href: "tel:+923193360773", external: false, note: "For a quick conversation about what you need.", Icon: Phone },
  { label: "Email us", value: "info@nexveins.com", href: "mailto:info@nexveins.com", external: false, note: "Send the brief and we'll come back with a plan.", Icon: EnvelopeSimple },
  { label: "WhatsApp", value: "+92 319 336 0773", href: "https://wa.me/923193360773", external: true, note: "Message us and keep the thread going.", Icon: WhatsappLogo },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nex-veins/", Icon: LinkedinLogo },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594916004272", Icon: FacebookLogo },
  { label: "Instagram", href: "https://www.instagram.com/nexveins/", Icon: InstagramLogo },
  { label: "WhatsApp", href: "https://wa.me/923193360773", Icon: WhatsappLogo },
];

const steps = [
  "Tell us the outcome you want — the problem before the feature list.",
  "We say which services actually matter for it, and which you can skip.",
  "You get a plan in reply: what we would build, in what order, and what it touches.",
];

export function ContactContent() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <PageNav current="contact" />

        <section className="ct-hero" id="top" aria-labelledby="ct-hero-title">
          <div className="ct-hero-inner page-wrap">
            <p className="eyebrow ct-hero-eyebrow"><span className="eyebrow-mark" /> Contact us</p>
            <h1 id="ct-hero-title">Let's talk about your <span>next project.</span></h1>
            <p className="ct-lede">
              Have a project in mind? Tell us what you're planning, and let's discuss how NexVeins can help. Use the form,
              or pick whichever channel is quicker for you.
            </p>
            <div className="ct-actions">
              <a className="button button-primary" href="#contact-form">
                Fill in the brief <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
              <a className="button button-outline" href="/projects">
                See the work first <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="ct-channels" aria-labelledby="ct-channels-title">
          <div className="page-wrap">
            <Reveal className="section-heading">
              <p className="eyebrow"><span className="eyebrow-mark" /> Reach us directly</p>
              <h2 id="ct-channels-title">Three ways in, <span>one team behind them.</span></h2>
            </Reveal>

            <Reveal className="ct-channel-grid" delay={0.08}>
              {channels.map((channel) => (
                <a className="ct-channel" href={channel.href} key={channel.label} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}>
                  <span className="ct-channel-icon"><channel.Icon size={22} weight="light" aria-hidden="true" /></span>
                  <span className="ct-channel-label">{channel.label}</span>
                  <span className="ct-channel-value">{channel.value}</span>
                  <span className="ct-channel-note">{channel.note}</span>
                </a>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="ct-form-band" id="contact-form" aria-labelledby="ct-form-title">
          <div className="page-wrap ct-form-grid">
            <Reveal className="ct-form-copy">
              <p className="eyebrow"><span className="eyebrow-mark" /> The brief</p>
              <h2 id="ct-form-title">Write it here, <span>send it from your own inbox.</span></h2>
              <p className="ct-form-note">
                This site has no inbox of its own, so nothing is stored on the website. Submitting opens your email app
                with the message already written — check it, then send.
              </p>
              <ol className="ct-steps">
                {steps.map((step, index) => (
                  <li key={step}><span className="ct-step-index">{String(index + 1).padStart(2, "0")}</span>{step}</li>
                ))}
              </ol>
              <ul className="ct-socials" aria-label="NexVeins on social media">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.Icon size={17} weight="fill" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="ct-form-panel" delay={0.06}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      <PageFooter />
    </>
  );
}
