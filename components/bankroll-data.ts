import type { Bet, BankrollMode, KpiData, CurvePoint } from '@/types';

export function getTrackedBets(bets: Bet[], mode: BankrollMode): Bet[] {
  return bets
    .filter((bet) => bet.trackingMode === mode && bet.status !== 'pending')
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function calculateKpis(bets: Bet[], initialBankroll: number): KpiData {
  if (bets.length === 0) {
    return {
      totalProfit: 0,
      roi: 0,
      currentStreak: 0,
      streakType: null,
      currentBankroll: initialBankroll,
      totalTracked: 0,
    };
  }

  const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0);
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const roi = totalStaked > 0 ? (totalProfit / totalStaked) * 100 : 0;

  // Calculate streak from most recent bet
  let currentStreak = 0;
  let streakType: 'win' | 'loss' | null = null;

  if (bets.length > 0) {
    const sortedBets = [...bets].sort((a, b) => b.date.getTime() - a.date.getTime());
    const mostRecentStatus = sortedBets[0].status;
    streakType = mostRecentStatus === 'won' ? 'win' : 'loss';

    for (const bet of sortedBets) {
      if (bet.status === mostRecentStatus) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return {
    totalProfit,
    roi,
    currentStreak,
    streakType,
    currentBankroll: initialBankroll + totalProfit,
    totalTracked: bets.length,
  };
}

export function generateCurveData(
  bets: Bet[],
  initialBankroll: number,
  periodStart: Date
): CurvePoint[] {
  if (bets.length === 0) {
    return [];
  }

  // Sort bets chronologically
  const sortedBets = [...bets].sort((a, b) => a.date.getTime() - b.date.getTime());

  const points: CurvePoint[] = [];
  let currentBankroll = initialBankroll;

  for (const bet of sortedBets) {
    // Only include bets within the period
    if (bet.date >= periodStart) {
      currentBankroll += bet.profit;
      points.push({
        date: bet.date,
        bankroll: currentBankroll,
        pnl: bet.profit,
      });
    }
  }

  return points;
}
