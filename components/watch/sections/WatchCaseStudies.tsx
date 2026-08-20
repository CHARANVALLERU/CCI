"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";
import { setHighlight, type RingId } from "@/lib/watchState";

const CASES: { name: string; desc: string; ring: RingId; metric: string }[] = [
  { name: "FinChain", desc: "DeFi trading platform with sub-second settlement.", ring: "data", metric: "$2M+ daily volume" },
  { name: "ShieldOps", desc: "Security operations center with live threat correlation.", ring: "security", metric: "24/7 coverage" },
  { name: "NeuralMetrics", desc: "AI analytics dashboard for streaming telemetry.", ring: "ai", metric: "40% cost reduction" },
];

/** Case studies — hover to light the matching orbital module (reference: Disassembly). */
export function WatchCaseStudies() {
  return (
    <WatchSection id="watch-cases" parallaxWord="Proof">
      <WatchHeading
        eyebrow="03 — Case Studies"
        title="Proof in Production"
        lead="Hover a case — the engine rotates its matching subsystem into the light."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 80, damping: 20 }}
            onMouseEnter={() => setHighlight(c.ring)}
            onMouseLeave={() => setHighlight(null)}
            className="cursor-default rounded-2xl border p-7 transition-colors"
            style={{ borderColor: "var(--w-border)", backgroundColor: "var(--w-surface)" }}
          >
            <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: "var(--w-accent)" }}>
              {c.ring} module
            </p>
            <h3 className="font-display mt-3 text-2xl font-bold" style={{ color: "var(--w-text)" }}>
              {c.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--w-muted)" }}>
              {c.desc}
            </p>
            <p className="mt-5 font-mono text-xs" style={{ color: "var(--w-text)" }}>
              {c.metric}
            </p>
          </motion.article>
        ))}
      </div>
    </WatchSection>
  );
}
