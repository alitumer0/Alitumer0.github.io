"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { ThemeMode } from "@/components/providers/PortfolioProvider";

type FlowHeroCanvasProps = {
  themeMode: ThemeMode;
  scrollProgress: number;
  fade: number;
  intensity: number;
  reducedMotion: boolean;
  blur: number;
};

type FlowPlaneProps = {
  themeMode: ThemeMode;
  scrollProgress: number;
  fade: number;
  intensity: number;
  quality: number;
  reducedMotion: boolean;
  onFpsSample: (fps: number) => void;
};

function FlowPlane({ themeMode, scrollProgress, fade, intensity, quality, reducedMotion, onFpsSample }: FlowPlaneProps) {
  const { viewport, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const perfRef = useRef({ elapsed: 0, frames: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTheme: { value: themeMode === "night" ? 1 : 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: 1 },
      uFade: { value: 1 },
      uQuality: { value: quality },
      uReducedMotion: { value: reducedMotion ? 1 : 0 }
    }),
    [quality, reducedMotion, size.height, size.width, themeMode]
  );

  useEffect(() => {
    const material = materialRef.current;
    if (!material) {
      return;
    }

    material.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.height, size.width]);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) {
      return;
    }

    const perf = perfRef.current;
    perf.elapsed += delta;
    perf.frames += 1;

    if (perf.elapsed >= 1.2) {
      onFpsSample(perf.frames / perf.elapsed);
      perf.elapsed = 0;
      perf.frames = 0;
    }

    material.uniforms.uTime.value += reducedMotion ? 0 : delta;
    material.uniforms.uScroll.value = scrollProgress;
    material.uniforms.uTheme.value = THREE.MathUtils.damp(material.uniforms.uTheme.value as number, themeMode === "night" ? 1 : 0, 4, delta);
    material.uniforms.uIntensity.value = THREE.MathUtils.damp(material.uniforms.uIntensity.value as number, intensity, 5, delta);
    material.uniforms.uFade.value = THREE.MathUtils.damp(material.uniforms.uFade.value as number, fade, 6, delta);
    material.uniforms.uQuality.value = THREE.MathUtils.damp(material.uniforms.uQuality.value as number, quality, 4, delta);
    material.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          precision highp float;

          uniform float uTime;
          uniform float uScroll;
          uniform float uTheme;
          uniform vec2 uResolution;
          uniform float uIntensity;
          uniform float uFade;
          uniform float uQuality;
          uniform float uReducedMotion;

          varying vec2 vUv;

          float hash(vec2 p) {
            p = fract(p * vec2(234.34, 657.78));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amp = 0.5;

            // Layered noise produces a soft flow-field base.
            for (int i = 0; i < 3; i++) {
              value += amp * noise(p);
              p *= 2.02;
              amp *= 0.52;
            }

            return value;
          }

          vec3 dayPalette(float t) {
            vec3 c0 = vec3(0.985, 0.972, 0.94);
            vec3 c1 = vec3(0.79, 0.875, 0.94);
            vec3 c2 = vec3(0.69, 0.85, 0.84);
            return mix(mix(c0, c1, smoothstep(0.15, 0.62, t)), c2, smoothstep(0.56, 0.95, t));
          }

          vec3 nightPalette(float t) {
            vec3 c0 = vec3(0.08, 0.09, 0.12);
            vec3 c1 = vec3(0.19, 0.23, 0.34);
            vec3 c2 = vec3(0.3, 0.26, 0.41);
            return mix(mix(c0, c1, smoothstep(0.15, 0.62, t)), c2, smoothstep(0.56, 0.95, t));
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= uResolution.x / max(1.0, uResolution.y);

            float t = uTime * mix(0.08, 0.28, 1.0 - uReducedMotion);

            // Domain warping simulates liquid advection without heavy particles.
            vec2 q = vec2(
              fbm(p * (1.2 + 0.6 * uQuality) + vec2(t * 0.14, -t * 0.07)),
              fbm(p * (1.3 + 0.5 * uQuality) + vec2(-t * 0.1, t * 0.17))
            );

            float warpStrength = mix(0.1, 0.56, uIntensity) * mix(0.65, 1.0, uQuality);
            vec2 w = p + (q - 0.5) * warpStrength;

            float field = fbm(w * (1.7 + 0.85 * uQuality) + vec2(t * 0.21, -t * 0.16));
            float ridges = smoothstep(0.24, 0.82, abs(sin((field + p.x * 0.8 - p.y * 0.58) * 6.2)));

            vec3 day = dayPalette(field);
            vec3 night = nightPalette(field);
            vec3 color = mix(day, night, uTheme);

            color = mix(color, color * 1.08, ridges * 0.2 * uIntensity);

            // Scroll mapping calms brightness while scene dissolves to content.
            float calm = mix(1.0, 0.72, smoothstep(0.0, 0.35, uScroll));
            color *= calm;

            float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.04;
            color += grain;

            float vignette = smoothstep(1.06, 0.26, length(uv - 0.5));
            color *= mix(0.86, 1.03, vignette);

            gl_FragColor = vec4(color, uFade);
          }
        `}
      />
    </mesh>
  );
}

export function FlowHeroCanvas({ themeMode, scrollProgress, fade, intensity, reducedMotion, blur }: FlowHeroCanvasProps) {
  const [quality, setQuality] = useState(1);
  const [dprMax, setDprMax] = useState(1.25);
  const [qualityTier, setQualityTier] = useState<"high" | "mid" | "low">(reducedMotion ? "low" : "high");

  const onFpsSample = useCallback(
    (fps: number) => {
      if (reducedMotion) {
        if (qualityTier !== "low") {
          setQualityTier("low");
          setQuality(0.56);
          setDprMax(1.0);
        }
        return;
      }

      if (fps < 36 && qualityTier !== "low") {
        setQualityTier("low");
        setQuality(0.56);
        setDprMax(1.0);
        return;
      }

      if (fps >= 36 && fps < 50 && qualityTier !== "mid") {
        setQualityTier("mid");
        setQuality(0.76);
        setDprMax(1.2);
        return;
      }

      if (fps > 56 && qualityTier !== "high") {
        setQualityTier("high");
        setQuality(1);
        setDprMax(1.25);
      }
    },
    [qualityTier, reducedMotion]
  );

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

    if (reducedMotion || isLowEnd) {
      setQualityTier("low");
      setQuality(0.56);
      setDprMax(1.0);
    }
  }, [reducedMotion]);

  const pointerEvents = fade <= 0.02 ? "none" : "auto";

  return (
    <div className="flow-canvas-wrap fixed inset-0 -z-10" style={{ opacity: fade, filter: `blur(${blur}px)`, pointerEvents }} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 1.3], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
        dpr={[1, dprMax]}
      >
        <FlowPlane
          themeMode={themeMode}
          scrollProgress={scrollProgress}
          fade={fade}
          intensity={intensity}
          quality={quality}
          reducedMotion={reducedMotion}
          onFpsSample={onFpsSample}
        />
      </Canvas>
    </div>
  );
}

