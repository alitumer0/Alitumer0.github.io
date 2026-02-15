"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);
  const scale = useMotionValue(1);

  // Magnetic effect - card follows mouse slightly
  const magneticStrength = 0.15;

  const transform = useMotionTemplate`perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
  const glow = useMotionTemplate`radial-gradient(circle at ${bgX}% ${bgY}%, rgba(122, 197, 255, 0.25), transparent 50%)`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;

      // 3D tilt effect
      rx.set((0.5 - py) * 15);
      ry.set((px - 0.5) * 15);
      
      // Glow position
      bgX.set(px * 100);
      bgY.set(py * 100);
      
      // Magnetic scale effect
      scale.set(1 + Math.sqrt(Math.pow(px - 0.5, 2) + Math.pow(py - 0.5, 2)) * magneticStrength);
    };

    const handleMouseLeave = () => {
      rx.set(0);
      ry.set(0);
      bgX.set(50);
      bgY.set(50);
      scale.set(1);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rx, ry, bgX, bgY, scale]);

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        transformStyle: "preserve-3d", 
        transform,
        perspective: "1500px",
      }}
      className="project-tilt-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassPanel className={`relative h-full overflow-hidden project-tilt-panel ${featured ? "project-tilt-panel-featured" : ""}`}>
        {/* Glow overlay */}
        <motion.div 
          style={{ background: glow }} 
          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay" 
        />
        
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

        <h3 className="mt-4 font-sans text-xl font-semibold tracking-wide text-[var(--text-primary)] relative z-20">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] relative z-20">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 relative z-20">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="project-tilt-tag rounded-full px-2.5 py-1 text-xs uppercase tracking-[0.12em]"
            >
              {tag}
            </span>
          ))}
        </div>

        {href ? (
          <a 
            href={href} 
            target="_blank" 
            rel="noreferrer" 
            className="project-tilt-link mt-5 inline-block rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.14em] relative z-20"
          >
            View Project
          </a>
        ) : null}
        
        {/* Border glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 20px rgba(122, 197, 255, 0.1)",
          }}
        />
      </GlassPanel>
    </motion.div>
  );
}
