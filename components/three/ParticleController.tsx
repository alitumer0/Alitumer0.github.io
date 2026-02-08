"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThemeMode } from "@/components/providers/PortfolioProvider";

const PARTICLE_COUNT = 10_000;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

type ParticleControllerProps = {
  progress: number;
  themeMode: ThemeMode;
  fridgeSpotlight: boolean;
};

type ParticleField = {
  start: Float32Array;
  burst: Float32Array;
  grid: Float32Array;
  seeds: Float32Array;
};

function buildParticleField(): ParticleField {
  const start = new Float32Array(PARTICLE_COUNT * 3);
  const burst = new Float32Array(PARTICLE_COUNT * 3);
  const grid = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = new Float32Array(PARTICLE_COUNT);

  const cols = 40;
  const rows = 25;
  const layers = 10;

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const stride = i * 3;

    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const radius = 1.16 + (Math.random() - 0.5) * 0.34;

    start[stride] = radius * Math.sin(phi) * Math.cos(theta);
    start[stride + 1] = radius * Math.cos(phi);
    start[stride + 2] = radius * Math.sin(phi) * Math.sin(theta);

    burst[stride] = (Math.random() - 0.5) * 8.8;
    burst[stride + 1] = (Math.random() - 0.5) * 5.2;
    burst[stride + 2] = 1.2 + Math.random() * 6.4;

    const ix = i % cols;
    const iy = Math.floor(i / cols) % rows;
    const iz = Math.floor(i / (cols * rows)) % layers;

    const phase = (iy / rows) * Math.PI * 4 + iz * 0.48;
    const helixX = Math.cos(phase) * 0.3;
    const helixZ = Math.sin(phase) * 0.3;

    grid[stride] = (ix - (cols - 1) / 2) * 0.2 + helixX;
    grid[stride + 1] = (iy - (rows - 1) / 2) * 0.18 - 0.25;
    grid[stride + 2] = (iz - (layers - 1) / 2) * 0.42 - 1.8 + helixZ;

    seeds[i] = Math.random();
  }

  return { start, burst, grid, seeds };
}

export function ParticleController({ progress, themeMode, fridgeSpotlight }: ParticleControllerProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const field = useMemo(() => buildParticleField(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    const material = materialRef.current;

    if (!mesh || !material) {
      return;
    }

    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const toBurst = smoothstep(0.05, 0.36, p);
    const toGrid = smoothstep(0.32, 0.74, p);
    const gridHold = smoothstep(0.55, 0.9, p);

    const time = clock.elapsedTime;
    const driftStrength = (1 - toGrid) * 0.18;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const stride = i * 3;
      const seed = field.seeds[i];

      const sx = field.start[stride];
      const sy = field.start[stride + 1];
      const sz = field.start[stride + 2];

      const bx = field.burst[stride];
      const by = field.burst[stride + 1];
      const bz = field.burst[stride + 2];

      const gx = field.grid[stride];
      const gy = field.grid[stride + 1];
      const gz = field.grid[stride + 2];

      let x = THREE.MathUtils.lerp(sx, bx, toBurst);
      let y = THREE.MathUtils.lerp(sy, by, toBurst);
      let z = THREE.MathUtils.lerp(sz, bz, toBurst);

      x = THREE.MathUtils.lerp(x, gx, toGrid);
      y = THREE.MathUtils.lerp(y, gy, toGrid);
      z = THREE.MathUtils.lerp(z, gz, toGrid);

      x += Math.sin(time * 0.75 + seed * 13.0) * driftStrength;
      y += Math.cos(time * 0.62 + seed * 11.0) * driftStrength * 0.7;

      const pulse = 0.68 + Math.sin(time * 2.6 + seed * 19.0) * 0.24;
      const scale = THREE.MathUtils.clamp((0.35 + pulse) * (0.6 + gridHold * 0.5), 0.18, 1.4);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale * 0.022);
      dummy.rotation.set(seed * Math.PI, time * 0.12 + seed * 2.0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    const targetColor = fridgeSpotlight
      ? new THREE.Color("#1ea5ff")
      : themeMode === "night"
        ? new THREE.Color("#00c8ff")
        : new THREE.Color("#153c7c");

    const uniformColor = material.uniforms.uBaseColor.value as THREE.Color;
    uniformColor.lerp(targetColor, 0.06);

    const glitchBurst = Math.sin(time * 1.6) > 0.94 ? 0.08 : 0.018;

    material.uniforms.uTime.value = time;
    material.uniforms.uGlitch.value = glitchBurst;
    material.uniforms.uAlpha.value = themeMode === "night" ? 0.85 : 0.6;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uAlpha: { value: themeMode === "night" ? 0.85 : 0.6 },
          uGlitch: { value: 0.018 },
          uBaseColor: { value: new THREE.Color(themeMode === "night" ? "#00c8ff" : "#153c7c") }
        }}
        vertexShader={`
          uniform float uTime;
          uniform float uGlitch;
          varying float vPulse;

          void main() {
            vec3 transformed = position;
            float glitch = sin((instanceMatrix[3].x + instanceMatrix[3].y + uTime) * 8.0) * uGlitch;
            transformed += normal * glitch;

            vec4 worldPosition = instanceMatrix * vec4(transformed, 1.0);
            vec4 mvPosition = modelViewMatrix * worldPosition;
            gl_Position = projectionMatrix * mvPosition;

            vPulse = 0.65 + 0.35 * sin(uTime * 2.4 + instanceMatrix[3].z * 5.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uBaseColor;
          uniform float uAlpha;
          varying float vPulse;

          void main() {
            gl_FragColor = vec4(uBaseColor, uAlpha * vPulse);
          }
        `}
      />
    </instancedMesh>
  );
}
