"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { DeadLink } from "@/components/ui/DeadLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { springSoft } from "@/lib/motion";

const FAQS = [
  {
    q: "What services does Crawl Corp India specialize in?",
    a: "We offer end-to-end digital solutions across 10+ domains: mobile app development, web development, AI & machine learning, cybersecurity, cryptography, blockchain, DevOps, big data, UI/UX design, and graphic design. Whether you need a single service or a fully integrated solution, our cross-functional teams deliver from concept to production.",
  },
  {
    q: "Do you work with startups or only enterprise clients?",
    a: "Both. We've shipped MVPs for early-stage startups in under 8 weeks and built enterprise-scale platforms for Fortune 500 companies. Our engagement models are flexible — we adapt our team size, communication cadence, and delivery approach to fit your stage and budget.",
  },
  {
    q: "Where is your team based and do you work remotely?",
    a: "Crawl Corp India is headquartered in India with distributed teams across Asia, Europe, and North America. We're a fully remote-capable organization and routinely work with clients across all time zones, with overlap hours structured to match your location.",
  },
  {
    q: "What does your typical project engagement look like?",
    a: "Every project follows four phases: Discovery (requirements, architecture, prototyping), Build (iterative sprints with weekly demos), QA & Hardening (testing, security audits, performance tuning), and Launch & Support (deployment, monitoring, handoff documentation). You're involved at every stage — no black boxes.",
  },
  {
    q: "How long does it take to start a project?",
    a: "After our initial discovery call, we can typically onboard a dedicated team within 5–7 business days. For urgent projects, we offer expedited onboarding. The discovery call itself is free and usually takes 30–60 minutes.",
  },
  {
    q: "Do you sign NDAs before discussing project details?",
    a: "Absolutely. We sign a mutual NDA before any detailed technical discussion. Your ideas, IP, and business logic are protected from the first conversation. We also conduct thorough background checks on all engineers assigned to client projects.",
  },
  {
    q: "How is your pricing structured?",
    a: "We offer three models: Fixed-price (ideal for well-defined scopes), Time & Materials (best for evolving requirements), and Dedicated Team (a fully embedded team billed monthly). All models include a transparent cost breakdown — no hidden fees or surprise invoices.",
  },
  {
    q: "What is the minimum project budget you accept?",
    a: "Our project minimum is $10,000 USD for fixed-scope engagements. Dedicated team engagements start at $8,000/month. We also offer lightweight consulting packages starting at $2,500 for architecture reviews, security audits, or technical due diligence.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionReveal id="faq" className="section-shell">
      <div className="content-bounds">
        <SectionHeading
          eyebrow="FAQ"
          title="Got Questions?"
          description="Everything you need to know before kicking off your project. Can't find your answer? Just ask us."
        />

        <div className="mt-10 divide-y divide-zinc-900/[0.08] border-y border-zinc-900/[0.08]">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: i * 0.03 }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left touch-manipulation sm:py-5"
                >
                  <span className="text-sm font-semibold text-zinc-950 sm:text-base">{item.q}</span>
                  <motion.span
                    layout
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={springSoft}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-950 ring-1 ring-zinc-900/10"
                  >
                    <ChevronDown size={16} aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springSoft}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-12 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-950">Still have questions?</p>
          <motion.div whileHover={{ scale: 1.03 }} transition={springSoft}>
            <DeadLink
              href="/contact"
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg ring-1 ring-[color:var(--accent)] hover:ring-[color:var(--accent-soft)]"
            >
              Get Assistance
            </DeadLink>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
