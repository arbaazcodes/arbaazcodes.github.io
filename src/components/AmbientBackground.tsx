/**
 * Premium ambient floating background.
 * - Soft off-white base with a subtle diagonal pastel wash.
 * - 7 organic (non-circular) blurred gradient shapes drifting slowly like wind.
 * - Each shape has its own size, blur, opacity, direction, duration, and easing.
 * - Fixed behind content (-z-10), pointer-events: none.
 * - Respects prefers-reduced-motion (handled in CSS).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-wash" />
      <div className="ambient-shape s1" />
      <div className="ambient-shape s2" />
      <div className="ambient-shape s3" />
      <div className="ambient-shape s4" />
      <div className="ambient-shape s5" />
      <div className="ambient-shape s6" />
      <div className="ambient-shape s7" />
      <div className="ambient-grain" />
    </div>
  );
}

export default AmbientBackground;
