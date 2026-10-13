"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Tornado = dynamic(() => import("@/components/originkit-tornado"), {
  ssr: false,
  loading: () => <div className="hero-visual-loading" aria-hidden="true" />,
});

// The hero animation is intentionally identical in light and dark mode, so it
// always uses the dark-mode palette and rendering (glow over a dark surface).
const LINE_COLOR = "#087ee8";
const DOT_COLOR = "#10bce8";
const COMET_COLOR = "#4ce4ff";

// Mobile browsers get a much lighter particle budget — the tornado stays
// bright because line/dot glow is raised while strand & dot counts drop.
const DESKTOP_COUNTS = { line: 130, dot: 2600, comet: 7 };
const MOBILE_COUNTS = { line: 62, dot: 950, comet: 3 };

function useCompactViewport(breakpoint = 780) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);
  return compact;
}

export function HeroVisual() {
  const compact = useCompactViewport();
  const counts = compact ? MOBILE_COUNTS : DESKTOP_COUNTS;

  return (
    <div className="hero-visual" aria-hidden="true">
      <Tornado
        background="transparent"
        mode="dark"
        topRadius={430}
        waistRadius={62}
        waistPosition={56}
        bottomRadius={1500}
        twist={2.6}
        zoom={68}
        speed={8}
        direction="right"
        lineOptions={{ count: counts.line, color: LINE_COLOR, glow: 10 }}
        dots
        dotOptions={{ count: counts.dot, size: 15, color: DOT_COLOR, glow: 9, flicker: 6 }}
        comets
        cometOptions={{ count: counts.comet, speed: 5, color: COMET_COLOR, glow: 8, tail: compact ? 12 : 18, delay: 4, collide: 4 }}
        repel
        repelOptions={{ radius: 78, strength: 20 }}
      />
    </div>
  );
}