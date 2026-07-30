"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useRef } from "react";
import { springSoft } from "@/lib/motion";

const TILT = 14;

export function HeroDeviceMockup() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.42);

  const rotateX = useSpring(
    useTransform(pointerY, [0, 1], [TILT, -TILT]),
    { stiffness: 140, damping: 22 },
  );
  const rotateY = useSpring(
    useTransform(pointerX, [0, 1], [-TILT, TILT]),
    { stiffness: 140, damping: 22 },
  );

  const glareX = useTransform(pointerX, [0, 1], ["18%", "82%"]);
  const glareY = useTransform(pointerY, [0, 1], ["12%", "78%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55) 0%, transparent 52%)`;

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce) return;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointerX.set((e.clientX - r.left) / r.width);
      pointerY.set((e.clientY - r.top) / r.height);
    },
    [pointerX, pointerY, reduce],
  );

  const onLeave = useCallback(() => {
    pointerX.set(0.5);
    pointerY.set(0.42);
  }, [pointerX, pointerY]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[min(100%,320px)] sm:max-w-[340px] lg:mx-0 lg:max-w-none lg:justify-self-end"
      style={{ perspective: 1200 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-hidden
    >
      <motion.div
        className="relative aspect-[10/20] w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[min(100%,320px)] lg:ml-auto"
        style={{
          rotateX: reduce ? 0 : rotateX,
          rotateY: reduce ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
        animate={
          reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }
        }
        transition={
          reduce
            ? { duration: 0.4 }
            : {
                opacity: { ...springSoft, delay: 0.35 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }
        }
      >
        {/* Back plate — depth layer */}
        <div
          className="absolute inset-0 translate-x-3 translate-y-4 scale-[0.96] rounded-[2.4rem] border border-[#a5a4fa]/35 bg-gradient-to-br from-[#e4e2ff]/70 to-[#c7c3fc]/45 shadow-[0_32px_64px_rgba(124,58,237,0.18)] backdrop-blur-xl"
          style={{ transform: "translateZ(-28px)" }}
        />

        {/* Main lavender glass chassis */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[2.35rem] border border-white/75 bg-white/35 p-[10px] shadow-[0_24px_56px_rgba(99,102,241,0.22),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl"
          style={{ transform: "translateZ(0px)" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 opacity-70 mix-blend-overlay"
            style={{ background: reduce ? undefined : glare }}
          />

          <div className="relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-[#c7c3fc]/50 bg-gradient-to-b from-[#f5f3ff] via-white to-[#ede9fe] shadow-inner">
            <div className="relative flex shrink-0 items-center justify-between px-5 pb-2 pt-3">
              <span className="text-[10px] font-semibold tracking-wide text-zinc-500">9:41</span>
              <div className="absolute left-1/2 top-2.5 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-zinc-900/90" />
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#7C3AED]/40" />
                <span className="h-2 w-2 rounded-full bg-[#6366F1]/40" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-1">
              <div className="rounded-2xl border border-white/80 bg-gradient-to-br from-[#6366F1]/15 via-[#8B5CF6]/10 to-[#c7c3fc]/30 p-3.5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7C3AED]">
                  Live build
                </p>
                <p className="mt-1 font-display text-lg font-bold leading-tight tracking-tight text-zinc-900">
                  Ship faster
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/60">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["Mobile", "Cloud", "AI", "Security"].map((label) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#e4e2ff] bg-white/55 px-2.5 py-2.5 text-center text-[10px] font-semibold text-zinc-700 shadow-sm backdrop-blur-sm"
                  >
                    {label}
                  </div>
                ))}
              </div>

              <div className="mt-auto space-y-2">
                {[88, 64, 72].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full bg-[#c7c3fc]/35"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating glass chip */}
        <motion.div
          className="absolute -right-2 top-[18%] z-30 rounded-2xl border border-white/80 bg-white/50 px-3 py-2.5 shadow-[0_12px_32px_rgba(124,58,237,0.2)] backdrop-blur-xl sm:-right-4"
          style={{ transform: "translateZ(36px)" }}
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <p className="text-[9px] font-bold uppercase tracking-wider text-[#7C3AED]">99.9%</p>
          <p className="text-[11px] font-semibold text-zinc-800">Uptime SLA</p>
        </motion.div>
      </motion.div>

      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[100%] bg-[#7C3AED]/15 blur-2xl"
        aria-hidden
      />
    </div>
  );
}
