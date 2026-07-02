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
    let hovering = false; // over an interactive element (magnetic feel)

    // Adaptive color (HSL) — smoothed toward a target complementary hue
    let hue = 260, sat = 70, light = 62;
    let tHue = 260, tSat = 70, tLight = 62;
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

      // Ease orb toward mouse (a bit slower when hovering interactive → magnetic feel)
      const ex = mouse.x - orb.x;
      const ey = mouse.y - orb.y;
      const easing = hovering ? 0.24 : 0.2;
      orb.x += ex * easing * dt;
      orb.y += ey * easing * dt;

      // Speed for trail intensity + orb scale
      const instSpeed = Math.hypot(ex, ey);
      speed += (instSpeed - speed) * 0.2;
      mouse.moving = now - lastMoveTs < 120;

      // Adaptive color: sample under cursor every ~8 frames, smooth toward complementary hue.
      sampleTick += dt;
      if (sampleTick > 8) {
        sampleTick = 0;
        const [bh, bs, bl] = sampleBackground(mouse.x, mouse.y);
        // Complementary hue for contrast; keep vivid but not neon.
        tHue = (bh + 180) % 360;
        tSat = Math.min(80, Math.max(45, bs + 10));
        // If background is dark, use lighter glow; if bright, mid tone.
        tLight = bl > 55 ? 55 : 70;
        // Detect interactive element under cursor for a gentle magnetic feel
        const el = document.elementFromPoint(mouse.x, mouse.y);
        hovering = !!(el && el.closest("a, button, [role='button'], input, textarea, select, label"));
      }
      hue += (tHue - hue) * 0.08 * dt;
      sat += (tSat - sat) * 0.08 * dt;
      light += (tLight - light) * 0.08 * dt;

      // Emit trail points as the cursor moves — sparse, small, short-lived
      const emit = instSpeed > 5 && Math.random() < 0.35 ? 1 : 0;
      for (let i = 0; i < emit; i++) {
        trail.push({
          x: orb.x + (Math.random() - 0.5) * 1.2,
          y: orb.y + (Math.random() - 0.5) * 1.2,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22 - 0.06,
          life: 1,
          size: 3 + Math.random() * 2 + Math.min(3, instSpeed * 0.08),
          hue, sat, light,
        });
      }
      // Shorter trail cap
      if (trail.length > 22) trail.splice(0, trail.length - 22);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Draw trail (softer + faster decay)
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.055 * dt;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        const r = p.size * (0.5 + 0.5 * p.life);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const alpha = 0.11 * p.life;
        grad.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${Math.min(80, p.light + 10)}%, ${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ripples — small & quick
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life -= 0.055 * dt;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        const r = (1 - rp.life) * 34;
        ctx.strokeStyle = `hsla(${rp.hue}, ${rp.sat}%, ${rp.light + 10}%, ${rp.life * 0.32})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Main orb — smaller, softer. Gently scales up over interactive elements.
      const breathe = mouse.moving ? 0 : (Math.sin(now / 720) * 0.5 + 0.5);
      const hoverBoost = hovering ? 2.2 : 0;
      const baseR = 3.2 + Math.min(2, speed * 0.06) + breathe * 0.9 + hoverBoost;

      // Soft bloom (smaller radius, lower alpha)
      const bloom = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, baseR * 2.6);
      bloom.addColorStop(0, `hsla(${hue}, ${sat}%, ${Math.min(80, light + 15)}%, 0.14)`);
      bloom.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, baseR * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      const core = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, baseR);
      core.addColorStop(0, `hsla(${hue}, ${Math.min(100, sat + 10)}%, 92%, 0.75)`);
      core.addColorStop(0.6, `hsla(${hue}, ${sat}%, ${Math.min(75, light + 10)}%, 0.38)`);
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
