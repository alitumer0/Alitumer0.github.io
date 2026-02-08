"use client";

import { motion } from "framer-motion";

type GlassPanelProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassPanel({ className = "", children }: GlassPanelProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 190, damping: 18 }}
      className={`glass-panel ${className}`}
    >
      {children}
    </motion.div>
  );
}
