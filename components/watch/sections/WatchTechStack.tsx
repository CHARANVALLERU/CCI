"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";
import { setHighlight, type RingId } from "@/lib/watchState";

const STACK: { category: string; ring: RingId; items: string[]; level: number }[] = [
  { category: "Frontend", ring: "ai", items: ["React", "Next.js", "Svelte", "TypeScript"], level: 0.95 },
  { category: "Backend", ring: "cloud", items: ["Node.js", "Python", "Go", "Rust"], level: 0.9 },
  { category: "AI / ML", ring: "ai", items: ["PyTorch", "TensorFlow", "LangChain", "OpenCV"], level: 0.85 },
  { category: "Cloud", ring: "cloud", items: ["AWS", "Azure", "GCP", "Kubernetes"], level: 0.92 },
  { category: "Data", ring: "data", items: ["Kafka", "Spark", "PostgreSQL", "Redis"], level: 0.88 },
  { category: "Security", ring: "security", items: ["SOC2", "OWASP", "Zero-Trust", "SIEM"], level: 0.9 },
];

/** Tech stack — proficiency bars that highlight their module on hover (reference: Parts). */
export function WatchTechStack() {
  return (
    <WatchSection id="watch-stack" parallaxWord="Arsenal">
      <WatchHeading
        eyebrow="06 — Tech Stack"
        title="Our Arsenal"
        lead="Hover a category to light its module inside the engine."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: (i % 3) * 0.07, type: "spring", stiffness: 80, damping: 20 }}
            onMouseEnter={() => setHighlight(group.ring)}
            onMouseLeave={() => setHighlight(null)}
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--w-border)", backgroundColor: "var(--w-surface)" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold" style={{ color: "var(--w-text)" }}>
                {group.category}
              </h3>
              <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: "var(--w-accent)" }}>
                {group.ring}
              </span>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--w-muted)" }}>
              {group.items.join(" · ")}
            </p>
            <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--w-border)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--w-accent)" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${group.level * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </WatchSection>
  );
}
