import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type ComponentType,
} from "react";
import {
  Sparkles,
  PenTool,
  Share2,
  Printer,
  Layout,
  Smartphone,
  Film,
  Briefcase,
  Layers,
  Clapperboard,
  Wrench,
  Building2,
  MapPin,
  Download,
  MessageCircle,
  X,
  Play,
  Plus,
  ArrowUpRight,
  Mail,
  Linkedin,
  Instagram,
  Sun,
  Moon,
  ArrowRight,
  FileText,
  Menu,
  ChevronLeft,
  ChevronRight,
  Hexagon,
  MessageSquare,
  Network,
  Coffee,
  Atom,
  Heart,
  Send,
  Bookmark,
  Maximize2,
  ExternalLink,
  Youtube,
  Compass,
  Palette,
  Video,
  Cpu,
  Bot,
  Wand2,
  MousePointer,
  Workflow,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
} from "lucide-react";
import { Magnetic } from "@/components/reactbits/Magnetic";
import { Reveal } from "@/components/reactbits/Reveal";
import { CountUp } from "@/components/reactbits/CountUp";
import { AiSplashModal } from "@/components/AiSplashModal";
import { AiPromoBanner } from "@/components/AiPromoBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arbaaz | UI/UX Designer, Graphic Artist & AI Video Creator" },
      {
        name: "description",
        content:
          "Portfolio of Arbaaz — Specializing in UI/UX design, promotional banners, posters, dynamic video editing, and AI-powered video creation.",
      },
      {
        property: "og:title",
        content: "Arbaaz | UI/UX Designer, Graphic Artist & AI Video Creator",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Arbaaz — Specializing in UI/UX design, promotional banners, posters, dynamic video editing, and AI-powered video creation.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "intro", label: "Index" },
  { id: "ai-videos", label: "AI Videos" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Portfolio" },
  { id: "videos", label: "Client Reels" },
  { id: "contact", label: "Contact" },
];

/* ==========================================================================
   CONTACT FORM, TELEGRAM & WHATSAPP CONFIGURATION
   ========================================================================== */
export const FORM_ACCESS_KEY = "ec588a71-4563-47b7-ab5e-514614d5a440";
export const TELEGRAM_BOT_TOKEN = "8627626560:AAF8jPech1c2YXhtugoqX7Emt-0QjgnubuY";
export const TELEGRAM_CHAT_ID = "6515017255";
export const TELEGRAM_USERNAME = "Arru00098";
export const TELEGRAM_DIRECT_URL = "https://t.me/Arru00098";
export const WHATSAPP_PHONE = "918527766839";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arbaaz-designer" },
  { label: "Portfolio", href: "https://arbaazcodes.github.io" },
  { label: "Email", href: "mailto:arbaazsince2002@gmail.com" },
  { label: "Phone", href: "tel:+918527766839" },
];

import arbaazHero from "@/assets/arbaaz-hero.jpg";

// Real brochure PDFs → rasterized page images
const brochurePages = import.meta.glob<string>("../assets/brochures/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const brochurePageUrl = (file: string): string => {
  const entry = Object.entries(brochurePages).find(([k]) => k.endsWith(`/${file}`));
  if (!entry) {
    if (typeof window !== "undefined")
      console.warn("[brochure] miss", file, Object.keys(brochurePages).length);
    return "";
  }
  return entry[1];
};
type Brochure = { id: string; name: string; tagline: string; cover: string; pages: string[] };
const BROCHURES: Brochure[] = [
  {
    id: "metro",
    name: "Metropolia",
    tagline: "Study in Finland · University Brochure",
    cover: brochurePageUrl("drive_metropolia_1.png"),
    pages: [brochurePageUrl("drive_metropolia_2.png")],
  },

  {
    id: "tutku",
    name: "Turku",
    tagline: "Tampere University · PG Diploma Brochure",
    cover: brochurePageUrl("drive_turku_1.png"),
    pages: [brochurePageUrl("drive_turku_2.png")],
  },

  {
    id: "edufinn",
    name: "Edu Finn",
    tagline: "Study in Finland · Program Brochure",
    cover: brochurePageUrl("drive_edufinn_1.png"),
    pages: [2, 3, 4].map((n) => brochurePageUrl(`drive_edufinn_${n}.png`)),
  },

  {
    id: "swiftams",
    name: "Swift AMS",
    tagline: "Product & CRM · Brochure",
    cover: brochurePageUrl("drive_swiftams_1.jpg"),
    pages: [2, 3, 4, 5, 6, 7, 8].map((n) => brochurePageUrl(`drive_swiftams_${n}.jpg`)),
  },
];

type CreativeService = {
  no: string;
  title: string;
  subtitle: string;
  desc: string;
  offerings: string[];
  tags: string[];
  Icon: ComponentType<{ className?: string; size?: number }>;
};

const SERVICES: CreativeService[] = [
  {
    no: "01",
    title: "UI/UX & Product Design",
    subtitle: "Web, Mobile & Design Systems",
    desc: "Designing clean, conversion-focused mobile apps and responsive web interfaces.",
    offerings: [
      "Wireframes",
      "Figma Prototypes",
      "Mobile App UI",
      "Landing Pages",
      "User Flows & Design Systems",
    ],
    tags: ["Figma", "UI/UX", "Mobile App UI", "Landing Pages", "Design Systems"],
    Icon: Layout,
  },
  {
    no: "02",
    title: "Graphic Design & Brand Collateral",
    subtitle: "Posters, Ad Banners & Print",
    desc: "Crafting eye-catching promotional posters, social media banners, and advertising assets.",
    offerings: [
      "Event & Promo Posters",
      "Google/Social Ad Banners",
      "Marketing Creatives",
      "Typography & Brand Assets",
    ],
    tags: ["Photoshop", "Illustrator", "Event Posters", "Ad Banners", "Marketing Assets"],
    Icon: PenTool,
  },
  {
    no: "03",
    title: "Video Editing & AI Video Creation",
    subtitle: "Reels, Commercials & GenAI",
    desc: "Producing high-retention video content combining traditional timeline editing with cutting-edge AI video generation.",
    offerings: [
      "Short-Form Content (Reels/Shorts/TikTok)",
      "AI B-Roll & Text-to-Video",
      "Commercial Ads",
      "Dynamic Subtitles",
      "Sound Design & Color Grading",
    ],
    tags: ["Premiere Pro", "After Effects", "CapCut", "GenAI Video", "Reels & Shorts"],
    Icon: Film,
  },
];

type GalleryItem = {
  id: string;
  label: string;
  category: string;
  ratio: string;
  variant: 1 | 2 | 3;
  src?: string;
};

const portfolioAssets = import.meta.glob<string>("../assets/portfolio/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const videoThumbnails = import.meta.glob<string>(
  "../assets/video-thumbnails/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const portfolioAsset = (file: string): string => {
  const entry = Object.entries(portfolioAssets).find(([k]) => k.endsWith(`/${file}`));
  if (!entry) {
    if (typeof window !== "undefined")
      console.warn("[portfolio] miss", file, Object.keys(portfolioAssets).length);
    return "";
  }
  return entry[1];
};

const videoThumbnail = (id: string): string => {
  const entry = Object.entries(videoThumbnails).find(([k]) => k.endsWith(`/${id}.jpg`));
  if (!entry) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return entry[1];
};

const GALLERY: GalleryItem[] = [
  // Brand & Logos — real client identities from the old portfolio

  {
    id: "b2",
    label: "SwiftAMS · Identity",
    category: "Brand",
    ratio: "aspect-[16/9]",
    variant: 2,
    src: portfolioAsset("89f4f8_ca3694966e014708a64fce392f994256~mv2.png"),
  },
  {
    id: "b3",
    label: "Wavox WMS · Logo",
    category: "Brand",
    ratio: "aspect-[16/9]",
    variant: 3,
    src: portfolioAsset("89f4f8_dc2e8c7415af480dbf0ff1b288782e41~mv2.png"),
  },
  {
    id: "b4",
    label: "Swift AI · Mark",
    category: "Brand",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_067511567620442384156a15b1a92717~mv2.png"),
  },
  {
    id: "b5",
    label: "Iksha Lab · Identity",
    category: "Brand",
    ratio: "aspect-[16/9]",
    variant: 2,
    src: portfolioAsset("89f4f8_c955de43569c4ea2a391790fae2dbc48~mv2.png"),
  },

  // Social Media — posters & campaign creatives (numbered, S-series, E-series)
  {
    id: "s1",
    label: "Social Poster · 01",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_e74f93e691cc4b638f128272313101f0~mv2.png"),
  },
  {
    id: "s2",
    label: "Social Poster · 02",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 2,
    src: portfolioAsset("89f4f8_14e3bfee31d448f8a43affc2b3786518~mv2.png"),
  },
  {
    id: "s4",
    label: "Social Poster · 04",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 3,
    src: portfolioAsset("89f4f8_db1fdbbed02e49b484c2c40123b27f17~mv2.png"),
  },
  {
    id: "s5",
    label: "Social Poster · 05",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_00ff2189148e488ebc998521e3dfe317~mv2.png"),
  },
  {
    id: "s6",
    label: "Social Poster · 06",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 2,
    src: portfolioAsset("89f4f8_edceec8f9b084ae1af021b97dd94da59~mv2.png"),
  },
  {
    id: "ss1",
    label: "Campaign · S1",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 3,
    src: portfolioAsset("89f4f8_49ab8aa5cf754e40bab22a91e10124ca~mv2.png"),
  },
  {
    id: "ss2",
    label: "Campaign · S2",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_c2b6db8b191d4944a9edf3e2845ef76a~mv2.png"),
  },
  {
    id: "ss3",
    label: "Campaign · S3",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 2,
    src: portfolioAsset("89f4f8_6c619e9ba1264f8080325cc5eeb2bd19~mv2.png"),
  },
  {
    id: "ss4",
    label: "Campaign · S4",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 3,
    src: portfolioAsset("89f4f8_2f9473d012c34279a0e5a6e51b2037d5~mv2.png"),
  },
  {
    id: "ss5",
    label: "Campaign · S5",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_24c8d158f87c476ba2bde790f4a960e4~mv2.png"),
  },
  {
    id: "se1",
    label: "Edu Finn · E1",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 2,
    src: portfolioAsset("89f4f8_a4af0589cfd549f6a7ce2a3497d6149d~mv2.png"),
  },
  {
    id: "se2",
    label: "Edu Finn · E2",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 3,
    src: portfolioAsset("89f4f8_4e58e1505f6744aa9e1f6d4a5df21430~mv2.png"),
  },
  {
    id: "se3",
    label: "Edu Finn · E3",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 1,
    src: portfolioAsset("89f4f8_aa62a2ab35f84cb9951acde0109d01f4~mv2.png"),
  },
  {
    id: "se4",
    label: "Edu Finn · E4",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 2,
    src: portfolioAsset("89f4f8_b629170411da4f8fba0ab07aa3be3463~mv2.png"),
  },
  {
    id: "se5",
    label: "Edu Finn · E5",
    category: "Social",
    ratio: "aspect-[4/5]",
    variant: 3,
    src: portfolioAsset("89f4f8_73ada136934540669bb36f4242bba3fb~mv2.png"),
  },

  // Print Media — brochures, covers & standees (print materials)
  {
    id: "p1",
    label: "Brochure · Spread 01",
    category: "Print",
    ratio: "aspect-[3/2]",
    variant: 1,
    src: portfolioAsset("89f4f8_58e960961a8c491cb7dcb544035fb8db~mv2.png"),
  },
  {
    id: "p2",
    label: "Brochure · Spread 03",
    category: "Print",
    ratio: "aspect-[3/2]",
    variant: 2,
    src: portfolioAsset("89f4f8_2479f252d6af47cfbc89002595ae0de6~mv2.png"),
  },
  {
    id: "p3",
    label: "Brochure · Spread 05",
    category: "Print",
    ratio: "aspect-[3/2]",
    variant: 3,
    src: portfolioAsset("89f4f8_147d767cfa9c4b4cab1f36c307483ef7~mv2.png"),
  },
  {
    id: "p4",
    label: "Brochure · Cover",
    category: "Print",
    ratio: "aspect-[3/2]",
    variant: 1,
    src: portfolioAsset("89f4f8_a12da84b6521462c82d14b55cf229c6b~mv2.png"),
  },
  {
    id: "p5",
    label: "Brochure · Mini",
    category: "Print",
    ratio: "aspect-[3/2]",
    variant: 2,
    src: portfolioAsset("89f4f8_6ceabb91279d41d991e2f6da03a793fa~mv2.png"),
  },
  {
    id: "p6",
    label: "Standee · 01",
    category: "Print",
    ratio: "aspect-[3/4]",
    variant: 3,
    src: portfolioAsset("89f4f8_753de6d611bf45dc8c4a90a34b4aa456~mv2.png"),
  },
  {
    id: "p7",
    label: "Standee · 02",
    category: "Print",
    ratio: "aspect-[3/4]",
    variant: 1,
    src: portfolioAsset("89f4f8_a9cdaad81e9c4ad9a0f505eb3829646b~mv2.png"),
  },
  {
    id: "p8",
    label: "Standee · 03",
    category: "Print",
    ratio: "aspect-[3/4]",
    variant: 2,
    src: portfolioAsset("89f4f8_fa830e7a072c432d92f66b2f0ef004a4~mv2.png"),
  },

  // UI / UX — web platforms & dashboards
  {
    id: "u1",
    label: "Marketing Landing",
    category: "UI/UX",
    ratio: "aspect-[16/10]",
    variant: 1,
    src: portfolioAsset("89f4f8_6a0b4184fb1e475fb76eeffc8953ce23~mv2.png"),
  },
  {
    id: "u2",
    label: "MacBook · Showcase",
    category: "UI/UX",
    ratio: "aspect-[16/10]",
    variant: 2,
    src: portfolioAsset("89f4f8_ee57029d078240ca8c3c9e1ed40e7604~mv2.png"),
  },

  // Mobile App — full app screens
  {
    id: "m1",
    label: "Mobile App · Hero",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 1,
    src: portfolioAsset("89f4f8_e88c580aba884863b5b0a88aac1da855~mv2.png"),
  },
  {
    id: "m2",
    label: "Mobile · Screen 02",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 2,
    src: portfolioAsset("89f4f8_96b6d7c6da044e5e8020b3851cb9ed32~mv2.png"),
  },
  {
    id: "m3",
    label: "Mobile · Screen 03",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 3,
    src: portfolioAsset("89f4f8_e97d8c214ec346d799428ddb6e0a8ba8~mv2.png"),
  },
  {
    id: "m4",
    label: "Mobile · Screen 04",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 1,
    src: portfolioAsset("89f4f8_c067b70bc9d54813ba0f1483bd495c89~mv2.png"),
  },
  {
    id: "m5",
    label: "Mobile · Screen 05",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 2,
    src: portfolioAsset("89f4f8_85f6f09987fa469ab6e7728662f9eb41~mv2.png"),
  },
  {
    id: "m6",
    label: "Mobile · Screen 06",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 3,
    src: portfolioAsset("89f4f8_62c70309b2084d79b43f1bde5e0e7c34~mv2.png"),
  },
  {
    id: "m7",
    label: "Mobile · Screen 07",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 1,
    src: portfolioAsset("89f4f8_29cd3ceb2de540099ec98ff8669acbd3~mv2.png"),
  },
  {
    id: "m8",
    label: "Mobile · Screen 08",
    category: "Mobile",
    ratio: "aspect-[9/16]",
    variant: 2,
    src: portfolioAsset("89f4f8_2a2a933d6cb146748289c3c7cfd0496c~mv2.png"),
  },
];

export type VideoItem = {
  id: string;
  title: string;
  client: string;
  len: string;
  category: "ai" | "corporate";
  tag?: string;
  aspect?: "horizontal" | "vertical";
};

const AI_VIDEOS: VideoItem[] = [
  {
    id: "qfGP0Z3y-Jk",
    title: "Why AI Won’t Replace Creators | A Director's Perspective",
    client: "AI Director",
    len: "01:13",
    category: "ai",
    tag: "AI Film · Perspective",
    aspect: "horizontal",
  },
  {
    id: "T1iAlRKG9XY",
    title: 'Baaz Energy Drink Spec Ad — "Fuel Your Flow"',
    client: "Baaz Energy",
    len: "00:40",
    category: "ai",
    tag: "Spec Commercial · 3D",
    aspect: "horizontal",
  },
  {
    id: "DrzgzKZU05A",
    title: "Baaz Citrus 3D Product Reel | Visual Showcase",
    client: "Baaz Energy",
    len: "00:29",
    category: "ai",
    tag: "Product Reel · Visual FX",
    aspect: "horizontal",
  },
  {
    id: "QG5pQqOiwF4",
    title: "Baaz Mango Energy Drink — 3D Commercial Showcase",
    client: "Baaz Energy",
    len: "00:30",
    category: "ai",
    tag: "Commercial · 3D Design",
    aspect: "horizontal",
  },
  {
    id: "7piN3PMeKvM",
    title: "Bisleri Spec Ad — 50°C in the Sahara Desert",
    client: "Bisleri Spec",
    len: "01:22",
    category: "ai",
    tag: "Cinematic Spec · Story",
    aspect: "horizontal",
  },
  {
    id: "InYll8W0doQ",
    title: "Kawasaki Ninja H2 Cinematic — Breaking Realities",
    client: "Kawasaki Spec",
    len: "00:42",
    category: "ai",
    tag: "Automotive · Hyper-Real",
    aspect: "horizontal",
  },
  {
    id: "ednqs-KqGHQ",
    title: "Every Ride Has A Reason | Kawasaki Ninja H2 Night Run",
    client: "Kawasaki Spec",
    len: "00:24",
    category: "ai",
    tag: "Automotive · Speed Reel",
    aspect: "horizontal",
  },
  {
    id: "ZgwUmBFYUCg",
    title: "Sparco 07 Mustang GT — Night Circuit Battle",
    client: "Sparco Spec",
    len: "00:49",
    category: "ai",
    tag: "Circuit Battle · VFX",
    aspect: "horizontal",
  },
  {
    id: "Qbw0E0ksRH8",
    title: "Nexora — The Future of Creative Production & Marketing",
    client: "Nexora",
    len: "01:33",
    category: "ai",
    tag: "Brand Vision · GenAI",
    aspect: "horizontal",
  },
  {
    id: "G5B-9PgWWO4",
    title: 'Nexora Brand Film — "Building What Moves Business"',
    client: "Nexora",
    len: "00:54",
    category: "ai",
    tag: "Brand Film · Production",
    aspect: "horizontal",
  },
  {
    id: "pt1-OdMbbu0",
    title: "How ChatGPT Actually Thinks | Tokenization & AI Explained (Hindi)",
    client: "Tech Explainer",
    len: "01:10",
    category: "ai",
    tag: "AI Explainer · Hindi",
    aspect: "horizontal",
  },
  {
    id: "zn0mtYPp5vM",
    title: "Are Paper Notes Getting Banned in India? The Truth About Polymer Currency",
    client: "FinTech Explainer",
    len: "01:09",
    category: "ai",
    tag: "Explainer · Motion",
    aspect: "horizontal",
  },
  {
    id: "KpeI_mdP-iU",
    title: "What Happens Inside an LED TV in 1 Second? (3D Animation)",
    client: "3D Animation",
    len: "01:09",
    category: "ai",
    tag: "3D Visuals · Tech",
    aspect: "horizontal",
  },
];

const CORPORATE_REELS: VideoItem[] = [
  // Edu Finn Vertical Reels (Official Channel: https://www.youtube.com/@EduFinn)
  {
    id: "DfVjmdD8Oo0",
    title: "PG Diploma to Master’s Degree — Student Success",
    client: "Edu Finn",
    len: "00:54",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },
  {
    id: "TZAoX5OAuX8",
    title: "Study in Dubai — Pathway to France / USA Review",
    client: "Edu Finn",
    len: "00:46",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },
  {
    id: "LZLGyPVfCqk",
    title: "Unfiltered Feedback from a Happy Student in Finland",
    client: "Edu Finn",
    len: "00:59",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },
  {
    id: "1PXkS0YIn4g",
    title: "Finland Spouse Visa Success Story at Edu Finn",
    client: "Edu Finn",
    len: "00:38",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },
  {
    id: "Tx5YEJAMjyM",
    title: "Congratulations to Ramanpreet Kaur for Finland Spouse Visa",
    client: "Edu Finn",
    len: "00:43",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },
  {
    id: "QpoX4eBGDx4",
    title: "Left No Stone Unturned — Finland Spouse Visa Success",
    client: "Edu Finn",
    len: "00:48",
    category: "corporate",
    tag: "Edu Finn Reel",
    aspect: "vertical",
  },

  // Swift AMS Vertical Reels (Official Channel: https://www.youtube.com/@SwiftAMS)
  {
    id: "_-IVA13JMLA",
    title: "Master Your Notifications: Tailored Alerts Your Way",
    client: "Swift AMS",
    len: "00:41",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
  {
    id: "QI_LnzCfEKA",
    title: "Collaborate Seamlessly: Multiple Sub-Agent Logins Now Live",
    client: "Swift AMS",
    len: "00:35",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
  {
    id: "phqR0kyMaSE",
    title: "Customize Your Notifications with SwiftAMS CRM",
    client: "Swift AMS",
    len: "00:33",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
  {
    id: "4K-9YQNYxqk",
    title: "Track Every Login Session Securely in Real-Time",
    client: "Swift AMS",
    len: "00:38",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
  {
    id: "2fcoBEoggls",
    title: "Lead Migrations Across Branches with SwiftAMS",
    client: "Swift AMS",
    len: "00:30",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
  {
    id: "4C_FVNRcFFo",
    title: "Team Announcements: Direct, Timely & Effective",
    client: "Swift AMS",
    len: "00:32",
    category: "corporate",
    tag: "Swift AMS Reel",
    aspect: "vertical",
  },
];

const CORPORATE_FILMS: VideoItem[] = [
  {
    id: "qsdorOJX_KQ",
    title: "Pathway to France — Neeraj Marwaha",
    client: "Edu Finn",
    len: "08:23",
    category: "corporate",
    tag: "Corporate · Interview",
    aspect: "horizontal",
  },
  {
    id: "E_2gBwOA_LI",
    title: "Finland Spouse Visa — Ramanpreet Kaur",
    client: "Edu Finn",
    len: "05:15",
    category: "corporate",
    tag: "Client Story",
    aspect: "horizontal",
  },
  {
    id: "CMWVLkfhDV8",
    title: "Finland Spouse Success Stories 2024",
    client: "Edu Finn",
    len: "01:40",
    category: "corporate",
    tag: "Success Stories",
    aspect: "horizontal",
  },
  {
    id: "h7jDP07g5Wg",
    title: "From Studio Sets to Finnish Classrooms",
    client: "Edu Finn",
    len: "05:51",
    category: "corporate",
    tag: "Documentary",
    aspect: "horizontal",
  },
  {
    id: "eMOspLnw3C8",
    title: "Student Feedback — Study in Finland",
    client: "Edu Finn",
    len: "08:12",
    category: "corporate",
    tag: "Testimonial",
    aspect: "horizontal",
  },
  {
    id: "ZtpR21zK6FM",
    title: "Lead Migration Across Branches",
    client: "Swift AMS",
    len: "00:44",
    category: "corporate",
    tag: "Product Demo",
    aspect: "horizontal",
  },
  {
    id: "UNKwLmpR6vk",
    title: "Infopedia Documents Storage",
    client: "Swift AMS",
    len: "01:01",
    category: "corporate",
    tag: "Feature Reveal",
    aspect: "horizontal",
  },
  {
    id: "iglrTBTykjE",
    title: "Swift AMS — Partner of ICEF 2025",
    client: "Swift AMS",
    len: "00:28",
    category: "corporate",
    tag: "Event Promo",
    aspect: "horizontal",
  },
  {
    id: "B4_u3bJF1jo",
    title: "Upgrade to Swift AMS",
    client: "Swift AMS",
    len: "00:50",
    category: "corporate",
    tag: "Feature Promo",
    aspect: "horizontal",
  },
  {
    id: "y3Y0jligfkg",
    title: "Integrated Payment System Launch",
    client: "Swift AMS",
    len: "00:40",
    category: "corporate",
    tag: "Product Launch",
    aspect: "horizontal",
  },
  {
    id: "aCC87nVbR8E",
    title: "Unveiling Swift AMS",
    client: "Swift AMS",
    len: "00:29",
    category: "corporate",
    tag: "Brand Teaser",
    aspect: "horizontal",
  },
  {
    id: "raFlTw1bRhM",
    title: "Razorpay Integration Reveal",
    client: "Swift AMS",
    len: "01:12",
    category: "corporate",
    tag: "Fintech Integration",
    aspect: "horizontal",
  },
  {
    id: "Q5BDjeACCQ0",
    title: "Customizable QR Forms",
    client: "Swift AMS",
    len: "00:47",
    category: "corporate",
    tag: "Product Demo",
    aspect: "horizontal",
  },
];

const CORPORATE_VIDEOS: VideoItem[] = [...CORPORATE_REELS, ...CORPORATE_FILMS];

const VIDEOS: VideoItem[] = [...AI_VIDEOS, ...CORPORATE_VIDEOS];

type LightboxState =
  | { kind: "image"; item: GalleryItem; list?: GalleryItem[]; index?: number }
  | { kind: "video"; item: VideoItem; list?: VideoItem[]; index?: number }
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="grain relative min-h-screen text-foreground overflow-x-hidden">
      <ScrollProgress />
      <AmbientOrbs />
      <Cursor />
      <Nav active={active} dark={dark} setDark={setDark} />
      <SideRail />
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
        <Hero />
        <AiVideosSection onOpen={(item) => setLightbox({ kind: "video", item })} />
        <BigTextBanner text="Design · Direction · Detail" />
        <About />
        <Stats />
        <Services />
        <Skills />
        <Experience />
        <Work
          onOpenImage={(item, list, index) => setLightbox({ kind: "image", item, list, index })}
          onOpenVideo={(item) => setLightbox({ kind: "video", item })}
        />
        <Videos onOpen={(item) => setLightbox({ kind: "video", item })} />
        <BigTextBanner text="Available for work — 2026" />
        <Contact />

        <Footer />
      </main>
      <QuickChatFab />
      <AiSplashModal
        videos={AI_VIDEOS}
        videoThumbnail={videoThumbnail}
        onWatchAiVideos={() => {
          const el = document.getElementById("ai-videos");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onSelectVideo={(item) => {
          setLightbox({ kind: "video", item });
        }}
      />

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
    <section
      ref={ref}
      aria-hidden
      className="relative -mx-6 my-8 sm:my-10 md:my-12 overflow-hidden py-4 md:-mx-12 lg:-mx-20"
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap gap-14 text-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] text-foreground/[0.08]"
      >
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
      <div
        className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-foreground/[0.03] blur-[120px] animate-orb"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-foreground/[0.03] blur-[120px] animate-orb"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
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

function Nav({
  active,
  dark,
  setDark,
}: {
  active: string;
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
      <div
        className={`mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-full glass px-3 py-2 md:px-4 transition-shadow duration-500 ${scrolled ? "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5" : ""}`}
      >
        <a href="#intro" className="flex items-center gap-2 pl-3 pr-2">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
            <span className="font-display text-sm font-semibold">a</span>
            <span className="pulse-ring absolute inset-0 rounded-full" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            arbaaz/2026
          </span>
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
                          active === n.id
                            ? "bg-foreground/10 text-foreground"
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
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
            className="h-10 w-10 min-h-[44px] min-w-[44px] rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/resume"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[11px] min-h-[40px] font-medium uppercase tracking-[0.2em] text-background hover:bg-foreground/85 transition-colors"
          >
            <FileText size={13} /> Resume
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden h-10 w-10 min-h-[44px] min-w-[44px] rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            <Menu size={18} />
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
              className="absolute inset-x-4 top-20 rounded-3xl card-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-10 w-10 min-h-[44px] min-w-[44px] rounded-full border border-border/60 flex items-center justify-center hover:bg-foreground/10"
                >
                  <X size={16} />
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
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 font-display text-xl sm:text-2xl transition-colors ${
                      active === n.id
                        ? "bg-foreground/5 text-foreground font-semibold"
                        : "text-foreground/80 hover:bg-foreground/5"
                    }`}
                  >
                    <span>{n.label}</span>
                    <ArrowUpRight size={18} className="opacity-50" />
                  </motion.a>
                ))}
              </nav>
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85"
              >
                <FileText size={14} /> Resume (PDF)
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

function Tilt({
  children,
  className = "",
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
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
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Placeholder media tile ---------- */

function Placeholder({
  label,
  ratio = "aspect-video",
  variant = 1,
  badge,
  src,
  fit = "cover",
}: {
  label: string;
  ratio?: string;
  variant?: 1 | 2 | 3;
  badge?: string;
  src?: string;
  fit?: "cover" | "contain";
}) {
  const grad =
    variant === 1
      ? "placeholder-grad"
      : variant === 2
        ? "placeholder-grad-2"
        : "placeholder-grad-3";
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Cached/eagerly-loaded images can complete before React attaches onLoad.
    if (imgRef.current && imgRef.current.complete) setLoaded(true);
  }, [src]);
  return (
    <div
      className={`group/ph relative ${ratio} w-full overflow-hidden rounded-2xl border border-border/60 ${src ? "bg-foreground/[0.04]" : grad}`}
    >
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
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, transparent 40%, oklch(1 0 0 / 0.05) 41%, transparent 42%), radial-gradient(circle at 50% 50%, transparent 60%, oklch(1 0 0 / 0.04) 61%, transparent 62%)",
            }}
          />
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

/* ---------- Spline 3D Hero Background ---------- */

function SplineHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "250px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!isInView) return;
    const viewer = containerRef.current?.querySelector("spline-viewer");
    if (!viewer) return;

    const handleResize = () => {
      if (
        "requestUpdate" in viewer &&
        typeof (viewer as { requestUpdate?: () => void }).requestUpdate === "function"
      ) {
        (viewer as { requestUpdate: () => void }).requestUpdate();
      }
    };

    const onLoad = () => {
      // Set transparent styling in shadow root & disable pointer events on canvas
      if (viewer.shadowRoot) {
        const canvas = viewer.shadowRoot.querySelector("canvas");
        if (canvas) {
          canvas.style.background = "transparent";
          canvas.style.pointerEvents = "none";
        }
        const style = document.createElement("style");
        style.textContent = `
          :host { background: transparent !important; pointer-events: none !important; }
          canvas { background: transparent !important; pointer-events: none !important; }
          #logo { display: none !important; }
        `;
        viewer.shadowRoot.appendChild(style);
      }

      // Cap DPR at Math.min(window.devicePixelRatio, 1.5) to avoid GPU throttling
      const maxDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const app =
        (
          viewer as unknown as {
            _app?: {
              renderer?: {
                setClearColor: (c: number, a: number) => void;
                setPixelRatio: (r: number) => void;
              };
            };
            _spline?: {
              renderer?: {
                setClearColor: (c: number, a: number) => void;
                setPixelRatio: (r: number) => void;
              };
            };
          }
        )._app ||
        (
          viewer as unknown as {
            _spline?: {
              renderer?: {
                setClearColor: (c: number, a: number) => void;
                setPixelRatio: (r: number) => void;
              };
            };
          }
        )._spline;

      if (app?.renderer) {
        app.renderer.setClearColor(0x000000, 0);
        app.renderer.setPixelRatio(maxDpr);
      }
    };

    viewer.addEventListener("load", onLoad);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      viewer.removeEventListener("load", onLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, [isInView]);

  if (reduce) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{
        pointerEvents: "none",
        background: "transparent",
        backgroundColor: "transparent",
        contain: "layout paint",
        willChange: "transform",
      }}
    >
      {isInView && (
        <spline-viewer
          url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          loading="lazy"
          loading-anim-type="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60 dark:opacity-80 transition-opacity duration-1000"
          style={{
            pointerEvents: "none",
            background: "transparent",
            contain: "layout paint",
            willChange: "transform",
          }}
        />
      )}
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

  const words = [
    "Designing",
    "Seamless",
    "Digital",
    "Experiences",
    "&",
    "AI-Powered",
    "Visual",
    "Media.",
  ];

  return (
    <section
      id="intro"
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-24"
    >
      <SplineHeroBackground />
      <motion.div
        style={{ y, opacity: op }}
        className="relative z-10 grid gap-10 md:grid-cols-12 md:gap-14 md:items-center"
      >
        <div className="md:col-span-7 flex flex-col items-start">
          {/* 1. Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Available for Freelance & Creative Roles • UI/UX & AI Video Specialist
            </span>
          </motion.div>

          {/* 2. Headline (H1) */}
          <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold tracking-tight leading-[1.05]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 60, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                className="mr-[0.18em] inline-block"
                style={{ transformOrigin: "50% 100%" }}
              >
                {w === "AI-Powered" || w === "Visual" || w === "Media." ? (
                  <em className="text-highlight italic">{w}</em>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h1>

          {/* 3. Subheading (Paragraph) */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            I combine modern UI/UX design with high-converting marketing visuals — from intuitive
            Figma prototypes and ad posters to dynamic video editing and generative AI videos.
          </motion.p>

          {/* 4. CTA Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={14} padding={20}>
              <a
                href="#work"
                className="group relative inline-flex min-h-[44px] items-center gap-3 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] shadow-md shadow-foreground/10"
              >
                <span className="relative z-10">Explore My Work</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={10} padding={14}>
              <a
                href="#ai-videos"
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/80 bg-card px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5"
              >
                <Play size={12} className="fill-current text-highlight" />
                <span>Watch Video Reel</span>
              </a>
            </Magnetic>
            <Magnetic strength={8} padding={12}>
              <a
                href="#contact"
                className="link-underline inline-flex min-h-[44px] items-center px-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Hero Image (Right Column) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="md:col-span-5"
        >
          <Tilt
            strength={18}
            className="relative mx-auto aspect-[4/5] w-full max-w-[420px] max-h-[520px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-white glow-ring overflow-hidden border border-foreground/10 shadow-2xl">
              <img
                src={arbaazHero}
                alt="Arbaaz — UI/UX Designer, Graphic Artist & AI Video Creator"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent p-5 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                  UI/UX · Graphic Design · AI Video
                </p>
                <p className="font-display text-2xl">Arbaaz K.</p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-5 top-10 glass rounded-2xl p-3"
              style={{ transform: "translateZ(60px)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Specialist
              </p>
              <p className="font-display text-sm">UI/UX & AI Video</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 bottom-16 glass rounded-2xl px-3 py-2"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  4.5+ yrs · creative
                </span>
              </div>
            </motion.div>
            <div className="absolute -inset-2 -z-10 rounded-[2rem] border border-foreground/10" />
          </Tilt>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-16 sm:mt-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="flex items-center gap-2">
          <span>Scroll</span> <span className="inline-block h-px w-12 bg-muted-foreground" />
        </span>
        <span className="hidden md:inline">Gurugram, Haryana · Remote worldwide</span>
      </motion.div>
    </section>
  );
}

const ABOUT_CARDS = [
  { key: "UI/UX Design", val: "Wireframes · Figma · App UI", Icon: Layout },
  { key: "Graphic Design", val: "Posters · Banners · Creatives", Icon: PenTool },
  { key: "Video Editing", val: "Reels · Promos · Sound FX", Icon: Film },
  { key: "Collateral", val: "Brochures · Standees · Print", Icon: Printer },
  { key: "Creative Tools", val: "Figma · Photoshop · Premiere", Icon: Wrench },
  { key: "Based In", val: "Gurugram, IN · Remote", Icon: MapPin },
];

function About() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 items-stretch">
        <div className="md:col-span-5 lg:col-span-4 flex flex-col">
          <p className="text-eyebrow mb-4 sm:mb-6">/ About</p>
          <div className="relative flex-1 min-h-[380px] sm:min-h-[440px] md:min-h-0 w-full overflow-hidden rounded-3xl border border-foreground/10 bg-white glow-ring shadow-xl">
            <img
              src={arbaazHero}
              alt="Arbaaz K. — about portrait"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-5 text-white">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
                About
              </p>
              <p className="font-display text-xl sm:text-2xl font-semibold">Arbaaz K.</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute -right-4 -top-4 h-20 w-20 pointer-events-none hidden sm:block"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full fill-foreground">
                <defs>
                  <path id="cabout" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="9" letterSpacing="2" className="font-mono">
                  <textPath href="#cabout">DESIGN · CRAFT · MOTION · </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <Reveal
              as="h2"
              className="text-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            >
              Frictionless UI/UX meets{" "}
              <em className="text-highlight italic">high-impact visual media</em> — from concept to
              final cut.
            </Reveal>
            <Reveal
              as="p"
              delay={0.08}
              className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              From intuitive web & mobile interfaces in Figma for SwiftAMS to thumb-stopping ad
              banners, event posters, and dynamic video edits for Edu Finn and Digital Cappuccino, I
              blend user-centered design, bold visual storytelling, and modern creative workflows to
              craft memorable digital experiences.
            </Reveal>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr pt-2">
            {ABOUT_CARDS.map((c, i) => (
              <Reveal key={c.key} delay={0.04 * i} y={12} blur={4}>
                <div className="group/card flex h-full min-h-[95px] flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 p-3.5 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.06] text-foreground transition-colors group-hover/card:bg-foreground/[0.1]">
                      <c.Icon size={14} className="sm:h-3.5 sm:w-3.5" />
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate">
                      {c.key}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">
                    {c.val}
                  </p>
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
    "Designed intuitive web & mobile UI/UX platforms in Figma",
    "200+ high-impact posters, ad banners & brand collateral",
    "50+ dynamic video edits, vertical reels & AI video creations",
  ];
  return (
    <section className="py-10 sm:py-12 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="card-white rounded-3xl p-6 sm:p-8 md:p-12"
      >
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[color:var(--highlight)]"
              style={{ background: "color-mix(in oklab, var(--highlight) 14%, transparent)" }}
            >
              <Sparkles size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Experience</span>
            </div>
            <p className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9]">
              <CountUp end={4.5} decimals={1} />
              <span className="text-highlight">+</span>
            </p>
            <p className="text-eyebrow mt-3">Years designing digital products & visual media</p>
          </div>
          <div className="md:col-span-7">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/85">
              4.5+ years crafting{" "}
              <em className="text-highlight not-italic font-medium">
                intuitive UI/UX designs, high-impact graphic collateral, dynamic video edits, and
                AI-powered visual media
              </em>{" "}
              — from interactive prototypes in Figma to thumb-stopping posters, ad banners, and
              cinematic reels.
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

/* ---------- Services / What I Do ---------- */

function Services() {
  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="mb-12 sm:mb-16 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-eyebrow mb-4">/ 03 — What I Do</p>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Creative services built for <em className="text-highlight italic">maximum impact</em>.
          </h2>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Three focused creative pillars — from frictionless Figma prototypes to high-converting
            ad banners and dynamic video edits.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="card-white group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)]"
          >
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {s.no}
                </span>
                <span className="card-white inline-flex h-12 w-12 items-center justify-center rounded-2xl text-foreground group-hover:text-highlight transition-colors">
                  <s.Icon size={22} />
                </span>
              </div>
              <h3 className="text-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-highlight">
                {s.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

              <div className="my-6 h-px w-full bg-border/60" />

              <ul className="space-y-3">
                {s.offerings.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-foreground/85">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-highlight/15 text-highlight">
                      <Sparkles size={9} />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-foreground/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Skills & Tools ---------- */

import figmaLogo from "@/assets/tools/figma.png";
import photoshopLogo from "@/assets/tools/photoshop.png";
import illustratorLogo from "@/assets/tools/illustrator.png";
import indesignLogo from "@/assets/tools/indesign.png";
import xdLogo from "@/assets/tools/xd.png";
import premiereproLogo from "@/assets/tools/premierepro.png";
import aftereffectsLogo from "@/assets/tools/aftereffects.png";
import canvaLogo from "@/assets/tools/canva.jpg";
import chatgptLogo from "@/assets/tools/chatgpt.png";
import claudeLogo from "@/assets/tools/claude.png";
import geminiLogo from "@/assets/tools/gemini.jpg";
import cursorLogo from "@/assets/tools/cursor.png";
import lovableLogo from "@/assets/tools/lovable.jpg";
import midjourneyLogo from "@/assets/tools/midjourney.png";

interface SkillItem {
  name: string;
  logo?: string;
  icon?: ComponentType<{ className?: string; size?: number }>;
  link?: string;
}

interface SkillTrackData {
  id: string;
  label: string;
  items: SkillItem[];
}

const SKILL_TRACKS: SkillTrackData[] = [
  {
    id: "design-tools",
    label: "Design & Motion Tools",
    items: [
      { name: "Figma", logo: figmaLogo, link: "https://www.figma.com/" },
      {
        name: "Adobe Photoshop",
        logo: photoshopLogo,
        link: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "Adobe Illustrator",
        logo: illustratorLogo,
        link: "https://www.adobe.com/products/illustrator.html",
      },
      {
        name: "Adobe InDesign",
        logo: indesignLogo,
        link: "https://www.adobe.com/products/indesign.html",
      },
      { name: "Adobe XD", logo: xdLogo, link: "https://www.adobe.com/products/xd.html" },
      {
        name: "Adobe Premiere Pro",
        logo: premiereproLogo,
        link: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "Adobe After Effects",
        logo: aftereffectsLogo,
        link: "https://www.adobe.com/products/aftereffects.html",
      },
      { name: "Canva", logo: canvaLogo, link: "https://www.canva.com/" },
      { name: "CapCut", icon: Film, link: "https://www.capcut.com/" },
    ],
  },
  {
    id: "ai-tools",
    label: "AI Generation & Creation Tools",
    items: [
      { name: "ChatGPT", logo: chatgptLogo, link: "https://chatgpt.com/" },
      { name: "Claude", logo: claudeLogo, link: "https://claude.ai/" },
      { name: "Gemini", logo: geminiLogo, link: "https://gemini.google.com/" },
      {
        name: "Adobe Firefly",
        logo: photoshopLogo,
        link: "https://www.adobe.com/products/firefly.html",
      },
      { name: "Figma AI", logo: figmaLogo, link: "https://www.figma.com/ai/" },
      { name: "Canva AI", logo: canvaLogo, link: "https://www.canva.com/ai/" },
      { name: "Cursor", logo: cursorLogo, link: "https://cursor.com/" },
      { name: "Lovable", logo: lovableLogo, link: "https://lovable.dev/" },
      { name: "Midjourney", logo: midjourneyLogo, link: "https://www.midjourney.com/" },
      { name: "Runway", icon: Sparkles, link: "https://runwayml.com/" },
      { name: "Kling", icon: Sparkles, link: "https://klingai.com/" },
      { name: "Luma Dream Machine", icon: Sparkles, link: "https://lumalabs.ai/dream-machine" },
      { name: "ElevenLabs", icon: Sparkles, link: "https://elevenlabs.io/" },
    ],
  },
  {
    id: "core-ux",
    label: "Core UI/UX & Design Skills",
    items: [
      { name: "Product Design", icon: Layout },
      { name: "UI Design", icon: Smartphone },
      { name: "UX Design", icon: Layers },
      { name: "UX Research", icon: Compass },
      { name: "User Flows", icon: Workflow },
      { name: "Wireframing", icon: PenTool },
      { name: "Interactive Prototyping", icon: MousePointer },
      { name: "Design Systems", icon: Atom },
      { name: "Information Architecture", icon: Network },
      { name: "SaaS/CRM Design", icon: Building2 },
      { name: "Landing Pages", icon: Monitor },
    ],
  },
  {
    id: "ai-workflow",
    label: "AI Workflows & Motion",
    items: [
      { name: "AI-assisted UI Design", icon: Wand2 },
      { name: "AI-assisted Wireframing", icon: Cpu },
      { name: "Prompt Engineering", icon: Bot },
      { name: "AI Image Generation", icon: Palette },
      { name: "AI Video Creation", icon: Clapperboard },
      { name: "Motion Graphics", icon: Video },
      { name: "Brand Identity", icon: Heart },
    ],
  },
];

function SkillTrack({
  label,
  index,
  items,
  reverse = false,
}: {
  label: string;
  index: string;
  items: SkillItem[];
  reverse?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      if (!isPaused && el) {
        const step = reverse ? -0.45 : 0.45;
        el.scrollLeft += step;
        const oneThird = el.scrollWidth / 3;
        if (!reverse && el.scrollLeft >= oneThird * 2) {
          el.scrollLeft -= oneThird;
        } else if (reverse && el.scrollLeft <= 0) {
          el.scrollLeft += oneThird;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (reverse && el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 3;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, reverse]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-2 border-b border-border/40 last:border-b-0">
      {/* Row Label */}
      <div className="flex items-center gap-2.5 shrink-0 md:w-56 lg:w-60">
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-highlight font-semibold">
          {index}
        </span>
        <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">
          {label}
        </span>
      </div>

      {/* Horizontal Track with fading masks */}
      <div
        className="relative flex-1 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-gradient-to-l from-card to-transparent" />

        <div
          ref={scrollerRef}
          className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1.5 scroll-smooth select-none"
          style={{ scrollbarWidth: "none" }}
        >
          {loop.map((item, i) => {
            const pillContent = (
              <>
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-4 w-4 shrink-0 rounded-sm object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : item.icon ? (
                  <item.icon size={15} className="shrink-0 text-foreground/70" />
                ) : (
                  <Sparkles size={14} className="shrink-0 text-highlight" />
                )}
                <span className="text-foreground">{item.name}</span>
              </>
            );

            const pillClasses =
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-xs sm:text-sm whitespace-nowrap font-medium transition-all duration-200 hover:border-neutral-400 hover:scale-[1.02] shadow-sm backdrop-blur-sm cursor-default";

            return item.link ? (
              <a
                key={`${item.name}-${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={pillClasses}
              >
                {pillContent}
              </a>
            ) : (
              <span key={`${item.name}-${i}`} className={pillClasses}>
                {pillContent}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-eyebrow mb-2 sm:mb-3">/ 04 — Skills & Tools</p>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Product craft, <em className="text-highlight italic">AI workflows</em> & tools.
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
          A landscape view of my creative toolkit across design software, generative AI models, core
          UI/UX methodologies, and motion pipelines.
        </p>
      </div>

      <div className="card-white rounded-3xl p-4 sm:p-6 md:p-8 space-y-1 sm:space-y-2 max-h-[540px] overflow-hidden border border-border/60 shadow-lg">
        {SKILL_TRACKS.map((track, i) => (
          <SkillTrack
            key={track.id}
            label={track.label}
            index={String(i + 1).padStart(2, "0")}
            items={track.items}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */

type JobLink = { label: string; href: string };
type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
  links?: JobLink[];
};

const EXPERIENCE: Job[] = [
  {
    company: "SwiftAMS (Study Abroad CRM)",
    role: "UI/UX Designer & Creative Lead",
    period: "Jun 2022 — Present",
    summary:
      "Designed intuitive CRM interfaces, user flows, wireframes, and interactive prototypes in Figma for desktop and mobile apps. Created 150+ marketing creatives, promotional posters, event banners, and feature announcement videos while maintaining cohesive brand design.",
    Icon: Briefcase,
    links: [
      { label: "Website", href: "https://www.swiftams.com/" },
      { label: "CRM", href: "https://app.swiftams.com/login" },
      { label: "Instagram", href: "https://www.instagram.com/swiftams/" },
      {
        label: "Agency App · Android",
        href: "https://play.google.com/store/apps/details?id=com.codexplabs.swiftcounsellorapp&pli=1",
      },
      {
        label: "Agency App · iOS",
        href: "https://apps.apple.com/in/app/swiftams-business/id6451433255",
      },
      {
        label: "Student App · Android",
        href: "https://play.google.com/store/apps/details?id=com.swiftams.swiftmobileapp",
      },
      { label: "Student App · iOS", href: "https://apps.apple.com/in/app/swiftams/id6469041818" },
      {
        label: "B2B Hub · Android",
        href: "https://play.google.com/store/apps/details?id=com.swiftams.swifthubapp",
      },
      { label: "B2B Hub · iOS", href: "https://apps.apple.com/us/app/swiftams-hub/id6474495227" },
    ],
  },
  {
    company: "Edu Finn",
    role: "Graphic Designer & Video Editor",
    period: "2024 — 2025",
    summary:
      "Designed multi-page brochures, event standees, promotional posters, and social media ad creatives. Produced, edited, and sound-designed high-retention vertical reels, student testimonial films, and marketing video campaigns for European university programs.",
    Icon: Layers,
    links: [
      { label: "Instagram", href: "https://www.instagram.com/edu_finn/" },
      { label: "YouTube", href: "https://www.youtube.com/@EduFinn" },
    ],
  },
  {
    company: "Digital Cappuccino",
    role: "Graphic Designer & Visual Artist",
    period: "2022 — 2023",
    summary:
      "Designed high-converting ad banners, social media campaigns, promotional graphics, and brand assets. Managed creative direction and content calendars across multi-channel client accounts.",
    Icon: Coffee,
    links: [{ label: "Website", href: "https://www.digitalcappuccino.com/" }],
  },
  {
    company: "Independent Projects",
    role: "UI/UX Designer & Video Editor",
    period: "2021",
    summary:
      "Designed web and mobile app interfaces, wireframes, and interactive prototypes. Produced promotional video edits, motion graphics, and distinctive brand identities for startups and creators.",
    Icon: Layers,
  },
];

function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className="mb-12 sm:mb-14 grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="text-eyebrow mb-4 sm:mb-6">/ 05 — Experience</p>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            4.5+ years shaping <em className="text-highlight italic">UI/UX, visual media</em> &
            dynamic video.
          </h2>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            Creative design roles and client collaborations — crafting frictionless digital
            products, high-impact ad campaigns, and engaging video content.
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
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {job.period}
                </span>
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
      if (it?.src) {
        const img = new Image();
        img.src = it.src;
      }
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {brochure.tagline}
        </span>
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

type WorkTab = "All" | "UI/UX Designs" | "Posters & Banners" | "Video & AI Video";
const WORK_TABS: WorkTab[] = ["All", "UI/UX Designs", "Posters & Banners", "Video & AI Video"];

function Work({
  onOpenImage,
  onOpenVideo,
}: {
  onOpenImage: (item: GalleryItem, list?: GalleryItem[], index?: number) => void;
  onOpenVideo: (item: VideoItem) => void;
}) {
  const [activeTab, setActiveTab] = useState<WorkTab>("All");
  const [socialMoreOpen, setSocialMoreOpen] = useState(false);

  // Categorized items
  const uiWebItems = GALLERY.filter((g) => g.category === "UI/UX");
  const uiMobileItems = GALLERY.filter((g) => g.category === "Mobile");
  const uiAllItems = [...uiWebItems, ...uiMobileItems];

  const posterItems = GALLERY.filter((g) => g.category === "Social");
  const standeeItems = GALLERY.filter(
    (g) => g.category === "Print" && g.id.startsWith("p") && Number(g.id.slice(1)) >= 6,
  );
  const brandItems = GALLERY.filter((g) => g.category === "Brand");

  const reelVideos = CORPORATE_REELS;
  const filmVideos = CORPORATE_FILMS;
  const aiVideos = AI_VIDEOS;
  const allVideos = [...reelVideos, ...filmVideos, ...aiVideos];

  return (
    <section id="work" className="relative py-16 sm:py-24">
      {/* Target anchor for #gallery backward-compatibility */}
      <div id="gallery" className="absolute -top-24 left-0" aria-hidden />

      <div className="mb-12 sm:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-eyebrow mb-4">/ 06 — Portfolio & Selected Work</p>
          <h2 className="text-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-[20ch]">
            Selected Works & <em className="text-highlight italic">Creative Showcase</em>
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Explore curated projects across UI/UX design, marketing posters & brand collateral, and
            dynamic video edits. Tap any item to inspect details or launch playback.
          </p>
        </div>

        {/* 4 Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {WORK_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "border-foreground bg-foreground text-background shadow-md scale-[1.02]"
                    : "border-border/70 text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content for Tabs */}
      <div className="space-y-16 sm:space-y-20">
        {/* 1. UI/UX Designs Tab */}
        {(activeTab === "All" || activeTab === "UI/UX Designs") && (
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-5"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight">
                  UI/UX & Product Design
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Web Platforms & Mobile Interfaces
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.18em]">
                {uiAllItems.length} Interface Screens
              </p>
            </motion.div>

            {/* Web Platforms & Dashboards */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Web Platforms & Dashboards
                </h4>
                <span
                  className="text-highlight"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                  }}
                >
                  Figma Systems
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {uiWebItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onOpenImage(item, uiAllItems, i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group relative block cursor-pointer text-left overflow-hidden rounded-3xl border border-border/60 bg-card p-3 transition-all duration-500 hover:border-highlight hover:shadow-2xl"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/5">
                      <Placeholder
                        label={item.label}
                        ratio="aspect-[16/10]"
                        variant={item.variant}
                        badge="UI/UX · Web"
                        src={item.src}
                        fit="contain"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-semibold text-foreground">
                          {item.label}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Figma High-Fidelity Design
                        </p>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-highlight group-hover:underline">
                        View UI →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile App UI */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Mobile Application UI
                </h4>
                <span
                  className="text-highlight"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                  }}
                >
                  iOS & Android
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {uiMobileItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onOpenImage(item, uiAllItems, uiWebItems.length + i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                    className="group relative block cursor-pointer text-left overflow-hidden rounded-2xl border border-border/60 bg-card p-2.5 transition-all duration-500 hover:border-highlight hover:shadow-xl"
                  >
                    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-black/5">
                      <Placeholder
                        label={item.label}
                        ratio="aspect-[9/16]"
                        variant={item.variant}
                        badge="Mobile App"
                        src={item.src}
                        fit="contain"
                      />
                    </div>
                    <div className="mt-2.5 px-1 flex items-center justify-between">
                      <p className="truncate text-xs font-medium text-foreground">{item.label}</p>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        Preview →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Posters & Banners Tab */}
        {(activeTab === "All" || activeTab === "Posters & Banners") && (
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-5"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight">
                  Graphic Design & Collateral
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Posters, Ad Banners & Brand Collateral
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.18em]">
                Print & Social Media Collateral
              </p>
            </motion.div>

            {/* Multi-page Brochures */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Multi-Page Brochures
                </h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-highlight">
                  Print-Ready · CMYK
                </span>
              </div>
              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {BROCHURES.map((b, idx) => (
                  <BrochureCard key={b.id} brochure={b} idx={idx} onOpen={onOpenImage} />
                ))}
              </div>
            </div>

            {/* Promotional Posters & Social Media Ad Creatives */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Promotional & Event Posters
                </h4>
                <span
                  className="text-highlight"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                  }}
                >
                  Ad Campaigns
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {posterItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onOpenImage(item, posterItems, i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
                    className="group relative block cursor-pointer text-left overflow-hidden rounded-2xl border border-border/60 bg-card p-2 transition-all duration-500 hover:border-highlight hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black/5">
                      <Placeholder
                        label={item.label}
                        ratio="aspect-[4/5]"
                        variant={item.variant}
                        badge="Poster"
                        src={item.src}
                        fit="contain"
                      />
                    </div>
                    <div className="mt-2 px-1 flex items-center justify-between">
                      <p className="truncate text-xs font-medium text-foreground">{item.label}</p>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        View →
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSocialMoreOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background hover:bg-highlight hover:border-highlight transition-colors"
                >
                  <Plus size={14} /> See More Social Creatives
                </button>
              </div>
            </div>

            {/* Standees & Brand Logos */}
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div className="mb-6 flex items-baseline gap-3">
                  <h4 className="font-display text-2xl font-bold text-foreground">
                    Event Standees
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Trade-Show Displays
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {standeeItems.slice(0, 3).map((s, idx) => (
                    <motion.button
                      key={s.id}
                      onClick={() => onOpenImage(s, standeeItems, idx)}
                      className="group block cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card p-1.5 transition-all hover:border-highlight"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                        <Placeholder
                          label={s.label}
                          ratio="aspect-[3/4]"
                          variant={s.variant}
                          src={s.src}
                          fit="contain"
                        />
                      </div>
                      <p className="mt-1 truncate text-center font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                        {s.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6 flex items-baseline gap-3">
                  <h4 className="font-display text-2xl font-bold text-foreground">
                    Brand Marks & Logos
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Identity Systems
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {brandItems.map((b, idx) => (
                    <motion.button
                      key={b.id}
                      onClick={() => onOpenImage(b, brandItems, idx)}
                      className="group block cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card p-2.5 transition-all hover:border-highlight"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/5">
                        <Placeholder
                          label={b.label}
                          ratio="aspect-[16/9]"
                          variant={b.variant}
                          src={b.src}
                          fit="contain"
                        />
                      </div>
                      <p className="mt-1.5 truncate text-center text-xs font-medium text-foreground">
                        {b.label}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Video & AI Video Tab */}
        {(activeTab === "All" || activeTab === "Video & AI Video") && (
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-5"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight">
                  Video Editing & AI Video
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Vertical Reels, Commercials & AI Video Creations
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.18em]">
                {allVideos.length} Video Projects
              </p>
            </motion.div>

            {/* Vertical Reels (9:16) */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Short-Form Content (Reels & Shorts)
                </h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-highlight">
                  Format 9:16 · Mobile First
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {reelVideos.map((v) => (
                  <motion.div
                    key={v.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-highlight hover:shadow-xl"
                  >
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                      <img
                        src={videoThumbnail(v.id)}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[15%] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <button
                        type="button"
                        onClick={() => onOpenVideo(v)}
                        aria-label={`Play ${v.title}`}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform group-hover:scale-110">
                          <Play size={16} className="translate-x-0.5 fill-black" />
                        </span>
                      </button>
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5 text-white">
                        <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur">
                          {v.client}
                        </span>
                        <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] tabular-nums backdrop-blur">
                          {v.len}
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="line-clamp-2 text-xs font-semibold text-foreground leading-snug">
                        {v.title}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenVideo(v)}
                        className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-highlight hover:underline"
                      >
                        <Maximize2 size={10} /> Watch Reel
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Corporate & Commercial Films (16:9) */}
            <div>
              <div className="mb-6 flex items-baseline gap-3">
                <h4 className="font-display text-2xl font-bold text-foreground">
                  Long-Form YouTube & Commercial Ads
                </h4>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Format 16:9 · 4K Mastered
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...filmVideos.slice(0, 3), ...aiVideos.slice(0, 3)].map((v) => (
                  <div
                    key={v.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-highlight hover:shadow-xl"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={videoThumbnail(v.id)}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[15%] transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <button
                        type="button"
                        onClick={() => onOpenVideo(v)}
                        aria-label={`Play ${v.title}`}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      >
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform group-hover:scale-110">
                          <Play size={18} className="translate-x-0.5 fill-black" />
                        </span>
                      </button>
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-white">
                        <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">
                          {v.client}
                        </span>
                        <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">
                          {v.len}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <p className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
                        {v.title}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
                        <button
                          type="button"
                          onClick={() => onOpenVideo(v)}
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-highlight hover:underline"
                        >
                          <Maximize2 size={11} /> Full View
                        </button>
                        <a
                          href={`https://www.youtube.com/watch?v=${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
                        >
                          <Download size={11} /> YouTube HD
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Social Follow Dialog */}
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
                Live social work and dynamic marketing creatives continue on Instagram & channels —
                tap a handle to open the profile.
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
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        @swiftams
                      </p>
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
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        @edu_finn
                      </p>
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

/* ---------- AI Video Showcase (Directly below Hero) ---------- */

function AiVideosSection({ onOpen }: { onOpen: (v: VideoItem) => void }) {
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);

  return (
    <section id="ai-videos" className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
          <span>Generative AI & Motion Direction</span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          AI Video{" "}
          <span
            className="text-highlight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Lab
          </span>
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          13 Speculative Commercials · 3D Product Reels · Automotive Cinematics
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          Bridging cinematic visual storytelling and generative AI workflows. Featuring 13 brand-new
          AI speculative commercials, 3D product reels, and automotive cinematics created with
          Midjourney, Runway Gen-3, Kling AI, and DaVinci Resolve.
        </p>
      </motion.div>

      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-border" />
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Curated{" "}
          <span
            className="text-highlight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            AI Films
          </span>
        </h3>
        <span className="h-px w-10 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {String(AI_VIDEOS.length).padStart(2, "0")} videos
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AI_VIDEOS.map((v, i) => {
          const isPlayingInline = inlinePlayingId === v.id;

          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]"
            >
              {/* Media container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {isPlayingInline ? (
                  <div className="relative h-full w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                    <button
                      type="button"
                      onClick={() => setInlinePlayingId(null)}
                      className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur hover:bg-black"
                      title="Stop inline playback"
                    >
                      <X size={12} />
                      <span>Stop</span>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => setInlinePlayingId(v.id)}
                    className="group/thumb relative h-full w-full cursor-pointer"
                  >
                    <img
                      src={videoThumbnail(v.id)}
                      alt={v.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover/thumb:scale-105 group-hover/thumb:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Centered Play Pill */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 group-hover/thumb:scale-110">
                        <Play size={20} className="translate-x-0.5 fill-black" />
                        <span className="pulse-ring absolute inset-0 rounded-full" />
                      </span>
                    </div>

                    {/* Overlay Badges */}
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5 text-white">
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                        <Sparkles size={10} className="text-highlight" />
                        <span>{v.client}</span>
                      </span>
                      <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">
                        {v.len}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Meta & Action Bar */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-highlight">
                      AI Film
                    </span>
                    {v.tag && (
                      <span className="truncate font-mono text-[10px] text-muted-foreground">
                        {v.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="font-display text-[15px] font-semibold leading-snug text-foreground line-clamp-2">
                    {v.title}
                  </h4>
                </div>

                {/* Card Action Controls: Play Inline, Full View, Download / HD */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    {isPlayingInline ? (
                      <button
                        type="button"
                        onClick={() => setInlinePlayingId(null)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                      >
                        <X size={12} />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setInlinePlayingId(v.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                        title="Play directly on page"
                      >
                        <Play size={11} className="fill-current" />
                        <span>Play</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onOpen(v)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                      title="Open full cinema view"
                    >
                      <Maximize2 size={11} />
                      <span>Full View</span>
                    </button>
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${v.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
                    title="Download / Watch HD on YouTube"
                  >
                    <Download size={11} />
                    <span>Download / HD</span>
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Corporate & Client Reels ---------- */

/* ---------- Corporate & Client Reels & Shorts ---------- */

function Videos({ onOpen }: { onOpen: (v: VideoItem) => void }) {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "reels" | "films" | "edufinn" | "swiftams"
  >("all");
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);

  const displayedReels =
    activeFilter === "swiftams"
      ? CORPORATE_REELS.filter((r) => r.client === "Swift AMS")
      : activeFilter === "edufinn"
        ? CORPORATE_REELS.filter((r) => r.client === "Edu Finn")
        : activeFilter === "films"
          ? []
          : CORPORATE_REELS;

  const displayedFilms =
    activeFilter === "swiftams"
      ? CORPORATE_FILMS.filter((f) => f.client === "Swift AMS")
      : activeFilter === "edufinn"
        ? CORPORATE_FILMS.filter((f) => f.client === "Edu Finn")
        : activeFilter === "reels"
          ? []
          : CORPORATE_FILMS;

  const totalCount = displayedReels.length + displayedFilms.length;

  return (
    <section id="videos" className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
          <Film size={12} />
          <span>Motion Direction & Production</span>
        </div>
        <h2 className="font-display font-bold leading-[1.05] tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Corporate{" "}
          <span
            className="text-highlight"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Reels
          </span>
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Vertical Reels (9:16) · Founder Stories · Product Video Promos
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          High-conversion vertical social reels, student testimonial documentaries, and product
          video promos produced for Edu Finn and Swift AMS.
        </p>

        {/* Official Channel Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.youtube.com/@EduFinn"
            target="_blank"
            rel="noopener noreferrer"
            className="card-white inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/40"
          >
            <Youtube size={15} className="text-red-600" />
            <span>@EduFinn on YouTube</span>
            <ExternalLink size={12} className="text-muted-foreground" />
          </a>
          <a
            href="https://www.youtube.com/@SwiftAMS"
            target="_blank"
            rel="noopener noreferrer"
            className="card-white inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/40"
          >
            <Youtube size={15} className="text-red-600" />
            <span>@SwiftAMS on YouTube</span>
            <ExternalLink size={12} className="text-muted-foreground" />
          </a>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setInlinePlayingId(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-foreground text-background shadow-md"
                : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <span>All Work ({CORPORATE_VIDEOS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("reels");
              setInlinePlayingId(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === "reels"
                ? "bg-foreground text-background shadow-md"
                : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <Smartphone size={13} />
            <span>Vertical Reels · 9:16 ({CORPORATE_REELS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("films");
              setInlinePlayingId(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === "films"
                ? "bg-foreground text-background shadow-md"
                : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <Film size={13} />
            <span>Landscape Films · 16:9 ({CORPORATE_FILMS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("edufinn");
              setInlinePlayingId(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === "edufinn"
                ? "bg-foreground text-background shadow-md"
                : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <span>Edu Finn</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("swiftams");
              setInlinePlayingId(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeFilter === "swiftams"
                ? "bg-foreground text-background shadow-md"
                : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            <span>Swift AMS</span>
          </button>
        </div>
      </motion.div>

      {/* Part 1: Vertical Reels & Shorts (9:16) */}
      {displayedReels.length > 0 && (
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground">
                <Smartphone size={14} />
              </span>
              <div>
                <h4 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  Vertical Reels & Shorts
                </h4>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Format 9:16 · Mobile Social Content
                </p>
              </div>
            </div>
            <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {displayedReels.length} Reels
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {displayedReels.map((v, i) => {
              const isPlayingInline = inlinePlayingId === v.id;

              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-xl"
                >
                  {/* Vertical 9:16 Media Viewport */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                    {isPlayingInline ? (
                      <div className="relative h-full w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setInlinePlayingId(null)}
                          className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[9px] font-mono text-white backdrop-blur hover:bg-black"
                          title="Stop inline playback"
                        >
                          <X size={11} />
                          <span>Stop</span>
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setInlinePlayingId(v.id)}
                        className="group/thumb relative h-full w-full cursor-pointer"
                      >
                        <img
                          src={videoThumbnail(v.id)}
                          alt={v.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover grayscale-[10%] transition-transform duration-500 group-hover/thumb:scale-105 group-hover/thumb:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 group-hover/thumb:scale-110">
                            <Play size={16} className="translate-x-0.5 fill-black" />
                          </span>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5 text-white">
                          <span className="rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur">
                            {v.client}
                          </span>
                          <span className="rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] tabular-nums backdrop-blur">
                            {v.len}
                          </span>
                        </div>

                        {/* Bottom Info inside the Reel viewport */}
                        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                          <span className="mb-1 inline-block rounded bg-foreground/20 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-zinc-300 backdrop-blur">
                            Short / Reel
                          </span>
                          <p className="font-display text-xs font-semibold leading-snug line-clamp-2 drop-shadow">
                            {v.title}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Reel Action Buttons */}
                  <div className="flex items-center justify-between gap-1 border-t border-border/50 p-2.5 text-xs bg-surface/50">
                    <button
                      type="button"
                      onClick={() => onOpen(v)}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium text-foreground hover:bg-foreground/5"
                      title="Open full theater view"
                    >
                      <Maximize2 size={10} />
                      <span>Full</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/shorts/${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
                      title="Watch Short on YouTube"
                    >
                      <span>Short</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Part 2: Horizontal Films & Demos (16:9) */}
      {displayedFilms.length > 0 && (
        <div>
          <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground/5 text-foreground">
                <Film size={14} />
              </span>
              <div>
                <h4 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  Documentaries & Product Spotlights
                </h4>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Format 16:9 · Client Stories & Feature Promos
                </p>
              </div>
            </div>
            <span className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
              {displayedFilms.length} Films
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedFilms.map((v, i) => {
              const isPlayingInline = inlinePlayingId === v.id;

              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-border hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35)]"
                >
                  {/* 16:9 Media container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    {isPlayingInline ? (
                      <div className="relative h-full w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setInlinePlayingId(null)}
                          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white backdrop-blur hover:bg-black"
                          title="Stop inline playback"
                        >
                          <X size={12} />
                          <span>Stop</span>
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setInlinePlayingId(v.id)}
                        className="group/thumb relative h-full w-full cursor-pointer"
                      >
                        <img
                          src={videoThumbnail(v.id)}
                          alt={v.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-700 group-hover/thumb:scale-105 group-hover/thumb:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        {/* Centered Play Pill */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="relative inline-flex h-13 w-13 items-center justify-center rounded-full bg-white/95 text-black shadow-lg transition-transform duration-300 group-hover/thumb:scale-110">
                            <Play size={20} className="translate-x-0.5 fill-black" />
                            <span className="pulse-ring absolute inset-0 rounded-full" />
                          </span>
                        </div>

                        {/* Overlay Badges */}
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5 text-white">
                          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                            <span>{v.client}</span>
                          </span>
                          <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] tabular-nums backdrop-blur">
                            {v.len}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Meta & Action Bar */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                          Client Film
                        </span>
                        {v.tag && (
                          <span className="truncate font-mono text-[10px] text-muted-foreground">
                            {v.tag}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display text-[15px] font-semibold leading-snug text-foreground line-clamp-2">
                        {v.title}
                      </h4>
                    </div>

                    {/* Card Action Controls */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/50 pt-3 text-xs">
                      <div className="flex items-center gap-1.5">
                        {isPlayingInline ? (
                          <button
                            type="button"
                            onClick={() => setInlinePlayingId(null)}
                            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                          >
                            <X size={12} />
                            <span>Stop</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setInlinePlayingId(v.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                            title="Play directly on page"
                          >
                            <Play size={11} className="fill-current" />
                            <span>Play</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpen(v)}
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/5"
                          title="Open full cinema view"
                        >
                          <Maximize2 size={11} />
                          <span>Full View</span>
                        </button>
                      </div>

                      <a
                        href={`https://www.youtube.com/watch?v=${v.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
                        title="Download / Watch HD on YouTube"
                      >
                        <Download size={11} />
                        <span>Download / HD</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Lightbox: image (download + comment) OR video (inline) ---------- */

function Lightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: NonNullable<LightboxState>;
  onClose: () => void;
  onNavigate?: (dir: -1 | 1) => void;
}) {
  const [comments, setComments] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const touchStartX = useRef<number | null>(null);

  const activeItemId = state.kind === "image" ? state.item.id : state.item.id;
  // reset comments when item changes
  useEffect(() => {
    setComments([]);
    setDraft("");
  }, [activeItemId]);

  // Keyboard arrows for prev/next
  useEffect(() => {
    if (!onNavigate || state.kind !== "image" || !state.list) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNavigate, state]);

  // Preload adjacent images
  useEffect(() => {
    if (state.kind !== "image" || !state.list || state.index == null) return;
    const preload = (i: number) => {
      const it = state.list?.[i];
      if (it?.src) {
        const img = new Image();
        img.src = it.src;
      }
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
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
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
            onClick={(e) => {
              e.stopPropagation();
              onNavigate?.(-1);
            }}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur hover:bg-foreground hover:text-background md:left-6"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate?.(1);
            }}
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
                  {String(state.index + 1).padStart(2, "0")} /{" "}
                  {String(state.list.length).padStart(2, "0")}
                </div>
              )}
            </div>
          ) : (
            <div
              className={
                state.item.aspect === "vertical"
                  ? "relative aspect-[9/16] h-[min(82vh,680px)] w-auto max-w-[90vw] overflow-hidden bg-black"
                  : "relative aspect-video w-[min(80vw,1000px)] bg-black"
              }
            >
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
              <p className="text-eyebrow mb-2 flex items-center gap-2">
                <span>{state.kind === "image" ? state.item.category : state.item.client}</span>
                {state.kind === "video" && state.item.category === "ai" && (
                  <span className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-highlight">
                    AI Film
                  </span>
                )}
                {state.kind === "video" && state.item.aspect === "vertical" && (
                  <span className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-highlight">
                    Reel (9:16)
                  </span>
                )}
                {state.kind === "video" && (
                  <span className="rounded-md border border-border bg-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    {state.item.len}
                  </span>
                )}
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
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={
                    state.item.aspect === "vertical"
                      ? `https://www.youtube.com/shorts/${state.item.id}`
                      : `https://www.youtube.com/watch?v=${state.item.id}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-md transition-all hover:bg-foreground/85"
                >
                  <Download size={13} />{" "}
                  {state.item.aspect === "vertical"
                    ? "Watch Reel on YouTube ↗"
                    : "Download / Watch HD ↗"}
                </a>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard?.writeText(
                      state.item.aspect === "vertical"
                        ? `https://www.youtube.com/shorts/${state.item.id}`
                        : `https://www.youtube.com/watch?v=${state.item.id}`,
                    )
                  }
                  className="card-white inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-foreground/5"
                >
                  <Share2 size={12} /> Share Link
                </button>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="mt-2 flex min-h-0 flex-1 flex-col gap-3">
            <p className="text-eyebrow">Comments · {comments.length}</p>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-sm">
              {comments.length === 0 && (
                <p className="text-muted-foreground">
                  No comments yet. Be the first to leave a note.
                </p>
              )}
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 bg-foreground/[0.04] px-3 py-2"
                >
                  {c}
                </div>
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

const SERVICE_OPTIONS = ["UI/UX Design", "Graphic & Banner Design", "Video Editing", "AI Video"];

const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Arbaaz, I saw your portfolio and wanted to discuss a project/query.";

interface ContactCardProps {
  isModal?: boolean;
  onSuccessClose?: () => void;
}

function ContactCard({ isModal = false, onSuccessClose }: ContactCardProps) {
  const [tab, setTab] = useState<"project" | "query">("project");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(["UI/UX Design"]);
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv],
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) {
      errs.name = "Please enter your full name";
    } else if (name.trim().length > 100) {
      errs.name = "Name must be under 100 characters";
    }

    if (!email.trim()) {
      errs.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    } else if (email.trim().length > 255) {
      errs.email = "Email must be under 255 characters";
    }

    if (!details.trim()) {
      errs.details =
        tab === "project" ? "Please provide project details" : "Please enter your question";
    } else if (details.trim().length < 5) {
      errs.details = "Message must be at least 5 characters";
    } else if (details.trim().length > 3000) {
      errs.details = "Message must be under 3000 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const isProjectTab = tab === "project";
    const formName = name.trim();
    const formEmail = email.trim();
    const formPhone = phone.trim();
    const formCompany = company.trim();
    const formService = isProjectTab
      ? selectedServices.join(", ") || "General Inquiry"
      : "General Inquiry";
    const formMessage = details.trim();

    // A. Telegram Push Notification
    const sendTelegram = async () => {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const telegramMessage = `🔔 New Portfolio Inquiry!\n\nType: ${isProjectTab ? "Project Inquiry" : "Quick Query"}\nName: ${formName}\nEmail: ${formEmail}\nPhone: ${formPhone || "Not provided"}\nCompany/URL: ${formCompany || "Not provided"}\nService: ${formService}\n\nMessage:\n${formMessage}`;

      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      });

      return await res.json();
    };

    // B. Web3Forms Email Backup
    const sendWeb3Forms = async () => {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          name: formName,
          email: formEmail,
          phone: formPhone || "Not provided",
          company: formCompany || "Not provided",
          subject: `New Inquiry from ${formName} - Portfolio`,
          service: formService,
          message: isProjectTab
            ? `Intent: Start a Project\nName: ${formName}\nEmail: ${formEmail}\nPhone: ${formPhone || "Not provided"}\nCompany/URL: ${formCompany || "Not provided"}\nServices: ${formService}\n\nProject Details:\n${formMessage}`
            : `Intent: Ask a Question\nName: ${formName}\nEmail: ${formEmail}\n\nQuestion / Topic:\n${formMessage}`,
          from_name: formName,
          botcheck: "",
        }),
      });
      return await res.json();
    };

    try {
      const [telegramResult, web3Result] = await Promise.allSettled([
        sendTelegram(),
        sendWeb3Forms(),
      ]);

      const isTelegramSuccess =
        telegramResult.status === "fulfilled" && Boolean(telegramResult.value?.ok);

      const isWeb3FormsSuccess =
        web3Result.status === "fulfilled" &&
        Boolean(web3Result.value?.success || web3Result.value?.ok);

      if (isTelegramSuccess || isWeb3FormsSuccess) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setSelectedServices(["UI/UX Design"]);
        setDetails("");
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrors({});
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;
  const mailtoFallbackUrl = `mailto:arbaazsince2002@gmail.com?subject=${encodeURIComponent(
    tab === "project"
      ? `Project Inquiry from ${name.trim() || "Client"}`
      : `Question from ${name.trim() || "Client"}`,
  )}&body=${encodeURIComponent(
    tab === "project"
      ? `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || "Not provided"}\nCompany/URL: ${company.trim() || "Not provided"}\nServices: ${selectedServices.join(", ")}\n\nProject Details:\n${details.trim()}`
      : `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nQuestion:\n${details.trim()}`,
  )}`;

  return (
    <div
      className={`rounded-3xl border border-border/70 card-white p-6 sm:p-8 md:p-10 shadow-xl ${isModal ? "" : "backdrop-blur-md"}`}
    >
      {/* Dual-Mode Segmented Tab Switcher */}
      <div
        role="tablist"
        aria-label="Contact intent mode"
        className="flex rounded-2xl bg-foreground/[0.05] p-1.5 border border-border/60 mb-8"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "project"}
          onClick={() => {
            setTab("project");
            setStatus("idle");
          }}
          className={`relative flex-1 rounded-xl py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] font-medium transition-all ${
            tab === "project"
              ? "bg-foreground text-background shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
          }`}
        >
          🚀 Start a Project
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "query"}
          onClick={() => {
            setTab("query");
            setStatus("idle");
          }}
          className={`relative flex-1 rounded-xl py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] font-medium transition-all ${
            tab === "query"
              ? "bg-foreground text-background shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
          }`}
        >
          💬 Ask a Question
        </button>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center py-10 px-4 rounded-2xl bg-foreground/[0.02] border border-border/70"
        >
          <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4">
            <CheckCircle2 size={30} />
          </div>
          <h4 className="font-display text-2xl font-bold text-foreground">Message Delivered!</h4>
          <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
            Thank you! Your message has been sent. I will respond to your email within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full bg-foreground px-6 py-2.5 min-h-[44px] text-xs font-mono uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/85 hover:shadow-md hover:-translate-y-0.5"
            >
              Send Another Message
            </button>
            {isModal && onSuccessClose && (
              <button
                type="button"
                onClick={onSuccessClose}
                className="rounded-full border border-border px-5 py-2.5 min-h-[44px] text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-left text-sm"
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p className="font-medium text-red-500">
                    Oops! Something went wrong. Please try again or reach out via WhatsApp/email
                    directly.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Don't worry — your inquiry can be sent straight to my phone or email below:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-white hover:bg-emerald-500 transition-colors shadow-sm"
                    >
                      💬 Open WhatsApp
                    </a>
                    <a
                      href={mailtoFallbackUrl}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <Mail size={12} /> Send via Email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`contact-name-${isModal ? "modal" : "section"}`}
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id={`contact-name-${isModal ? "modal" : "section"}`}
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                maxLength={100}
                placeholder="Alex Morgan"
                className={`w-full rounded-xl border bg-background/80 px-3.5 py-3 min-h-[46px] text-sm text-foreground outline-none transition-colors ${
                  errors.name
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-border/80 focus:border-foreground focus:ring-1 focus:ring-foreground/20"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-mono flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`contact-email-${isModal ? "modal" : "section"}`}
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id={`contact-email-${isModal ? "modal" : "section"}`}
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                maxLength={255}
                placeholder="alex@company.com"
                className={`w-full rounded-xl border bg-background/80 px-3.5 py-3 min-h-[46px] text-sm text-foreground outline-none transition-colors ${
                  errors.email
                    ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-border/80 focus:border-foreground focus:ring-1 focus:ring-foreground/20"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-mono flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Tab 1 Extra Fields: Phone, Company & Services Needed Chips */}
          {tab === "project" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Phone & Company / Website (Optional) */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`contact-phone-${isModal ? "modal" : "section"}`}
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
                  >
                    Phone Number{" "}
                    <span className="text-muted-foreground/60 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    id={`contact-phone-${isModal ? "modal" : "section"}`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={30}
                    placeholder="+1 (555) 000-0000 or +91..."
                    className="w-full rounded-xl border border-border/80 bg-background/80 px-3.5 py-3 min-h-[46px] text-sm text-foreground outline-none transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`contact-company-${isModal ? "modal" : "section"}`}
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
                  >
                    Company / Website{" "}
                    <span className="text-muted-foreground/60 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    id={`contact-company-${isModal ? "modal" : "section"}`}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={100}
                    placeholder="Company name or https://..."
                    className="w-full rounded-xl border border-border/80 bg-background/80 px-3.5 py-3 min-h-[46px] text-sm text-foreground outline-none transition-colors focus:border-foreground focus:ring-1 focus:ring-foreground/20"
                  />
                </div>
              </div>

              {/* Service Needed */}
              <div>
                <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Service Needed
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((srv) => {
                    const isSelected = selectedServices.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`rounded-full px-3.5 py-1.5 min-h-[36px] text-xs font-mono tracking-wide transition-all border ${
                          isSelected
                            ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                            : "bg-background/60 text-muted-foreground border-border/80 hover:border-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {srv}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Details / Question Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor={`contact-details-${isModal ? "modal" : "section"}`}
                className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
              >
                {tab === "project" ? "Project Details" : "Your Question / Topic"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <span className="font-mono text-[10px] text-muted-foreground">
                {details.length}/3000
              </span>
            </div>
            <textarea
              id={`contact-details-${isModal ? "modal" : "section"}`}
              name="details"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                if (errors.details) setErrors((prev) => ({ ...prev, details: "" }));
              }}
              rows={tab === "project" ? 5 : 4}
              maxLength={3000}
              placeholder={
                tab === "project"
                  ? "Describe your product goals, audience, deliverables, or inspiration..."
                  : "Ask about availability, design toolstack, workflow, or anything you'd like to discuss..."
              }
              className={`w-full resize-none rounded-xl border bg-background/80 px-3.5 py-3 text-sm text-foreground outline-none transition-colors ${
                errors.details
                  ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                  : "border-border/80 focus:border-foreground focus:ring-1 focus:ring-foreground/20"
              }`}
            />
            {errors.details && (
              <p className="mt-1 text-xs text-red-500 font-mono flex items-center gap-1">
                <AlertCircle size={12} /> {errors.details}
              </p>
            )}
          </div>

          {/* CTA Submit Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 min-h-[48px] text-xs font-medium uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/85 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : tab === "project" ? (
              <>
                Send Project Brief{" "}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            ) : (
              <>
                Submit Query{" "}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const words = ["Have", "a", "project", "in", "mind?"];
  const [open, setOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden rounded-[2.5rem] border border-border/60 glass my-16 sm:my-24 p-6 sm:p-10 md:p-14 lg:p-16"
    >
      <div
        className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-foreground/[0.07] blur-3xl animate-orb"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-highlight/20 blur-3xl animate-orb"
        style={{ animationDelay: "-8s" }}
        aria-hidden
      />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Direct Info & WhatsApp Action Card */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-eyebrow mb-3">/ Say hello</p>
            <h2 className="text-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05]">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mr-[0.2em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <span className="italic text-highlight font-display">Let's make it.</span>
            </h2>
            <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
              Currently accepting select projects in UI/UX design, marketing graphics & high-impact
              AI videos.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/80">
                Available · Q1 2026
              </span>
            </div>
          </div>

          {/* Direct WhatsApp Action Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 sm:p-6 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-emerald-500 font-semibold flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Direct WhatsApp
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">Instant Reply</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Prefer direct messaging? Connect with me directly on WhatsApp for real-time project
              discussions, quick scopes, or questions.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-3 min-h-[44px] text-xs font-mono uppercase tracking-[0.16em] text-white shadow-md transition-all hover:-translate-y-0.5"
            >
              💬 Chat Directly on WhatsApp
            </a>
          </div>

          {/* Contact Details */}
          <div className="grid gap-6 sm:grid-cols-2 pt-2">
            <div>
              <p className="text-eyebrow mb-1.5">Email</p>
              <a
                href="mailto:arbaazsince2002@gmail.com"
                className="text-base link-underline break-all"
              >
                arbaazsince2002@gmail.com
              </a>
              <p className="text-eyebrow mb-1.5 mt-5">Phone</p>
              <a href="tel:+918527766839" className="text-base link-underline">
                +91 85277 66839
              </a>
            </div>
            <div>
              <p className="text-eyebrow mb-1.5">Location</p>
              <p className="text-base text-foreground/85">Gurugram, Haryana · India</p>
              <p className="text-eyebrow mb-1.5 mt-5">Elsewhere</p>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="link-underline text-xs"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Dual-Mode Form Card */}
        <div className="lg:col-span-7">
          <ContactCard />
        </div>
      </div>

      <ContactFormDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}

function ContactFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md overflow-y-auto"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-xl rounded-3xl border border-border/80 card-white p-6 sm:p-8 shadow-2xl"
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-5 top-5 rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
            <div className="mb-6 pr-8">
              <p className="text-eyebrow mb-1">/ Get in touch</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Let's start a{" "}
                <span
                  className="text-highlight italic"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  conversation
                </span>
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Choose an inquiry type below or connect via WhatsApp for an immediate response.
              </p>
            </div>
            <ContactCard isModal onSuccessClose={() => onOpenChange(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border/60 py-8 md:flex-row md:items-center md:justify-between">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        © 2026 Arbaaz — UI/UX Designer · Graphic Artist · AI Video Creator
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Gurugram, India · Available worldwide
      </p>
    </footer>
  );
}

function TelegramPlaneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.92 3.12a1.36 1.36 0 0 0-1.42-.25L2.83 10.3a1.35 1.35 0 0 0-.1 2.53l5.06 1.95 1.95 6.07a1.35 1.35 0 0 0 2.3.48l2.85-2.85 4.54 3.33a1.36 1.36 0 0 0 2.19-.82l3.05-16.14a1.36 1.36 0 0 0-.75-1.73zM9.36 13.97l8.2-6.23-6.49 7.45-.28 3.46-1.43-4.68zm9.18 5.63-4.4-3.23 7.07-8.12-2.67 11.35z" />
    </svg>
  );
}

function QuickChatFab() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = msg.trim();
    if (!text || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: `💬 Quick Chat Ping from Portfolio Visitor:\n\n${text}`,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("sent");
        setMsg("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right FAB) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
        {/* Sleek Tooltip on hover (desktop only, hidden when open) */}
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-background opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 shadow-lg hidden sm:block">
            Chat on Telegram
          </span>
        )}

        <motion.button
          onClick={() => {
            setOpen((v) => !v);
            if (status === "sent") setStatus("idle");
          }}
          aria-label={open ? "Close Telegram chat" : "Chat on Telegram"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-2xl transition-all duration-300 hover:bg-[#1E88E5] hover:shadow-[0_0_28px_rgba(34,158,217,0.55)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="telegram"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center -translate-x-0.5 translate-y-0.5"
              >
                <TelegramPlaneIcon className="h-6 w-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Online green indicator dot */}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </span>
          )}
          {!open && (
            <span className="pulse-ring absolute inset-0 rounded-full border border-[#229ED9]/50" />
          )}
        </motion.button>
      </div>

      {/* Mini Chat Drawer / Popover (Hybrid Experience) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[330px] overflow-hidden rounded-3xl border border-border/70 bg-popover/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 bg-foreground/[0.03] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-sm">
                  <TelegramPlaneIcon className="h-4 w-4 -translate-x-0.5 translate-y-0.5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-popover" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">Let's Chat</p>
                  <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-emerald-500 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online on Telegram
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-3.5 space-y-3">
              {/* Option A (Instant Direct Launch) */}
              <a
                href={TELEGRAM_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#229ED9] hover:bg-[#1E88E5] px-4 py-3 text-xs font-mono uppercase tracking-[0.14em] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5"
              >
                <TelegramPlaneIcon className="h-4 w-4 -translate-x-0.5 translate-y-0.5 transition-transform group-hover:scale-110" />
                <span>Open Telegram App (@{TELEGRAM_USERNAME})</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Divider */}
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <span className="relative bg-popover px-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  or send a quick ping
                </span>
              </div>

              {/* Option B (Quick In-Page Message) */}
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center space-y-2"
                >
                  <p className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} /> Sent to Arbaaz's Telegram! ✓
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Message received on phone. Continue chatting directly:
                  </p>
                  <div className="pt-1 flex items-center justify-center gap-2">
                    <a
                      href={TELEGRAM_DIRECT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#229ED9] hover:bg-[#1E88E5] text-white px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] font-medium transition-colors shadow-sm"
                    >
                      Open Chat (@{TELEGRAM_USERNAME}) <ArrowUpRight size={12} />
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="rounded-full border border-border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                    >
                      New Ping
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={send} className="space-y-2">
                  <textarea
                    value={msg}
                    onChange={(e) => {
                      setMsg(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    rows={3}
                    maxLength={1000}
                    autoFocus
                    placeholder="Type a quick message..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#229ED9] focus:ring-1 focus:ring-[#229ED9]/20"
                  />
                  {status === "error" && (
                    <p className="text-[11px] text-red-500 font-mono flex items-center gap-1">
                      <AlertCircle size={12} /> Failed to ping. Please use the button above.
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <p className="font-mono text-[10px] text-muted-foreground">{msg.length}/1000</p>
                    <button
                      type="submit"
                      disabled={!msg.trim() || status === "sending"}
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 min-h-[38px] text-[11px] font-medium uppercase tracking-[0.18em] text-background transition-all hover:bg-foreground/85 disabled:opacity-40 shadow-sm"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send</span>
                          <Send size={12} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
