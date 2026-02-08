"use client";

import { usePortfolio } from "@/components/providers/PortfolioProvider";

type SideScrollIndicatorProps = {
  labels: {
    hero: string;
    skills: string;
    languages: string;
    experience: string;
    projects: string;
    certifications: string;
    contact: string;
    chat: string;
  };
};

type Item = {
  id: string;
  label: string;
};

export function SideScrollIndicator({ labels }: SideScrollIndicatorProps) {
  const { activeSection } = usePortfolio();

  const items: Item[] = [
    { id: "hero", label: labels.hero },
    { id: "skills", label: labels.skills },
    { id: "languages", label: labels.languages },
    { id: "experience", label: labels.experience },
    { id: "projects", label: labels.projects },
    { id: "certifications", label: labels.certifications },
    { id: "contact", label: labels.contact },
    { id: "chat", label: labels.chat }
  ];

  return (
    <nav className="side-scroll-indicator" aria-label="Section navigation">
      {items.map((item) => {
        const active = activeSection === item.id;

        return (
          <a key={item.id} href={`#${item.id}`} className={`side-dot-item ${active ? "side-dot-item-active" : ""}`}>
            <span className="side-dot" aria-hidden />
            <span className="side-dot-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
