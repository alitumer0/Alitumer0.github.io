"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { ProjectTiltCard } from "@/components/ui/ProjectTiltCard";
import { StaggerWords } from "@/components/ui/StaggerWords";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Projects grid reveal animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card-wrapper");
        
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" data-section-id="projects" className="section-shell relative" ref={sectionRef}>
      <div className="ghost-word">PROJECTS</div>

      <div className="content-wrap relative z-10">
        <h2 ref={titleRef} className="section-title">
          <StaggerWords text={t("sectionTitles.projects")} />
        </h2>

        <LocalizedTransition id="projects-grid">
          <div ref={gridRef} className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card-wrapper"
                style={{
                  perspective: "1500px",
                }}
              >
                <ProjectTiltCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  href={project.href}
                  featured={project.featured}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ongoing.map((project, index) => (
              <GlassPanel
                key={project}
                className="project-card-wrapper p-5"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards`,
                  animationDelay: `${index * 0.1 + 0.5}s`,
                }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/85">Ongoing</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project}</p>
              </GlassPanel>
            ))}
          </div>
        </LocalizedTransition>
      </div>

      {/* Scroll progress indicator */}
      <div className="projects-progress" />
    </section>
  );
}
