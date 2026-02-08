"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

export function useSectionObserver() {
  const { setActiveSection } = usePortfolio();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-id]"));
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        const current = visible[0]?.target as HTMLElement;
        const sectionId = current.dataset.sectionId ?? "hero";
        setActiveSection(sectionId);
      },
      {
        threshold: [0.2, 0.35, 0.55, 0.75],
        rootMargin: "-18% 0px -22% 0px"
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);
}
