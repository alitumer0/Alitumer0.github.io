"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { ThemeMode } from "@/components/providers/PortfolioProvider";

type FlowFieldHeroProps = {
  themeMode: ThemeMode;
  scrollProgress: number;
  fade: number;
  intensity: number;
  reducedMotion: boolean;
  blur?: number;
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
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const perfRef = useRef({ elapsed: 0, frames: 0 });
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uTheme: { value: themeMode === "night" ? 1 : 0 },
      uFade: { value: 1 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: 1 },
      uQuality: { value: quality }
    }),
    [quality, size.height, size.width, themeMode]
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

    if (perf.elapsed >= 1.15) {
      onFpsSample(perf.frames / perf.elapsed);
      perf.elapsed = 0;
      perf.frames = 0;
    }

    material.uniforms.uTime.value += reducedMotion ? 0 : delta;
    material.uniforms.uScroll.value = scrollProgress;
    material.uniforms.uTheme.value = THREE.MathUtils.damp(material.uniforms.uTheme.value as number, themeMode === "night" ? 1 : 0, 4, delta);
    material.uniforms.uFade.value = THREE.MathUtils.damp(material.uniforms.uFade.value as number, fade, 5, delta);
    material.uniforms.uIntensity.value = THREE.MathUtils.damp(material.uniforms.uIntensity.value as number, intensity, 5, delta);
    material.uniforms.uQuality.value = THREE.MathUtils.damp(material.uniforms.uQuality.value as number, quality, 4, delta);
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
          uniform float uFade;
          uniform vec2 uResolution;
          uniform float uIntensity;
          uniform float uQuality;

          varying vec2 vUv;

          float hash(vec2 p) {
            p = fract(p * vec2(234.34, 728.13));
            p += dot(p, p + 53.13);
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

          float fbm(vec2 p, float quality) {
            float value = 0.0;
            float amp = 0.5;
            float layers = mix(2.0, 3.0, quality);

            for (int i = 0; i < 3; i++) {
              float enabled = 1.0 - step(layers, float(i));
              value += amp * noise(p) * enabled;
              p = p * 2.02 + vec2(13.1, 3.7);
              amp *= 0.5;
            }

            return value;
          }

          vec3 paletteDay(float t) {
            vec3 c0 = vec3(0.985, 0.972, 0.94);
            vec3 c1 = vec3(0.79, 0.875, 0.94);
            vec3 c2 = vec3(0.69, 0.85, 0.84);
            vec3 c3 = vec3(0.998, 0.988, 0.968);
            vec3 mixed = mix(c0, c1, smoothstep(0.06, 0.44, t));
            mixed = mix(mixed, c2, smoothstep(0.34, 0.75, t));
            return mix(mixed, c3, smoothstep(0.72, 1.0, t));
          }

          vec3 paletteNight(float t) {
            vec3 c0 = vec3(0.08, 0.09, 0.12);
            vec3 c1 = vec3(0.19, 0.23, 0.34);
            vec3 c2 = vec3(0.3, 0.26, 0.41);
            vec3 c3 = vec3(0.2, 0.27, 0.42);
            vec3 mixed = mix(c0, c1, smoothstep(0.06, 0.44, t));
            mixed = mix(mixed, c2, smoothstep(0.34, 0.75, t));
            return mix(mixed, c3, smoothstep(0.72, 1.0, t));
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;
            p.x *= uResolution.x / max(1.0, uResolution.y);

            float t = uTime * mix(0.04, 0.22, uIntensity);
            float qScale = mix(0.76, 1.18, uQuality);

            vec2 warp = vec2(
              fbm(p * (1.35 * qScale) + vec2(t * 0.14, -t * 0.08), uQuality),
              fbm(p * (1.28 * qScale) + vec2(-t * 0.11, t * 0.15), uQuality)
            );

            float warpStrength = mix(0.12, 0.55, uIntensity);
            vec2 flow = p + (warp - 0.5) * warpStrength;

            float field = fbm(flow * (1.8 + qScale * 0.42) + vec2(t * 0.21, -t * 0.17), uQuality);
            float ribbon = smoothstep(0.2, 0.84, abs(sin((field + p.x * 0.7 - p.y * 0.46) * 6.6)));

            vec3 day = paletteDay(field);
            vec3 night = paletteNight(field);
            vec3 color = mix(day, night, uTheme);
            color = mix(color, color * 1.08, ribbon * 0.16 * uIntensity);

            float calm = mix(1.0, 0.78, smoothstep(0.0, 0.35, uScroll));
            color *= calm;

            float grain = (hash(uv * uResolution + uTime * 30.0) - 0.5) * 0.03;
            color += grain;

            float vignette = smoothstep(1.14, 0.22, length(uv - 0.5));
            color *= mix(0.88, 1.03, vignette);

            gl_FragColor = vec4(color, uFade);
          }
        `}
      />
    </mesh>
  );
}

export function FlowFieldHero({ themeMode, scrollProgress, fade, intensity, reducedMotion, blur = 0 }: FlowFieldHeroProps) {
  const [quality, setQuality] = useState(reducedMotion ? 0.55 : 1);
  const [dprMax, setDprMax] = useState(reducedMotion ? 1 : 1.25);

  const onFpsSample = useCallback(
    (fps: number) => {
      if (reducedMotion) {
        setQuality(0.55);
        setDprMax(1);
        return;
      }

      if (fps < 35) {
        setQuality(0.58);
        setDprMax(1);
        return;
      }

      if (fps < 48) {
        setQuality(0.76);
        setDprMax(1.25);
        return;
      }

      setQuality(1);
      setDprMax(1.25);
    },
    [reducedMotion]
  );

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

    if (reducedMotion || isLowEnd) {
      setQuality(0.55);
      setDprMax(1);
    }
  }, [reducedMotion]);

  return (
    <div
      className="flow-field-canvas fixed inset-0 -z-10"
      style={{
        opacity: fade,
        filter: `blur(${blur}px)`,
        pointerEvents: fade <= 0.02 ? "none" : "auto"
      }}
      aria-hidden
    >
      <Canvas
        dpr={[1, dprMax]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
        camera={{ position: [0, 0, 1.25], fov: 42 }}
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

