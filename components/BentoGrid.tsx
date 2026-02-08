"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MagneticTiltCard } from "@/components/ui/MagneticTiltCard";
import { LocalizedTransition } from "@/components/ui/LocalizedTransition";
import { MiniFridgeCanvas } from "@/components/three/MiniFridgeCanvas";

type BentoGridProps = {
  onFridgeHover: (active: boolean) => void;
};

const stack = ["Next.js", "React", "TypeScript", "Three.js", "Framer Motion", "Tailwind"];

export function BentoGrid({ onFridgeHover }: BentoGridProps) {
  const { t } = useTranslation();

  return (
    <section id="experience" data-section-id="experience" className="portfolio-section pb-28 pt-[34vh]">
      <div className="content-shell">
        <LocalizedTransition id="bento-header">
          <h2 className="section-heading">{t("edu")}</h2>
        </LocalizedTransition>

        <div className="bento-grid mt-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.02, ease: "easeOut" }}
          >
            <MagneticTiltCard className="bento-card bento-main" onHoverChange={onFridgeHover}>
              <MiniFridgeCanvas />
              <LocalizedTransition id="fridge-card-title">
                <h3 className="card-title">{t("fridge")}</h3>
              </LocalizedTransition>
              <div className="tag-row">
                {stack.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </MagneticTiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          >
            <MagneticTiltCard className="bento-card bento-side">
              <LocalizedTransition id="identity-card">
                <h3 className="card-title">{t("name")}</h3>
              </LocalizedTransition>
              <p className="card-subtitle">{t("title")}</p>
              <p className="card-subtitle mt-4">{t("edu")}</p>
            </MagneticTiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
          >
            <MagneticTiltCard className="bento-card bento-contact">
              <LocalizedTransition id="mail-title">
                <h3 className="card-title">{t("name")}</h3>
              </LocalizedTransition>
              <div className="mt-5 flex items-center gap-3">
                <a href="mailto:aetumer50@gmail.com" className="contact-cta">
                  aetumer50@gmail.com
                </a>
                <a href="https://github.com/alitumer0" target="_blank" rel="noreferrer" className="contact-mini">
                  GitHub
                </a>
              </div>
            </MagneticTiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
