"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme";

const Tornado = dynamic(() => import("@/components/originkit-tornado"), {
  ssr: false,
  loading: () => <div className="hero-visual-loading" aria-hidden="true" />,
});

// Dark mode: bright cyan strands that glow additively over the dark page.
const DARK = {
  mode: "dark",
  line: "#087ee8",
  dot: "#10bce8",
  comet: "#4ce4ff",
  lineGlow: 10,
  dotGlow: 9,
  cometGlow: 8,
} as const;

// Mobile dark: ~half the strands and ~a third of the dots are rasterised, so
// raise the glow to compensate and keep the tornado glowing on a phone.
const DARK_MOBILE = {
  ...DARK,
  lineGlow: 13,
  dotGlow: 13,
  cometGlow: 10,
} as const;

// Light mode: the page is light, so additive glow cannot show. The Tornado
// stays full-bleed with the same shape/motion, rendered with real per-vertex
// alpha in a deep navy -> blue -> cyan height gradient (see the component), so
// the ends dissolve into the page instead of turning white. Glow values match
// dark mode; the light gain maps intensity to the alpha ramp.
const LIGHT = {
  mode: "light",
  line: "#08194d",
  dot: "#0b4fb0",
  comet: "#12b8e8",
  lineGlow: 10,
  dotGlow: 9,
  cometGlow: 8,
} as const;

// Mobile browsers get a lighter particle budget; DARK_MOBILE raises the glow to
// compensate so the tornado still reads (and glows) on a phone.
const DESKTOP_COUNTS = { line: 130, dot: 2600, comet: 7 };
const MOBILE_COUNTS = { line: 62, dot: 950, comet: 3 };

function useCompactViewport(breakpoint = 760) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);
  return compact;
}

export function HeroVisual() {
  const compact = useCompactViewport();
  const theme = useTheme();
  const palette = theme === "light" ? LIGHT : compact ? DARK_MOBILE : DARK;
  const counts = compact ? MOBILE_COUNTS : DESKTOP_COUNTS;

  return (
    <div className="hero-visual" aria-hidden="true">
      <Tornado
        background="transparent"
        mode={palette.mode}
        topRadius={430}
        waistRadius={62}
        waistPosition={56}
        bottomRadius={1500}
        twist={2.6}
        zoom={68}
        speed={8}
        direction="right"
        lineOptions={{ count: counts.line, color: palette.line, glow: palette.lineGlow }}
        dots
        dotOptions={{ count: counts.dot, size: 15, color: palette.dot, glow: palette.dotGlow, flicker: 6 }}
        comets
        cometOptions={{ count: counts.comet, speed: 5, color: palette.comet, glow: palette.cometGlow, tail: compact ? 12 : 18, delay: 4, collide: 4 }}
        repel
        repelOptions={{ radius: 78, strength: 20 }}
      />
    </div>
  );
}
