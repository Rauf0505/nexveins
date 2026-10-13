import { SiteNav } from "@/components/site-nav";
import { HeroVisual } from "@/components/hero-visual";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <SiteNav />

        <section className="hero" id="top" aria-labelledby="hero-title">
          <HeroVisual />
          <div className="hero-copy page-wrap">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-mark" /> Independent product engineering studio</p>
            <h1 id="hero-title">Software with<br />a <span>point of view.</span></h1>
            <p className="hero-intro">We turn ambitious ideas into useful, beautifully made digital products.</p>
          </div>
        </section>
      </main>
    </>
  );
}
