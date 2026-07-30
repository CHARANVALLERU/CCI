"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { STORY_CHAPTERS } from "@/lib/storyArc";
import { springSnappy } from "@/lib/motion";

/**
 * Desktop-only scroll chapter rail — dots + labels tied to story sections.
 * Hidden from assistive tech (decorative navigation; in-page headings carry structure).
 */
export function ScrollChapterRail() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(STORY_CHAPTERS[0]?.id ?? "top");

  useEffect(() => {
    const ids = STORY_CHAPTERS.map((c) => c.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top) setActiveId(top);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-hidden
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:right-6"
    >
      <ol className="flex flex-col items-end gap-3">
        {STORY_CHAPTERS.map((chapter) => {
          const active = activeId === chapter.id;
          return (
            <li key={chapter.id} className="pointer-events-auto">
              <a
                href={chapter.href}
                data-cursor="hover"
                className="group flex items-center gap-2.5 rounded-full py-0.5 pl-2 pr-1 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--accent-soft)]"
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active ? "text-zinc-800" : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
                >
                  {chapter.chapter} · {chapter.label}
                </span>
                <motion.span
                  layout={!reduce}
                  transition={springSnappy}
                  className={`relative block h-2 w-2 rounded-full ring-1 transition-colors duration-300 ${
                    active
                      ? "bg-[#6366F1] ring-[#6366F1]/40"
                      : "bg-zinc-300/80 ring-zinc-400/30 group-hover:bg-zinc-400"
                  }`}
                >
                  {active && !reduce ? (
                    <motion.span
                      layoutId="chapter-rail-active"
                      className="absolute inset-[-3px] rounded-full bg-[#6366F1]/20"
                      transition={springSnappy}
                    />
                  ) : null}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
