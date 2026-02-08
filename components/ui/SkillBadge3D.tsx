"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { GlassPanel } from "@/components/ui/GlassPanel";

type SkillBadge3DProps = {
  label: string;
  subtitle: string;
  variant: "react" | "backend" | "database" | "devops";
};

function Glyph({ variant }: { variant: SkillBadge3DProps["variant"] }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const target = mesh.current;
    if (!target) {
      return;
    }

    if (variant === "backend") {
      const s = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.12;
      target.scale.setScalar(s);
    }

    target.rotation.y += delta * (variant === "react" ? 1.4 : 0.9);
    target.rotation.x += delta * 0.6;
  });

  if (variant === "react") {
    return (
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.56, 0.14, 128, 16]} />
        <meshStandardMaterial color="#6be9ff" emissive="#12d4ff" emissiveIntensity={0.5} roughness={0.25} metalness={0.7} />
      </mesh>
    );
  }

  if (variant === "backend") {
    return (
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.66, 1]} />
        <meshStandardMaterial color="#6f86ff" emissive="#6f86ff" emissiveIntensity={0.35} roughness={0.3} metalness={0.5} />
      </mesh>
    );
  }

  if (variant === "database") {
    return (
      <mesh ref={mesh}>
        <cylinderGeometry args={[0.45, 0.45, 0.95, 24, 1, true]} />
        <meshStandardMaterial color="#8fe8cc" emissive="#74d8be" emissiveIntensity={0.25} roughness={0.35} metalness={0.52} />
      </mesh>
    );
  }

  return (
    <mesh ref={mesh}>
      <octahedronGeometry args={[0.62, 0]} />
      <meshStandardMaterial color="#9db5ff" emissive="#4dd7ff" emissiveIntensity={0.3} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

export function SkillBadge3D({ label, subtitle, variant }: SkillBadge3DProps) {
  return (
    <GlassPanel className="h-full p-4">
      <div
        className="h-32 w-full overflow-hidden rounded-xl border"
        style={{
          borderColor: "var(--card-border)",
          background: "color-mix(in srgb, var(--surface) 80%, transparent)"
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 48 }}
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 4, 3]} intensity={1.1} color="#9fdfff" />
          <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
            <Glyph variant={variant} />
          </Float>
        </Canvas>
      </div>

      <h4 className="mt-4 font-sans text-sm uppercase tracking-[0.16em] text-[var(--text-primary)]">{label}</h4>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{subtitle}</p>
    </GlassPanel>
  );
}

