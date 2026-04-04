import type { Variants } from "framer-motion";

// ============================================================================
// TYPES
// ============================================================================

export type BankrollMode = "auto" | "manual";

export type BetResult = "win" | "loss" | "pending";

export interface Bet {
  id: string;
  match: string;
  date: string;
  type: string;
  aiOdds: number;
  units: number;
  result: BetResult;
  isTracked: boolean;
}

export interface Streak {
  type: "W" | "L";
  count: number;
}

export interface BankrollKpi {
  initialBankroll: number;
  currentBankroll: number;
  profitLoss: number;
  roi: number;
  betsTracked: number;
  streak: Streak;
}

export interface CurvePoint {
  date: string;
  bankroll: number;
  pnl: number;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_BETS: Bet[] = [
  {
    id: "b1",
    match: "Sinner vs Medvedev",
    date: "2025-11-01",
    type: "1N2",
    aiOdds: 1.95,
    units: 3,
    result: "win",
    isTracked: true,
  },
  {
    id: "b2",
    match: "Alcaraz vs Zverev",
    date: "2025-11-02",
    type: "1N2",
    aiOdds: 2.15,
    units: 2,
    result: "win",
    isTracked: true,
  },
  {
    id: "b3",
    match: "Fritz vs Dimitrov",
    date: "2025-11-03",
    type: "1N2",
    aiOdds: 1.75,
    units: 2,
    result: "loss",
    isTracked: true,
  },
  {
    id: "b4",
    match: "Rune vs Ruud",
    date: "2025-11-05",
    type: "1N2",
    aiOdds: 2.40,
    units: 1,
    result: "win",
    isTracked: true,
  },
  {
    id: "b5",
    match: "Sinner vs Alcaraz",
    date: "2025-11-07",
    type: "1N2",
    aiOdds: 1.85,
    units: 3,
    result: "win",
    isTracked: true,
  },
  {
    id: "b6",
    match: "Medvedev vs Rublev",
    date: "2025-11-08",
    type: "1N2",
    aiOdds: 1.65,
    units: 2,
    result: "pending",
    isTracked: true,
  },
  {
    id: "b7",
    match: "Zverev vs Tsitsipas",
    date: "2025-11-10",
    type: "1N2",
    aiOdds: 2.30,
    units: 1,
    result: "loss",
    isTracked: true,
  },
  {
    id: "b8",
    match: "Fritz vs Paul",
    date: "2025-11-11",
    type: "1N2",
    aiOdds: 1.90,
    units: 2,
    result: "win",
    isTracked: false,
  },
  {
    id: "b9",
    match: "Dimitrov vs Shelton",
    date: "2025-11-12",
    type: "1N2",
    aiOdds: 1.72,
    units: 2,
    result: "win",
    isTracked: false,
  },
  {
    id: "b10",
    match: "Rune vs De Minaur",
    date: "2025-11-14",
    type: "1N2",
    aiOdds: 2.05,
    units: 2,
    result: "win",
    isTracked: true,
  },
  {
    id: "b11",
    match: "Ruud vs Hurkacz",
    date: "2025-11-15",
    type: "1N2",
    aiOdds: 1.95,
    units: 3,
    result: "pending",
    isTracked: true,
  },
  {
    id: "b12",
    match: "Alcaraz vs Djokovic",
    date: "2025-11-16",
    type: "1N2",
    aiOdds: 2.50,
    units: 1,
    result: "win",
    isTracked: true,
  },
  {
    id: "b13",
    match: "Sinner vs Tsitsipas",
    date: "2025-11-18",
    type: "1N2",
    aiOdds: 1.68,
    units: 3,
    result: "loss",
    isTracked: true,
  },
  {
    id: "b14",
    match: "Medvedev vs Humbert",
    date: "2025-11-19",
    type: "1N2",
    aiOdds: 1.82,
    units: 2,
    result: "win",
    isTracked: true,
  },
  {
    id: "b15",
    match: "Zverev vs Fritz",
    date: "2025-11-21",
    type: "1N2",
    aiOdds: 1.78,
    units: 2,
    result: "win",
    isTracked: true,
  },
  {
    id: "b16",
    match: "Rublev vs Paul",
    date: "2025-11-22",
    type: "1N2",
    aiOdds: 2.10,
    units: 1,
    result: "pending",
    isTracked: false,
  },
  {
    id: "b17",
    match: "Dimitrov vs Rune",
    date: "2025-11-23",
    type: "1N2",
    aiOdds: 1.95,
    units: 2,
    result: "win",
    isTracked: true,
  },
  {
    id: "b18",
    match: "Hurkacz vs Shelton",
    date: "2025-11-24",
    type: "1N2",
    aiOdds: 2.25,
    units: 1,
    result: "loss",
    isTracked: true,
  },
  {
    id: "b19",
    match: "De Minaur vs Thompson",
    date: "2025-11-26",
    type: "1N2",
    aiOdds: 1.70,
    units: 3,
    result: "win",
    isTracked: true,
  },
  {
    id: "b20",
    match: "Alcaraz vs Sinner",
    date: "2025-11-27",
    type: "1N2",
    aiOdds: 2.80,
    units: 1,
    result: "win",
    isTracked: true,
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get tracked bets based on mode and selected bet IDs
 */
export function getTrackedBets(
  bets: Bet[],
  mode: BankrollMode,
  selectedBetIds: Set<string>
): Bet[] {
  const completedBets = bets.filter((b) => b.result !== "pending");

  if (mode === "auto") {
    return completedBets.filter((b) => b.isTracked);
  }

  return completedBets.filter((b) => selectedBetIds.has(b.id));
}

/**
 * Calculate bankroll KPIs based on tracked bets
 */
export function calculateKpis(
  bets: Bet[],
  initialBankroll: number,
  mode: BankrollMode,
  selectedBetIds: Set<string>
): BankrollKpi {
  const trackedBets = getTrackedBets(bets, mode, selectedBetIds);

  // Calculate profit/loss
  let profitLoss = 0;
  const results: ("W" | "L")[] = [];

  for (const bet of trackedBets) {
    if (bet.result === "win") {
      profitLoss += (bet.aiOdds - 1) * bet.units;
      results.push("W");
    } else if (bet.result === "loss") {
      profitLoss -= bet.units;
      results.push("L");
    }
  }

  const currentBankroll = initialBankroll + profitLoss;

  // Calculate ROI based on total staked
  const totalStaked = trackedBets.reduce((sum, b) => sum + b.units, 0);
  const roi = totalStaked > 0 ? (profitLoss / totalStaked) * 100 : 0;

  // Calculate streak
  let streak: Streak = { type: "W", count: 0 };

  if (results.length > 0) {
    const lastResult = results[results.length - 1];
    streak = { type: lastResult, count: 1 };

    // Count consecutive results from the end
    for (let i = results.length - 2; i >= 0; i--) {
      if (results[i] === lastResult) {
        streak.count++;
      } else {
        break;
      }
    }
  }

  return {
    initialBankroll,
    currentBankroll,
    profitLoss,
    roi,
    betsTracked: trackedBets.length,
    streak,
  };
}

/**
 * Generate curve data points for the bankroll chart
 */
export function generateCurveData(
  bets: Bet[],
  initialBankroll: number
): CurvePoint[] {
  // Sort bets by date
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const points: CurvePoint[] = [];
  let currentBankroll = initialBankroll;

  // Add starting point
  if (sortedBets.length > 0) {
    const firstBetDate = new Date(sortedBets[0].date);
    // Start from beginning of the month of the first bet
    const startDate = new Date(firstBetDate.getFullYear(), firstBetDate.getMonth(), 1);
    points.push({
      date: startDate.toISOString().split("T")[0],
      bankroll: initialBankroll,
      pnl: 0,
    });
  }

  // Add point for each completed bet
  for (const bet of sortedBets) {
    if (bet.result === "win") {
      currentBankroll += (bet.aiOdds - 1) * bet.units;
    } else if (bet.result === "loss") {
      currentBankroll -= bet.units;
    }

    const pnl = currentBankroll - initialBankroll;

    points.push({
      date: bet.date,
      bankroll: Math.round(currentBankroll * 100) / 100,
      pnl: Math.round(pnl * 100) / 100,
    });
  }

  return points;
}
