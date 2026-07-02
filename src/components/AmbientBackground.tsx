/**
 * Ambient floating blob layer.
 *
 * Sits fixed behind all content and does NOT paint any page background —
 * the underlying white (or dark) page color shows through untouched.
 *
 * 8 independently animated, softly blurred colored blobs drift slowly like
 * clouds. Each has a unique size, color, opacity (5–10%), blur (220–300px),
 * direction, duration (35–60s), scale and rotation. Only `transform` and
 * `opacity` are animated for GPU-accelerated 60 FPS.
 *
 * `prefers-reduced-motion` handled in CSS.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="ambient-root pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="ambient-blob ab-1" />
      <span className="ambient-blob ab-2" />
      <span className="ambient-blob ab-3" />
      <span className="ambient-blob ab-4" />
      <span className="ambient-blob ab-5" />
      <span className="ambient-blob ab-6" />
      <span className="ambient-blob ab-7" />
      <span className="ambient-blob ab-8" />
    </div>
  );
}

export default AmbientBackground;
