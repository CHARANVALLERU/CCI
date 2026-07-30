"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cascadeItem, cascadeParent, revealViewport, springPremium } from "@/lib/motion";
import { useHeadingGradientLatch } from "@/lib/useHeadingGradientLatch";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** CCI slate-teal / indigo-soft display gradient on the title (default on) */
  gradientTitle?: boolean;
  /** Chapter index in scroll narrative, e.g. "02" */
  chapter?: string;
  /** Short narrative beat — shown beside chapter when set */
  storyBeat?: string;
};

/**
 * Apple-style type cascade: eyebrow → display title → supporting line,
 * viewport-linked with premium spring settle.
 */
function ChapterEyebrow({
  chapter,
  storyBeat,
  eyebrow,
}: {
  chapter?: string;
  storyBeat?: string;
  eyebrow: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {chapter ? (
        <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.12em] text-zinc-400">
          {chapter}
        </span>
      ) : null}
      {storyBeat ? (
        <>
          <span className="hidden h-3 w-px bg-zinc-300/80 sm:block" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6366F1]/90">
            {storyBeat}
          </span>
          <span className="hidden h-3 w-px bg-zinc-300/80 sm:block" aria-hidden />
        </>
      ) : null}
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  gradientTitle = true,
  chapter,
  storyBeat,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const { latchedClass, latchGradient } = useHeadingGradientLatch();
  const alignCls = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  const eyebrowAlign =
    align === "center" ? "justify-center" : "justify-start";
  const titleCls = gradientTitle
    ? `cci-heading-gradient ${latchedClass} text-balance text-[1.75rem] font-bold tracking-tight sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]`
    : "text-balance text-[1.75rem] font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]";

  if (reduce) {
    return (
      <div
        className={`group/section-heading ${alignCls}`}
        onMouseEnter={gradientTitle ? latchGradient : undefined}
      >
        <div className={`mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 ${eyebrowAlign}`}>
          {chapter ? (
            <span className="font-mono text-[10px] font-medium tabular-nums tracking-[0.12em] text-zinc-400">
              {chapter}
            </span>
          ) : null}
          {storyBeat ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6366F1]/90">
              {storyBeat}
            </span>
          ) : null}
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        </div>
        <h2 className={titleCls}>{title}</h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={cascadeParent}
      className={`group/section-heading ${alignCls}`}
      onMouseEnter={gradientTitle ? latchGradient : undefined}
    >
      <motion.div
        variants={cascadeItem}
        className={`mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 ${eyebrowAlign}`}
      >
        <ChapterEyebrow chapter={chapter} storyBeat={storyBeat} eyebrow={eyebrow} />
      </motion.div>
      <motion.h2 variants={cascadeItem} className={titleCls}>
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={cascadeItem}
          transition={springPremium}
          className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-base"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
