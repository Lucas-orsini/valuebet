"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { AnimatedTextGenerate } from "@/components/ui/AnimatedTextGenerate";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#09090b] overflow-hidden pt-14">
      {/* Particle Background */}
      <ParticleBackground className="absolute inset-0 z-0 w-full h-full" />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#09090b]/60 via-transparent to-[#09090b]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-medium text-accent-light">
            Version beta · 500+ utilisateurs actifs
          </span>
        </motion.div>

        {/* Animated Headline */}
        <AnimatedTextGenerate
          text="L'œil d'Haurus sur chaque court"
          speed={0.4}
          mode="dark"
          className="text-center"
        />

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
        >
         Votre stratégie éclairée par la puissance de la statistique et de l'intelligence artificielle.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <button className="h-11 px-6 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-[0_0_24px_rgba(242,203,56,0.25)] hover:shadow-[0_0_32px_rgba(242,203,56,0.35)]">
            Accéder gratuitement
            <ArrowRight size={16} />
          </button>
          <button className="h-11 px-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 text-sm font-medium transition-colors flex items-center gap-2">
            <Play size={14} className="text-accent-light" />
            Voir une démo
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["J", "M", "S", "T", "N"].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#09090b]"
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-xs text-zinc-500">
              <span className="text-zinc-300 font-medium">500+</span> parieurs actifs
            </span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent-light" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-zinc-500">
              <span className="text-zinc-300 font-medium">4.8/5</span> sur 127 avis
            </span>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/[0.06] w-full max-w-lg"
        >
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-zinc-100">276k+</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Matchs analysés</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-accent-light">70%</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Taux réussite</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-zinc-100">+31%</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">ROI moyen</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
