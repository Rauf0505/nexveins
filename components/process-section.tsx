import { Reveal } from "@/components/reveal";

const steps = [
  { title: "Discover", body: "Understand the client's business, goals and requirements before anything is committed to." },
  { title: "Design", body: "Shape intuitive, visually appealing experiences and agree them before development starts." },
  { title: "Develop", body: "Build reliable, responsive and scalable solutions, tested on the devices people actually use." },
  { title: "Deliver", body: "Launch the solution and provide ongoing support when required." },
];

export function ProcessSection() {
  return (
    <section className="section-pad process-section" id="process" aria-labelledby="process-title">
      <div className="page-wrap">
        <Reveal className="section-heading">
          <p className="eyebrow"><span className="eyebrow-mark" /> Our working process</p>
          <h2 id="process-title">From concept to <span>completion.</span></h2>
        </Reveal>
        <Reveal className="process-track">
          {steps.map((step, index) => (
            <div className="process-step" key={step.title}>
              <div className="process-node">
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="process-dot" aria-hidden="true" />
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
