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

const WIX = "https://static.wixstatic.com/media/";
const img = (id: string, ext = "png") => `${WIX}${id}~mv2.${ext}`;

const HERO_PORTRAIT = img("89f4f8_1a6d5361f50e4988912ce154eec59bb4");

const LOGOS = [
  { name: "SwiftAMS", src: img("89f4f8_ca3694966e014708a64fce392f994256") },
  { name: "Wavox WMS", src: img("89f4f8_dc2e8c7415af480dbf0ff1b288782e41") },
  { name: "Swift AI", src: img("89f4f8_067511567620442384156a15b1a92717") },
  { name: "Iksha Lab", src: img("89f4f8_c955de43569c4ea2a391790fae2dbc48") },
  { name: "Studio Mark", src: img("89f4f8_d0a2d98c24d24a2eb2e759ed8b36cdc9") },
];

const SOCIAL_CREATIVES = [
  img("89f4f8_7dfa5defb17a4db1a774e31052e6098e"),
  img("89f4f8_14e3bfee31d448f8a43affc2b3786518"),
  img("89f4f8_db1fdbbed02e49b484c2c40123b27f17"),
  img("89f4f8_edceec8f9b084ae1af021b97dd94da59"),
  img("89f4f8_e74f93e691cc4b638f128272313101f0"),
  img("89f4f8_00ff2189148e488ebc998521e3dfe317"),
];

const SOCIAL_POSTS = [
  img("89f4f8_b629170411da4f8fba0ab07aa3be3463"),
  img("89f4f8_2f9473d012c34279a0e5a6e51b2037d5"),
  img("89f4f8_4e58e1505f6744aa9e1f6d4a5df21430"),
  img("89f4f8_24c8d158f87c476ba2bde790f4a960e4"),
  img("89f4f8_aa62a2ab35f84cb9951acde0109d01f4"),
  img("89f4f8_49ab8aa5cf754e40bab22a91e10124ca"),
  img("89f4f8_a4af0589cfd549f6a7ce2a3497d6149d"),
  img("89f4f8_c2b6db8b191d4944a9edf3e2845ef76a"),
  img("89f4f8_73ada136934540669bb36f4242bba3fb"),
  img("89f4f8_6c619e9ba1264f8080325cc5eeb2bd19"),
];

const BROCHURES = [
  img("89f4f8_6ceabb91279d41d991e2f6da03a793fa"),
  img("89f4f8_a12da84b6521462c82d14b55cf229c6b"),
  img("89f4f8_147d767cfa9c4b4cab1f36c307483ef7"),
  img("89f4f8_58e960961a8c491cb7dcb544035fb8db"),
  img("89f4f8_2479f252d6af47cfbc89002595ae0de6"),
];

const STANDEES = [
  img("89f4f8_fa830e7a072c432d92f66b2f0ef004a4"),
  img("89f4f8_753de6d611bf45dc8c4a90a34b4aa456"),
  img("89f4f8_a9cdaad81e9c4ad9a0f505eb3829646b"),
];

const MOBILE_HERO = img("89f4f8_e88c580aba884863b5b0a88aac1da855");
const MOBILE_MAIN = img("89f4f8_e02e89de86d549ef9491cbd642c300c0");
const MOBILE_SCREENS = [
  img("89f4f8_ea492223989943ea94abeeee8b285a2a"),
  img("89f4f8_85f6f09987fa469ab6e7728662f9eb41"),
  img("89f4f8_96b6d7c6da044e5e8020b3851cb9ed32"),
  img("89f4f8_62c70309b2084d79b43f1bde5e0e7c34"),
  img("89f4f8_e97d8c214ec346d799428ddb6e0a8ba8"),
  img("89f4f8_29cd3ceb2de540099ec98ff8669acbd3"),
  img("89f4f8_c067b70bc9d54813ba0f1483bd495c89"),
  img("89f4f8_2a2a933d6cb146748289c3c7cfd0496c"),
];

const WEB_HERO = img("89f4f8_ee57029d078240ca8c3c9e1ed40e7604");
const VIDEO_FRAME = img("89f4f8_6a0b4184fb1e475fb76eeffc8953ce23");

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
  const [dark, setDark] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

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
        <Work onOpen={setLightbox} />
        <Videos />
        <Contact />
        <Footer />
      </main>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function Nav({ active, dark, setDark }: { active: string; dark: boolean; setDark: (v: boolean) => void }) {
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
      <motion.div style={{ y, opacity }} className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-eyebrow mb-8"
          >
            Hello — Portfolio ’26
          </motion.p>

          <h1 className="text-display text-[clamp(2.5rem,7.5vw,6.5rem)] max-w-[16ch]">
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
            className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end"
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
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[360px] md:max-w-[420px]"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-3xl" />
          <div className="absolute inset-2 -z-10 rounded-[1.75rem] border border-accent/30" />
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
            <img
              src={HERO_PORTRAIT}
              alt="Arbaaz K. — portrait"
              className="block h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -right-6 -top-6 h-20 w-20"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="h-full w-full fill-foreground">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="font-mono" fontSize="9.5" letterSpacing="2">
                <textPath href="#circle">CREATIVE · DESIGNER · 2026 · </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>
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
  const items = LOGOS.map((l) => l.name);
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

function SectionHeader({ no, eyebrow, title, sub }: { no: string; eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-t border-border pt-8">
      <div>
        <p className="text-eyebrow mb-3">
          <span className="text-accent">{no}</span> — {eyebrow}
        </p>
        <h3 className="text-display text-[clamp(1.75rem,4.5vw,3.25rem)] max-w-[20ch]">{title}</h3>
      </div>
      <p className="hidden max-w-sm text-sm text-muted-foreground md:block">{sub}</p>
    </div>
  );
}

function Tile({
  src,
  alt,
  className = "",
  onOpen,
  ratio = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  onOpen: (s: string) => void;
  ratio?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(src)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`group relative ${ratio} overflow-hidden rounded-xl border border-border bg-surface ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-[10px] opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">↗</span>
    </motion.button>
  );
}

function Work({ onOpen }: { onOpen: (s: string) => void }) {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-eyebrow mb-4">Selected disciplines</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] max-w-[16ch]">
            Six disciplines. <span className="text-accent">One craft.</span>
          </h2>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:block">
          2021 — 2025
        </p>
      </div>

      {/* 01 — Logo Design */}
      <SectionHeader
        no="01"
        eyebrow="Logo Design"
        title="Brand identity architecture."
        sub="Distinctive, scalable identities engineered for resonance — built for SwiftAMS, Wavox WMS, Swift AI and Iksha Lab."
      />
      <div className="mb-24 grid gap-4 grid-cols-2 md:grid-cols-5">
        {LOGOS.map((l) => (
          <motion.button
            key={l.name}
            type="button"
            onClick={() => onOpen(l.src)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface p-6 flex items-center justify-center hover:border-accent transition-colors"
          >
            <img src={l.src} alt={l.name} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{l.name}</span>
          </motion.button>
        ))}
      </div>

      {/* 02 — Social Media */}
      <SectionHeader
        no="02"
        eyebrow="Social Media"
        title="Strategic digital engagement."
        sub="High-conversion creatives for LinkedIn, Instagram and corporate channels — sophisticated assets that respect strict brand guidelines."
      />
      <div className="mb-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {SOCIAL_CREATIVES.map((s, i) => (
          <Tile key={s} src={s} alt={`Social creative ${i + 1}`} onOpen={onOpen} />
        ))}
      </div>
      <p className="text-eyebrow mb-4">Posts</p>
      <div className="mb-24 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {SOCIAL_POSTS.map((s, i) => (
          <Tile key={s} src={s} alt={`Social post ${i + 1}`} onOpen={onOpen} />
        ))}
      </div>

      {/* 03 — Print Media */}
      <SectionHeader
        no="03"
        eyebrow="Print Media"
        title="Corporate collateral & print assets."
        sub="Brochures, trade-show standees and executive stationery — print-perfect execution with absolute brand fidelity."
      />
      <p className="text-eyebrow mb-4">Brochure Design</p>
      <div className="mb-10 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {BROCHURES.map((s, i) => (
          <Tile key={s} src={s} alt={`Brochure ${i + 1}`} onOpen={onOpen} ratio="aspect-[3/2]" />
        ))}
      </div>
      <p className="text-eyebrow mb-4">Standee Design</p>
      <div className="mb-24 grid gap-4 grid-cols-2 md:grid-cols-3">
        {STANDEES.map((s, i) => (
          <Tile key={s} src={s} alt={`Standee ${i + 1}`} onOpen={onOpen} ratio="aspect-[3/4]" />
        ))}
      </div>

      {/* 04 — UI/UX */}
      <SectionHeader
        no="04"
        eyebrow="UI / UX"
        title="User interface & experience."
        sub="Intuitive digital ecosystems built on user-centric information architecture — interfaces that make complex platforms feel calm."
      />
      <div className="mb-24 grid gap-4 md:grid-cols-2">
        <Tile src={MOBILE_HERO} alt="App design" onOpen={onOpen} ratio="aspect-[4/3]" />
        <Tile src={WEB_HERO} alt="Web design — MacBook" onOpen={onOpen} ratio="aspect-[4/3]" />
      </div>

      {/* 05 — Mobile App */}
      <SectionHeader
        no="05"
        eyebrow="Mobile App"
        title="Native & cross-platform flows."
        sub="Mobile flows engineered for clarity at a glance — identity, motion and meticulous attention to the small moments."
      />
      <div className="mb-10">
        <Tile src={MOBILE_MAIN} alt="Mobile main design" onOpen={onOpen} ratio="aspect-[16/10]" />
      </div>
      <div className="mb-24 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
        {MOBILE_SCREENS.map((s, i) => (
          <Tile key={s} src={s} alt={`Mobile screen ${i + 1}`} onOpen={onOpen} ratio="aspect-[9/19]" />
        ))}
      </div>

      {/* 06 — Video */}
      <SectionHeader
        no="06"
        eyebrow="Video Editing"
        title="Corporate motion & production."
        sub="End-to-end post-production — corporate storytelling, testimonials and product demos for Edu Finn and Swift AMS."
      />
      <div className="mb-4">
        <Tile src={VIDEO_FRAME} alt="Video editing showcase" onOpen={onOpen} ratio="aspect-[16/9]" />
      </div>
    </section>
  );
}

function Videos() {
  return (
    <section id="videos" className="py-24 md:py-32">
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
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent transition-colors"
          >
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt={v.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-background/95 text-foreground transition-transform group-hover:scale-110">
                <span className="translate-x-px text-base">▶</span>
              </span>
            </div>
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 text-white">
              <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                {v.client}
              </span>
              <span className="rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">
                {v.len}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <h3 className="font-display text-base leading-tight line-clamp-2">{v.title}</h3>
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

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
    >
      <button
        onClick={onClose}
        className="absolute right-6 top-6 h-10 w-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        ✕
      </button>
      <motion.img
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
      />
    </motion.div>
  );
}
