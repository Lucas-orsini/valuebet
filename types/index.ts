export type Bet = {
  id: string;
  userId: string;
  date: Date;
  event: string;
  market: string;
  odds: number;
  stake: number;
  status: 'won' | 'lost' | 'pending' | 'refunded';
  profit: number;
  trackingMode: BankrollMode;
  createdAt: Date;
  updatedAt: Date;
};

export type BankrollMode = 'auto' | 'manual';

export type KpiData = {
  totalProfit: number;
  roi: number;
  currentStreak: number;
  streakType: 'win' | 'loss' | null;
  currentBankroll: number;
  totalTracked: number;
};

export type CurvePoint = {
  date: Date;
  bankroll: number;
  pnl: number;
};
