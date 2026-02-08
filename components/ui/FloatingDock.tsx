"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";

type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

function MagneticDockItem({ item }: { item: DockItem }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;

  return (
    <motion.a
      href={item.href}
      className="dock-item"
      whileHover={{ width: 188 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{ transform }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;

        x.set(px * 10);
        y.set(py * 8);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <span className="dock-icon">{item.icon}</span>
      <span className="dock-text">{item.label}</span>
    </motion.a>
  );
}

export function FloatingDock() {
  const { t } = useTranslation();

  const items: DockItem[] = [
    { id: "hero", label: t("name"), href: "#hero", icon: "◉" },
    { id: "exp", label: t("edu"), href: "#experience", icon: "◎" },
    { id: "fridge", label: t("fridge"), href: "#experience", icon: "⬡" },
    { id: "mail", label: "aetumer50@gmail.com", href: "mailto:aetumer50@gmail.com", icon: "✦" }
  ];

  return (
    <nav className="floating-dock pointer-events-auto" aria-label="Portfolio dock">
      {items.map((item) => (
        <MagneticDockItem key={item.id} item={item} />
      ))}
    </nav>
  );
}
