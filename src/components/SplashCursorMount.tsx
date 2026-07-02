import { useEffect, useState } from "react";
import SplashCursor from "./reactbits/SplashCursor";

/**
 * Mounts the fluid SplashCursor globally.
 * - Disabled on touch devices and when prefers-reduced-motion is set.
 * - Rendered in a fixed, pointer-events-none layer behind the UI
 *   (z-0) but above the base page background.
 */
export function SplashCursorMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      "ontouchstart" in window;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isTouch && !reduced) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    >
      <SplashCursor
        TRANSPARENT
        RAINBOW_MODE={false}
        COLOR="#22d3ee"
        SHADING
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
        DENSITY_DISSIPATION={3.2}
        VELOCITY_DISSIPATION={1.8}
        CURL={2}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={6}
      />
    </div>
  );
}

export default SplashCursorMount;
