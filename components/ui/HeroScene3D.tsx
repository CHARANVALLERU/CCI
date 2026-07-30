"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HeroCanvas = dynamic(
  () => import("./HeroScene3DCanvas").then((m) => m.HeroScene3DCanvas),
  {
    ssr: false,
    loading: () => <HeroSceneFallback reduced />,
  },
);

function HeroSceneFallback({ reduced = false }: { reduced?: boolean }) {
  return (
    <div
      className="relative flex h-full min-h-[220px] w-full items-center justify-center sm:min-h-[280px] lg:min-h-[420px]"
      aria-hidden
    >
      <div
        className={`relative h-44 w-44 rounded-[2rem] border border-white/70 bg-gradient-to-br from-[#E0F2FE]/80 via-white/50 to-[#F3E8FF]/85 shadow-[0_24px_64px_rgba(99,102,241,0.18)] backdrop-blur-xl sm:h-52 sm:w-52 lg:h-64 lg:w-64 ${
          reduced ? "" : "animate-[hero-glass-float_6s_ease-in-out_infinite]"
        }`}
      >
        <div className="absolute inset-3 rounded-[1.5rem] border border-white/50 bg-white/25" />
        <div className="absolute -right-4 top-8 h-16 w-16 rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-[#6366F1]/25 to-[#8B5CF6]/20 backdrop-blur-md" />
        <div className="absolute -bottom-3 left-6 h-12 w-12 rounded-full bg-gradient-to-tr from-[#06B6D4]/30 to-[#6366F1]/25 blur-[1px]" />
      </div>
    </div>
  );
}

export function HeroScene3D() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(pointer: coarse)");
    const updateCoarse = () => setCoarsePointer(mq.matches);
    updateCoarse();
    mq.addEventListener("change", updateCoarse);
    return () => mq.removeEventListener("change", updateCoarse);
  }, []);

  useEffect(() => {
    if (reduce || coarsePointer) return;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x: nx, y: ny });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, coarsePointer]);

  if (!mounted) {
    return <HeroSceneFallback reduced={!!reduce} />;
  }

  if (reduce) {
    return <HeroSceneFallback reduced />;
  }

  return (
    <div className="relative h-[240px] w-full sm:h-[300px] lg:h-[min(520px,52vh)] lg:min-h-[420px]">
      <HeroCanvas pointer={pointer} />
    </div>
  );
}
