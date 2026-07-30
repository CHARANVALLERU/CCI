"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Video } from "lucide-react";
import { DeadLink } from "@/components/ui/DeadLink";
import { springSoft } from "@/lib/motion";

function FloatingCardsIllustration({ reduce }: { reduce: boolean | null }) {
  const cardBase =
    "absolute left-1/2 w-[78%] max-w-[200px] -translate-x-1/2 rounded-xl border border-white/90 bg-white/95 px-3 py-2.5 shadow-[0_10px_28px_rgba(12,18,34,0.12)]";

  const floatCard = (delay: number, duration = 3) =>
    reduce
      ? undefined
      : {
          y: [0, -6, 0],
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <div
      className="relative mx-auto h-[150px] w-full max-w-[260px] sm:h-[168px] xl:mx-0 xl:h-[172px] xl:max-w-[280px]"
      aria-hidden
    >
      <motion.div
        className={`${cardBase} top-[2px] z-[1] origin-center opacity-[0.68] scale-[0.86] -rotate-[4deg]`}
        animate={floatCard(0.5, 3.5)}
      >
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[var(--grad-lavender-soft)] to-[var(--grad-lavender)] ring-2 ring-white" />
          <span className="h-2 flex-1 rounded-full bg-zinc-200/80" />
        </div>
        <span className="mt-2 block h-1.5 w-[85%] rounded-full bg-zinc-100" />
      </motion.div>

      <motion.div
        className={`${cardBase} top-[18px] z-[2] origin-center opacity-[0.84] scale-[0.92] rotate-[2deg]`}
        animate={floatCard(0.2, 3.2)}
      >
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#c7c3fc] to-[#6366F1]/40 ring-2 ring-white" />
          <span className="h-2 flex-1 rounded-full bg-zinc-200/90" />
        </div>
        <span className="mt-2 block h-1.5 w-[70%] rounded-full bg-zinc-100" />
        <span className="mt-1.5 block h-1.5 w-[55%] rounded-full bg-zinc-100" />
      </motion.div>

      <motion.div
        className={`${cardBase} top-[40px] z-[3] origin-center rotate-[1deg]`}
        animate={floatCard(0, 2.8)}
      >
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#2a6f7a]/25 to-[#6366F1]/30 ring-2 ring-white" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <span className="block h-2 w-full rounded-full bg-zinc-200" />
            <span className="block h-1.5 w-[78%] rounded-full bg-zinc-100" />
          </div>
        </div>
        <div className="mt-2.5 flex gap-1">
          <span className="h-4 w-4 rounded-md bg-[#6366F1]/15" />
          <span className="h-4 w-4 rounded-md bg-[#2a6f7a]/20" />
          <span className="h-4 w-4 rounded-md bg-zinc-100" />
        </div>
      </motion.div>

      <motion.svg
        className="absolute bottom-[10px] right-[2%] z-[4] h-11 w-11 drop-shadow-[0_4px_12px_rgba(232,93,74,0.35)]"
        viewBox="0 0 36 36"
        fill="none"
        animate={reduce ? undefined : { y: [0, -4, 0], x: [0, 2, 0] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 6 L8 28 L14 22 L20 32 L24 30 L18 20 L28 20 Z"
          fill="#FF8566"
          stroke="#E85D4A"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="8" r="2.5" fill="white" opacity="0.85" />
      </motion.svg>

      <motion.div
        className="absolute right-[2%] top-[2px] z-[4] flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-white/80 bg-white/92 shadow-[0_8px_20px_rgba(99,102,241,0.18)]"
        animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        <span className="text-[8px] font-bold uppercase tracking-wide text-[#6366F1]/80">Jul</span>
        <CalendarDays size={17} className="-mt-0.5 text-[#6366F1]" strokeWidth={2.2} aria-hidden />
      </motion.div>

      <motion.div
        className="absolute bottom-[8px] left-[6%] z-[4] flex -space-x-2"
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        {["#6366F1", "#2a6f7a", "#8B5CF6"].map((c, i) => (
          <span
            key={c}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 70%, white))`,
              zIndex: 3 - i,
            }}
          >
            {["A", "C", "M"][i]}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="absolute left-[8%] top-[18px] z-[4] flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/90 shadow-md"
        animate={reduce ? undefined : { rotate: [0, -4, 0], y: [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
      >
        <Video size={16} className="text-[#6366F1]" strokeWidth={2.2} aria-hidden />
      </motion.div>
    </div>
  );
}

export function BookACall() {
  const reduce = useReducedMotion();

  return (
    <section
      className="section framer-146fwfe w-full min-w-0 xl:max-w-none"
      data-framer-name="Book a Call"
      aria-labelledby="book-a-call-heading"
    >
      <div
        className="relative overflow-hidden rounded-[1.65rem] p-5 shadow-[0_20px_48px_rgba(42,111,122,0.18),0_8px_24px_rgba(99,102,241,0.12)] sm:rounded-[1.85rem] sm:p-6 xl:p-7"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--accent-soft) 88%, #1a3a4a) 0%, #4f46e5 42%, color-mix(in srgb, var(--brand-purple) 90%, var(--grad-lavender)) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 50% 0%, transparent 42%, rgba(248,247,252,0.22) 100%), radial-gradient(ellipse 90% 60% at 100% 100%, rgba(248,247,252,0.18) 0%, transparent 55%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
        <div className="pointer-events-none absolute -inset-px rounded-[inherit] bg-gradient-to-b from-white/10 via-transparent to-[var(--grad-lavender-soft)]/15 opacity-60" />
        <div
          className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full blur-3xl cci-book-call-glow"
          style={{ background: "rgba(248,247,252,0.12)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 -right-6 h-36 w-36 rounded-full blur-3xl cci-book-call-glow"
          style={{ background: "rgba(99,102,241,0.15)" }}
        />

        <div className="relative z-[1] xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-center xl:gap-6">
          <FloatingCardsIllustration reduce={reduce} />

          <div className="xl:text-left">
            <h2
              id="book-a-call-heading"
              className="font-display mt-5 text-center text-xl font-bold tracking-tight text-white sm:mt-6 sm:text-2xl xl:mt-0 xl:text-left xl:text-[1.65rem]"
            >
              Ready? Let&apos;s Talk!
            </h2>
            <p className="mx-auto mt-2 max-w-[28ch] text-center text-[13px] leading-relaxed text-white/85 sm:text-sm xl:mx-0 xl:text-left">
              Get expert insights and answers tailored to your business requirements and
              transformation.
            </p>

            <div className="mt-5 flex flex-col items-center gap-3 sm:mt-6 xl:items-start">
              <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} transition={springSoft}>
                <DeadLink
                  href="/contact"
                  data-cursor="hover"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1a3a4a] shadow-[0_6px_20px_rgba(12,18,34,0.15)] ring-1 ring-white/80 transition-[box-shadow] hover:shadow-[0_8px_28px_rgba(12,18,34,0.2)]"
                >
                  Book a Call
                </DeadLink>
              </motion.div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/95 backdrop-blur-sm sm:text-xs">
                <span aria-hidden>🚀</span>
                2 spots available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
