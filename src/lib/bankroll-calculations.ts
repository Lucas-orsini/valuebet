import type { BankrollBet, UserBetSelection, BankrollKPIs, BankrollDataPoint, BankrollStats } from "@/types/bankroll";

/**
 * Calculate the bankroll curve based on bets and user selections
 */
export function calculateBankrollCurve(
  bets: BankrollBet[],
  initialBankroll: number,
  selections: UserBetSelection[]
): BankrollDataPoint[] {
  const dataPoints: BankrollDataPoint[] = [];
  let currentBankroll = initialBankroll;

  // Sort bets by date
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Create a map of selections by bet ID for quick lookup
  const selectionsMap = new Map(
    selections.map(s => [s.betId, s])
  );

  // Add initial point
  dataPoints.push({
    date: sortedBets[0]?.date || new Date().toISOString(),
    bankroll: currentBankroll,
    pnl: 0
  });

  // Process each bet
  for (const bet of sortedBets) {
    const selection = selectionsMap.get(bet.id);

    // In auto mode (default), all bets are followed
    // In custom mode, only selected bets count
    if (bet.result === "pending") continue;

    const shouldCount = selection?.selected ?? true;
    if (!shouldCount) continue;

    // Calculate profit/loss using actual odds (if provided) or recommended odds
    const odds = selection?.actualOdds ?? bet.recommendedOdds;
    
    if (bet.result === "win") {
      currentBankroll += bet.units * (odds - 1);
    } else if (bet.result === "loss") {
      currentBankroll -= bet.units;
    }

    dataPoints.push({
      date: bet.date,
      bankroll: currentBankroll,
      pnl: currentBankroll - initialBankroll
    });
  }

  return dataPoints;
}

/**
 * Calculate KPIs for the bankroll tracker
 */
export function calculateBankrollKPIs(
  bets: BankrollBet[],
  initialBankroll: number,
  selections: UserBetSelection[]
): BankrollKPIs {
  const selectionsMap = new Map(
    selections.map(s => [s.betId, s])
  );

  // Filter settled bets that were followed
  const followedBets = bets.filter(bet => {
    if (bet.result === "pending") return false;
    const selection = selectionsMap.get(bet.id);
    return selection?.selected ?? true;
  });

  // Calculate current bankroll
  let currentBankroll = initialBankroll;
  let totalUnits = 0;

  for (const bet of followedBets) {
    const selection = selectionsMap.get(bet.id);
    const odds = selection?.actualOdds ?? bet.recommendedOdds;
    
    if (bet.result === "win") {
      currentBankroll += bet.units * (odds - 1);
    } else if (bet.result === "loss") {
      currentBankroll -= bet.units;
    }
    totalUnits += bet.units;
  }

  // Calculate profit/loss
  const profitLoss = currentBankroll - initialBankroll;

  // Calculate ROI
  const roi = totalUnits > 0 ? (profitLoss / totalUnits) * 100 : 0;

  // Calculate win rate
  const wonBets = followedBets.filter(b => b.result === "win").length;
  const winRate = followedBets.length > 0 ? (wonBets / followedBets.length) * 100 : 0;

  // Calculate current streak (from most recent bet)
  const sortedBets = [...followedBets].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let currentStreak = 0;
  for (const bet of sortedBets) {
    if (bet.result === "win" || bet.result === "loss") {
      // Count consecutive wins or losses
      const targetResult = bet.result;
      for (const b of sortedBets) {
        if (b.result === targetResult) {
          currentStreak++;
        } else {
          break;
        }
      }
      break;
    }
  }

  return {
    currentBankroll,
    profitLoss,
    roi,
    currentStreak,
    betsFollowed: followedBets.length,
    winRate
  };
}

/**
 * Calculate statistics for the bankroll tracker
 */
export function calculateBankrollStats(
  bets: BankrollBet[],
  selections: UserBetSelection[]
): BankrollStats {
  const selectionsMap = new Map(
    selections.map(s => [s.betId, s])
  );

  // Filter bets that were followed
  const followedBets = bets.filter(bet => {
    const selection = selectionsMap.get(bet.id);
    return selection?.selected ?? true;
  });

  const totalBets = followedBets.length;
  const wonBets = followedBets.filter(b => b.result === "win").length;
  const lostBets = followedBets.filter(b => b.result === "loss").length;
  const pendingBets = bets.filter(b => b.result === "pending").length;

  const totalUnits = followedBets.reduce((sum, b) => sum + b.units, 0);
  const totalProfitLoss = followedBets.reduce((sum, b) => sum + b.profitLoss, 0);

  return {
    totalBets,
    wonBets,
    lostBets,
    pendingBets,
    totalUnits,
    totalProfitLoss
  };
}
