import type { Variants } from "framer-motion";

// Bankroll Mode
export type BankrollMode = "auto" | "custom";

// Bet types
export interface BankrollBet {
  id: string;
  player: string;
  opponent: string;
  tournament: string;
  surface: string;
  odds: number;
  units: number;
  roiLabel: "green" | "yellow" | "orange" | "red";
  status: "pending" | "won" | "lost" | "void";
  profit: number;
  date: string;
  isTracked?: boolean;
}

// Mock bets for demonstration
export const MOCK_BETS: BankrollBet[] = [
  {
    id: "b1",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 1.95,
    units: 3,
    roiLabel: "green",
    status: "won",
    profit: 5.85,
    date: "2025-03-28",
    isTracked: true,
  },
  {
    id: "b2",
    player: "Carlos Alcaraz",
    opponent: "Alexander Zverev",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 2.15,
    units: 2,
    roiLabel: "yellow",
    status: "won",
    profit: 3.70,
    date: "2025-03-27",
    isTracked: true,
  },
  {
    id: "b3",
    player: "Taylor Fritz",
    opponent: "Grigor Dimitrov",
    tournament: "Davis Cup",
    surface: "Hard",
    odds: 1.75,
    units: 2,
    roiLabel: "orange",
    status: "lost",
    profit: -4.00,
    date: "2025-03-26",
    isTracked: false,
  },
  {
    id: "b4",
    player: "Holger Rune",
    opponent: "Casper Ruud",
    tournament: "Monte Carlo",
    surface: "Clay",
    odds: 2.40,
    units: 1,
    roiLabel: "red",
    status: "pending",
    profit: 0,
    date: "2025-04-10",
    isTracked: true,
  },
  {
    id: "b5",
    player: "Rafael Nadal",
    opponent: "Carlos Alcaraz",
    tournament: "Roland Garros",
    surface: "Clay",
    odds: 2.80,
    units: 2,
    roiLabel: "orange",
    status: "won",
    profit: 4.60,
    date: "2025-05-28",
    isTracked: true,
  },
  {
    id: "b6",
    player: "Stefanos Tsitsipas",
    opponent: "Novak Djokovic",
    tournament: "Wimbledon",
    surface: "Grass",
    odds: 3.20,
    units: 1,
    roiLabel: "green",
    status: "won",
    profit: 3.20,
    date: "2025-07-05",
    isTracked: false,
  },
];

// Streak interface
export interface BankrollStreak {
  count: number;
  type: "W" | "L";
}

// Bankroll KPI interface
export interface BankrollKpi {
  currentBankroll: number;
  initialBankroll: number;
  profitLoss: number;
  roi: number;
  betsTracked: number;
  streak: BankrollStreak;
}

// Curve point interface
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

// Calculate KPIs based on bets, mode, and selected bets
export function calculateKpis(
  bets: BankrollBet[],
  initialBankroll: number,
  mode: BankrollMode,
  selectedBetIds: Set<string>
): BankrollKpi {
  // Filter bets based on mode
  const trackedBets = getTrackedBets(bets, mode, selectedBetIds);
  
  // Calculate profit/loss from tracked bets
  const profitLoss = trackedBets.reduce((sum, bet) => sum + bet.profit, 0);
  
  // Calculate current bankroll
  const currentBankroll = initialBankroll + profitLoss;
  
  // Calculate total units staked
  const totalUnits = trackedBets.reduce((sum, bet) => sum + bet.units, 0);
  
  // Calculate ROI
  const roi = totalUnits > 0 ? (profitLoss / totalUnits) * 100 : 0;
  
  // Calculate streak
  const wonBets = trackedBets.filter((b) => b.status === "won").length;
  const lostBets = trackedBets.filter((b) => b.status === "lost").length;
  
  // Find current streak
  let streak: BankrollStreak = { count: 0, type: "W" };
  const settledBets = trackedBets.filter((b) => b.status !== "pending");
  
  if (settledBets.length > 0) {
    // Sort by date descending
    const sortedBets = [...settledBets].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const mostRecent = sortedBets[0];
    const streakType = mostRecent.status === "won" ? "W" : "L";
    
    let count = 1;
    for (let i = 1; i < sortedBets.length; i++) {
      if (
        (streakType === "W" && sortedBets[i].status === "won") ||
        (streakType === "L" && sortedBets[i].status === "lost")
      ) {
        count++;
      } else {
        break;
      }
    }
    
    streak = { count, type: streakType as "W" | "L" };
  }
  
  return {
    currentBankroll,
    initialBankroll,
    profitLoss,
    roi,
    betsTracked: trackedBets.length,
    streak,
  };
}

// Get tracked bets based on mode
export function getTrackedBets(
  bets: BankrollBet[],
  mode: BankrollMode,
  selectedBetIds: Set<string>
): BankrollBet[] {
  if (mode === "auto") {
    // In auto mode, track all bets marked as isTracked
    return bets.filter((b) => b.isTracked);
  } else {
    // In custom mode, only track selected bets
    return bets.filter((b) => selectedBetIds.has(b.id));
  }
}

// Generate curve data from bets
export function generateCurveData(
  bets: BankrollBet[],
  initialBankroll: number
): CurvePoint[] {
  if (bets.length === 0) {
    return [
      {
        date: new Date().toISOString().split("T")[0],
        bankroll: initialBankroll,
        pnl: 0,
      },
    ];
  }
  
  // Sort bets by date
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const curvePoints: CurvePoint[] = [];
  let currentBankroll = initialBankroll;
  
  // Add initial point
  curvePoints.push({
    date: sortedBets[0].date,
    bankroll: initialBankroll,
    pnl: 0,
  });
  
  // Process each bet
  for (const bet of sortedBets) {
    currentBankroll += bet.profit;
    curvePoints.push({
      date: bet.date,
      bankroll: currentBankroll,
      pnl: currentBankroll - initialBankroll,
    });
  }
  
  // Add current point if no bets or last bet is older than today
  const lastDate = sortedBets[sortedBets.length - 1]?.date;
  const today = new Date().toISOString().split("T")[0];
  
  if (!lastDate || lastDate < today) {
    curvePoints.push({
      date: today,
      bankroll: currentBankroll,
      pnl: currentBankroll - initialBankroll,
    });
  }
  
  return curvePoints;
}
