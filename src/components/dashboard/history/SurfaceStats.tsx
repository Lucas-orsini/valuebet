"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SURFACE_STATS } from "@/lib/dashboard-data";
import type { SurfaceStats as SurfaceStatsType, TimeRange, BetHistoryItem } from "@/lib/dashboard-data";

interface SurfaceStatsProps {
  timeRange?: TimeRange;
  bets?: BetHistoryItem[];
}

export function SurfaceStats({ timeRange, bets }: SurfaceStatsProps) {
  // Calculate stats based on time range if bets are provided
  const stats = timeRange && bets
    ? calculateSurfaceStatsFromBets(bets, timeRange)
    : SURFACE_STATS;

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-zinc-100">
          Performance par surface
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          ROI moyen selon le type de terrain
        </p>
      </div>

      {/* Surface cards */}
      <div className="p-5 grid grid-cols-3 gap-4">
        {stats.map((surface, index) => (
          <SurfaceCard key={surface.surface} surface={surface} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}

function calculateSurfaceStatsFromBets(bets: BetHistoryItem[], timeRange: TimeRange): SurfaceStatsType[] {
  // Group bets by surface
  const surfaceGroups: Record<string, BetHistoryItem[]> = {
    clay: [],
    hard: [],
    grass: [],
  };

  bets.forEach((bet) => {
    if (surfaceGroups[bet.surface]) {
      surfaceGroups[bet.surface].push(bet);
    }
  });

  // Calculate stats for each surface
  return (["hard", "clay", "grass"] as const).map((surfaceKey) => {
    const surfaceBets = surfaceGroups[surfaceKey] || [];
    const totalBets = surfaceBets.length;
    const wonBets = surfaceBets.filter((b) => b.status === "won").length;
    const totalUnits = surfaceBets.reduce((sum, b) => sum + b.units, 0);
    const totalProfit = surfaceBets.reduce((sum, b) => sum + b.profit, 0);
    const roi = totalUnits > 0 ? (totalProfit / totalUnits) * 100 : 0;

    const labels: Record<typeof surfaceKey, string> = {
      clay: "Terre battue",
      hard: "Dur",
      grass: "Gazon",
    };

    return {
      surface: surfaceKey,
      label: labels[surfaceKey],
      totalBets,
      wonBets,
      roi,
    };
  });
}

function SurfaceCard({ surface, delay }: { surface: SurfaceStatsType; delay: number }) {
  const winRate = surface.totalBets > 0
    ? Math.round((surface.wonBets / surface.totalBets) * 100)
    : 0;
  const maxRoi = Math.max(...SURFACE_STATS.map((s) => s.roi));
  const displayMaxRoi = maxRoi > 0 ? maxRoi : 1;

  const surfaceColors = {
    clay: {
      icon: "🏟️",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      accent: "text-orange-400",
      bar: "bg-orange-500",
    },
    hard: {
      icon: "🎾",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      accent: "text-orange-400",
      bar: "bg-orange-500",
    },
    grass: {
      icon: "🌿",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      accent: "text-green-400",
      bar: "bg-green-500",
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
        <span className="text-sm font-medium text-zinc-200">
          {surface.label}
        </span>
      </div>

      {/* ROI */}
      <div className="mb-4">
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
          ROI moyen
        </p>
        <p className={cn("text-2xl font-bold tracking-tight", colors.accent)}>
          {surface.totalBets > 0 ? `+${surface.roi.toFixed(1)}%` : "—"}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(surface.roi / displayMaxRoi) * 100}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className={cn("h-full rounded-full", colors.bar)}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">
            Total
          </p>
          <p className="text-sm font-semibold text-zinc-200">
            {surface.totalBets}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">
            Win rate
          </p>
          <p className="text-sm font-semibold text-zinc-200">
            {surface.totalBets > 0 ? `${winRate}%` : "—"}
          </p>
        </div>
      </div>

      {/* Won bets */}
      <div className="mt-3 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Paris gagnés</span>
          <span className="text-green-400 font-medium">
            {surface.wonBets}/{surface.totalBets}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
