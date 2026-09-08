import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * React Bits — Magnetic
 * Wraps a child and gently pulls it toward the cursor on hover.
 * Uses GSAP quickTo with 0.35x distance intensity when available for silky smooth pull,
 * with high-fidelity spring fallback. Transform-only (GPU). Respects prefers-reduced-motion.
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
  const innerRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (reduce || !innerRef.current) return;
    const win = window as unknown as {
      gsap?: { quickTo: (target: Element, prop: string, vars: object) => (v: number) => void };
    };
    if (win.gsap && typeof win.gsap.quickTo === "function") {
      xTo.current = win.gsap.quickTo(innerRef.current, "x", { duration: 0.45, ease: "power3.out" });
      yTo.current = win.gsap.quickTo(innerRef.current, "y", { duration: 0.45, ease: "power3.out" });
    }
  }, [reduce]);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const distX = e.clientX - cx;
    const distY = e.clientY - cy;

    if (xTo.current && yTo.current) {
      // Direct GSAP quickTo at 0.35x distance intensity, clamped to strength * 1.5
      const limit = Math.max(strength * 1.5, 20);
      const targetX = Math.max(-limit, Math.min(limit, distX * 0.35));
      const targetY = Math.max(-limit, Math.min(limit, distY * 0.35));
      xTo.current(targetX);
      yTo.current(targetY);
    } else {
      const dx = distX / (r.width / 2 + padding);
      const dy = distY / (r.height / 2 + padding);
      x.set(Math.max(-1, Math.min(1, dx)) * strength);
      y.set(Math.max(-1, Math.min(1, dy)) * strength);
    }
  };

  const onLeave = () => {
    if (xTo.current && yTo.current) {
      xTo.current(0);
      yTo.current(0);
    }
    x.set(0);
    y.set(0);
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: "inline-block" }}
    >
      <motion.span
        ref={innerRef}
        style={{
          x: sx,
          y: sy,
          display: "inline-block",
          willChange: "transform",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default Magnetic;
