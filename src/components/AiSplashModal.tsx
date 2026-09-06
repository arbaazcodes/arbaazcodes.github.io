import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, ArrowRight, Sparkles } from "lucide-react";
import type { VideoItem } from "@/routes/index";

interface AiSplashModalProps {
  videos: VideoItem[];
  videoThumbnail: (id: string) => string;
  onWatchAiVideos: () => void;
  onSelectVideo: (v: VideoItem) => void;
}

export function AiSplashModal({
  videos,
  videoThumbnail,
  onWatchAiVideos,
  onSelectVideo,
}: AiSplashModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = localStorage.getItem("has_seen_ai_splash_v2");
      if (!seen) {
        const timer = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem("has_seen_ai_splash_v2", "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    handleClose();
    onWatchAiVideos();
  };

  const handleCardClick = (v: VideoItem) => {
    handleClose();
    onSelectVideo(v);
  };

  // Lock body scroll while splash is active and handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // Smooth continuous right-to-left scrolling filmstrip
  const loopVideos = [...videos, ...videos];

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const tick = () => {
      if (!paused && el) {
        el.scrollLeft += 0.85;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, paused]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ai-splash-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-splash-title"
        >
          {/* Backdrop matching portfolio ambient look */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md dark:bg-black/80"
          />

          {/* Modal Container adhering strictly to Portfolio Design System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-border/80 bg-card text-foreground shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close announcement"
              className="card-white absolute right-3 top-3 sm:right-4 sm:top-4 z-30 inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/70 text-foreground transition-all hover:bg-foreground/5"
            >
              <X size={16} />
            </button>

            <div className="relative pt-7 px-6 sm:px-8 pb-4">
              {/* Eyebrow Badge */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
                <span>New Work · AI Creative Studio</span>
              </div>

              {/* Title using Portfolio fonts: Bricolage & Instrument Serif */}
              <h2
                id="ai-splash-title"
                className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
              >
                I also created AI videos —{" "}
                <span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                  className="text-highlight"
                >
                  look and watch!
                </span>
              </h2>

              <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                Explore 13 speculative commercial spots, 3D product reels, and automotive cinematics created with Midjourney, Runway Gen-3, Kling AI, and DaVinci Resolve.
              </p>
            </div>

            {/* Continuous Right-to-Left Scrolling Video Filmstrip */}
            <div
              className="relative my-4 w-full overflow-hidden border-y border-border/50 bg-surface/50 py-4"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Left & Right Soft Fade Gradients */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent" />

              <div
                ref={scrollerRef}
                className="no-scrollbar flex w-full gap-3.5 overflow-x-auto px-4"
                style={{ scrollBehavior: "auto" }}
              >
                {loopVideos.map((v, i) => (
                  <button
                    key={`${v.id}-${i}`}
                    type="button"
                    onClick={() => handleCardClick(v)}
                    className="group relative flex-shrink-0 w-[210px] sm:w-[240px] text-left cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-foreground/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                      <img
                        src={videoThumbnail(v.id)}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition-transform duration-300 group-hover:scale-110">
                          <Play size={14} className="translate-x-0.5 fill-black" />
                        </span>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5 text-white">
                        <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur">
                          {v.client}
                        </span>
                        <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] tabular-nums backdrop-blur">
                          {v.len}
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <p className="font-display text-xs font-semibold leading-snug text-foreground line-clamp-1 group-hover:text-highlight transition-colors">
                        {v.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-col-reverse gap-3 p-5 sm:px-8 sm:py-6 sm:flex-row sm:items-center sm:justify-between border-t border-border/40">
              <button
                type="button"
                onClick={handleClose}
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors py-2 px-3 text-center"
              >
                Continue to Portfolio
              </button>

              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold text-background shadow-md transition-all hover:bg-foreground/90"
              >
                <span>Explore AI Video Lab ({videos.length} Films)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AiSplashModal;
