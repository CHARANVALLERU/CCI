/**
 * Mutable bridge between the DOM overlay and the WebGL loop.
 * Written from React event/scroll handlers, read inside useFrame —
 * never triggers re-renders.
 */
export type RingId = "ai" | "security" | "cloud" | "data";

export const watchState = {
  /** Root scroll progress 0→1 across the whole experience. */
  scroll: 0,
  /** Exploded-view amount 0→1 (peaks through the middle chapters). */
  explode: 0,
  /** Currently highlighted orbital module, or null. */
  highlight: null as RingId | null,
  /** Target accent color (hex) from the active theme. */
  accent: "#6366F1",
  /** Accent intensity multiplier — eased up by sections that want glow. */
  accentBoost: 0,
};

export function setHighlight(ring: RingId | null) {
  watchState.highlight = ring;
}

export function setAccentBoost(v: number) {
  watchState.accentBoost = v;
}
