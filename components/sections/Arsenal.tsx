"use client";

import { motion } from "framer-motion";
import { IntegrationBentos } from "@/components/sections/IntegrationBentos";
import { IntegrationLogos } from "@/components/sections/IntegrationLogos";
import { DeadLink } from "@/components/ui/DeadLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { springSoft } from "@/lib/motion";

export function Arsenal() {
  return (
    <SectionReveal id="integration" className="section-shell">
      <div className="content-bounds flex flex-col items-stretch">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <SectionHeading
            eyebrow="Our Arsenal"
            title="Tools We Use to Build Better"
            description="We select battle-tested technologies that best match your project's needs — from prototype to enterprise scale."
          />
          <motion.div whileHover={{ scale: 1.03 }} transition={springSoft} className="self-start sm:pb-1">
            <DeadLink
              href="/tech-stack"
              className="inline-flex shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-zinc-950 ring-1 ring-zinc-900/10 touch-manipulation transition-[ring-color] hover:ring-[color:var(--accent-soft)]/40"
            >
              Know More
            </DeadLink>
          </motion.div>
        </div>

        <IntegrationLogos />
        <IntegrationBentos />
      </div>
    </SectionReveal>
  );
}
