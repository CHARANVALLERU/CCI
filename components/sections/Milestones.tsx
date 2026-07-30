"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { DeadLink } from "@/components/ui/DeadLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StickyScrub } from "@/components/ui/StickyScrub";
import { useCountUp } from "@/hooks/useCountUp";
import { revealViewport, springPremium, springSoft, staggerDelay } from "@/lib/motion";

const STATS = [
  { label: "Projects Delivered", value: 120, suffix: "+" },
  { label: "Happy Clients", value: 85, suffix: "+" },
  { label: "Core Services", value: 10, suffix: "+" },
  { label: "Client Retention", value: 98, suffix: "%" },
] as const;

function Stat({
  label,
  value,
  suffix,
  start,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  start: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const count = useCountUp(value, 1600, start);
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={staggerDelay(index, 0.08)}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      className="border-t border-zinc-900/[0.08] py-5 text-center sm:border-t-0 sm:border-l sm:px-4 sm:first:border-l-0 sm:first:pl-0"
    >
      <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function Milestones() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const panel = (
    <div className="content-bounds section-shell py-16 sm:py-20 lg:py-24">
      <SectionHeading
        eyebrow="Performance"
        title="Our Milestones, your Advantage"
        description="Driving measurable growth worldwide with every campaign launched, user supported, and AI-driven solution delivered."
        align="center"
      />

      <motion.div
        ref={ref}
        initial={reduce ? undefined : { opacity: 0.96 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-10 grid gap-0 rounded-2xl border-y border-zinc-900/[0.08] bg-white/20 py-2 ring-1 ring-zinc-900/[0.04] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:py-4"
      >
        {STATS.map((stat, i) => (
          <Stat key={stat.label} {...stat} start={inView} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={springPremium}
        className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12"
      >
        <p className="max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
          Let&apos;s talk about your project. Our team will respond within 24 hours with a tailored
          solution roadmap.
        </p>
        <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} transition={springSoft}>
          <DeadLink
            href="/contact"
            className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg ring-1 ring-[color:var(--accent)] hover:ring-[color:var(--accent-soft)]"
          >
            Start Your Project
          </DeadLink>
        </motion.div>
      </motion.div>
    </div>
  );

  if (reduce) {
    return <section className="relative w-full">{panel}</section>;
  }

  return (
    <section className="relative w-full">
      <StickyScrub runwayVh={55} className="w-full">
        {panel}
      </StickyScrub>
    </section>
  );
}
