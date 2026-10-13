"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@/components/theme";

const Tornado = dynamic(() => import("@/components/originkit-tornado"), {
  ssr: false,
  loading: () => <div className="hero-visual-loading" aria-hidden="true" />,
});

const PALETTE: Record<Theme, { line: string; dot: string; comet: string }> = {
  dark: { line: "#087ee8", dot: "#10bce8", comet: "#4ce4ff" },
  light: { line: "#0a4fb0", dot: "#0a6ec2", comet: "#0a57b0" },
};

// Mobile browsers get a much lighter particle budget — the tornado stays
// bright because line/dot glow is raised while strand & dot counts drop.
const DESKTOP_COUNTS: Record<Theme, { line: number; dot: number; comet: number }> = {
  dark: { line: 130, dot: 2600, comet: 7 },
  light: { line: 96, dot: 1700, comet: 5 },
};
const MOBILE_COUNTS: Record<Theme, { line: number; dot: number; comet: number }> = {
  dark: { line: 62, dot: 950, comet: 3 },
  light: { line: 62, dot: 950, comet: 3 },
};

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
  const theme = useTheme();
  const compact = useCompactViewport();
  const palette = PALETTE[theme];
  const light = theme === "light";
  const counts = compact ? MOBILE_COUNTS[theme] : DESKTOP_COUNTS[theme];

  return (
    <div className="hero-visual" aria-hidden="true">
      <Tornado
        background="transparent"
        mode={theme}
        topRadius={430}
        waistRadius={62}
        waistPosition={56}
        bottomRadius={1500}
        twist={2.6}
        zoom={68}
        speed={8}
        direction="right"
        lineOptions={{ count: counts.line, color: palette.line, glow: 10 }}
        dots
        dotOptions={{ count: counts.dot, size: 15, color: palette.dot, glow: light ? 4 : 9, flicker: 6 }}
        comets
        cometOptions={{ count: counts.comet, speed: 5, color: palette.comet, glow: light ? 3 : 8, tail: compact ? 12 : 18, delay: 4, collide: 4 }}
        repel
        repelOptions={{ radius: 78, strength: 20 }}
      />
    </div>
  );
}