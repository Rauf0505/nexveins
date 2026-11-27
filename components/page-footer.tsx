"use client";

import Image from "next/image";
import { ArrowUp, FacebookLogo, InstagramLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react";
import { services } from "@/content/services";

/* Home's footer with hrefs that resolve from a secondary page, plus the service
   column pointing at each service page. Class names are home's, unchanged. */
const navigate = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nex-veins/", Icon: LinkedinLogo },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594916004272", Icon: FacebookLogo },
  { label: "Instagram", href: "https://www.instagram.com/nexveins/", Icon: InstagramLogo },
  { label: "WhatsApp", href: "https://wa.me/923193360773", Icon: WhatsappLogo },
];

export function PageFooter() {
  return (
    <footer className="footer-shell" aria-label="Site footer">
      <div className="site-footer page-wrap">
        <div className="footer-brand">
          <a className="wordmark footer-wordmark" href="/" aria-label="NexVeins home">
            <Image className="wordmark-emblem" src="/nexveins-emblem.png" width={560} height={423} alt="" />
          </a>
          <p>NexVeins builds innovative digital solutions that help businesses grow, operate smarter and succeed in the digital world.</p>
          <ul className="footer-socials" aria-label="NexVeins on social media">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={17} weight="fill" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-columns">
          <nav className="footer-column" aria-label="Footer navigation">
            <h3>Navigate</h3>
            <ul>{navigate.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
          <nav className="footer-column" aria-label="Services">
            <h3>Services</h3>
            <ul>{services.map((service) => <li key={service.slug}><a href={`/services/${service.slug}`}>{service.title}</a></li>)}</ul>
          </nav>
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="tel:+923193360773">+92 319 336 0773</a></li>
              <li><a href="mailto:info@nexveins.com">info@nexveins.com</a></li>
            </ul>
          </div>
        </div>

        <a className="back-top" href="#top">
          Back to top <ArrowUp size={15} weight="bold" aria-hidden="true" />
        </a>

        <p className="copyright">© 2026 NexVeins. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
