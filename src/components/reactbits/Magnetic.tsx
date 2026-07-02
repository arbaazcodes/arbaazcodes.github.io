import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * React Bits — Magnetic
 * Wraps a child and gently pulls it toward the cursor on hover.
 * Transform-only (GPU). Respects prefers-reduced-motion.
 */
type MagneticProps = {
  children: React.ReactNode;
  /** Max translation in px at the edge of the hit area. */
  strength?: number;
  /** Extra hit area padding in px around the child. */
  padding?: number;
  className?: string;
};

export function Magnetic({ children, strength = 18, padding = 24, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2 + padding);
    const dy = (e.clientY - cy) / (r.height / 2 + padding);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      <motion.span style={{ x: sx, y: sy, display: "inline-block" }}>
        {children}
      </motion.span>
    </span>
  );
}

export default Magnetic;
