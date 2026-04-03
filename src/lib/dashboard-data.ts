// Navigation items for sidebar
export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", icon: "LayoutDashboard" },
  { href: "/dashboard/bets", label: "Mes paris", icon: "Trophy" },
  { href: "/dashboard/bankroll", label: "Bankroll", icon: "Wallet" },
  { href: "/dashboard/history", label: "Historique", icon: "ScrollText" },
  { href: "/dashboard/analytics", label: "Analyses", icon: "BarChart3" },
  { href: "/dashboard/settings", label: "Paramètres", icon: "Settings" },
];

// User data
export interface User {
  name: string;
  email: string;
  plan: string;
  initials: string;
}

export const USER: User = {
  name: "Thomas Martin",
  email: "thomas.martin@gmail.com",
  plan: "Pro",
  initials: "TM",
};

// KPI Data
export interface KpiData {
  roi: number;
  winRate: number;
  profit: number;
  streak: number;
}

export const KPI_DATA: KpiData = {
  roi: 31.5,
  winRate: 68.2,
  profit: 2847.5,
  streak: 7,
};

// ROI Colors
export const ROI_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  green: {
    bg: "bg-green-500/15 text-green-400",
    text: "text-green-400",
    dot: "bg-green-500",
  },
  yellow: {
    bg: "bg-yellow-500/15 text-yellow-400",
    text: "text-yellow-400",
    dot: "bg-yellow-500",
  },
  orange: {
    bg: "bg-orange-500/15 text-orange-400",
    text: "text-orange-400",
    dot: "bg-orange-500",
  },
  red: {
    bg: "bg-red-500/15 text-red-400",
    text: "text-red-400",
    dot: "bg-red-500",
  },
};

// Status Colors
export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  won: {
    bg: "bg-green-500/15",
    text: "text-green-400",
  },
  lost: {
    bg: "bg-red-500/15",
    text: "text-red-400",
  },
  pending: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
  },
  void: {
    bg: "bg-zinc-500/15",
    text: "text-zinc-400",
  },
};

// Time Range types and constants
export type TimeRange = "7D" | "30D" | "90D" | "ALL";

export interface TimeRangeOption {
  value: TimeRange;
  label: string;
}

export const TIME_RANGES: TimeRangeOption[] = [
  { value: "7D", label: "7 jours" },
  { value: "30D", label: "30 jours" },
  { value: "90D", label: "90 jours" },
  { value: "ALL", label: "Tout" },
];

// Helper function to check if a date is within the time range
export function isInRange(date: Date, range: TimeRange): boolean {
  if (range === "ALL") return true;

  const now = new Date();
  const ranges: Record<Exclude<TimeRange, "ALL">, number> = {
    "7D": 7,
    "30D": 30,
    "90D": 90,
  };

  const days = ranges[range];
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  return date >= cutoffDate;
}

// Active Bets
export type BetStatus = "pending" | "won" | "lost" | "void";
export type RoiLabel = "green" | "yellow" | "orange" | "red";

export interface Bet {
  id: string;
  player: string;
  opponent: string;
  tournament: string;
  surface: string;
  odds: number;
  breakEven: number;
  units: number;
  roiLabel: RoiLabel;
  edge: number;
  status: BetStatus;
}

export const ACTIVE_BETS: Bet[] = [
  {
    id: "1",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 1.95,
    breakEven: 1.82,
    units: 3,
    roiLabel: "green",
    edge: 8.2,
    status: "pending",
  },
  {
    id: "2",
    player: "Carlos Alcaraz",
    opponent: "Alexander Zverev",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 2.15,
    breakEven: 1.95,
    units: 2,
    roiLabel: "yellow",
    edge: 5.4,
    status: "pending",
  },
  {
    id: "3",
    player: "Taylor Fritz",
    opponent: "Grigor Dimitrov",
    tournament: "Davis Cup",
    surface: "Hard",
    odds: 1.75,
    breakEven: 1.68,
    units: 2,
    roiLabel: "orange",
    edge: 3.8,
    status: "pending",
  },
  {
    id: "4",
    player: "Holger Rune",
    opponent: "Casper Ruud",
    tournament: "Davis Cup",
    surface: "Clay",
    odds: 2.40,
    breakEven: 2.15,
    units: 1,
    roiLabel: "red",
    edge: 1.9,
    status: "pending",
  },
];

// Value of the Day
export interface ValueOfTheDayItem {
  id: string;
  playerName: string;
  tournament: string;
  surface: string;
  odds: number;
  estimatedProbability: number;
  units: number;
  edge: number;
  roiLabel: RoiLabel;
}

export const VALUE_OF_THE_DAY: ValueOfTheDayItem[] = [
  {
    id: "v1",
    playerName: "Jannik Sinner",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 2.10,
    estimatedProbability: 52,
    units: 3,
    edge: 8.2,
    roiLabel: "green",
  },
  {
    id: "v2",
    playerName: "Carlos Alcaraz",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 1.95,
    estimatedProbability: 55,
    units: 2,
    edge: 5.4,
    roiLabel: "yellow",
  },
  {
    id: "v3",
    playerName: "Taylor Fritz",
    tournament: "Davis Cup",
    surface: "Hard",
    odds: 1.75,
    estimatedProbability: 60,
    units: 2,
    edge: 3.8,
    roiLabel: "orange",
  },
  {
    id: "v4",
    playerName: "Daniil Medvedev",
    tournament: "ATP Finals",
    surface: "Hard",
    odds: 2.45,
    estimatedProbability: 44,
    units: 1,
    edge: 2.1,
    roiLabel: "red",
  },
];

// Bankroll History
export interface BankrollPoint {
  date: string;
  bankroll: number;
  flatBet: number;
}

export const BANKROLL_HISTORY: BankrollPoint[] = [
  { date: "2025-01-01", bankroll: 1000, flatBet: 1000 },
  { date: "2025-01-15", bankroll: 1085, flatBet: 1025 },
  { date: "2025-02-01", bankroll: 1150, flatBet: 1048 },
  { date: "2025-02-15", bankroll: 1235, flatBet: 1072 },
  { date: "2025-03-01", bankroll: 1298, flatBet: 1095 },
  { date: "2025-03-15", bankroll: 1415, flatBet: 1118 },
  { date: "2025-04-01", bankroll: 1487, flatBet: 1142 },
  { date: "2025-04-15", bankroll: 1565, flatBet: 1165 },
];

// Bet History
export type Surface = "clay" | "hard" | "grass";

export interface BetHistoryItem {
  id: string;
  player: string;
  opponent: string;
  tournament: string;
  surface: Surface;
  odds: number;
  units: number;
  roiLabel: RoiLabel;
  status: "won" | "lost" | "void";
  profit: number;
  date: string;
}

export const TOURNAMENTS = [
  "Tous les tournois",
  "Miami Open",
  "Indian Wells",
  "Monte Carlo",
  "Roland Garros",
  "Wimbledon",
  "US Open",
  "ATP Finals",
  "Davis Cup",
];

export const BET_HISTORY: BetHistoryItem[] = [
  {
    id: "h1",
    player: "Jannik Sinner",
    opponent: "Daniil Medvedev",
    tournament: "Miami Open",
    surface: "hard",
    odds: 2.10,
    units: 3,
    roiLabel: "green",
    status: "won",
    profit: 6.30,
    date: "2025-03-28",
  },
  {
    id: "h2",
    player: "Carlos Alcaraz",
    opponent: "Grigor Dimitrov",
    tournament: "Miami Open",
    surface: "hard",
    odds: 1.85,
    units: 2,
    roiLabel: "yellow",
    status: "won",
    profit: 3.70,
    date: "2025-03-27",
  },
  {
    id: "h3",
    player: "Taylor Fritz",
    opponent: "Alexander Zverev",
    tournament: "Miami Open",
    surface: "hard",
    odds: 3.20,
    units: 1,
    roiLabel: "green",
    status: "lost",
    profit: -2.00,
    date: "2025-03-26",
  },
  {
    id: "h4",
    player: "Daniil Medvedev",
    opponent: "Casper Ruud",
    tournament: "Indian Wells",
    surface: "hard",
    odds: 1.95,
    units: 2,
    roiLabel: "yellow",
    status: "won",
    profit: 3.90,
    date: "2025-03-15",
  },
  {
    id: "h5",
    player: "Novak Djokovic",
    opponent: "Jannik Sinner",
    tournament: "Indian Wells",
    surface: "hard",
    odds: 2.25,
    units: 3,
    roiLabel: "green",
    status: "won",
    profit: 6.75,
    date: "2025-03-14",
  },
  {
    id: "h6",
    player: "Rafael Nadal",
    opponent: "Carlos Alcaraz",
    tournament: "Monte Carlo",
    surface: "clay",
    odds: 2.80,
    units: 2,
    roiLabel: "orange",
    status: "lost",
    profit: -4.00,
    date: "2025-04-10",
  },
  {
    id: "h7",
    player: "Stefanos Tsitsipas",
    opponent: "Holger Rune",
    tournament: "Monte Carlo",
    surface: "clay",
    odds: 1.65,
    units: 2,
    roiLabel: "yellow",
    status: "won",
    profit: 2.60,
    date: "2025-04-09",
  },
  {
    id: "h8",
    player: "Andrey Rublev",
    opponent: "Alex de Minaur",
    tournament: "Monte Carlo",
    surface: "clay",
    odds: 1.75,
    units: 1,
    roiLabel: "red",
    status: "void",
    profit: 0,
    date: "2025-04-08",
  },
  {
    id: "h9",
    player: "Jannik Sinner",
    opponent: "Taylor Fritz",
    tournament: "Wimbledon",
    surface: "grass",
    odds: 1.90,
    units: 3,
    roiLabel: "green",
    status: "won",
    profit: 5.70,
    date: "2025-07-10",
  },
  {
    id: "h10",
    player: "Carlos Alcaraz",
    opponent: "Novak Djokovic",
    tournament: "Wimbledon",
    surface: "grass",
    odds: 2.50,
    units: 2,
    roiLabel: "yellow",
    status: "won",
    profit: 5.00,
    date: "2025-07-09",
  },
];

// Surface Stats
export interface SurfaceStats {
  surface: Surface;
  label: string;
  totalBets: number;
  wonBets: number;
  roi: number;
}

export const SURFACE_STATS: SurfaceStats[] = [
  {
    surface: "clay",
    label: "Terre battue",
    totalBets: 156,
    wonBets: 102,
    roi: 28.5,
  },
  {
    surface: "hard",
    label: "Dur",
    totalBets: 234,
    wonBets: 161,
    roi: 34.2,
  },
  {
    surface: "grass",
    label: "Gazon",
    totalBets: 42,
    wonBets: 29,
    roi: 22.8,
  },
];

// Filters
export interface BetHistoryFilters {
  tournament?: string;
  surface?: Surface;
  roiLabel?: RoiLabel;
}
