"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryStats } from "./HistoryStats";
import { HistoryTable } from "./HistoryTable";
import { SurfaceStats } from "./SurfaceStats";
import { BET_HISTORY, isInRange } from "@/lib/dashboard-data";
import type { TimeRange } from "@/lib/dashboard-data";

export function HistoryContent({ timeRange = "ALL" }: { timeRange?: TimeRange }) {
  const [isLoading] = useState(false);

  // Filter bets by time range
  const filteredBets = useMemo(() => {
    return BET_HISTORY.filter((bet) => {
      const betDate = new Date(bet.date);
      return isInRange(betDate, timeRange);
    });
  }, [timeRange]);

  // Stats calculation for the filtered data
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
              <div className="h-3 bg-[#1a1a1a] rounded w-20 mb-3" />
              <div className="h-8 bg-[#1a1a1a] rounded w-24 mb-2" />
              <div className="h-3 bg-[#1a1a1a] rounded w-16" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden animate-pulse">
          <div className="h-12 bg-[#1a1a1a]" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-t border-white/[0.06]" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = filteredBets.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Stats cards */}
      <HistoryStats stats={stats} timeRange={timeRange} />

      {/* Surface stats with filtered bets */}
      <SurfaceStats timeRange={timeRange} bets={filteredBets} />

      {/* Table with integrated filters */}
      <HistoryTable bets={filteredBets} isEmpty={isEmpty} timeRange={timeRange} />
    </motion.div>
  );
}
