"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";

const TIMELINE = [
  { when: "Day 1–3", what: "Discovery & Mapping" },
  { when: "Week 1–2", what: "Architecture & Design" },
  { when: "Week 3–6", what: "Build & Iterate" },
  { when: "Week 7", what: "Deploy & Monitor" },
  { when: "Ongoing", what: "Scale & Optimize" },
];

/** Process — timeline that draws itself as modules activate (reference: Movement). */
export function WatchProcess() {
  return (
    <WatchSection id="watch-process" parallaxWord="Process">
      <WatchHeading
        eyebrow="05 — Process"
        title="How We Build"
        lead="Each module of the engine activates as you scroll — the same sequence we run projects on."
      />
      <div className="relative">
        <motion.div
          className="absolute top-0 left-[7px] hidden h-full w-px origin-top sm:block"
          style={{ backgroundColor: "var(--w-border)" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <ul className="flex flex-col gap-8">
          {TIMELINE.map((step, i) => (
            <motion.li
              key={step.when}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 80, damping: 20 }}
              className="flex items-baseline gap-5 sm:gap-8"
            >
              <span
                className="mt-1 hidden h-[15px] w-[15px] shrink-0 rounded-full border-2 sm:block"
                style={{ borderColor: "var(--w-accent)", backgroundColor: "var(--w-bg)" }}
              />
              <span className="w-24 shrink-0 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--w-accent)" }}>
                {step.when}
              </span>
              <span className="font-display text-xl font-bold sm:text-2xl" style={{ color: "var(--w-text)" }}>
                {step.what}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </WatchSection>
  );
}
