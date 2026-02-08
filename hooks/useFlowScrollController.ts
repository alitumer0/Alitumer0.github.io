"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

type FlowScrollState = {
  progress: number;
  fade: number;
  intensity: number;
  blur: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function useFlowScrollController() {
  const { scrollY } = useScroll();
  const [state, setState] = useState<FlowScrollState>({
    progress: 0,
    fade: 1,
    intensity: 1,
    blur: 0
  });

  useMotionValueEvent(scrollY, "change", (value) => {
    const viewportHeight = typeof window === "undefined" ? 1 : Math.max(window.innerHeight, 1);
    const progress = clamp(value / viewportHeight, 0, 1);

    const dissolve = smoothstep(0, 0.35, progress);
    const fade = 1 - dissolve;
    const intensity = 1 - dissolve * 0.65;
    const blur = dissolve * 6;

    setState({ progress, fade, intensity, blur });
  });

  return state;
}
