import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";
import {
  ArrowLeft, Download, FileText, ExternalLink, Eye, Maximize2, Printer,
} from "lucide-react";
import resumePdf from "../assets/resume.pdf.asset.json";
import resumePreview from "../assets/resume-preview.jpg.asset.json";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Arbaaz K." },
      { name: "description", content: "Download or preview the resume of Arbaaz K. — multidisciplinary designer across UI/UX, brand, print and motion." },
      { property: "og:title", content: "Resume — Arbaaz K." },
      { property: "og:description", content: "One-page resume of Arbaaz K., multidisciplinary designer." },
      { property: "og:image", content: resumePreview.url },
    ],
  }),
  component: ResumePage,
});

const HIGHLIGHTS = [
  "4+ years across EdTech, CRM & corporate brands",
  "UI/UX, identity systems, print, motion in one place",
  "Selected clients & toolset on a single page",
  "Open in browser, download or print directly",
];

function ResumePage() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14 });
  const [viewer, setViewer] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-foreground/[0.06] blur-3xl animate-orb" />
        <div className="absolute -bottom-40 right-1/5 h-[480px] w-[480px] rounded-full bg-[var(--highlight)]/10 blur-3xl animate-orb" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Top bar */}
      <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-6">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 rounded-full glass px-3 py-2 md:px-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            arbaaz/resume.pdf
          </span>
          <a
            href={resumePdf.url}
            download="Arbaaz-K-Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
          >
            <Download className="h-3 w-3" /> Download
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-6 pt-32 pb-24 md:px-12 md:pt-40 md:pb-32 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid gap-6 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <p className="text-eyebrow mb-4">/ Curriculum vitae</p>
            <h1 className="text-display text-[clamp(2.5rem,8vw,6rem)]">
              Resume. <br />
              <span className="text-highlight">On one page.</span>
            </h1>
          </div>
          <p className="md:col-span-5 max-w-md text-base leading-relaxed text-muted-foreground">
            A clean, no-nonsense overview — experience, disciplines, tools and
            selected clients. Preview it here or grab the PDF.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* PDF Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="md:col-span-8 tilt-3d"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ rotateX: sx, rotateY: sy, transformPerspective: 1400 }}
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-x-10 -bottom-14 h-32 rounded-full bg-foreground/15 blur-3xl" aria-hidden />
              {/* Back sheets */}
              <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-2xl card-white opacity-50" aria-hidden />
              <div className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1deg] rounded-2xl card-white opacity-75" aria-hidden />

              <div className="relative overflow-hidden rounded-2xl card-white">
                {/* Chrome */}
                <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Arbaaz-K-Resume.pdf
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewer(true)}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    >
                      <Maximize2 className="h-3 w-3" /> Full
                    </button>
                    <a
                      href={resumePdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    >
                      <ExternalLink className="h-3 w-3" /> Open
                    </a>
                  </div>
                </div>

                {/* Page */}
                <button
                  type="button"
                  onClick={() => setViewer(true)}
                  className="group block w-full overflow-hidden bg-background"
                  style={{ aspectRatio: "1 / 1.414" }}
                  aria-label="Open full-screen preview"
                >
                  <img
                    src={resumePreview.url}
                    alt="Resume preview — Arbaaz K."
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                  />
                </button>
              </div>

              {/* Floating chips */}
              <motion.div
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -left-5 top-16 hidden rounded-full card-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] md:block"
              >
                A4 · PDF
              </motion.div>
              <motion.div
                animate={reduce ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -right-5 bottom-20 hidden items-center gap-2 rounded-full card-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] md:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" /> Updated 2026
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Side */}
          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="md:col-span-4 md:sticky md:top-32"
          >
            <div className="rounded-2xl card-white p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-background">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">Arbaaz-K-Resume.pdf</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    A4 · ~{Math.max(1, Math.round(resumePdf.size / 1024))} KB · 1 page
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                {HIGHLIGHTS.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--highlight)]" />
                    <span className="text-foreground/85">{t}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={resumePdf.url}
                  download="Arbaaz-K-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
                <button
                  onClick={() => setViewer(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                >
                  <Eye className="h-4 w-4" /> Full preview
                </button>
                <a
                  href={resumePdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                >
                  <Printer className="h-4 w-4" /> Open & print
                </a>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Or grab a copy via email — arbaazsince2002@gmail.com
              </p>
            </div>
          </motion.aside>
        </div>
      </main>

      {/* Full-screen viewer */}
      {viewer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setViewer(false); }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3 md:px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Arbaaz-K-Resume.pdf
            </span>
            <div className="flex items-center gap-2">
              <a
                href={resumePdf.url}
                download="Arbaaz-K-Resume.pdf"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-background hover:-translate-y-0.5 transition-transform"
              >
                <Download className="h-3 w-3" /> Download
              </a>
              <button
                onClick={() => setViewer(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] hover:bg-foreground/5"
              >
                Close
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 overflow-hidden p-3 md:p-6"
          >
            <object
              data={`${resumePdf.url}#toolbar=1&view=FitH`}
              type="application/pdf"
              className="h-full w-full rounded-xl border border-border bg-background"
            >
              <iframe
                src={resumePdf.url}
                title="Resume PDF"
                className="h-full w-full rounded-xl"
              />
            </object>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
