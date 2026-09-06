import { motion } from "motion/react";
import { Sparkles, ArrowRight, Film, Play } from "lucide-react";

interface AiPromoBannerProps {
  onExplore: () => void;
  onPlayFeatured?: () => void;
}

export function AiPromoBanner({ onExplore, onPlayFeatured }: AiPromoBannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="my-16 md:my-24"
    >
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0c121e] via-[#0d1627] to-[#120f24] p-8 sm:p-10 md:p-12 text-white shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15)]">
        {/* Glow ambient background circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            {/* Tagline */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-mono font-medium uppercase tracking-[0.25em] text-cyan-300">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Promotional Showcase · AI Creative Direction</span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white">
              Next-Gen AI Video Production & Spec Ads
            </h3>

            {/* Paragraph */}
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-300">
              Transforming brand concepts into hyper-realistic commercial reels, 3D product showcases, and cinematic automotive battles. Powered by an advanced generative stack: Midjourney, Runway Gen-3, Kling AI, and surgical post-production.
            </p>

            {/* Tool pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                13 Films
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                Runway Gen-3
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                Kling AI
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                Midjourney v6
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                Premiere & DaVinci
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col shrink-0">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-cyan-400 px-6 py-3.5 text-xs font-semibold text-black shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-300 hover:shadow-cyan-500/40"
            >
              <Film size={15} />
              <span>Explore AI Video Lab</span>
              <ArrowRight size={14} />
            </button>

            {onPlayFeatured && (
              <button
                type="button"
                onClick={onPlayFeatured}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-medium text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <Play size={14} className="fill-white" />
                <span>Watch Featured Reel</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AiPromoBanner;
