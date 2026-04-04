"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Bet } from "@/lib/bankroll-data";

interface BetsTrackingTableProps {
  bets: Bet[];
  mode: "auto" | "manual";
  selectedBetIds: Set<string>;
  customOdds: Record<string, number>;
  onBetToggle: (betId: string, isSelected: boolean) => void;
  onOddsChange: (betId: string, odds: number) => void;
}

function ResultBadge({ result }: { result: Bet["result"] }) {
  if (result === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        En attente
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider",
        result === "win"
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-red-500/10 text-red-400 border border-red-500/20"
      )}
    >
      {result === "win" ? (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      {result === "win" ? "Gagné" : "Perdu"}
    </span>
  );
}

function UnitsBadge({ units }: { units: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[32px] h-6 px-2 rounded-md text-xs font-bold",
        units === 3
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : units === 2
          ? "bg-[#fb923c]/10 text-[#fb923c] border border-[#fb923c]/20"
          : "bg-white/[0.08] text-zinc-300 border border-white/[0.12]"
      )}
    >
      {units}u
    </span>
  );
}

export function BetsTrackingTable({
  bets,
  mode,
  selectedBetIds,
  customOdds,
  onBetToggle,
  onOddsChange,
}: BetsTrackingTableProps) {
  const completedBets = bets.filter((b) => b.result !== "pending");

  const handleCheckboxChange = useCallback(
    (betId: string, checked: boolean) => {
      onBetToggle(betId, checked);
    },
    [onBetToggle]
  );

  const handleOddsChange = useCallback(
    (betId: string, value: string) => {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        onOddsChange(betId, numValue);
      }
    },
    [onOddsChange]
  );

  if (completedBets.length === 0) {
    return (
      <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#fb923c]/10 border border-[#fb923c]/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#fb923c]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-zinc-100">
              Suivi des paris
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
              {completedBets.length}
            </span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-zinc-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-zinc-400 mb-1">
            Aucun pari terminé
          </p>
          <p className="text-xs text-zinc-600 max-w-xs">
            Les paris terminés apparaîtront ici pour être inclus dans le suivi
            de votre bankroll.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#fb923c]/10 border border-[#fb923c]/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-[#fb923c]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-zinc-100">
            Suivi des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[#fb923c]/10 border border-[#fb923c]/20 text-[#fb923c] text-[10px] font-medium">
            {completedBets.length}
          </span>
        </div>
        {mode === "manual" && (
          <span className="text-[11px] text-zinc-500">
            Cochez les paris à inclure dans le suivi
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {mode === "manual" && (
                <th className="px-5 py-3 text-left w-10">
                  <span className="sr-only">Sélectionner</span>
                </th>
              )}
              <th className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Unités
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Résultat
              </th>
              {mode === "manual" && (
                <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Nouvelle cote
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {completedBets.map((bet, index) => {
              const isSelected = bet.isTracked || selectedBetIds.has(bet.id);
              const displayOdds = customOdds[bet.id] ?? bet.aiOdds;

              return (
                <motion.tr
                  key={bet.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    "hover:bg-white/[0.02] transition-colors",
                    isSelected && mode === "manual"
                      ? "bg-[#fb923c]/[0.02]"
                      : ""
                  )}
                >
                  {mode === "manual" && (
                    <td className="px-5 py-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) =>
                            handleCheckboxChange(bet.id, e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 rounded border border-white/[0.15] bg-transparent peer-checked:bg-[#fb923c] peer-checked:border-[#fb923c] transition-colors flex items-center justify-center">
                          {isSelected && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </label>
                    </td>
                  )}

                  {/* Match */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-zinc-200 font-medium">
                        {bet.match}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-zinc-600">
                          {new Date(bet.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        {mode === "auto" && bet.isTracked && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#fb923c]/10 border border-[#fb923c]/20 text-[#fb923c] text-[9px] font-medium">
                            <svg
                              className="w-2.5 h-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 3v18" />
                              <rect
                                x="4"
                                y="8"
                                width="16"
                                height="8"
                                rx="2"
                              />
                              <path d="M4 14h16" />
                            </svg>
                            Auto
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Odds */}
                  <td className="px-3 py-4 text-center">
                    <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                      {displayOdds.toFixed(2)}
                    </span>
                  </td>

                  {/* Units */}
                  <td className="px-3 py-4 text-center">
                    <UnitsBadge units={bet.units} />
                  </td>

                  {/* Result */}
                  <td className="px-3 py-4 text-center">
                    <ResultBadge result={bet.result} />
                  </td>

                  {/* Custom Odds Input */}
                  {mode === "manual" && (
                    <td className="px-3 py-4">
                      <div className="flex justify-center">
                        <input
                          type="text"
                          inputMode="decimal"
                          defaultValue={bet.aiOdds.toFixed(2)}
                          onBlur={(e) =>
                            handleOddsChange(bet.id, e.target.value)
                          }
                          className="w-16 h-7 px-2 rounded bg-[#0a0a0a] border border-white/[0.08] text-center text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#fb923c]/50 transition-colors tabular-nums"
                          placeholder="Cote"
                        />
                      </div>
                    </td>
                  )}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <span className="text-[11px] text-zinc-500">
          {completedBets.length} pari{completedBets.length > 1 ? "s" : ""}{" "}
          terminé{completedBets.length > 1 ? "s" : ""}
        </span>
        <span className="text-[11px] text-zinc-600">
          Tous les horaires en UTC
        </span>
      </div>
    </div>
  );
}
