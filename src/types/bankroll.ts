export interface BankrollConfig {
  initialBankroll: number;
  mode: "auto" | "custom";
}

export interface TrackedBet {
  betId: string;
  played: boolean;
  customOdds?: number;
}

export interface BankrollSnapshot {
  date: string;
  bankroll: number;
  profit: number;
}

export interface Bet {
  id: string;
  player: string;
  sport: string;
  odds: number;
  date: string;
  units: number;
  result: "W" | "L" | "P" | null;
  actualOdds?: number;
}

export type Mode = "auto" | "custom";
