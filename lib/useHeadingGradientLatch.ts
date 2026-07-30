"use client";

import { useCallback, useState } from "react";

/** Once the heading is hovered, gradient stays at the shifted end position. */
export function useHeadingGradientLatch() {
  const [latched, setLatched] = useState(false);
  const latchGradient = useCallback(() => {
    setLatched(true);
  }, []);
  const latchedClass = latched ? "cci-heading-gradient--latched" : "";
  return { latchedClass, latchGradient };
}
