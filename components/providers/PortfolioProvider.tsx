"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18n, { type LanguageCode } from "@/lib/i18n";

export type ThemeMode = "night";

type PortfolioContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  themeMode: ThemeMode;
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const themeMode: ThemeMode = "night";
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const savedLang = window.localStorage.getItem("portfolio-lang") as LanguageCode | null;

    if (savedLang && ["en", "tr", "de"].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    void i18n.changeLanguage(language);
    window.localStorage.setItem("portfolio-lang", language);
  }, [language]);

  useEffect(() => {
    document.body.removeAttribute("data-theme");
    document.documentElement.dataset.theme = "night";
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      themeMode,
      activeSection,
      setActiveSection
    }),
    [language, activeSection]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }

  return context;
}
