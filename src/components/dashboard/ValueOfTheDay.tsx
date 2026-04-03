"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Info, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { VALUE_OF_THE_DAY, ROI_COLORS } from "@/lib/dashboard-data";
import type { ValueOfTheDayItem, RoiLabel } from "@/lib/dashboard-data";

interface ValueOfTheDayProps {
  items?: ValueOfTheDayItem[];
}

interface TooltipData {
  playerName: string;
  odds: number;
  surface: string;
  tournament: string;
  estimatedProbability: number;
  units: number;
  edge: number;
}

export function ValueOfTheDay({ items = VALUE_OF_THE_DAY }: ValueOfTheDayProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipTargetRect, setTooltipTargetRect] = useState<DOMRect | null>(null);
  const [lastRefresh] = useState<Date>(new Date());

  const sortedItems = [...items].sort((a, b) => b.edge - a.edge);

  const handleMouseEnter = (
    item: ValueOfTheDayItem,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipTargetRect(rect);
    setTooltip({
      playerName: item.playerName,
      odds: item.odds,
      surface: item.surface,
      tournament: item.tournament,
      estimatedProbability: item.estimatedProbability,
      units: item.units,
      edge: item.edge,
    });
  };

  const handleMouseLeave = () => {
    setTooltipTargetRect(null);
    setTooltip(null);
  };

  const getRoiBadgeLabel = (roiLabel: RoiLabel): string => {
    switch (roiLabel) {
      case "green":
        return "Optimal";
      case "yellow":
        return "Correct";
      case "orange":
        return "Risqué";
      case "red":
        return "Très risqué";
      default:
        return roiLabel;
    }
  };

  const formatDateLocale = (date: Date): string => {
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (sortedItems.length === 0) {
    return (
      <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
              <Trophy size={14} className="text-[#F2CB38]" strokeWidth={1.5} />
            </div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Value du jour
            </h2>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Meilleures opportunités détectées
          </p>
          <p className="text-[10px] text-zinc-600 mt-1">
            Mis à jour le {formatDateLocale(lastRefresh)}
          </p>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-3">
            <Trophy size={18} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-400 mb-1">
            Aucun value bet aujourd&apos;hui
          </p>
          <p className="text-xs text-zinc-600 max-w-[200px]">
            Revenez demain pour de nouvelles opportunités
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
              <Trophy size={14} className="text-[#F2CB38]" strokeWidth={1.5} />
            </div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Value du jour
            </h2>
            <span className="px-1.5 py-0.5 rounded-full bg-[#F2CB38]/10 border border-[#F2CB38]/20 text-[#F2CB38] text-[10px] font-medium">
              {sortedItems.length}
            </span>
          </div>
          <Info size={14} className="text-zinc-500" strokeWidth={1.5} />
        </div>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Meilleures opportunités détectées
        </p>
        <p className="text-[10px] text-zinc-600 mt-1">
          Mis à jour le {formatDateLocale(lastRefresh)}
        </p>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-white/[0.04]">
          {sortedItems.map((item, index) => {
            const roiColors = ROI_COLORS[item.roiLabel];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={(e) => handleMouseEnter(item, e)}
                onMouseLeave={handleMouseLeave}
                className="relative px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Player & Edge */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-200 truncate">
                        {item.playerName}
                      </span>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <TrendingUp size={10} className="text-green-400" />
                        <span className="text-[10px] font-semibold text-green-400">
                          +{item.edge}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-zinc-500">
                        {item.tournament}
                      </span>
                      <span className="text-[10px] text-zinc-600">·</span>
                      <span className="text-[10px] text-zinc-500">
                        {item.surface}
                      </span>
                    </div>
                  </div>

                  {/* Odds & Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-14 min-w-[3.5rem] flex justify-end">
                      <span className="text-sm font-semibold text-zinc-100 tabular-nums text-right">
                        {item.odds.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider",
                          roiColors.bg,
                          roiColors.text
                        )}
                      >
                        {getRoiBadgeLabel(item.roiLabel)}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center min-w-[24px] h-5 px-1.5 rounded text-[10px] font-bold",
                          item.units === 3
                            ? "bg-green-500/15 text-green-400"
                            : item.units === 2
                            ? "bg-[#F2CB38]/15 text-[#F2CB38]"
                            : "bg-white/[0.08] text-zinc-400"
                        )}
                      >
                        {item.units}u
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
        <p className="text-[10px] text-zinc-600 text-center">
          Survolez un pari pour plus de détails
        </p>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && tooltipTargetRect && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipTargetRect.left + tooltipTargetRect.width / 2,
              top: tooltipTargetRect.top - 8,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F2CB38]" />
                <span className="text-xs font-semibold text-zinc-100">
                  {tooltip.playerName}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Tournoi</span>
                  <span className="text-[11px] text-zinc-300">
                    {tooltip.tournament}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Surface</span>
                  <span className="text-[11px] text-zinc-300">
                    {tooltip.surface}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Probabilité</span>
                  <span className="text-[11px] text-zinc-300">
                    {tooltip.estimatedProbability}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Cote</span>
                  <span className="text-[11px] text-zinc-300">
                    {tooltip.odds.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Edge</span>
                  <span className="text-[11px] text-green-400 font-medium">
                    +{tooltip.edge}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">Mise</span>
                  <span className="text-[11px] text-zinc-300">
                    {tooltip.units}u
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#1a1a1a] border-r border-b border-white/[0.12]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
