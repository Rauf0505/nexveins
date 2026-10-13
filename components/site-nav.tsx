import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  return (
    <header className="site-header page-wrap">
      <a className="wordmark" href="#top" aria-label="Nexveins home">
        <Image className="wordmark-image" src="/nexveins-wordmark.png" width={1016} height={146} alt="" priority />
      </a>
      <ThemeToggle />
    </header>
  );
}