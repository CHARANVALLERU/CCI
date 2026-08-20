"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type WatchSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Large background word that parallaxes horizontally (reference: ±60vw). */
  parallaxWord?: string;
};

/** Section shell for the watch experience — reveal + optional parallax ghost word. */
export function WatchSection({ id, children, className, parallaxWord }: WatchSectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-18vw", "18vw"]);

  return (
    <section
      ref={ref}
      id={id}
      data-section={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-28 sm:py-36 lg:py-44 ${className ?? ""}`}
    >
      {parallaxWord && !reduce ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-0 -z-10 translate-y-[-50%] font-display text-[22vw] leading-none font-black tracking-tighter whitespace-nowrap opacity-[0.05] select-none"
          style={{ x, color: "var(--w-text)" }}
        >
          {parallaxWord}
        </motion.span>
      ) : null}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 56 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px", amount: 0.2 }}
        transition={reduce ? { duration: 0.35 } : { type: "spring", stiffness: 72, damping: 22, mass: 0.85 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

type WatchHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
};

/** Chapter heading — eyebrow + display title + lead, styled off theme vars. */
export function WatchHeading({ eyebrow, title, lead }: WatchHeadingProps) {
  return (
    <header className="mb-12 max-w-3xl sm:mb-16">
      {eyebrow ? (
        <p
          className="mb-4 font-mono text-[0.6875rem] tracking-[0.3em] uppercase"
          style={{ color: "var(--w-accent)" }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        style={{ color: "var(--w-text)" }}
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--w-muted)" }}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
