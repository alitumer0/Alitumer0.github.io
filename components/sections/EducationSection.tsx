"use client";

import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { StaggerWords } from "@/components/ui/StaggerWords";

type EducationItem = {
  org: string;
  role: string;
  location: string;
  period: string;
};

export function EducationSection() {
  const { t } = useTranslation();
  const education = t("education", { returnObjects: true }) as EducationItem[];
  const certifications = t("certifications", { returnObjects: true }) as string[];

  return (
    <section id="education" data-section-id="education" className="section-shell">
      <div className="ghost-word">EDUCATION</div>

      <div className="content-wrap relative z-10">
        <h2 className="section-title">
          <StaggerWords text={t("sectionTitles.education")} />
        </h2>

        <LocalizedTransition id="education-grid">
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {education.map((item) => (
              <GlassPanel key={`${item.org}-${item.period}`} className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/85">{item.period}</p>
                <h3 className="mt-2 font-sans text-xl font-semibold text-[var(--text-primary)]">{item.org}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.role}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{item.location}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {certifications.map((cert) => (
              <GlassPanel key={cert} className="p-4">
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{cert}</p>
              </GlassPanel>
            ))}
          </div>
        </LocalizedTransition>
      </div>
    </section>
  );
}
