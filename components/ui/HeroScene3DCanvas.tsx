"use client";

import "@/lib/three-patch";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroScene3DInner } from "./HeroScene3DInner";

type HeroScene3DCanvasProps = {
  pointer: { x: number; y: number };
};

export function HeroScene3DCanvas({ pointer }: HeroScene3DCanvasProps) {
  return (
    <Canvas
      className="touch-none"
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <HeroScene3DInner pointer={pointer} animate />
      </Suspense>
    </Canvas>
  );
}
