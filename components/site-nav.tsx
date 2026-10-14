"use client";

import Image from "next/image";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { useEffect, useState, type PointerEvent } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#approach" },
];

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const trackGlass = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    event.currentTarget.dataset.pointerActive = "true";
  };

  const clearGlass = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.dataset.pointerActive = "false";
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Site header">
      <div
        className="nav-glass"
        data-pointer-active="false"
        onPointerMove={trackGlass}
        onPointerLeave={clearGlass}
      >
        <span className="nav-glass-ripple" aria-hidden="true" />
        <a className="wordmark" href="#top" aria-label="Nexveins home" onClick={closeMenu}>
          <Image className="wordmark-emblem" src="/nexveins-emblem.png" width={640} height={500} alt="" priority />
          <Image className="wordmark-image" src="/nexveins-wordmark.png" width={1016} height={146} alt="" priority />
        </a>

        <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <a className="nav-contact nav-contact-mobile" href="#contact" onClick={closeMenu}>
            Start a project <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </nav>

        <div className="nav-end">
          <a className="nav-contact nav-contact-desktop" href="#contact">
            Start a project <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
