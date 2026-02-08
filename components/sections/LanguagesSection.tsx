"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import type { LanguageItem } from "@/lib/pdf-content";

type LanguagesSectionProps = {
  title: string;
  languages: LanguageItem[];
};

function getLevelBadge(level: string) {
  const upper = level.toUpperCase();
  if (upper.includes("B2")) {
    return "B2";
  }
  if (upper.includes("B1")) {
    return "B1";
  }
  if (upper.includes("NATIVE") || upper.includes("ANA") || upper.includes("MUTTER")) {
    return "Native";
  }
  return level;
}

export function LanguagesSection({ title, languages }: LanguagesSectionProps) {
  return (
    <>
      <header className="section-head">
        <h2>{title}</h2>
      </header>

      <div className="languages-grid single-col">
        {languages.map((item) => (
          <PremiumCard key={`${item.name}-${item.level}`} className="language-card" as="div" sheen={false}>
            <div className="language-card-row">
              <div>
                <h3>{item.name}</h3>
                <p>{item.level}</p>
                {item.note ? <p className="mini-kicker">{item.note}</p> : null}
              </div>
              <span className="language-level-badge">{getLevelBadge(item.level)}</span>
            </div>
          </PremiumCard>
        ))}
      </div>
    </>
  );
}
