import { describe, expect, test } from 'vitest';
import {
  getTrackedBets,
  calculateKpis,
  generateCurveData,
} from '../bankroll-data';
import type { Bet, BankrollMode } from '@/types';

const mockBets: Bet[] = [
  {
    id: '1',
    userId: 'user1',
    date: new Date('2024-01-05'),
    event: 'Team A vs Team B',
    market: 'Over 2.5',
    odds: 2.1,
    stake: 100,
    status: 'won',
    profit: 2,
    trackingMode: 'auto' as BankrollMode,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '2',
    userId: 'user1',
    date: new Date('2024-01-10'),
    event: 'Team C vs Team D',
    market: 'Under 3.5',
    odds: 1.9,
    stake: 50,
    status: 'lost',
    profit: -4,
    trackingMode: 'auto' as BankrollMode,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
];

describe('bankroll-data', () => {
  describe('getTrackedBets', () => {
    test('should return only tracked bets in auto mode', () => {
      const result = getTrackedBets(mockBets, 'auto');
      expect(result).toHaveLength(2);
      expect(result.every((b) => b.trackingMode === 'auto')).toBe(true);
    });

    test('should return only selected bets in manual mode', () => {
      const result = getTrackedBets(mockBets, 'manual');
      expect(result).toHaveLength(0);
    });

    test('should exclude pending bets in both modes', () => {
      const betsWithPending: Bet[] = [
        ...mockBets,
        {
          id: '3',
          userId: 'user1',
          date: new Date('2024-01-15'),
          event: 'Team E vs Team F',
          market: 'Draw',
          odds: 3.2,
          stake: 75,
          status: 'pending',
          profit: 0,
          trackingMode: 'auto' as BankrollMode,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
      ];
      const result = getTrackedBets(betsWithPending, 'auto');
      expect(result).toHaveLength(2);
      expect(result.every((b) => b.status !== 'pending')).toBe(true);
    });
  });

  describe('calculateKpis', () => {
    test('should return initial bankroll when no bets tracked', () => {
      const result = calculateKpis([], 1000);
      expect(result.totalProfit).toBe(0);
      expect(result.roi).toBe(0);
      expect(result.currentStreak).toBe(0);
      expect(result.currentBankroll).toBe(1000);
    });

    test('should calculate positive profit for winning bets', () => {
      const winningBets = mockBets.filter((b) => b.status === 'won');
      const result = calculateKpis(winningBets, 1000);
      expect(result.totalProfit).toBe(2);
    });

    test('should calculate negative profit for losing bets', () => {
      const losingBets = mockBets.filter((b) => b.status === 'lost');
      const result = calculateKpis(losingBets, 1000);
      expect(result.totalProfit).toBe(-4);
    });

    test('should calculate ROI based on total staked', () => {
      const result = calculateKpis(mockBets, 1000);
      const totalStaked = mockBets.reduce((sum, b) => sum + b.stake, 0);
      expect(result.roi).toBeCloseTo((result.totalProfit / totalStaked) * 100, 1);
    });

    test('should calculate streak correctly for consecutive wins', () => {
      const consecutiveWins: Bet[] = [
        { ...mockBets[0], id: 'w1', status: 'won', profit: 10 },
        { ...mockBets[0], id: 'w2', status: 'won', profit: 15 },
        { ...mockBets[0], id: 'w3', status: 'won', profit: 20 },
      ];
      const result = calculateKpis(consecutiveWins, 1000);
      expect(result.currentStreak).toBe(3);
      expect(result.streakType).toBe('win');
    });

    test('should count only tracked bets for streak calculation', () => {
      const mixedBets: Bet[] = [
        { ...mockBets[0], id: 'm1', status: 'won', profit: 10 },
        { ...mockBets[0], id: 'm2', status: 'won', profit: 15 },
        { ...mockBets[0], id: 'm3', status: 'lost', profit: -5 },
      ];
      const result = calculateKpis(mixedBets, 1000);
      expect(result.currentStreak).toBe(2);
      expect(result.streakType).toBe('win');
    });
  });

  describe('generateCurveData', () => {
    test('should return empty array when no bets provided', () => {
      const result = generateCurveData([], 1000, new Date('2024-01-01'));
      expect(result).toEqual([]);
    });

    test('should start from initial bankroll and accumulate changes', () => {
      const singleBet: Bet[] = [
        { ...mockBets[0], id: 'b1', profit: 50, status: 'won' },
      ];
      const result = generateCurveData(singleBet, 1000, new Date('2024-01-01'));
      expect(result).toHaveLength(1);
      expect(result[0].bankroll).toBe(1050);
      expect(result[0].pnl).toBe(50);
    });

    test('should accumulate multiple bets chronologically', () => {
      const sortedBets: Bet[] = [...mockBets].sort(
        (a, b) => a.date.getTime() - b.date.getTime()
      );
      const result = generateCurveData(sortedBets, 1000, new Date('2024-01-01'));
      // Assert — 1000 + 2 = 1002 → 1002 - 4 = 998
      expect(result.length).toBe(2); // 2 paris = 2 points
      const lastPoint = result[result.length - 1];
      expect(lastPoint.bankroll).toBe(998);
      expect(lastPoint.pnl).toBe(-2);
    });

    test('should handle unsorted bets by sorting them', () => {
      const unsortedBets: Bet[] = [
        { ...mockBets[1] }, // Jan 10
        { ...mockBets[0] }, // Jan 5
      ];
      const result = generateCurveData(unsortedBets, 1000, new Date('2024-01-01'));
      expect(result[0].bankroll).toBe(1002); // First bet (Jan 5) comes first
      expect(result[1].bankroll).toBe(998); // Second bet (Jan 10) comes after
    });
  });
});
