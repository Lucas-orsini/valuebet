import { isInRange } from "@/lib/dashboard-data";
import type { TimeRange } from "@/lib/dashboard-data";

describe("isInRange", () => {
  // Arrange — setup handled per test
  // Act/Assert — inline per test

  it("should return true when range is ALL regardless of date", () => {
    // Arrange
    const date = new Date("2020-01-01");
    const range: TimeRange = "ALL";

    // Act
    const result = isInRange(date, range);

    // Assert
    expect(result).toBe(true);
  });

  it("should return true when date is within 7D range", () => {
    // Arrange
    const now = new Date();
    const recentDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const range: TimeRange = "7D";

    // Act
    const result = isInRange(recentDate, range);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when date is outside 7D range", () => {
    // Arrange
    const now = new Date();
    const oldDate = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); // 10 days ago
    const range: TimeRange = "7D";

    // Act
    const result = isInRange(oldDate, range);

    // Assert
    expect(result).toBe(false);
  });

  it("should return true when date is within 30D range", () => {
    // Arrange
    const now = new Date();
    const recentDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 days ago
    const range: TimeRange = "30D";

    // Act
    const result = isInRange(recentDate, range);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when date is outside 30D range", () => {
    // Arrange
    const now = new Date();
    const oldDate = new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000); // 45 days ago
    const range: TimeRange = "30D";

    // Act
    const result = isInRange(oldDate, range);

    // Assert
    expect(result).toBe(false);
  });

  it("should return true when date is within 90D range", () => {
    // Arrange
    const now = new Date();
    const recentDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000); // 60 days ago
    const range: TimeRange = "90D";

    // Act
    const result = isInRange(recentDate, range);

    // Assert
    expect(result).toBe(true);
  });

  it("should return false when date is outside 90D range", () => {
    // Arrange
    const now = new Date();
    const oldDate = new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000); // 100 days ago
    const range: TimeRange = "90D";

    // Act
    const result = isInRange(oldDate, range);

    // Assert
    expect(result).toBe(false);
  });

  it("should return true when date is exactly at the cutoff boundary", () => {
    // Arrange — date exactly 7 days ago (boundary case)
    const now = new Date();
    const boundaryDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // exactly 7 days ago
    const range: TimeRange = "7D";

    // Act
    const result = isInRange(boundaryDate, range);

    // Assert
    expect(result).toBe(true);
  });
});
