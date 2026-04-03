"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HistoryStats } from "./HistoryStats";
import { HistoryTable } from "./HistoryTable";
import { SurfaceStats } from "@/components/dashboard/SurfaceStats";
import { TimeFilter, type TimePeriod } from "./TimeFilter";
import { BET_HISTORY } from "@/lib/dashboard-data";

export function HistoryContent() {
  const [isLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('ALL');

  // Filter bets by time period
  const filteredBets = useMemo(() => {
    if (selectedPeriod === 'ALL') return BET_HISTORY;

    const now = new Date();
    const daysMap: Record<TimePeriod, number> = {
      '1M': 30,
      '3M': 90,
      '6M': 180,
      '1A': 365,
      ALL: Infinity,
    };
    const days = daysMap[selectedPeriod];
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return BET_HISTORY.filter((bet) => {
      const betDate = new Date(bet.date);
      return betDate >= cutoffDate;
    });
  }, [selectedPeriod]);

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
              <div className="h-3 bg-white/[0.06] rounded w-20 mb-3" />
              <div className="h-8 bg-white/[0.06] rounded w-24 mb-2" />
              <div className="h-3 bg-white/[0.06] rounded w-16" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden animate-pulse">
          <div className="h-12 bg-white/[0.06]" />
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
      <HistoryStats stats={stats} />

      {/* Time filter */}
      <div className="flex items-center justify-end">
        <TimeFilter
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* Surface Stats - global data, not filtered by period */}
      <SurfaceStats />

      {/* Table with integrated filters */}
      <HistoryTable bets={filteredBets} isEmpty={isEmpty} />
    </motion.div>
  );
}
