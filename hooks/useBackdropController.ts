"use client";

import { useMemo, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

type BackdropState = {
  scrollProgress: number;
  intensity: number;
  sectionMix: number;
  noise: number;
  activeSection: string;
};

type SectionTarget = {
  intensity: number;
  mix: number;
};

const SECTION_MAP: Record<string, SectionTarget> = {
  hero: { intensity: 1, mix: 0.02 },
  skills: { intensity: 0.36, mix: 0.26 },
  languages: { intensity: 0.42, mix: 0.38 },
  experience: { intensity: 0.32, mix: 0.48 },
  projects: { intensity: 0.62, mix: 0.72 },
  certifications: { intensity: 0.56, mix: 0.86 },
  contact: { intensity: 0.74, mix: 0.95 },
  chat: { intensity: 0.7, mix: 1 }
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useBackdropController(reducedMotion: boolean): BackdropState {
  const { activeSection } = usePortfolio();
  const { scrollY } = useScroll();

  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(scrollY, "change", (value) => {
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const viewportHeight = Math.max(window.innerHeight, 1);
    const maxScrollable = Math.max(docHeight - viewportHeight, 1);

    setScrollProgress(clamp(value / maxScrollable, 0, 1));
  });

  const target = SECTION_MAP[activeSection] ?? SECTION_MAP.hero;
  const intensity = reducedMotion ? Math.max(0.22, target.intensity * 0.35) : target.intensity;
  const noise = reducedMotion ? 0.22 : 1;

  return useMemo(
    () => ({
      scrollProgress,
      intensity,
      sectionMix: target.mix,
      noise,
      activeSection
    }),
    [activeSection, intensity, noise, scrollProgress, target.mix]
  );
}
