"use client";

import { WatchSection, WatchHeading } from "@/components/watch/WatchShared";

/** Mission — the calm closing chapter (reference: Timeless). */
export function WatchMission() {
  return (
    <WatchSection id="watch-mission" parallaxWord="Why">
      <WatchHeading eyebrow="08 — Mission" title="Why CCI Exists" />
      <p className="max-w-3xl text-xl leading-relaxed sm:text-2xl" style={{ color: "var(--w-text)" }}>
        We believe technology should amplify human potential, not replace it.
        Every line of code we write serves a purpose: to make businesses faster,
        safer, and more intelligent.{" "}
        <span style={{ color: "var(--w-muted)" }}>Founded in India, built for the world.</span>
      </p>
    </WatchSection>
  );
}
