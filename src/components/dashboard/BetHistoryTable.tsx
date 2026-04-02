"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BET_HISTORY,
  TOURNAMENTS,
  ROI_COLORS,
  STATUS_COLORS,
} from "@/lib/dashboard-data";
import type { BetHistoryItem, Surface, RoiLabel, BetHistoryFilters } from "@/lib/dashboard-data";

const SURFACES: { value: Surface | ""; label: string }[] = [
  { value: "", label: "Toutes surfaces" },
  { value: "hard", label: "Dur" },
  { value: "clay", label: "Terre battue" },
  { value: "grass", label: "Gazon" },
];

const ROI_FILTERS: { value: RoiLabel | ""; label: string }[] = [
  { value: "", label: "Tous" },
  { value: "green", label: "🟢 HIGH" },
  { value: "yellow", label: "🟡 MED" },
  { value: "orange", label: "🟠 LOW" },
  { value: "red", label: "🔴 MIN" },
];

export function BetHistoryTable() {
  const [filters, setFilters] = useState<BetHistoryFilters>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBets = useMemo(() => {
    return BET_HISTORY.filter((bet) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesPlayer = bet.player.toLowerCase().includes(query);
        const matchesOpponent = bet.opponent.toLowerCase().includes(query);
        if (!matchesPlayer && !matchesOpponent) return false;
      }

      // Tournament filter
      if (filters.tournament && filters.tournament !== "Tous les tournois") {
        if (bet.tournament !== filters.tournament) return false;
      }

      // Surface filter
      if (filters.surface) {
        if (bet.surface !== filters.surface) return false;
      }

      // ROI label filter
      if (filters.roiLabel) {
        if (bet.roiLabel !== filters.roiLabel) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const hasActiveFilters =
    filters.tournament ||
    filters.surface ||
    filters.roiLabel ||
    searchQuery;

  // Stats
  const totalProfit = filteredBets.reduce((sum, bet) => sum + bet.profit, 0);
  const winRate =
    (filteredBets.filter((bet) => bet.status === "won").length /
      filteredBets.length) *
    100;

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">
            Historique des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {filteredBets.length}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={12} />
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un joueur..."
            className="w-full h-8 pl-9 pr-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors"
          />
        </div>

        {/* Tournament */}
        <select
          value={filters.tournament || ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              tournament: e.target.value || undefined,
            }))
          }
          className="h-8 px-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-xs text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer"
        >
          {TOURNAMENTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Surface */}
        <select
          value={filters.surface || ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              surface: (e.target.value as Surface) || undefined,
            }))
          }
          className="h-8 px-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-xs text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer"
        >
          {SURFACES.map((s) => (
            <option key={s.value || "all"} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* ROI */}
        <select
          value={filters.roiLabel || ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              roiLabel: (e.target.value as RoiLabel) || undefined,
            }))
          }
          className="h-8 px-3 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-xs text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer"
        >
          {ROI_FILTERS.map((r) => (
            <option key={r.value || "all"} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
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
              <th className="px-5 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {filteredBets.map((bet, index) => (
                <HistoryRow key={bet.id} bet={bet} index={index} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {filteredBets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <Filter size={18} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Aucun pari trouvé
          </p>
          <p className="text-xs text-zinc-600 max-w-xs">
            Aucun résultat ne correspond à vos critères de recherche.
          </p>
        </div>
      )}

      {/* Footer stats */}
      {filteredBets.length > 0 && (
        <div className="grid grid-cols-3 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Paris affichés
            </p>
            <p className="text-sm font-bold text-zinc-100">
              {filteredBets.length}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Profit total
            </p>
            <p
              className={`text-sm font-bold ${
                totalProfit >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {totalProfit >= 0 ? "+" : ""}
              {totalProfit.toFixed(2)}€
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Win rate
            </p>
            <p className="text-sm font-bold text-zinc-100">
              {winRate.toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
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
          {bet.roiLabel === "green"
            ? "HIGH"
            : bet.roiLabel === "yellow"
            ? "MED"
            : bet.roiLabel === "orange"
            ? "LOW"
            : "MIN"}
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
