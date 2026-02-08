"use client";

import { CSSProperties, useState } from "react";

type SoftGlassCardProps = {
  as?: "article" | "div";
  className?: string;
  children: React.ReactNode;
  spotlight?: boolean;
  sheen?: boolean;
};

type GlowStyle = CSSProperties & {
  "--mx"?: string;
  "--my"?: string;
};

export function SoftGlassCard({ as = "article", className = "", children, spotlight = false, sheen = true }: SoftGlassCardProps) {
  const [style, setStyle] = useState<GlowStyle>({ "--mx": "50%", "--my": "42%" });
  const Element = as;

  return (
    <Element
      className={`soft-glass-card ${spotlight ? "soft-glass-card-spotlight" : ""} ${className}`}
      style={style}
      onMouseMove={(event) => {
        if (!sheen) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const mx = ((event.clientX - bounds.left) / bounds.width) * 100;
        const my = ((event.clientY - bounds.top) / bounds.height) * 100;
        setStyle({ "--mx": `${mx}%`, "--my": `${my}%` });
      }}
      onMouseLeave={() => {
        if (!sheen) {
          return;
        }

        setStyle({ "--mx": "50%", "--my": "42%" });
      }}
    >
      <span className="soft-glass-noise" aria-hidden />
      <span className="soft-glass-sheen" aria-hidden />
      <div className="soft-glass-inner">{children}</div>
    </Element>
  );
}
