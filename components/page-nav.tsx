"use client";

import Image from "next/image";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { useEffect, useState, type PointerEvent } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEnquiry } from "@/components/enquiry-dialog";

/* The bar used by every page that is not the home page. It copies home's markup
   and class names so it looks identical, and changes only the hrefs: every
   destination is now a real route, so nothing here can rely on a home-page
   anchor like #services resolving. */
const links = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "services", label: "Services", href: "/services" },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "contact", label: "Contact Us", href: "/contact" },
];

export function PageNav({ current }: { current: "about" | "services" | "projects" | "contact" }) {
  const openEnquiry = useEnquiry();
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    let restTimer: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    const measure = () => {
      frame = 0;
      setStuck(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
      const y = window.scrollY;
      if (Math.abs(y - lastY) <= 4) return;
      lastY = y;
      if (y > 160) setHidden(true);
      if (restTimer) clearTimeout(restTimer);
      restTimer = setTimeout(() => setHidden(false), 400);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (restTimer) clearTimeout(restTimer);
    };
  }, []);

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
    <header className={`site-header${stuck ? " is-stuck" : ""}${hidden && !menuOpen ? " is-hidden" : ""}`} aria-label="Site header">
      <div
        className="nav-glass"
        data-pointer-active="false"
        onPointerMove={trackGlass}
        onPointerLeave={clearGlass}
      >
        <span className="nav-glass-ripple" aria-hidden="true" />
        <a className="wordmark" href="/" aria-label="Nexveins home" onClick={closeMenu}>
          <Image className="wordmark-emblem" src="/nexveins-emblem.png" width={560} height={423} alt="" priority />
        </a>

        <nav id="primary-navigation" className={`primary-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => {
            const isCurrent = link.key === current;
            return (
              <a key={link.href} href={link.href} className={isCurrent ? "is-active" : undefined} aria-current={isCurrent ? "page" : undefined} onClick={closeMenu}>{link.label}</a>
            );
          })}
          <a className="nav-contact nav-contact-mobile" href="/contact" aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); closeMenu(); openEnquiry(); }}>
            Start a project <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </nav>

        <div className="nav-end">
          <a className="nav-contact nav-contact-desktop" href="/contact" aria-haspopup="dialog" onClick={(event) => { event.preventDefault(); openEnquiry(); }}>
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
