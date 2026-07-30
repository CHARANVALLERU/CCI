"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Code2, Rocket, Sparkles } from "lucide-react";
import {
  ExportIcon,
  OpenAIIcon,
  ShipIcon,
  SpeedIcon,
} from "@/components/icons/TechIcons";
import { springSoft } from "@/lib/motion";

const glassCard =
  "group relative flex flex-col overflow-hidden rounded-[22px] border border-sky-100/90 bg-gradient-to-br from-sky-50/95 via-white/78 to-indigo-50/55 p-5 shadow-[0_10px_40px_rgba(99,102,241,0.07)] backdrop-blur-xl transition-[box-shadow,border-color] duration-300 hover:border-indigo-200/90 hover:shadow-[0_18px_48px_rgba(99,102,241,0.14)]";

function CategoryPill({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-700 ring-1 ring-zinc-900/[0.06]">
      {icon}
      {label}
    </span>
  );
}

function DottedLogoStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative my-4 flex min-h-[148px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-[radial-gradient(circle,var(--grid-dot)_1px,transparent_1px)] bg-[length:14px_14px] bg-center"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

function ReactLogoColored({ size = 72 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      aria-hidden
      focusable={false}
    >
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function BlobAbstractCard() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 35% 45%, rgba(236, 72, 153, 0.55), transparent 65%), radial-gradient(ellipse 65% 60% at 68% 58%, rgba(59, 130, 246, 0.55), transparent 62%), radial-gradient(circle at 50% 100%, rgba(167, 139, 250, 0.35), transparent 55%)",
        }}
      />
      <svg
        className="relative z-[1] h-[85%] w-[85%] max-h-[220px]"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <defs>
          <linearGradient id="blob-hemi-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="blob-hemi-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="118" rx="78" ry="62" fill="url(#blob-hemi-a)" opacity="0.92" />
        <ellipse cx="118" cy="92" rx="52" ry="44" fill="url(#blob-hemi-b)" opacity="0.88" />
        <ellipse cx="82" cy="78" rx="36" ry="30" fill="#fda4af" opacity="0.75" />
      </svg>
    </div>
  );
}

function BentoMotion({
  children,
  className = "",
  index,
}: {
  children: ReactNode;
  className?: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      whileHover={reduce ? undefined : { y: -8, scale: 1.012 }}
      data-cursor="hover"
      className={`${glassCard} ${className}`}
    >
      {children}
    </motion.article>
  );
}

export function IntegrationBentos() {
  return (
    <div
      className="framer-ej439c mx-auto mt-10 w-full max-w-[1280px]"
      data-framer-name="Bentos"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:auto-rows-min lg:gap-5">
        <BentoMotion index={0} className="min-h-[340px] lg:row-span-2 lg:min-h-[420px]">
          <CategoryPill
            icon={<Code2 size={13} className="text-indigo-500" aria-hidden />}
            label="Frontend"
          />
          <DottedLogoStage>
            <ReactLogoColored size={80} />
          </DottedLogoStage>
          <h3 className="text-lg font-bold tracking-tight text-zinc-950">React</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Component-based UI library for scalable frontends.
          </p>
        </BentoMotion>

        <BentoMotion index={1} className="min-h-[220px] lg:col-start-2 lg:row-start-1">
          <CategoryPill
            icon={<Brain size={13} className="text-violet-500" aria-hidden />}
            label="AI"
          />
          <DottedLogoStage>
            <OpenAIIcon size={56} className="text-zinc-800" />
          </DottedLogoStage>
          <h3 className="text-base font-bold text-zinc-950">OpenAI API Integration Templates</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Battle-tested starters for copilots, agents, and automation hooks.
          </p>
        </BentoMotion>

        <BentoMotion
          index={2}
          className="min-h-[340px] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:min-h-[420px]"
        >
          <CategoryPill
            icon={<Sparkles size={13} className="text-pink-500" aria-hidden />}
            label="Visual"
          />
          <BlobAbstractCard />
          <p className="mt-3 text-center text-xs font-medium text-muted">
            Abstract 3D surfaces for product storytelling
          </p>
        </BentoMotion>

        <BentoMotion index={3} className="min-h-[180px] lg:col-start-2 lg:row-start-2">
          <CategoryPill
            icon={<ExportIcon size={13} className="text-sky-600" />}
            label="Delivery"
          />
          <p className="mt-4 font-display text-4xl font-bold tracking-tight text-zinc-950">
            2x
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-950">Faster Exports</h3>
          <p className="mt-1 text-sm text-muted">Optimized pipelines for rapid handoff.</p>
        </BentoMotion>

        <BentoMotion index={4} className="min-h-[180px] lg:col-start-1 lg:row-start-3">
          <CategoryPill
            icon={<SpeedIcon size={13} className="text-indigo-600" />}
            label="Velocity"
          />
          <p className="mt-4 font-display text-4xl font-bold tracking-tight text-zinc-950">
            4x
          </p>
          <h3 className="mt-1 text-base font-semibold text-zinc-950">Faster Implementation</h3>
          <p className="mt-1 text-sm text-muted">Accelerated build loops with reusable kits.</p>
        </BentoMotion>

        <BentoMotion
          index={5}
          className="min-h-[180px] sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3"
        >
          <CategoryPill
            icon={<Rocket size={13} className="text-emerald-600" aria-hidden />}
            label="Outcomes"
          />
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <p className="font-display text-5xl font-bold tracking-tight text-zinc-950">200+</p>
            <div>
              <h3 className="text-base font-semibold text-zinc-950">Projects Shipped</h3>
              <p className="mt-0.5 text-sm text-muted">
                Production-grade launches across domains.
              </p>
            </div>
            <ShipIcon size={40} className="ml-auto hidden text-zinc-300 sm:block" />
          </div>
        </BentoMotion>
      </div>
    </div>
  );
}
