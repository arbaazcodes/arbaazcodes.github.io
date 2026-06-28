import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroArt from "@/assets/hero-art.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arbaaz Khan — UI/UX Designer" },
      { name: "description", content: "Portfolio of Arbaaz Khan — UI/UX designer crafting premium digital products and brand systems." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Say hello" },
];

const SOCIALS = [
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:hello@arbaaz.design" },
];

const PROJECTS = [
  {
    no: "01",
    title: "SwiftAMS CRM",
    tag: "Product Design · 2024",
    desc: "End-to-end CRM platform for admissions teams — dashboards, lead pipelines and a tightly engineered design system.",
    work: ["UX Architecture", "Design System", "Web App UI"],
    accent: "oklch(0.74 0.16 55)",
  },
  {
    no: "02",
    title: "Counsellor App",
    tag: "Mobile · 2024",
    desc: "A focused iOS & Android app letting student counsellors track conversations, follow-ups and conversions in one calm interface.",
    work: ["Mobile UX", "Visual Design", "Prototyping"],
    accent: "oklch(0.7 0.14 200)",
  },
  {
    no: "03",
    title: "WhatsApp Management",
    tag: "SaaS Dashboard · 2024",
    desc: "Multi-agent WhatsApp inbox with templates, analytics and automation — designed for clarity at scale.",
    work: ["Dashboard UX", "Data Viz", "Branding"],
    accent: "oklch(0.72 0.15 150)",
  },
  {
    no: "04",
    title: "Workflow Design",
    tag: "Visual Systems · 2023",
    desc: "Posters, motion graphics and brand collateral — visual experiments that shape how teams communicate.",
    work: ["Brand", "Motion", "Print"],
    accent: "oklch(0.7 0.16 320)",
  },
];

function Portfolio() {
  const [active, setActive] = useState("intro");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) ob.observe(el);
    });
    return () => ob.disconnect();
  }, []);

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <Nav active={active} dark={dark} setDark={setDark} />
      <SideRail />
      <main className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <Hero />
        <About />
        <Marquee />
        <Work />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

function Nav({
  active,
  dark,
  setDark,
}: {
  active: string;
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-4 md:px-12 lg:px-20">
        <a href="#intro" className="font-display text-lg tracking-tight">
          arbaaz<span className="text-accent">.</span>
        </a>
        <nav className="hidden justify-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-colors ${
                active === n.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
          className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors"
        >
          <span className="text-sm">{dark ? "☀" : "☾"}</span>
        </button>
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
            className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors"
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

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const words = ["Designing", "calm,", "considered", "interfaces", "for", "ambitious", "teams."];

  return (
    <section id="intro" ref={ref} className="relative min-h-[100svh] pt-20 pb-24 md:pt-32">
      <motion.div style={{ y, opacity }} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-eyebrow mb-8"
        >
          Hello world — Portfolio ’26
        </motion.p>

        <h1 className="text-display text-[clamp(2.75rem,9vw,8rem)] max-w-[18ch]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w === "calm," ? (
                <em className="not-italic text-accent font-display">{w}</em>
              ) : (
                w
              )}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground">Arbaaz Khan</span> — a UI/UX
            designer based in India, building products that feel as good as they
            look. Currently shaping experiences at SwiftAMS.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View selected work
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
            <a
              href="/Resume.pdf"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              Resume
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="pointer-events-none absolute -right-10 top-24 -z-10 hidden h-[420px] w-[420px] md:block"
        aria-hidden
      >
        <img
          src={heroArt}
          alt=""
          className="h-full w-full object-cover rounded-full opacity-70 mix-blend-multiply dark:mix-blend-screen"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-6 left-0 right-0 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span>Scroll ↓</span>
        <span className="hidden md:inline">Based in India · Available Jan ’26</span>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border py-24 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">About</p>
          <p className="font-mono text-xs text-muted-foreground">
            03 years <br /> 40+ projects <br /> Gurugram, IN
          </p>
        </div>
        <div className="md:col-span-8 space-y-8">
          <h2 className="text-display text-[clamp(1.75rem,4vw,3.25rem)]">
            I design products with the care of a craftsperson and the rigour of an
            engineer — equal parts <em className="text-accent not-italic">intuition</em> and structure.
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            My work lives at the intersection of brand, product and motion. From
            CRM platforms to mobile apps and visual systems, I obsess over the
            small moments that make digital experiences feel human.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6 md:grid-cols-3">
            {[
              ["Design", "Product · Brand · Motion"],
              ["Tools", "Figma · Framer · After Effects"],
              ["Code", "HTML · CSS · Tailwind"],
              ["Currently", "SwiftAMS, Gurugram"],
              ["Previously", "Freelance & Studios"],
              ["Speaks", "English · Hindi · Urdu"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-border pt-3">
                <p className="text-eyebrow mb-1">{k}</p>
                <p className="text-sm">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Product Design", "Brand Systems", "Motion", "Design Engineering", "Prototyping", "Art Direction"];
  return (
    <section className="overflow-hidden border-y border-border py-8">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items, ...items].map((w, i) => (
          <span
            key={i}
            className="text-display text-4xl md:text-6xl whitespace-nowrap text-muted-foreground"
          >
            {w} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 md:py-40">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-eyebrow mb-4">Selected work</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] max-w-[14ch]">
            A few things I've shipped recently.
          </h2>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block">
          2023 — 2025
        </p>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.no} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 md:py-10 transition-colors"
    >
      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
        {project.no}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-display text-[clamp(1.75rem,4.5vw,3.5rem)] truncate transition-transform duration-500 group-hover:-translate-y-0.5">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.tag}
          </span>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={hover ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.work.map((w) => (
                <span
                  key={w}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className="hidden h-3 w-3 rounded-full md:inline-block transition-transform duration-500 group-hover:scale-150"
          style={{ background: project.accent }}
        />
        <span className="font-mono text-xs transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">Say hello</p>
          <p className="font-mono text-xs text-muted-foreground">
            Currently accepting <br /> select projects for <br /> Q1 2026.
          </p>
        </div>
        <div className="md:col-span-8">
          <h2 className="text-display text-[clamp(2.25rem,7vw,6rem)]">
            Have an idea? <br />
            <a href="mailto:hello@arbaaz.design" className="text-accent link-underline">
              Let's build it.
            </a>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-eyebrow mb-2">Email</p>
              <a href="mailto:hello@arbaaz.design" className="text-lg link-underline">
                hello@arbaaz.design
              </a>
            </div>
            <div>
              <p className="text-eyebrow mb-2">Elsewhere</p>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} className="link-underline text-sm">
                    {s.label}
                  </a>
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
    <footer className="flex flex-col gap-4 border-t border-border py-8 md:flex-row md:items-center md:justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        © 2026 Arbaaz Khan — Designed & built with care
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Made in India · v1.0
      </p>
    </footer>
  );
}
