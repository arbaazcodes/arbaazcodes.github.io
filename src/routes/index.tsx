import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
  { id: "intro", label: "Intro" },
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

const DISCIPLINES = [
  {
    no: "01",
    title: "Logo Design",
    sub: "Brand Identity Architecture",
    tag: "Branding",
    desc: "The logo is the visual anchor of corporate authority. I engineer distinctive, scalable identities that ensure brand resonance across every touchpoint.",
    clients: ["SwiftAMS", "Wavox WMS", "Swift AI", "Iksha Lab"],
    accent: "oklch(0.74 0.16 55)",
  },
  {
    no: "02",
    title: "Social Media",
    sub: "Strategic Digital Engagement",
    tag: "Content Design",
    desc: "Sophisticated social assets that respect strict brand guidelines while driving engagement — high-conversion creatives for LinkedIn, Instagram and corporate channels.",
    clients: ["Edu Finn", "SwiftAMS", "Campaigns"],
    accent: "oklch(0.72 0.15 150)",
  },
  {
    no: "03",
    title: "Print Media",
    sub: "Corporate Collateral & Print Assets",
    tag: "Print",
    desc: "Brochures, trade-show standees and executive stationery — print-perfect execution with absolute brand fidelity.",
    clients: ["Brochures", "Standees", "Stationery"],
    accent: "oklch(0.7 0.16 320)",
  },
  {
    no: "04",
    title: "UI / UX",
    sub: "User Interface & Experience",
    tag: "Product Design",
    desc: "Intuitive digital ecosystems built on user-centric information architecture — interfaces that make complex platforms feel calm and accessible.",
    clients: ["Web Apps", "Dashboards", "Design Systems"],
    accent: "oklch(0.7 0.14 200)",
  },
  {
    no: "05",
    title: "Mobile App",
    sub: "Native & Cross-platform Interfaces",
    tag: "Mobile",
    desc: "Mobile flows engineered for clarity at a glance — visual identity, motion and meticulous attention to the small moments that make an app feel premium.",
    clients: ["iOS", "Android", "Prototyping"],
    accent: "oklch(0.7 0.16 30)",
  },
  {
    no: "06",
    title: "Video Editing",
    sub: "Corporate Motion & Production",
    tag: "Motion",
    desc: "End-to-end post-production — corporate storytelling, client testimonials and product demos with narrative pacing, sound design and technical polish.",
    clients: ["Edu Finn", "Swift AMS", "YouTube"],
    accent: "oklch(0.74 0.18 80)",
  },
];

const VIDEOS = [
  { title: "Pathway to France — Neeraj Marwaha", client: "Edu Finn", len: "08:23" },
  { title: "Finland Spouse Visa — Ramanpreet Kaur", client: "Edu Finn", len: "05:15" },
  { title: "Finland Spouse Success Stories 2024", client: "Edu Finn", len: "01:40" },
  { title: "From Studio Sets to Finnish Classrooms", client: "Edu Finn", len: "05:51" },
  { title: "Student Feedback — Study in Finland", client: "Edu Finn", len: "08:12" },
  { title: "Learn, Grow, Lead — Study in Dubai", client: "Edu Finn", len: "00:59" },
  { title: "Lead Migration Across Branches", client: "Swift AMS", len: "00:44" },
  { title: "Infopedia Documents Storage", client: "Swift AMS", len: "01:01" },
  { title: "Swift AMS — Partner of ICEF 2025", client: "Swift AMS", len: "00:28" },
  { title: "Integrated Payment System Launch", client: "Swift AMS", len: "00:40" },
  { title: "Razorpay Integration Reveal", client: "Swift AMS", len: "01:12" },
  { title: "Customizable QR Forms", client: "Swift AMS", len: "00:47" },
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
        <Clients />
        <About />
        <Marquee />
        <Work />
        <Videos />
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
                active === n.id ? "text-accent" : "text-muted-foreground hover:text-foreground"
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
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const words = ["Multidisciplinary", "designer", "shaping", "brands,", "interfaces", "&", "stories."];

  return (
    <section id="intro" ref={ref} className="relative min-h-[100svh] pt-20 pb-24 md:pt-32">
      <motion.div style={{ y, opacity }} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-eyebrow mb-8"
        >
          Hello — Portfolio ’26
        </motion.p>

        <h1 className="text-display text-[clamp(2.5rem,8.5vw,7.5rem)] max-w-[16ch]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block mr-[0.2em]"
            >
              {w === "brands," ? <em className="not-italic text-accent font-display">{w}</em> : w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground">Arbaaz K.</span> — a graphic &
            UI/UX designer with four years of industry experience bridging
            functional design and brand storytelling for EdTech, CRM and
            corporate brands.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              See the work
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
            <a
              href="#contact"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-none absolute -right-20 top-32 -z-10 hidden h-[440px] w-[440px] md:block"
        aria-hidden
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute inset-8 rounded-full border border-accent/40" />
          <div className="absolute inset-20 rounded-full border border-foreground/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-accent" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-6 left-0 right-0 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span>Scroll ↓</span>
        <span className="hidden md:inline">Based in India · Open to opportunities</span>
      </motion.div>
    </section>
  );
}

function Clients() {
  const items = ["SwiftAMS", "Wavox WMS", "Swift AI", "Iksha Lab", "Edu Finn"];
  return (
    <section className="overflow-hidden border-y border-border py-6">
      <div className="flex w-max animate-marquee gap-16">
        {[...items, ...items, ...items, ...items].map((c, i) => (
          <span key={i} className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
            {c} <span className="text-accent ml-16">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">About</p>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            04 years <br /> 6 disciplines <br /> EdTech · CRM · Corporate
          </p>
        </div>
        <div className="md:col-span-8 space-y-8">
          <h2 className="text-display text-[clamp(1.75rem,4vw,3.25rem)]">
            My methodology combines analytical thinking with creative execution — ensuring every project achieves its <em className="text-accent not-italic">business objective</em>, not just its visual one.
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            From corporate branding for SwiftAMS to educational content for
            Edu Finn, I pride myself on clarity, precision and the ability
            to adapt visual language across industries. I'm driven by the
            power of simplicity and meticulous attention to detail.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6 md:grid-cols-3">
            {[
              ["Design", "Brand · Print · Digital"],
              ["Product", "UI · UX · Mobile"],
              ["Motion", "Editing · Storytelling"],
              ["Tools", "Figma · Adobe Suite · AE"],
              ["Industries", "EdTech · CRM · Corporate"],
              ["Based in", "India · Worldwide remote"],
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
  const items = ["Brand Identity", "UI / UX", "Mobile Apps", "Motion", "Print", "Social Media"];
  return (
    <section className="overflow-hidden border-y border-border py-8">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items, ...items].map((w, i) => (
          <span key={i} className="text-display text-4xl md:text-6xl whitespace-nowrap text-muted-foreground">
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
          <p className="text-eyebrow mb-4">Selected disciplines</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] max-w-[16ch]">
            Six disciplines. One craft.
          </h2>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block">
          2021 — 2025
        </p>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {DISCIPLINES.map((p, i) => (
          <ProjectRow key={p.no} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: (typeof DISCIPLINES)[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 md:py-10 cursor-pointer"
    >
      <span className="font-mono text-[11px] text-muted-foreground tabular-nums self-start pt-2">
        {project.no}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="text-display text-[clamp(1.75rem,4.5vw,3.5rem)] transition-transform duration-500 group-hover:-translate-y-0.5">
            {project.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {project.sub}
          </span>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={hover ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.clients.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4 self-start pt-2">
        <span
          className="hidden h-3 w-3 rounded-full md:inline-block transition-transform duration-500 group-hover:scale-150"
          style={{ background: project.accent }}
        />
        <span className="font-mono text-xs transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
          ↗
        </span>
      </div>
    </motion.div>
  );
}

function Videos() {
  return (
    <section id="videos" className="py-24 md:py-40">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-eyebrow mb-4">Motion & Reels</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] max-w-[18ch]">
            Stories edited for <em className="text-accent not-italic">Edu Finn</em> & <em className="text-accent not-italic">Swift AMS</em>.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <motion.a
            key={v.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface p-5 flex flex-col justify-between hover:border-accent transition-colors"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {v.client}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {v.len}
              </span>
            </div>
            <div className="relative">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <span className="text-[10px] translate-x-px">▶</span>
              </div>
              <h3 className="font-display text-lg leading-tight">{v.title}</h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">Say hello</p>
          <p className="font-mono text-xs text-muted-foreground">
            Currently accepting <br /> select projects in <br /> branding, product & motion.
          </p>
        </div>
        <div className="md:col-span-8">
          <h2 className="text-display text-[clamp(2.25rem,7vw,6rem)]">
            Have a project? <br />
            <a href="mailto:arbaazsince2002@gmail.com" className="text-accent link-underline">
              Let's make it.
            </a>
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
        © 2026 Arbaaz K. — Multidisciplinary Designer
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Crafted with care · Made in India
      </p>
    </footer>
  );
}
