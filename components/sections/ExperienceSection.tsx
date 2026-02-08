"use client";

import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { StaggerWords } from "@/components/ui/StaggerWords";

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

  return (
    <section id="experience" data-section-id="experience" className="section-shell">
      <div className="ghost-word">EXPERIENCE</div>
      <div className="content-wrap relative z-10">
        <h2 className="section-title">
          <StaggerWords text={t("sectionTitles.experience")} />
        </h2>

        <LocalizedTransition id="exp-grid">
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <GlassPanel key={`${item.org}-${item.role}`} className="h-full p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/88">{item.period}</p>
                <h3 className="mt-2 font-sans text-2xl font-semibold text-[var(--text-primary)]">{item.org}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.role}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{item.location}</p>

                {item.bullets ? (
                  <ul className="mt-5 space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </GlassPanel>
            ))}
          </div>
        </LocalizedTransition>
      </div>
    </section>
  );
}
