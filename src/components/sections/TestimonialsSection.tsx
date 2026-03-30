"use client";
import { motion } from "framer-motion";
import { AnimatedCanopy } from "@/components/ui/AnimatedCanopy";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/data";
import type { Testimonial } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="temoignages" className="py-24 px-6 bg-[#111] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-widest mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.03em] leading-tight mb-4">
            Ce qu&apos;en disent nos utilisateurs
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Rejoignez plus de 500 parieurs qui font confiance à notre IA chaque jour.
          </p>
        </motion.div>
      </div>

      {/* Triple Marquee */}
      <div className="relative flex flex-col gap-4 marquee-root">
        {/* Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#111] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111] to-transparent z-10" />

        {/* Row 1 - Left to Right */}
        <AnimatedCanopy reverse={false}>
          {testimonials.map((t: Testimonial) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </AnimatedCanopy>

        {/* Row 2 - Right to Left */}
        <AnimatedCanopy reverse={true}>
          {testimonials.slice(4).concat(testimonials.slice(0, 4)).map((t: Testimonial, i: number) => (
            <TestimonialCard key={`r2-${t.id}`} {...t} />
          ))}
        </AnimatedCanopy>

        {/* Row 3 - Left to Right */}
        <AnimatedCanopy reverse={false}>
          {testimonials.slice(2, 6).concat(testimonials.slice(0, 2)).map((t: Testimonial) => (
            <TestimonialCard key={`r3-${t.id}`} {...t} />
          ))}
        </AnimatedCanopy>
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-2xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-6"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-zinc-400">4.8/5 moyenne</span>
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">127 avis vérifiés</span>
        </div>
        <div className="w-px h-4 bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">500+ utilisateurs actifs</span>
        </div>
      </motion.div>
    </section>
  );
}
