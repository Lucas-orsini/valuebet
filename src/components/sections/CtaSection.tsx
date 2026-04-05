"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section id="tarifs" className="py-24 px-6 bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent-alpha)] text-[var(--accent-light)] text-xs font-medium uppercase tracking-widest mb-4">
            Tarifs
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.03em] leading-tight mb-4">
            Commencez gratuitement
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Aucune carte bancaire requise. Essayez toutes les fonctionnalités premium
            pendant 7 jours.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {pricingPlans.map((plan: typeof pricingPlans[0], index: number) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-xl p-6 flex flex-col gap-5",
                plan.highlight
                  ? "bg-[var(--surface-1)] border border-[var(--border-accent)] shadow-[0_0_40px_rgba(242,203,56,0.08)]"
                  : "bg-[var(--bg)] border border-white/[0.07]"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-[11px] font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-zinc-400">{plan.name}</p>
                <div className="flex items-end gap-1 mt-1.5">
                  <span className="text-4xl font-bold text-zinc-50 tracking-tight">
                    {plan.price === 0 ? "Gratuit" : `${plan.price}€`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-zinc-500 text-sm mb-1.5">/mois</span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 mt-2">{plan.description}</p>
              </div>

              <Link
                href="/signup"
                className={cn(
                  "h-10 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center",
                  plan.highlight
                    ? "bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white shadow-[0_0_16px_rgba(242,203,56,0.2)]"
                    : "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300"
                )}
              >
                {plan.cta}
              </Link>

              <ul className="flex flex-col gap-2">
                {plan.features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={14} className="text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
                {plan.missing?.map((feature: string) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-600"
                  >
                    <span className="shrink-0">−</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative text-center p-12 rounded-2xl border border-[var(--border-accent)] bg-gradient-to-b from-[var(--accent-alpha)] to-transparent overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(242,203,56,0.15),transparent)]" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-50 tracking-tight mb-4">
              Prêt à gagner plus ?
            </h3>
            <p className="text-zinc-400 text-base max-w-md mx-auto mb-6">
              Rejoignez plus de 500 parieurs qui utilisent déjà notre IA pour
              détecter les value bets.
            </p>
            <Link
              href="/signup"
              className="h-11 px-8 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 shadow-[0_0_24px_rgba(242,203,56,0.3)] hover:shadow-[0_0_32px_rgba(242,203,56,0.4)]"
            >
              Commencer maintenant
              <ArrowRight size={16} />
            </Link>
            <p className="text-xs text-zinc-600 mt-4">
              Gratuit · Sans engagement · Annulez quand vous voulez
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
