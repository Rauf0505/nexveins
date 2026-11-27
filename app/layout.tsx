import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { EnquiryProvider } from "@/components/enquiry-dialog";
import { ScrollTop } from "@/components/scroll-top";
import { StructuredData } from "@/components/structured-data";
import { graph, organizationNode, websiteNode } from "@/lib/schema";
import { HOME_OG_DESCRIPTION, HOME_OG_TITLE, HOME_TITLE, SITE_DESCRIPTION, SITE_URL, pageSeo } from "@/lib/seo";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", display: "swap" });

/* The home page is the root route, so its own tags live here: the searchable
   title says what the studio sells before it says how it feels, and the
   canonical is the address every other page's markup points back to. */
export const metadata: Metadata = {
  ...pageSeo({
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: ["custom software development", "website development", "SEO optimization", "AI automation", "social media marketing", "software house", "NexVeins"],
    ogTitle: HOME_OG_TITLE,
    ogDescription: HOME_OG_DESCRIPTION,
    ogLabel: "Software studio",
  }),
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/icon.png" },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050914",
};

const siteGraph = graph([organizationNode(), websiteNode()]);

const themeScript = `(function(){try{var k="nexveins-theme";var s=window.localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var t=(s==="light"||s==="dark")?s:m;var e=document.documentElement;e.dataset.theme=t;e.style.colorScheme=t;}catch(err){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body><EnquiryProvider>{children}<ScrollTop /></EnquiryProvider><StructuredData data={siteGraph} /></body>
    </html>
  );
}
