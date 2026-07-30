"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 48;
/** mouse-animations Invert smoothness: higher = more lag. Lerp factor = 1 - smoothness. */
const SMOOTHNESS = 0.85;
const LERP = 1 - SMOOTHNESS;
/** Light CCI canvas → black disc for full inversion via mix-blend-mode: difference */
const COLOR = "#000000";

/**
 * Invert-style cursor (mouse-animations Invert equivalent).
 * Opaque circle + mix-blend-mode: difference. Desktop / fine pointer only.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const discRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      const ok = fineMq.matches && !reduceMq.matches;
      setEnabled(ok);
      document.documentElement.classList.toggle("cci-cursor", ok);
      if (!ok) setVisible(false);
    };
    apply();

    fineMq.addEventListener("change", apply);
    reduceMq.addEventListener("change", apply);

    return () => {
      fineMq.removeEventListener("change", apply);
      reduceMq.removeEventListener("change", apply);
      document.documentElement.classList.remove("cci-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * LERP;
      c.y += (t.y - c.y) * LERP;

      const el = discRef.current;
      if (el) {
        el.style.transform = `translate3d(${c.x - SIZE / 2}px, ${c.y - SIZE / 2}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 160ms ease" }}
    >
      <div
        ref={discRef}
        className="absolute top-0 left-0 rounded-full will-change-transform"
        style={{
          width: SIZE,
          height: SIZE,
          backgroundColor: COLOR,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
