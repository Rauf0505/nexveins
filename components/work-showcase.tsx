"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { projects, type Project } from "@/content/projects";

export function WorkShowcase() {
  const rows: Project[][] = [];
  for (let start = 0; start < projects.length; start += 2) rows.push(projects.slice(start, start + 2));

  return (
    <div className="project-stack">
      {rows.map((row, rowIndex) => (
        <div className="project-row" key={rowIndex}>
          {row.map((project, offset) => (
            <ProjectPlate key={project.name} project={project} eager={rowIndex === 0 && offset === 0} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ProjectPlate({ project, eager }: { project: Project; eager: boolean }) {
  return (
    <article className="project-plate">
      <a className="plate-media-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} on ${project.host}`}>
        <div className="plate-media">
          <Image src={project.image} alt={project.alt} width={1400} height={933} sizes="(max-width: 760px) 84vw, (max-width: 1100px) 84vw, 41vw" loading={eager ? "eager" : "lazy"} decoding="async" />
          <span className="plate-open" aria-hidden="true"><ArrowUpRight size={20} weight="bold" /></span>
        </div>
      </a>

      <div className="plate-meta">
        <p className="plate-tags">{project.tags}</p>
        <div className="plate-name">
          <span className="plate-arrow" aria-hidden="true"><ArrowRight size={22} weight="light" /></span>
          <h3>{project.name}</h3>
        </div>
        <p className="plate-note">{project.description}</p>
      </div>
    </article>
  );
}
