import { isInRange } from "@/lib/dashboard-data";
import type { TimeRange } from "@/lib/dashboard-data";

describe("isInRange", () => {
  describe("when range is ALL", () => {
    it("should return true for any date", () => {
      // Arrange
      const date = new Date("2025-01-01");
      const range: TimeRange = "ALL";

      // Act
      const result = isInRange(date, range);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true for date far in the past", () => {
      // Arrange
      const date = new Date("2020-01-01");
      const range: TimeRange = "ALL";

      // Act
      const result = isInRange(date, range);

      // Assert
      expect(result).toBe(true);
    });
  });

  describe("when range is 7D", () => {
    it("should return true for date within last 7 days", () => {
      // Arrange
      const now = new Date();
      const recentDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
      const range: TimeRange = "7D";

      // Act
      const result = isInRange(recentDate, range);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for date older than 7 days", () => {
      // Arrange
      const now = new Date();
      const oldDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
      const range: TimeRange = "7D";

      // Act
      const result = isInRange(oldDate, range);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("when range is 30D", () => {
    it("should return true for date within last 30 days", () => {
      // Arrange
      const now = new Date();
      const recentDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 days ago
      const range: TimeRange = "30D";

      // Act
      const result = isInRange(recentDate, range);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for date older than 30 days", () => {
      // Arrange
      const now = new Date();
      const oldDate = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000); // 45 days ago
      const range: TimeRange = "30D";

      // Act
      const result = isInRange(oldDate, range);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("when range is 90D", () => {
    it("should return true for date within last 90 days", () => {
      // Arrange
      const now = new Date();
      const recentDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
      const range: TimeRange = "90D";

      // Act
      const result = isInRange(recentDate, range);

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for date older than 90 days", () => {
      // Arrange
      const now = new Date();
      const oldDate = new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000); // 100 days ago
      const range: TimeRange = "90D";

      // Act
      const result = isInRange(oldDate, range);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should return true for current date", () => {
      // Arrange
      const today = new Date();
      const range: TimeRange = "7D";

      // Act
      const result = isInRange(today, range);

      // Assert
      expect(result).toBe(true);
    });

    it("should return true for date exactly at cutoff boundary", () => {
      // Arrange
      const now = new Date();
      const cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // exactly 7 days ago
      const range: TimeRange = "7D";

      // Act
      const result = isInRange(cutoffDate, range);

      // Assert
      expect(result).toBe(true);
    });
  });
});
