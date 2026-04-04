"use client";

import type { Variants } from "framer-motion";

// ============================================
// BANKROLL MODES
// ============================================
export type BankrollMode = "auto" | "custom";

// ============================================
// ANIMATIONS
// ============================================
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ============================================
// BANKROLL DATA TYPES
// ============================================
export interface BankrollKpi {
  currentBankroll: number;
  initialBankroll: number;
  profitLoss: number;
  betsTracked: number;
  roi: number;
  streak: {
    count: number;
    type: "W" | "L";
  };
}

export interface CurvePoint {
  date: string;
  bankroll: number;
  pnl: number;
}

export interface TrackedBet {
  id: string;
  date: string;
  player: string;
  opponent: string;
  tournament: string;
  surface: string;
  odds: number;
  stake: number;
  result: "won" | "lost" | "pending";
  pnl: number;
  isTracked: boolean;
}

// ============================================
// MOCK DATA
// ============================================
export const MOCK_BETS: TrackedBet[] = [
  {
    id: "b1",
    date: "2025-03-15",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "Indian Wells",
    surface: "Hard",
    odds: 2.10,
    stake: 3,
    result: "won",
    pnl: 6.30,
    isTracked: true,
  },
  {
    id: "b2",
    date: "2025-03-16",
    player: "Carlos Alcaraz",
    opponent: "Grigor Dimitrov",
    tournament: "Indian Wells",
    surface: "Hard",
    odds: 1.85,
    stake: 2,
    result: "won",
    pnl: 3.70,
    isTracked: true,
  },
  {
    id: "b3",
    date: "2025-03-17",
    player: "Taylor Fritz",
    opponent: "Alexander Zverev",
    tournament: "Indian Wells",
    surface: "Hard",
    odds: 3.20,
    stake: 1,
    result: "lost",
    pnl: -2.00,
    isTracked: true,
  },
  {
    id: "b4",
    date: "2025-03-18",
    player: "Daniil Medvedev",
    opponent: "Casper Ruud",
    tournament: "Miami Open",
    surface: "Hard",
    odds: 1.95,
    stake: 2,
    result: "won",
    pnl: 3.90,
    isTracked: false,
  },
  {
    id: "b5",
    date: "2025-03-19",
    player: "Novak Djokovic",
    opponent: "Jannik Sinner",
    tournament: "Miami Open",
    surface: "Hard",
    odds: 2.25,
    stake: 3,
    result: "won",
    pnl: 6.75,
    isTracked: false,
  },
  {
    id: "b6",
    date: "2025-03-20",
    player: "Rafael Nadal",
    opponent: "Carlos Alcaraz",
    tournament: "Miami Open",
    surface: "Hard",
    odds: 2.80,
    stake: 2,
    result: "lost",
    pnl: -4.00,
    isTracked: false,
  },
  {
    id: "b7",
    date: "2025-03-21",
    player: "Stefanos Tsitsipas",
    opponent: "Holger Rune",
    tournament: "Miami Open",
    surface: "Hard",
    odds: 1.65,
    stake: 2,
    result: "won",
    pnl: 2.60,
    isTracked: false,
  },
  {
    id: "b8",
    date: "2025-03-22",
    player: "Andrey Rublev",
    opponent: "Alex de Minaur",
    tournament: "Miami Open",
    surface: "Hard",
    odds: 1.75,
    stake: 1,
    result: "pending",
    pnl: 0,
    isTracked: false,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getTrackedBets(
  bets: TrackedBet[],
  mode: BankrollMode,
  selectedBetIds: Set<string>
): TrackedBet[] {
  if (mode === "auto") {
    return bets.filter((bet) => bet.isTracked);
  }
  return bets.filter((bet) => selectedBetIds.has(bet.id));
}

export function generateCurveData(
  bets: TrackedBet[],
  initialBankroll: number
): CurvePoint[] {
  if (bets.length === 0) {
    return [{ date: new Date().toISOString().split("T")[0], bankroll: initialBankroll, pnl: 0 }];
  }

  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const points: CurvePoint[] = [{ date: sortedBets[0].date, bankroll: initialBankroll, pnl: 0 }];

  let currentBankroll = initialBankroll;

  for (const bet of sortedBets) {
    if (bet.result !== "pending") {
      currentBankroll += bet.pnl;
      points.push({
        date: bet.date,
        bankroll: currentBankroll,
        pnl: currentBankroll - initialBankroll,
      });
    }
  }

  return points;
}

export function calculateKpis(
  bets: TrackedBet[],
  initialBankroll: number,
  mode: BankrollMode,
  selectedBetIds: Set<string>
): BankrollKpi {
  const trackedBets = getTrackedBets(bets, mode, selectedBetIds);
  const settledBets = trackedBets.filter((b) => b.result !== "pending");

  const totalPnl = settledBets.reduce((sum, b) => sum + b.pnl, 0);
  const currentBankroll = initialBankroll + totalPnl;
  const profitLoss = totalPnl;

  const wonBets = settledBets.filter((b) => b.result === "won").length;
  const totalBets = settledBets.length;
  const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;
  const avgOdds = totalBets > 0
    ? settledBets.reduce((sum, b) => sum + b.odds, 0) / totalBets
    : 0;
  const roi = avgOdds > 0 && totalBets > 0
    ? ((avgOdds - 1) * winRate / 100) * 100
    : 0;

  // Calculate streak
  const reversedBets = [...settledBets].reverse();
  let streakCount = 0;
  let streakType: "W" | "L" = "W";
  
  if (reversedBets.length > 0) {
    streakType = reversedBets[0].result === "won" ? "W" : "L";
    for (const bet of reversedBets) {
      if (
        (streakType === "W" && bet.result === "won") ||
        (streakType === "L" && bet.result === "lost")
      ) {
        streakCount++;
      } else {
        break;
      }
    }
  }

  return {
    currentBankroll,
    initialBankroll,
    profitLoss,
    betsTracked: settledBets.length,
    roi,
    streak: {
      count: streakCount,
      type: streakType,
    },
  };
}
