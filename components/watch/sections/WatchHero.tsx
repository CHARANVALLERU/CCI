"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Hero — brand reveal over the assembled engine (reference: Intro). */
export function WatchHero() {
  const reduce = useReducedMotion();
  const rise = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 64 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
  };

  return (
    <section
      id="watch-hero"
      data-section="Hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        {...rise}
        transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 font-mono text-xs tracking-[0.35em] uppercase"
        style={{ color: "var(--w-accent)" }}
      >
        Crawl Corp India — Immersive
      </motion.p>
      <motion.h1
        {...rise}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display max-w-5xl text-5xl leading-[1.02] font-black tracking-tight sm:text-6xl lg:text-8xl"
        style={{ color: "var(--w-text)" }}
      >
        Transforming Ideas Into Digital Reality
      </motion.h1>
      <motion.p
        {...rise}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--w-muted)" }}
      >
        We engineer AI automation, secure cloud infrastructure, and data pipelines
        that scale — from first commit to global deployment.
      </motion.p>
      <motion.div
        {...rise}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#watch-services"
          className="rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: "var(--w-accent)", color: "#ffffff" }}
        >
          Start Your Project
        </a>
        <a
          href="#watch-capabilities"
          className="rounded-full border px-7 py-3 text-sm font-semibold tracking-wide transition-colors"
          style={{ borderColor: "var(--w-border)", color: "var(--w-text)" }}
        >
          Explore Capabilities
        </a>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.35, 1] }}
        transition={{ delay: 1.4, duration: 2.4, repeat: Infinity }}
        className="absolute bottom-10 font-mono text-[0.65rem] tracking-[0.3em] uppercase"
        style={{ color: "var(--w-muted)" }}
      >
        Scroll
      </motion.p>
    </section>
  );
}
