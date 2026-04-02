"use client";

// This component was removed from the refactored history page.
// Exporting a stub to maintain compatibility with any remaining imports.

interface StatsData {
  totalBets: number;
  totalBetsDelta: number;
  winRate: number;
  winRateDelta: number;
  profit: number;
  profitDelta: number;
  roi: number;
  roiDelta: number;
  wonBets: number;
  lostBets: number;
  voidBets: number;
}

interface HistoryStatsProps {
  stats: StatsData;
}

export function HistoryStats(_props: HistoryStatsProps) {
  return null;
}
