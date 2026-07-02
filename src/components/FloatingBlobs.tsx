/**
 * Additive ambient blob layer. Sits above AmbientBackground, below content.
 * Does NOT modify the existing background — only overlays 6 slow, low-opacity
 * blurred gradient blobs that drift like clouds. GPU-accelerated transforms only.
 */
export function FloatingBlobs() {
  return (
    <div
      aria-hidden
      className="fb-root pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
    >
      <span className="fb-blob fb-b1" />
      <span className="fb-blob fb-b2" />
      <span className="fb-blob fb-b3" />
      <span className="fb-blob fb-b4" />
      <span className="fb-blob fb-b5" />
      <span className="fb-blob fb-b6" />
    </div>
  );
}

export default FloatingBlobs;
