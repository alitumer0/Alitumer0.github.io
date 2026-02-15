"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { StaggerWords } from "@/components/ui/StaggerWords";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  location: string;
  bullets?: string[];
};

export function ExperienceSection() {
  const { t } = useTranslation();
  const items = t("experience", { returnObjects: true }) as ExperienceItem[];
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Horizontal scroll for timeline
      if (timelineRef.current) {
        const container = timelineRef.current;
        const cards = container.querySelectorAll(".timeline-card");
        
        // Create horizontal scroll effect
        const scrollTween = gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (cards.length - 1),
            end: () => `+=${container.offsetWidth * 2}`,
            invalidateOnRefresh: true,
          },
        });

        // Card animations
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      data-section-id="experience" 
      className="section-shell experience-section relative"
      ref={sectionRef}
    >
      <div className="ghost-word">EXPERIENCE</div>
      
      <div className="content-wrap relative z-10">
        <h2 ref={titleRef} className="section-title">
          <StaggerWords text={t("sectionTitles.experience")} />
        </h2>

        {/* Timeline navigation hint */}
        <div className="timeline-hint mt-4 flex items-center gap-2 text-sm text-[var(--text-muted)] opacity-60">
          <span className="scroll-icon">↔</span>
          <span>Scroll horizontally to explore timeline</span>
        </div>

        {/* Horizontal timeline container */}
        <div 
          ref={timelineRef}
          className="timeline-container mt-12 overflow-visible"
          style={{ 
            display: "flex",
            gap: "2rem",
            paddingBottom: "2rem",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.org}-${item.role}`}
              className="timeline-card flex-shrink-0"
              style={{ 
                width: "min(400px, 85vw)",
              }}
            >
              {/* Timeline connector */}
              {idx > 0 && (
                <div className="timeline-connector absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block" />
              )}
              
              {/* Icon with scale animation */}
              <div className="timeline-icon mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
                  <span className="text-xl">{idx + 1}</span>
                </div>
              </div>

              <GlassPanel className="h-full p-6 relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500" />
                
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/88">
                  {item.period}
                </p>
                <h3 className="mt-2 font-sans text-2xl font-semibold text-[var(--text-primary)]">
                  {item.org}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.role}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)] opacity-70">
                  {item.location}
                </p>

                {item.bullets ? (
                  <ul className="mt-5 space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm leading-relaxed text-[var(--text-muted)]">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Hover glow effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              </GlassPanel>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="timeline-progress mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <div 
              key={index} 
              className="timeline-dot w-2 h-2 rounded-full bg-cyan-500/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
