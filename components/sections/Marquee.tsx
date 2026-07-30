"use client";

import type { ComponentType } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { PARTNER_BRANDS } from "@/components/icons/PartnerLogos";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { STORY_BRIDGES } from "@/lib/storyArc";
import { springSoft } from "@/lib/motion";

function PartnerChip({
  name,
  Logo,
  layoutId,
  reduce,
}: {
  name: string;
  Logo: ComponentType<{ size?: number; className?: string }>;
  layoutId?: string;
  reduce: boolean | null;
}) {
  return (
    <motion.span
      layout
      layoutId={layoutId}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      transition={springSoft}
      data-cursor="hover"
      className="mx-4 inline-flex shrink-0 items-center gap-3 rounded-full border border-zinc-900/[0.06] bg-white/55 py-2 pl-2.5 pr-5 text-sm font-semibold tracking-wide text-zinc-950/80 shadow-sm backdrop-blur-sm sm:mx-6 sm:gap-3.5 sm:py-2.5 sm:pr-6 sm:text-base"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950/[0.04] text-zinc-800 sm:h-10 sm:w-10">
        <Logo size={22} className="sm:h-6 sm:w-6" />
      </span>
      {name}
    </motion.span>
  );
}

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <SectionReveal
      id="story-discover"
      density="tight"
      cinematic
      bridge={STORY_BRIDGES["story-discover"]}
      className="section-rule border-b border-zinc-900/[0.08]"
      aria-label="Partner brands"
    >
      <p className="content-bounds mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="font-mono text-zinc-400">01</span>
        <span className="mx-2 text-[#6366F1]/90">Discover</span>
        · Growing partnership around the world
      </p>
      <div className="relative overflow-hidden touch-pan-y">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[color:var(--background)] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[color:var(--background)] to-transparent sm:w-16" />
        <LayoutGroup id="partner-ticker">
          <div className="flex w-max transform-gpu will-change-transform animate-marquee">
            {row.map((partner, i) => (
              <PartnerChip
                key={`${partner.name}-${i}`}
                name={partner.name}
                Logo={partner.Logo}
                layoutId={i < PARTNER_BRANDS.length ? `ticker-${partner.name}` : undefined}
                reduce={reduce}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </SectionReveal>
  );
}
