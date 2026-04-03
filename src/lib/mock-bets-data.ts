import type { BankrollBet, UserBetSelection } from "@/types/bankroll";

/**
 * Default initial bankroll value
 */
export const DEFAULT_INITIAL_BANKROLL = 1000;

/**
 * Mock bets data for the bankroll tracker
 */
export const MOCK_BETS: BankrollBet[] = [
  {
    id: "b1",
    date: "2025-01-15",
    sport: "Tennis",
    match: "Sinner vs Medvedev",
    recommendedOdds: 2.10,
    units: 3,
    result: "win",
    profitLoss: 3.30
  },
  {
    id: "b2",
    date: "2025-01-18",
    sport: "Tennis",
    match: "Alcaraz vs Zverev",
    recommendedOdds: 1.95,
    units: 2,
    result: "win",
    profitLoss: 1.90
  },
  {
    id: "b3",
    date: "2025-01-22",
    sport: "Tennis",
    match: "Fritz vs Dimitrov",
    recommendedOdds: 2.40,
    units: 1,
    result: "loss",
    profitLoss: -1.00
  },
  {
    id: "b4",
    date: "2025-01-25",
    sport: "Tennis",
    match: "Ruud vs Rune",
    recommendedOdds: 1.85,
    units: 3,
    result: "win",
    profitLoss: 2.55
  },
  {
    id: "b5",
    date: "2025-02-01",
    sport: "Tennis",
    match: "Djokovic vs Alcaraz",
    recommendedOdds: 2.25,
    units: 2,
    result: "win",
    profitLoss: 2.50
  },
  {
    id: "b6",
    date: "2025-02-05",
    sport: "Tennis",
    match: "Medvedev vs Rublev",
    recommendedOdds: 1.75,
    units: 2,
    result: "win",
    profitLoss: 1.50
  },
  {
    id: "b7",
    date: "2025-02-10",
    sport: "Tennis",
    match: "Tsitsipas vs De Minaur",
    recommendedOdds: 2.05,
    units: 1,
    result: "loss",
    profitLoss: -1.00
  },
  {
    id: "b8",
    date: "2025-02-15",
    sport: "Tennis",
    match: "Sinner vs FAA",
    recommendedOdds: 1.90,
    units: 3,
    result: "win",
    profitLoss: 2.70
  },
  {
    id: "b9",
    date: "2025-02-20",
    sport: "Basketball",
    match: "Lakers vs Celtics",
    recommendedOdds: 2.20,
    units: 2,
    result: "pending",
    profitLoss: 0
  },
  {
    id: "b10",
    date: "2025-02-22",
    sport: "Tennis",
    match: "Alcaraz vs Draper",
    recommendedOdds: 1.65,
    units: 2,
    result: "win",
    profitLoss: 1.30
  }
];

/**
 * Get default selections for all mock bets (all selected with default odds)
 */
export function getDefaultSelections(bets: BankrollBet[]): UserBetSelection[] {
  return bets.map(bet => ({
    betId: bet.id,
    selected: true,
    actualOdds: bet.recommendedOdds
  }));
}
