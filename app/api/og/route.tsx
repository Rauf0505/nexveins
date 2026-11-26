import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/* The card a shared link becomes. A page without a share image shows up as a
   bare text box in WhatsApp, LinkedIn and iMessage, so every route hands its own
   title here and gets the same treatment the site gives its visitors. */
const INK = "#050914";
const PAPER = "#f1f7ff";
const MUTED = "#9aa7bd";
const ACCENT = "#17c8f5";
const DIM = "#1488f5";

const LIMITS = { title: 96, text: 190, label: 28 };
const clip = (value: string | null, fallback: string, max: number) => {
  const clean = (value ?? "").trim();
  return (clean || fallback).slice(0, max);
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const title = clip(params.get("title"), "Custom software, websites, SEO and AI automation", LIMITS.title);
  const text = clip(params.get("text"), "NexVeins builds systems, websites, search and automation for teams turning complex ideas into software people use.", LIMITS.text);
  const label = clip(params.get("label"), "NexVeins", LIMITS.label);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: `radial-gradient(120% 120% at 88% 8%, #10263d 0%, ${INK} 58%)`,
          color: PAPER,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: ACCENT }} />
            <div style={{ fontSize: 30, letterSpacing: 2, textTransform: "uppercase", color: MUTED }}>{SITE_NAME}</div>
          </div>
          <div style={{ fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: ACCENT }}>{label}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 1040 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, letterSpacing: -2, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: MUTED }}>{text}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ height: 6, width: 320, borderRadius: 3, background: `linear-gradient(90deg, ${ACCENT}, ${DIM})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 30, color: PAPER }}>{SITE_URL.replace("https://", "")}</div>
            <div style={{ fontSize: 26, color: MUTED }}>Software · Websites · SEO · AI automation</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  );
}
