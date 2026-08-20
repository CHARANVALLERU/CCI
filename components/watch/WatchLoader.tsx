"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Full-screen intro loader — SVG arc sweep (reference: stroke-dasharray 2168,
 * 1.2s ease-in-out) then cross-fades into the experience.
 */
export function WatchLoader({ onDone }: { onDone?: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setGone(true);
      onDone?.();
    }, 1900);
    return () => window.clearTimeout(t);
  }, [onDone]);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ backgroundColor: "var(--w-bg, #0C1222)" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 1.9, times: [0, 0.72, 1], ease: "easeInOut" }}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-6">
        <svg width="160" height="160" viewBox="0 0 720 720" fill="none">
          <circle cx="360" cy="360" r="345" stroke="var(--w-border, rgba(185,182,189,0.18))" strokeWidth="2" />
          <motion.circle
            cx="360"
            cy="360"
            r="345"
            stroke="var(--w-accent, #6366F1)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={2168}
            style={{ rotate: -90, transformOrigin: "center" }}
            initial={{ strokeDasharray: "2168", strokeDashoffset: 2168 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </svg>
        <motion.p
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "var(--w-muted, #B9B6BD)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Now loading
        </motion.p>
      </div>
    </motion.div>
  );
}
