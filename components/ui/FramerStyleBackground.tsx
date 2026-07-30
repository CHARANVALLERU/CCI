"use client";

/**
 * Recreates Framer marketplace patterns (Soft Background / Ambient Background):
 * merged goo blobs, radial vignette, glass wash — no Framer CDN assets.
 */
export function FramerStyleVignette() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 68% at 50% 40%, transparent 32%, var(--background) 88%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 82% 12%, var(--grad-vignette-lavender) 0%, transparent 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-85"
        style={{
          background:
            "radial-gradient(ellipse 50% 42% at 12% 78%, var(--grad-vignette-sky) 0%, transparent 58%)",
        }}
      />
    </>
  );
}

type FramerStyleGooBlobsProps = {
  animate: boolean;
};

export function FramerStyleGooBlobs({ animate }: FramerStyleGooBlobsProps) {
  return (
    <div
      className="pointer-events-none absolute inset-[-18%] overflow-hidden opacity-[0.72] mix-blend-normal cci-mesh-layer"
      aria-hidden
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="cci-framer-goo" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className="relative h-full w-full"
        style={{ filter: "url(#cci-framer-goo)" }}
      >
        <div
          className={`absolute left-[8%] top-[12%] h-[42vmax] w-[42vmax] rounded-full bg-[var(--grad-lavender)] ${
            animate ? "cci-blob-drift-a" : ""
          }`}
        />
        <div
          className={`absolute right-[6%] top-[18%] h-[38vmax] w-[38vmax] rounded-full bg-[var(--grad-sky)] ${
            animate ? "cci-blob-drift-b" : ""
          }`}
          style={{ animationDelay: animate ? "-6s" : undefined }}
        />
        <div
          className={`absolute left-[38%] top-[48%] h-[34vmax] w-[34vmax] rounded-full bg-[var(--grad-lavender-soft)] ${
            animate ? "cci-blob-drift-c" : ""
          }`}
          style={{ animationDelay: animate ? "-11s" : undefined }}
        />
        <div
          className={`absolute bottom-[8%] right-[28%] h-[30vmax] w-[30vmax] rounded-full bg-[var(--grad-sky-deep)] ${
            animate ? "cci-blob-drift-a" : ""
          }`}
          style={{ animationDelay: animate ? "-16s" : undefined }}
        />
      </div>

      {/* Glass tint — Ambient Background “material” overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(246,247,249,0.08)_45%,transparent_100%)] backdrop-blur-[1px]" />
    </div>
  );
}
