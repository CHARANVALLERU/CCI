"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type StickyScrubProps = {
  children: ReactNode;
  /** Extra scroll runway in vh while content stays sticky. */
  runwayVh?: number;
  className?: string;
  stickyClassName?: string;
};

/**
 * Apple-inspired sticky scrub: pin content while scroll progress
 * drives opacity / translate / scale via useScroll + useTransform.
 * Falls back to static layout when prefers-reduced-motion.
 */
export function StickyScrub({
  children,
  runwayVh = 70,
  className,
  stickyClassName,
}: StickyScrubProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
    restDelta: 0.001,
  });

  const opacity = useTransform(smooth, [0.08, 0.28, 0.72, 0.92], [0.4, 1, 1, 0.5]);
  const y = useTransform(smooth, [0.08, 0.32, 0.7, 0.92], [40, 0, 0, -24]);
  const scale = useTransform(smooth, [0.1, 0.3, 0.75, 0.95], [0.97, 1, 1, 0.99]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ minHeight: `${100 + runwayVh}vh` }}>
      <div className={`sticky top-[12vh] flex min-h-[70vh] items-center ${stickyClassName ?? ""}`}>
        <motion.div
          className="w-full transform-gpu"
          style={{ opacity, y, scale }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
