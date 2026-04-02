"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="py-24 px-6 bg-[#09090b] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(242,203,56,0.12),transparent)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.025em] leading-tight mb-4">
            Prêt à transformer vos paris ?
          </h2>
          <p className="text-zinc-400 text-base max-w-md mx-auto">
            Rejoignez les parieurs qui utilisent l&apos;IA pour générer des profits constants.
            Commencez gratuitement aujourd&apos;hui.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/signup"
            className="h-11 px-6 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-all duration-200 shadow-[0_0_24px_rgba(242,203,56,0.3)] hover:shadow-[0_0_32px_rgba(242,203,56,0.4)]"
          >
            Commencer gratuitement
          </Link>
          <button className="h-11 px-6 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 text-sm font-medium transition-colors">
            Voir une démo
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-zinc-600"
        >
          Aucune carte bancaire requise · Accès immédiat · Annulez quand vous voulez
        </motion.p>
      </div>
    </section>
  );
}
