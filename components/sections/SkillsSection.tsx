"use client";

import { useTranslation } from "react-i18next";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { SkillBadge3D } from "@/components/ui/SkillBadge3D";
import { StaggerWords } from "@/components/ui/StaggerWords";

type SkillGroup = {
  title: string;
  items: string[];
};

const badgeVariants = ["react", "backend", "database", "devops"] as const;

export function SkillsSection() {
  const { t } = useTranslation();
  const technicalSkills = t("technicalSkills", { returnObjects: true }) as SkillGroup[];
  const professionalSkills = t("professionalSkills", { returnObjects: true }) as SkillGroup[];

  return (
    <section id="skills" data-section-id="skills" className="section-shell">
      <div className="ghost-word">SKILLS</div>

      <div className="content-wrap relative z-10">
        <h2 className="section-title">
          <StaggerWords text={t("sectionTitles.skills")} />
        </h2>

        <LocalizedTransition id="skills-grid">
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {technicalSkills.map((group) => (
              <GlassPanel key={group.title} className="p-5">
                <h3 className="font-sans text-lg font-semibold text-[var(--text-primary)]">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{group.items.join(", ")}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {professionalSkills.map((group) => (
              <GlassPanel key={group.title} className="p-5">
                <h3 className="font-sans text-base font-semibold text-[var(--text-primary)]">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{group.items.join(", ")}</p>
              </GlassPanel>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technicalSkills.map((group, index) => (
              <SkillBadge3D
                key={`badge-${group.title}`}
                label={group.title}
                subtitle={group.items.slice(0, 3).join(" / ")}
                variant={badgeVariants[index]}
              />
            ))}
          </div>
        </LocalizedTransition>
      </div>
    </section>
  );
}
