"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

const concepts = [
  { name: "Meridian", category: "Fintech platform", tag: "01 / PRODUCT DESIGN", description: "A calmer way for modern teams to understand their money and make the next move.", field: "MERIDIAN / FINANCIAL CLARITY", shape: "meridian" },
  { name: "Alto", category: "Digital health", tag: "02 / MOBILE PRODUCT", description: "A more considered daily companion for people navigating their own wellbeing.", field: "ALTO / CARE, IN CONTEXT", shape: "alto" },
  { name: "Relay", category: "Operations software", tag: "03 / AI & AUTOMATION", description: "A connected operations layer that makes busy work feel a little less busy.", field: "RELAY / FLOW, RESTORED", shape: "relay" },
];

export function WorkShowcase() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const project = concepts[selected];

  const change = (direction: number) => setSelected((current) => (current + direction + concepts.length) % concepts.length);

  return (
    <div className="work-showcase">
      <div className={`project-art ${project.shape}`} aria-label={`${project.name} concept artwork`}>
        <AnimatePresence mode="wait">
          <motion.div key={project.shape} className="artwork-scene" initial={reduced ? false : { opacity: 0, scale: 0.96, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={reduced ? undefined : { opacity: 0, scale: 1.02, rotate: 2 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            {project.shape === "meridian" && <><div className="meridian-disc" /><div className="meridian-ring ring-one" /><div className="meridian-ring ring-two" /><div className="meridian-cross" /><span className="artword">m.</span></>}
            {project.shape === "alto" && <><div className="alto-sun" /><div className="alto-horizon" /><div className="alto-arc arc-a" /><div className="alto-arc arc-b" /><span className="artword alto-word">a</span></>}
            {project.shape === "relay" && <><div className="relay-core" /><div className="relay-path path-a" /><div className="relay-path path-b" /><div className="relay-path path-c" /><div className="relay-node relay-node-a" /><div className="relay-node relay-node-b" /><div className="relay-node relay-node-c" /><span className="artword relay-word">R</span></>}
          </motion.div>
        </AnimatePresence>
        <div className="project-art-top"><span>CONCEPT / {String(selected + 1).padStart(2, "0")}</span><span>NX STUDIO</span></div>
        <div className="project-art-foot">{project.field}</div>
      </div>
      <div className="project-detail" aria-live="polite" aria-atomic="true">
        <div className="project-detail-top"><span className="project-tag">{project.tag}</span><span className="project-category">{project.category}</span></div>
        <div className="project-detail-main">
          <AnimatePresence mode="wait">
            <motion.div key={project.name} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <h3>{project.name}<span>.</span></h3>
              <p>{project.description}</p>
            </motion.div>
          </AnimatePresence>
          <button className="circle-link" type="button" aria-label="Move to next concept" onClick={() => change(1)}><ArrowUpRight size={20} weight="bold" aria-hidden="true" /></button>
        </div>
        <div className="project-controls">
          <div className="project-tabs" role="group" aria-label="Choose concept project">
            {concepts.map((item, index) => <button key={item.name} type="button" className={index === selected ? "is-selected" : ""} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.name}</button>)}
          </div>
          <div className="project-arrows"><button type="button" aria-label="Previous concept" onClick={() => change(-1)}><ArrowLeft size={17} /></button><button type="button" aria-label="Next concept" onClick={() => change(1)}><ArrowRight size={17} /></button></div>
        </div>
      </div>
    </div>
  );
}
