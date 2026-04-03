import {
  calculateBankrollCurve,
  calculateBankrollKPIs,
  calculateBankrollStats,
} from "@/lib/bankroll-calculations";
import type { BankrollBet, UserBetSelection } from "@/types/bankroll";

describe("calculateBankrollCurve", () => {
  // Arrange
  const baseBet = (overrides: Partial<BankrollBet> = {}): BankrollBet => ({
    id: "b1",
    date: "2025-01-15",
    sport: "Tennis",
    match: "Sinner vs Medvedev",
    recommendedOdds: 2.10,
    units: 3,
    result: "win",
    profitLoss: 3.30,
    ...overrides,
  });

  it("should return initial bankroll point when bets list is empty", () => {
    // Arrange
    const bets: BankrollBet[] = [];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].bankroll).toBe(1000);
    expect(result[0].pnl).toBe(0);
  });

  it("should skip pending bets and not update bankroll", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "pending-bet", result: "pending", units: 2 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "pending-bet", selected: true, actualOdds: 2.20 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].bankroll).toBe(1000);
  });

  it("should calculate correct bankroll after win bet", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3, recommendedOdds: 2.10 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.10 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].bankroll).toBe(1000);
    expect(result[1].bankroll).toBeCloseTo(1003.30, 2);
    expect(result[1].pnl).toBeCloseTo(3.30, 2);
  });

  it("should calculate correct bankroll after loss bet", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b3", result: "loss", units: 1, recommendedOdds: 2.40 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b3", selected: true, actualOdds: 2.40 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[1].bankroll).toBe(999);
    expect(result[1].pnl).toBe(-1);
  });

  it("should use actualOdds instead of recommendedOdds when provided in custom mode", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3, recommendedOdds: 2.10 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.50 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result[1].bankroll).toBeCloseTo(1004.50, 2);
  });

  it("should skip unselected bets in custom mode", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3, recommendedOdds: 2.10 }),
      baseBet({ id: "b2", result: "win", units: 2, recommendedOdds: 1.95 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: false, actualOdds: 2.10 },
      { betId: "b2", selected: true, actualOdds: 1.95 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[1].bankroll).toBeCloseTo(1001.90, 2);
  });

  it("should process multiple bets in chronological order", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", date: "2025-01-15", result: "win", units: 3, recommendedOdds: 2.10 }),
      baseBet({ id: "b3", date: "2025-01-22", result: "loss", units: 1, recommendedOdds: 2.40 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.10 },
      { betId: "b3", selected: true, actualOdds: 2.40 },
    ];

    // Act
    const result = calculateBankrollCurve(bets, initialBankroll, selections);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0].bankroll).toBe(1000);
    expect(result[1].bankroll).toBeCloseTo(1003.30, 2);
    expect(result[2].bankroll).toBeCloseTo(1002.30, 2);
  });
});

describe("calculateBankrollKPIs", () => {
  const baseBet = (overrides: Partial<BankrollBet> = {}): BankrollBet => ({
    id: "b1",
    date: "2025-01-15",
    sport: "Tennis",
    match: "Sinner vs Medvedev",
    recommendedOdds: 2.10,
    units: 3,
    result: "win",
    profitLoss: 3.30,
    ...overrides,
  });

  it("should return currentBankroll equal to initialBankroll when no settled bets followed", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "pending-bet", result: "pending", units: 2 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "pending-bet", selected: true, actualOdds: 2.20 },
    ];

    // Act
    const result = calculateBankrollKPIs(bets, initialBankroll, selections);

    // Assert
    expect(result.currentBankroll).toBe(1000);
    expect(result.profitLoss).toBe(0);
    expect(result.roi).toBe(0);
    expect(result.betsFollowed).toBe(0);
    expect(result.winRate).toBe(0);
  });

  it("should calculate correct KPIs with mixed won and lost bets", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3, recommendedOdds: 2.10 }),
      baseBet({ id: "b2", result: "win", units: 2, recommendedOdds: 1.95 }),
      baseBet({ id: "b3", result: "loss", units: 1, recommendedOdds: 2.40 }),
      baseBet({ id: "b4", result: "win", units: 3, recommendedOdds: 1.85 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.10 },
      { betId: "b2", selected: true, actualOdds: 1.95 },
      { betId: "b3", selected: true, actualOdds: 2.40 },
      { betId: "b4", selected: true, actualOdds: 1.85 },
    ];

    // Act
    const result = calculateBankrollKPIs(bets, initialBankroll, selections);

    // Assert
    const expectedProfit = 3.30 + 1.90 - 1.00 + 2.55;
    const totalUnits = 3 + 2 + 1 + 3;
    expect(result.profitLoss).toBeCloseTo(expectedProfit, 2);
    expect(result.roi).toBeCloseTo((expectedProfit / totalUnits) * 100, 2);
    expect(result.betsFollowed).toBe(4);
    expect(result.winRate).toBe(75);
  });

  it("should calculate KPIs only for selected bets in custom mode", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3, recommendedOdds: 2.10 }),
      baseBet({ id: "b2", result: "win", units: 2, recommendedOdds: 1.95 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: false, actualOdds: 2.10 },
      { betId: "b2", selected: true, actualOdds: 1.95 },
    ];

    // Act
    const result = calculateBankrollKPIs(bets, initialBankroll, selections);

    // Assert
    expect(result.profitLoss).toBeCloseTo(1.90, 2);
    expect(result.betsFollowed).toBe(1);
    expect(result.currentBankroll).toBeCloseTo(1001.90, 2);
  });

  it("should calculate currentStreak as count of consecutive same results from most recent bet", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", date: "2025-01-10", result: "win", units: 2 }),
      baseBet({ id: "b2", date: "2025-01-15", result: "loss", units: 2 }),
      baseBet({ id: "b3", date: "2025-01-20", result: "loss", units: 2 }),
      baseBet({ id: "b4", date: "2025-01-25", result: "loss", units: 2 }),
    ];
    const initialBankroll = 1000;
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.00 },
      { betId: "b2", selected: true, actualOdds: 2.00 },
      { betId: "b3", selected: true, actualOdds: 2.00 },
      { betId: "b4", selected: true, actualOdds: 2.00 },
    ];

    // Act
    const result = calculateBankrollKPIs(bets, initialBankroll, selections);

    // Assert
    expect(result.currentStreak).toBe(3);
  });
});

describe("calculateBankrollStats", () => {
  const baseBet = (overrides: Partial<BankrollBet> = {}): BankrollBet => ({
    id: "b1",
    date: "2025-01-15",
    sport: "Tennis",
    match: "Sinner vs Medvedev",
    recommendedOdds: 2.10,
    units: 3,
    result: "win",
    profitLoss: 3.30,
    ...overrides,
  });

  it("should return zero counts when bets list is empty", () => {
    // Arrange
    const bets: BankrollBet[] = [];
    const selections: UserBetSelection[] = [];

    // Act
    const result = calculateBankrollStats(bets, selections);

    // Assert
    expect(result.totalBets).toBe(0);
    expect(result.wonBets).toBe(0);
    expect(result.lostBets).toBe(0);
    expect(result.pendingBets).toBe(0);
    expect(result.totalUnits).toBe(0);
    expect(result.totalProfitLoss).toBe(0);
  });

  it("should count all followed bets correctly", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3 }),
      baseBet({ id: "b2", result: "win", units: 2 }),
      baseBet({ id: "b3", result: "loss", units: 1 }),
      baseBet({ id: "pending-bet", result: "pending", units: 2 }),
      baseBet({ id: "b4", result: "win", units: 3 }),
    ];
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.10 },
      { betId: "b2", selected: true, actualOdds: 1.95 },
      { betId: "b3", selected: true, actualOdds: 2.40 },
      { betId: "pending-bet", selected: true, actualOdds: 2.20 },
      { betId: "b4", selected: true, actualOdds: 1.85 },
    ];

    // Act
    const result = calculateBankrollStats(bets, selections);

    // Assert
    expect(result.totalBets).toBe(4);
    expect(result.wonBets).toBe(3);
    expect(result.lostBets).toBe(1);
    expect(result.pendingBets).toBe(1);
    expect(result.totalUnits).toBe(9);
  });

  it("should return pendingBets equal to total pending in original bets, not filtered", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3 }),
      baseBet({ id: "pending-bet", result: "pending", units: 2 }),
    ];
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: true, actualOdds: 2.10 },
      { betId: "pending-bet", selected: true, actualOdds: 2.20 },
    ];

    // Act
    const result = calculateBankrollStats(bets, selections);

    // Assert
    expect(result.pendingBets).toBe(1);
  });

  it("should filter out unselected bets from followed count", () => {
    // Arrange
    const bets: BankrollBet[] = [
      baseBet({ id: "b1", result: "win", units: 3 }),
      baseBet({ id: "b2", result: "win", units: 2 }),
    ];
    const selections: UserBetSelection[] = [
      { betId: "b1", selected: false, actualOdds: 2.10 },
      { betId: "b2", selected: true, actualOdds: 1.95 },
    ];

    // Act
    const result = calculateBankrollStats(bets, selections);

    // Assert
    expect(result.totalBets).toBe(1);
    expect(result.totalUnits).toBe(2);
    expect(result.wonBets).toBe(1);
  });
});
