"use client";
import { motion } from "framer-motion";
import { Brain, Zap, LayoutGrid, Send, Sliders, Eye } from "lucide-react";
import { BentoGrid } from "@/components/ui/BentoGrid";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-light text-xs font-medium uppercase tracking-widest mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.03em] leading-tight mb-4">
            Une technologie de pointe pour affiner vos analyses
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Notre système combine le meilleur du machine learning et des données
            sportives pour vous donner un avantage statistique
          </p>
        </motion.div>

        {/* BentoGrid */}
        <BentoGrid />

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Brain,
              title: "IA MODELE V4",
              description: "Algorithme de référence entraîné sur des millions de données tennis",
            },
            {
              icon: Zap,
              title: "Temps réel",
              description: "Mise à jour des cotes et alertes en moins de 30 secondes",
            },
            {
              icon: Eye,
              title: "transparence",
              description: "Accès à l'historique complet et aux résultats du modèle",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <item.icon
                size={24}
                className="text-accent-light mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
