"use client";

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Circle,
  Cloud,
  Loader2,
  Sparkles,
} from "lucide-react";
import { INTEGRATION_HUB_APPS } from "@/components/icons/IntegrationHubIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal, StaggerItem } from "@/components/ui/SectionReveal";
import { springPremium, springSoft } from "@/lib/motion";

const PIPELINE_TASKS = [
  { label: "Workflow Discovery", note: "Mapping business operations", done: true },
  { label: "AI Opportunity Scan", note: "Identifying automation gaps", done: true },
  { label: "Infrastructure Setup", note: "Building scalable architecture", done: true },
  { label: "Security Monitoring", note: "Running live threat detection", done: false },
  { label: "Analytics Engine", note: "Tracking real-time insights", done: false },
] as const;

const STRATEGY_GRID = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 1, 0],
] as const;

const SLIDER_HEIGHTS = [42, 68, 55, 82, 48, 72] as const;

const TILT_MAX = 6;

function GlassCard({
  children,
  className = "",
  title,
  reduce,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduce || !ref.current || e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT_MAX);
    rotateX.set(-py * TILT_MAX);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      data-cursor="hover"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        reduce
          ? undefined
          : {
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/65 bg-white/42 p-4 shadow-[0_8px_40px_rgba(99,102,241,0.06)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-[#8B5CF6]/35 hover:shadow-[0_16px_48px_rgba(99,102,241,0.14)] sm:min-h-[240px] sm:p-5 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.45), rgba(6,182,212,0.25), rgba(139,92,246,0.4))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
        {title}
      </p>
      <div className="mt-3 flex flex-1 flex-col">{children}</div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.1), transparent 70%)",
        }}
      />
    </motion.article>
  );
}

function AutomationPipelineMock({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex flex-1 flex-col rounded-xl border border-zinc-900/8 bg-zinc-950/92 p-3 text-left font-mono text-[10px] text-zinc-300 shadow-inner sm:text-[11px]">
      <div className="mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2">
        <span className="h-2 w-2 rounded-full bg-red-400/90" />
        <span className="h-2 w-2 rounded-full bg-amber-400/90" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
        <span className="ml-auto text-[9px] text-emerald-400/90">System monitoring active</span>
      </div>
      <ul className="space-y-2">
        {PIPELINE_TASKS.map((task, i) => (
          <motion.li
            key={task.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: reduce ? 0 : i * 0.06 }}
            className="flex gap-2 rounded-md border border-white/8 bg-white/5 px-2 py-1.5 transition-colors group-hover:border-white/12"
          >
            {task.done ? (
              <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden />
            ) : (
              <Loader2
                size={12}
                className="mt-0.5 shrink-0 animate-spin text-sky-400 transition-colors group-hover:text-cyan-300"
                aria-hidden
              />
            )}
            <span>
              <span className="block text-zinc-100">{task.label}</span>
              <span className="text-zinc-500">{task.note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function ScanningGaugeMock({ reduce }: { reduce: boolean | null }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <div className="relative h-28 w-28 transition-transform duration-500 group-hover:scale-[1.06]">
        <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="8" />
          <motion.circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={reduce ? { strokeDashoffset: c * 0.35 } : { strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums text-zinc-900 transition-transform duration-300 group-hover:scale-105">
            74%
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted">Ops scan</span>
        </div>
      </div>
      <p className="text-center text-xs leading-snug text-muted">Scanning operational workflows...</p>
    </div>
  );
}

function AiHelpOrbMock({ reduce }: { reduce: boolean | null }) {
  const chips = ["Add document", "Analyze", "Delegate Tasks", "Research"];
  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-3 pb-1">
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 12px 40px rgba(99,102,241,0.25)",
                  "0 16px 48px rgba(139,92,246,0.35)",
                  "0 12px 40px rgba(99,102,241,0.25)",
                ],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] text-white shadow-lg"
      >
        <Sparkles size={22} aria-hidden />
      </motion.div>
      <p className="text-center text-xs font-medium text-zinc-800">What can I help with?</p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {chips.map((chip, i) => (
          <motion.span
            key={chip}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduce ? 0 : 0.15 + i * 0.05 }}
            className="rounded-full border border-white/80 bg-white/60 px-2 py-0.5 text-[9px] font-medium text-zinc-600 transition-colors group-hover:border-[#8B5CF6]/30"
          >
            {chip}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function IntegrationRingMock({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative flex flex-1 items-center justify-center py-2">
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="relative h-32 w-32"
      >
        {INTEGRATION_HUB_APPS.map((app, i) => {
          const angle = (i / INTEGRATION_HUB_APPS.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          const { Icon } = app;
          return (
            <span
              key={app.name}
              title={app.name}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 shadow-sm backdrop-blur-sm"
            >
              <Icon size={18} />
              <span className="sr-only">{app.name}</span>
            </span>
          );
        })}
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#6366F1]/20 bg-gradient-to-br from-white/90 to-[#E0F2FE]/80 shadow-inner">
          <Cloud size={18} className="text-[#6366F1]" aria-hidden />
        </div>
      </motion.div>
      {!reduce && (
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[7.5rem] w-[7.5rem] rounded-full border border-dashed border-[#6366F1]/25" />
        </motion.div>
      )}
    </div>
  );
}

function SimpleStrategiesMock({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-3">
      <div className="grid grid-cols-3 gap-2 place-self-center">
        {STRATEGY_GRID.flatMap((row, ri) =>
          row.map((on, ci) => (
            <motion.div
              key={`${ri}-${ci}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: reduce ? 0 : (ri * 3 + ci) * 0.04 }}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                on
                  ? "border-[#8B5CF6]/30 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/25"
                  : "border-zinc-200/80 bg-white/50"
              }`}
            >
              {on ? (
                <BarChart3 size={14} className="text-[#6366F1]" aria-hidden />
              ) : (
                <Circle size={8} className="text-zinc-300" aria-hidden />
              )}
            </motion.div>
          )),
        )}
      </div>
      <p className="text-center text-xs text-muted">Pattern-led growth playbooks</p>
    </div>
  );
}

function ProcessOptimisationMock({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="flex flex-1 flex-col justify-end gap-2 pb-1">
      <div className="flex h-28 items-end justify-center gap-2 sm:gap-2.5">
        {SLIDER_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="w-3 origin-bottom rounded-full bg-gradient-to-t from-[#6366F1] to-[#06B6D4] transition-[filter] duration-500 group-hover:brightness-110 sm:w-3.5"
            initial={reduce ? { height: `${h}%` } : { height: "12%" }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ ...springPremium, delay: reduce ? 0 : i * 0.06 }}
          />
        ))}
      </div>
      <p className="text-center text-[10px] text-muted">Live throughput tuning</p>
    </div>
  );
}

export function FeatureBento() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.45"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -32]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1]);

  const cards = [
    {
      id: "pipeline",
      title: "Automation Pipeline",
      span: "sm:col-span-2 lg:col-span-2",
      body: <AutomationPipelineMock reduce={reduce} />,
    },
    {
      id: "scan",
      title: "Operational Scanning",
      span: "sm:col-span-1 lg:col-span-1",
      body: <ScanningGaugeMock reduce={reduce} />,
    },
    {
      id: "ai",
      title: "AI Assistant",
      span: "",
      body: <AiHelpOrbMock reduce={reduce} />,
    },
    {
      id: "integration",
      title: "Integration Hub",
      span: "",
      body: <IntegrationRingMock reduce={reduce} />,
    },
    {
      id: "strategies",
      title: "Simple Strategies",
      span: "",
      body: <SimpleStrategiesMock reduce={reduce} />,
    },
    {
      id: "optimisation",
      title: "Process Optimisation",
      span: "",
      body: <ProcessOptimisationMock reduce={reduce} />,
    },
  ] as const;

  return (
    <SectionReveal
      id="story-build"
      cinematic
      density="immersive"
      className="pb-4 lg:pb-10"
    >
      <div ref={sectionRef} className="content-bounds">
        <SectionHeading
          eyebrow="What We Do"
          title="End-to-End Technology Services"
          description="From automation pipelines to AI copilots and integrations — capabilities mapped to how modern products ship."
        />

        <motion.div
          style={{ y: gridY, opacity: gridOpacity }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {cards.map((card, i) => (
            <StaggerItem
              key={card.id}
              index={i}
              layoutId={`bento-${card.id}`}
              hoverScale={1}
              className={card.span}
            >
              <GlassCard title={card.title} reduce={reduce}>
                {card.body}
              </GlassCard>
            </StaggerItem>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
}
