"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { BankrollSettings } from "../BankrollSettings";
import { BankrollKPIs } from "./BankrollKPIs";
import { BankrollCurve } from "./BankrollCurve";
import { BankrollTable } from "./BankrollTable";
import { BANKROLL_BETS, BANKROLL_CURVE_DATA } from "@/lib/dashboard-data";
import type { BankrollMode, BankrollCustomBet, BankrollKPIs as BankrollKPIsType, BankrollPoint, BankrollStreak } from "@/lib/dashboard-data";

export function BankrollTrackerContent() {
  // State
  const [initialBankroll, setInitialBankroll] = useState(500);
  const [mode, setMode] = useState<BankrollMode>('auto');

  // Initialize custom bets with all played by default
  const [customBets, setCustomBets] = useState<BankrollCustomBet[]>(() =>
    BANKROLL_BETS.map((bet) => ({
      ...bet,
      played: true,
      actualOdds: bet.recommendedOdds,
    }))
  );

  // Calculate P&L based on mode
  const calculateProfitLoss = useCallback((bankroll: number, bets: BankrollCustomBet[]) => {
    return bets.reduce((total, bet) => {
      if (!bet.played) return total;
      
      if (bet.result === 'win') {
        return total + (bet.actualOdds - 1) * bet.units;
      } else if (bet.result === 'lose') {
        return total - bet.units;
      }
      // push: no change
      return total;
    }, 0);
  }, []);

  // Calculate current bankroll
  const currentBankroll = useMemo(() => {
    const profitLoss = calculateProfitLoss(initialBankroll, customBets);
    return initialBankroll + profitLoss;
  }, [initialBankroll, customBets, calculateProfitLoss]);

  // Calculate ROI
  const roi = useMemo(() => {
    if (initialBankroll === 0) return 0;
    const profitLoss = currentBankroll - initialBankroll;
    return (profitLoss / initialBankroll) * 100;
  }, [initialBankroll, currentBankroll]);

  // Calculate streak
  const streak: BankrollStreak = useMemo(() => {
    const sortedBets = [...customBets].reverse();
    let currentStreak: BankrollStreak = { type: 'W', count: 0 };
    
    for (const bet of sortedBets) {
      if (!bet.played) continue;
      
      if (bet.result === 'win') {
        if (currentStreak.type === 'W') {
          currentStreak.count++;
        } else {
          break;
        }
      } else if (bet.result === 'lose') {
        if (currentStreak.type === 'L') {
          currentStreak.count++;
        } else {
          currentStreak = { type: 'L', count: 1 };
        }
      }
      // push doesn't affect streak
    }
    
    return currentStreak;
  }, [customBets]);

  // Count played bets
  const playedBetsCount = useMemo(() => {
    return customBets.filter(b => b.played).length;
  }, [customBets]);

  // KPIs data
  const kpis: BankrollKPIsType = {
    currentBankroll,
    profitLoss: currentBankroll - initialBankroll,
    roi,
    streak,
    betsTracked: playedBetsCount,
  };

  // Curve data based on mode
  const curveData: BankrollPoint[] = useMemo(() => {
    if (mode === 'auto') {
      return BANKROLL_CURVE_DATA;
    }

    // Recalculate for custom mode
    let runningBankroll = initialBankroll;
    const playedBets = customBets.filter(b => b.played);
    
    return BANKROLL_CURVE_DATA.map((point: BankrollPoint, index: number) => {
      const bet = playedBets[index];
      if (bet) {
        if (bet.result === 'win') {
          runningBankroll = runningBankroll + (bet.actualOdds - 1) * bet.units;
        } else if (bet.result === 'lose') {
          runningBankroll = runningBankroll - bet.units;
        }
      }
      return {
        ...point,
        bankroll: runningBankroll,
      };
    });
  }, [mode, initialBankroll, customBets]);

  // Handlers
  const handleBankrollChange = useCallback((value: number) => {
    setInitialBankroll(value);
  }, []);

  const handleModeChange = useCallback((newMode: BankrollMode) => {
    setMode(newMode);
  }, []);

  const handleToggleBet = useCallback((id: string, played: boolean) => {
    setCustomBets((prev) =>
      prev.map((bet: BankrollCustomBet) =>
        bet.id === id ? { ...bet, played } : bet
      )
    );
  }, []);

  const handleOddsChange = useCallback((id: string, odds: number) => {
    setCustomBets((prev) =>
      prev.map((bet: BankrollCustomBet) =>
        bet.id === id ? { ...bet, actualOdds: odds } : bet
      )
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Settings */}
      <BankrollSettings
        initialBankroll={initialBankroll}
        mode={mode}
        onBankrollChange={handleBankrollChange}
        onModeChange={handleModeChange}
      />

      {/* KPIs */}
      <BankrollKPIs data={kpis} />

      {/* Curve */}
      <BankrollCurve
        data={curveData}
        initialBankroll={initialBankroll}
        mode={mode}
        customBets={customBets}
      />

      {/* Table */}
      <BankrollTable
        bets={BANKROLL_BETS}
        customBets={customBets}
        mode={mode}
        onToggleBet={handleToggleBet}
        onOddsChange={handleOddsChange}
      />
    </motion.div>
  );
}
