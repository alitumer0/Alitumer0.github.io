"use client";

import { useEffect } from "react";
import type { ProjectItem, ProjectShowcaseCopy } from "@/lib/pdf-content";

type ProjectCaseStudyModalProps = {
  project: ProjectItem | null;
  copy: ProjectShowcaseCopy;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.58 7.12 5.7A1 1 0 0 0 5.7 7.13L10.59 12 5.7 16.88a1 1 0 1 0 1.41 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.41L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41Z"
      />
    </svg>
  );
}

export function ProjectCaseStudyModal({ project, copy, onClose }: ProjectCaseStudyModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  return (
    <div className="project-case-study-backdrop" role="dialog" aria-modal="true" aria-labelledby={`project-case-study-title-${project.slug}`} onClick={onClose}>
      <div className="project-case-study-dialog" onClick={(event) => event.stopPropagation()}>
        <div className="project-case-study-header">
          <div>
            <p className="project-case-study-kicker">{copy.caseStudy}</p>
            <h3 id={`project-case-study-title-${project.slug}`}>{project.title}</h3>
          </div>

          <button type="button" className="project-case-study-close" onClick={onClose} aria-label={copy.modal.close}>
            <CloseIcon />
          </button>
        </div>

        <section className="project-case-study-section">
          <h4>{copy.modal.overview}</h4>
          <p>{project.caseStudy.overview}</p>
        </section>

        <section className="project-case-study-section">
          <h4>{copy.modal.techStack}</h4>
          <div className="project-case-study-chip-row">
            {project.technologies.map((tech) => (
              <span key={`${project.slug}-modal-${tech}`} className="airbnb-project-chip">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="project-case-study-section">
          <h4>{copy.modal.contributions}</h4>
          <ul className="project-case-study-list">
            {project.caseStudy.contributions.map((contribution) => (
              <li key={`${project.slug}-${contribution}`}>{contribution}</li>
            ))}
          </ul>
        </section>

        <section className="project-case-study-section">
          <h4>{copy.modal.links}</h4>
          <div className="project-case-study-links">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="airbnb-project-action airbnb-project-action-secondary">
                {copy.openLive}
              </a>
            ) : null}
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="airbnb-project-action airbnb-project-action-secondary">
                {copy.openCode}
              </a>
            ) : null}
            {project.caseStudy.caseStudyUrl ? (
              <a href={project.caseStudy.caseStudyUrl} target="_blank" rel="noreferrer" className="airbnb-project-action airbnb-project-action-secondary">
                {copy.caseStudy}
              </a>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
