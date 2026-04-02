"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryStats } from "./HistoryStats";
import { HistoryFilters, type FilterState } from "./HistoryFilters";
import { HistoryChart } from "./HistoryChart";
import { HistoryTable } from "./HistoryTable";
import { BET_HISTORY, SURFACE_STATS } from "@/lib/dashboard-data";
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

  // Calculate stats
  const stats = useMemo(() => {
    const totalBets = filteredBets.length;
    const wonBets = filteredBets.filter((b) => b.status === "won").length;
    const lostBets = filteredBets.filter((b) => b.status === "lost").length;
    const voidBets = filteredBets.filter((b) => b.status === "void").length;
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;
    const totalProfit = filteredBets.reduce((sum, b) => sum + b.profit, 0);
    const totalUnits = filteredBets.reduce((sum, b) => sum + b.units, 0);
    const roi = totalUnits > 0 ? (totalProfit / totalUnits) * 100 : 0;

    // Calculate deltas (comparing to previous period - simplified for demo)
    const totalDelta = totalBets > 0 ? Math.round(totalBets * 0.15) : 0;
    const winRateDelta = winRate > 0 ? 2.3 : 0;
    const profitDelta = totalProfit > 0 ? Math.abs(totalProfit * 0.12) : 0;
    const roiDelta = roi > 0 ? 1.8 : 0;

    return {
      totalBets,
      totalBetsDelta: totalDelta,
      winRate,
      winRateDelta,
      profit: totalProfit,
      profitDelta,
      roi,
      roiDelta,
      wonBets,
      lostBets,
      voidBets,
    };
  }, [filteredBets]);

  // Prepare chart data
  const chartData = useMemo(() => {
    const sortedBets = [...filteredBets].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let cumulative = 0;
    return sortedBets.map((bet) => {
      cumulative += bet.profit;
      return {
        date: bet.date,
        profit: bet.profit,
        cumulative,
        label: `${bet.player} vs ${bet.opponent}`,
      };
    });
  }, [filteredBets]);

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
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/[0.07] rounded-xl p-5 animate-pulse"
            >
              <div className="h-3 bg-white/[0.06] rounded w-20 mb-3" />
              <div className="h-8 bg-white/[0.05] rounded w-24 mb-2" />
              <div className="h-3 bg-white/[0.04] rounded w-16" />
            </div>
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5 animate-pulse">
          <div className="h-4 bg-white/[0.06] rounded w-40 mb-4" />
          <div className="h-[250px] bg-white/[0.03] rounded" />
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
      {/* Stats cards */}
      <HistoryStats stats={stats} />

      {/* Chart */}
      <HistoryChart data={chartData} />

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
