"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max pixel pull toward the pointer. */
  strength?: number;
  /** Disable magnetism (still renders children). */
  disabled?: boolean;
};

/**
 * Subtle cursor magnetism — Lusion-style pull on interactive chrome
 * (nav icons, CTAs). No-ops under reduced motion / coarse pointers.
 */
export function Magnetic({
  children,
  strength = 10,
  disabled = false,
  className,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });

  const inactive = disabled || reduce;

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (inactive || !ref.current) return;
    if (e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (inactive) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
