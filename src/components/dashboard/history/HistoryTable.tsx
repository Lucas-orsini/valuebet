"use client";

import { useState, useMemo, useCallback } from "react";
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
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROI_COLORS, STATUS_COLORS, TOURNAMENTS, isInRange } from "@/lib/dashboard-data";
import type { BetHistoryItem, RoiLabel, Surface, TimeRange } from "@/lib/dashboard-data";

interface HistoryTableProps {
  bets: BetHistoryItem[];
  isEmpty: boolean;
  timeRange?: TimeRange;
}

interface FilterState {
  search: string;
  tournament: string;
  surface: string;
  roi: RoiLabel | "";
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

const ITEMS_PER_PAGE = 15;

const SURFACES: { value: Surface | ""; label: string }[] = [
  { value: "", label: "Toutes surfaces" },
  { value: "hard", label: "Dur" },
  { value: "clay", label: "Terre battue" },
  { value: "grass", label: "Gazon" },
];

const ROI_FILTERS: { value: RoiLabel | ""; label: string }[] = [
  { value: "", label: "Tous les ROI" },
  { value: "green", label: "🟢 HIGH (+6%)" },
  { value: "yellow", label: "🟡 MED (4-6%)" },
  { value: "orange", label: "🟠 LOW (2-4%)" },
  { value: "red", label: "🔴 MIN (-2%)" },
];

const ROI_LABELS: Record<RoiLabel, string> = {
  green: "HIGH",
  yellow: "MED",
  orange: "LOW",
  red: "MIN",
};

const INITIAL_FILTERS: FilterState = {
  search: "",
  tournament: "",
  surface: "",
  roi: "",
  dateRange: {
    start: null,
    end: null,
  },
};

export function HistoryTable({ bets, isEmpty, timeRange = "ALL" }: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const formatDateDisplay = useCallback(() => {
    if (!filters.dateRange.start && !filters.dateRange.end) {
      return "Toutes les dates";
    }
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      });
    };
    if (filters.dateRange.start && filters.dateRange.end) {
      return `${formatDate(filters.dateRange.start)} - ${formatDate(filters.dateRange.end)}`;
    }
    if (filters.dateRange.start) {
      return `À partir du ${formatDate(filters.dateRange.start)}`;
    }
    return `Jusqu'au ${formatDate(filters.dateRange.end)}`;
  }, [filters.dateRange]);

  const handleDateApply = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        start: tempStartDate ? new Date(tempStartDate) : null,
        end: tempEndDate ? new Date(tempEndDate) : null,
      },
    }));
    setShowDatePicker(false);
  }, [tempStartDate, tempEndDate]);

  const handleClearDates = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start: null, end: null },
    }));
    setTempStartDate("");
    setTempEndDate("");
    setShowDatePicker(false);
  }, []);

  const filteredBets = useMemo(() => {
    let result = [...bets];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (bet) =>
          bet.player.toLowerCase().includes(searchLower) ||
          bet.opponent.toLowerCase().includes(searchLower)
      );
    }

    if (filters.tournament) {
      result = result.filter((bet) => bet.tournament === filters.tournament);
    }

    if (filters.surface) {
      result = result.filter((bet) => bet.surface === filters.surface);
    }

    if (filters.roi) {
      result = result.filter((bet) => bet.roiLabel === filters.roi);
    }

    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter((bet) => {
        const betDate = new Date(bet.date);
        if (filters.dateRange.start && betDate < filters.dateRange.start) {
          return false;
        }
        if (filters.dateRange.end && betDate > filters.dateRange.end) {
          return false;
        }
        return true;
      });
    }

    if (timeRange !== "ALL") {
      result = result.filter((bet) => {
        const betDate = new Date(bet.date);
        return isInRange(betDate, timeRange);
      });
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [bets, filters, timeRange]);

  const totalPages = Math.ceil(filteredBets.length / ITEMS_PER_PAGE);
  const paginatedBets = filteredBets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stats = useMemo(() => {
    const totalBets = filteredBets.length;
    const wins = filteredBets.filter((b) => b.status === "won").length;
    const totalProfit = filteredBets.reduce((sum, b) => sum + b.profit, 0);
    const totalStake = filteredBets.reduce((sum, b) => sum + b.units, 0);
    const winRate = totalBets > 0 ? (wins / totalBets) * 100 : 0;
    const roi = totalStake > 0 ? (totalProfit / totalStake) * 100 : 0;

    return { totalBets, wins, totalProfit, totalStake, winRate, roi };
  }, [filteredBets]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setTempStartDate("");
    setTempEndDate("");
  }, []);

  const hasActiveFilters =
    filters.search ||
    filters.tournament ||
    filters.surface ||
    filters.roi ||
    filters.dateRange.start ||
    filters.dateRange.end;

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[var(--surface-1)] border border-white/[0.07] rounded-xl overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <ScrollText size={24} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-base font-medium text-zinc-400 mb-2">
            Aucun pari dans l&apos;historique
          </p>
          <p className="text-sm text-zinc-600 max-w-[280px]">
            Vos paris apparaîtront ici une fois enregistrés
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[var(--surface-1)] border border-white/[0.07] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-alpha)] border border-[var(--border-accent)] flex items-center justify-center">
              <ScrollText size={16} className="text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                Historique des paris
              </h2>
              <p className="text-[11px] text-zinc-500">
                {filteredBets.length} pari{filteredBets.length !== 1 ? "s" : ""} trouvé{filteredBets.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 h-8 px-3 rounded-md text-xs font-medium transition-colors",
              showFilters
                ? "bg-[var(--accent-alpha)] text-[var(--accent)] border border-[var(--border-accent)]"
                : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200 border border-transparent"
            )}
          >
            <Filter size={14} />
            Filtres
            {hasActiveFilters && (
              <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-[10px] font-bold text-black flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="text"
                    placeholder="Rechercher un joueur..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, search: e.target.value }))
                    }
                    className="w-full h-9 pl-9 pr-3 rounded-md bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[var(--border-accent)] transition-colors"
                  />
                  {filters.search && (
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, search: "" }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Tournament Select */}
                  <div className="relative">
                    <select
                      value={filters.tournament}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          tournament: e.target.value,
                        }))
                      }
                      className="h-8 pl-3 pr-8 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 appearance-none cursor-pointer hover:bg-white/[0.05] focus:outline-none focus:border-[var(--border-accent)] transition-colors"
                    >
                      {TOURNAMENTS.map((t) => (
                        <option key={t} value={t === "Tous les tournois" ? "" : t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>

                  {/* Surface Select */}
                  <div className="relative">
                    <select
                      value={filters.surface}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          surface: e.target.value,
                        }))
                      }
                      className="h-8 pl-3 pr-8 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 appearance-none cursor-pointer hover:bg-white/[0.05] focus:outline-none focus:border-[var(--border-accent)] transition-colors"
                    >
                      {SURFACES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>

                  {/* ROI Select */}
                  <div className="relative">
                    <select
                      value={filters.roi}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          roi: e.target.value as RoiLabel | "",
                        }))
                      }
                      className="h-8 pl-3 pr-8 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 appearance-none cursor-pointer hover:bg-white/[0.05] focus:outline-none focus:border-[var(--border-accent)] transition-colors"
                    >
                      {ROI_FILTERS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className={cn(
                        "h-8 px-3 rounded-md text-xs font-medium transition-colors flex items-center gap-2",
                        filters.dateRange.start || filters.dateRange.end
                          ? "bg-[var(--accent-alpha)] text-[var(--accent)] border border-[var(--border-accent)]"
                          : "bg-white/[0.03] text-zinc-300 border border-white/[0.06] hover:bg-white/[0.05]"
                      )}
                    >
                      {formatDateDisplay()}
                    </button>

                    <AnimatePresence>
                      {showDatePicker && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 p-3 bg-[var(--surface-2)] border border-white/[0.10] rounded-lg shadow-xl z-20 min-w-[240px]"
                        >
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">
                                Date début
                              </label>
                              <input
                                type="date"
                                value={tempStartDate}
                                onChange={(e) => setTempStartDate(e.target.value)}
                                className="w-full h-8 px-2 rounded bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-200 focus:outline-none focus:border-[var(--border-accent)]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 block">
                                Date fin
                              </label>
                              <input
                                type="date"
                                value={tempEndDate}
                                onChange={(e) => setTempEndDate(e.target.value)}
                                className="w-full h-8 px-2 rounded bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-200 focus:outline-none focus:border-[var(--border-accent)]"
                              />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={handleClearDates}
                                className="flex-1 h-8 rounded bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.06] transition-colors"
                              >
                                Effacer
                              </button>
                              <button
                                onClick={handleDateApply}
                                className="flex-1 h-8 rounded bg-[var(--accent-alpha)] text-xs text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors"
                              >
                                Appliquer
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Clear All */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="h-8 px-3 rounded-md text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-colors"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Paris
          </p>
          <p className="text-lg font-bold text-zinc-100 tabular-nums">
            {stats.totalBets}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Victoires
          </p>
          <p className="text-lg font-bold text-green-400 tabular-nums">
            {stats.winRate.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.totalProfit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.totalProfit >= 0 ? "+" : ""}
            {stats.totalProfit.toFixed(2)}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            ROI
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.roi >= 6
                ? "text-green-400"
                : stats.roi >= 4
                ? "text-yellow-400"
                : stats.roi >= 2
                ? "text-orange-400"
                : "text-red-400"
            )}
          >
            {stats.roi >= 0 ? "+" : ""}
            {stats.roi.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Table */}
      {paginatedBets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Joueur
                </th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Tournoi
                </th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Surface
                </th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Cote
                </th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Mise
                </th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  ROI
                </th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Résultat
                </th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedBets.map((bet, index) => {
                const roiColors = ROI_COLORS[bet.roiLabel];
                const statusColors = STATUS_COLORS[bet.status];

                return (
                  <motion.tr
                    key={bet.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-zinc-200 font-medium">
                          {bet.player}
                        </p>
                        <p className="text-[11px] text-zinc-600">
                          vs {bet.opponent}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-400">{bet.tournament}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium",
                          bet.surface === "hard" &&
                            "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                          bet.surface === "clay" &&
                            "bg-orange-500/10 text-orange-400 border border-orange-500/20",
                          bet.surface === "grass" &&
                            "bg-green-500/10 text-green-400 border border-green-500/20"
                        )}
                      >
                        {bet.surface === "hard"
                          ? "Dur"
                          : bet.surface === "clay"
                          ? "Terre"
                          : "Gazon"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                        {bet.odds.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium text-zinc-300 tabular-nums">
                        {bet.units}u
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center min-w-[48px] px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider",
                          roiColors.bg,
                          roiColors.text
                        )}
                      >
                        {ROI_LABELS[bet.roiLabel]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold",
                          statusColors.bg,
                          statusColors.text
                        )}
                      >
                        {bet.status === "won"
                          ? "W"
                          : bet.status === "lost"
                          ? "L"
                          : bet.status === "void"
                          ? "V"
                          : "?"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {bet.profit >= 0 ? (
                          <ArrowUpRight
                            size={14}
                            className={cn(
                              bet.profit > 0 ? "text-green-400" : "text-zinc-500"
                            )}
                          />
                        ) : (
                          <ArrowDownRight size={14} className="text-red-400" />
                        )}
                        <span
                          className={cn(
                            "text-sm font-semibold tabular-nums",
                            bet.profit > 0
                              ? "text-green-400"
                              : bet.profit < 0
                              ? "text-red-400"
                              : "text-zinc-500"
                          )}
                        >
                          {bet.profit >= 0 ? "+" : ""}
                          {bet.profit.toFixed(2)}€
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-3">
            <Search size={18} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-400 mb-1">
            Aucun résultat
          </p>
          <p className="text-xs text-zinc-600 max-w-[200px]">
            Modifiez vos filtres pour voir plus de paris
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
          <p className="text-xs text-zinc-500">
            Page {currentPage} sur {totalPages} ({filteredBets.length} résultats)
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === 1
                  ? "bg-white/[0.03] text-zinc-600 cursor-not-allowed"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              )}
            >
              <ChevronsLeft size={14} />
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === 1
                  ? "bg-white/[0.03] text-zinc-600 cursor-not-allowed"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              )}
            >
              <ChevronLeft size={14} />
            </button>

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
                  onClick={() => handlePageChange(pageNum)}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-md text-xs font-medium transition-colors",
                    currentPage === pageNum
                      ? "bg-[var(--accent-alpha)] text-[var(--accent)] border border-[var(--border-accent)]"
                      : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === totalPages
                  ? "bg-white/[0.03] text-zinc-600 cursor-not-allowed"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              )}
            >
              <ChevronRight size={14} />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                currentPage === totalPages
                  ? "bg-white/[0.03] text-zinc-600 cursor-not-allowed"
                  : "bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              )}
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
