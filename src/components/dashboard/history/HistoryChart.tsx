"use client";

// This component was removed from the refactored history page.
// Exporting a stub to maintain compatibility with any remaining imports.

interface ChartData {
  date: string;
  profit: number;
  cumulative: number;
  label: string;
}

interface HistoryChartProps {
  data: ChartData[];
}

export function HistoryChart(_props: HistoryChartProps) {
  return null;
}
