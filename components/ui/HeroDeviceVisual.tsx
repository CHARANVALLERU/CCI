"use client";

import dynamic from "next/dynamic";
import { HeroDeviceMockup } from "@/components/ui/HeroDeviceMockup";

const HeroScene3DDynamic = dynamic(
  () => import("@/components/ui/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false },
);

type HeroDeviceVisualProps = {
  /** When true and R3F is installed, show the legacy 3D scene instead of the CSS mockup. */
  preferR3F?: boolean;
};

/**
 * Default: lavender glass device mockup (CSS + Framer Motion).
 * Set preferR3F to use the dynamically loaded Three.js scene (no static R3F in Hero).
 */
export function HeroDeviceVisual({ preferR3F = false }: HeroDeviceVisualProps) {
  if (preferR3F) {
    return (
      <div className="relative w-full">
        <HeroScene3DDynamic />
      </div>
    );
  }

  return <HeroDeviceMockup />;
}
