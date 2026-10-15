import { SiteNav } from "@/components/site-nav";
import { HeroVisual } from "@/components/hero-visual";
import { HeroActions } from "@/components/hero-actions";
import { Reveal } from "@/components/reveal";

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
            <HeroActions />
          </div>
        </section>

        <section className="intro-band" id="studio-intro" aria-labelledby="studio-intro-title">
          <Reveal className="intro-grid page-wrap">
            <p className="eyebrow">Our point of view</p>
            <h2 className="intro-statement" id="studio-intro-title">
              Great software starts by solving the <em>right problem.</em>
            </h2>
            <p className="intro-note">
              We bring product thinking, design, and engineering together to turn ambitious ideas into digital products people rely on.
            </p>
          </Reveal>
        </section>

      </main>
    </>
  );
}
