"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { projects, type Project } from "@/content/projects";

/* The pair only unveils on a desktop with motion allowed; everywhere else the
   row keeps unveiling on the way up, as it always did. */
const canHold = () => window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)").matches;

/* How much of the unveiling the rise still carries before the row stops. */
const REVEAL_PRE = 0.45;

export function WorkShowcase() {
  const rows: { start: number; items: Project[] }[] = [];
  for (let start = 0; start < projects.length; start += 2) rows.push({ start, items: projects.slice(start, start + 2) });

  return (
    <div className="project-stack">
      {rows.map((row) => (
        <ProjectRow key={row.start} items={row.items} start={row.start} />
      ))}
    </div>
  );
}

function ProjectRow({ items, start }: { items: Project[]; start: number }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const anchorValue = useMotionValue(0);
  const spanValue = useMotionValue(1);
  const [hold, setHold] = useState({ travel: 0, top: 0 });
  const { scrollY } = useScroll();

  /* One reading for the row, shared by both plates, so the pair always opens on
     the same beat. Measuring each plate separately would let the taller one
     finish later than its neighbour. */
  const progress = useTransform([scrollY, anchorValue, spanValue], ([y, anchor, span]: number[]) => Math.min(1, Math.max(0, (y - anchor) / span)));

  useEffect(() => {
    const pin = pinRef.current;
    const frame = frameRef.current;
    if (!pin || !frame) return;
    const measure = () => {
      const height = frame.offsetHeight;
      const viewport = window.innerHeight;
      /* The pair holds dead centre, and only as high as the screen allows. */
      const top = Math.max(0, (viewport - height) / 2);
      const travel = canHold() && height <= viewport ? height : 0;
      if (travel > 0) {
        /* The curtain is already part-open by the time the pair stops, so a row
           never arrives as two empty frames; the hold plays out the rest. */
        const span = travel / (1 - REVEAL_PRE);
        anchorValue.set(pin.getBoundingClientRect().top + window.scrollY - top - REVEAL_PRE * span);
        spanValue.set(span);
      } else {
        /* Without a hold the unveiling runs on the rise, from the row's top edge
           appearing at the bottom of the screen until it sits in the middle. */
        anchorValue.set(pin.getBoundingClientRect().top + window.scrollY - viewport);
        spanValue.set((height + viewport) / 2);
      }
      setHold((current) => (current.travel === travel && current.top === top ? current : { travel, top }));
    };
    measure();
    /* The hold opens at a fixed point of the page, so that point is re-read
       whenever anything above the plates changes the page's height. */
    const watcher = new ResizeObserver(measure);
    watcher.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      watcher.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [anchorValue, spanValue]);

  return (
    <div className="project-pin" ref={pinRef}>
      <div
        className={`project-row${hold.travel > 0 ? " is-held" : ""}`}
        ref={frameRef}
        style={{ "--hold-top": `${hold.top}px` } as CSSProperties}
      >
        {items.map((project, offset) => (
          <ProjectPlate key={project.name} project={project} number={start + offset + 1} progress={progress} />
        ))}
      </div>

      {/* The section spends exactly the height of the pair on the unveiling, so the
          scroll that used to carry the row up the screen now opens it in place. */}
      {hold.travel > 0 && <div className="project-hold" style={{ height: hold.travel }} aria-hidden="true" />}
    </div>
  );
}

function ProjectPlate({ project, number, progress }: { project: Project; number: number; progress: MotionValue<number> }) {
  const still = useReducedMotion() === true;

  /* The shot is unveiled from its top edge down and settles from a slight
     over-crop, so scrolling back closes it again. Progress runs from the row's
     top edge appearing at the bottom of the screen until the row sits in the
     middle of it. */
  const curtain = useTransform(progress, [0, 0.72], [100, 0]);
  const clip = useMotionTemplate`inset(0% 0% ${curtain}% 0%)`;
  const zoom = useTransform(progress, [0, 1], [1.14, 1]);
  const textY = useTransform(progress, [0.1, 0.94], [26, 0]);
  const textOpacity = useTransform(progress, [0.08, 0.6], [0, 1]);

  return (
    <article className="project-plate">
      <a className="plate-media-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on ${project.host}`}>
        <div className="plate-media">
          <motion.div className="plate-shot" style={still ? undefined : { clipPath: clip, scale: zoom }}>
            <Image src={project.image} alt={project.alt} width={1400} height={933} sizes="(max-width: 760px) 84vw, (max-width: 1100px) 84vw, 41vw" loading={number === 1 ? "eager" : "lazy"} decoding="async" />
          </motion.div>
          <span className="plate-open" aria-hidden="true"><ArrowUpRight size={20} weight="bold" /></span>
        </div>
      </a>

      <motion.div className="plate-meta" style={still ? undefined : { y: textY, opacity: textOpacity }}>
        <p className="plate-tags">{project.tags}</p>
        <div className="plate-name">
          <span className="plate-arrow" aria-hidden="true"><ArrowRight size={22} weight="light" /></span>
          <h3>{project.name}</h3>
        </div>
        <p className="plate-note">{project.description}</p>
      </motion.div>
    </article>
  );
}
