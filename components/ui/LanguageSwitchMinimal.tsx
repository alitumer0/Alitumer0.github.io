"use client";

import { languageCodes } from "@/lib/i18n";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

export function LanguageSwitchMinimal() {
  const { language, setLanguage } = usePortfolio();

  return (
    <div className="language-switch-minimal" role="group" aria-label="Language switch">
      {languageCodes.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`language-chip ${language === code ? "language-chip-active" : ""}`}
          aria-pressed={language === code}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
