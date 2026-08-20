"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Projects" },
  { href: "/watch", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

/** CTA + footer — split-word reveal (reference: Footer). */
export function WatchFooter() {
  const reduce = useReducedMotion();
  const words = "Ready to Build?".split(" ");

  return (
    <footer
      id="watch-footer"
      data-section="Footer"
      className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-6 font-mono text-xs tracking-[0.35em] uppercase"
        style={{ color: "var(--w-accent)" }}
      >
        Let’s discuss your next project
      </motion.p>
      <h2 className="font-display flex flex-wrap justify-center text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, rotate: 4 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 70, damping: 18 }}
            className="mx-3"
            style={{ color: "var(--w-text)" }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/#contact"
          className="rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: "var(--w-accent)", color: "#ffffff" }}
        >
          Book a Call
        </Link>
        <Link
          href="/"
          className="rounded-full border px-8 py-3.5 text-sm font-semibold tracking-wide"
          style={{ borderColor: "var(--w-border)", color: "var(--w-text)" }}
        >
          Back to Home
        </Link>
      </motion.div>
      <nav className="mt-24 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-[0.65rem] tracking-[0.25em] uppercase transition-opacity hover:opacity-60"
            style={{ color: "var(--w-muted)" }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="mt-10 font-mono text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: "var(--w-muted)" }}>
        © {new Date().getFullYear()} Crawl Corp India
      </p>
    </footer>
  );
}
