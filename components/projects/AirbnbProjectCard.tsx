"use client";

import Image from "next/image";
import type { ProjectItem, ProjectShowcaseCopy } from "@/lib/pdf-content";

type AirbnbProjectCardProps = {
  project: ProjectItem;
  copy: ProjectShowcaseCopy;
  onOpenCaseStudy: (project: ProjectItem) => void;
  variant?: "featured" | "normal";
  priority?: boolean;
};

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="currentColor"
        d="M14 3a1 1 0 1 0 0 2h3.59l-7.3 7.29a1 1 0 0 0 1.42 1.42L19 6.41V10a1 1 0 1 0 2 0V3zM5 5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 1 0-2 0v5H5V7h5a1 1 0 1 0 0-2z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.25 3.37 9.7 8.05 11.27.6.12.82-.27.82-.58v-2.05c-3.27.73-3.96-1.63-3.96-1.63-.53-1.4-1.3-1.77-1.3-1.77-1.06-.75.08-.73.08-.73 1.18.09 1.8 1.24 1.8 1.24 1.04 1.86 2.74 1.32 3.4 1 .1-.77.4-1.32.74-1.62-2.6-.31-5.34-1.35-5.34-6a4.78 4.78 0 0 1 1.23-3.32c-.12-.31-.53-1.58.11-3.29 0 0 1.01-.33 3.3 1.26.95-.27 1.97-.4 2.98-.4s2.03.14 2.98.4c2.29-1.59 3.3-1.26 3.3-1.26.64 1.71.23 2.98.11 3.3a4.8 4.8 0 0 1 1.23 3.31c0 4.66-2.74 5.68-5.36 5.99.42.37.8 1.08.8 2.19v3.24c0 .32.22.71.82.58a11.82 11.82 0 0 0 8.05-11.27A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function AirbnbProjectCard({ project, copy, onOpenCaseStudy, variant = "normal", priority = false }: AirbnbProjectCardProps) {
  const featured = variant === "featured";
  const techChips = project.technologies.slice(0, 5);
  const tagLabel = copy.tags[project.tag];
  const caseStudyUrl = project.caseStudy.caseStudyUrl;

  return (
    <article className={`airbnb-project-card ${featured ? "airbnb-project-card-featured" : ""}`}>
      <div className="airbnb-project-media-wrap">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={priority}
            sizes={featured ? "(max-width: 1100px) 100vw, 980px" : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
            className="airbnb-project-image"
          />
        ) : (
          <div className="airbnb-project-image airbnb-project-image-fallback" aria-hidden />
        )}
        <span className="airbnb-project-image-overlay" aria-hidden />
      </div>

      {(project.liveUrl || project.repoUrl) && (
        <div className="airbnb-project-icon-row">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="airbnb-project-icon-button"
              aria-label={`${copy.openLive}: ${project.title}`}
            >
              <ExternalLinkIcon />
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="airbnb-project-icon-button"
              aria-label={`${copy.openCode}: ${project.title}`}
            >
              <GithubIcon />
            </a>
          ) : null}
        </div>
      )}

      <div className="airbnb-project-glass-panel">
        <div className="airbnb-project-topline">
          <span className="airbnb-project-tag">{tagLabel}</span>
          {project.logo ? (
            <span className="airbnb-project-logo-wrap" aria-hidden>
              <Image src={project.logo} alt="" width={56} height={56} className="airbnb-project-logo" />
            </span>
          ) : null}
        </div>

        <h3 className="airbnb-project-title">{project.title}</h3>
        <p className={`airbnb-project-description ${featured ? "airbnb-project-description-featured" : ""}`}>{project.description}</p>

        <div className="airbnb-project-chip-row">
          {techChips.map((tech) => (
            <span key={`${project.slug}-${tech}`} className="airbnb-project-chip">
              {tech}
            </span>
          ))}
        </div>

        <div className="airbnb-project-actions">
          {caseStudyUrl ? (
            <a href={caseStudyUrl} target="_blank" rel="noreferrer" className="airbnb-project-action airbnb-project-action-primary">
              {copy.caseStudy}
            </a>
          ) : (
            <button type="button" className="airbnb-project-action airbnb-project-action-primary" onClick={() => onOpenCaseStudy(project)}>
              {copy.caseStudy}
            </button>
          )}

          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="airbnb-project-action airbnb-project-action-secondary">
              {copy.viewCode}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
