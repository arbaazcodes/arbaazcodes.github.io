import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arbaaz K. — Multidisciplinary Designer" },
      { name: "description", content: "Portfolio of Arbaaz K. — Graphic & UI/UX designer with 4 years bridging functional design and brand storytelling for EdTech, CRM and corporate brands." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "intro", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "videos", label: "Reels" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Email", href: "mailto:arbaazsince2002@gmail.com" },
];

const LOGOS = ["SwiftAMS", "Wavox WMS", "Swift AI", "Iksha Lab", "Edu Finn"];

type Discipline = {
  no: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  tiles: { label: string; ratio: string; variant: 1 | 2 | 3 }[];
};

const DISCIPLINES: Discipline[] = [
  {
    no: "01",
    title: "Brand Identity",
    sub: "Logos & visual systems",
    desc: "Distinctive, scalable identities engineered for resonance across every touchpoint — built for SwiftAMS, Wavox, Swift AI and Iksha Lab.",
    tags: ["Logo", "Identity", "Typography"],
    tiles: [
      { label: "SwiftAMS · Mark", ratio: "aspect-square", variant: 1 },
      { label: "Wavox · Mark", ratio: "aspect-square", variant: 2 },
      { label: "Swift AI · Mark", ratio: "aspect-square", variant: 3 },
      { label: "Iksha Lab · Mark", ratio: "aspect-square", variant: 1 },
      { label: "Studio · Mark", ratio: "aspect-square", variant: 2 },
    ],
  },
  {
    no: "02",
    title: "Social Media",
    sub: "Campaigns & content design",
    desc: "High-conversion creatives for LinkedIn, Instagram and corporate channels — sophisticated assets that respect strict brand guidelines.",
    tags: ["Campaigns", "Reels", "Carousels"],
    tiles: [
      { label: "Campaign 01", ratio: "aspect-[4/5]", variant: 1 },
      { label: "Campaign 02", ratio: "aspect-[4/5]", variant: 2 },
      { label: "Campaign 03", ratio: "aspect-[4/5]", variant: 3 },
      { label: "Campaign 04", ratio: "aspect-[4/5]", variant: 1 },
      { label: "Campaign 05", ratio: "aspect-[4/5]", variant: 2 },
      { label: "Campaign 06", ratio: "aspect-[4/5]", variant: 3 },
    ],
  },
  {
    no: "03",
    title: "Print Media",
    sub: "Brochures, standees & collateral",
    desc: "Brochures, trade-show standees and executive stationery — print-perfect execution with absolute brand fidelity.",
    tags: ["Brochure", "Standee", "Stationery"],
    tiles: [
      { label: "Brochure spread A", ratio: "aspect-[3/2]", variant: 1 },
      { label: "Brochure spread B", ratio: "aspect-[3/2]", variant: 3 },
      { label: "Standee", ratio: "aspect-[3/4]", variant: 2 },
    ],
  },
  {
    no: "04",
    title: "UI / UX",
    sub: "Web platforms & dashboards",
    desc: "Intuitive digital ecosystems built on user-centric architecture — interfaces that make complex platforms feel calm and accessible.",
    tags: ["Web", "Dashboard", "Design System"],
    tiles: [
      { label: "Dashboard · macOS", ratio: "aspect-[16/10]", variant: 1 },
      { label: "Marketing site", ratio: "aspect-[16/10]", variant: 2 },
    ],
  },
  {
    no: "05",
    title: "Mobile App",
    sub: "Native & cross-platform",
    desc: "Mobile flows engineered for clarity at a glance — identity, motion and meticulous attention to the small moments.",
    tags: ["iOS", "Android", "Prototyping"],
    tiles: [
      { label: "App · Hero", ratio: "aspect-[16/10]", variant: 3 },
      { label: "Screen 01", ratio: "aspect-[9/19]", variant: 1 },
      { label: "Screen 02", ratio: "aspect-[9/19]", variant: 2 },
      { label: "Screen 03", ratio: "aspect-[9/19]", variant: 3 },
      { label: "Screen 04", ratio: "aspect-[9/19]", variant: 1 },
    ],
  },
  {
    no: "06",
    title: "Motion & Video",
    sub: "Corporate storytelling",
    desc: "End-to-end post-production — corporate storytelling, testimonials and product demos for Edu Finn and Swift AMS.",
    tags: ["Editing", "Reels", "Motion GFX"],
    tiles: [
      { label: "Showreel cover", ratio: "aspect-[16/9]", variant: 2 },
    ],
  },
];

const VIDEOS = [
  { id: "qsdorOJX_KQ", title: "Pathway to France — Neeraj Marwaha", client: "Edu Finn", len: "08:23" },
  { id: "E_2gBwOA_LI", title: "Finland Spouse Visa — Ramanpreet Kaur", client: "Edu Finn", len: "05:15" },
  { id: "CMWVLkfhDV8", title: "Finland Spouse Success Stories 2024", client: "Edu Finn", len: "01:40" },
  { id: "F-n6Uk9clg0", title: "Pathway to France", client: "Edu Finn", len: "00:58" },
  { id: "h7jDP07g5Wg", title: "From Studio Sets to Finnish Classrooms", client: "Edu Finn", len: "05:51" },
  { id: "eMOspLnw3C8", title: "Student Feedback — Study in Finland", client: "Edu Finn", len: "08:12" },
  { id: "zRSnRssgh4s", title: "Learn, Grow, Lead — Study in Dubai", client: "Edu Finn", len: "00:59" },
  { id: "ZtpR21zK6FM", title: "Lead Migration Across Branches", client: "Swift AMS", len: "00:44" },
  { id: "UNKwLmpR6vk", title: "Infopedia Documents Storage", client: "Swift AMS", len: "01:01" },
  { id: "iglrTBTykjE", title: "Swift AMS — Partner of ICEF 2025", client: "Swift AMS", len: "00:28" },
  { id: "B4_u3bJF1jo", title: "Upgrade to Swift AMS", client: "Swift AMS", len: "00:50" },
  { id: "y3Y0jligfkg", title: "Integrated Payment System Launch", client: "Swift AMS", len: "00:40" },
  { id: "aCC87nVbR8E", title: "Unveiling Swift AMS", client: "Swift AMS", len: "00:29" },
  { id: "raFlTw1bRhM", title: "Razorpay Integration Reveal", client: "Swift AMS", len: "01:12" },
  { id: "Q5BDjeACCQ0", title: "Customizable QR Forms", client: "Swift AMS", len: "00:47" },
];

function Portfolio() {
  const [active, setActive] = useState("intro");
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  return (
    <div className="grain relative min-h-screen bg-background text-foreground">
      <AmbientOrbs />
      <Cursor />
      <Nav active={active} light={light} setLight={setLight} />
      <SideRail />
      <main className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <Hero />
        <Marquee items={LOGOS} />
        <About />
        <Stats />
        <Work />
        <Videos />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ---------- Ambient + Cursor ---------- */

function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-[oklch(0.68_0.21_305/_0.35)] blur-[120px] animate-orb" />
      <div className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-[oklch(0.78_0.18_75/_0.3)] blur-[120px] animate-orb" style={{ animationDelay: "-6s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.74_0.16_200/_0.28)] blur-[120px] animate-orb" style={{ animationDelay: "-12s" }} />
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(circle at 50% 30%, black 30%, transparent 75%)",
      }} />
    </div>
  );
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 mix-blend-difference md:block"
    >
      <span className="absolute inset-2 rounded-full bg-accent/80" />
    </motion.div>
  );
}

/* ---------- Nav ---------- */

function Nav({ active, light, setLight }: { active: string; light: boolean; setLight: (v: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-full glass px-3 py-2 md:px-4">
        <a href="#intro" className="flex items-center gap-2 pl-3 pr-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
            <span className="font-display text-sm">a</span>
            <span className="pulse-ring absolute inset-0 rounded-full" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">arbaaz/2026</span>
        </a>
        <nav className="hidden gap-0.5 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`relative rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors ${
                active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === n.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-foreground/10" transition={{ type: "spring", stiffness: 350, damping: 30 }} />
              )}
              <span className="relative">{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLight(!light)}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            <span className="text-sm">{light ? "☾" : "☀"}</span>
          </button>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-background hover:bg-accent hover:text-accent-foreground transition-colors">
            Let's talk <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function SideRail() {
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col items-center gap-6">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors"
            style={{ writingMode: "vertical-rl" }}
          >
            {s.label}
          </a>
        ))}
        <div className="h-16 w-px bg-border" />
      </div>
    </div>
  );
}

/* ---------- 3D Tilt wrapper ---------- */

function Tilt({ children, className = "", strength = 12 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * strength);
    rx.set(-py * strength);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Placeholder media ---------- */

function Placeholder({ label, ratio = "aspect-video", variant = 1, badge }: { label: string; ratio?: string; variant?: 1 | 2 | 3; badge?: string }) {
  const grad = variant === 1 ? "placeholder-grad" : variant === 2 ? "placeholder-grad-2" : "placeholder-grad-3";
  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded-2xl border border-border/60 ${grad}`}>
      {/* mesh ring */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, transparent 40%, oklch(1 0 0 / 0.05) 41%, transparent 42%), radial-gradient(circle at 50% 50%, transparent 60%, oklch(1 0 0 / 0.04) 61%, transparent 62%)",
      }} />
      <div className="absolute inset-0 animate-shine" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
          <span>{badge ?? "Replace asset"}</span>
          <span>◐</span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Placeholder</p>
          <p className="font-display text-lg text-white/90">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const op = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const words = ["Multidisciplinary", "designer", "shaping", "brands,", "interfaces", "&", "stories."];

  return (
    <section id="intro" ref={ref} className="relative min-h-[100svh] pt-36 pb-24 md:pt-44">
      <motion.div style={{ y, opacity: op }} className="relative grid gap-16 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Available · Q1 2026</span>
          </motion.div>

          <h1 className="text-display text-[clamp(2.75rem,8vw,7rem)]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="mr-[0.18em] inline-block"
                style={{ transformOrigin: "50% 100%" }}
              >
                {w === "brands," ? <em className="not-italic text-gradient italic">{w}</em> : w}
              </motion.span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              I'm <span className="text-foreground">Arbaaz K.</span> — a graphic & UI/UX designer with four years of experience bridging functional design and brand storytelling for EdTech, CRM and corporate brands.
            </p>
            <div className="flex items-center gap-4">
              <a href="#work" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm text-background transition-transform hover:scale-[1.02]">
                <span className="relative z-10">See the work</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">↗</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a href="#contact" className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3D visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="md:col-span-5"
        >
          <Tilt strength={18} className="relative mx-auto aspect-[3/4] w-full max-w-[400px]">
            <div className="absolute inset-0 rounded-[2rem] placeholder-grad-3 glow-ring overflow-hidden">
              <div className="absolute inset-0 animate-shine" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70">Portrait · Replace</p>
                <p className="font-display text-2xl">Arbaaz K.</p>
              </div>
            </div>
            {/* floating chips */}
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-10 glass rounded-2xl p-3" style={{ transform: "translateZ(60px)" }}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Now</p>
              <p className="font-display text-sm">Crafting motion</p>
            </motion.div>
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 bottom-20 glass rounded-2xl px-3 py-2" style={{ transform: "translateZ(80px)" }}>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">4 yrs · craft</span>
              </div>
            </motion.div>
            <div className="absolute -inset-2 -z-10 rounded-[2.5rem] border border-foreground/10" />
            <div className="absolute -inset-6 -z-20 rounded-[3rem] bg-gradient-to-br from-accent/20 via-transparent to-accent-2/30 blur-2xl" />
          </Tilt>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }} className="mt-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="flex items-center gap-2"><span>Scroll</span> <span className="inline-block h-px w-12 bg-muted-foreground" /></span>
        <span className="hidden md:inline">India · Remote worldwide</span>
      </motion.div>
    </section>
  );
}

/* ---------- Marquee ---------- */

function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section className="relative -mx-6 overflow-hidden border-y border-border/60 py-6 md:-mx-12 lg:-mx-20">
      <div className="flex w-max animate-marquee gap-14">
        {loop.map((c, i) => (
          <span key={i} className="flex items-center gap-14 font-display text-2xl text-foreground/70 whitespace-nowrap md:text-3xl">
            {c} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">/ About</p>
          <Tilt strength={8} className="relative aspect-square w-full max-w-[260px]">
            <div className="absolute inset-0 rounded-3xl placeholder-grad" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="h-full w-full">
                <svg viewBox="0 0 100 100" className="h-full w-full fill-white/90">
                  <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                  <text fontSize="7" letterSpacing="2.5" className="font-mono">
                    <textPath href="#c">DESIGN · CRAFT · MOTION · DETAIL · DESIGN · CRAFT · MOTION · DETAIL · </textPath>
                  </text>
                </svg>
              </motion.div>
              <span className="absolute font-display text-3xl text-white">✶</span>
            </div>
          </Tilt>
        </div>

        <div className="space-y-10 md:col-span-8">
          <h2 className="text-display text-[clamp(1.85rem,4vw,3.5rem)]">
            Analytical thinking meets <em className="not-italic text-gradient italic">creative execution</em> — every project ships toward a real business outcome.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            From corporate branding for SwiftAMS to educational content for Edu Finn, I pride myself on clarity, precision and the ability to adapt visual language across industries. Driven by simplicity and meticulous attention to detail.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-3">
            {[
              ["Design", "Brand · Print · Digital"],
              ["Product", "UI · UX · Mobile"],
              ["Motion", "Editing · Storytelling"],
              ["Tools", "Figma · Adobe · AE"],
              ["Industries", "EdTech · CRM · Corp"],
              ["Based in", "India · Remote"],
            ].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl p-4">
                <p className="text-eyebrow mb-1.5">{k}</p>
                <p className="text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function Stats() {
  const stats = [
    ["04", "Years of craft"],
    ["60+", "Shipped projects"],
    ["15", "Brand identities"],
    ["100%", "On-brand delivery"],
  ];
  return (
    <section className="py-12">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className="glass rounded-3xl p-6"
          >
            <p className="text-display text-4xl md:text-5xl">{k}</p>
            <p className="text-eyebrow mt-2">{v}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Work ---------- */

function Work() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow mb-4">/ Selected work</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[18ch]">
            Six disciplines. <em className="not-italic text-gradient italic">One craft.</em>
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">
          2021 — 2025
        </p>
      </div>

      <div className="space-y-24">
        {DISCIPLINES.map((d, i) => (
          <DisciplineBlock key={d.no} d={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function DisciplineBlock({ d, index }: { d: Discipline; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="grid gap-10 md:grid-cols-12"
    >
      <div className="md:col-span-4">
        <div className="sticky top-32 space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">{d.no}</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h3 className="text-display text-[clamp(1.75rem,4vw,3rem)]">{d.title}</h3>
          <p className="text-eyebrow">{d.sub}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {d.tags.map((t) => (
              <span key={t} className="rounded-full border border-border/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-8">
        <DisciplineGallery tiles={d.tiles} index={index} />
      </div>
    </motion.div>
  );
}

function DisciplineGallery({ tiles, index }: { tiles: Discipline["tiles"]; index: number }) {
  // single tile -> full; 2 -> 2 cols; 3 -> 2/3 layout; 5 -> 2+3 layout; 6 -> 3x2 grid
  if (tiles.length === 1) {
    return (
      <Tilt strength={8}>
        <Placeholder label={tiles[0].label} ratio={tiles[0].ratio} variant={tiles[0].variant} badge={`Block 0${index + 1}`} />
      </Tilt>
    );
  }
  if (tiles.length === 2) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {tiles.map((t, i) => (
          <Tilt key={i} strength={8}>
            <Placeholder label={t.label} ratio={t.ratio} variant={t.variant} />
          </Tilt>
        ))}
      </div>
    );
  }
  if (tiles.length === 3) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {tiles.map((t, i) => (
          <Tilt key={i} strength={8}>
            <Placeholder label={t.label} ratio={t.ratio} variant={t.variant} />
          </Tilt>
        ))}
      </div>
    );
  }
  if (tiles.length === 5 && tiles[0].ratio.includes("16/10")) {
    // mobile section: hero + 4 screens
    return (
      <div className="space-y-4">
        <Tilt strength={6}><Placeholder label={tiles[0].label} ratio={tiles[0].ratio} variant={tiles[0].variant} /></Tilt>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.slice(1).map((t, i) => (
            <Tilt key={i} strength={10}><Placeholder label={t.label} ratio={t.ratio} variant={t.variant} /></Tilt>
          ))}
        </div>
      </div>
    );
  }
  // grid (5 logos, 6 social)
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {tiles.map((t, i) => (
        <Tilt key={i} strength={10}>
          <Placeholder label={t.label} ratio={t.ratio} variant={t.variant} />
        </Tilt>
      ))}
    </div>
  );
}

/* ---------- Videos ---------- */

function Videos() {
  return (
    <section id="videos" className="py-28 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow mb-4">/ Motion & reels</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[20ch]">
            Stories edited for <em className="not-italic text-gradient italic">Edu Finn</em> & Swift AMS.
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">15 reels</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <motion.a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
            className="group block"
          >
            <Tilt strength={10}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-surface">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-background/95 text-foreground transition-transform group-hover:scale-110">
                    <span className="translate-x-px">▶</span>
                    <span className="pulse-ring absolute inset-0 rounded-full" />
                  </span>
                </div>
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 text-white">
                  <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">{v.client}</span>
                  <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">{v.len}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-display text-base leading-tight line-clamp-2">{v.title}</h3>
                </div>
              </div>
            </Tilt>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact + Footer ---------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden rounded-[2.5rem] border border-border/60 glass my-16 p-8 md:my-24 md:p-16">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-orb" aria-hidden />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-accent-2/30 blur-3xl animate-orb" style={{ animationDelay: "-8s" }} aria-hidden />

      <div className="relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-eyebrow mb-6">/ Say hello</p>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Currently accepting <br /> select projects in <br /> branding, product & motion.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-2.5 w-2.5"><span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-accent opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" /></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Open · Q1 2026</span>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="text-display text-[clamp(2.25rem,7vw,5.5rem)]">
            Have a project? <br />
            <a href="mailto:arbaazsince2002@gmail.com" className="text-gradient">Let's make it.</a>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-eyebrow mb-2">Email</p>
              <a href="mailto:arbaazsince2002@gmail.com" className="text-lg link-underline break-all">
                arbaazsince2002@gmail.com
              </a>
            </div>
            <div>
              <p className="text-eyebrow mb-2">Elsewhere</p>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} className="link-underline text-sm">{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border/60 py-8 md:flex-row md:items-center md:justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">© 2026 Arbaaz K. — Multidisciplinary Designer</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Crafted with care · Made in India</p>
    </footer>
  );
}
