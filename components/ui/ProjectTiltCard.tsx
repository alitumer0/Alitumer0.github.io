"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";

type ProjectTiltCardProps = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
  featured?: boolean;
};

export function ProjectTiltCard({ title, description, tags, image, href, featured }: ProjectTiltCardProps) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);

  const transform = useMotionTemplate`perspective(1300px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  const glow = useMotionTemplate`radial-gradient(circle at ${bgX}% ${bgY}%, rgba(255,255,255,0.28), transparent 48%)`;

  return (
    <motion.div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;

        rx.set((0.5 - py) * 12);
        ry.set((px - 0.5) * 12);
        bgX.set(px * 100);
        bgY.set(py * 100);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        bgX.set(50);
        bgY.set(50);
      }}
      style={{ transformStyle: "preserve-3d", transform }}
    >
      <GlassPanel className={`relative h-full overflow-hidden project-tilt-panel ${featured ? "project-tilt-panel-featured" : ""}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={900}
            height={520}
            className={`h-36 w-full rounded-2xl project-tilt-image ${featured ? "project-tilt-image-featured object-contain p-4" : "object-cover"}`}
          />
        ) : (
          <div className="h-36 w-full rounded-2xl project-tilt-fallback" />
        )}

        <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0" />

        <h3 className="mt-4 font-sans text-xl font-semibold tracking-wide text-[var(--text-primary)]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="project-tilt-tag rounded-full px-2.5 py-1 text-xs uppercase tracking-[0.12em]">
              {tag}
            </span>
          ))}
        </div>

        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="project-tilt-link mt-5 inline-block rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.14em]">
            View Project
          </a>
        ) : null}
      </GlassPanel>
    </motion.div>
  );
}
