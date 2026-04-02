"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryStats } from "./HistoryStats";
import { HistoryTable } from "./HistoryTable";
import { BET_HISTORY } from "@/lib/dashboard-data";

export function HistoryContent() {
  const [isLoading] = useState(false);

  // Stats calculation for the filtered data (all bets by default)
  const stats = useMemo(() => {
    const totalBets = BET_HISTORY.length;
    const wonBets = BET_HISTORY.filter((b) => b.status === "won").length;
    const lostBets = BET_HISTORY.filter((b) => b.status === "lost").length;
    const voidBets = BET_HISTORY.filter((b) => b.status === "void").length;
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;
    const totalProfit = BET_HISTORY.reduce((sum, b) => sum + b.profit, 0);
    const totalUnits = BET_HISTORY.reduce((sum, b) => sum + b.units, 0);
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
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-5 animate-pulse"
            >
              <div className="h-3 bg-[var(--surface-2)] rounded w-20 mb-3" />
              <div className="h-8 bg-[var(--surface-2)] rounded w-24 mb-2" />
              <div className="h-3 bg-[var(--surface-2)] rounded w-16" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl overflow-hidden animate-pulse">
          <div className="h-12 bg-[var(--surface-2)]" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-t border-[var(--border)]" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = BET_HISTORY.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Stats cards */}
      <HistoryStats stats={stats} />

      {/* Table with integrated filters */}
      <HistoryTable bets={BET_HISTORY} isEmpty={isEmpty} />
    </motion.div>
  );
}
