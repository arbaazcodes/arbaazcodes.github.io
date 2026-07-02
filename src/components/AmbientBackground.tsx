/**
 * Ambient mesh background — pure CSS.
 * Fixed layer behind all content. No canvas / SVG / images / WebGL.
 * 4 independently animated radial-gradient blobs that blend softly.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="ambient-bg">
      <span className="blob blob1" />
      <span className="blob blob2" />
      <span className="blob blob3" />
      <span className="blob blob4" />
    </div>
  );
}

export default AmbientBackground;
