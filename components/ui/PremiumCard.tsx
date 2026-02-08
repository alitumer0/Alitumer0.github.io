"use client";

import { CSSProperties, useMemo, useState } from "react";

type PremiumCardProps = {
  as?: "article" | "div";
  className?: string;
  children: React.ReactNode;
  spotlight?: boolean;
  sheen?: boolean;
  style?: CSSProperties;
};

type PremiumStyle = CSSProperties & {
  "--px"?: string;
  "--py"?: string;
};

export function PremiumCard({ as = "article", className = "", children, spotlight = false, sheen = true, style }: PremiumCardProps) {
  const [pointerStyle, setPointerStyle] = useState<PremiumStyle>({ "--px": "50%", "--py": "36%" });
  const Element = as;

  const mergedStyle = useMemo(() => ({ ...style, ...pointerStyle }), [pointerStyle, style]);

  return (
    <Element
      className={`premium-card ${spotlight ? "premium-card-spotlight" : ""} ${className}`}
      style={mergedStyle}
      onMouseMove={(event) => {
        if (!sheen) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const px = ((event.clientX - bounds.left) / bounds.width) * 100;
        const py = ((event.clientY - bounds.top) / bounds.height) * 100;
        setPointerStyle({ "--px": `${px}%`, "--py": `${py}%` });
      }}
      onMouseLeave={() => {
        if (!sheen) {
          return;
        }
        setPointerStyle({ "--px": "50%", "--py": "36%" });
      }}
    >
      <span className="premium-card-noise" aria-hidden />
      <span className="premium-card-highlight" aria-hidden />
      <span className="premium-card-sweep" aria-hidden />
      <div className="premium-card-inner">{children}</div>
    </Element>
  );
}
