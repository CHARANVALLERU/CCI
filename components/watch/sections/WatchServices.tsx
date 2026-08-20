"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";
import { watchThemes, watchThemeOrder, type WatchThemeId } from "@/lib/watchThemes";
import type { RingId } from "@/lib/watchState";

const PILLARS: { id: RingId; theme: WatchThemeId; blurb: string }[] = [
  { id: "ai", theme: "void", blurb: "Machine learning pipelines, NLP, computer vision" },
  { id: "security", theme: "obsidian", blurb: "SOC, threat detection, zero-trust architecture" },
  { id: "cloud", theme: "aurora", blurb: "AWS / Azure / GCP, Kubernetes, serverless" },
  { id: "data", theme: "mineral", blurb: "Streaming, warehousing, real-time analytics" },
];

type WatchServicesProps = {
  active: WatchThemeId;
  onSelect: (id: WatchThemeId) => void;
};

/** Services configurator — 4 pillars; selecting one re-themes page + 3D scene (reference: Colors). */
export function WatchServices({ active, onSelect }: WatchServicesProps) {
  return (
    <WatchSection id="watch-services" parallaxWord="Stack">
      <WatchHeading
        eyebrow="01 — Services Configurator"
        title="Choose Your Stack"
        lead="Four capability pillars, four worlds. Select a pillar to retune the entire experience — interface and machine alike."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar, i) => {
          const theme = watchThemes[pillar.theme];
          const isActive = active === pillar.theme;
          return (
            <motion.button
              key={pillar.id}
              type="button"
              onClick={() => onSelect(pillar.theme)}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 80, damping: 20 }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl border p-6 text-left backdrop-blur-sm transition-colors"
              style={{
                borderColor: isActive ? theme.accent : "var(--w-border)",
                backgroundColor: isActive ? "var(--w-surface)" : "transparent",
              }}
              aria-pressed={isActive}
            >
              <span
                className="mb-5 block h-10 w-10 rounded-full border-2 transition-transform group-hover:scale-110"
                style={{ borderColor: theme.accent, backgroundColor: isActive ? theme.accent : "transparent" }}
              />
              <h3 className="font-display text-lg font-bold" style={{ color: "var(--w-text)" }}>
                {pillar.id === "ai" ? "AI & Automation" : pillar.id === "security" ? "Security" : pillar.id === "cloud" ? "Cloud" : "Data"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--w-muted)" }}>
                {pillar.blurb}
              </p>
              <p className="mt-4 font-mono text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: theme.accent }}>
                {theme.label} theme
              </p>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-8 font-mono text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: "var(--w-muted)" }}>
        Active: {watchThemes[active].label} · {watchThemeOrder.indexOf(active) + 1} / 4
      </p>
    </WatchSection>
  );
}
