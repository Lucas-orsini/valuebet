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
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROI_COLORS, STATUS_COLORS, TOURNAMENTS } from "@/lib/dashboard-data";
import type { BetHistoryItem, RoiLabel, Surface } from "@/lib/dashboard-data";

interface HistoryTableProps {
  bets: BetHistoryItem[];
  isEmpty: boolean;
}

interface FilterState {
  search: string;
  tournament: string;
  surface: string;
  roi: RoiLabel | "";
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
  { value: "green", label: "🟢 HIGH" },
  { value: "yellow", label: "🟡 MED" },
  { value: "orange", label: "🟠 LOW" },
  { value: "red", label: "🔴 MIN" },
];

const ROI_LABELS: Record<RoiLabel, string> = {
  green: "HIGH",
  yellow: "MED",
  orange: "LOW",
  red: "MIN",
};

export function HistoryTable({ bets, isEmpty }: HistoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    tournament: "",
    surface: "",
    roi: "",
  });

  // Filtered bets
  const filteredBets = useMemo(() => {
    return bets.filter((bet) => {
      // Search query
      if (filters.search) {
        const query = filters.search.toLowerCase();
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
      if (filters.roi) {
        if (bet.roiLabel !== filters.roi) return false;
      }

      return true;
    });
  }, [bets, filters]);

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.tournament ||
      filters.surface ||
      filters.roi
  );

  const clearFilters = () => {
    setFilters({
      search: "",
      tournament: "",
      surface: "",
      roi: "",
    });
  };

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredBets.length / ITEMS_PER_PAGE));

  const paginatedBets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBets, currentPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters]);

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Stats
  const totalProfit = filteredBets.reduce((sum, bet) => sum + bet.profit, 0);
  const wonBets = filteredBets.filter((bet) => bet.status === "won").length;
  const lostBets = filteredBets.filter((bet) => bet.status === "lost").length;
  const voidBets = filteredBets.filter((bet) => bet.status === "void").length;
  const winRate = filteredBets.length > 0 ? (wonBets / filteredBets.length) * 100 : 0;

  // Empty state
  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[var(--text-1)]">
              Historique des paris
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-3)] text-[10px] font-medium">
              0
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center mb-4">
            <ScrollText size={22} className="text-[var(--text-3)]" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-[var(--text-2)] mb-1">
            Aucun pari enregistré
          </p>
          <p className="text-xs text-[var(--text-3)] max-w-xs">
            Vos paris apparaîtront ici une fois enregistrés.
          </p>
        </div>
      </motion.div>
    );
  }

  const isFilteredEmpty = filteredBets.length === 0;

  // Filtered empty state
  if (isFilteredEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[var(--text-1)]">
              Historique des paris
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-3)] text-[10px] font-medium">
              0
            </span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
            >
              <X size={12} />
              Effacer les filtres
            </button>
          )}
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center mb-4">
            <ScrollText size={22} className="text-[var(--text-3)]" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-[var(--text-2)] mb-1">
            Aucun pari trouvé
          </p>
          <p className="text-xs text-[var(--text-3)] max-w-xs mb-4">
            Aucun résultat ne correspond à vos critères de recherche.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="h-8 px-4 rounded-md border border-[var(--border)] text-xs text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)] transition-colors"
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
      className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-[var(--text-1)]">
            Historique des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--text-3)] text-[10px] font-medium">
            {filteredBets.length}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-[var(--text-3)] hover:text-[var(--text-2)] transition-colors"
          >
            <X size={12} />
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--surface-2)]">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Rechercher un joueur…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/20 transition-colors"
          />
        </div>

        {/* Tournament */}
        <select
          value={filters.tournament}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, tournament: e.target.value }))
          }
          className="h-9 px-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-2)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-[var(--border-md)]"
        >
          {TOURNAMENTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Surface */}
        <select
          value={filters.surface}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              surface: e.target.value as Surface | "",
            }))
          }
          className="h-9 px-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-2)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-[var(--border-md)]"
        >
          {SURFACES.map((s) => (
            <option key={s.value || "all"} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* ROI */}
        <select
          value={filters.roi}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              roi: e.target.value as RoiLabel | "",
            }))
          }
          className="h-9 px-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-sm text-[var(--text-2)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-[var(--border-md)]"
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
            <tr className="border-b border-[var(--border)]">
              <th className="px-5 py-3 text-left text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Joueur
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Tournoi
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Surface
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Cote
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Mise
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                ROI
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Résultat
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-right text-[10px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
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
        <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-2)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-3)]">
            <span>
              Affichage {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredBets.length)} sur{" "}
              {filteredBets.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Première page"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
                        ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/20"
                        : "border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)]"
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
              className="flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Page suivante"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-md border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--border-md)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Dernière page"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-5 py-4 border-t border-[var(--border)] bg-[var(--surface-2)]">
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
            Paris affichés
          </p>
          <p className="text-sm font-bold text-[var(--text-1)]">
            {paginatedBets.length}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
            Profit total
          </p>
          <p
            className={cn(
              "text-sm font-bold",
              totalProfit >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
            )}
          >
            {totalProfit >= 0 ? "+" : ""}
            {totalProfit.toFixed(2)}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
            Victoires
          </p>
          <p className="text-sm font-bold text-[var(--green)]">
            {wonBets}
            <span className="text-[var(--text-3)] font-normal">/{filteredBets.length}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
            Défaites
          </p>
          <p className="text-sm font-bold text-[var(--red)]">
            {lostBets}
            <span className="text-[var(--text-3)] font-normal">/{filteredBets.length}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-1">
            Win rate
          </p>
          <p className="text-sm font-bold text-[var(--text-1)]">
            {winRate.toFixed(1)}%
          </p>
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
      className="hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
    >
      {/* Player */}
      <td className="px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm text-[var(--text-1)] font-medium">
            {bet.player}
          </span>
          <span className="text-xs text-[var(--text-3)]">vs {bet.opponent}</span>
        </div>
      </td>

      {/* Tournament */}
      <td className="px-3 py-4">
        <span className="text-xs text-[var(--text-3)]">{bet.tournament}</span>
      </td>

      {/* Surface */}
      <td className="px-3 py-4">
        <span className="text-xs text-[var(--text-3)]">
          {surfaceLabels[bet.surface]}
        </span>
      </td>

      {/* Odds */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm font-semibold text-[var(--text-1)] tabular-nums">
          {bet.odds.toFixed(2)}
        </span>
      </td>

      {/* Units */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm text-[var(--text-2)]">{bet.units}u</span>
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
        <span className="text-xs text-[var(--text-3)] font-mono">
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
            bet.profit >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"
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
