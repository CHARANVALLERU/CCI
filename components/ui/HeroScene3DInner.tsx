"use client";

import { useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group } from "three";

type HeroScene3DInnerProps = {
  pointer: { x: number; y: number };
  animate: boolean;
};

function GlassKnot({ pointer, animate }: HeroScene3DInnerProps) {
  const group = useRef<Group>(null);
  const targetRot = useMemo(() => ({ x: 0, y: 0 }), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (animate) {
      targetRot.y = pointer.x * 0.42;
      targetRot.x = pointer.y * 0.28;
      g.rotation.y += (targetRot.y - g.rotation.y) * Math.min(delta * 3.2, 1);
      g.rotation.x += (targetRot.x - g.rotation.x) * Math.min(delta * 3.2, 1);
      g.rotation.z += delta * 0.08;
    }
  });

  return (
    <Float
      speed={animate ? 1.35 : 0}
      rotationIntensity={animate ? 0.15 : 0}
      floatIntensity={animate ? 0.55 : 0}
    >
      <group ref={group} rotation={animate ? undefined : [0.35, -0.55, 0.12]}>
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[1.05, 0.34, 220, 32]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.35}
            samples={4}
            resolution={256}
            transmission={0.97}
            thickness={0.65}
            roughness={0.08}
            ior={1.35}
            chromaticAberration={0.06}
            anisotropy={0.12}
            distortion={0.18}
            distortionScale={0.35}
            temporalDistortion={0.08}
            color="#E0F2FE"
            attenuationColor="#C7D2FE"
            attenuationDistance={0.85}
          />
        </mesh>
        <mesh scale={0.52} position={[0.55, 0.35, 0.15]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshPhysicalMaterial
            color="#F3E8FF"
            metalness={0.15}
            roughness={0.12}
            transmission={0.55}
            thickness={0.4}
            ior={1.4}
            emissive="#6366F1"
            emissiveIntensity={0.08}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene3DInner({ pointer, animate }: HeroScene3DInnerProps) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#f8fafc", "#94a3b8", 0.45]} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#F8FAFC" />
      <pointLight position={[-3, 2, 4]} intensity={0.85} color="#A5B4FC" />
      <pointLight position={[3, -2, 2]} intensity={0.55} color="#7DD3FC" />
      <GlassKnot pointer={pointer} animate={animate} />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}
