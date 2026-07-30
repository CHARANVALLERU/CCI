"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { STORY_BRIDGES } from "@/lib/storyArc";
import { springPremium, springSoft } from "@/lib/motion";

const PHASES = [
  {
    id: "discover",
    label: "Discover",
    step: "Step 1",
    body: "We dive deep into your business goals, target audience, and technical requirements to map out the perfect solution strategy.",
    status: "System monitoring active",
    logs: [
      { cmd: "Workflow Discovery", note: "Mapping business operations" },
      { cmd: "AI Opportunity Scan", note: "Identifying automation gaps" },
      { cmd: "Infrastructure Setup", note: "Building scalable architecture" },
    ],
  },
  {
    id: "design",
    label: "Design",
    step: "Step 2",
    body: "Our designers craft intuitive wireframes, stunning interfaces, and robust system architectures aligned with your brand.",
    status: "Scanning operational workflows...",
    logs: [
      { cmd: "Wireframe Sync", note: "Aligning UX flows" },
      { cmd: "System Architecture", note: "Drafting service topology" },
      { cmd: "Brand Tokens", note: "Applying design system" },
    ],
  },
  {
    id: "develop",
    label: "Develop",
    step: "Step 3",
    body: "Agile sprints, clean code, and rigorous testing. We build robust, scalable solutions with full transparency throughout.",
    status: "Build pipeline streaming...",
    logs: [
      { cmd: "Sprint Commit", note: "Feature modules compiling" },
      { cmd: "Test Suite", note: "Coverage gates green" },
      { cmd: "Security Scan", note: "Running live threat detection" },
    ],
  },
  {
    id: "deploy",
    label: "Deploy",
    step: "Step 4",
    body: "Seamless CI/CD deployment, performance optimization, monitoring, and ongoing support to keep your product running flawlessly.",
    status: "Production rollout ready",
    logs: [
      { cmd: "CI/CD Release", note: "Blue-green deploy armed" },
      { cmd: "Perf Tuning", note: "Latency budgets met" },
      { cmd: "Observability", note: "Tracking real-time insights" },
    ],
  },
] as const;

export function OperationsPanel() {
  const [active, setActive] = useState(0);
  const phase = PHASES[active];
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const panelY = useTransform(scrollYProgress, [0.15, 0.45], [reduce ? 0 : 36, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.12, 0.38], [reduce ? 1 : 0.45, 1]);

  const reduceMotion = reduce === true;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % PHASES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <SectionReveal
      id="story-deliver"
      cinematic
      bridge={STORY_BRIDGES["story-deliver"]}
      density="standard"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div ref={sectionRef} className="content-bounds">
        <SectionHeading
          chapter="03"
          storyBeat="Deliver"
          eyebrow="Our Methodology"
          title="How We Deliver Excellence"
          description="A proven four-phase process that ensures every project is delivered on time, on budget, and beyond expectations."
        />

        <LayoutGroup id="ops-phases">
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {PHASES.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  layoutId={`phase-card-${item.id}`}
                  onClick={() => setActive(index)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...springPremium, delay: reduce ? 0 : index * 0.07 }}
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  className={`rounded-2xl p-5 text-left touch-manipulation transition-[box-shadow,ring-color] ${
                    active === index
                      ? "bg-white/55 ring-2 ring-[color:var(--accent-soft)]/40 shadow-card backdrop-blur-sm"
                      : "bg-transparent ring-1 ring-zinc-900/10 hover:ring-[color:var(--accent-soft)]/30"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {item.step}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-950">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.button>
              ))}
            </div>

            <motion.div
              layout
              style={{ y: panelY, opacity: panelOpacity }}
              whileHover={reduce ? undefined : { scale: 1.01 }}
              transition={springSoft}
              className="overflow-hidden rounded-2xl bg-[#0a1620]/88 text-slate-100 ring-1 ring-white/10 shadow-card backdrop-blur-md transform-gpu"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <p className="font-mono text-[11px] text-zinc-400">ops://control-panel</p>
              </div>

              <div className="space-y-4 p-5 font-mono text-[12px] sm:text-[13px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phase.status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={springSoft}
                    >
                      {phase.status}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <p className="text-zinc-500">$ crawlctl simulate --phase {phase.id}</p>

                <AnimatePresence mode="wait">
                  <motion.ul
                    key={phase.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={springSoft}
                    className="space-y-3"
                  >
                    {phase.logs.map((log) => (
                      <li
                        key={log.cmd}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <p className="text-zinc-100">{log.cmd}</p>
                        <p className="mt-1 text-zinc-500">
                          {`>`} {log.note}
                        </p>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>

                <p className="text-zinc-500">
                  Weather you want help in customer handling or make changes in your system just give
                  me command_
                </p>
              </div>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </SectionReveal>
  );
}
