"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState, useEffect } from "react";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

type FloatingPanelsProps = {
  lensX: number;
  lensY: number;
  onFridgeHighlight: () => void;
};

type LocaleCopy = {
  intro: string;
  profileHeading: string;
  profileBody: string;
  projectHeading: string;
  projectBody: string;
  contactHeading: string;
  contactBody: string;
};

const copyByLanguage: Record<"tr" | "en" | "de", LocaleCopy> = {
  tr: {
    intro: "Mühendis ve sanatçı arasındaki çizgide, berrak ve yüksek performanslı arayüzler.",
    profileHeading: "Profil",
    profileBody: "BilgeAdam Bootcamp (2024-2025) sürecinde modern frontend, backend ve ürün odaklı geliştirme pratiği.",
    projectHeading: "Öne Çıkan Proje",
    projectBody: "Whats My Fridge, eldeki malzemelere göre tarif öneren akıllı mutfak asistanı deneyimi.",
    contactHeading: "İletişim",
    contactBody: "Yeni ürünler, iş birlikleri ve yaratıcı geliştirme görevleri için ulaşabilirsiniz."
  },
  en: {
    intro: "On the line between engineer and artist: clean, high-performance interfaces.",
    profileHeading: "Profile",
    profileBody: "BilgeAdam Bootcamp (2024-2025) focused on modern frontend, backend, and product-driven software development.",
    projectHeading: "Project Highlight",
    projectBody: "Whats My Fridge is a smart kitchen assistant that suggests recipes from available ingredients.",
    contactHeading: "Contact",
    contactBody: "Available for product builds, collaborations, and creative development roles."
  },
  de: {
    intro: "An der Schnittstelle von Ingenieur und Künstler: klare, performante Interfaces.",
    profileHeading: "Profil",
    profileBody: "BilgeAdam Bootcamp (2024-2025) mit Fokus auf modernes Frontend, Backend und produktorientierte Entwicklung.",
    projectHeading: "Projekt-Highlight",
    projectBody: "Whats My Fridge ist ein smarter Küchenassistent, der Rezepte aus vorhandenen Zutaten vorschlägt.",
    contactHeading: "Kontakt",
    contactBody: "Offen für Produktprojekte, Kooperationen und kreative Softwareentwicklung."
  }
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function FloatingPanel({
  className,
  lensX,
  lensY,
  children,
  onHover
}: {
  className: string;
  lensX: number;
  lensY: number;
  children: React.ReactNode;
  onHover?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const lensPx = lensX * window.innerWidth;
    const lensPy = lensY * window.innerHeight;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distance = Math.hypot(cx - lensPx, cy - lensPy);
    const spread = Math.max(rect.width, rect.height) * 1.42;
    const proximity = clamp(1 - distance / spread, 0, 1);

    setFocus(proximity);
  }, [lensX, lensY]);

  return (
    <motion.article
      ref={ref}
      className={`floating-panel ${className}`}
      animate={{
        scale: 1 + focus * 0.12,
        filter: `contrast(${1 + focus * 0.22}) saturate(${1 + focus * 0.18})`,
        y: -focus * 10
      }}
      transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.8 }}
      onMouseEnter={onHover}
    >
      {children}
      <motion.span
        className="panel-lens-glow"
        animate={{ opacity: 0.12 + focus * 0.34 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}

export function FloatingPanels({ lensX, lensY, onFridgeHighlight }: FloatingPanelsProps) {
  const { t } = useTranslation();
  const { language } = usePortfolio();

  const copy = useMemo(() => copyByLanguage[language], [language]);

  return (
    <main className="gallery-root">
      <section id="hero" className="hero-copy-block">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.72, 0.26, 1] }}
        >
          {t("name")}
        </motion.h1>
        <p className="hero-subtitle">{t("title")}</p>
        <p className="hero-intro">{copy.intro}</p>
      </section>

      <section id="gallery" className="panel-field">
        <FloatingPanel className="panel-a panel-float-a" lensX={lensX} lensY={lensY}>
          <p className="panel-kicker">{copy.profileHeading}</p>
          <h2>{t("edu")}</h2>
          <p>{copy.profileBody}</p>
        </FloatingPanel>

        <FloatingPanel className="panel-b panel-float-b" lensX={lensX} lensY={lensY} onHover={onFridgeHighlight}>
          <p className="panel-kicker">{copy.projectHeading}</p>
          <h2>{t("fridge")}</h2>
          <p>{copy.projectBody}</p>
        </FloatingPanel>

        <FloatingPanel className="panel-c panel-float-c" lensX={lensX} lensY={lensY}>
          <p className="panel-kicker">{copy.contactHeading}</p>
          <h2>aetumer50@gmail.com</h2>
          <p>{copy.contactBody}</p>
          <a href="mailto:aetumer50@gmail.com" className="panel-link">
            Send mail
          </a>
        </FloatingPanel>
      </section>
    </main>
  );
}
