"use client";

import "@/lib/three-patch";
import { Canvas } from "@react-three/fiber";
import { Component, type ReactNode, Suspense } from "react";
import { ModelStage, type StageConfig } from "./ModelStage";

/**
 * /watch background story (whole-page scroll fractions):
 *   earth (intro pan + dive) → night city → london tower → server rack.
 * Each stage has its own Suspense so a heavy GLB load never blanks the others.
 */
const STAGES: StageConfig[] = [
  {
    url: "/models/earth.glb",
    chapter: "earth",
    fitSize: 2.7,
    spin: 0.14,
    spinRange: 0.9,
    zoom: [1, 3.25],
    brightness: 0.85,
    warpExit: 9,
    warpEnter: 1,
    playClip: true,
    mountAt: 0,
    float: 0.035,
  },
  {
    url: "/models/city_at_night_low_poly_skyscrapers.glb",
    chapter: "city",
    fitSize: 4.4,
    spin: 0.035,
    spinRange: 0.7,
    // Start deeper inside the block so outer silhouette / outlines fall away.
    zoom: [2.35, 3.15],
    rotationXDeg: -120,
    rotationXRestDeg: -22,
    hideNameIncludes: ["sphere"],
    warpExit: 7.5,
    warpEnter: 6.5,
    mountAt: 0.06,
    float: 0.015,
  },
  {
    url: "/models/free_london_skyscraper.glb",
    chapter: "london",
    fitSize: 3.1,
    spin: 0.035,
    spinRange: 0.95,
    zoom: [1.05, 1.4],
    rotationXDeg: -120,
    rotationXRestDeg: -12,
    warpExit: 7.5,
    warpEnter: 6,
    mountAt: 0.3,
    float: 0.025,
  },
  {
    url: "/models/network_server_rack.glb",
    chapter: "rack",
    fitSize: 2.8,
    spin: 0.055,
    spinRange: 0.8,
    zoom: [1.05, 1.28],
    rotationXDeg: -120,
    rotationXRestDeg: -8,
    warpExit: 6.5,
    warpEnter: 5.5,
    mountAt: 0.55,
    float: 0.028,
  },
];

/** Cool night lighting — controlled so earth stays readable, not blown out. */
function StoryLights() {
  return (
    <>
      <ambientLight intensity={0.44} />
      <hemisphereLight args={["#c4d0ea", "#06080e", 0.48]} />
      <directionalLight position={[5, 7, 4]} intensity={1.2} color="#e8eef8" />
      <directionalLight position={[-4, 2, -3]} intensity={0.32} color="#7dd3fc" />
      <pointLight position={[-3, 2, 4]} intensity={1.0} color="#A5B4FC" />
      <pointLight position={[3, -1, 3]} intensity={0.7} color="#7DD3FC" />
      <pointLight position={[0, -2, 4]} intensity={0.38} color="#38bdf8" />
    </>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("Story WebGL layer failed to start:", error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function StoryCanvas() {
  return (
    <WebGLBoundary>
      <Canvas
        flat
        camera={{ fov: 42, position: [0, 0.15, 6], near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.75]}
        style={{ width: "100%", height: "100%", display: "block" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          const canvas = gl.domElement;
          const onLost = (event: Event) => event.preventDefault();
          canvas.addEventListener("webglcontextlost", onLost, false);
        }}
      >
        <StoryLights />
        {STAGES.map((config) => (
          <Suspense key={config.url} fallback={null}>
            <ModelStage config={config} />
          </Suspense>
        ))}
      </Canvas>
    </WebGLBoundary>
  );
}
