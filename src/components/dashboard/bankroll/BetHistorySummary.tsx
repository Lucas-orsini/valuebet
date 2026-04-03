"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Bet, TrackedBet } from "@/lib/bankroll-data";
import { getEstimatedProfit } from "@/lib/bankroll-data";

interface BetHistorySummaryProps {
  bets: Bet[];
  trackedBets: TrackedBet[];
}

const ITEMS_PER_PAGE = 10;

export function BetHistorySummary({ bets, trackedBets }: BetHistorySummaryProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const getTrackedBet = (betId: string): TrackedBet | undefined => {
    return trackedBets.find((t) => t.betId === betId);
  };

  const sortedBets = useMemo(() => {
    return [...bets].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [bets]);

  const totalPages = Math.max(1, Math.ceil(sortedBets.length / ITEMS_PER_PAGE));

  const paginatedBets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedBets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedBets, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">
            Historique des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {sortedBets.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Joueur
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Sport
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote IA
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote Réelle
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Gain/Perte
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {paginatedBets.map((bet, index) => (
                <HistoryRow
                  key={bet.id}
                  bet={bet}
                  tracked={getTrackedBet(bet.id)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
          <span className="text-xs text-zinc-500">
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, sortedBets.length)} sur{" "}
            {sortedBets.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-3 text-xs text-zinc-400">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Summary footer */}
      <div className="grid grid-cols-3 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Paris affichés
          </p>
          <p className="text-sm font-bold text-zinc-100">{paginatedBets.length}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Victoires
          </p>
          <p className="text-sm font-bold text-green-400">
            {paginatedBets.filter((b) => b.result === "W").length}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit total
          </p>
          <p className="text-sm font-bold text-zinc-100">
            {paginatedBets
              .reduce((sum, bet) => {
                const tracked = getTrackedBet(bet.id);
                const odds = tracked?.customOdds ?? bet.odds;
                return sum + getEstimatedProfit({ ...bet, odds });
              }, 0)
              .toFixed(2)}
            €
          </p>
        </div>
      </div>
    </div>
  );
}

interface HistoryRowProps {
  bet: Bet;
  tracked?: TrackedBet;
  index: number;
}

function HistoryRow({ bet, tracked, index }: HistoryRowProps) {
  const isPlayed = tracked?.played ?? true;
  const customOdds = tracked?.customOdds;
  const displayOdds = customOdds ?? bet.odds;
  const profit = getEstimatedProfit({ ...bet, odds: displayOdds });

  const resultConfig = {
    W: {
      bg: "bg-green-500/15",
      text: "text-green-400",
      icon: ArrowUpRight,
      label: "Gagné",
    },
    L: {
      bg: "bg-red-500/15",
      text: "text-red-400",
      icon: ArrowDownRight,
      label: "Perdu",
    },
    P: {
      bg: "bg-zinc-500/15",
      text: "text-zinc-400",
      icon: Minus,
      label: "Annulé",
    },
    null: {
      bg: "bg-yellow-500/15",
      text: "text-yellow-400",
      icon: Minus,
      label: "En attente",
    },
  };

  const config = resultConfig[bet.result ?? "null"];
  const ResultIcon = config.icon;

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.02 }}
      className={cn(
        "hover:bg-white/[0.02] transition-colors",
        !isPlayed && "opacity-40"
      )}
    >
      {/* Date */}
      <td className="px-5 py-4">
        <span className="text-xs text-zinc-500 font-mono">
          {new Date(bet.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </td>

      {/* Player */}
      <td className="px-3 py-4">
        <span className="text-sm text-zinc-200 font-medium">{bet.player}</span>
      </td>

      {/* Sport */}
      <td className="px-3 py-4">
        <span className="text-xs text-zinc-500">{bet.sport}</span>
      </td>

      {/* AI Odds */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm text-zinc-400 tabular-nums">
          {bet.odds.toFixed(2)}
        </span>
      </td>

      {/* Real Odds */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums",
            customOdds ? "text-[#F2CB38]" : "text-zinc-100"
          )}
        >
          {displayOdds.toFixed(2)}
        </span>
        {customOdds && (
          <span className="text-[9px] text-zinc-600 ml-1">(ajustée)</span>
        )}
      </td>

      {/* Status */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium",
            config.bg,
            config.text
          )}
        >
          <ResultIcon size={10} />
          {config.label}
        </span>
      </td>

      {/* Profit/Loss */}
      <td className="px-5 py-4 text-right">
        {!isPlayed ? (
          <span className="text-xs text-zinc-600">—</span>
        ) : (
          <span
            className={cn(
              "text-sm font-semibold tabular-nums flex items-center justify-end gap-1",
              profit > 0 ? "text-green-400" : profit < 0 ? "text-red-400" : "text-zinc-400"
            )}
          >
            {profit > 0 ? (
              <ArrowUpRight size={14} />
            ) : profit < 0 ? (
              <ArrowDownRight size={14} />
            ) : null}
            {profit > 0 ? "+" : ""}
            {profit.toFixed(2)}€
          </span>
        )}
      </td>
    </motion.tr>
  );
}
