"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Minus, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollBet, BankrollCustomBet, BankrollMode } from "@/lib/dashboard-data";

interface BankrollTableProps {
  bets: BankrollBet[];
  customBets: BankrollCustomBet[];
  mode: BankrollMode;
  onToggleBet: (id: string, played: boolean) => void;
  onOddsChange: (id: string, odds: number) => void;
}

const ITEMS_PER_PAGE = 8;

function ResultBadge({ result }: { result: 'win' | 'lose' | 'push' }) {
  const config = {
    win: {
      bg: "bg-green-500/15",
      text: "text-green-400",
      icon: ArrowUpRight,
      label: "Gagné",
    },
    lose: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      icon: ArrowDownRight,
      label: "Perdu",
    },
    push: {
      bg: "bg-zinc-500/15",
      text: "text-zinc-400",
      icon: Minus,
      label: "Remboursé",
    },
  };

  const { bg, text, icon: Icon, label } = config[result];

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider",
      bg,
      text
    )}>
      <Icon size={10} />
      {label}
    </span>
  );
}

function GainLossCell({ result, odds, units }: { result: 'win' | 'lose' | 'push'; odds: number; units: number }) {
  if (result === 'push') {
    return (
      <span className="text-sm font-medium text-zinc-500 tabular-nums">
        0.00€
      </span>
    );
  }

  const gainLoss = result === 'win' 
    ? (odds - 1) * units 
    : -units;

  return (
    <span className={cn(
      "text-sm font-medium tabular-nums flex items-center gap-1",
      gainLoss >= 0 ? "text-green-400" : "text-red-400"
    )}>
      {gainLoss >= 0 ? (
        <ArrowUpRight size={14} />
      ) : (
        <ArrowDownRight size={14} />
      )}
      {gainLoss >= 0 ? '+' : ''}{(gainLoss).toFixed(2)}€
    </span>
  );
}

export function BankrollTable({
  bets,
  customBets,
  mode,
  onToggleBet,
  onOddsChange,
}: BankrollTableProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayBets = mode === 'auto' ? bets : customBets;
  const totalPages = Math.ceil(displayBets.length / ITEMS_PER_PAGE);
  const paginatedBets = displayBets.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOddsChange = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(',', '.')) || 0;
    onOddsChange(id, numValue);
  };

  const handleToggle = (id: string, currentPlayed: boolean) => {
    onToggleBet(id, !currentPlayed);
    setExpandedId(null);
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-zinc-100">Historique des paris</h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {displayBets.length} paris
          </span>
        </div>
        {mode === 'custom' && (
          <span className="text-xs text-zinc-500">
            Cochez les paris joués pour les inclure dans le calcul
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {mode === 'custom' && (
                <th className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-12">
                  Joué
                </th>
              )}
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Côte IA
              </th>
              {mode === 'custom' && (
                <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Côte réelle
                </th>
              )}
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Mise
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Résultat
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Gain/Perte
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {paginatedBets.map((bet, index) => {
                const isCustom = mode === 'custom' && 'played' in bet;
                const isPlayed = isCustom ? (bet as BankrollCustomBet).played : true;
                const actualOdds = isCustom ? (bet as BankrollCustomBet).actualOdds : bet.recommendedOdds;
                const isDisabled = mode === 'auto';
                const isRowDisabled = isDisabled || (isCustom && !isPlayed);

                return (
                  <motion.tr
                    key={bet.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.02 }}
                    className={cn(
                      "transition-colors",
                      isRowDisabled && "opacity-50",
                      !isRowDisabled && "hover:bg-white/[0.02] cursor-pointer"
                    )}
                  >
                    {mode === 'custom' && (
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleToggle(bet.id, isPlayed)}
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center transition-all",
                            isPlayed
                              ? "bg-[#F2CB38] border-[#F2CB38]"
                              : "border-white/20 hover:border-white/40"
                          )}
                          aria-label={isPlayed ? "Décocher ce pari" : "Cocher ce pari"}
                        >
                          {isPlayed && <Check size={12} className="text-zinc-900" strokeWidth={3} />}
                        </button>
                      </td>
                    )}
                    
                    {/* Date */}
                    <td className="px-3 py-4">
                      <span className="text-xs text-zinc-500 font-mono">
                        {new Date(bet.date).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </td>

                    {/* Match */}
                    <td className="px-3 py-4">
                      <span className="text-sm text-zinc-200">
                        {bet.match}
                      </span>
                    </td>

                    {/* Recommended Odds */}
                    <td className="px-3 py-4 text-center">
                      <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                        {bet.recommendedOdds.toFixed(2)}
                      </span>
                    </td>

                    {/* Actual Odds (custom mode only) */}
                    {mode === 'custom' && (
                      <td className="px-3 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={actualOdds}
                            onChange={(e) => handleOddsChange(bet.id, e.target.value)}
                            disabled={!isPlayed}
                            className={cn(
                              "w-16 h-7 px-2 rounded text-sm text-center tabular-nums transition-colors",
                              isPlayed
                                ? "bg-[#0a0a0a] border border-white/[0.08] text-zinc-100 focus:outline-none focus:border-[#F2CB38]/50"
                                : "bg-transparent text-zinc-600"
                            )}
                          />
                        </div>
                      </td>
                    )}

                    {/* Units */}
                    <td className="px-3 py-4 text-center">
                      <span className={cn(
                        "inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-md text-xs font-bold",
                        bet.units === 3
                          ? "bg-green-500/15 text-green-400"
                          : bet.units === 2
                          ? "bg-[#F2CB38]/15 text-[#F2CB38]"
                          : "bg-white/[0.08] text-zinc-300"
                      )}>
                        {bet.units}u
                      </span>
                    </td>

                    {/* Result */}
                    <td className="px-3 py-4 text-center">
                      <ResultBadge result={bet.result} />
                    </td>

                    {/* Gain/Loss */}
                    <td className="px-5 py-4 text-right">
                      <GainLossCell
                        result={isRowDisabled ? 'push' : bet.result}
                        odds={actualOdds}
                        units={bet.units}
                      />
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
          <span className="text-xs text-zinc-500">
            Affichage {currentPage * ITEMS_PER_PAGE + 1}-
            {Math.min((currentPage + 1) * ITEMS_PER_PAGE, displayBets.length)} sur {displayBets.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={cn(
                "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                currentPage === 0
                  ? "text-zinc-700 cursor-not-allowed"
                  : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              )}
              aria-label="Page précédente"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-zinc-400 tabular-nums">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className={cn(
                "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                currentPage >= totalPages - 1
                  ? "text-zinc-700 cursor-not-allowed"
                  : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
              )}
              aria-label="Page suivante"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
