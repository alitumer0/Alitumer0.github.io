"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useEffect, useState } from "react";
import { ProjectCaseStudyModal } from "@/components/projects/ProjectCaseStudyModal";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { ChatSection } from "@/components/sections/ChatSection";
import { LanguagesSection } from "@/components/sections/LanguagesSection";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { SideScrollIndicator } from "@/components/ui/SideScrollIndicator";
import { ProjectTiltCard } from "@/components/ui/ProjectTiltCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getPortfolioContent, type ProjectItem } from "@/lib/pdf-content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FlowPortfolioContentProps = {
  reducedMotion: boolean;
};

export function FlowPortfolioContent({ reducedMotion }: FlowPortfolioContentProps) {
  const { language } = usePortfolio();
  const content = getPortfolioContent(language);
  const [caseStudyProject, setCaseStudyProject] = useState<ProjectItem | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

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

  // GSAP Hero and scroll animations
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero animations - Stagger effect on load
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        
        gsap.fromTo(
          heroElements,
          { y: 100, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      // Skills section reveal
      const skillsSection = document.querySelector('#skills');
      if (skillsSection) {
        gsap.fromTo(
          skillsSection.querySelectorAll('.skill-chip-card'),
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            scrollTrigger: {
              trigger: skillsSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Languages section reveal
      const langSection = document.querySelector('#languages');
      if (langSection) {
        gsap.fromTo(
          langSection,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: langSection,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Experience cards reveal
      const expSection = document.querySelector('#experience');
      if (expSection) {
        gsap.fromTo(
          expSection.querySelectorAll('.experience-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: expSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Project cards reveal with tilt effect
      const projectsSection = document.querySelector('#projects');
      if (projectsSection) {
        gsap.fromTo(
          projectsSection.querySelectorAll('.project-tilt-wrapper'),
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsSection,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Certifications reveal
      const certSection = document.querySelector('#certifications');
      if (certSection) {
        gsap.fromTo(
          certSection.querySelectorAll('.cert-card'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: certSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Contact section reveal
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        gsap.fromTo(
          contactSection,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: contactSection,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Chat section reveal
      const chatSection = document.querySelector('#chat');
      if (chatSection) {
        gsap.fromTo(
          chatSection,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: chatSection,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="flow-page">
      <SideScrollIndicator labels={content.sectionTitles} />

      {/* Hero Section with GSAP Animations */}
      <section 
        id="hero" 
        data-section-id="hero" 
        className="hero-section-new"
        ref={heroRef}
      >
        {/* Animated background */}
        <div className="hero-gradient-bg" />
        <div className="hero-grid" />
        
        <div className="hero-content-new">
          <p className="hero-eyebrow hero-animate">{content.name}</p>
          <h1 className="hero-title-new hero-animate">{content.title}</h1>
          <p className="hero-summary hero-animate">{content.heroHeadline}</p>

          <div className="hero-actions hero-animate">
            <a className="hero-action hero-action-primary" href="#projects">
              {content.cta.projects}
            </a>
            <a className="hero-action" href="#contact">
              {content.cta.contact}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line" />
        </div>
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

        {/* Experience Section */}
        <motion.section id="experience" data-section-id="experience" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.experience}</h2>
          </header>

          <div className="experience-grid single-col">
            {content.experience.map((item) => (
              <PremiumCard 
                key={`${item.org}-${item.period}`} 
                className="experience-card"
                sheen={true}
              >
                <p className="mini-kicker">{item.period}</p>
                <h3>{item.org}</h3>
                <p className="meta-line strong">{item.role}</p>
                <p>{item.detail}</p>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        {/* Projects Section with 3D Tilt Cards */}
        <motion.section id="projects" data-section-id="projects" className="flow-section" {...motionProps}>
          <header className="section-head">
            <h2>{content.sectionTitles.projects}</h2>
          </header>

          <div className="projects-showcase-stack">
            {featuredProject ? (
              <div className="project-tilt-wrapper">
                <ProjectTiltCard
                  key={featuredProject.slug}
                  title={featuredProject.title}
                  description={featuredProject.description}
                  tags={featuredProject.technologies || []}
                  image={featuredProject.image || undefined}
                  href={featuredProject.liveUrl || undefined}
                  featured={true}
                />
              </div>
            ) : null}

            <div className="projects-showcase-grid">
              {regularProjects.map((project) => (
                <div key={project.slug} className="project-tilt-wrapper">
                  <ProjectTiltCard
                    title={project.title}
                    description={project.description}
                    tags={project.technologies || []}
                    image={project.image || undefined}
                    href={project.liveUrl || undefined}
                  />
                </div>
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
            <GlassPanel className="contact-card">
              <div className="contact-list">
                {content.contacts.map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </a>
                ))}
              </div>
            </GlassPanel>
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
