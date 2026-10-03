import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Play,
  MessageSquare,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  MessageCircle,
  Palette,
  Sparkles,
  Layers,
  Layout,
  ExternalLink,
} from "lucide-react";
import {
  ALL_DESIGNS,
  DESIGN_CATEGORIES,
  type DesignCategory,
  type DesignItem,
} from "../data/designs-data";
import { WHATSAPP_PHONE } from "./index";

export const Route = createFileRoute("/all-designs")({
  head: () => ({
    meta: [
      { title: "All Designs — Arbaaz Khan | UI/UX & Graphic Designer" },
      {
        name: "description",
        content:
          "Browse the complete design archive of Arbaaz Khan — UI/UX design, SaaS CRM interfaces, mobile apps, brand identities, marketing campaigns, posters and editorial brochures.",
      },
      {
        property: "og:title",
        content: "All Designs — Arbaaz Khan | UI/UX & Graphic Designer",
      },
      {
        property: "og:description",
        content:
          "Browse the complete design archive of Arbaaz Khan — UI/UX design, SaaS CRM interfaces, mobile apps, brand identities, marketing campaigns, posters and editorial brochures.",
      },
    ],
  }),
  component: AllDesignsPage,
});

function AllDesignsPage() {
  const [dark, setDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState<DesignCategory>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter items
  const filteredItems =
    activeCategory === "ALL"
      ? ALL_DESIGNS
      : ALL_DESIGNS.filter((item) => item.category === activeCategory);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null,
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filteredItems.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="grain relative min-h-screen text-foreground overflow-x-hidden">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-foreground/[0.05] blur-3xl animate-orb" />
        <div
          className="absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full bg-highlight/10 blur-3xl animate-orb"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="absolute bottom-40 left-10 h-[450px] w-[450px] rounded-full bg-foreground/[0.04] blur-3xl animate-orb"
          style={{ animationDelay: "-14s" }}
        />
      </div>

      {/* =========================================================================
          NAVBAR: ARBAAZ | ALL DESIGNS | AI VIDEOS | RESUME | LET'S TALK
          ========================================================================= */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] h-[68px] transition-all duration-300 ${
          scrolled
            ? "glass border-b border-border/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]"
            : "bg-background/70 backdrop-blur-md border-b border-border/30"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12">
          {/* Brand Left: ARBAAZ */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-sm font-semibold">a</span>
              <span className="pulse-ring absolute inset-0 rounded-full" />
            </span>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-bold tracking-tight text-foreground">
                Arbaaz
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-border/70 bg-card px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
                UI/UX · Graphic · Motion
              </span>
            </div>
          </Link>

          {/* Center / Right Links */}
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {/* 1. ALL DESIGNS (Active state) */}
              <span
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-foreground/30 bg-foreground/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm"
              >
                <Palette size={13} className="text-highlight" />
                <span>All Designs</span>
              </span>

              {/* 2. AI VIDEOS */}
              <a
                href="/#ai-videos"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-foreground/5 active:scale-95"
              >
                <Play size={11} className="fill-current text-highlight" />
                <span>AI Videos</span>
              </a>

              {/* 3. RESUME */}
              <Link
                to="/resume"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-foreground/5 active:scale-95"
              >
                <FileText size={13} />
                <span>Resume</span>
              </Link>

              {/* 4. LET'S TALK */}
              <a
                href="/#contact"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-foreground px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-background transition-all duration-200 hover:bg-foreground/85 active:scale-95 shadow-sm"
              >
                <MessageSquare size={12} />
                <span>Let's Talk</span>
              </a>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground transition-all duration-200 hover:bg-foreground/10 hover:border-foreground/40 active:scale-95"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex md:hidden h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground transition-all duration-200 hover:bg-foreground/10 hover:border-foreground/40 active:scale-95"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-popover border-l border-border/70 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background font-display text-xs font-bold">
                    a
                  </span>
                  <div>
                    <span className="font-display font-bold text-base text-foreground">
                      Arbaaz Khan
                    </span>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      UI/UX & Graphic Designer
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/60 text-foreground hover:bg-foreground/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 px-6 py-6 space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-highlight font-semibold px-2">
                  Navigation
                </p>

                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
                  >
                    <span className="font-display text-lg">Home</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                      Portfolio
                    </span>
                  </Link>

                  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 bg-foreground/10 text-foreground font-medium">
                    <span className="font-display text-lg flex items-center gap-2">
                      <Palette size={16} className="text-highlight" />
                      All Designs
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-highlight">
                      Active
                    </span>
                  </div>

                  <a
                    href="/#ai-videos"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
                  >
                    <span className="font-display text-lg">AI Videos</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                      Motion & Films
                    </span>
                  </a>

                  <Link
                    to="/resume"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
                  >
                    <span className="font-display text-lg">Resume</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                      CV & Overview
                    </span>
                  </Link>

                  <a
                    href="/#contact"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all"
                  >
                    <span className="font-display text-lg">Let's Talk</span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-muted-foreground">
                      Contact
                    </span>
                  </a>
                </div>
              </div>

              <div className="border-t border-border/60 px-6 py-4 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Gurugram, Haryana · Available for UI/UX & Design roles
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 pb-24">
        {/* Header Hero */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 sm:pb-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                <Palette size={12} className="text-highlight" />
                <span>Complete Archive</span>
              </div>
              <h1 className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground">
                All{" "}
                <em
                  className="text-highlight italic"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  Designs
                </em>
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                A complete visual archive of digital products, interfaces, brand systems, social
                campaigns, event posters and editorial brochures designed by Arbaaz Khan.
              </p>
            </div>

            {/* Metric pill */}
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-border/70 card-white px-4 py-3 text-right">
                <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {ALL_DESIGNS.length}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Curated Artworks
                </p>
              </div>
            </div>
          </div>

          {/* =======================================================================
              CATEGORY NAVIGATION / FILTER BAR
              ======================================================================= */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-2">
            {DESIGN_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "ALL"
                  ? ALL_DESIGNS.length
                  : ALL_DESIGNS.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-md scale-[1.02]"
                      : "border border-border/70 bg-card text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9.5px] tabular-nums font-mono transition-colors ${
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-foreground/5 text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            GALLERY GRID
            ========================================================================= */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max"
        >
          {filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.04 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-highlight/80 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                {/* Media Container with natural ratio preservation */}
                <div
                  className={`relative w-full ${item.ratio} overflow-hidden bg-black/5 dark:bg-black/40 flex items-center justify-center p-3`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Top pill badges */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 pointer-events-none">
                    <span className="rounded-md border border-border/70 bg-background/85 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground backdrop-blur-sm shadow-sm">
                      {item.subcategory}
                    </span>
                    {item.client && (
                      <span className="rounded-md bg-foreground/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                        {item.client}
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Overlay Pill */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-black shadow-lg">
                      <ExternalLink size={11} />
                      View Full
                    </span>
                  </div>
                </div>

                {/* Card Meta Footer */}
                <div className="flex flex-col justify-between border-t border-border/50 p-4 bg-surface/40">
                  <div>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="font-mono text-[9.5px] uppercase tracking-wider text-highlight font-semibold">
                        {item.category}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground truncate">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2 text-[10px] font-mono text-muted-foreground">
                    <span>Inspect</span>
                    <span className="text-highlight group-hover:translate-x-0.5 transition-transform">
                      ↗
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="my-20 text-center">
            <p className="font-display text-xl font-bold text-foreground">No designs found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try switching back to the "All Designs" category filter.
            </p>
          </div>
        )}

        {/* Back to top or home */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4 pt-10 border-t border-border/50">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/80 bg-card px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/40 shadow-sm"
          >
            ← Back to Homepage
          </Link>
          <a
            href="/#contact"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-background transition-all hover:bg-foreground/85 shadow-sm"
          >
            Let's Work Together ↗
          </a>
        </div>
      </main>

      {/* =========================================================================
          LIGHTBOX MODAL (Reusing exact portfolio lightbox behavior)
          ========================================================================= */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />

            {/* Prev / Next navigation buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length,
                    );
                  }}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur hover:bg-foreground hover:text-background transition-colors md:left-6"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                  }}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur hover:bg-foreground hover:text-background transition-colors md:right-6"
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
              {/* Media viewport side */}
              <div className="relative flex items-center justify-center bg-black/40 p-4">
                <div className="relative flex max-h-[85vh] md:max-h-[90vh] items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeLightboxItem.id}
                      src={activeLightboxItem.src}
                      alt={activeLightboxItem.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="block h-auto w-auto max-h-[85vh] md:max-h-[90vh] max-w-[min(75vw,1200px)] object-contain"
                    />
                  </AnimatePresence>

                  {/* Counter badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
                    {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                    {String(filteredItems.length).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* Detail side */}
              <div className="flex w-full shrink-0 flex-col justify-between gap-5 overflow-y-auto p-6 md:w-[340px] md:p-8 bg-card/60">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-eyebrow mb-2 flex items-center gap-2">
                        <span className="text-highlight">{activeLightboxItem.category}</span>
                        <span>·</span>
                        <span className="text-muted-foreground">
                          {activeLightboxItem.subcategory}
                        </span>
                      </p>
                      <h3 className="font-display text-xl leading-tight font-bold md:text-2xl text-foreground">
                        {activeLightboxItem.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {activeLightboxItem.type}
                        {activeLightboxItem.client ? ` · ${activeLightboxItem.client}` : ""}
                      </p>
                    </div>

                    <button
                      onClick={() => setLightboxIndex(null)}
                      aria-label="Close lightbox"
                      className="card-white inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-foreground/5"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={activeLightboxItem.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`${activeLightboxItem.id}-${activeLightboxItem.title.replace(/\s+/g, "-")}.webp`}
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/85 transition-colors"
                    >
                      <Download size={13} /> Download
                    </a>
                    <button
                      onClick={() => navigator.clipboard?.writeText(activeLightboxItem.title)}
                      className="card-white inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-foreground/5 transition-colors"
                    >
                      <MessageCircle size={12} /> Copy Title
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    Inquire About This Work
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                      `Hi Arbaaz, I saw "${activeLightboxItem.title}" on your portfolio and wanted to discuss a similar project.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.14em] text-white hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    💬 Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 border-t border-border/60 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          © 2026 Arbaaz Khan — UI/UX Designer · Graphic Designer · AI Video &amp; Motion
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Gurugram, India · Available worldwide
        </p>
      </footer>
    </div>
  );
}
