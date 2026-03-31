"use client";
import { motion, type Variants } from "framer-motion";
import { Download, Cpu, Target, Bell } from "lucide-react";
import { howItWorksSteps } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { HowItWorksStep } from "@/lib/data";

const iconMap = {
  download: Download,
  cpu: Cpu,
  target: Target,
  bell: Bell,
};

// Widget for step 1 - Timeline
function TimelineWidget() {
  const items = [
    { label: "Récupération des matchs", time: "06:00", status: "done" },
    { label: "Analyse des statistiques", time: "06:30", status: "done" },
    { label: "Calcul des probabilités", time: "07:00", status: "done" },
    { label: "Envoi des alertes", time: "En cours", status: "active" },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-4 min-h-[200px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs text-zinc-500 font-mono"> Model_V4.py</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-3 text-xs"
          >
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                item.status === "done"
                  ? "bg-green-500"
                  : item.status === "active"
                  ? "bg-accent animate-pulse"
                  : "bg-zinc-600"
              )}
            />
            <span
              className={cn(
                "flex-1",
                item.status === "active" ? "text-zinc-200" : "text-zinc-500"
              )}
            >
              {item.label}
            </span>
            <span className="text-zinc-600 font-mono">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Widget for step 2 - Model prediction
function PredictionWidget() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-4 min-h-[200px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center">
          <Cpu size={12} className="text-accent-light" />
        </div>
        <span className="text-xs text-zinc-400">Model v4</span>
      </div>
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-[#18181b] border border-white/[0.05]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-zinc-500">Sinner vs Medvedev</span>
            <span className="text-[10px] text-accent-light">VALUE</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-zinc-100">67%</span>
            <span className="text-xs text-zinc-500 mb-1">probabilité</span>
          </div>
          <div className="h-1.5 bg-white/[0.05] rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "67%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 p-2 rounded bg-green-500/10 border border-green-500/20">
            <p className="text-[10px] text-zinc-500">Ecart</p>
            <p className="text-sm font-bold text-green-400">+8.2%</p>
          </div>
          <div className="flex-1 p-2 rounded bg-white/[0.03] border border-white/[0.05]">
            <p className="text-[10px] text-zinc-500">Unité optimal</p>
            <p className="text-sm font-bold text-zinc-300">3u</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Widget for step 3 - Value detection
function ValueDetectionWidget() {
  const items = [
    { book: "Stake", odds: 2.10, fair: 1.85, edge: 13.5 },
    { book: "Winamax", odds: 2.05, fair: 1.85, edge: 10.8 },
    { book: "Unibet", odds: 2.00, fair: 1.85, edge: 8.1 },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-4 min-h-[200px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
          <Target size={12} className="text-green-400" />
        </div>
        <span className="text-xs text-zinc-400">Détection value</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={item.book}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]"
          >
            <div className="flex-1">
              <p className="text-xs text-zinc-300">{item.book}</p>
              <p className="text-[10px] text-zinc-600">Fair: {item.fair}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-zinc-100">{item.odds}</p>
              <p className="text-[10px] text-green-400">+{item.edge}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Tennis ball SVG with rotation animation
function TennisBallIcon({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={cn("w-6 h-6 text-[#CCFF00]", className)}
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M3 12c0 0 3-4 9-4s9 4 9 4-3 4-9 4-9-4-9-4z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M12 3c0 0 4 3 4 9s-4 9-4 9"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
    </motion.svg>
  );
}

// Widget for step 4 - Telegram notification (mobile notification style with tennis data)
function TelegramWidget() {
  const notificationVariants: Variants = {
    idle: {
      opacity: 1,
      x: 0,
    },
    new: {
      opacity: [0, 1],
      x: [20, 0],
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    highlight: {
      opacity: 1,
      x: 0,
    },
  };

  // Tennis match data
  const tennisData = {
    category: "ATP",
    tournament: "Miami Open",
    match: "Sinner vs Medvedev",
    odds: 2.10,
    edge: "+8.2%",
    probability: "52%",
    unit: "3u",
  };

  return (
    <div className="max-w-[300px]">
      {/* Notification container - mobile style */}
      <motion.div
        variants={notificationVariants}
        initial="idle"
        animate="new"
        className="relative rounded-2xl bg-[#0088cc] p-4 shadow-lg overflow-hidden"
      >
        {/* Tennis ball positioned top right */}
        <div className="absolute -top-1 -right-1">
          <TennisBallIcon />
        </div>

        {/* Pulsing VALUE BET badge */}
        <div className="absolute top-3 left-3">
          <span className="animate-pulse inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFD700] text-[#09090b] text-[10px] font-bold uppercase tracking-wider">
            Value Bet
          </span>
        </div>

        {/* Notification content */}
        <div className="pt-6">
          {/* Header - compact */}
          <div className="flex items-center gap-2 mb-3">
            {/* Telegram icon */}
            <svg
              className="w-4 h-4 text-white/90"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            <span className="text-xs text-white/90 font-medium">Haurus</span>
            <span className="ml-auto text-[10px] text-white/60">Maintenant</span>
          </div>

          {/* Body - two lines */}
          <div className="space-y-1.5 mb-3">
            {/* Line 1: category + tournament */}
            <p className="text-[10px] text-white/70 uppercase tracking-wider">
              {tennisData.category} · {tennisData.tournament}
            </p>

            {/* Line 2: match + odds */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-white font-medium">
                {tennisData.match}
              </p>
              <span className="px-2 py-0.5 rounded bg-white/20 text-white text-xs font-bold">
                {tennisData.odds.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Horizontal badges */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/20">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10">
              <span className="text-[9px] text-white/70 uppercase tracking-wider">Edge</span>
              <span className="text-xs text-[#CCFF00] font-bold">{tennisData.edge}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10">
              <span className="text-[9px] text-white/70 uppercase tracking-wider">Prob</span>
              <span className="text-xs text-white font-bold">{tennisData.probability}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10">
              <span className="text-[9px] text-white/70 uppercase tracking-wider">Unit</span>
              <span className="text-xs text-white font-bold">{tennisData.unit}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const widgetMap = [TimelineWidget, PredictionWidget, ValueDetectionWidget, TelegramWidget];

export function HowItWorksSection() {
  return (
    <section id="how" className="py-24 px-6 bg-[#111]">
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
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.03em] leading-tight mb-4">
            Du match à l&apos;alerte en 4 étapes
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Notre système fonctionne automatiquement 24h/24 pour vous fournir
            les meilleures statistiques et révéler les opportunités de valeur.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16 sm:space-y-24">
          {howItWorksSteps.map((step: HowItWorksStep, index: number) => {
            const isReversed = index % 2 === 1;
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const Widget = widgetMap[index];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-12 lg:gap-24`}
              >
                {/* Text */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl border border-accent/20 bg-accent/10 flex items-center justify-center">
                      <Icon size={22} className="text-accent-light" strokeWidth={1.5} />
                    </div>
                    <span className="text-3xl font-bold text-zinc-800 dark:text-zinc-700">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-zinc-100 tracking-tight mb-3">
                      {step.title}
                    </h3>
                    <p className="text-base text-zinc-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-xs text-zinc-400">{step.time}</span>
                  </div>
                </div>

                {/* Widget */}
                <div className="flex-1 w-full">
                  <Widget />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
