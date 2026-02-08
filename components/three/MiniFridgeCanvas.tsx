"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FridgeModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    group.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 1.5, 0.6]} />
        <meshStandardMaterial color="#d9e2ef" roughness={0.2} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.22, 0.31]}>
        <boxGeometry args={[0.86, 1.05, 0.02]} />
        <meshStandardMaterial color="#9ad7ff" emissive="#47c7ff" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, -0.6, 0.31]}>
        <boxGeometry args={[0.86, 0.36, 0.02]} />
        <meshStandardMaterial color="#8ab9ff" emissive="#63b6ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.36, 0.15, 0.34]}>
        <boxGeometry args={[0.05, 0.65, 0.03]} />
        <meshStandardMaterial color="#dde7f6" metalness={0.8} roughness={0.18} />
      </mesh>
      <mesh position={[0.36, -0.55, 0.34]}>
        <boxGeometry args={[0.05, 0.26, 0.03]} />
        <meshStandardMaterial color="#dde7f6" metalness={0.8} roughness={0.18} />
      </mesh>
    </group>
  );
}

export function MiniFridgeCanvas() {
  return (
    <div className="fridge-mini">
      <Canvas
        camera={{ position: [0, 0.1, 3], fov: 42 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#87d4ff" />
        <Float speed={1.2} floatIntensity={0.35} rotationIntensity={0.3}>
          <FridgeModel />
        </Float>
      </Canvas>
    </div>
  );
}

