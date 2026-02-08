"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePortfolio } from "@/components/providers/PortfolioProvider";

export function LocalizedTransition({ children, id }: { children: React.ReactNode; id: string }) {
  const { language } = usePortfolio();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${id}-${language}`}
        initial={{ opacity: 0, y: 14, x: -8, filter: "blur(8px)", clipPath: "inset(0 0 100% 0)" }}
        animate={{
          opacity: 1,
          y: 0,
          x: [4, -3, 0],
          filter: "blur(0px)",
          clipPath: "inset(0 0 0% 0)"
        }}
        exit={{ opacity: 0, y: -12, x: 8, filter: "blur(6px)", clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
