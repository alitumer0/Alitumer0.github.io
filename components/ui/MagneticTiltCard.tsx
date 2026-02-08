"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type MagneticTiltCardProps = {
  className?: string;
  children: React.ReactNode;
  onHoverChange?: (isHovering: boolean) => void;
};

export function MagneticTiltCard({ className = "", children, onHoverChange }: MagneticTiltCardProps) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const transform = useMotionTemplate`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 45%)`;

  return (
    <motion.article
      className={`glass-card ${className}`}
      style={{ transformStyle: "preserve-3d", transform }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;

        rx.set((0.5 - py) * 10);
        ry.set((px - 0.5) * 10);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        gx.set(50);
        gy.set(50);
        onHoverChange?.(false);
      }}
      onMouseEnter={() => {
        onHoverChange?.(true);
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}
