"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

/* The ring is a 45-unit radius circle in a 100-unit box, so its circumference
   is the full dash length and the offset is whatever the page has not covered. */
const RING = 2 * Math.PI * 45;

export function ScrollTop() {
  const [progress, setProgress] = useState(0);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
      setShown(window.scrollY > Math.min(560, window.innerHeight * 0.7));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  };

  return (
    <button type="button" className={`scroll-top${shown ? " is-visible" : ""}`} onClick={toTop} aria-label="Back to top" tabIndex={shown ? 0 : -1}>
      <svg className="scroll-top-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="scroll-top-track" cx="50" cy="50" r="45" />
        <circle className="scroll-top-fill" cx="50" cy="50" r="45" strokeDasharray={RING} strokeDashoffset={RING * (1 - progress)} />
      </svg>
      <ArrowUp size={17} weight="bold" aria-hidden="true" />
    </button>
  );
}
