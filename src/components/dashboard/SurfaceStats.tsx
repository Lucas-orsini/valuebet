"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SURFACE_STATS } from "@/lib/dashboard-data";
import type { SurfaceStats } from "@/lib/dashboard-data";

export function SurfaceStats() {
  return (
    <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold text-[var(--text-1)]">
          Performance par surface
        </h2>
        <p className="text-xs text-[var(--text-3)] mt-0.5">
          ROI moyen selon le type de terrain
        </p>
      </div>

      {/* Surface cards */}
      <div className="p-5 grid grid-cols-3 gap-4">
        {SURFACE_STATS.map((surface, index) => (
          <SurfaceCard key={surface.surface} surface={surface} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}

function SurfaceCard({ surface, delay }: { surface: SurfaceStats; delay: number }) {
  const winRate = Math.round((surface.wonBets / surface.totalBets) * 100);
  const maxRoi = Math.max(...SURFACE_STATS.map((s) => s.roi));

  const surfaceColors = {
    clay: {
      icon: "🏟️",
      bg: "bg-[var(--surface-clay)]",
      border: "border-[var(--border-clay)]",
      accent: "text-[var(--roi-orange)]",
      bar: "bg-[var(--roi-orange)]",
    },
    hard: {
      icon: "🎾",
      bg: "bg-[var(--surface-hard)]",
      border: "border-[var(--border-hard)]",
      accent: "text-[var(--surface-hard)]",
      bar: "bg-[var(--surface-hard)]",
    },
    grass: {
      icon: "🌿",
      bg: "bg-[var(--surface-grass)]",
      border: "border-[var(--border-grass)]",
      accent: "text-[var(--roi-green)]",
      bar: "bg-[var(--roi-green)]",
    },
  };

  const colors = surfaceColors[surface.surface];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-xl p-4 border",
        colors.bg,
        colors.border
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{colors.icon}</span>
        <span className="text-sm font-medium text-[var(--text-1)]">
          {surface.label}
        </span>
      </div>

      {/* ROI */}
      <div className="mb-4">
        <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
          ROI moyen
        </p>
        <p className={cn("text-2xl font-bold tracking-tight", colors.accent)}>
          +{surface.roi.toFixed(1)}%
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(surface.roi / maxRoi) * 100}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className={cn("h-full rounded-full", colors.bar)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-0.5">
            Total
          </p>
          <p className="text-sm font-semibold text-[var(--text-1)]">
            {surface.totalBets}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-0.5">
            Win rate
          </p>
          <p className="text-sm font-semibold text-[var(--text-1)]">{winRate}%</p>
        </div>
      </div>

      {/* Won bets */}
      <div className="mt-3 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text-3)]">Paris gagnés</span>
          <span className="text-[var(--roi-green)] font-medium">
            {surface.wonBets}/{surface.totalBets}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
