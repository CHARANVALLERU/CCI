"use client";

import type { ComponentType } from "react";
import {
  DockerIcon,
  EthereumIcon,
  FramerIcon,
  GoIcon,
  NextJsIcon,
  NodeJsIcon,
  PostgresIcon,
  PythonIcon,
  RustIcon,
  TailwindIcon,
  TypeScriptIcon,
  VueIcon,
} from "@/components/icons/TechIcons";

type LogoItem = {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

const ROW_ONE: LogoItem[] = [
  { name: "Vue", Icon: VueIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "Next.js", Icon: NextJsIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Node.js", Icon: NodeJsIcon },
  { name: "Python", Icon: PythonIcon },
];

const ROW_TWO: LogoItem[] = [
  { name: "PostgreSQL", Icon: PostgresIcon },
  { name: "Ethereum", Icon: EthereumIcon },
  { name: "Docker", Icon: DockerIcon },
  { name: "Framer", Icon: FramerIcon },
  { name: "Go", Icon: GoIcon },
  { name: "Rust", Icon: RustIcon },
];

const SECTION_BG = "#f0f4f8";

function LogoTile({ name, Icon }: LogoItem) {
  return (
    <div
      className="mx-2.5 inline-flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/[0.06] sm:mx-3.5 sm:h-[4.75rem] sm:w-[4.75rem] sm:rounded-2xl"
      title={name}
    >
      <Icon size={28} className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">{name}</span>
    </div>
  );
}

function LogoMarqueeRow({
  items,
  reverse = false,
}: {
  items: LogoItem[];
  reverse?: boolean;
}) {
  const renderStrip = (keyPrefix: string) =>
    items.map((item) => (
      <LogoTile key={`${keyPrefix}-${item.name}`} {...item} />
    ));

  const strips = ["a", "b", "a2", "b2"] as const;

  return (
    <div className="relative overflow-hidden py-2 touch-pan-y">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20"
        style={{ backgroundImage: `linear-gradient(to right, ${SECTION_BG}, transparent)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20"
        style={{ backgroundImage: `linear-gradient(to left, ${SECTION_BG}, transparent)` }}
        aria-hidden
      />
      <div
        className={`flex w-max transform-gpu will-change-transform ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {strips.map((prefix) => (
          <div key={prefix} className="flex shrink-0" aria-hidden={prefix !== "a"}>
            {renderStrip(prefix)}
          </div>
        ))}
      </div>
    </div>
  );
}

/** @alias used by legacy imports */
export { IntegrationLogos as IntegrationLogoMarquees };

/** Dual-row tech logo ticker — matches crawlcorpindia.com `#integration` marquees */
export function IntegrationLogos() {
  return (
    <div
      className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 border-y border-zinc-900/[0.06] py-8 sm:mt-12 sm:py-10"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="Tools and platforms"
    >
      <p className="content-bounds mb-6 text-center text-sm text-muted sm:mb-8">
        Your favorite platforms are ready to be connected.
      </p>
      <div className="space-y-3 sm:space-y-4">
        <LogoMarqueeRow items={ROW_ONE} />
        <LogoMarqueeRow items={ROW_TWO} reverse />
      </div>
    </div>
  );
}
