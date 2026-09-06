import { motion } from "motion/react";
import { ArrowRight, Film, Play } from "lucide-react";

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
      className="my-14 md:my-20"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface p-8 sm:p-10 md:p-12 text-foreground shadow-sm">
        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            {/* Tagline */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1 text-[11px] font-mono font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
              <span>AI Video Lab · Creative Direction</span>
            </div>

            {/* Headline */}
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
              Generative AI Video Production & Spec Ads
            </h3>

            {/* Paragraph */}
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Transforming brand narratives into cinematic commercial reels, 3D product showcases, and hyper-realistic automotive battles. Directed and edited using Midjourney, Runway Gen-3, Kling AI, and DaVinci Resolve.
            </p>

            {/* Tool pills matching portfolio design system */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border/70 bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                13 Films
              </span>
              <span className="rounded-full border border-border/70 bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Runway Gen-3
              </span>
              <span className="rounded-full border border-border/70 bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Kling AI
              </span>
              <span className="rounded-full border border-border/70 bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Midjourney v6
              </span>
              <span className="rounded-full border border-border/70 bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Premiere & DaVinci
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col shrink-0">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 text-xs font-semibold text-background shadow-md transition-all hover:bg-foreground/90"
            >
              <Film size={15} />
              <span>Explore AI Video Lab</span>
              <ArrowRight size={14} />
            </button>

            {onPlayFeatured && (
              <button
                type="button"
                onClick={onPlayFeatured}
                className="card-white inline-flex items-center justify-center gap-2 rounded-full border border-border/70 px-5 py-3 text-xs font-medium text-foreground transition hover:bg-foreground/5"
              >
                <Play size={14} className="fill-current" />
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
