"use client";

import { motion } from "framer-motion";
import { CSSProperties } from "react";

type GlassPanelProps = {
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
};

export function GlassPanel({ className = "", children, style }: GlassPanelProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 190, damping: 18 }}
      className={`glass-panel ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
