"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  cascadeItem,
  cascadeParent,
  reducedReveal,
  revealViewport,
  sectionReveal,
  sectionRevealCinematic,
  springPremium,
} from "@/lib/motion";
import { StoryBridge } from "@/components/ui/StoryBridge";

type SectionDensity = "tight" | "standard" | "immersive";

const densityShell: Record<SectionDensity, string> = {
  tight: "section-shell-tight",
  standard: "section-shell",
  immersive: "section-shell-immersive",
};

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  "aria-label"?: string;
  /** When true, children using CascadeChild stagger in Apple-style. */
  cascade?: boolean;
  /** Subtle scale on enter — transform-only, no layout shift. */
  cinematic?: boolean;
  /** Rhythm: tight band vs full visual moment. */
  density?: SectionDensity;
  /** One-line scroll handoff shown above section content. */
  bridge?: string;
};

/** Scroll-linked reveal wrapper — viewport-tied, reduced-motion safe. */
export function SectionReveal({
  children,
  className,
  id,
  delay = 0,
  "aria-label": ariaLabel,
  cascade = false,
  cinematic = false,
  density = "standard",
  bridge,
}: SectionRevealProps) {
  const reduce = useReducedMotion();
  const shell = densityShell[density];
  const mergedClass = [shell, className].filter(Boolean).join(" ");
  const motionBase = cinematic && !reduce ? sectionRevealCinematic : sectionReveal;
  const base = reduce ? reducedReveal : motionBase;

  const inner = (
    <>
      {bridge ? <StoryBridge text={bridge} className="mb-10 sm:mb-12" /> : null}
      {children}
    </>
  );

  if (cascade && !reduce) {
    return (
      <motion.section
        id={id}
        aria-label={ariaLabel}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={cascadeParent}
        className={mergedClass}
      >
        {inner}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      initial={base.initial}
      whileInView={base.whileInView}
      viewport={base.viewport}
      transition={{ ...base.transition, delay: reduce ? 0 : delay }}
      className={mergedClass}
    >
      {inner}
    </motion.section>
  );
}

type CascadeChildProps = {
  children: ReactNode;
  className?: string;
};

/** Use inside SectionReveal cascade for staggered Apple-style entrance. */
export function CascadeChild({ children, className }: CascadeChildProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div variants={cascadeItem} className={className}>
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  layoutId?: string;
  hoverScale?: number;
};

export function StaggerItem({
  children,
  className,
  index = 0,
  layoutId,
  hoverScale = 1.02,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ ...springPremium, delay: reduce ? 0 : index * 0.07 }}
      whileHover={reduce ? undefined : { scale: hoverScale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
