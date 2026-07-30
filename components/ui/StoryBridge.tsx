"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealViewport, springPremium } from "@/lib/motion";

type StoryBridgeProps = {
  text: string;
  className?: string;
};

/** One-line narrative handoff + animated rule between major scroll beats. */
export function StoryBridge({ text, className = "" }: StoryBridgeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`content-bounds ${className}`}>
        <p className="mx-auto max-w-xl text-center text-[13px] leading-relaxed text-muted sm:text-sm">
          {text}
        </p>
        <hr className="story-bridge-rule mx-auto mt-6 max-w-md border-0" aria-hidden />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={springPremium}
      className={`content-bounds ${className}`}
    >
      <p className="mx-auto max-w-xl text-center text-[13px] leading-relaxed text-muted sm:text-sm">
        {text}
      </p>
      <motion.hr
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={{ ...springPremium, delay: 0.08 }}
        className="story-bridge-rule mx-auto mt-6 max-w-md origin-center border-0"
        aria-hidden
      />
    </motion.div>
  );
}
