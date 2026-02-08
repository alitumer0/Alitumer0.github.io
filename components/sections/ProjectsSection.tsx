"use client";

import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { ProjectTiltCard } from "@/components/ui/ProjectTiltCard";
import { StaggerWords } from "@/components/ui/StaggerWords";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
  featured?: boolean;
};

export function ProjectsSection() {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true }) as Project[];
  const ongoing = t("ongoingProjects", { returnObjects: true }) as string[];

  return (
    <section id="projects" data-section-id="projects" className="section-shell">
      <div className="ghost-word">PROJECTS</div>

      <div className="content-wrap relative z-10">
        <h2 className="section-title">
          <StaggerWords text={t("sectionTitles.projects")} />
        </h2>

        <LocalizedTransition id="projects-grid">
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectTiltCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                href={project.href}
                featured={project.featured}
              />
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ongoing.map((project) => (
              <GlassPanel key={project} className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/85">Ongoing</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project}</p>
              </GlassPanel>
            ))}
          </div>
        </LocalizedTransition>
      </div>
    </section>
  );
}
