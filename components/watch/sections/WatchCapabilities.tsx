"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";

const PHASES = [
  { name: "Discovery", desc: "Map the problem space, users, and constraints." },
  { name: "Architecture", desc: "Design systems that scale from day one." },
  { name: "Build", desc: "Ship in tight, verifiable iterations." },
  { name: "Deploy", desc: "Automated pipelines, zero-downtime releases." },
  { name: "Monitor", desc: "Observe, alert, and improve continuously." },
];

/** Capabilities — end-to-end flow (reference: Curves). */
export function WatchCapabilities() {
  return (
    <WatchSection id="watch-capabilities" parallaxWord="End to End">
      <WatchHeading
        eyebrow="02 — Capabilities"
        title="End-to-End Engineering"
        lead="One continuous pipeline from first workshop to production telemetry. Scroll — the machine opens as the story unfolds."
      />
      <ol className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PHASES.map((phase, i) => (
          <motion.li
            key={phase.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80, damping: 20 }}
            className="rounded-xl border p-5"
            style={{ borderColor: "var(--w-border)", backgroundColor: "var(--w-surface)" }}
          >
            <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: "var(--w-accent)" }}>
              0{i + 1}
            </p>
            <h3 className="font-display mt-3 text-base font-bold" style={{ color: "var(--w-text)" }}>
              {phase.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--w-muted)" }}>
              {phase.desc}
            </p>
          </motion.li>
        ))}
      </ol>
    </WatchSection>
  );
}
