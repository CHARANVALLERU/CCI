"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";
import { setAccentBoost } from "@/lib/watchState";

const METRICS: { value: number; suffix: string; decimals?: number; label: string }[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime SLA" },
  { value: 2, suffix: "M+", label: "Daily Transactions" },
  { value: 24, suffix: "/7", label: "Monitoring Active" },
];

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-black tracking-tight sm:text-6xl" style={{ color: "var(--w-text)" }}>
      {display.toFixed(decimals)}
      <span style={{ color: "var(--w-accent)" }}>{suffix}</span>
    </span>
  );
}

/** Live metrics — animated counters while the particles surge (reference: Mechanism). */
export function WatchMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    setAccentBoost(inView ? 1 : 0);
    return () => setAccentBoost(0);
  }, [inView]);

  return (
    <div ref={ref}>
      <WatchSection id="watch-metrics" parallaxWord="At Scale">
        <WatchHeading eyebrow="04 — Live Metrics" title="Running at Scale" />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="border-l pl-5" style={{ borderColor: "var(--w-border)" }}>
              <Counter value={m.value} suffix={m.suffix} decimals={m.decimals} />
              <p className="mt-3 font-mono text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: "var(--w-muted)" }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </WatchSection>
    </div>
  );
}
