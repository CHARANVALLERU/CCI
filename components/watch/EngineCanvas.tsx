"use client";

import "@/lib/three-patch";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Points,
  type MeshStandardMaterial,
  type PointsMaterial,
} from "three";
import { watchState, type RingId } from "@/lib/watchState";

type RingConfig = {
  id: RingId;
  radius: number;
  tilt: [number, number, number];
  speed: number;
  nodes: number;
};

const RINGS: RingConfig[] = [
  { id: "ai", radius: 2.1, tilt: [0.45, 0, 0.2], speed: 0.22, nodes: 6 },
  { id: "security", radius: 2.6, tilt: [-0.5, 0.4, -0.15], speed: -0.16, nodes: 8 },
  { id: "cloud", radius: 3.1, tilt: [1.15, 0.2, 0.35], speed: 0.12, nodes: 10 },
  { id: "data", radius: 3.6, tilt: [-0.95, -0.35, 0.5], speed: -0.09, nodes: 12 },
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Explode envelope: 0 at the hero, 1 through the middle chapters, back to 0 at the footer. */
function explodeEnvelope(scroll: number) {
  const t = clamp01((scroll - 0.12) / 0.72);
  return Math.sin(Math.PI * t) ** 1.5;
}

function elapsedOf(state: { clock: { elapsedTime: number } }) {
  return state.clock.elapsedTime;
}

function OrbitalRing({ config, accentCurrent }: { config: RingConfig; accentCurrent: Color }) {
  const ring = useRef<Group>(null);
  const emissives = useRef<MeshStandardMaterial[]>([]);
  const glow = useRef(0);

  useFrame((state, delta) => {
    const g = ring.current;
    if (!g) return;

    g.rotation.z += config.speed * delta;

    const target = watchState.highlight === config.id ? 1 : 0;
    glow.current += (target - glow.current) * Math.min(delta * 6, 1);

    const explode = watchState.explode;
    const dir = config.radius / 3.6;
    g.position.set(
      Math.sin(config.id.charCodeAt(0)) * explode * dir * 1.6,
      Math.cos(config.id.charCodeAt(0)) * explode * dir * 0.9,
      explode * dir * 1.2,
    );
    g.scale.setScalar(1 + explode * 0.25 * dir);

    const base = 0.55 + watchState.accentBoost * 0.5 + glow.current * 2.4;
    emissives.current.forEach((m) => {
      if (!m) return;
      m.emissive.copy(accentCurrent);
      m.emissiveIntensity = base;
    });
    g.userData.pulse = 0.5 + 0.5 * Math.sin(elapsedOf(state) * 1.6 + config.radius);
  });

  const nodePositions = useMemo(
    () =>
      Array.from({ length: config.nodes }, (_, i) => {
        const a = (i / config.nodes) * Math.PI * 2;
        return [Math.cos(a) * config.radius, Math.sin(a) * config.radius, 0] as [number, number, number];
      }),
    [config.nodes, config.radius],
  );

  return (
    <group ref={ring} rotation={config.tilt}>
      <mesh>
        <torusGeometry args={[config.radius, 0.018, 12, 128]} />
        <meshStandardMaterial color="#6b7280" metalness={0.55} roughness={0.35} />
      </mesh>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.08 + (i % 3) * 0.02, 0]} />
          <meshStandardMaterial
            ref={(m) => {
              if (m) emissives.current[i] = m;
            }}
            color="#1c1c22"
            metalness={0.35}
            roughness={0.28}
            emissive="#6366F1"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function Core({ accentCurrent }: { accentCurrent: Color }) {
  const mesh = useRef<Group>(null);
  const coreMat = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const g = mesh.current;
    if (!g) return;
    const t = elapsedOf(state);
    g.rotation.y += delta * 0.12;
    g.rotation.x = Math.sin(t * 0.25) * 0.15;
    g.position.y = Math.sin(t * 1.1) * 0.12;

    g.scale.setScalar(1 + watchState.explode * 0.35);

    if (coreMat.current) {
      coreMat.current.emissive.copy(accentCurrent);
      coreMat.current.emissiveIntensity =
        0.45 + 0.18 * Math.sin(t * 2.1) + watchState.accentBoost * 0.5;
    }
  });

  return (
    <group ref={mesh}>
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial
          ref={coreMat}
          color="#1e1e28"
          metalness={0.4}
          roughness={0.22}
          emissive="#6366F1"
          emissiveIntensity={0.45}
          flatShading
        />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function ParticleField({ accentCurrent }: { accentCurrent: Color }) {
  const points = useRef<Points>(null);
  const mixColor = useMemo(() => new Color("#8a8a95"), []);

  const geometry = useMemo(() => {
    const rand = seededRandom(60601);
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(arr, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    const p = points.current;
    if (!p) return;
    p.rotation.y = elapsedOf(state) * 0.02 + watchState.scroll * 1.5;
    const mat = p.material;
    if (mat && !Array.isArray(mat) && "color" in mat) {
      (mat as PointsMaterial).color.copy(accentCurrent).lerp(mixColor, 0.55);
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function EngineRig() {
  const rig = useRef<Group>(null);
  const accentTarget = useMemo(() => new Color(watchState.accent), []);
  const accentCurrent = useMemo(() => new Color(watchState.accent), []);

  useFrame((state, delta) => {
    accentTarget.set(watchState.accent);
    accentCurrent.lerp(accentTarget, Math.min(delta * 2.2, 1));

    const g = rig.current;
    if (!g) return;

    watchState.explode = explodeEnvelope(watchState.scroll);

    g.rotation.y = elapsedOf(state) * 0.05 + watchState.scroll * Math.PI * 3;
    g.rotation.x = Math.sin(watchState.scroll * Math.PI * 2) * 0.18;
    g.scale.setScalar(1 - watchState.explode * 0.12);
  });

  return (
    <group ref={rig}>
      <Core accentCurrent={accentCurrent} />
      {RINGS.map((config) => (
        <OrbitalRing key={config.id} config={config} accentCurrent={accentCurrent} />
      ))}
      <ParticleField accentCurrent={accentCurrent} />
    </group>
  );
}

function EngineLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#e2e8f0", "#020617", 0.7]} />
      <directionalLight position={[4, 6, 5]} intensity={1.65} color="#F8FAFC" />
      <pointLight position={[-3, 2, 4]} intensity={1.35} color="#A5B4FC" />
      <pointLight position={[3, -2, -3]} intensity={0.9} color="#7DD3FC" />
    </>
  );
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("WebGL engine failed to start:", error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

/** Fixed full-screen WebGL layer sitting behind the DOM sections. */
export function EngineCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] h-dvh w-screen" aria-hidden>
      <WebGLBoundary>
        <Canvas
          flat
          camera={{ fov: 42, position: [0, 0.35, 9.5], near: 0.1, far: 80 }}
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
          <EngineLights />
          <EngineRig />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
