"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type GlobalBackdropProps = {
  scrollProgress: number;
  sectionMix: number;
  intensity: number;
  noise: number;
  reducedMotion: boolean;
};

type GradientFlowPlaneProps = {
  scrollProgress: number;
  sectionMix: number;
  intensity: number;
  noise: number;
  reducedMotion: boolean;
  octaves: number;
  onFpsSample: (fps: number) => void;
};

type RenderDriverProps = {
  enabled: boolean;
  targetFps: number;
};

function RenderDriver({ enabled, targetFps }: RenderDriverProps) {
  const { invalidate } = useThree();

  useEffect(() => {
    if (!enabled || targetFps <= 0) {
      return;
    }

    let raf = 0;
    let previous = performance.now();
    let acc = 0;
    const frameBudget = 1000 / targetFps;

    const tick = (now: number) => {
      acc += now - previous;
      previous = now;

      if (acc >= frameBudget) {
        acc = 0;
        invalidate();
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(raf);
  }, [enabled, invalidate, targetFps]);

  return null;
}

function GradientFlowPlane({ scrollProgress, sectionMix, intensity, noise, reducedMotion, octaves, onFpsSample }: GradientFlowPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { invalidate } = useThree();
  const perfRef = useRef({ elapsed: 0, emaFps: 60 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBreak: { value: 0 },
      uIntensity: { value: intensity },
      uSectionMix: { value: sectionMix },
      uNoise: { value: noise },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uOctaves: { value: octaves }
    }),
    [intensity, noise, octaves, reducedMotion, sectionMix]
  );

  useEffect(() => {
    invalidate();
  }, [intensity, invalidate, noise, octaves, reducedMotion, scrollProgress, sectionMix]);

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) {
      return;
    }

    const perf = perfRef.current;
    const fps = 1 / Math.max(0.0001, delta);
    perf.emaFps = perf.emaFps * 0.88 + fps * 0.12;
    perf.elapsed += delta;

    if (perf.elapsed >= 1.4) {
      onFpsSample(perf.emaFps);
      perf.elapsed = 0;
    }

    const breakTarget = THREE.MathUtils.smoothstep(scrollProgress, 0.02, 0.35);

    material.uniforms.uTime.value += reducedMotion ? 0 : delta;
    material.uniforms.uBreak.value = THREE.MathUtils.damp(material.uniforms.uBreak.value as number, breakTarget, 6, delta);
    material.uniforms.uIntensity.value = THREE.MathUtils.damp(material.uniforms.uIntensity.value as number, intensity, 5, delta);
    material.uniforms.uSectionMix.value = THREE.MathUtils.damp(material.uniforms.uSectionMix.value as number, sectionMix, 5, delta);
    material.uniforms.uNoise.value = THREE.MathUtils.damp(material.uniforms.uNoise.value as number, noise, 5, delta);
    material.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0;
    material.uniforms.uOctaves.value = THREE.MathUtils.damp(material.uniforms.uOctaves.value as number, octaves, 8, delta);
  });

  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[24, 16]} />
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
          uniform float uBreak;
          uniform float uIntensity;
          uniform float uSectionMix;
          uniform float uNoise;
          uniform float uReducedMotion;
          uniform float uOctaves;

          varying vec2 vUv;

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
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

          float fbm(vec2 p, float octaveCount) {
            float value = 0.0;
            float amplitude = 0.5;

            for (int i = 0; i < 2; i++) {
              if (float(i) >= octaveCount) {
                break;
              }

              value += noise(p) * amplitude;
              p *= 2.02;
              amplitude *= 0.52;
            }

            return value;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv - 0.5;

            float motion = 1.0 - uReducedMotion;
            float t = uTime * motion;
            float octaveCount = clamp(uOctaves, 1.0, 2.0);

            vec2 drift = vec2(t * 0.035, -t * 0.028);
            vec2 base = p * vec2(1.24, 1.02);

            float n1 = fbm(base * 1.7 + drift, octaveCount);
            float n2 = fbm(base * 2.1 - drift * 0.82 + vec2(1.4, -2.0), octaveCount);

            vec2 warp = vec2(n1, n2) - 0.5;
            float warpStrength = mix(0.035, 0.15, uBreak) * mix(0.82, 1.0, uIntensity);
            vec2 q = base + warp * warpStrength;

            float field = fbm(q * (1.95 + uSectionMix * 0.26) + vec2(-t * 0.018, t * 0.014), octaveCount);
            float breakupField = noise(q * 2.9 + drift + vec2(2.1, -1.2));

            vec3 nightBase = vec3(0.08, 0.09, 0.12);
            vec3 nightMid = vec3(0.19, 0.23, 0.34);
            vec3 nightDeep = vec3(0.3, 0.26, 0.41);
            vec3 nightPearl = vec3(0.2, 0.27, 0.42);

            float tone = smoothstep(0.12, 0.9, field);
            vec3 color = mix(mix(nightBase, nightMid, tone), nightDeep, smoothstep(0.64, 0.98, tone));

            float pearlMask = smoothstep(0.82, 0.22, length(p * vec2(1.0, 0.9)));
            color = mix(color, nightPearl, pearlMask * mix(0.06, 0.03, uBreak));

            float dissolveThreshold = mix(0.24, 0.62, uBreak);
            float dissolve = smoothstep(dissolveThreshold, dissolveThreshold + 0.18, breakupField);
            color = mix(color, color * 0.9, dissolve * uBreak * 0.3);

            float grain = (hash(uv * vec2(820.0, 460.0) + vec2(t * 12.0, -t * 7.0)) - 0.5) * 0.012 * uNoise;
            color += grain;

            float alpha = 1.0 - (dissolve * uBreak * 0.14);
            alpha *= mix(0.98, 0.9, uSectionMix * 0.38);

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export function GlobalBackdrop({ scrollProgress, sectionMix, intensity, noise, reducedMotion }: GlobalBackdropProps) {
  const [dprMax, setDprMax] = useState(1.25);
  const [octaves, setOctaves] = useState(2);
  const [targetFps, setTargetFps] = useState(30);
  const qualityLockUntilRef = useRef(0);

  const onFpsSample = useCallback(
    (fps: number) => {
      if (reducedMotion) {
        setDprMax(1);
        setOctaves(1);
        setTargetFps(0);
        return;
      }

      const now = performance.now();
      if (now < qualityLockUntilRef.current) {
        return;
      }

      if (fps < 24) {
        setDprMax(1);
        setOctaves(1);
        setTargetFps(24);
        qualityLockUntilRef.current = now + 1800;
        return;
      }

      if (fps > 27) {
        setDprMax(1.25);
        setOctaves(2);
        setTargetFps(30);
        qualityLockUntilRef.current = now + 1800;
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const isLowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

    if (reducedMotion || isLowEnd) {
      setDprMax(1);
      setOctaves(1);
      setTargetFps(reducedMotion ? 0 : 24);
      return;
    }

    setDprMax(1.25);
    setOctaves(2);
    setTargetFps(30);
  }, [reducedMotion]);

  const cameraPosition = useMemo<[number, number, number]>(() => [0, 0, 6], []);

  return (
    <div className="global-backdrop fixed inset-0 -z-20 pointer-events-none" aria-hidden>
      <Canvas
        frameloop="demand"
        dpr={[1, dprMax]}
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
      >
        <RenderDriver enabled={!reducedMotion} targetFps={targetFps} />
        <GradientFlowPlane
          scrollProgress={scrollProgress}
          sectionMix={sectionMix}
          intensity={intensity}
          noise={noise}
          reducedMotion={reducedMotion}
          octaves={octaves}
          onFpsSample={onFpsSample}
        />
      </Canvas>
    </div>
  );
}

