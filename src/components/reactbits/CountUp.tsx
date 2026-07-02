import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * React Bits — CountUp
 * Animates a number from 0 → end when it scrolls into view (once).
 * Uses transform-free text updates; wrap in a fixed-width span if you need
 * to prevent layout shift while counting.
 */
type CountUpProps = {
  end: number;
  duration?: number; // seconds
  decimals?: number;
  className?: string;
};

export function CountUp({ end, duration = 1.4, decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? end : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = end;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setVal(from + (to - from) * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {val.toFixed(decimals)}
    </span>
  );
}

export default CountUp;
