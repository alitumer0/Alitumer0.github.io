"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AirbnbProjectCard } from "@/components/projects/AirbnbProjectCard";
import { ProjectCaseStudyModal } from "@/components/projects/ProjectCaseStudyModal";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { ChatSection } from "@/components/sections/ChatSection";
import { LanguagesSection } from "@/components/sections/LanguagesSection";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SideScrollIndicator } from "@/components/ui/SideScrollIndicator";
import { getPortfolioContent, type ProjectItem } from "@/lib/pdf-content";

type FlowPortfolioContentProps = {
  reducedMotion: boolean;
};

export function FlowPortfolioContent({ reducedMotion }: FlowPortfolioContentProps) {
  const { language } = usePortfolio();
  const content = getPortfolioContent(language);
  const [caseStudyProject, setCaseStudyProject] = useState<ProjectItem | null>(null);

  const { featuredProject, regularProjects } = useMemo(() => {
    const featured = content.projects.find((project) => project.featured) ?? content.projects[0] ?? null;
    const regular = featured ? content.projects.filter((project) => project.slug !== featured.slug) : content.projects;

    return {
      featuredProject: featured,
      regularProjects: regular
    };
  }, [content.projects]);

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] }
      };

  return (
    <div className="flow-page">
      <SideScrollIndicator labels={content.sectionTitles} />

      <section id="hero" data-section-id="hero" className="flow-hero-stage">
        <PremiumCard as="div" className="hero-premium-card" spotlight>
          <p className="hero-eyebrow">{content.name}</p>
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-summary">{content.heroHeadline}</p>

          <div className="hero-actions">
            <a className="hero-action hero-action-primary" href="#projects">
              {content.cta.projects}
            </a>
            <a className="hero-action" href="#contact">
              {content.cta.contact}
            </a>
          </div>
        </PremiumCard>
      </section>

      <main className="flow-main-content">
        <motion.section id="skills" data-section-id="skills" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.skills}</h2>
          </header>

          <div className="skills-chip-grid">
            {content.professionalSkills.map((skill) => (
              <PremiumCard key={skill} as="div" className="skill-chip-card" sheen={false}>
                <p>{skill}</p>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        <motion.section id="languages" data-section-id="languages" className="flow-section" {...motionProps}>
          <LanguagesSection title={content.sectionTitles.languages} languages={content.languages} />
        </motion.section>

        <motion.section id="experience" data-section-id="experience" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.experience}</h2>
          </header>

          <div className="experience-grid single-col">
            {content.experience.map((item) => (
              <PremiumCard key={`${item.org}-${item.period}`} className="experience-card">
                <p className="mini-kicker">{item.period}</p>
                <h3>{item.org}</h3>
                <p className="meta-line strong">{item.role}</p>
                <p>{item.detail}</p>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" data-section-id="projects" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.projects}</h2>
          </header>

          <div className="projects-showcase-stack">
            {featuredProject ? (
              <AirbnbProjectCard project={featuredProject} copy={content.projectShowcase} onOpenCaseStudy={setCaseStudyProject} variant="featured" priority />
            ) : null}

            <div className="projects-showcase-grid">
              {regularProjects.map((project) => (
                <AirbnbProjectCard key={project.slug} project={project} copy={content.projectShowcase} onOpenCaseStudy={setCaseStudyProject} variant="normal" />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="certifications" data-section-id="certifications" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.certifications}</h2>
          </header>

          <div className="certifications-grid single-col">
            {content.certifications.map((cert) => (
              <PremiumCard key={`${cert.title}-${cert.issuer}`} className="cert-card">
                <div className="cert-card-head">
                  {cert.logo ? (
                    <span className="cert-logo-wrap" aria-hidden>
                      <Image src={cert.logo} alt="" width={80} height={80} className="cert-logo" />
                    </span>
                  ) : null}

                  <div>
                    <p className="mini-kicker">{cert.date}</p>
                    <h3>{cert.title}</h3>
                    <p className="meta-line strong">{cert.issuer}</p>
                  </div>
                </div>

                <div className="tag-row">
                  {cert.skills.map((skill) => (
                    <span key={`${cert.title}-${skill}`} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>

                {cert.credentialUrl ? (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="github-link-chip">
                    <span>{content.cta.credential}</span>
                  </a>
                ) : null}
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" data-section-id="contact" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.contact}</h2>
          </header>

          <div className="contact-grid single-col">
            <PremiumCard className="contact-card">
              <div className="contact-list">
                {content.contacts.map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </a>
                ))}
              </div>
            </PremiumCard>
          </div>
        </motion.section>

        <motion.section id="chat" data-section-id="chat" className="flow-section flow-section-chat" {...motionProps}>
          <ChatSection title={content.sectionTitles.chat} chat={content.chat} />
        </motion.section>

        <ProjectCaseStudyModal project={caseStudyProject} copy={content.projectShowcase} onClose={() => setCaseStudyProject(null)} />
      </main>
    </div>
  );
}
