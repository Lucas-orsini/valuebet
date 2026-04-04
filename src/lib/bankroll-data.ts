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

// Curve data for the bankroll chart
export const BANKROLL_CURVE_DATA: CurvePoint[] = [
  { date: "2025-01-01", bankroll: 500, pnl: 0 },
  { date: "2025-01-08", bankroll: 515, pnl: 15 },
  { date: "2025-01-15", bankroll: 530, pnl: 30 },
  { date: "2025-01-22", bankroll: 522, pnl: 22 },
  { date: "2025-01-29", bankroll: 538, pnl: 38 },
  { date: "2025-02-05", bankroll: 555, pnl: 55 },
  { date: "2025-02-12", bankroll: 548, pnl: 48 },
  { date: "2025-02-19", bankroll: 562, pnl: 62 },
  { date: "2025-02-26", bankroll: 580, pnl: 80 },
  { date: "2025-03-05", bankroll: 572, pnl: 72 },
  { date: "2025-03-12", bankroll: 595, pnl: 95 },
  { date: "2025-03-19", bankroll: 612, pnl: 112 },
  { date: "2025-03-26", bankroll: 598, pnl: 98 },
  { date: "2025-04-02", bankroll: 615, pnl: 115 },
  { date: "2025-04-09", bankroll: 635, pnl: 135 },
  { date: "2025-04-16", bankroll: 650, pnl: 150 },
];

// Transform MOCK_BETS to Bet[] for BetsTrackingTable
export const MOCK_BETS_TRACKING: Bet[] = MOCK_BETS.map((bet) => ({
  id: bet.id,
  match: `${bet.player} vs ${bet.opponent}`,
  type: bet.tournament,
  date: bet.date,
  aiOdds: bet.odds,
  units: bet.units,
  result: bet.result === "W" ? "win" : bet.result === "L" ? "loss" : "pending",
  isTracked: bet.isTracked,
}));
