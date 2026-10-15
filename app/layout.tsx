import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Nexveins® | Software with a point of view",
  description:
    "Nexveins is a product engineering studio for teams ready to turn complex ideas into software people want to use.",
  openGraph: {
    title: "Nexveins® | Software with a point of view",
    description: "Product thinking, design craft and serious engineering. In one close-knit team.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeScript = `(function(){try{var k="nexveins-theme";var s=window.localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var t=(s==="light"||s==="dark")?s:m;var e=document.documentElement;e.dataset.theme=t;e.style.colorScheme=t;}catch(err){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>{children}</body>
    </html>
  );
}
