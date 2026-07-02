import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent, type ComponentType } from "react";
import {
  Sparkles, PenTool, Share2, Printer, Layout, Smartphone, Film,
  Briefcase, Layers, Clapperboard, Wrench, Building2, MapPin,
  Download, MessageCircle, X, Play, Plus, ArrowUpRight, Mail,
  Linkedin, Instagram, Sun, Moon, ArrowRight, FileText, Menu,
  ChevronLeft, ChevronRight, Hexagon, MessageSquare, Network, Coffee, Atom, Heart, Send, Bookmark
} from "lucide-react";
import { Magnetic } from "@/components/reactbits/Magnetic";
import { Reveal } from "@/components/reactbits/Reveal";
import { CountUp } from "@/components/reactbits/CountUp";




export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arbaaz — Product Designer | UI/UX & Visual Designer" },
      { name: "description", content: "Portfolio of Arbaaz — Product Designer with 4.5+ years crafting SaaS products, CRM platforms, responsive websites, dashboards and brand systems, powered by AI-assisted workflows." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "intro", label: "Index" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];



const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arbaaz-designer" },
  { label: "Portfolio", href: "https://arbaazcodes.github.io" },
  { label: "Email", href: "mailto:arbaazsince2002@gmail.com" },
  { label: "Phone", href: "tel:+918527766839" },
];

import logoSwiftAms from "@/assets/logo-swift-ams.png";
import logoWavox from "@/assets/logo-wavox.png";
import logoAiSwift from "@/assets/logo-ai-swift.png";
import logoKsha from "@/assets/logo-ksha.png";
import logoDigitalCappuccino from "@/assets/logo-digital-cappuccino.png";
import logoEduFinn from "@/assets/logo-edu-finn.png";
import arbaazHero from "@/assets/arbaaz-hero.png";

// Real brochure PDFs → rasterized page images
const brochurePages = import.meta.glob<string>(
  "../assets/brochures/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);


const brochurePageUrl = (file: string): string => {
  const entry = Object.entries(brochurePages).find(([k]) => k.endsWith(`/${file}`));
  if (!entry) { if (typeof window !== 'undefined') console.warn('[brochure] miss', file, Object.keys(brochurePages).length); return ""; }
  return entry[1];
};
type Brochure = { id: string; name: string; tagline: string; cover: string; pages: string[] };
const BROCHURES: Brochure[] = [
  { id: "crown", name: "Crown Milk", tagline: "Dairy · Manufacturer & Exporter Brochure",
    cover: brochurePageUrl("drive_crown_1.jpg"),
    pages: [2,3,4].map((n)=>brochurePageUrl(`drive_crown_${n}.jpg`)) },

  { id: "metro", name: "Metropolia", tagline: "Study in Finland · University Brochure",
    cover: brochurePageUrl("drive_metropolia_1.png"),
    pages: [brochurePageUrl("drive_metropolia_2.png")] },

  { id: "tutku", name: "Turku", tagline: "Tampere University · PG Diploma Brochure",
    cover: brochurePageUrl("drive_turku_1.png"),
    pages: [brochurePageUrl("drive_turku_2.png")] },

  { id: "edufinn", name: "Edu Finn", tagline: "Study in Finland · Program Brochure",
    cover: brochurePageUrl("drive_edufinn_1.png"),
    pages: [2,3,4].map((n)=>brochurePageUrl(`drive_edufinn_${n}.png`)) },

  { id: "swiftams", name: "Swift AMS", tagline: "SaaS · Product Brochure",
    cover: brochurePageUrl("drive_swiftams_1.jpg"),
    pages: [2,3,4,5,6,7,8].map((n)=>brochurePageUrl(`drive_swiftams_${n}.jpg`)) },

];

const LOGOS: { name: string; src: string }[] = [
  { name: "Swift AMS", src: logoSwiftAms },
  { name: "Wavox WMS", src: logoWavox },
  { name: "Ai SWIFT", src: logoAiSwift },
  { name: "KSHA LABS", src: logoKsha },
  { name: "Digital Cappuccino Enterprises", src: logoDigitalCappuccino },
  { name: "Edu Finn", src: logoEduFinn },
];

type Discipline = {
  no: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
  meta: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
};

const DISCIPLINES: Discipline[] = [
  { no: "01", title: "Brand Identity", sub: "Logos & visual systems", Icon: PenTool,
    desc: "Distinctive, scalable identities engineered for resonance across every touchpoint — built for SwiftAMS, Wavox, Swift AI and Iksha Lab.",
    tags: ["Logo", "Identity", "Typography"], meta: "15 marks · 6 systems" },
  { no: "02", title: "Social Media", sub: "Campaigns & content design", Icon: Share2,
    desc: "High-conversion creatives for LinkedIn, Instagram and corporate channels — sophisticated assets that respect strict brand guidelines.",
    tags: ["Campaigns", "Reels", "Carousels"], meta: "200+ posts shipped" },
  { no: "03", title: "Print Media", sub: "Brochures, standees & collateral", Icon: Printer,
    desc: "Brochures, trade-show standees and executive stationery — print-perfect execution with absolute brand fidelity.",
    tags: ["Brochure", "Standee", "Stationery"], meta: "Print-ready · CMYK" },
  { no: "04", title: "UI / UX", sub: "Web platforms & dashboards", Icon: Layout,
    desc: "Intuitive digital ecosystems built on user-centric architecture — interfaces that make complex platforms feel calm and accessible.",
    tags: ["Web", "Dashboard", "Design System"], meta: "12 products" },
  { no: "05", title: "Mobile App", sub: "Native & cross-platform", Icon: Smartphone,
    desc: "Mobile flows engineered for clarity at a glance — identity, motion and meticulous attention to the small moments.",
    tags: ["iOS", "Android", "Prototyping"], meta: "5 apps · 80+ screens" },
  { no: "06", title: "Motion & Video", sub: "Corporate storytelling", Icon: Film,
    desc: "End-to-end post-production — corporate storytelling, testimonials and product demos for Edu Finn and Swift AMS.",
    tags: ["Editing", "Reels", "Motion GFX"], meta: "15+ films" },
];


type GalleryItem = { id: string; label: string; category: string; ratio: string; variant: 1 | 2 | 3; src?: string };

// Real assets extracted from arbaazsince2002.wixsite.com/arbaaz-portfolio
const wix = (hash: string, _w = 900, _ext: "png" | "jpg" = "png") =>
  `https://static.wixstatic.com/media/${hash}`;

const GALLERY: GalleryItem[] = [
  // Brand & Logos — real client identities from the old portfolio
  
  { id: "b2", label: "SwiftAMS · Identity",    category: "Brand",  ratio: "aspect-[16/9]",  variant: 2, src: wix("89f4f8_ca3694966e014708a64fce392f994256~mv2.png") },
  { id: "b3", label: "Wavox WMS · Logo",       category: "Brand",  ratio: "aspect-[16/9]",  variant: 3, src: wix("89f4f8_dc2e8c7415af480dbf0ff1b288782e41~mv2.png") },
  { id: "b4", label: "Swift AI · Mark",        category: "Brand",  ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_067511567620442384156a15b1a92717~mv2.png") },
  { id: "b5", label: "Iksha Lab · Identity",   category: "Brand",  ratio: "aspect-[16/9]",  variant: 2, src: wix("89f4f8_c955de43569c4ea2a391790fae2dbc48~mv2.png") },

  // Social Media — posters & campaign creatives (numbered, S-series, E-series)
  { id: "s1",  label: "Social Poster · 01",    category: "Social", ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_e74f93e691cc4b638f128272313101f0~mv2.png") },
  { id: "s2",  label: "Social Poster · 02",    category: "Social", ratio: "aspect-[4/5]",   variant: 2, src: wix("89f4f8_14e3bfee31d448f8a43affc2b3786518~mv2.png") },
  { id: "s4",  label: "Social Poster · 04",    category: "Social", ratio: "aspect-[4/5]",   variant: 3, src: wix("89f4f8_db1fdbbed02e49b484c2c40123b27f17~mv2.png") },
  { id: "s5",  label: "Social Poster · 05",    category: "Social", ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_00ff2189148e488ebc998521e3dfe317~mv2.png") },
  { id: "s6",  label: "Social Poster · 06",    category: "Social", ratio: "aspect-[4/5]",   variant: 2, src: wix("89f4f8_edceec8f9b084ae1af021b97dd94da59~mv2.png") },
  { id: "ss1", label: "Campaign · S1",         category: "Social", ratio: "aspect-[4/5]",   variant: 3, src: wix("89f4f8_49ab8aa5cf754e40bab22a91e10124ca~mv2.png") },
  { id: "ss2", label: "Campaign · S2",         category: "Social", ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_c2b6db8b191d4944a9edf3e2845ef76a~mv2.png") },
  { id: "ss3", label: "Campaign · S3",         category: "Social", ratio: "aspect-[4/5]",   variant: 2, src: wix("89f4f8_6c619e9ba1264f8080325cc5eeb2bd19~mv2.png") },
  { id: "ss4", label: "Campaign · S4",         category: "Social", ratio: "aspect-[4/5]",   variant: 3, src: wix("89f4f8_2f9473d012c34279a0e5a6e51b2037d5~mv2.png") },
  { id: "ss5", label: "Campaign · S5",         category: "Social", ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_24c8d158f87c476ba2bde790f4a960e4~mv2.png") },
  { id: "se1", label: "Edu Finn · E1",         category: "Social", ratio: "aspect-[4/5]",   variant: 2, src: wix("89f4f8_a4af0589cfd549f6a7ce2a3497d6149d~mv2.png") },
  { id: "se2", label: "Edu Finn · E2",         category: "Social", ratio: "aspect-[4/5]",   variant: 3, src: wix("89f4f8_4e58e1505f6744aa9e1f6d4a5df21430~mv2.png") },
  { id: "se3", label: "Edu Finn · E3",         category: "Social", ratio: "aspect-[4/5]",   variant: 1, src: wix("89f4f8_aa62a2ab35f84cb9951acde0109d01f4~mv2.png") },
  { id: "se4", label: "Edu Finn · E4",         category: "Social", ratio: "aspect-[4/5]",   variant: 2, src: wix("89f4f8_b629170411da4f8fba0ab07aa3be3463~mv2.png") },
  { id: "se5", label: "Edu Finn · E5",         category: "Social", ratio: "aspect-[4/5]",   variant: 3, src: wix("89f4f8_73ada136934540669bb36f4242bba3fb~mv2.png") },

  // Print Media — brochures, covers & standees (print materials)
  { id: "p1", label: "Brochure · Spread 01",   category: "Print",  ratio: "aspect-[3/2]",   variant: 1, src: wix("89f4f8_58e960961a8c491cb7dcb544035fb8db~mv2.png") },
  { id: "p2", label: "Brochure · Spread 03",   category: "Print",  ratio: "aspect-[3/2]",   variant: 2, src: wix("89f4f8_2479f252d6af47cfbc89002595ae0de6~mv2.png") },
  { id: "p3", label: "Brochure · Spread 05",   category: "Print",  ratio: "aspect-[3/2]",   variant: 3, src: wix("89f4f8_147d767cfa9c4b4cab1f36c307483ef7~mv2.png") },
  { id: "p4", label: "Brochure · Cover",       category: "Print",  ratio: "aspect-[3/2]",   variant: 1, src: wix("89f4f8_a12da84b6521462c82d14b55cf229c6b~mv2.png") },
  { id: "p5", label: "Brochure · Mini",        category: "Print",  ratio: "aspect-[3/2]",   variant: 2, src: wix("89f4f8_6ceabb91279d41d991e2f6da03a793fa~mv2.png") },
  { id: "p6", label: "Standee · 01",           category: "Print",  ratio: "aspect-[3/4]",   variant: 3, src: wix("89f4f8_753de6d611bf45dc8c4a90a34b4aa456~mv2.png") },
  { id: "p7", label: "Standee · 02",           category: "Print",  ratio: "aspect-[3/4]",   variant: 1, src: wix("89f4f8_a9cdaad81e9c4ad9a0f505eb3829646b~mv2.png") },
  { id: "p8", label: "Standee · 03",           category: "Print",  ratio: "aspect-[3/4]",   variant: 2, src: wix("89f4f8_fa830e7a072c432d92f66b2f0ef004a4~mv2.png") },

  // UI / UX — web platforms & dashboards
  { id: "u1", label: "Marketing Landing",      category: "UI/UX",  ratio: "aspect-[16/10]", variant: 1, src: wix("89f4f8_6a0b4184fb1e475fb76eeffc8953ce23~mv2.png") },
  { id: "u2", label: "MacBook · Showcase",     category: "UI/UX",  ratio: "aspect-[16/10]", variant: 2, src: wix("89f4f8_ee57029d078240ca8c3c9e1ed40e7604~mv2.png") },
  

  // Mobile App — full app screens
  { id: "m1", label: "Mobile App · Hero",      category: "Mobile", ratio: "aspect-[9/16]",  variant: 1, src: wix("89f4f8_e88c580aba884863b5b0a88aac1da855~mv2.png") },
  { id: "m2", label: "Mobile · Screen 02",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 2, src: wix("89f4f8_96b6d7c6da044e5e8020b3851cb9ed32~mv2.png") },
  { id: "m3", label: "Mobile · Screen 03",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 3, src: wix("89f4f8_e97d8c214ec346d799428ddb6e0a8ba8~mv2.png") },
  { id: "m4", label: "Mobile · Screen 04",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 1, src: wix("89f4f8_c067b70bc9d54813ba0f1483bd495c89~mv2.png") },
  { id: "m5", label: "Mobile · Screen 05",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 2, src: wix("89f4f8_85f6f09987fa469ab6e7728662f9eb41~mv2.png") },
  { id: "m6", label: "Mobile · Screen 06",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 3, src: wix("89f4f8_62c70309b2084d79b43f1bde5e0e7c34~mv2.png") },
  { id: "m7", label: "Mobile · Screen 07",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 1, src: wix("89f4f8_29cd3ceb2de540099ec98ff8669acbd3~mv2.png") },
  { id: "m8", label: "Mobile · Screen 08",     category: "Mobile", ratio: "aspect-[9/16]",  variant: 2, src: wix("89f4f8_2a2a933d6cb146748289c3c7cfd0496c~mv2.png") },
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
  | { kind: "image"; item: GalleryItem; list?: GalleryItem[]; index?: number }
  | { kind: "video"; item: (typeof VIDEOS)[number] }
  | null;

function Portfolio() {
  const [active, setActive] = useState("intro");
  const [dark, setDark] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

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
    <div className="grain relative min-h-screen text-foreground">
      <ScrollProgress />
      <AmbientOrbs />
      <Cursor />
      <Nav active={active} dark={dark} setDark={setDark} />
      <SideRail />
      <main className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <Hero />
        <Marquee items={LOGOS} />
        <BigTextBanner text="Design · Direction · Detail" />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Work />
        <Gallery onOpen={(item, list, index) => setLightbox({ kind: "image", item, list, index })} />
        <Videos onOpen={(item) => setLightbox({ kind: "video", item })} />
        <BigTextBanner text="Available for work — 2026" />
        <Contact />

        <Footer />
      </main>
      <QuickChatFab />

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key={lightbox.kind === "image" ? lightbox.item.id : lightbox.item.id}
            state={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={(dir) => {
              setLightbox((prev) => {
                if (!prev || prev.kind !== "image" || !prev.list || prev.index == null) return prev;
                const next = (prev.index + dir + prev.list.length) % prev.list.length;
                return { kind: "image", item: prev.list[next], list: prev.list, index: next };
              });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Scroll progress + editorial marquee banner ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      style={{ width }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-foreground/70"
      aria-hidden
    />
  );
}

function BigTextBanner({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const loop = Array.from({ length: 4 });
  return (
    <section ref={ref} aria-hidden className="relative -mx-6 my-16 overflow-hidden py-6 md:-mx-12 md:my-24 lg:-mx-20">
      <motion.div style={{ x }} className="flex whitespace-nowrap gap-14 text-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-foreground/[0.08]">
        {loop.map((_, i) => (
          <span key={i} className="inline-flex items-center gap-14">
            {text}
            <span className="inline-block h-3 w-3 rounded-full bg-highlight/60 align-middle" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- Ambient + Cursor (monochrome) ---------- */

function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-foreground/[0.04] blur-[120px] animate-orb" />
      <div className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-foreground/[0.03] blur-[120px] animate-orb" style={{ animationDelay: "-7s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-foreground/[0.03] blur-[120px] animate-orb" style={{ animationDelay: "-14s" }} />
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

function Nav({ active, dark, setDark }: { active: string; dark: boolean; setDark: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide on scroll down (past 120px), reveal on scroll up. Never hide while menus open.
      const delta = y - lastY.current;
      if (!open && !deskOpen && y > 120 && delta > 6) setHidden(true);
      else if (delta < -4 || y < 60) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open, deskOpen]);
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-4 z-50 px-4 md:top-6"
    >
      <div className={`mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-full glass px-3 py-2 md:px-4 transition-shadow duration-500 ${scrolled ? "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5" : ""}`}>
        <a href="#intro" className="flex items-center gap-2 pl-3 pr-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
            <span className="font-display text-sm font-semibold">a</span>
            <span className="pulse-ring absolute inset-0 rounded-full" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">arbaaz/2026</span>
        </a>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <button
              onClick={() => setDeskOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={deskOpen}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-foreground hover:bg-foreground/10 transition-colors"
            >
              <Menu size={13} />
              <span>{NAV.find((n) => n.id === active)?.label ?? "Menu"}</span>
            </button>
            <AnimatePresence>
              {deskOpen && (
                <>
                  <button
                    aria-label="Close menu"
                    onClick={() => setDeskOpen(false)}
                    className="fixed inset-0 z-[54] cursor-default"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    role="menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-[56] min-w-[220px] rounded-2xl border border-border/60 bg-popover p-1.5 shadow-2xl backdrop-blur-md"
                  >
                    {NAV.map((n) => (
                      <a
                        key={n.id}
                        href={`#${n.id}`}
                        role="menuitem"
                        onClick={() => setDeskOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors ${
                          active === n.id ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        <span>{n.label}</span>
                        <ArrowUpRight size={13} className="opacity-40" />
                      </a>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="h-9 w-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link
            to="/resume"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-background hover:bg-foreground/85 transition-colors"
          >
            <FileText size={13} /> Resume
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden h-9 w-9 rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-20 rounded-3xl card-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-8 w-8 rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10"
                >
                  <X size={14} />
                </button>
              </div>
              <nav className="mt-4 flex flex-col">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl transition-colors ${
                      active === n.id ? "bg-foreground/5 text-foreground" : "text-foreground/80 hover:bg-foreground/5"
                    }`}
                  >
                    <span>{n.label}</span>
                    <ArrowUpRight size={18} className="opacity-50" />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + NAV.length * 0.04 }}
                >
                  <Link
                    to="/resume"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl text-foreground/80 hover:bg-foreground/5"
                  >
                    <span className="inline-flex items-center gap-2"><FileText size={18} /> Resume</span>
                    <ArrowUpRight size={18} className="opacity-50" />
                  </Link>
                </motion.div>
              </nav>
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-background"
              >
                <FileText size={13} /> Resume
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
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

function Placeholder({ label, ratio = "aspect-video", variant = 1, badge, src, fit = "cover" }: { label: string; ratio?: string; variant?: 1 | 2 | 3; badge?: string; src?: string; fit?: "cover" | "contain" }) {
  const grad = variant === 1 ? "placeholder-grad" : variant === 2 ? "placeholder-grad-2" : "placeholder-grad-3";
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Cached/eagerly-loaded images can complete before React attaches onLoad.
    if (imgRef.current && imgRef.current.complete) setLoaded(true);
  }, [src]);
  return (
    <div className={`group/ph relative ${ratio} w-full overflow-hidden rounded-2xl border border-border/60 ${src ? "bg-foreground/[0.04]" : grad}`}>
      {src ? (
        <>
          {!loaded && <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />}
          <img
            ref={imgRef}
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={`absolute inset-0 h-full w-full ${fit === "contain" ? "object-contain p-4" : "object-cover"} transition-opacity duration-500 group-hover/ph:scale-[1.04] ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, transparent 40%, oklch(1 0 0 / 0.05) 41%, transparent 42%), radial-gradient(circle at 50% 50%, transparent 60%, oklch(1 0 0 / 0.04) 61%, transparent 62%)",
          }} />
          <div className="absolute inset-0 animate-shine" />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[10px] font-mono uppercase tracking-[0.25em] text-white">
        <span className="rounded-full bg-black/55 px-2 py-1 backdrop-blur">{badge ?? "Work"}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover/ph:opacity-100">
        <p className="font-display text-sm text-white">{label}</p>
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

  const words = ["Product", "designer", "shaping", "SaaS,", "dashboards", "&", "brands."];

  return (
    <section id="intro" ref={ref} className="relative pt-32 pb-16 md:pt-40 md:pb-20">
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
                initial={{ opacity: 0, y: 40, rotateX: 60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="mr-[0.18em] inline-block"
                style={{ transformOrigin: "50% 100%" }}
              >
                {w === "SaaS," ? <em className="text-highlight italic">{w}</em> : w}
              </motion.span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              I'm <span className="text-foreground">Arbaaz</span> — a Product Designer with 4.5+ years designing SaaS products, CRM platforms, dashboards and digital experiences, blending UX research, design systems and AI-assisted workflows.
            </p>
            <div className="flex items-center gap-4">
              <Magnetic strength={14} padding={20}>
                <a href="#work" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm text-background transition-transform hover:scale-[1.02]">
                  <span className="relative z-10">See the work</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </Magnetic>
              <Magnetic strength={8} padding={12}>
                <a href="#contact" className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                  Get in touch
                </a>
              </Magnetic>
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
            <div className="absolute inset-0 rounded-[2rem] bg-white glow-ring overflow-hidden border border-foreground/10">
              <img
                src={arbaazHero}
                alt="Arbaaz K. — portrait"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-5 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">Designer · Portrait</p>
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
        <span className="hidden md:inline">Gurugram, Haryana · Remote worldwide</span>
      </motion.div>
    </section>
  );
}

/* ---------- Logo Scroller ---------- */

type LogoItem = { name: string; src: string };

function Marquee({ items }: { items: LogoItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const loop = [...items, ...items, ...items];

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (!paused && el) {
        el.scrollLeft += 0.6;
        const max = el.scrollWidth / 3;
        if (el.scrollLeft >= max * 2) el.scrollLeft -= max;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section
      className="relative -mx-6 py-10 md:-mx-12 lg:-mx-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <button
        type="button"
        aria-label="Scroll logos left"
        onClick={() => scrollBy(-1)}
        className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:scale-105 hover:bg-foreground hover:text-background md:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll logos right"
        onClick={() => scrollBy(1)}
        className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lg transition hover:scale-105 hover:bg-foreground hover:text-background md:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto px-6 md:px-20"
        style={{ scrollbarWidth: "none" }}
      >
        {loop.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="group relative flex h-32 w-[280px] shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-white px-8 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.28)] dark:bg-white md:h-36 md:w-[320px]"
          >
            <img
              src={c.src}
              alt={c.name}
              loading="lazy"
              className="max-h-20 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06] md:max-h-24"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition duration-500 group-hover:ring-highlight/45" />
          </motion.div>
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
          <Tilt strength={10} className="relative aspect-[4/5] w-full max-w-[320px]">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-foreground/10 bg-white glow-ring">
              <img
                src={arbaazHero}
                alt="Arbaaz K. — about portrait"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/75">About</p>
                <p className="font-display text-xl">Arbaaz K.</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute -right-6 -top-6 h-20 w-20"
              style={{ transform: "translateZ(60px)" }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full fill-foreground">
                <defs><path id="cabout" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                <text fontSize="9" letterSpacing="2" className="font-mono">
                  <textPath href="#cabout">DESIGN · CRAFT · MOTION · </textPath>
                </text>
              </svg>
            </motion.div>
            <div className="absolute -inset-2 -z-10 rounded-[2rem] border border-foreground/10" />
          </Tilt>
        </div>

        <div className="space-y-10 md:col-span-8">
          <Reveal as="h2" className="text-display text-[clamp(1.85rem,4vw,3.5rem)]">
            User-centered design meets <em className="text-highlight italic">measurable business impact</em> — from research to developer handoff.
          </Reveal>
          <Reveal as="p" delay={0.08} className="max-w-xl leading-relaxed text-muted-foreground">
            From CRM dashboards and SaaS modules for SwiftAMS to brand systems, brochures and campaign creative for Edu Finn and Digital Cappuccino, I design responsive products and identities that are clear, accessible and shipped end-to-end — accelerated by AI-powered workflows.
          </Reveal>

          <div className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-3">
            {([
              ["Product", "SaaS · CRM · Dashboards", Layers],
              ["UX", "Research · Flows · Prototypes", Sparkles],
              ["Visual", "Brand · Print · Social", PenTool],
              ["AI Workflow", "Figma AI · Cursor · Lovable", Atom],
              ["Tools", "Figma · Adobe CS · Canva", Wrench],
              ["Based in", "Gurugram, IN · Remote", MapPin],
            ] as const).map(([k, v, Icon], i) => (
              <Reveal key={k} delay={0.05 * i} y={14} blur={6}>
                <div className="card-white rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground">
                    <Icon size={15} />
                  </div>
                  <p className="text-eyebrow mb-1">{k}</p>
                  <p className="text-sm">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats ---------- */

function Stats() {
  const highlights = [
    "Shipped SaaS, CRM & dashboard modules end-to-end",
    "150+ marketing creatives, brochures & landing pages",
    "AI-assisted workflows for ideation, UI & content",
  ];
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card-white rounded-3xl p-8 md:p-12"
      >
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[color:var(--highlight)]" style={{ background: "color-mix(in oklab, var(--highlight) 14%, transparent)" }}>
              <Sparkles size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Experience</span>
            </div>
            <p className="text-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.9]">
              <CountUp end={4.5} decimals={1} /><span className="text-highlight">+</span>
            </p>
            <p className="text-eyebrow mt-3">Years designing products & brands</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
              4.5+ years designing <em className="text-highlight not-italic font-medium">SaaS products, CRM platforms, dashboards and responsive websites</em> — from UX research and wireframes to high-fidelity UI, design systems and developer handoff.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-1">
              {highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--highlight)]" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Skills ---------- */

import figmaLogo from "@/assets/tools/figma.png";
import photoshopLogo from "@/assets/tools/photoshop.png";
import illustratorLogo from "@/assets/tools/illustrator.png";
import indesignLogo from "@/assets/tools/indesign.png";
import xdLogo from "@/assets/tools/xd.png";
import premiereproLogo from "@/assets/tools/premierepro.png";
import aftereffectsLogo from "@/assets/tools/aftereffects.png";
import canvaLogo from "@/assets/tools/canva.jpg";
import coreldrawLogo from "@/assets/tools/coreldraw.jpg";
import chatgptLogo from "@/assets/tools/chatgpt.png";
import claudeLogo from "@/assets/tools/claude.png";
import geminiLogo from "@/assets/tools/gemini.jpg";
import cursorLogo from "@/assets/tools/cursor.png";
import lovableLogo from "@/assets/tools/lovable.jpg";
import midjourneyLogo from "@/assets/tools/midjourney.png";

const TOOL_LOGOS: Record<string, string> = {
  "Figma": figmaLogo,
  "Adobe Photoshop": photoshopLogo,
  "Adobe Illustrator": illustratorLogo,
  "Adobe InDesign": indesignLogo,
  "Adobe XD": xdLogo,
  "Adobe Premiere Pro": premiereproLogo,
  "Adobe After Effects": aftereffectsLogo,
  "Canva": canvaLogo,
  "CorelDRAW": coreldrawLogo,
  "ChatGPT": chatgptLogo,
  "Claude": claudeLogo,
  "Gemini": geminiLogo,
  "Adobe Firefly": photoshopLogo,
  "Figma AI": figmaLogo,
  "Canva AI": canvaLogo,
  "Cursor": cursorLogo,
  "Lovable": lovableLogo,
  "Midjourney": midjourneyLogo,
};

const TOOL_LINKS: Record<string, string> = {
  "Figma": "https://www.figma.com/",
  "Adobe Photoshop": "https://www.adobe.com/products/photoshop.html",
  "Adobe Illustrator": "https://www.adobe.com/products/illustrator.html",
  "Adobe InDesign": "https://www.adobe.com/products/indesign.html",
  "Adobe XD": "https://www.adobe.com/products/xd.html",
  "Adobe Premiere Pro": "https://www.adobe.com/products/premiere.html",
  "Adobe After Effects": "https://www.adobe.com/products/aftereffects.html",
  "Canva": "https://www.canva.com/",
  "CorelDRAW": "https://www.coreldraw.com/",
  "ChatGPT": "https://chat.openai.com/",
  "Claude": "https://claude.ai/",
  "Gemini": "https://gemini.google.com/",
  "Adobe Firefly": "https://www.adobe.com/products/firefly.html",
  "Figma AI": "https://www.figma.com/ai/",
  "Canva AI": "https://www.canva.com/ai/",
  "Cursor": "https://cursor.com/",
  "Lovable": "https://lovable.dev/",
  "Midjourney": "https://www.midjourney.com/",
};


const SKILL_GROUPS: { group: string; items: string[] }[] = [
  { group: "Product & UX", items: ["Product Design", "UI Design", "UX Design", "UX Research", "User Flows", "Wireframing", "Interactive Prototyping", "Design Systems", "Information Architecture", "Accessibility", "Developer Handoff"] },
  { group: "Product Domains", items: ["SaaS Product Design", "CRM Product Design", "Dashboard Design", "Responsive Web Design", "Landing Page Design"] },
  { group: "Visual & Brand", items: ["Brand Identity", "Visual Design", "Social Media Design", "Print Design", "Video Editing"] },
  { group: "AI Workflow", items: ["AI-assisted UI Design", "AI-assisted Wireframing", "Prompt Engineering", "AI Image Generation", "UX Research with AI", "AI Content Creation", "Rapid Prototyping"] },
  { group: "Design Tools", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe XD", "Adobe Premiere Pro", "Adobe After Effects", "Canva", "CorelDRAW"] },
  { group: "AI Tools", items: ["ChatGPT", "Claude", "Gemini", "Adobe Firefly", "Figma AI", "Canva AI", "Cursor", "Lovable", "Midjourney"] },
];

function Skills() {
  return (
    <section id="skills" className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="text-eyebrow mb-6">/ 03 — Skills</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            Product craft, <em className="text-highlight italic">AI workflows</em> & tools.
          </h2>
          <p className="mt-6 max-w-sm text-muted-foreground">
            A working toolkit built over 4.5+ years across SaaS, CRM, brand systems and AI-accelerated design.
          </p>
        </div>

        <div className="space-y-10 md:col-span-8">
          {SKILL_GROUPS.map((g, gi) => (
            <div key={g.group}>
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <span className="text-display text-2xl">{g.group}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s, i) => {
                  const slug = TOOL_LOGOS[s];
                  const link = TOOL_LINKS[s];
                  const inner = (
                    <>
                      {slug ? (
                        <img
                          src={slug}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          className="h-4 w-4 shrink-0 object-contain"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : null}
                      {s}
                    </>
                  );
                  const commonProps = {
                    initial: { opacity: 0, y: 12 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-40px" },
                    transition: { duration: 0.5, delay: i * 0.04, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
                    className: "card-white inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-highlight hover:shadow-[0_10px_26px_-14px_rgba(0,0,0,0.22)]",
                  };
                  const chip = link ? (
                    <motion.a key={s} href={link} target="_blank" rel="noopener noreferrer" {...commonProps}>
                      {inner}
                    </motion.a>
                  ) : (
                    <motion.span key={s} {...commonProps}>
                      {inner}
                    </motion.span>
                  );
                  return (
                    <Magnetic key={s} strength={6} padding={10}>
                      {chip}
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */

type JobLink = { label: string; href: string };
type Job = { company: string; role: string; period: string; summary: string; Icon: ComponentType<{ className?: string; size?: number }>; links?: JobLink[] };

const EXPERIENCE: Job[] = [
  {
    company: "SwiftAMS (Study Abroad CRM)",
    role: "Product Designer · UI/UX Designer",
    period: "Jun 2022 — Present",
    summary: "Designed responsive CRM dashboards, lead and document management, payments, reporting and workflow modules for a SaaS platform. Built user flows, wireframes, interactive prototypes and high-fidelity UI in Figma; shipped 150+ marketing creatives, presentations, brochures and landing pages while maintaining brand identity. Partnered with developers and product managers, and leveraged AI tools to accelerate ideation, prototyping and content.",
    Icon: Briefcase,
    links: [
      { label: "Website", href: "https://www.swiftams.com/" },
      { label: "CRM", href: "https://app.swiftams.com/login" },
      { label: "Instagram", href: "https://www.instagram.com/swiftams/" },
      { label: "Agency App · Android", href: "https://play.google.com/store/apps/details?id=com.codexplabs.swiftcounsellorapp&pli=1" },
      { label: "Agency App · iOS", href: "https://apps.apple.com/in/app/swiftams-business/id6451433255" },
      { label: "Student App · Android", href: "https://play.google.com/store/apps/details?id=com.swiftams.swiftmobileapp" },
      { label: "Student App · iOS", href: "https://apps.apple.com/in/app/swiftams/id6469041818" },
      { label: "B2B Hub · Android", href: "https://play.google.com/store/apps/details?id=com.swiftams.swifthubapp" },
      { label: "B2B Hub · iOS", href: "https://apps.apple.com/us/app/swiftams-hub/id6474495227" },
    ],
  },
  {
    company: "Edu Finn",
    role: "Contract Graphic Designer · Freelance",
    period: "2024 — 2025",
    summary: "Designed brochures, standees, presentations, flyers and event marketing materials, plus social media campaigns, promotional videos, reels and digital marketing assets for the study-abroad brand.",
    Icon: Layers,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/edu_finn/" },
    ],
  },
  {
    company: "Digital Cappuccino",
    role: "Creative Designer · Freelance",
    period: "2022 — 2023",
    summary: "Designed campaign creatives, social media content, advertisements and website graphics; planned and managed a six-month creative content calendar.",
    Icon: Coffee,
    links: [
      { label: "Website", href: "https://www.digitalcappuccino.com/" },
    ],
  },
  {
    company: "Independent Projects",
    role: "UI/UX & Visual Designer",
    period: "2021",
    summary: "Designed responsive websites, CRM dashboards, landing pages and branding systems. Conducted UX research and produced user flows, wireframes, prototypes and high-fidelity UI designs.",
    Icon: Layers,
  },
];

function Experience() {
  return (
    <section id="experience" className="py-28 md:py-40">
      <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-eyebrow mb-6">/ 04 — Experience</p>
          <h2 className="text-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            4.5+ years across <em className="text-highlight italic">SaaS, CRM</em> & study-abroad brands.
          </h2>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Long-running product design roles and freelance collaborations — shipping SaaS modules, brand systems, print and digital campaigns for growing teams.
          </p>
        </div>
      </div>

      <ol className="relative">
        <span aria-hidden className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-6" />
        {EXPERIENCE.map((job, i) => (
          <motion.li
            key={job.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative pl-14 md:pl-20 py-6 first:pt-0 last:pb-0"
          >
            <span className="absolute left-1 top-7 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-foreground md:left-2 md:h-10 md:w-10">
              <job.Icon size={15} />
            </span>
            <div className="card-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.22)] md:p-8">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-display text-2xl md:text-3xl">{job.company}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{job.period}</span>
              </div>
              <p className="text-sm uppercase tracking-[0.15em] text-highlight">{job.role}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-foreground/80">{job.summary}</p>
              {job.links && job.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-white inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground transition-transform hover:-translate-y-0.5"
                    >
                      {l.label}
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
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
            Six disciplines. <em className="text-highlight italic">One craft.</em>
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
      <span className="col-span-2 font-mono text-xs text-foreground/70 md:col-span-1">{d.no}</span>
      <div className="col-span-10 flex items-center gap-4 md:col-span-5">
        <span className="card-white inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-foreground">
          <d.Icon size={20} />
        </span>
        <div>
          <h3 className="text-display text-[clamp(1.5rem,3vw,2.5rem)]">{d.title}</h3>
          <p className="text-eyebrow mt-1">{d.sub}</p>
        </div>
      </div>
      <p className="col-span-12 max-w-md text-sm leading-relaxed text-foreground/80 md:col-span-4">
        {d.desc}
      </p>
      <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">{d.meta}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="card-white inline-flex h-8 w-8 items-center justify-center rounded-full"><Plus size={14} /></motion.span>
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
              <span key={t} className="card-white rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/85">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


/* ---------- Gallery (grouped by category, aligned & always-visible) ---------- */

const CATEGORY_ORDER = ["Brand", "Social", "Print", "UI/UX"] as const;

// Per-category visual settings — uniform ratio + grid so every tile aligns
// and `object-contain` guarantees the full artwork stays visible.
const CATEGORY_CONFIG: Record<
  string,
  {
    ratio: string;
    grid: string;
    fit: "cover" | "contain";
    eyebrow: string;
    title: string;
    blurb: string;
    postsLabel: string;
  }
> = {
  Brand: {
    ratio: "aspect-[4/3]",
    grid: "grid-cols-2 md:grid-cols-3",
    fit: "contain",
    eyebrow: "Identity & Brand Systems",
    title: "Brand & Logos",
    blurb:
      "Crafting distinctive brand identities that build recognition and trust. Each mark balances strategy, typography and form — designed to scale across every touchpoint a brand lives on.",
    postsLabel: "Brand Marks",
  },
  Social: {
    ratio: "aspect-[4/5]",
    grid: "grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
    fit: "contain",
    eyebrow: "Strategic Digital Engagement",
    title: "Social Media",
    blurb:
      "In the contemporary digital landscape, visual impact is paramount. I curate sophisticated social media assets that harmonize with strict brand guidelines while driving user engagement — high-conversion creatives for LinkedIn, Instagram and corporate digital channels.",
    postsLabel: "Social Media Posts",
  },
  Print: {
    ratio: "aspect-[3/4]",
    grid: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    fit: "contain",
    eyebrow: "Tactile Brand Storytelling",
    title: "Print Media",
    blurb:
      "Print is where craft meets permanence. Brochures, covers, standees and collateral — each piece engineered with hierarchy, grid and material in mind so the story holds up in the hand.",
    postsLabel: "Print Collateral",
  },
  "UI/UX": {
    ratio: "aspect-[16/10]",
    grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    fit: "contain",
    eyebrow: "Interfaces with Intent",
    title: "UI / UX Design",
    blurb:
      "Designing digital products where usability and aesthetics co-exist. Marketing landings, dashboards and product surfaces built around clarity, rhythm and conversion.",
    postsLabel: "Web & Product",
  },
  Mobile: {
    ratio: "aspect-[9/16]",
    grid: "grid-cols-2 md:grid-cols-4 lg:grid-cols-5",
    fit: "contain",
    eyebrow: "Mobile-First Experiences",
    title: "Mobile App",
    blurb:
      "End-to-end app screens designed for thumb-zone ergonomics and quick comprehension. From onboarding to dense data views, every screen earns its place.",
    postsLabel: "App Screens",
  },
};

/* ---------- Brochure card: large preview + thumbnail strip ---------- */

function BrochureCard({
  brochure,
  idx,
  onOpen,
}: {
  brochure: Brochure;
  idx: number;
  onOpen: (item: GalleryItem, list?: GalleryItem[], index?: number) => void;
}) {
  // All pages, cover first — filter out empty (missing) srcs.
  const pages = [brochure.cover, ...brochure.pages].filter((s): s is string => !!s && s.length > 0);
  const items: GalleryItem[] = pages.map((src, i) => ({
    id: `${brochure.id}-page-${i + 1}`,
    label: `${brochure.name} — Page ${i + 1}`,
    category: "Print",
    ratio: "aspect-[3/4]",
    variant: (((i + idx) % 3) + 1) as 1 | 2 | 3,
    src,
  }));
  const [selected, setSelected] = useState(0);
  const safeIndex = Math.min(selected, items.length - 1);
  const current = items[safeIndex];

  // Preload adjacent pages for smooth switching
  useEffect(() => {
    const preload = (i: number) => {
      const it = items[i];
      if (it?.src) { const img = new Image(); img.src = it.src; }
    };
    preload(safeIndex + 1);
    preload(safeIndex - 1);
  }, [safeIndex, items]);

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (idx % 3) * 0.08 }}
      className="flex flex-col gap-3"
    >
      {/* Large preview — the only click target that opens the lightbox */}
      <button
        type="button"
        onClick={() => onOpen(current, items, safeIndex)}
        aria-label={`Open ${brochure.name} in fullscreen viewer`}
        className="group block w-full cursor-pointer overflow-hidden rounded-2xl bg-white ring-1 ring-border/60 transition-all hover:ring-highlight"
      >
        <div className="relative aspect-[3/4] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Placeholder
                label={current.label}
                ratio="aspect-[3/4]"
                variant={current.variant}
                src={current.src}
                fit="contain"
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            View {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
        </div>
      </button>

      <div className="flex items-baseline justify-between gap-2 px-1">
        <p className="truncate text-sm font-medium text-foreground">{brochure.name}</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{brochure.tagline}</span>
      </div>

      {/* Thumbnail strip — only rendered for existing pages, no popup on click */}
      {items.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((it, ti) => {
            const isActive = ti === safeIndex;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => setSelected(ti)}
                aria-label={`Show page ${ti + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-11 w-9 shrink-0 overflow-hidden rounded-md bg-white ring-1 transition-all duration-300 sm:h-12 sm:w-10 ${
                  isActive
                    ? "ring-2 ring-highlight scale-[1.06] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.35)]"
                    : "ring-border/60 opacity-70 hover:opacity-100 hover:scale-[1.03] hover:ring-foreground/40"
                }`}
              >
                <img
                  src={it.src}
                  alt={`${brochure.name} page ${ti + 1} thumbnail`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}


function Gallery({ onOpen }: { onOpen: (item: GalleryItem, list?: GalleryItem[], index?: number) => void }) {
  const categories = ["All", ...CATEGORY_ORDER] as const;
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [socialMoreOpen, setSocialMoreOpen] = useState(false);
  const visibleCats = filter === "All" ? CATEGORY_ORDER : [filter as (typeof CATEGORY_ORDER)[number]];

  return (
    <section id="gallery" className="py-28 md:py-40">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-eyebrow mb-4">/ Gallery</p>
          <h2 className="text-display text-[clamp(2rem,5.5vw,4.5rem)] max-w-[20ch]">
            Organised by craft — tap any tile to <em className="text-highlight italic">preview</em>, download or comment.
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

      <div className="space-y-28">
        {visibleCats.map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const items = GALLERY.filter((g) => g.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} id={`gallery-${cat.toLowerCase().replace("/", "-")}`}>
              {/* Hero-style category header — mirrors old portfolio alignment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-12 max-w-3xl text-center"
              >
                <h3 className="font-display font-bold leading-[0.95] tracking-tight text-highlight text-[clamp(2.5rem,8vw,5.5rem)]">
                  {cfg.title}
                </h3>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-highlight">
                  {cfg.eyebrow}
                </p>
                <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {cfg.blurb}
                </p>
              </motion.div>

              <div className="mb-8 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-border" />
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-foreground">
                  {cfg.postsLabel}
                </p>
                <span className="h-px w-10 bg-border" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {String(items.length).padStart(2, "0")} pieces
                </span>
              </div>

              {(() => {
                const mobiles = GALLERY.filter((g) => g.category === "Mobile");
                type SG = {
                  name: string | null;
                  script?: string;
                  blurb?: string;
                  list: typeof items;
                  ratio?: string;
                  grid?: string;
                  split?: boolean;
                };
                const subgroups: SG[] =
                  cat === "Print"
                    ? [
                        { name: "Brochure", script: "Design", list: items.filter((x) => x.id.startsWith("p") && Number(x.id.slice(1)) <= 5) },
                        { name: "Standee", script: "Design", list: items.filter((x) => x.id.startsWith("p") && Number(x.id.slice(1)) >= 6) },
                      ]
                    : cat === "UI/UX"
                    ? [
                        {
                          name: "App",
                          script: "Design",
                          blurb:
                            "With over four years of experience in the design industry, I specialize in crafting visual identities, intuitive user interfaces, and impactful print assets that help brands communicate effectively. My approach merges strategic thinking with creative execution — ensuring every project not only delivers aesthetic excellence but also achieves its intended business goals.",
                          list: mobiles.slice(0, 2),
                          ratio: "aspect-[9/16]",
                          grid: "grid-cols-2",
                          split: true,
                        },
                        {
                          name: "Main",
                          script: "Design",
                          blurb:
                            "A curated set of production-ready screens — onboarding, dashboards, lists, profiles and dense data views — designed for thumb-zone ergonomics and quick comprehension.",
                          list: mobiles.slice(2),
                          ratio: "aspect-[9/16]",
                          grid: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                          split: true,
                        },
                        {
                          name: "Web",
                          script: "Design",
                          blurb:
                            "I specialize in building responsive web platforms and data-rich dashboards. My web designs merge aesthetic appeal with robust information architecture, ensuring users can navigate complex datasets and operational tools with clarity and ease across all devices.",
                          list: items,
                          ratio: "aspect-[16/10]",
                          grid: "grid-cols-1 md:grid-cols-2",
                          split: true,
                        },
                      ]
                    : [{ name: null, list: items }];

                return (
                  <div className="space-y-20">
                    {subgroups.map((sg) => {
                      const ratio = sg.ratio ?? cfg.ratio;
                      const grid = sg.grid ?? cfg.grid;
                      const Grid = (
                        <div className={`grid gap-4 ${grid}`}>
                          {sg.list.map((g, i) => (
                            <motion.button
                              key={g.id}
                              onClick={() => onOpen(g)}
                              initial={{ opacity: 0, y: 18 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                              className="group relative block cursor-pointer text-left"
                            >
                              <div className="relative overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
                                <Tilt strength={6}>
                                  <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
                                    <Placeholder
                                      label={g.label}
                                      ratio={ratio}
                                      variant={g.variant}
                                      badge={g.category}
                                      src={g.src}
                                      fit={cfg.fit}
                                    />
                                  </div>
                                </Tilt>
                                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-highlight/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-highlight/50" />
                              </div>
                              <div className="mt-3 flex items-center justify-between gap-3">
                                <p className="truncate text-sm">{g.label}</p>
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">View →</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      );



                      if (sg.split && sg.blurb) {
                        return (
                          <div key={sg.name ?? "all"} className="grid gap-10 md:grid-cols-12 md:gap-12">
                            <div className="md:col-span-4 md:pt-2">
                              <div className="mb-5 flex items-baseline gap-3">
                                <h4 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                  {sg.name}
                                </h4>
                                {sg.script && (
                                  <span className="text-highlight" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "1.25rem" }}>
                                    {sg.script}
                                  </span>
                                )}
                              </div>
                              <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                                {sg.blurb}
                              </p>
                            </div>
                            <div className="md:col-span-8">{Grid}</div>
                          </div>
                        );
                      }

                      if (sg.name === "Brochure") {
                        return (
                          <div key={sg.name}>
                            <h4 className="mb-8 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                              {sg.name}
                            </h4>
                            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                              {BROCHURES.map((b, idx) => (
                                <BrochureCard key={b.id} brochure={b} idx={idx} onOpen={onOpen} />
                              ))}
                            </div>
                          </div>
                        );
                      }



                      if (sg.name === "Standee") {
                        return (
                          <div key={sg.name}>
                            <h4 className="mb-8 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                              {sg.name}
                            </h4>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                              {sg.list.slice(0, 3).map((s, idx) => (
                                <motion.button
                                  key={s.id}
                                  onClick={() => onOpen(s)}
                                  initial={{ opacity: 0, y: 24 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-40px" }}
                                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                                  className="group block w-full cursor-pointer overflow-hidden rounded-2xl ring-1 ring-border/60 transition-all duration-500 hover:ring-highlight hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.32)]"
                                >
                                  <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
                                    <Placeholder
                                      label={s.label}
                                      ratio="aspect-[3/4]"
                                      variant={s.variant}
                                      src={s.src}
                                      fit={cfg.fit}
                                    />
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={sg.name ?? "all"}>
                          {sg.name && (
                            <div className="mb-5 flex items-baseline gap-3">
                              <h4 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                                {sg.name}
                              </h4>
                              {sg.script && (
                                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight">
                                  {sg.script}
                                </span>
                              )}
                            </div>
                          )}
                          {Grid}
                        </div>
                      );
                    })}
                    {cat === "Social" && (
                      <div className="flex justify-center pt-4">
                        <motion.button
                          type="button"
                          onClick={() => setSocialMoreOpen(true)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-background shadow-sm transition-colors hover:bg-highlight hover:border-highlight hover:text-background"
                        >
                          <Plus className="h-4 w-4" />
                          More
                        </motion.button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {socialMoreOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setSocialMoreOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-label="More social work"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSocialMoreOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-highlight">
                / See more
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground">
                Follow the full feed
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Live social work continues on Instagram — tap a handle to open the profile.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href="https://www.instagram.com/swiftams/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-highlight hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">SwiftAMS</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">@swiftams</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-highlight" />
                </a>
                <a
                  href="https://www.instagram.com/edu_finn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-all hover:border-highlight hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-foreground text-background">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Edu Finn</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">@edu_finn</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-highlight" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Videos (clickable → modal player) ---------- */

function Videos({ onOpen }: { onOpen: (v: (typeof VIDEOS)[number]) => void }) {
  return (
    <section id="videos" className="py-28 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <h3 className="font-display font-bold leading-[0.95] tracking-tight text-highlight text-[clamp(2.5rem,8vw,5.5rem)]">
          Video Editing
        </h3>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-highlight">
          Corporate Motion Graphics & Production
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Transforming static messaging into dynamic visual narratives. I provide end-to-end post-production services, specialising in corporate storytelling, client testimonials, and product demonstrations. My collaborations with Edu Finn and Swift AMS highlight my proficiency in narrative pacing, sound design, and technical editing.
        </p>
      </motion.div>

      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-border" />
        <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Video
          <span className="ml-2 text-highlight" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
            Editing
          </span>
        </p>
        <span className="h-px w-10 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{String(VIDEOS.length).padStart(2, "0")} reels</span>
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
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-surface transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]">
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

function Lightbox({ state, onClose, onNavigate }: { state: NonNullable<LightboxState>; onClose: () => void; onNavigate?: (dir: -1 | 1) => void }) {
  const [comments, setComments] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const touchStartX = useRef<number | null>(null);

  const activeItemId = state.kind === "image" ? state.item.id : state.item.id;
  // reset comments when item changes
  useEffect(() => { setComments([]); setDraft(""); }, [activeItemId]);

  // Keyboard arrows for prev/next
  useEffect(() => {
    if (!onNavigate || state.kind !== "image" || !state.list) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); onNavigate(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); onNavigate(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNavigate, state]);

  // Preload adjacent images
  useEffect(() => {
    if (state.kind !== "image" || !state.list || state.index == null) return;
    const preload = (i: number) => {
      const it = state.list?.[i];
      if (it?.src) { const img = new Image(); img.src = it.src; }
    };
    preload(state.index + 1);
    preload(state.index - 1);
  }, [state]);

  const hasNav = state.kind === "image" && !!state.list && state.list.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null || !hasNav || !onNavigate) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) onNavigate(dx < 0 ? 1 : -1);
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />

      {hasNav && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); onNavigate?.(-1); }}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur hover:bg-foreground hover:text-background md:left-6"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); onNavigate?.(1); }}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur hover:bg-foreground hover:text-background md:right-6"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex max-h-[92vh] w-auto max-w-[95vw] flex-col overflow-hidden rounded-3xl border border-border/70 glass shadow-2xl md:flex-row md:items-stretch"
      >
        {/* Media side — sized to image's natural dimensions, capped to viewport */}
        <div className="relative flex items-center justify-center bg-black/40">
          {state.kind === "image" ? (
            <div className="relative flex max-h-[92vh] items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={state.item.id}
                  src={state.item.src}
                  alt={state.item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-auto w-auto max-h-[92vh] max-w-[min(75vw,1200px)] object-contain"
                />
              </AnimatePresence>
              {hasNav && state.index != null && state.list && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                  {String(state.index + 1).padStart(2, "0")} / {String(state.list.length).padStart(2, "0")}
                </div>
              )}
            </div>
          ) : (
            <div className="relative aspect-video w-[min(80vw,1000px)]">
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
        <div className="flex w-full shrink-0 flex-col gap-5 overflow-y-auto p-6 md:w-[340px] md:p-8">
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
              className="card-white inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-foreground/5"
            >
              <X size={15} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.kind === "image" ? (
              <>
                <a
                  href={state.item.src || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`${state.item.id}-${state.item.label.replace(/\s+/g, "-")}.png`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/85"
                >
                  <Download size={13} /> Download
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(state.item.label)}
                  className="card-white inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-foreground/5"
                >
                  <MessageCircle size={12} /> Copy title
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
  const ref = useRef<HTMLElement>(null);
  const words = ["Have", "a", "project", "in", "mind?"];
  const [open, setOpen] = useState(false);
  return (
    <section ref={ref} id="contact" className="relative overflow-hidden rounded-[2.5rem] border border-border/60 glass my-16 p-8 md:my-24 md:p-16">
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-foreground/[0.07] blur-3xl animate-orb" aria-hidden />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-highlight/20 blur-3xl animate-orb" style={{ animationDelay: "-8s" }} aria-hidden />

      <div className="relative grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-eyebrow mb-6">/ Say hello</p>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Currently accepting <br /> select projects in <br /> product, SaaS & brand design.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-foreground opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foreground" /></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Open · Q1 2026</span>
          </div>
          <Magnetic strength={14} padding={20}>
            <button
              onClick={() => setOpen(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-background transition-all hover:bg-highlight hover:text-background hover:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.35)]"
            >
              <Mail size={14} /> Contact me
            </button>
          </Magnetic>
        </div>
        <div className="md:col-span-7">
          <h2 className="text-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[1.02]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="mr-[0.2em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: words.length * 0.06 + 0.1, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="link-underline italic text-highlight"
            >
              Let's make it.
            </motion.button>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-eyebrow mb-2">Email</p>
              <a href="mailto:arbaazsince2002@gmail.com" className="text-lg link-underline break-all">
                arbaazsince2002@gmail.com
              </a>
              <p className="text-eyebrow mb-2 mt-6">Phone</p>
              <a href="tel:+918527766839" className="text-lg link-underline">
                +91 85277 66839
              </a>
              <p className="text-eyebrow mb-2 mt-6">Based in</p>
              <p className="text-lg">Gurugram, Haryana · India</p>
            </div>
            <div>
              <p className="text-eyebrow mb-2">Elsewhere</p>
              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="link-underline text-sm">{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactFormDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}

function ContactFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim() || name.length > 100) errs.name = "Please enter your name (max 100)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.length > 255) errs.email = "Enter a valid email";
    if (!message.trim() || message.length > 2000) errs.message = "Message required (max 2000)";
    if (subject.length > 150) errs.subject = "Subject too long";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:arbaazsince2002@gmail.com?subject=${encodeURIComponent(
      subject || `New project inquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
    setTimeout(() => {
      onOpenChange(false);
      setSent(false);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl border border-border/60 bg-card p-8 shadow-2xl md:p-10"
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <p className="text-eyebrow mb-2">/ Get in touch</p>
            <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Let's start a <span className="text-highlight italic" style={{ fontFamily: "'Instrument Serif', serif" }}>conversation</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell me a bit about your project. I'll get back within 24 hours.
            </p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-highlight/40 bg-highlight/10 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.08, type: "spring", stiffness: 320, damping: 18 }}
                  className="rounded-full bg-highlight/20 p-3"
                >
                  <Send size={20} className="text-highlight" />
                </motion.div>
                <p className="font-medium text-foreground">Opening your email app…</p>
                <p className="text-xs text-muted-foreground">Thanks for reaching out.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</label>
                    <input
                      value={name} onChange={(e) => setName(e.target.value)} maxLength={100}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Subject</label>
                  <input
                    value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={150}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
                    placeholder="Project inquiry, collaboration…"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                  <textarea
                    value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} rows={5}
                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
                    placeholder="Tell me about your idea, timeline, and budget…"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    {errors.message ? <p className="text-xs text-red-500">{errors.message}</p> : <span />}
                    <p className="font-mono text-[10px] text-muted-foreground">{message.length}/2000</p>
                  </div>
                </div>
                <Magnetic strength={12} padding={18}>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-background transition-all hover:bg-highlight hover:shadow-[0_14px_40px_-16px_rgba(0,0,0,0.4)]"
                  >
                    Send message <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border/60 py-8 md:flex-row md:items-center md:justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">© 2026 Arbaaz — Product Designer · UI/UX · Visual</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Gurugram, India · Available worldwide</p>
    </footer>
  );
}

function QuickChatFab() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = msg.trim();
    if (!text) return;
    window.location.href = `mailto:arbaazsince2002@gmail.com?subject=${encodeURIComponent("Quick chat from portfolio")}&body=${encodeURIComponent(text)}`;
    setMsg("");
    setOpen(false);
  };
  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close quick chat" : "Open quick chat"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-2xl ring-1 ring-foreground/10 hover:bg-foreground/90 md:bottom-8 md:right-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="pulse-ring absolute inset-0 rounded-full" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-[89] w-[calc(100vw-2.5rem)] max-w-[340px] overflow-hidden rounded-3xl border border-border/60 bg-popover shadow-2xl backdrop-blur-md md:bottom-28 md:right-8"
          >
            <div className="flex items-center gap-3 border-b border-border/60 bg-foreground/[0.03] px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
                <span className="font-display text-sm font-semibold">a</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-popover" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">Chat with Arbaaz</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Usually replies in a few hours</p>
              </div>
            </div>
            <form onSubmit={send} className="p-3">
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={3}
                maxLength={1000}
                autoFocus
                placeholder="Hi Arbaaz, I'd love to talk about…"
                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] text-muted-foreground">{msg.length}/1000</p>
                <button
                  type="submit"
                  disabled={!msg.trim()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-opacity hover:bg-foreground/85 disabled:opacity-40"
                >
                  Send <Send size={12} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
