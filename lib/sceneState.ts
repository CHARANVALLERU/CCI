/**
 * Mutable bridge between the /watch DOM overlay and the WebGL story loop.
 * Written from React scroll handlers, read inside useFrame —
 * never triggers re-renders (same pattern as lib/watchState).
 */
export const sceneState = {
  /** Root scroll progress 0→1 across the whole /watch page. */
  scroll: 0,
  /** True when the user prefers reduced motion (intro jumps to its end). */
  reduced: false,
};

/**
 * Scroll chapters for the background 3D story (fractions of sceneState.scroll).
 * earth: intro holds + dive toward a location
 * city → london → rack: successive model morphs through the rest of the page
 */
export const CHAPTERS = {
  earth: { start: 0, end: 0.22 },
  city: { start: 0.18, end: 0.48 },
  london: { start: 0.44, end: 0.74 },
  rack: { start: 0.7, end: 1 },
} as const;

export type ChapterId = keyof typeof CHAPTERS;

/** Background plate URLs keyed by chapter (served from /public/images). */
export const CHAPTER_PLATES: Record<ChapterId, string> = {
  earth: "/images/pexels-kaip-1341279.jpg",
  city: "/images/city-in-night.png",
  london: "/images/office-inside.png",
  rack: "/images/servers.png",
};

/**
 * Weight of a chapter at scroll `t`: 0 outside its span, 1 through its core,
 * easing through a shared crossfade band with neighbours.
 * First/last chapters hold their outer edges (no fade at page bounds).
 */
export function chapterWeight(
  t: number,
  chapter: { start: number; end: number },
  fade = 0.045,
): number {
  if (t < chapter.start || t > chapter.end) return 0;
  const into = t - chapter.start;
  const left = chapter.end - t;
  // First chapter: no fade-in at the page start. Last chapter: no fade-out at the end.
  const fadeIn = chapter.start <= 0 ? 1 : Math.min(1, into / fade);
  const fadeOut = chapter.end >= 1 ? 1 : Math.min(1, left / fade);
  return Math.min(1, fadeIn, fadeOut);
}

/** 0→1 progress inside a chapter's own span (for per-chapter zoom/rotation). */
export function chapterProgress(
  t: number,
  chapter: { start: number; end: number },
): number {
  if (t <= chapter.start) return 0;
  if (t >= chapter.end) return 1;
  return (t - chapter.start) / (chapter.end - chapter.start);
}

/** Soft plate opacity — slightly wider fade than the 3D crossfade. */
export function plateWeight(t: number, id: ChapterId): number {
  const chapter = CHAPTERS[id];
  if (id === "earth" && t <= 0.002) return 1;
  return chapterWeight(t, chapter, 0.06);
}
