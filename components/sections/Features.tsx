"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  BarChart3,
  Check,
  Clock,
  Loader2,
  Route,
  ScanSearch,
  Server,
  Shield,
  X,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { revealViewport, springPremium, staggerDelay } from "@/lib/motion";
import { STORY_BRIDGES } from "@/lib/storyArc";

type RowStatus = "complete" | "pending" | "error" | "loading";

type PipelineRow = {
  id: string;
  title: string;
  description: string;
  status: RowStatus;
  Icon: LucideIcon;
};

const PIPELINE_ROWS: PipelineRow[] = [
  {
    id: "analytics",
    title: "Analytics Engine",
    description: "Tracking real-time insights",
    status: "complete",
    Icon: BarChart3,
  },
  {
    id: "workflow",
    title: "Workflow Discovery",
    description: "Mapping business operations",
    status: "pending",
    Icon: Route,
  },
  {
    id: "ai-scan",
    title: "AI Opportunity Scan",
    description: "Identifying automation gaps",
    status: "complete",
    Icon: ScanSearch,
  },
  {
    id: "infra",
    title: "Infrastructure Setup",
    description: "Building scalable architecture",
    status: "error",
    Icon: Server,
  },
  {
    id: "security",
    title: "Security Monitoring",
    description: "Running live threat detection",
    status: "loading",
    Icon: Shield,
  },
];

function StatusGlyph({
  status,
  reduce,
  instant,
}: {
  status: RowStatus;
  reduce: boolean | null;
  instant?: boolean;
}) {
  const common =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[color:var(--border-soft)] bg-white/55 backdrop-blur-sm";

  if (instant || reduce) {
    const tone =
      status === "complete"
        ? "text-[color:var(--accent-soft)]"
        : status === "pending"
          ? "text-[color:var(--brand-indigo)]"
          : status === "error"
            ? "text-red-500/90"
            : "text-[color:var(--accent-soft)]";
    const label =
      status === "complete"
        ? "Complete"
        : status === "pending"
          ? "In progress"
          : status === "error"
            ? "Blocked"
            : "Running";
    return (
      <span className={`${common} ${tone}`} aria-label={label}>
        {status === "complete" ? (
          <Check size={14} strokeWidth={2.5} aria-hidden />
        ) : status === "pending" ? (
          <Clock size={14} aria-hidden />
        ) : status === "error" ? (
          <X size={14} strokeWidth={2.5} aria-hidden />
        ) : (
          <Loader2 size={14} className="animate-spin" aria-hidden />
        )}
      </span>
    );
  }

  if (status === "complete") {
    return (
      <motion.span
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={springPremium}
        className={`${common} text-[color:var(--accent-soft)]`}
        aria-label="Complete"
      >
        <Check size={14} strokeWidth={2.5} aria-hidden />
      </motion.span>
    );
  }

  if (status === "pending") {
    return (
      <motion.span
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={springPremium}
        className={`${common} text-[color:var(--brand-indigo)]`}
        aria-label="In progress"
      >
        <Clock size={14} aria-hidden />
      </motion.span>
    );
  }

  if (status === "error") {
    return (
      <motion.span
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={revealViewport}
        transition={springPremium}
        className={`${common} text-red-500/90`}
        aria-label="Blocked"
      >
        <X size={14} strokeWidth={2.5} aria-hidden />
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={revealViewport}
      transition={springPremium}
      className={`${common} text-[color:var(--accent-soft)]`}
      aria-label="Running"
    >
      <Loader2 size={14} className="animate-spin" aria-hidden />
    </motion.span>
  );
}

function PipelineRowItem({
  row,
  reduce,
  motionReveal,
  index,
}: {
  row: PipelineRow;
  reduce: boolean | null;
  motionReveal: boolean;
  index?: number;
}) {
  const rowVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: staggerDelay(i, 0.08),
    }),
  };

  const className =
    "group flex items-center gap-3 rounded-xl border border-transparent bg-white/35 px-3 py-3 transition-[background-color,border-color,box-shadow] duration-300 hover:border-[color:var(--accent-soft)]/25 hover:bg-white/58 hover:shadow-[0_8px_24px_rgba(42,111,122,0.08)] sm:gap-4 sm:px-4";

  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--border-soft)] bg-white/60 text-[color:var(--accent)] transition-transform duration-300 group-hover:scale-105">
        <row.Icon size={17} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold tracking-tight text-heading sm:text-sm">
          {row.title}
        </p>
        <p className="mt-0.5 font-mono text-[10px] leading-snug text-[color:var(--brand-indigo)]/85 sm:text-[11px]">
          {row.description}
        </p>
      </div>
      <StatusGlyph status={row.status} reduce={reduce} instant={!motionReveal} />
    </>
  );

  if (motionReveal && index !== undefined) {
    return (
      <motion.li
        custom={index}
        variants={rowVariants}
        initial={reduce ? "visible" : "hidden"}
        whileInView="visible"
        viewport={revealViewport}
        data-cursor="hover"
        className={className}
      >
        {inner}
      </motion.li>
    );
  }

  return (
    <li data-cursor="hover" className={className}>
      {inner}
    </li>
  );
}

const SCROLL_ROWS = [...PIPELINE_ROWS, ...PIPELINE_ROWS];

export function Features() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0.1, 0.35], [reduce ? 0 : 48, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.08, 0.32], [reduce ? 1 : 0.55, 1]);

  return (
    <SectionReveal
      id="features"
      cinematic
      bridge={STORY_BRIDGES.features}
      density="immersive"
      className="pb-8 lg:pb-14"
    >
      <div ref={sectionRef} className="content-bounds" data-framer-name="Features">
        <SectionHeading
          chapter="02"
          storyBeat="Build"
          eyebrow="WHAT WE DO"
          title="End-to-End Technology Services"
          description="Automation pipelines, AI discovery, and secure infrastructure — mapped to how modern products ship."
        />

        <motion.div
          style={{ y: cardY, opacity: cardOpacity }}
          className="mt-10 sm:mt-12"
          data-cursor="hover"
        >
          <article className="features-glass-card overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass)] p-1 shadow-card backdrop-blur-2xl">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-soft)] px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold tracking-tight text-heading">
                Automation Pipeline
              </p>
              <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--accent-soft)]">
                <span
                  className="h-2 w-2 rounded-full bg-[color:var(--accent-soft)] animate-pulse-dot"
                  aria-hidden
                />
                System monitoring active
              </p>
            </header>

            <div className="relative px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
              {reduce ? (
                <ul className="features-scroll-list relative max-h-[min(22rem,52vh)] space-y-2 overflow-hidden px-2 py-2 sm:px-3">
                  {PIPELINE_ROWS.map((row, index) => (
                    <PipelineRowItem
                      key={row.id}
                      row={row}
                      reduce={reduce}
                      motionReveal
                      index={index}
                    />
                  ))}
                </ul>
              ) : (
                <div
                  className="features-scroll-viewport relative max-h-[min(22rem,52vh)] overflow-hidden px-2 py-2 sm:px-3"
                  aria-live="off"
                  aria-label="Automation pipeline status"
                >
                  <ul className="features-pipeline-marquee space-y-2">
                    {SCROLL_ROWS.map((row, index) => (
                      <PipelineRowItem
                        key={`${row.id}-${index}`}
                        row={row}
                        reduce={reduce}
                        motionReveal={false}
                      />
                    ))}
                  </ul>
                </div>
              )}

              <div
                aria-hidden
                className="features-list-edge pointer-events-none absolute inset-x-0 bottom-12 h-24 bg-gradient-to-t from-[color:var(--background)]/90 via-[color:var(--background)]/40 to-transparent"
              />
            </div>

            <footer className="border-t border-[color:var(--border-soft)] px-5 py-4 text-center sm:px-6">
              <p className="text-sm font-medium tracking-tight text-[color:var(--brand-indigo)]/90">
                Mobile App Development
              </p>
            </footer>
          </article>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
