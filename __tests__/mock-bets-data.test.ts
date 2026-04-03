import { getDefaultSelections, DEFAULT_INITIAL_BANKROLL, MOCK_BETS } from "@/lib/mock-bets-data";
import type { BankrollBet } from "@/types/bankroll";

describe("getDefaultSelections", () => {
  it("should return empty array when bets list is empty", () => {
    // Arrange
    const bets: BankrollBet[] = [];

    // Act
    const result = getDefaultSelections(bets);

    // Assert
    expect(result).toEqual([]);
  });

  it("should map each bet to a selection with selected=true and actualOdds equal to recommendedOdds", () => {
    // Arrange
    const bets: BankrollBet[] = [
      {
        id: "b1",
        date: "2025-01-15",
        sport: "Tennis",
        match: "Sinner vs Medvedev",
        recommendedOdds: 2.10,
        units: 3,
        result: "win",
        profitLoss: 3.30,
      },
      {
        id: "b2",
        date: "2025-01-18",
        sport: "Tennis",
        match: "Alcaraz vs Zverev",
        recommendedOdds: 1.95,
        units: 2,
        result: "win",
        profitLoss: 1.90,
      },
    ];

    // Act
    const result = getDefaultSelections(bets);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      betId: "b1",
      selected: true,
      actualOdds: 2.10,
    });
    expect(result[1]).toEqual({
      betId: "b2",
      selected: true,
      actualOdds: 1.95,
    });
  });

  it("should preserve betId from original bet in selection", () => {
    // Arrange
    const bets: BankrollBet[] = [
      {
        id: "test-bet-id",
        date: "2025-01-15",
        sport: "Tennis",
        match: "Test Match",
        recommendedOdds: 2.00,
        units: 1,
        result: "win",
        profitLoss: 1.00,
      },
    ];

    // Act
    const result = getDefaultSelections(bets);

    // Assert
    expect(result[0].betId).toBe("test-bet-id");
  });

  it("should map all bets from MOCK_BETS", () => {
    // Act
    const result = getDefaultSelections(MOCK_BETS);

    // Assert
    expect(result).toHaveLength(10);
    MOCK_BETS.forEach((bet, index) => {
      expect(result[index].betId).toBe(bet.id);
      expect(result[index].selected).toBe(true);
      expect(result[index].actualOdds).toBe(bet.recommendedOdds);
    });
  });
});

describe("DEFAULT_INITIAL_BANKROLL", () => {
  it("should be equal to 1000", () => {
    // Assert
    expect(DEFAULT_INITIAL_BANKROLL).toBe(1000);
  });
});
