import type {
  BankrollConfig,
  TrackedBet,
  BankrollSnapshot,
  Bet,
  Mode,
} from "@/types/bankroll";

// Re-export types for convenience
export type {
  BankrollConfig,
  TrackedBet,
  BankrollSnapshot,
  Bet,
  Mode,
};

// Storage keys
export const STORAGE_KEYS = {
  BANKROLL_CONFIG: "haurus_bankroll_config",
  TRACKED_BETS: "haurus_tracked_bets",
} as const;

// Mock bets data
export const MOCK_BETS: Bet[] = [
  {
    id: "b1",
    player: "Jannik Sinner",
    sport: "Tennis",
    odds: 2.10,
    date: "2025-03-15",
    units: 3,
    result: "W",
  },
  {
    id: "b2",
    player: "Carlos Alcaraz",
    sport: "Tennis",
    odds: 1.85,
    date: "2025-03-16",
    units: 2,
    result: "W",
  },
  {
    id: "b3",
    player: "Taylor Fritz",
    sport: "Tennis",
    odds: 3.20,
    date: "2025-03-17",
    units: 1,
    result: "L",
  },
  {
    id: "b4",
    player: "Daniil Medvedev",
    sport: "Tennis",
    odds: 1.95,
    date: "2025-03-18",
    units: 2,
    result: "W",
  },
  {
    id: "b5",
    player: "Novak Djokovic",
    sport: "Tennis",
    odds: 2.25,
    date: "2025-03-19",
    units: 3,
    result: "W",
  },
  {
    id: "b6",
    player: "Rafael Nadal",
    sport: "Tennis",
    odds: 2.80,
    date: "2025-03-20",
    units: 2,
    result: "L",
  },
  {
    id: "b7",
    player: "Stefanos Tsitsipas",
    sport: "Tennis",
    odds: 1.65,
    date: "2025-03-21",
    units: 2,
    result: "W",
  },
  {
    id: "b8",
    player: "Andrey Rublev",
    sport: "Tennis",
    odds: 1.75,
    date: "2025-03-22",
    units: 1,
    result: "P",
  },
  {
    id: "b9",
    player: "Holger Rune",
    sport: "Tennis",
    odds: 1.90,
    date: "2025-03-23",
    units: 3,
    result: "W",
  },
  {
    id: "b10",
    player: "Alexander Zverev",
    sport: "Tennis",
    odds: 2.50,
    date: "2025-03-24",
    units: 2,
    result: "W",
  },
  {
    id: "b11",
    player: "Grigor Dimitrov",
    sport: "Tennis",
    odds: 1.78,
    date: "2025-03-25",
    units: 2,
    result: "W",
  },
  {
    id: "b12",
    player: "Alex de Minaur",
    sport: "Tennis",
    odds: 2.15,
    date: "2025-03-26",
    units: 1,
    result: "L",
  },
  {
    id: "b13",
    player: "Tommy Paul",
    sport: "Tennis",
    odds: 1.92,
    date: "2025-03-27",
    units: 2,
    result: "W",
  },
  {
    id: "b14",
    player: "Ben Shelton",
    sport: "Tennis",
    odds: 2.35,
    date: "2025-03-28",
    units: 1,
    result: "W",
  },
  {
    id: "b15",
    player: "Sebastian Korda",
    sport: "Tennis",
    odds: 1.68,
    date: "2025-03-29",
    units: 3,
    result: null,
  },
];

// Get estimated profit for a bet
export function getEstimatedProfit(bet: Bet & { odds: number }): number {
  if (bet.result === null) return 0;
  if (bet.result === "P") return 0;
  if (bet.result === "L") return -bet.units;

  // Win: (odds - 1) * units
  return (bet.odds - 1) * bet.units;
}

// Calculate current bankroll
export function calculateCurrentBankroll(
  bets: Bet[],
  trackedBets: TrackedBet[],
  initialBankroll: number,
  mode: Mode
): number {
  let bankroll = initialBankroll;

  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (const bet of sortedBets) {
    const tracked = trackedBets.find((t) => t.betId === bet.id);

    if (mode === "auto" || (tracked && tracked.played)) {
      const odds = tracked?.customOdds ?? bet.odds;
      bankroll += getEstimatedProfit({ ...bet, odds });
    }
  }

  return Math.max(0, bankroll);
}

// Calculate profit/loss
export function calculateProfit(
  bets: Bet[],
  trackedBets: TrackedBet[],
  initialBankroll: number,
  mode: Mode
): number {
  return (
    calculateCurrentBankroll(bets, trackedBets, initialBankroll, mode) -
    initialBankroll
  );
}

// Calculate ROI percentage
export function calculateROI(
  bets: Bet[],
  trackedBets: TrackedBet[],
  initialBankroll: number,
  mode: Mode
): number {
  const profit = calculateProfit(bets, trackedBets, initialBankroll, mode);
  if (initialBankroll === 0) return 0;
  return (profit / initialBankroll) * 100;
}

// Calculate win rate
export function calculateWinRate(
  bets: Bet[],
  trackedBets: TrackedBet[],
  mode: Mode
): number {
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalPlayed = 0;
  let totalWon = 0;

  for (const bet of sortedBets) {
    const tracked = trackedBets.find((t) => t.betId === bet.id);

    if (mode === "auto" || (tracked && tracked.played)) {
      if (bet.result !== null && bet.result !== "P") {
        totalPlayed++;
        if (bet.result === "W") {
          totalWon++;
        }
      }
    }
  }

  if (totalPlayed === 0) return 0;
  return (totalWon / totalPlayed) * 100;
}

// Calculate streak
export function calculateStreak(
  bets: Bet[],
  trackedBets: TrackedBet[],
  mode: Mode
): { current: number; isWin: boolean } {
  const sortedBets = [...bets]
    .filter((bet) => bet.result !== null && bet.result !== "P")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let streak = 0;
  let isWin = true;
  let firstResult: "W" | "L" | null = null;

  for (const bet of sortedBets) {
    const tracked = trackedBets.find((t) => t.betId === bet.id);

    if (mode === "auto" || (tracked && tracked.played)) {
      if (firstResult === null) {
        firstResult = bet.result as "W" | "L";
        isWin = firstResult === "W";
        streak = 1;
      } else if (bet.result === firstResult) {
        streak++;
      } else {
        break;
      }
    }
  }

  return { current: streak, isWin };
}

// Generate bankroll curve snapshots
export function generateBankrollCurve(
  bets: Bet[],
  trackedBets: TrackedBet[],
  initialBankroll: number,
  mode: Mode
): BankrollSnapshot[] {
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const snapshots: BankrollSnapshot[] = [
    {
      date: sortedBets[0]?.date ?? new Date().toISOString().split("T")[0],
      bankroll: initialBankroll,
      profit: 0,
    },
  ];

  let currentBankroll = initialBankroll;

  for (const bet of sortedBets) {
    const tracked = trackedBets.find((t) => t.betId === bet.id);

    if (mode === "auto" || (tracked && tracked.played)) {
      const odds = tracked?.customOdds ?? bet.odds;
      currentBankroll += getEstimatedProfit({ ...bet, odds });

      snapshots.push({
        date: bet.date,
        bankroll: Math.max(0, currentBankroll),
        profit: currentBankroll - initialBankroll,
      });
    }
  }

  return snapshots;
}
