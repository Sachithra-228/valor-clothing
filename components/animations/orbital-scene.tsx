"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function Form() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.09;
    ref.current.rotation.y += delta * 0.13;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.15, 0.08, 160, 12]} />
      <meshStandardMaterial color="#d8d8d8" metalness={0.85} roughness={0.28} transparent opacity={0.22} />
    </mesh>
  );
}

export function OrbitalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 48 }} dpr={[1, 1.6]} gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 2, 4]} intensity={1.4} />
      <Form />
    </Canvas>
  );
}
