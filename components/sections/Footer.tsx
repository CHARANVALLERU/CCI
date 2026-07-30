"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { DeadLink } from "@/components/ui/DeadLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { LogoMark } from "@/components/icons/TechIcons";
import { springSoft } from "@/lib/motion";

const FOOTER_LINKS = [
  { label: "Home", href: "#top", real: true },
  { label: "Services", href: "/services", real: false },
  { label: "Projects", href: "/projects", real: false },
  { label: "Tech Stack", href: "/tech-stack", real: false },
  { label: "About Us", href: "/about-us", real: false },
  { label: "Contact", href: "/contact", real: false },
  { label: "FAQ", href: "#faq", real: true },
  { label: "Client Insights", href: "#client-insights", real: true },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={springSoft}
      className="relative z-0 px-4 pb-10 pt-6 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <motion.div
          layout
          whileHover={{ scale: 1.01 }}
          transition={springSoft}
          className="grid overflow-hidden rounded-2xl bg-white/50 ring-1 ring-zinc-900/10 backdrop-blur-md lg:grid-cols-2"
        >
          <div className="border-b border-zinc-900/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Ready? Let&apos;s Talk!
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              Get expert insights and answers tailored to your business requirements and
              transformation.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 p-7 sm:p-10">
            <Magnetic strength={12} className="w-fit">
              <motion.div whileHover={{ scale: 1.03 }} transition={springSoft} className="w-fit">
                <DeadLink
                  href="/contact"
                  data-cursor="hover"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg ring-1 ring-[color:var(--accent)] hover:ring-[color:var(--accent-soft)]"
                >
                  <CalendarDays size={16} aria-hidden />
                  Book a Call
                </DeadLink>
              </motion.div>
            </Magnetic>
            <p className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-soft)]" aria-hidden />
              2 spots available
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 border-t border-zinc-900/[0.08] pt-8 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5 text-zinc-950">
              <LogoMark size={28} />
              <span className="text-sm font-semibold">Crawl Corp India</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Transforming ideas into digital reality with end-to-end product engineering, AI
              automation, and enterprise-grade security.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-1 sm:justify-self-end">
            {FOOTER_LINKS.map((link) =>
              link.real ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:text-zinc-950"
                >
                  {link.label}
                </a>
              ) : (
                <DeadLink
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:text-zinc-950"
                >
                  {link.label}
                </DeadLink>
              ),
            )}
          </nav>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Crawl Corp India. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
