"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import {
  CHAPTER_PLATES,
  plateWeight,
  sceneState,
  type ChapterId,
} from "@/lib/sceneState";

/** Heavy WebGL layer — client-only, never blocks first paint. */
const StoryCanvas = dynamic(
  () => import("./StoryCanvas").then((m) => m.StoryCanvas),
  { ssr: false, loading: () => null },
);

const PLATE_ORDER: ChapterId[] = ["earth", "city", "london", "rack"];

type PlateOpacities = Record<ChapterId, number>;

function opacitiesFromScroll(t: number): PlateOpacities {
  return {
    earth: plateWeight(t, "earth"),
    city: plateWeight(t, "city"),
    london: plateWeight(t, "london"),
    rack: plateWeight(t, "rack"),
  };
}

/**
 * Fixed story backdrop for /watch only:
 *   chapter photo plates (crossfade) → transparent WebGL models in front.
 * Page content sits above (z-10); this layer never steals pointer events.
 */
export function StoryBackground() {
  const { scrollYProgress } = useScroll();
  const [plates, setPlates] = useState<PlateOpacities>(() => opacitiesFromScroll(0));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    sceneState.scroll = v;
    setPlates(opacitiesFromScroll(v));
  });

  useEffect(() => {
    sceneState.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020618]" />

      {PLATE_ORDER.map((id) => (
        <div
          key={id}
          className="absolute inset-0 scale-105 bg-cover bg-center transition-opacity duration-300 ease-out"
          style={{
            backgroundImage: `url('${CHAPTER_PLATES[id]}')`,
            opacity: plates[id],
            zIndex: id === "earth" ? 0 : 1,
          }}
        />
      ))}

      <div className="absolute inset-0 z-[2] bg-[rgba(4,8,20,0.14)]" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(2,6,18,0.28)_0%,transparent_26%,transparent_74%,rgba(2,6,18,0.32)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_82%_68%_at_50%_42%,transparent_48%,rgba(2,6,18,0.2)_100%)]" />

      <div className="absolute inset-0 z-[3]">
        <StoryCanvas />
      </div>
    </div>
  );
}
