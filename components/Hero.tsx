"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";

type HeroProps = {
  progress: number;
};

const LANGS = ["tr", "en", "de"] as const;

export function Hero({ progress }: HeroProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = usePortfolio();

  const heroFade = Math.max(0, 1 - progress * 1.5);

  return (
    <section id="hero" data-section-id="hero" className="hero-section min-h-screen">
      <div className="hero-watermark" aria-hidden>
        {t("name")}
      </div>

      <LocalizedTransition id="hero-text">
        <motion.div style={{ opacity: heroFade }} className="hero-content pointer-events-auto">
          <h1 className="hero-name">{t("name")}</h1>
          <p className="hero-role">{t("title")}</p>
          <p className="hero-edu">{t("edu")}</p>

          <div className="hero-language-row">
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`lang-chip ${language === code ? "lang-chip-active" : ""}`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>
      </LocalizedTransition>
    </section>
  );
}
