import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Play, ArrowRight } from "lucide-react";

interface AiSplashModalProps {
  onWatchAiVideos: () => void;
}

export function AiSplashModal({ onWatchAiVideos }: AiSplashModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = localStorage.getItem("has_seen_ai_splash_v1");
      if (!seen) {
        // Small delay for smooth entry after initial page paint
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 450);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if localStorage is disabled in strict private mode
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem("has_seen_ai_splash_v1", "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    handleClose();
    onWatchAiVideos();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ai-splash-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-splash-title"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#0e1117] text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)]"
          >
            {/* Top glowing ambient accent */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/25 via-violet-500/25 to-amber-500/25 blur-3xl" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close announcement"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-white/25 hover:bg-white/15 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="relative p-6 sm:p-8">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-mono font-medium uppercase tracking-[0.25em] text-cyan-300">
                <Sparkles size={13} className="text-cyan-400" />
                <span>New Showcase · AI Video Lab</span>
              </div>

              {/* Title & User specified copy */}
              <h2
                id="ai-splash-title"
                className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-white"
              >
                I also created AI videos —{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  look and watch!
                </span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                Explore new speculative commercials, cinematic 3D product reels, and tech narratives created with cutting-edge generative AI workflows.
              </p>

              {/* Visual Preview Box */}
              <div
                onClick={handleCtaClick}
                className="group mt-5 relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-inner transition-all hover:border-cyan-400/50"
              >
                <div className="aspect-video relative w-full overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi/qfGP0Z3y-Jk/hqdefault.jpg"
                    alt="AI Video Showcase Preview"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Centered Play Pill */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform group-hover:scale-110">
                      <Play size={20} className="translate-x-0.5 fill-black" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">Featured Reel</span>
                      <p className="text-xs font-semibold text-white line-clamp-1">Why AI Won’t Replace Creators | A Director's Perspective</p>
                    </div>
                    <span className="rounded-full bg-black/70 px-2 py-0.5 font-mono text-[10px] text-zinc-300">13 Videos</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  Continue to Portfolio
                </button>

                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-black shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-300 hover:shadow-cyan-500/40"
                >
                  <span>Watch AI Videos</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AiSplashModal;
