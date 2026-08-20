"use client";

import { motion } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";

const QUOTES = [
  { text: "CCI transformed our legacy system into a modern cloud-native architecture.", who: "CTO, fintech scale-up" },
  { text: "Their AI automation reduced our operational costs by 40%.", who: "Head of Ops, logistics" },
  { text: "Best security audit we've ever had — thorough, fast, actionable.", who: "CISO, healthcare" },
];

/** Testimonials — vertical rhythm quotes (reference: VerticalText). */
export function WatchTestimonials() {
  return (
    <WatchSection id="watch-testimonials" parallaxWord="Voices">
      <WatchHeading eyebrow="07 — Testimonials" title="Client Insights" />
      <div className="flex flex-col gap-14">
        {QUOTES.map((q, i) => (
          <motion.blockquote
            key={q.who}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 72, damping: 22 }}
            className={`max-w-3xl ${i % 2 === 1 ? "self-end text-right" : ""}`}
          >
            <p
              className="font-display text-2xl leading-snug font-bold sm:text-3xl"
              style={{ color: "var(--w-text)" }}
            >
              “{q.text}”
            </p>
            <footer className="mt-4 font-mono text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: "var(--w-muted)" }}>
              {q.who}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </WatchSection>
  );
}
