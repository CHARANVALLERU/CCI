"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { WatchLoader } from "@/components/watch/WatchLoader";
import { WatchCursor } from "@/components/watch/WatchCursor";
import { WatchHero } from "@/components/watch/sections/WatchHero";
import { WatchServices } from "@/components/watch/sections/WatchServices";
import { WatchCapabilities } from "@/components/watch/sections/WatchCapabilities";
import { WatchCaseStudies } from "@/components/watch/sections/WatchCaseStudies";
import { WatchMetrics } from "@/components/watch/sections/WatchMetrics";
import { WatchProcess } from "@/components/watch/sections/WatchProcess";
import { WatchTechStack } from "@/components/watch/sections/WatchTechStack";
import { WatchTestimonials } from "@/components/watch/sections/WatchTestimonials";
import { WatchMission } from "@/components/watch/sections/WatchMission";
import { WatchFooter } from "@/components/watch/sections/WatchFooter";
import { watchState } from "@/lib/watchState";
import { sceneState } from "@/lib/sceneState";
import { watchThemes, type WatchThemeId } from "@/lib/watchThemes";

/** Heavy WebGL layer — client-only, never blocks first paint. */
const StoryBackground = dynamic(
  () =>
    import("@/components/watch/story/StoryBackground").then((m) => m.StoryBackground),
  { ssr: false, loading: () => null },
);

export function WatchExperience() {
  const [themeId, setThemeId] = useState<WatchThemeId>("aurora");
  const { scrollYProgress } = useScroll();

  // Bridge root scroll progress into the WebGL story + legacy watch helpers.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    watchState.scroll = v;
    sceneState.scroll = v;
  });

  // Feed the active theme's accent to the scene.
  useEffect(() => {
    watchState.accent = watchThemes[themeId].accent;
  }, [themeId]);

  const onSelectTheme = useCallback((id: WatchThemeId) => setThemeId(id), []);

  const theme = watchThemes[themeId];

  return (
    <SmoothScroll>
      <div
        className="watch-theme relative min-h-full overflow-x-clip bg-transparent"
        style={{ ...theme.vars } as React.CSSProperties}
      >
        <WatchLoader />
        <WatchCursor />
        {/* Fixed night plate + GLB story — always behind content. */}
        <StoryBackground />
        {/* DOM overlay — pointer events + z-10 so it never fights the WebGL layer. */}
        <main className="relative z-10 isolate">
          <WatchHero />
          <WatchServices active={themeId} onSelect={onSelectTheme} />
          <WatchCapabilities />
          <WatchCaseStudies />
          <WatchMetrics />
          <WatchProcess />
          <WatchTechStack />
          <WatchTestimonials />
          <WatchMission />
          <WatchFooter />
        </main>
      </div>
    </SmoothScroll>
  );
}
