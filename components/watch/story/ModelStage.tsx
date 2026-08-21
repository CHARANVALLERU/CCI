"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationMixer,
  Box3,
  Group,
  LoopRepeat,
  MathUtils,
  Vector3,
  type Material,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
} from "three";
import {
  CHAPTERS,
  chapterProgress,
  chapterWeight,
  sceneState,
  type ChapterId,
} from "@/lib/sceneState";

export type StageConfig = {
  url: string;
  chapter: ChapterId;
  /** Max dimension of the normalized model in world units. */
  fitSize: number;
  /** Continuous idle spin around Y, radians per second. */
  spin: number;
  /** Extra radians of scroll-driven Y rotation across the chapter. */
  spinRange: number;
  /** Scale multiplier from chapter start → end (in-chapter dive). */
  zoom: [number, number];
  /** Start X rotation in degrees — eases toward `rotationXRestDeg` on enter. */
  rotationXDeg?: number;
  /** Settled X rotation in degrees after the enter ease (defaults to 0). */
  rotationXRestDeg?: number;
  /** Hide meshes whose names match these substrings (case-insensitive). */
  hideNameIncludes?: string[];
  /** Multiply base color / emissive to darken a bright GLB (earth). */
  brightness?: number;
  /** Hyperspace exit zoom multiplier as the chapter fades out. */
  warpExit?: number;
  /** Hyperspace enter zoom when the chapter fades in (settles to 1). */
  warpEnter?: number;
  float?: number;
  playClip?: boolean;
  mountAt: number;
};

const INTRO_SECONDS = 3.2;
const DEG2RAD = Math.PI / 180;

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number) {
  return x * x * x;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function collectMaterials(root: Object3D) {
  const set = new Set<Material>();
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    if (Array.isArray(mesh.material)) mesh.material.forEach((m) => set.add(m));
    else set.add(mesh.material);
  });
  return [...set];
}

function darkenMaterials(root: Object3D, factor: number) {
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh || !mesh.material) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      const std = m as MeshStandardMaterial;
      if (std.color) std.color.multiplyScalar(factor);
      if (std.emissive) std.emissive.multiplyScalar(factor);
      if (typeof std.emissiveIntensity === "number") {
        std.emissiveIntensity *= factor;
      }
      std.needsUpdate = true;
    }
  });
}

function hideMeshesByName(root: Object3D, needles: string[]) {
  const lower = needles.map((n) => n.toLowerCase());
  root.traverse((obj) => {
    const name = (obj.name || "").toLowerCase();
    if (!name) return;
    if (lower.some((n) => name.includes(n))) {
      obj.visible = false;
    }
  });
}

function ModelRig({ config }: { config: StageConfig }) {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const mixer = useRef<AnimationMixer | null>(null);
  const spinY = useRef(0);

  const { scene, animations } = useGLTF(config.url);
  const clone = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      const mesh = obj as Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => m.clone());
      } else {
        mesh.material = mesh.material.clone();
      }
    });
    if (config.hideNameIncludes?.length) {
      hideMeshesByName(root, config.hideNameIncludes);
    }
    if (config.brightness != null && config.brightness < 1) {
      darkenMaterials(root, config.brightness);
    }
    return root;
  }, [scene, config.hideNameIncludes, config.brightness]);

  const normalize = useMemo(() => {
    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = config.fitSize / maxDim;
    return {
      scale,
      offset: new Vector3(-center.x * scale, -center.y * scale, -center.z * scale),
    };
  }, [clone, config.fitSize]);

  const mats = useMemo(() => {
    const list = collectMaterials(clone);
    return list.map((m) => ({
      material: m,
      baseOpacity: m.opacity,
      baseTransparent: m.transparent,
      baseDepthWrite: m.depthWrite,
    }));
  }, [clone]);

  const baseRotX = (config.rotationXDeg ?? 0) * DEG2RAD;
  const restRotX = (config.rotationXRestDeg ?? 0) * DEG2RAD;

  useEffect(() => {
    if (!config.playClip || animations.length === 0) return;
    const m = new AnimationMixer(clone);
    const action = m.clipAction(animations[0]);
    action.setLoop(LoopRepeat, Infinity);
    action.timeScale = sceneState.reduced ? 0.12 : 0.55;
    action.play();
    mixer.current = m;
    return () => {
      m.stopAllAction();
      mixer.current = null;
    };
  }, [clone, animations, config.playClip]);

  useFrame((state, delta) => {
    const g = outer.current;
    const node = inner.current;
    if (!g || !node) return;

    const dt = Math.min(delta, 0.1);
    const t = sceneState.scroll;
    const chapter = CHAPTERS[config.chapter];
    const weight = chapterWeight(t, chapter);
    const progress = chapterProgress(t, chapter);
    const isEarth = config.chapter === "earth";

    const intro = sceneState.reduced
      ? 1
      : MathUtils.clamp((state.clock.elapsedTime - 0.2) / INTRO_SECONDS, 0, 1);
    const introEased = easeOutCubic(intro);

    let fade = weight;
    if (isEarth) {
      fade = introEased * (t <= 0.001 ? 1 : weight);
    }

    const visible = fade > 0.001;
    g.visible = visible;
    if (!visible) {
      mixer.current?.update(0);
      return;
    }

    for (const { material: m, baseOpacity, baseTransparent, baseDepthWrite } of mats) {
      m.opacity = baseOpacity * fade;
      m.transparent = baseTransparent || fade < 0.999;
      m.depthWrite = fade > 0.85 ? baseDepthWrite : false;
      m.needsUpdate = true;
    }

    // Idle Y spin + scroll-driven yaw.
    spinY.current += config.spin * dt;
    const spinTarget = spinY.current + progress * config.spinRange;
    g.rotation.y += (spinTarget - g.rotation.y) * Math.min(dt * 5, 1);

    // X starts at rotationXDeg (-120) and eases toward the rest pose as the chapter settles.
    const rotMix = easeOutCubic(MathUtils.clamp(fade * 1.25, 0, 1));
    const targetX = MathUtils.lerp(baseRotX, restRotX, rotMix);
    const breath = Math.sin(state.clock.elapsedTime * 0.2) * 0.035;
    g.rotation.x += (targetX + breath - g.rotation.x) * Math.min(dt * 6, 1);

    // In-chapter zoom / dive.
    const dive = MathUtils.lerp(config.zoom[0], config.zoom[1], easeInOutCubic(progress));

    /**
     * Light-speed handoff:
     * - exit: as fade drops, punch scale up (warpExit)
     * - enter: start oversized (warpEnter) and settle as fade rises
     */
    const warpExit = config.warpExit ?? 6.5;
    const warpEnter = config.warpEnter ?? 5.5;
    const exitPunch = 1 + (warpExit - 1) * easeInCubic(1 - fade);
    const enterSettle = MathUtils.lerp(warpEnter, 1, easeOutCubic(MathUtils.clamp(fade * 1.35, 0, 1)));
    // Blend: strong enter when just arriving, strong exit when leaving.
    const arriving = fade < 0.55 && progress < 0.35;
    const leaving = fade < 0.55 && progress > 0.65;
    let warp = 1;
    if (arriving) warp = enterSettle;
    else if (leaving) warp = exitPunch;
    else warp = MathUtils.lerp(enterSettle, 1, MathUtils.clamp((fade - 0.55) / 0.45, 0, 1));

    let animScale = dive * warp;
    if (isEarth) {
      const settle = MathUtils.lerp(0.18, 1, introEased);
      // Hyperspace punch as earth leaves — capped so it doesn't bloom into a white flash.
      const leaveT = t <= 0.001 ? 0 : 1 - weight;
      const earthExit = 1 + 5.5 * easeInCubic(MathUtils.clamp(leaveT, 0, 1));
      animScale = settle * dive * (leaveT > 0.02 ? earthExit : 1);
      // Extra fade crush on the way out keeps the warp from overexposing.
      if (leaveT > 0.15) {
        for (const { material: m, baseOpacity, baseTransparent } of mats) {
          const crush = MathUtils.clamp(1 - (leaveT - 0.15) / 0.85, 0, 1);
          m.opacity = baseOpacity * fade * crush;
          m.transparent = true;
        }
      }
    }

    g.scale.setScalar(animScale);

    const amp = config.float ?? 0.05;
    if (isEarth) {
      g.position.x = MathUtils.lerp(0.9, 0, introEased);
      g.position.z = MathUtils.lerp(1.5, 0, introEased);
      g.position.y = Math.sin(state.clock.elapsedTime * 0.55) * amp * introEased;
    } else {
      // Slight push forward as we warp so the dive feels camera-like.
      const zPunch = leaving ? MathUtils.lerp(0, -1.2, easeInCubic(1 - fade)) : arriving ? MathUtils.lerp(-0.9, 0, easeOutCubic(fade)) : 0;
      g.position.set(0, Math.sin(state.clock.elapsedTime * 0.55) * amp, zPunch);
    }

    node.scale.setScalar(normalize.scale);
    node.position.copy(normalize.offset);

    mixer.current?.update(dt);
  });

  return (
    <group ref={outer}>
      <group ref={inner} dispose={null}>
        <primitive object={clone} />
      </group>
    </group>
  );
}

export function ModelStage({ config }: { config: StageConfig }) {
  const [mounted, setMounted] = useState(config.mountAt <= 0);

  useEffect(() => {
    if (mounted) return;
    let raf = 0;
    const check = () => {
      if (sceneState.scroll >= config.mountAt) {
        setMounted(true);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [mounted, config.mountAt]);

  if (!mounted) return null;
  return <ModelRig config={config} />;
}

useGLTF.preload("/models/earth.glb");
