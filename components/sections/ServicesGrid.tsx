"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Cloud, Paintbrush, LayoutTemplate } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { springPremium, springSoft } from "@/lib/motion";

const SERVICES = [
  {
    title: "Big Data analytics pipelines",
    body: "Ingest, transform, and surface petabyte-scale signals with resilient streaming and warehouse-ready pipelines.",
    Icon: BarChart3,
  },
  {
    title: "User-Centered Experience Architecture (UI/UX)",
    body: "Research-backed flows, wireframes, and interface systems engineered for clarity, conversion, and accessibility.",
    Icon: LayoutTemplate,
  },
  {
    title: "Brand Identity Motion Graphics",
    body: "Motion systems, brand films, and product storytelling that keep identity consistent across every touchpoint.",
    Icon: Paintbrush,
  },
  {
    title: "Secure Cloud Computing (AWS/Azure infrastructure scaling configurations)",
    body: "Hardened AWS/Azure topologies with autoscaling, observability, and secure-by-default infrastructure patterns.",
    Icon: Cloud,
  },
] as const;

export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <SectionReveal id="services-grid" density="standard" className="py-16 sm:py-20 lg:py-24">
      <div className="content-bounds">
        <SectionHeading
          eyebrow="Services"
          title="Capabilities That Scale With You"
          description="Big data, experience design, brand motion, and secure cloud — delivered as integrated engineering, not siloed handoffs."
        />

        <LayoutGroup id="services-grid">
          <div className="mt-10 grid gap-0 border-t border-zinc-900/[0.08] sm:grid-cols-2 sm:gap-x-10">
            {SERVICES.map((item, i) => (
              <motion.article
                key={item.title}
                layout
                layoutId={`service-${item.title}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ ...springPremium, delay: reduce ? 0 : i * 0.07 }}
                whileHover={reduce ? undefined : { x: 4, y: -1 }}
                data-cursor="hover"
                className="group flex gap-4 rounded-xl border-b border-zinc-900/[0.08] py-6 transition-[box-shadow,background-color] duration-300 hover:bg-white/25 hover:shadow-[var(--shadow-card-hover)] touch-manipulation sm:px-2"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-950 ring-1 ring-zinc-900/10 transition-[ring-color,transform] duration-300 group-hover:scale-105 group-hover:ring-[color:var(--accent-soft)]/35">
                  <item.Icon size={18} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </SectionReveal>
  );
}
