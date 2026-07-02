import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * React Bits — Reveal
 * Blur + fade + upward-slide reveal on scroll into view. Once only.
 * GPU transforms + opacity + filter only. Respects prefers-reduced-motion.
 */
type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before this element starts. */
  delay?: number;
  /** Upward travel in px. */
  y?: number;
  /** Blur amount in px. */
  blur?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Root margin for the viewport trigger, e.g. "-80px". */
  margin?: `${number}px` | `${number}%`;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
};

export function Reveal({
  children,
  delay = 0,
  y = 18,
  blur = 8,
  duration = 0.7,
  margin = "-60px",
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? "blur(0px)" : `blur(${blur}px)` },
    show:   { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={variants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
