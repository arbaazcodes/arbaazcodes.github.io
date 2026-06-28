import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
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
  { id: "gallery", label: "Gallery" },
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
  meta: string;
};

const DISCIPLINES: Discipline[] = [
  { no: "01", title: "Brand Identity", sub: "Logos & visual systems",
    desc: "Distinctive, scalable identities engineered for resonance across every touchpoint — built for SwiftAMS, Wavox, Swift AI and Iksha Lab.",
    tags: ["Logo", "Identity", "Typography"], meta: "15 marks · 6 systems" },
  { no: "02", title: "Social Media", sub: "Campaigns & content design",
    desc: "High-conversion creatives for LinkedIn, Instagram and corporate channels — sophisticated assets that respect strict brand guidelines.",
    tags: ["Campaigns", "Reels", "Carousels"], meta: "200+ posts shipped" },
  { no: "03", title: "Print Media", sub: "Brochures, standees & collateral",
    desc: "Brochures, trade-show standees and executive stationery — print-perfect execution with absolute brand fidelity.",
    tags: ["Brochure", "Standee", "Stationery"], meta: "Print-ready · CMYK" },
  { no: "04", title: "UI / UX", sub: "Web platforms & dashboards",
    desc: "Intuitive digital ecosystems built on user-centric architecture — interfaces that make complex platforms feel calm and accessible.",
    tags: ["Web", "Dashboard", "Design System"], meta: "12 products" },
  { no: "05", title: "Mobile App", sub: "Native & cross-platform",
    desc: "Mobile flows engineered for clarity at a glance — identity, motion and meticulous attention to the small moments.",
    tags: ["iOS", "Android", "Prototyping"], meta: "5 apps · 80+ screens" },
  { no: "06", title: "Motion & Video", sub: "Corporate storytelling",
    desc: "End-to-end post-production — corporate storytelling, testimonials and product demos for Edu Finn and Swift AMS.",
    tags: ["Editing", "Reels", "Motion GFX"], meta: "15+ films" },
];

type GalleryItem = { id: string; label: string; category: string; ratio: string; variant: 1 | 2 | 3 };

const GALLERY: GalleryItem[] = [
  { id: "g1", label: "SwiftAMS · Mark",      category: "Brand",  ratio: "aspect-square",   variant: 1 },
  { id: "g2", label: "Wavox WMS · System",   category: "Brand",  ratio: "aspect-[4/5]",    variant: 2 },
  { id: "g3", label: "Campaign · LinkedIn",  category: "Social", ratio: "aspect-[4/5]",    variant: 3 },
  { id: "g4", label: "Brochure · Spread",    category: "Print",  ratio: "aspect-[3/2]",    variant: 1 },
  { id: "g5", label: "Dashboard · macOS",    category: "UI/UX",  ratio: "aspect-[16/10]",  variant: 2 },
  { id: "g6", label: "Counsellor · App",     category: "Mobile", ratio: "aspect-[9/12]",   variant: 3 },
  { id: "g7", label: "Iksha Lab · Identity", category: "Brand",  ratio: "aspect-square",   variant: 2 },
  { id: "g8", label: "Standee · Expo",       category: "Print",  ratio: "aspect-[3/4]",    variant: 1 },
  { id: "g9", label: "Marketing site",       category: "UI/UX",  ratio: "aspect-[16/10]",  variant: 3 },
  { id: "g10", label: "Reel · Cover",        category: "Motion", ratio: "aspect-square",   variant: 1 },
  { id: "g11", label: "Edu Finn · Post",     category: "Social", ratio: "aspect-[4/5]",    variant: 2 },
  { id: "g12", label: "Swift AI · Mark",     category: "Brand",  ratio: "aspect-square",   variant: 3 },
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

type LightboxState =
  | { kind: "image"; item: GalleryItem }
  | { kind: "video"; item: (typeof VIDEOS)[number] }
  | null;

function Portfolio() {
  const [active, setActive] = useState("intro");
  const [light, setLight] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

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

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

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
        <Gallery onOpen={(item) => setLightbox({ kind: "image", item })} />
        <Videos onOpen={(item) => setLightbox({ kind: "video", item })} />
        <Contact />
        <Footer />
      </main>

      <AnimatePresence>
        {lightbox && <Lightbox state={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Ambient + Cursor (monochrome) ---------- */

function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-foreground/[0.06] blur-[120px] animate-orb" />
      <div className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-foreground/[0.05] blur-[120px] animate-orb" style={{ animationDelay: "-7s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-foreground/[0.04] blur-[120px] animate-orb" style={{ animationDelay: "-14s" }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{
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
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/70 mix-blend-difference md:block"
    >
      <span className="absolute inset-2 rounded-full bg-foreground/80" />
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
            <span className="font-display text-sm font-semibold">a</span>
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
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-background hover:bg-foreground/85 transition-colors">
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
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
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

/* ---------- Placeholder media tile ---------- */

function Placeholder({ label, ratio = "aspect-video", variant = 1, badge }: { label: string; ratio?: string; variant?: 1 | 2 | 3; badge?: string }) {
  const grad = variant === 1 ? "placeholder-grad" : variant === 2 ? "placeholder-grad-2" : "placeholder-grad-3";
  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded-2xl border border-border/60 ${grad}`}>
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, transparent 40%, oklch(1 0 0 / 0.05) 41%, transparent 42%), radial-gradient(circle at 50% 50%, transparent 60%, oklch(1 0 0 / 0.04) 61%, transparent 62%)",
      }} />
      <div className="absolute inset-0 animate-shine" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/60">
          <span>{badge ?? "Replace asset"}</span>
          <span>◐</span>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">Placeholder</p>
          <p className="font-display text-lg text-foreground/90">{label}</p>
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
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Available · Q1 2026</span>
          </motion.div>

          <h1 className="text-display text-[clamp(2.75rem,8vw,6.75rem)]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="mr-[0.18em] inline-block"
                style={{ transformOrigin: "50% 100%" }}
              >
                {w === "brands," ? <em className="not-italic italic text-muted-foreground">{w}</em> : w}
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
              </a>
              <a href="#contact" className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="md:col-span-5"
        >
          <Tilt strength={18} className="relative mx-auto aspect-[3/4] w-full max-w-[400px]">
            <div className="absolute inset-0 rounded-[2rem] placeholder-grad-3 glow-ring overflow-hidden">
              <div className="absolute inset-0 animate-shine" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-foreground">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Portrait · Replace</p>
                <p className="font-display text-2xl">Arbaaz K.</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-10 glass rounded-2xl p-3" style={{ transform: "translateZ(60px)" }}>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Now</p>
              <p className="font-display text-sm">Crafting motion</p>
            </motion.div>
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 bottom-20 glass rounded-2xl px-3 py-2" style={{ transform: "translateZ(80px)" }}>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">4 yrs · craft</span>
              </div>
            </motion.div>
            <div className="absolute -inset-2 -z-10 rounded-[2.5rem] border border-foreground/10" />
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
          <span key={i} className="flex items-center gap-14 font-display text-2xl text-foreground/65 whitespace-nowrap md:text-3xl">
            {c} <span className="text-foreground/40">✦</span>
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
                <svg viewBox="0 0 100 100" className="h-full w-full fill-foreground/85">
                  <defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                  <text fontSize="7" letterSpacing="2.5" className="font-mono">
                    <textPath href="#c">DESIGN · CRAFT · MOTION · DETAIL · DESIGN · CRAFT · MOTION · DETAIL · </textPath>
                  </text>
                </svg>
              </motion.div>
              <span className="absolute font-display text-3xl text-foreground">✶</span>
            </div>
          </Tilt>
        </div>

        <div className="space-y-10 md:col-span-8">
          <h2 className="text-display text-[clamp(1.85rem,4vw,3.5rem)]">
            Analytical thinking meets <em className="not-italic italic text-muted-foreground">creative execution</em> — every project ships toward a real business outcome.
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

/* ---------- Work (text-only, no placeholders per section) ---------- */

function Work() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow mb-4">/ Selected work</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[18ch]">
            Six disciplines. <em className="not-italic italic text-muted-foreground">One craft.</em>
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">
          2021 — 2025
        </p>
      </div>

      <div className="divide-y divide-border/60 border-y border-border/60">
        {DISCIPLINES.map((d, i) => (
          <DisciplineRow key={d.no} d={d} index={i} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>Full visual archive ↓</span>
        <a href="#gallery" className="link-underline text-foreground">Open Gallery</a>
      </div>
    </section>
  );
}

function DisciplineRow({ d, index }: { d: Discipline; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group grid cursor-default grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-foreground/[0.03] md:py-8"
    >
      <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1">{d.no}</span>
      <div className="col-span-10 md:col-span-5">
        <h3 className="text-display text-[clamp(1.5rem,3vw,2.5rem)]">{d.title}</h3>
        <p className="text-eyebrow mt-1">{d.sub}</p>
      </div>
      <p className="col-span-12 max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4">
        {d.desc}
      </p>
      <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{d.meta}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-sm">+</motion.span>
      </div>
      <div className="col-span-12 md:col-start-2 md:col-span-11">
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap gap-2 pt-4">
            {d.tags.map((t) => (
              <span key={t} className="rounded-full border border-border/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Gallery (single home grid, clickable) ---------- */

function Gallery({ onOpen }: { onOpen: (item: GalleryItem) => void }) {
  const categories = ["All", "Brand", "Social", "Print", "UI/UX", "Mobile", "Motion"];
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="py-28 md:py-40">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-eyebrow mb-4">/ Gallery</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[20ch]">
            Tap any tile to <em className="not-italic italic text-muted-foreground">preview</em>, download or comment.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g, i) => (
          <motion.button
            key={g.id}
            onClick={() => onOpen(g)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}
            className="group relative block cursor-pointer text-left"
          >
            <Tilt strength={8}>
              <Placeholder label={g.label} ratio={g.ratio} variant={g.variant} badge={g.category} />
            </Tilt>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-foreground/0 transition-all group-hover:ring-1 group-hover:ring-foreground/30" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm">{g.label}</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">View →</span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Videos (clickable → modal player) ---------- */

function Videos({ onOpen }: { onOpen: (v: (typeof VIDEOS)[number]) => void }) {
  return (
    <section id="videos" className="py-28 md:py-40">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow mb-4">/ Motion & reels</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[20ch]">
            Stories edited for <em className="not-italic italic text-muted-foreground">Edu Finn</em> & Swift AMS.
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">{VIDEOS.length} reels · tap to play</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <motion.button
            key={v.id}
            onClick={() => onOpen(v)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
            className="group block cursor-pointer text-left"
          >
            <Tilt strength={10}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-surface">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black transition-transform group-hover:scale-110">
                    <span className="translate-x-px">▶</span>
                    <span className="pulse-ring absolute inset-0 rounded-full" />
                  </span>
                </div>
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 text-white">
                  <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">{v.client}</span>
                  <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">{v.len}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-display text-base leading-tight line-clamp-2">{v.title}</h3>
                </div>
              </div>
            </Tilt>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Lightbox: image (download + comment) OR video (inline) ---------- */

function Lightbox({ state, onClose }: { state: NonNullable<LightboxState>; onClose: () => void }) {
  const [comments, setComments] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  // reset comments when item changes
  useEffect(() => { setComments([]); setDraft(""); }, [state]);

  return (
    <motion.div
      key={state.kind === "image" ? state.item.id : state.item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 grid w-full max-w-[1100px] gap-0 overflow-hidden rounded-3xl border border-border/70 glass shadow-2xl md:grid-cols-[1.4fr_1fr]"
      >
        {/* Media side */}
        <div className="relative bg-black/40">
          {state.kind === "image" ? (
            <div className="relative h-full min-h-[280px]">
              <Placeholder
                label={state.item.label}
                ratio="aspect-[4/3] md:aspect-auto md:h-full"
                variant={state.item.variant}
                badge={state.item.category}
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full md:aspect-auto md:h-full md:min-h-[360px]">
              <iframe
                src={`https://www.youtube.com/embed/${state.item.id}?autoplay=1&rel=0`}
                title={state.item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          )}
        </div>

        {/* Detail side */}
        <div className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-eyebrow mb-2">
                {state.kind === "image" ? state.item.category : state.item.client}
              </p>
              <h3 className="text-display text-2xl leading-tight md:text-3xl">
                {state.kind === "image" ? state.item.label : state.item.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 text-sm hover:bg-foreground/10"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.kind === "image" ? (
              <>
                <a
                  href={`data:text/plain;charset=utf-8,Placeholder asset: ${encodeURIComponent(state.item.label)}`}
                  download={`${state.item.id}-${state.item.label.replace(/\s+/g, "-")}.txt`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/85"
                >
                  ↓ Download
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(state.item.label)}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-foreground/10"
                >
                  Copy title
                </button>
              </>
            ) : (
              <a
                href={`https://www.youtube.com/watch?v=${state.item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-foreground/10"
              >
                Open on YouTube ↗
              </a>
            )}
          </div>

          {/* Comments */}
          <div className="mt-2 flex min-h-0 flex-1 flex-col gap-3">
            <p className="text-eyebrow">Comments · {comments.length}</p>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
              {comments.length === 0 && (
                <p className="text-muted-foreground">No comments yet. Be the first to leave a note.</p>
              )}
              {comments.map((c, i) => (
                <div key={i} className="rounded-xl border border-border/60 bg-foreground/[0.04] px-3 py-2">{c}</div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = draft.trim();
                if (!v) return;
                setComments((cs) => [...cs, v]);
                setDraft("");
              }}
              className="flex items-center gap-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a comment…"
                className="flex-1 rounded-full border border-border/70 bg-background/50 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-foreground/60"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-4 py-2 text-xs text-background hover:bg-foreground/85"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Contact + Footer ---------- */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden rounded-[2.5rem] border border-border/60 glass my-16 p-8 md:my-24 md:p-16">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-foreground/[0.07] blur-3xl animate-orb" aria-hidden />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-foreground/[0.06] blur-3xl animate-orb" style={{ animationDelay: "-8s" }} aria-hidden />

      <div className="relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-eyebrow mb-6">/ Say hello</p>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Currently accepting <br /> select projects in <br /> branding, product & motion.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-foreground opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foreground" /></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Open · Q1 2026</span>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="text-display text-[clamp(2.25rem,7vw,5.5rem)]">
            Have a project? <br />
            <a href="mailto:arbaazsince2002@gmail.com" className="link-underline">Let's make it.</a>
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
