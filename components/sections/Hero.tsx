"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";
import { useRef } from "react";
import { DeadLink } from "@/components/ui/DeadLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { BookACall } from "@/components/sections/BookACall";
import { HeroDeviceVisual } from "@/components/ui/HeroDeviceVisual";
import { HeroDigitalTerminal } from "@/components/ui/HeroDigitalTerminal";
import { springPremium, springSnappy, springSoft } from "@/lib/motion";
import { useHeadingGradientLatch } from "@/lib/useHeadingGradientLatch";

function HeroWord({
  children,
  delay,
  reduce,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.span
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springPremium, delay: reduce ? 0 : delay }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { latchedClass, latchGradient } = useHeadingGradientLatch();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 88]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.28]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);

  const gradientTitleCls = `cci-heading-gradient ${latchedClass}`.trim();

  return (
    <section
      ref={ref}
      id="top"
      data-story-chapter="00"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:pb-28"
    >
      <motion.div
        className="content-bounds lg:grid lg:grid-cols-[minmax(0,50fr)_minmax(0,50fr)] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] xl:gap-10"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={springSoft}
            className="mb-8 inline-flex max-w-full items-stretch overflow-hidden rounded-full border border-white/70 bg-white/45 p-1 shadow-[0_8px_32px_rgba(99,102,241,0.08)] backdrop-blur-md sm:mb-10"
          >
            <span className="flex items-center px-3 py-1.5 text-[11px] font-semibold tracking-wide text-zinc-700 sm:px-4 sm:text-xs">
              Making
            </span>
            <span className="flex items-center justify-center border-x border-white/60 px-2 sm:px-2.5">
              <motion.span
                initial={reduce ? undefined : { rotate: -24, scale: 0.6 }}
                animate={{ rotate: 12, scale: 1 }}
                transition={{ ...springSnappy, delay: reduce ? 0 : 0.12 }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white shadow-sm"
              >
                <Rocket size={14} aria-hidden />
              </motion.span>
            </span>
            <span className="flex items-center px-3 py-1.5 text-[11px] font-semibold tracking-wide text-zinc-700 sm:px-4 sm:text-xs">
              Imagination to Innovation
            </span>
          </motion.div>

          <div className="group/hero-heading w-full" onMouseEnter={latchGradient}>
            <h1
              data-cursor="hero-title"
              className="font-display mx-auto max-w-[16ch] text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.032em] sm:max-w-3xl sm:text-[3.25rem] sm:leading-[1.05] sm:tracking-[-0.038em] lg:mx-0 lg:max-w-[14ch] lg:text-[3.45rem] xl:max-w-4xl xl:text-7xl xl:leading-[1.04] xl:tracking-[-0.042em]"
            >
              <span className={`block text-balance ${gradientTitleCls}`}>
                <HeroWord delay={0.06} reduce={reduce} className="mr-[0.2em]">
                  Transforming
                </HeroWord>
                <HeroWord delay={0.12} reduce={reduce}>
                  Ideas
                </HeroWord>
              </span>
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPremium, delay: reduce ? 0 : 0.2 }}
                className={`mt-2 block text-balance sm:mt-2.5 ${gradientTitleCls}`}
              >
                <HeroWord delay={0.18} reduce={reduce} className="mr-[0.22em]">
                  Into
                </HeroWord>
              </motion.span>
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPremium, delay: reduce ? 0 : 0.28 }}
                className="mt-2 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 sm:mt-3 lg:justify-start"
              >
                <HeroWord delay={0.32} reduce={reduce} className="inline-flex items-center">
                  <HeroDigitalTerminal />
                </HeroWord>
                <HeroWord delay={0.38} reduce={reduce} className={gradientTitleCls}>
                  Reality
                </HeroWord>
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPremium, delay: reduce ? 0 : 0.46 }}
            className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-8 sm:max-w-2xl sm:text-lg lg:mx-0"
          >
            We build powerful digital solutions — from cutting-edge mobile apps to AI-driven
            automation and enterprise-grade security — that propel businesses into the future.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPremium, delay: reduce ? 0 : 0.56 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-4 lg:justify-start"
          >
            <Magnetic strength={18}>
              <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} transition={springSoft}>
                <DeadLink
                  href="/contact"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(99,102,241,0.35)] ring-1 ring-white/20"
                >
                  Start Your Project
                </DeadLink>
              </motion.div>
            </Magnetic>
            <Magnetic strength={14}>
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPremium, delay: reduce ? 0 : 0.62 }}
                whileHover={reduce ? undefined : { scale: 1.03 }}
              >
                <a
                  href="#services-grid"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-900/12 bg-white/55 px-7 py-3.5 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-md transition-colors hover:border-[#6366F1]/25 hover:bg-white/70"
                >
                  Explore Services
                </a>
              </motion.div>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springSoft, delay: reduce ? 0 : 0.28 }}
          className="mt-14 w-full min-w-0 lg:mt-0 lg:grid lg:grid-cols-1 lg:items-center lg:gap-8 xl:mt-0 xl:grid xl:w-full xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:items-stretch xl:justify-between xl:gap-8 2xl:gap-12"
        >
          <div className="w-full min-w-0 xl:flex xl:items-center xl:justify-center">
            <HeroDeviceVisual />
          </div>
          <div className="mt-8 w-full min-w-0 xl:mt-0 xl:flex xl:items-center xl:justify-end">
            <BookACall />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
