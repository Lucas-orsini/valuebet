import type { BetHistoryItem } from './dashboard-data';
import type { FilterState } from '@/components/dashboard/history/HistoryFilters';

export function filterBets(bets: BetHistoryItem[], filters: FilterState): BetHistoryItem[] {
  return bets.filter((bet) => {
    // logique de filtrage existante (search, tournament, surface, roi, dateRange)
  });
}

export function calculateStats(bets: BetHistoryItem[]) {
  // logique de calcul (totalBets, winRate, profit, roi, etc.)
}

export function prepareChartData(bets: BetHistoryItem[]): ChartDataPoint[] {
  // logique de transformation (tri, cumul)
}
