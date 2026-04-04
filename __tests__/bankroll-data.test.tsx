import {
  getTrackedBets,
  calculateKpis,
  generateCurveData,
  MOCK_BETS,
  type Bet,
  type BankrollMode,
  type BankrollKpi,
  type CurvePoint,
} from "@/lib/bankroll-data";

describe("bankroll-data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTrackedBets", () => {
    // Arrange — données de test avec paris complétés uniquement
    const completedBets: Bet[] = MOCK_BETS.filter((b) => b.result !== "pending");
    const selectedIds = new Set<string>(["b1", "b2"]);

    it("should return only tracked bets in auto mode", () => {
      // Act
      const result = getTrackedBets(MOCK_BETS, "auto", selectedIds);

      // Assert — seuls les paris marqués isTracked et complétés
      const allTracked = result.every((b) => b.isTracked && b.result !== "pending");
      expect(allTracked).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return only selected bets in manual mode", () => {
      // Act
      const result = getTrackedBets(MOCK_BETS, "manual", selectedIds);

      // Assert — uniquement les paris dont l'ID est dans selectedBetIds
      const allSelected = result.every((b) => selectedIds.has(b.id));
      expect(allSelected).toBe(true);
    });

    it("should exclude pending bets in both modes", () => {
      // Act
      const autoResult = getTrackedBets(MOCK_BETS, "auto", selectedIds);
      const manualResult = getTrackedBets(MOCK_BETS, "manual", selectedIds);

      // Assert
      const hasPending = [...autoResult, ...manualResult].some(
        (b) => b.result === "pending"
      );
      expect(hasPending).toBe(false);
    });
  });

  describe("calculateKpis", () => {
    it("should return initial bankroll when no bets tracked", () => {
      // Arrange — tous les paris non suivis ou pending
      const emptyBets: Bet[] = [];
      const selectedIds = new Set<string>([]);

      // Act
      const kpis = calculateKpis(emptyBets, 1000, "auto", selectedIds);

      // Assert
      expect(kpis.currentBankroll).toBe(1000);
      expect(kpis.profitLoss).toBe(0);
      expect(kpis.roi).toBe(0);
      expect(kpis.betsTracked).toBe(0);
    });

    it("should calculate positive profit for winning bets", () => {
      // Arrange — paris gagnants: odds 2.0, 2 unités
      const winningBets: Bet[] = [
        { id: "w1", match: "A vs B", date: "2025-01-01", type: "1N2", aiOdds: 2.0, units: 2, result: "win", isTracked: true },
      ];
      const selectedIds = new Set<string>(["w1"]);

      // Act
      const kpis = calculateKpis(winningBets, 1000, "auto", selectedIds);

      // Assert — profit = (2.0 - 1) * 2 = 2€
      expect(kpis.profitLoss).toBeCloseTo(2.0, 2);
      expect(kpis.currentBankroll).toBeCloseTo(1002.0, 2);
    });

    it("should calculate negative profit for losing bets", () => {
      // Arrange
      const losingBets: Bet[] = [
        { id: "l1", match: "C vs D", date: "2025-01-01", type: "1N2", aiOdds: 2.0, units: 3, result: "loss", isTracked: true },
      ];
      const selectedIds = new Set<string>(["l1"]);

      // Act
      const kpis = calculateKpis(losingBets, 1000, "auto", selectedIds);

      // Assert — perte = 3 unités
      expect(kpis.profitLoss).toBe(-3);
      expect(kpis.currentBankroll).toBe(997);
    });

    it("should calculate ROI based on total staked", () => {
      // Arrange — profit 2€, misé 4u → ROI = 50%
      const mixedBets: Bet[] = [
        { id: "m1", match: "E vs F", date: "2025-01-01", type: "1N2", aiOdds: 2.0, units: 2, result: "win", isTracked: true },
        { id: "m2", match: "G vs H", date: "2025-01-02", type: "1N2", aiOdds: 2.0, units: 2, result: "loss", isTracked: true },
      ];
      const selectedIds = new Set<string>(["m1", "m2"]);

      // Act
      const kpis = calculateKpis(mixedBets, 1000, "auto", selectedIds);

      // Assert — profit net = 0, total staked = 4, ROI = 0%
      expect(kpis.roi).toBeCloseTo(0, 1);
    });

    it("should calculate streak correctly for consecutive wins", () => {
      // Arrange
      const consecutiveWins: Bet[] = [
        { id: "c1", match: "I vs J", date: "2025-01-01", type: "1N2", aiOdds: 2.0, units: 1, result: "win", isTracked: true },
        { id: "c2", match: "K vs L", date: "2025-01-02", type: "1N2", aiOdds: 2.0, units: 1, result: "win", isTracked: true },
        { id: "c3", match: "M vs N", date: "2025-01-03", type: "1N2", aiOdds: 2.0, units: 1, result: "win", isTracked: true },
      ];
      const selectedIds = new Set<string>(["c1", "c2", "c3"]);

      // Act
      const kpis = calculateKpis(consecutiveWins, 1000, "auto", selectedIds);

      // Assert — dernière série = W, 3 victoires consécutives
      expect(kpis.streak.type).toBe("W");
      expect(kpis.streak.count).toBe(3);
    });

    it("should count only tracked bets for streak calculation", () => {
      // Arrange
      const mixedTracked: Bet[] = [
        { id: "t1", match: "O vs P", date: "2025-01-01", type: "1N2", aiOdds: 2.0, units: 1, result: "win", isTracked: true },
        { id: "t2", match: "Q vs R", date: "2025-01-02", type: "1N2", aiOdds: 2.0, units: 1, result: "win", isTracked: true },
        { id: "t3", match: "S vs T", date: "2025-01-03", type: "1N2", aiOdds: 2.0, units: 1, result: "loss", isTracked: false },
      ];
      const selectedIds = new Set<string>(["t1", "t2"]);

      // Act
      const kpis = calculateKpis(mixedTracked, 1000, "auto", selectedIds);

      // Assert — streak basée sur les paris suivis uniquement
      expect(kpis.streak.type).toBe("W");
      expect(kpis.streak.count).toBe(2);
    });
  });

  describe("generateCurveData", () => {
    it("should return empty array when no bets provided", () => {
      // Act
      const result = generateCurveData([], 1000);

      // Assert
      expect(result).toEqual([]);
    });

    it("should start from initial bankroll and accumulate changes", () => {
      // Arrange
      const singleWin: Bet[] = [
        { id: "g1", match: "U vs V", date: "2025-11-01", type: "1N2", aiOdds: 2.0, units: 5, result: "win", isTracked: true },
      ];

      // Act
      const result = generateCurveData(singleWin, 1000);

      // Assert — point initial + point après pari
      expect(result.length).toBe(2);
      expect(result[0].bankroll).toBe(1000);
      expect(result[0].pnl).toBe(0);
      // gain = (2.0 - 1) * 5 = 5€
      expect(result[1].bankroll).toBe(1005);
      expect(result[1].pnl).toBe(5);
    });

    it("should accumulate multiple bets chronologically", () => {
      // Arrange
      const chronologicalBets: Bet[] = [
        { id: "g2", match: "W vs X", date: "2025-11-01", type: "1N2", aiOdds: 2.0, units: 2, result: "win", isTracked: true },
        { id: "g3", match: "Y vs Z", date: "2025-11-03", type: "1N2", aiOdds: 1.5, units: 4, result: "loss", isTracked: true },
      ];

      // Act
      const result = generateCurveData(chronologicalBets, 1000);

      // Assert — 1000 → 1000 + 2 = 1002 → 1002 - 4 = 998
      expect(result.length).toBe(2); // date début mois + 2 paris
      const lastPoint = result[result.length - 1];
      expect(lastPoint.bankroll).toBe(998);
      expect(lastPoint.pnl).toBe(-2);
    });

    it("should handle unsorted bets by sorting them", () => {
      // Arrange — paris dans le désordre
      const unsortedBets: Bet[] = [
        { id: "u1", match: "A vs B", date: "2025-11-10", type: "1N2", aiOdds: 2.0, units: 2, result: "win", isTracked: true },
        { id: "u2", match: "C vs D", date: "2025-11-01", type: "1N2", aiOdds: 2.0, units: 2, result: "win", isTracked: true },
      ];

      // Act
      const result = generateCurveData(unsortedBets, 1000);

      // Assert — triés par date
      const dates = result.map((p) => p.date);
      expect(dates).toEqual(dates.sort());
    });
  });
});
