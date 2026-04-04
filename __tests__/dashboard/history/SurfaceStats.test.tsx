import type { BetHistoryItem, SurfaceStats as SurfaceStatsType, TimeRange } from "@/lib/dashboard-data";

describe("calculateSurfaceStatsFromBets", () => {
  let calculateSurfaceStatsFromBets: (bets: BetHistoryItem[], timeRange: TimeRange) => SurfaceStatsType[];

  beforeEach(async () => {
    jest.resetModules();
    const module = await import("@/components/dashboard/history/SurfaceStats");
    calculateSurfaceStatsFromBets = (module as unknown as { calculateSurfaceStatsFromBets: typeof calculateSurfaceStatsFromBets }).calculateSurfaceStatsFromBets;
  });

  const createBet = (overrides: Partial<BetHistoryItem> = {}): BetHistoryItem => ({
    id: "h1",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "Miami Open",
    surface: "hard",
    odds: 2.10,
    units: 2,
    roiLabel: "green",
    status: "won",
    profit: 4.20,
    date: "2025-03-28",
    ...overrides,
  });;;;;;;;;
});
