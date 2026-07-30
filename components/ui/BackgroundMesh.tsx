"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import {
  FramerStyleGooBlobs,
  FramerStyleVignette,
} from "@/components/ui/FramerStyleBackground";

/**
 * Full-page fixed atmosphere matching crawlcorpindia.com Framer patterns:
 * - dotted mesh at background-size ~19px (confirmed in site HTML)
 * - lavender/sky goo blobs (Framer Soft Background) + cci-blob-drift orbs
 * - SVG light trails with stroke-dash shimmer
 * - cursor-adjacent glow (Soft Background–style mouse parallax)
 * - layered scroll parallax via useScroll/useTransform
 * - will-change: transform sparingly on live layers
 */
export function BackgroundMesh() {
  const reduceMotion = useReducedMotion();
  const [trackPointer, setTrackPointer] = useState(false);

  const mx = useMotionValue(-320);
  const my = useMotionValue(-320);
  const sx = useSpring(mx, { stiffness: 38, damping: 24, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 38, damping: 24, mass: 0.55 });

  // Secondary, slower parallax offset for depth (Soft Background multi-orb)
  const px = useSpring(mx, { stiffness: 22, damping: 28, mass: 0.7 });
  const py = useSpring(my, { stiffness: 22, damping: 28, mass: 0.7 });
  const farX = useTransform(px, (v) => v * 0.18);
  const farY = useTransform(py, (v) => v * 0.18);

  const { scrollYProgress } = useScroll();
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -90]);
  const parallaxMid = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -160]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -260]);
  const trailRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 10]);
  const meshOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.55, 0.72, 1],
    reduceMotion ? [0.58, 0.58, 0.58, 0.58, 0.58, 0.58] : [0.58, 0.52, 0.62, 0.5, 0.64, 0.38],
  );
  const meshParallaxBoost = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    reduceMotion ? [1, 1, 1, 1, 1] : [1, 1.08, 1, 1.1, 1.02],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setTrackPointer(true);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX - 320);
      my.set(e.clientY - 320);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduceMotion]);

  const animate = !reduceMotion;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[var(--background)]" />

      <motion.div className="absolute inset-0 cci-mesh-layer" style={{ y: parallaxSlow }}>
        <FramerStyleGooBlobs animate={animate} />
      </motion.div>

      <motion.div
        className="absolute inset-[-12%] cci-mesh-layer mix-blend-multiply opacity-[0.58]"
        style={{ y: parallaxMid, scale: meshParallaxBoost }}
      >
        <div
          className={`absolute left-[5%] top-[28%] h-[32vmax] w-[32vmax] rounded-full blur-[64px] ${
            animate ? "cci-blob-drift-b" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--grad-lavender) 0%, rgba(199,195,252,0.35) 45%, transparent 72%)",
          }}
        />
        <div
          className={`absolute right-[10%] top-[42%] h-[28vmax] w-[28vmax] rounded-full blur-[56px] ${
            animate ? "cci-blob-drift-c" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--grad-sky) 0%, rgba(219,234,254,0.4) 50%, transparent 70%)",
            animationDelay: animate ? "-7s" : undefined,
          }}
        />
        <div
          className={`absolute left-[55%] top-[62%] h-[24vmax] w-[24vmax] rounded-full blur-[48px] ${
            animate ? "cci-blob-drift-a" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--grad-lavender-soft) 0%, var(--grad-sky-deep) 55%, transparent 75%)",
            animationDelay: animate ? "-13s" : undefined,
          }}
        />
      </motion.div>

      {/* Animated light gradient field — soft pastel lavender / sky aurora */}
      <motion.div
        className="absolute inset-[-20%] cci-mesh-layer"
        style={{ y: parallaxMid }}
      >
        <div
          className={`absolute left-[-10%] top-[-15%] h-[75vmax] w-[75vmax] rounded-full blur-3xl ${
            animate ? "cci-grad-aurora" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--grad-c) 0%, var(--grad-a) 32%, transparent 68%)",
          }}
        />
        <div
          className={`absolute right-[-20%] top-[5%] h-[70vmax] w-[70vmax] rounded-full blur-3xl ${
            animate ? "cci-grad-aurora" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle at 55% 45%, var(--grad-b) 0%, var(--grad-d) 38%, transparent 70%)",
            animationDelay: animate ? "-9s" : undefined,
          }}
        />
        <div
          className={`absolute bottom-[-25%] left-[15%] h-[65vmax] w-[90vmax] rounded-full blur-3xl ${
            animate ? "cci-grad-sweep" : ""
          }`}
          style={{
            background:
              "linear-gradient(115deg, var(--grad-a) 0%, transparent 42%, var(--grad-c) 68%, transparent 100%)",
            opacity: 0.7,
          }}
        />
        <div
          className={`absolute left-[30%] top-[20%] h-[45vmax] w-[45vmax] rounded-full blur-[80px] ${
            animate ? "cci-grad-pulse" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--grad-accent) 0%, transparent 65%)",
          }}
        />
        <div
          className={`absolute right-[12%] bottom-[10%] h-[40vmax] w-[40vmax] rounded-full blur-[72px] ${
            animate ? "cci-grad-pulse" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--grad-mist) 0%, transparent 70%)",
            animationDelay: animate ? "-5s" : undefined,
          }}
        />
      </motion.div>

      {/* Soft corner / horizon washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_18%_12%,rgba(139,92,246,0.12),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_88%_18%,rgba(99,102,241,0.1),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(224,242,254,0.55),transparent_62%)]" />

      {/* Dot mesh — Crawl Corp: background-size: 19px */}
      <motion.div
        className="absolute inset-[-10%] cci-mesh-layer"
        style={{ y: parallaxSlow, opacity: meshOpacity }}
      >
        <div
          className={`absolute inset-0 ${animate ? "cci-mesh-dot-breathe" : ""}`}
          style={{
            backgroundImage: "radial-gradient(var(--grid-dot) 1.15px, transparent 1.15px)",
            backgroundSize: "19px 19px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_72%_at_50%_38%,transparent_30%,var(--background)_94%)]" />
      </motion.div>

      {/* Far-field cursor parallax orbs (depth layer) */}
      {trackPointer && (
        <motion.div
          className="absolute h-[640px] w-[640px] rounded-full blur-3xl cci-mesh-layer"
          style={{
            x: farX,
            y: farY,
            background:
              "radial-gradient(circle, rgba(232,244,246,0.55) 0%, rgba(42,111,122,0.08) 42%, transparent 70%)",
          }}
        />
      )}

      {/* Drifting mesh orbs — Soft Background / Ambient Background pattern */}
      <motion.div className="absolute inset-0 cci-mesh-layer" style={{ y: parallaxMid }}>
        <div
          className={`cci-mesh-orb absolute -left-[12%] top-[-8%] h-[60vmax] w-[60vmax] rounded-full blur-3xl ${
            animate ? "cci-mesh-drift-a" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(243,232,255,0.85) 0%, rgba(99,102,241,0.12) 42%, transparent 68%)",
          }}
        />
        <div
          className={`cci-mesh-orb absolute -right-[18%] top-[4%] h-[54vmax] w-[54vmax] rounded-full blur-3xl ${
            animate ? "cci-mesh-drift-b" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(224,242,254,0.9) 0%, rgba(99,102,241,0.14) 40%, transparent 70%)",
          }}
        />
        <div
          className={`cci-mesh-orb absolute left-[22%] top-[38%] h-[50vmax] w-[50vmax] rounded-full blur-3xl ${
            animate ? "cci-mesh-drift-c" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(243,246,250,0.8) 0%, rgba(201,208,216,0.22) 38%, transparent 68%)",
          }}
        />
        <div
          className={`cci-mesh-orb absolute bottom-[-18%] right-[8%] h-[46vmax] w-[46vmax] rounded-full blur-3xl ${
            animate ? "cci-mesh-drift-a" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(232,244,246,0.7) 0%, rgba(42,111,122,0.1) 50%, transparent 65%)",
            animationDelay: animate ? "-8s" : undefined,
          }}
        />
        <div
          className={`cci-mesh-orb absolute left-[48%] top-[8%] h-[36vmax] w-[36vmax] rounded-full blur-3xl ${
            animate ? "cci-mesh-drift-b" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(148,163,184,0.14) 0%, rgba(42,111,122,0.06) 45%, transparent 70%)",
            animationDelay: animate ? "-14s" : undefined,
          }}
        />
      </motion.div>

      {/* Near cursor glow orb — light gradient follow */}
      {trackPointer && (
        <motion.div
          className="absolute h-[640px] w-[640px] rounded-full blur-3xl cci-mesh-layer"
          style={{
            x: sx,
            y: sy,
            background:
              "radial-gradient(circle, rgba(232,244,246,0.65) 0%, rgba(42,111,122,0.16) 36%, transparent 68%)",
          }}
        />
      )}

      {/* Light trails / fiber arcs — stroke-dash shimmer */}
      <motion.div
        className="absolute inset-[-10%] opacity-75 cci-mesh-layer"
        style={{ y: parallaxFast, rotate: trailRotate }}
      >
        <svg
          className={`absolute inset-0 h-full w-full ${animate ? "cci-mesh-trail" : ""}`}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            className={animate ? "cci-trail-dash" : undefined}
            d="M-80 620 C 220 420, 480 780, 760 520 S 1280 280, 1520 460"
            stroke="rgba(42,111,122,0.16)"
            strokeWidth="1.25"
          />
          <path
            className={animate ? "cci-trail-dash-slow" : undefined}
            d="M-40 180 C 260 320, 520 40, 820 220 S 1220 420, 1480 160"
            stroke="rgba(100,116,139,0.14)"
            strokeWidth="1.1"
          />
          <path
            d="M200 920 C 420 700, 640 860, 900 640 S 1240 480, 1500 700"
            stroke="rgba(201,208,216,0.55)"
            strokeWidth="1.4"
          />
          <path
            className={animate ? "cci-trail-dash" : undefined}
            d="M-60 400 C 300 280, 560 560, 880 360 S 1300 200, 1560 340"
            stroke="rgba(42,111,122,0.09)"
            strokeWidth="2.5"
            opacity="0.75"
            style={{ animationDelay: "-4s" }}
          />
        </svg>
      </motion.div>

      {/* Secondary faint grid for depth */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,46,58,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,46,58,0.045) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)",
        }}
      />

      {/* Film-grain / noise — Soft Background pattern, very subtle */}
      <div className="cci-mesh-noise absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
      <div className="cci-mesh-noise cci-mesh-noise-shimmer absolute inset-0 opacity-[0.022] mix-blend-overlay" />

      <FramerStyleVignette />

      {/* Corner engineering marks */}
      <div className="absolute left-5 top-24 hidden h-14 w-14 border-l border-t border-[color:var(--accent)]/10 sm:block lg:left-10 lg:top-28" />
      <div className="absolute right-5 top-24 hidden h-14 w-14 border-r border-t border-[color:var(--accent)]/10 sm:block lg:right-10 lg:top-28" />
      <div className="absolute bottom-20 left-5 hidden h-14 w-14 border-b border-l border-[color:var(--accent)]/10 sm:block lg:bottom-24 lg:left-10" />
      <div className="absolute bottom-20 right-5 hidden h-14 w-14 border-b border-r border-[color:var(--accent)]/10 sm:block lg:bottom-24 lg:right-10" />
    </div>
  );
}
