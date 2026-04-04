import type { Variants } from "framer-motion";

// Bankroll Mode type
export type BankrollMode = "auto" | "custom";
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
// Animation variants
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

// Bankroll KPI type
export interface BankrollKpi {
  currentBankroll: number;
  initialBankroll: number;
  profitLoss: number;
  roi: number;
  betsTracked: number;
  streak: {
    type: "W" | "L";
    count: number;
  };
}

// Mock bet type for tracking
export interface MockBet {
  id: string;
  player: string;
  opponent: string;
  tournament: string;
  date: string;
  odds: number;
  result?: "W" | "L" | "P";
  isTracked: boolean;
  edge: number;
  units: number;
  pnl?: number;
}

// Mock bets data
export const MOCK_BETS: MockBet[] = [
  {
    id: "1",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "Miami Open",
    date: "2025-03-28",
    odds: 2.10,
    result: "W",
    isTracked: true,
    edge: 8.2,
    units: 3,
    pnl: 6.30,
  },
  {
    id: "2",
    player: "Carlos Alcaraz",
    opponent: "Grigor Dimitrov",
    tournament: "Miami Open",
    date: "2025-03-27",
    odds: 1.85,
    result: "W",
    isTracked: true,
    edge: 5.4,
    units: 2,
    pnl: 3.70,
  },
  {
    id: "3",
    player: "Taylor Fritz",
    opponent: "Alexander Zverev",
    tournament: "Miami Open",
    date: "2025-03-26",
    odds: 3.20,
    result: "L",
    isTracked: true,
    edge: 12.5,
    units: 1,
    pnl: -2.00,
  },
  {
    id: "4",
    player: "Daniil Medvedev",
    opponent: "Casper Ruud",
    tournament: "Indian Wells",
    date: "2025-03-15",
    odds: 1.95,
    result: "W",
    isTracked: true,
    edge: 6.8,
    units: 2,
    pnl: 3.90,
  },
  {
    id: "5",
    player: "Novak Djokovic",
    opponent: "Jannik Sinner",
    tournament: "Indian Wells",
    date: "2025-03-14",
    odds: 2.25,
    result: "W",
    isTracked: true,
    edge: 9.1,
    units: 3,
    pnl: 6.75,
  },
  {
    id: "6",
    player: "Rafael Nadal",
    opponent: "Carlos Alcaraz",
    tournament: "Monte Carlo",
    date: "2025-04-10",
    odds: 2.80,
    result: "L",
    isTracked: true,
    edge: 4.2,
    units: 2,
    pnl: -4.00,
  },
  {
    id: "7",
    player: "Stefanos Tsitsipas",
    opponent: "Holger Rune",
    tournament: "Monte Carlo",
    date: "2025-04-09",
    odds: 1.65,
    result: "W",
    isTracked: true,
    edge: 3.8,
    units: 2,
    pnl: 2.60,
  },
  {
    id: "8",
    player: "Andrey Rublev",
    opponent: "Alex de Minaur",
    tournament: "Monte Carlo",
    date: "2025-04-08",
    odds: 1.75,
    result: "P",
    isTracked: true,
    edge: 2.1,
    units: 1,
    pnl: 0,
  },
  {
    id: "9",
    player: "Jannik Sinner",
    opponent: "Taylor Fritz",
    tournament: "Wimbledon",
    date: "2025-07-10",
    odds: 1.90,
    result: "W",
    isTracked: false,
    edge: 7.5,
    units: 3,
    pnl: 5.70,
  },
  {
    id: "10",
    player: "Carlos Alcaraz",
    opponent: "Novak Djokovic",
    tournament: "Wimbledon",
    date: "2025-07-09",
    odds: 2.50,
    result: "W",
    isTracked: false,
    edge: 8.9,
    units: 2,
    pnl: 5.00,
  },
];

// Curve data point type
export interface CurvePoint {
  date: string;
  bankroll: number;
  pnl: number;
}

// Get tracked bets based on mode
export function getTrackedBets(
  bets: MockBet[],
  mode: BankrollMode,
  selectedBetIds: Set<string>
): MockBet[] {
  if (mode === "auto") {
    return bets.filter((bet) => bet.isTracked);
  }
  return bets.filter((bet) => selectedBetIds.has(bet.id));
}

// Generate curve data from bets
export function generateCurveData(
  bets: MockBet[],
  initialBankroll: number
): CurvePoint[] {
  if (bets.length === 0) {
    return [{ date: new Date().toISOString().split("T")[0], bankroll: initialBankroll, pnl: 0 }];
  }

  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let currentBankroll = initialBankroll;
  return sortedBets.map((bet) => {
    if (bet.pnl !== undefined) {
      currentBankroll += bet.pnl;
    }
    return {
      date: bet.date,
      bankroll: currentBankroll,
      pnl: currentBankroll - initialBankroll,
    };
  });
}

// Calculate KPIs from bets
export function calculateKpis(
  bets: MockBet[],
  initialBankroll: number,
  mode: BankrollMode,
  selectedBetIds: Set<string>
): BankrollKpi {
  const trackedBets = getTrackedBets(bets, mode, selectedBetIds);
  const settledBets = trackedBets.filter((bet) => bet.result !== "P");

  let currentBankroll = initialBankroll;
  let totalPnL = 0;
  let wins = 0;
  let losses = 0;

  settledBets.forEach((bet) => {
    if (bet.pnl !== undefined) {
      totalPnL += bet.pnl;
      currentBankroll += bet.pnl;
      if (bet.pnl > 0) wins++;
      else if (bet.pnl < 0) losses++;
    }
  });

  const totalBets = wins + losses;
  const winRate = totalBets > 0 ? (wins / totalBets) * 100 : 0;
  const roi = initialBankroll > 0 ? (totalPnL / initialBankroll) * 100 : 0;

  // Calculate streak
  let streakCount = 0;
  let streakType: "W" | "L" = "W";
  for (let i = settledBets.length - 1; i >= 0; i--) {
    const bet = settledBets[i];
    if (bet.pnl === undefined) continue;

    if (bet.pnl > 0) {
      if (streakType === "W") streakCount++;
      else break;
    } else if (bet.pnl < 0) {
      if (streakType === "L") streakCount++;
      else {
        streakType = "L";
        streakCount = 1;
      }
    }
  }

  return {
    currentBankroll,
    initialBankroll,
    profitLoss: totalPnL,
    roi,
    betsTracked: trackedBets.length,
    streak: {
      type: streakType,
      count: streakCount,
    },
  };
}
