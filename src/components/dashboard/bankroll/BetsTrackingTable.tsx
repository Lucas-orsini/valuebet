"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Bet, BankrollMode } from "@/lib/bankroll-data";

interface BetsTrackingTableProps {
  bets: Bet[];
  mode: BankrollMode;
  selectedBetIds: Set<string>;
  customOdds: Record<string, number>;
  onBetToggle: (betId: string, isSelected: boolean) => void;
  onOddsChange: (betId: string, odds: number) => void;
}

const ITEMS_PER_PAGE = 10;

export function BetsTrackingTable({
  bets,
  mode,
  selectedBetIds,
  customOdds,
  onBetToggle,
  onOddsChange,
}: BetsTrackingTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBets = useMemo(() => {
    if (!searchQuery) return bets;
    const query = searchQuery.toLowerCase();
    return bets.filter(
      (bet) =>
        bet.match.toLowerCase().includes(query) ||
        bet.type.toLowerCase().includes(query)
    );
  }, [bets, searchQuery]);

  const totalPages = Math.ceil(filteredBets.length / ITEMS_PER_PAGE);
  const paginatedBets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBets, currentPage]);

  const handleToggle = useCallback(
    (betId: string) => {
      const isSelected = selectedBetIds.has(betId);
      onBetToggle(betId, !isSelected);
    },
    [selectedBetIds, onBetToggle]
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const calculateProfit = (bet: Bet) => {
    const odds = customOdds[bet.id] || bet.aiOdds;
    if (bet.result === "win") {
      return (odds - 1) * bet.units;
    } else if (bet.result === "loss") {
      return -bet.units;
    }
    return 0;
  };

  const isEmpty = filteredBets.length === 0;

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">
            Suivi des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {filteredBets.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher..."
            className="h-8 w-48 pl-9 pr-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 transition-colors"
          />
        </div>
      </div>

      {/* Mode indicator */}
      <div className="px-5 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <p className="text-xs text-zinc-500">
          {mode === "auto"
            ? "Mode automatique : tous les paris recommandés sont inclus"
            : "Mode personnalisé : cochez les paris à inclure dans le suivi"}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {mode === "manual" && (
                <th className="px-4 py-3 w-12">
                  <span className="sr-only">Sélection</span>
                </th>
              )}
              <th className="px-4 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-4 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote IA
              </th>
              {mode === "manual" && (
                <th className="px-4 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Cote réelle
                </th>
              )}
              <th className="px-4 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Unités
              </th>
              <th className="px-4 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Résultat
              </th>
              <th className="px-4 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Gain
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {paginatedBets.map((bet) => (
                <BetRow
                  key={bet.id}
                  bet={bet}
                  mode={mode}
                  isSelected={selectedBetIds.has(bet.id)}
                  customOdds={customOdds[bet.id]}
                  onToggle={() => handleToggle(bet.id)}
                  onOddsChange={(value) => handleOddsChange(bet.id, value)}
                  calculateProfit={calculateProfit}
                  formatDate={formatDate}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <Search size={18} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Aucun pari trouvé
          </p>
          <p className="text-xs text-zinc-600 max-w-xs">
            {searchQuery
              ? "Essayez avec d'autres termes de recherche"
              : "Aucun pari à afficher pour le moment"}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
          <p className="text-xs text-zinc-500">
            Affichage {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredBets.length)} sur{" "}
            {filteredBets.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === 1
                  ? "text-zinc-600 cursor-not-allowed"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              )}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-md text-xs font-medium transition-colors",
                  currentPage === page
                    ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                )}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === totalPages
                  ? "text-zinc-600 cursor-not-allowed"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface BetRowProps {
  bet: Bet;
  mode: BankrollMode;
  isSelected: boolean;
  customOdds?: number;
  onToggle: () => void;
  onOddsChange: (value: string) => void;
  calculateProfit: (bet: Bet) => number;
  formatDate: (date: string) => string;
}

function BetRow({
  bet,
  mode,
  isSelected,
  customOdds,
  onToggle,
  onOddsChange,
  calculateProfit,
  formatDate,
}: BetRowProps) {
  const profit = calculateProfit(bet);
  const displayOdds = customOdds || bet.aiOdds;

  const isDisabled = mode === "auto" && !bet.isTracked;
  const isGreyedOut = mode === "auto" && bet.isTracked === false && bet.result !== "pending";

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "transition-colors",
        isDisabled && "opacity-50",
        isGreyedOut && "opacity-40",
        !isDisabled && "hover:bg-white/[0.02] cursor-pointer"
      )}
    >
      {/* Checkbox (manual mode only) */}
      {mode === "manual" && (
        <td className="px-4 py-4">
          <button
            onClick={onToggle}
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
              isSelected
                ? "bg-indigo-500 border-indigo-500"
                : "border-white/20 hover:border-white/40 bg-transparent"
            )}
          >
            {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
          </button>
        </td>
      )}

      {/* Date */}
      <td className="px-4 py-4">
        <span className="text-xs text-zinc-400">{formatDate(bet.date)}</span>
      </td>

      {/* Match */}
      <td className="px-4 py-4">
        <span className="text-sm text-zinc-200 font-medium">{bet.match}</span>
      </td>

      {/* Type */}
      <td className="px-4 py-4 text-center">
        <span className="text-xs text-zinc-500">{bet.type}</span>
      </td>

      {/* AI Odds */}
      <td className="px-4 py-4 text-center">
        <span className="text-sm font-semibold text-zinc-100 tabular-nums">
          {bet.aiOdds.toFixed(2)}
        </span>
      </td>

      {/* Custom Odds (manual mode only) */}
      {mode === "manual" && (
        <td className="px-4 py-4 text-center">
          {isSelected ? (
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="1"
              max="100"
              defaultValue={displayOdds.toFixed(2)}
              onChange={(e) => onOddsChange(e.target.value)}
              className="w-20 h-7 px-2 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-100 tabular-nums text-center focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          ) : (
            <span className="text-sm text-zinc-600 tabular-nums">
              {displayOdds.toFixed(2)}
            </span>
          )}
        </td>
      )}

      {/* Units */}
      <td className="px-4 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-md text-xs font-bold",
            bet.units === 3
              ? "bg-green-500/15 text-green-400"
              : bet.units === 2
              ? "bg-[#F2CB38]/15 text-[#F2CB38]"
              : "bg-white/[0.08] text-zinc-300"
          )}
        >
          {bet.units}u
        </span>
      </td>

      {/* Result */}
      <td className="px-4 py-4 text-center">
        {bet.result === "pending" ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/10 text-yellow-400 text-[10px] font-medium uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            En cours
          </span>
        ) : bet.result === "win" ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-medium uppercase">
            <Check size={10} />
            Gagné
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-medium uppercase">
            <X size={10} />
            Perdu
          </span>
        )}
      </td>

      {/* Profit */}
      <td className="px-4 py-4 text-right">
        {bet.result === "pending" ? (
          <span className="text-sm text-zinc-600">—</span>
        ) : (
          <span
            className={cn(
              "text-sm font-semibold tabular-nums",
              profit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {profit >= 0 ? "+" : ""}
            {profit.toFixed(2)}€
          </span>
        )}
      </td>
    </motion.tr>
  );
}
