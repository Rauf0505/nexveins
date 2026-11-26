import { SiteNav } from "@/components/site-nav";
import { HeroVisual } from "@/components/hero-visual";
import { HeroActions } from "@/components/hero-actions";
import { Reveal } from "@/components/reveal";
import { AboutSection } from "@/components/about-section";
import { ServicesTrack } from "@/components/services-track";
import { WhySection } from "@/components/why-section";
import { WorkShowcase } from "@/components/work-showcase";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { graph, projectsListNode, servicesListNode, webPageNode } from "@/lib/schema";
import { HOME_TITLE, SITE_DESCRIPTION } from "@/lib/seo";

/* The home page is where a crawler decides what the site is about, so it says
   plainly what is only drawn here: the five services in order and the four
   builds that are live and clickable today. */
const homeGraph = graph([
  webPageNode({ path: "/", title: HOME_TITLE, description: SITE_DESCRIPTION }),
  servicesListNode(),
  projectsListNode(),
]);

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
            <h1 id="hero-title">Let’s build<br /><span>what’s next</span></h1>
            <p className="hero-intro">We turn ambitious ideas into useful, beautifully made digital products.</p>
            <HeroActions />
          </div>
        </section>

        <section className="intro-band" id="studio-intro" aria-labelledby="studio-intro-title">
          <Reveal className="intro-grid page-wrap">
            <p className="eyebrow">Our point of view</p>
            <h2 className="intro-statement" id="studio-intro-title">
              Great software starts by solving the <em>right problem</em>
            </h2>
            <p className="intro-note">
              We bring product thinking, design, and engineering together to turn ambitious ideas into digital products people rely on.
            </p>
          </Reveal>
        </section>

        <AboutSection />

        <section className="services-section" id="services" aria-labelledby="services-title">
          <ServicesTrack />
        </section>

        <WhySection />

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="work-inner page-wrap">
            <Reveal className="work-heading">
              <div>
                <p className="eyebrow"><span className="eyebrow-mark" /> Selected work</p>
                <h2 id="work-title">Selected work. <span>Real solutions</span></h2>
              </div>
            </Reveal>
            <WorkShowcase />
          </div>
        </section>

        <ProcessSection />

        <ContactSection />
      </main>

      <StructuredData data={homeGraph} />
      <SiteFooter />
    </>
  );
}
