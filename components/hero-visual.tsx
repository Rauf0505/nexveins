"use client";

import dynamic from "next/dynamic";
import { useTheme, type Theme } from "@/components/theme";

const Tornado = dynamic(() => import("@/components/originkit-tornado"), {
  ssr: false,
  loading: () => <div className="hero-visual-loading" aria-hidden="true" />,
});

const PALETTE: Record<Theme, { line: string; dot: string; comet: string }> = {
  dark: { line: "#087ee8", dot: "#10bce8", comet: "#4ce4ff" },
  light: { line: "#0a4fb0", dot: "#0a6ec2", comet: "#0a57b0" },
};

export function HeroVisual() {
  const theme = useTheme();
  const palette = PALETTE[theme];
  const light = theme === "light";

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
        lineOptions={{ count: light ? 96 : 130, color: palette.line, glow: 9 }}
        dots
        dotOptions={{ count: light ? 1700 : 2600, size: 15, color: palette.dot, glow: light ? 2 : 9, flicker: 6 }}
        comets
        cometOptions={{ count: light ? 5 : 7, speed: 5, color: palette.comet, glow: light ? 3 : 8, tail: 18, delay: 5, collide: 4 }}
        repel
        repelOptions={{ radius: 78, strength: 20 }}
      />
    </div>
  );
}