"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ScrollText,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROI_COLORS, STATUS_COLORS } from "@/lib/dashboard-data";
import type { BetHistoryItem, RoiLabel } from "@/lib/dashboard-data";

interface HistoryTableProps {
  bets: BetHistoryItem[];
  isEmpty: boolean;
  isFilteredEmpty: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const ITEMS_PER_PAGE = 15;

const ROI_LABELS: Record<RoiLabel, string> = {
  green: "HIGH",
  yellow: "MED",
  orange: "LOW",
  red: "MIN",
};

export function HistoryTable({
  bets,
  isEmpty,
  isFilteredEmpty,
  hasActiveFilters,
  onClearFilters,
}: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(bets.length / ITEMS_PER_PAGE);

  const paginatedBets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return bets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [bets, currentPage]);

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Reset to page 1 when bets change
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Stats
  const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0);
  const wonBets = bets.filter((bet) => bet.status === "won").length;
  const lostBets = bets.filter((bet) => bet.status === "lost").length;
  const voidBets = bets.filter((bet) => bet.status === "void").length;
  const winRate = bets.length > 0 ? (wonBets / bets.length) * 100 : 0;

  // Empty state
  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-zinc-100">
              Historique des paris
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
              0
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <ScrollText size={22} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Aucun pari enregistré
          </p>
          <p className="text-xs text-zinc-600 max-w-xs">
            Vos paris apparaîtront ici une fois enregistrés.
          </p>
        </div>
      </motion.div>
    );
  }

  // Filtered empty state
  if (isFilteredEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-zinc-100">
              Historique des paris
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
              0
            </span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X size={12} />
              Effacer les filtres
            </button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <ScrollText size={22} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Aucun pari trouvé
          </p>
          <p className="text-xs text-zinc-600 max-w-xs mb-4">
            Aucun résultat ne correspond à vos critères de recherche.
          </p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="h-8 px-4 rounded-md border border-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/[0.15] transition-colors"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">
            Historique des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {bets.length}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={12} />
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Joueur
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Tournoi
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Surface
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Mise
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                ROI
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Résultat
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {paginatedBets.map((bet, index) => (
                <HistoryRow key={bet.id} bet={bet} index={index} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>
              Affichage {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, bets.length)} sur{" "}
              {bets.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Première page"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Page précédente"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-md text-xs font-medium transition-colors",
                      currentPage === pageNum
                        ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                        : "border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15]"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Page suivante"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.15] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Dernière page"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Paris affichés
          </p>
          <p className="text-sm font-bold text-zinc-100">{paginatedBets.length}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit total
          </p>
          <p
            className={cn(
              "text-sm font-bold",
              totalProfit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit.toFixed(2)}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Victoires
          </p>
          <p className="text-sm font-bold text-green-400">
            {wonBets}
            <span className="text-zinc-500 font-normal">/{bets.length}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Defaites
          </p>
          <p className="text-sm font-bold text-red-400">
            {lostBets}
            <span className="text-zinc-500 font-normal">/{bets.length}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Win rate
          </p>
          <p className="text-sm font-bold text-zinc-100">{winRate.toFixed(1)}%</p>
        </div>
      </div>
    </motion.div>
  );
}

function HistoryRow({
  bet,
  index,
}: {
  bet: BetHistoryItem;
  index: number;
}) {
  const roiColors = ROI_COLORS[bet.roiLabel];
  const statusColors = STATUS_COLORS[bet.status];

  const surfaceLabels = {
    clay: "Terre battue",
    hard: "Dur",
    grass: "Gazon",
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.02 }}
      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
    >
      {/* Player */}
      <td className="px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-zinc-200 font-medium">
            {bet.player}
          </span>
          <span className="text-xs text-zinc-500">vs {bet.opponent}</span>
        </div>
      </td>

      {/* Tournament */}
      <td className="px-3 py-4">
        <span className="text-xs text-zinc-400">{bet.tournament}</span>
      </td>

      {/* Surface */}
      <td className="px-3 py-4">
        <span className="text-xs text-zinc-400">{surfaceLabels[bet.surface]}</span>
      </td>

      {/* Odds */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm font-semibold text-zinc-100 tabular-nums">
          {bet.odds.toFixed(2)}
        </span>
      </td>

      {/* Units */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm text-zinc-300">{bet.units}u</span>
      </td>

      {/* ROI */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium",
            roiColors.bg,
            roiColors.text
          )}
        >
          {ROI_LABELS[bet.roiLabel]}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider",
            statusColors.bg,
            statusColors.text
          )}
        >
          {bet.status === "won" && <ArrowUpRight size={10} />}
          {bet.status === "lost" && <ArrowDownRight size={10} />}
          {bet.status === "void" ? "annulé" : bet.status}
        </span>
      </td>

      {/* Date */}
      <td className="px-3 py-4 text-center">
        <span className="text-xs text-zinc-500 font-mono">
          {new Date(bet.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </td>

      {/* Profit */}
      <td className="px-5 py-4 text-right">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums flex items-center justify-end gap-1",
            bet.profit >= 0 ? "text-green-400" : "text-red-400"
          )}
        >
          {bet.profit >= 0 ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {bet.profit >= 0 ? "+" : ""}
          {bet.profit.toFixed(2)}€
        </span>
      </td>
    </motion.tr>
  );
}
