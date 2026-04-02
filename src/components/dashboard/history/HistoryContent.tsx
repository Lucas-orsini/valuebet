"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryFilters, type FilterState } from "./HistoryFilters";
import { HistoryTable } from "./HistoryTable";
import { BET_HISTORY } from "@/lib/dashboard-data";
import type { BetHistoryItem } from "@/lib/dashboard-data";

export function HistoryContent() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: null, end: null },
    tournament: "",
    surface: "",
    roi: "",
    search: "",
  });
  const [isLoading] = useState(false);

  const filteredBets = useMemo(() => {
    return BET_HISTORY.filter((bet) => {
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

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const betDate = new Date(bet.date);
        if (filters.dateRange.start && betDate < filters.dateRange.start) {
          return false;
        }
        if (filters.dateRange.end && betDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      dateRange: { start: null, end: null },
      tournament: "",
      surface: "",
      roi: "",
      search: "",
    });
  };

  const hasActiveFilters = Boolean(
    filters.dateRange.start ||
      filters.dateRange.end ||
      filters.tournament ||
      filters.surface ||
      filters.roi ||
      filters.search
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Filters skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5 animate-pulse">
          <div className="h-4 bg-white/[0.06] rounded w-20 mb-4" />
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-9 bg-white/[0.04] rounded-lg w-[200px]" />
            <div className="h-9 bg-white/[0.04] rounded-lg w-[140px]" />
            <div className="h-9 bg-white/[0.04] rounded-lg w-[140px]" />
            <div className="h-9 bg-white/[0.04] rounded-lg w-[140px]" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden animate-pulse">
          <div className="h-12 bg-white/[0.02]" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-t border-white/[0.05]" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = BET_HISTORY.length === 0;
  const isFilteredEmpty = BET_HISTORY.length > 0 && filteredBets.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Filters */}
      <HistoryFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Table */}
      <HistoryTable
        bets={filteredBets}
        isEmpty={isEmpty}
        isFilteredEmpty={isFilteredEmpty}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
      />
    </motion.div>
  );
}
