"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePortfolio } from "@/components/providers/PortfolioProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  progress: number;
};

const LANGS = ["tr", "en", "de"] as const;

export function Hero({ progress }: HeroProps) {
  const { t } = useTranslation();
  const { language, setLanguage } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const eduRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const heroFade = Math.max(0, 1 - progress * 1.5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name animation - letter by letter stagger
      if (nameRef.current) {
        const nameText = nameRef.current.textContent || "";
        nameRef.current.innerHTML = nameText
          .split("")
          .map((char) => `<span class="hero-letter">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        const letters = nameRef.current.querySelectorAll(".hero-letter");
        gsap.fromTo(
          letters,
          { y: 120, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.03,
            ease: "power4.out",
            delay: 0.3,
          }
        );
      }

      // Role animation
      if (roleRef.current) {
        gsap.fromTo(
          roleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }

      // Education animation
      if (eduRef.current) {
        gsap.fromTo(
          eduRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: 1,
          }
        );
      }

      // Language buttons animation
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { y: 20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 1.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" data-section-id="hero" className="hero-section min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="hero-gradient-bg" aria-hidden />

      {/* Grid pattern overlay */}
      <div className="hero-grid" aria-hidden />

      <div className="hero-watermark" aria-hidden>
        {t("name")}
      </div>

      <div
        ref={containerRef}
        style={{ opacity: heroFade }}
        className="hero-content pointer-events-auto relative z-10"
      >
        <h1
          ref={nameRef}
          className="hero-name text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
        >
          {t("name")}
        </h1>
        <p
          ref={roleRef}
          className="hero-role text-xl md:text-2xl lg:text-3xl mt-4 font-light"
        >
          {t("title")}
        </p>
        <p
          ref={eduRef}
          className="hero-edu text-sm md:text-base mt-2 opacity-70"
        >
          {t("edu")}
        </p>

        <div ref={buttonsRef} className="hero-language-row mt-8">
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
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
