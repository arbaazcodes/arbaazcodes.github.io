import { useEffect, useRef, useState } from "react";

/**
 * Premium adaptive cursor:
 * - Glowing orb + fading smoke/light trail on a fullscreen canvas.
 * - Samples the underlying element's background to pick a complementary glow.
 * - Idle breathing + click ripple.
 * - Disabled on touch devices and prefers-reduced-motion.
 * - Pointer-events: none, no impact on scroll/click.
 */

type TrailPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 0..1 (1 = fresh)
  size: number;
  hue: number;
  sat: number;
  light: number;
};

type Ripple = {
  x: number;
  y: number;
  life: number;
  hue: number;
  sat: number;
  light: number;
};

function parseCssColor(str: string): [number, number, number, number] | null {
  if (!str) return null;
  const s = str.trim();
  if (s === "transparent" || s === "rgba(0, 0, 0, 0)") return null;
  const m = s.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  const [r, g, b, a = 1] = parts;
  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return [r, g, b, a];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

function sampleBackground(x: number, y: number): [number, number, number] {
  // Walk up the DOM until we find an element with a non-transparent background.
  const el = document.elementFromPoint(x, y);
  let node: Element | null = el;
  let rgb: [number, number, number, number] | null = null;
  while (node) {
    const c = getComputedStyle(node).backgroundColor;
    const parsed = parseCssColor(c);
    if (parsed && parsed[3] > 0.05) { rgb = parsed; break; }
    node = node.parentElement;
  }
  if (!rgb) {
    const bodyBg = parseCssColor(getComputedStyle(document.body).backgroundColor);
    rgb = bodyBg ?? [255, 255, 255, 1];
  }
  return rgbToHsl(rgb[0], rgb[1], rgb[2]);
}

export function AdaptiveCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      "ontouchstart" in window;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isTouch && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer state
    const mouse = { x: w / 2, y: h / 2, active: false, moving: false };
    const orb = { x: w / 2, y: h / 2 }; // eased follower
    let lastMoveTs = 0;
    let speed = 0;

    // Adaptive color (HSL) — smoothed
    let hue = 260, sat = 70, light = 60;
    let sampleTick = 0;

    const trail: TrailPoint[] = [];
    const ripples: Ripple[] = [];

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.moving = true;
      lastMoveTs = performance.now();
    };
    const onLeave = () => { mouse.active = false; };
    const onEnter = () => { mouse.active = true; };
    const onDown = (e: PointerEvent) => {
      ripples.push({
        x: e.clientX, y: e.clientY, life: 1,
        hue, sat, light,
      });
      // subtle splash — very few particles
      for (let i = 0; i < 3; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 1.6;
        trail.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 1, size: 5 + Math.random() * 5,
          hue, sat, light,
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf = 0;
    let prev = performance.now();

    const step = (now: number) => {
      const dt = Math.min(48, now - prev) / 16.6667; // in ~frames
      prev = now;

      // Ease orb toward mouse
      const ex = mouse.x - orb.x;
      const ey = mouse.y - orb.y;
      const easing = 0.18;
      orb.x += ex * easing * dt;
      orb.y += ey * easing * dt;

      // Speed for trail length + orb scale
      const instSpeed = Math.hypot(ex, ey);
      speed += (instSpeed - speed) * 0.2;
      mouse.moving = now - lastMoveTs < 120;

      // Sample bg every ~6 frames for adaptive color
      sampleTick++;
      if (sampleTick % 6 === 0 && mouse.active) {
        try {
          const [sh, ss, sl] = sampleBackground(mouse.x, mouse.y);
          // Choose complementary / vibrant glow.
          // If the sampled area is nearly grayscale, fall back to a premium violet.
          let targetH = ss < 8 ? 268 : (sh + 180) % 360;
          // Ensure a rich saturated glow
          let targetS = ss < 8 ? 85 : Math.max(70, Math.min(95, ss + 20));
          // Contrast: bright on dark, slightly dimmer on light bg
          let targetL = sl < 45 ? 65 : 55;

          const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
          const lerpH = (a: number, b: number, t: number) => {
            let d = ((b - a + 540) % 360) - 180;
            return (a + d * t + 360) % 360;
          };
          hue = lerpH(hue, targetH, 0.15);
          sat = lerp(sat, targetS, 0.15);
          light = lerp(light, targetL, 0.15);
        } catch { /* ignore */ }
      }

      // Emit trail points as the cursor moves — sparse and small
      const emitCount = instSpeed > 4 && Math.random() < 0.5 ? 1 : 0;
      for (let i = 0; i < emitCount; i++) {
        trail.push({
          x: orb.x + (Math.random() - 0.5) * 1.5,
          y: orb.y + (Math.random() - 0.5) * 1.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.08,
          life: 1,
          size: 4 + Math.random() * 3 + Math.min(6, instSpeed * 0.15),
          hue, sat, light,
        });
      }
      // cap trail length (shorter)
      if (trail.length > 40) trail.splice(0, trail.length - 40);

      // Clear with slight transparency to allow motion blur trails
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.035 * dt;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        const r = p.size * (0.5 + 0.5 * p.life);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const alpha = 0.16 * p.life;
        grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${Math.min(80, p.light + 10)}%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life -= 0.02 * dt;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        const r = (1 - rp.life) * 140;
        ctx.strokeStyle = `hsla(${rp.hue}, ${rp.sat}%, ${rp.light + 10}%, ${rp.life * 0.6})`;
        ctx.lineWidth = 2 * rp.life + 0.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Main orb (breathing when idle)
      const breathe = mouse.moving ? 0 : (Math.sin(now / 620) * 0.5 + 0.5);
      const baseR = 14 + Math.min(18, speed * 0.35) + breathe * 4;

      // outer bloom
      const bloom = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, baseR * 5);
      bloom.addColorStop(0, `hsla(${hue}, ${sat}%, ${Math.min(85, light + 20)}%, 0.55)`);
      bloom.addColorStop(0.4, `hsla(${hue}, ${sat}%, ${light}%, 0.18)`);
      bloom.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, baseR * 5, 0, Math.PI * 2);
      ctx.fill();

      // core
      const core = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, baseR);
      core.addColorStop(0, `hsla(${hue}, ${Math.min(100, sat + 10)}%, 92%, 0.95)`);
      core.addColorStop(0.5, `hsla(${hue}, ${sat}%, ${Math.min(80, light + 15)}%, 0.7)`);
      core.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, baseR, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}

export default AdaptiveCursor;
