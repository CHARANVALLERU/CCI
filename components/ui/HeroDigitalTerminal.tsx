"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const CODE_LINES = [
  "await agent.deploy()",
  "const stack = ['Next','AI']",
  "pipeline.run({ prod: true })",
  "→ shipping digital products",
] as const;

const CHAR_MS = 42;
const LINE_PAUSE_MS = 720;
const RESET_PAUSE_MS = 1400;

const IDLE_PROMPT = (
  <span className="block truncate">
    <span className="text-[#818cf8]">&gt; </span>
    <span
      className="ml-px inline-block h-[0.9em] w-[0.45em] animate-pulse bg-[#a5f3fc]/90 align-[-0.05em]"
      aria-hidden
    />
  </span>
);

/**
 * "Digital" letterforms with a terminal snippet clipped inside the glyphs.
 * Terminal is absolute inside the word box (fixed to letters, not page scroll).
 * Glyph clip via mix-blend-mode: destination-in on an opaque text overlay.
 */
export function HeroDigitalTerminal() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduce) return;

    const line = CODE_LINES[lineIndex] ?? "";
    if (holding) {
      const holdMs =
        lineIndex === CODE_LINES.length - 1 ? RESET_PAUSE_MS : LINE_PAUSE_MS;
      const t = window.setTimeout(() => {
        setHolding(false);
        if (lineIndex === CODE_LINES.length - 1) {
          setLineIndex(0);
          setCharIndex(0);
        } else {
          setLineIndex((i) => i + 1);
          setCharIndex(0);
        }
      }, holdMs);
      return () => window.clearTimeout(t);
    }

    if (charIndex < line.length) {
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => setHolding(true), LINE_PAUSE_MS);
    return () => window.clearTimeout(t);
  }, [mounted, reduce, lineIndex, charIndex, holding]);

  const activeLine = CODE_LINES[lineIndex] ?? "";
  const activeText = activeLine.slice(0, charIndex);
  const showTyping = mounted && !reduce;

  return (
    <span
      className="cci-digital-fill relative mx-[0.02em] inline-grid align-baseline leading-none [isolation:isolate]"
      aria-label="Digital"
    >
      {/* Sizing ghost — matches display font metrics of surrounding H1 */}
      <span
        className="invisible col-start-1 row-start-1 select-none font-[inherit] font-extrabold tracking-[inherit]"
        aria-hidden
      >
        Digital
      </span>

      {/* Terminal panel locked to word box */}
      <span
        className="pointer-events-none absolute inset-0 col-start-1 row-start-1 overflow-hidden"
        aria-hidden
      >
        <span className="absolute inset-0 flex flex-col justify-end bg-[#0c1222] px-[0.1em] pb-[0.06em] pt-[0.12em]">
          <span className="mb-[0.05em] flex shrink-0 items-center gap-[0.16em]">
            <span className="h-[0.12em] w-[0.12em] rounded-full bg-[#f87171]/95" />
            <span className="h-[0.12em] w-[0.12em] rounded-full bg-[#fbbf24]/95" />
            <span className="h-[0.12em] w-[0.12em] rounded-full bg-[#34d399]/95" />
          </span>
          <span className="font-mono text-[0.2em] font-medium leading-[1.35] tracking-tight text-[#a5f3fc] sm:text-[0.18em]">
            {reduce ? (
              <span className="block truncate text-white/95">
                <span className="text-[#818cf8]">&gt; </span>
                digital
              </span>
            ) : showTyping ? (
              <>
                {CODE_LINES.slice(0, lineIndex).map((line, i) => (
                  <span
                    key={`${line}-${i}`}
                    className="block truncate text-[#86efac]/90"
                  >
                    <span className="text-[#818cf8]">&gt; </span>
                    {line}
                  </span>
                ))}
                <span className="block truncate">
                  <span className="text-[#818cf8]">&gt; </span>
                  {activeText}
                  <span
                    className="ml-px inline-block h-[0.9em] w-[0.45em] animate-pulse bg-[#a5f3fc]/90 align-[-0.05em]"
                    aria-hidden
                  />
                </span>
              </>
            ) : (
              IDLE_PROMPT
            )}
          </span>
        </span>
      </span>

      {/* Opaque glyphs punch terminal through letter shapes only */}
      <span
        className="pointer-events-none relative col-start-1 row-start-1 select-none font-[inherit] font-extrabold tracking-[inherit] text-black mix-blend-destination-in"
        aria-hidden
      >
        Digital
      </span>
    </span>
  );
}
