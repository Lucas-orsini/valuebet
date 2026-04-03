"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, X, GripVertical, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Bet, TrackedBet } from "@/lib/bankroll-data";
import { getEstimatedProfit } from "@/lib/bankroll-data";

interface BetSelectorProps {
  bets: Bet[];
  trackedBets: TrackedBet[];
  onBetChange: (betId: string, played: boolean, customOdds?: number) => void;
  onOddsChange: (betId: string, customOdds: number) => void;
}

export function BetSelector({
  bets,
  trackedBets,
  onBetChange,
  onOddsChange,
}: BetSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const sortedBets = useMemo(() => {
    const filtered = bets.filter((bet) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return bet.player.toLowerCase().includes(query);
    });

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [bets, searchQuery]);

  const getTrackedBet = (betId: string): TrackedBet | undefined => {
    return trackedBets.find((t) => t.betId === betId);
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-100">
            Sélection des paris
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {sortedBets.length}
          </span>
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un joueur..."
          className="w-full h-8 px-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors"
        />
      </div>

      {/* Bet list */}
      <div className="flex-1 overflow-y-auto">
        {sortedBets.length === 0 ? (
          <div className="flex items-center justify-center py-8 px-4">
            <p className="text-xs text-zinc-500">Aucun pari trouvé</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {sortedBets.map((bet) => {
              const tracked = getTrackedBet(bet.id);
              const isPlayed = tracked?.played ?? true;
              const customOdds = tracked?.customOdds;
              const displayOdds = customOdds ?? bet.odds;
              const estimatedProfit = getEstimatedProfit({
                ...bet,
                odds: displayOdds,
              });

              return (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "px-4 py-3 hover:bg-white/[0.02] transition-colors",
                    !isPlayed && "opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Drag handle */}
                    <div className="text-zinc-600 cursor-grab">
                      <GripVertical size={14} />
                    </div>

                    {/* Checkbox */}
                    <button
                      onClick={() => onBetChange(bet.id, !isPlayed)}
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                        isPlayed
                          ? "bg-[#F2CB38] border-[#F2CB38] text-white"
                          : "border-white/[0.2] bg-transparent hover:border-white/[0.4]"
                      )}
                    >
                      {isPlayed ? <Check size={12} strokeWidth={3} /> : null}
                    </button>

                    {/* Bet info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-200 font-medium truncate">
                        {bet.player}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-zinc-500">
                          {new Date(bet.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        <span className="text-[11px] text-zinc-600">·</span>
                        <span className="text-[11px] text-zinc-500">
                          {bet.units}u
                        </span>
                      </div>
                    </div>

                    {/* Odds input */}
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="1.01"
                        max="100"
                        value={displayOdds}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value > 1) {
                            onOddsChange(bet.id, value);
                          }
                        }}
                        className="w-16 h-7 px-2 rounded bg-[#0a0a0a] border border-white/[0.08] text-xs text-zinc-100 tabular-nums text-center focus:outline-none focus:border-[#F2CB38]/50 transition-colors"
                      />

                      {/* Estimated profit badge */}
                      {isPlayed && bet.result && (
                        <div
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium shrink-0",
                            estimatedProfit > 0
                              ? "bg-green-500/15 text-green-400"
                              : estimatedProfit < 0
                              ? "bg-red-500/15 text-red-400"
                              : "bg-zinc-500/15 text-zinc-400"
                          )}
                        >
                          <TrendingUp size={10} />
                          {estimatedProfit > 0 ? "+" : ""}
                          {estimatedProfit.toFixed(0)}€
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status indicator */}
                  {!isPlayed && (
                    <div className="flex items-center gap-1.5 mt-2 ml-10">
                      <X size={12} className="text-zinc-600" />
                      <span className="text-[11px] text-zinc-600">
                        Pari ignoré
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
        <p className="text-[10px] text-zinc-600 text-center">
          Cochez les paris joués et ajustez les cotes obtenues
        </p>
      </div>
    </div>
  );
}
