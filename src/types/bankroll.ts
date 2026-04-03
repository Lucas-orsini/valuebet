/**
 * TypeScript types for Bankroll Tracker feature
 */

export type BankrollMode = 'auto' | 'custom';

export type BetResult = 'win' | 'loss' | 'pending';

export interface BankrollBet {
  id: string;
  date: string;
  sport: string;
  match: string;
  recommendedOdds: number;
  units: number;
  result: BetResult;
  profitLoss: number;
}

export interface BankrollDataPoint {
  date: string;
  bankroll: number;
  pnl: number;
}

export interface UserBetSelection {
  betId: string;
  selected: boolean;
  actualOdds: number;
}

export interface BankrollKPIs {
  currentBankroll: number;
  profitLoss: number;
  roi: number;
  currentStreak: number;
  betsFollowed: number;
  winRate: number;
}

export interface BankrollStats {
  totalBets: number;
  wonBets: number;
  lostBets: number;
  pendingBets: number;
  totalUnits: number;
  totalProfitLoss: number;
}
