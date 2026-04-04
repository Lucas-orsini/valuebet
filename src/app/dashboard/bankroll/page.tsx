"use client";

import { useState, useMemo, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BankrollHeader } from "@/components/dashboard/bankroll/BankrollHeader";
import { BankrollKpis } from "@/components/dashboard/bankroll/BankrollKpis";
import { BankrollCurve } from "@/components/dashboard/bankroll/BankrollCurve";
import { BetsTrackingTable } from "@/components/dashboard/bankroll/BetsTrackingTable";
import {
  MOCK_BETS_TRACKING,
  BANKROLL_CURVE_DATA,
} from "@/lib/bankroll-data";
import type { BankrollMode, BankrollKpi, CurvePoint } from "@/lib/bankroll-data";

const DEFAULT_INITIAL_BANKROLL = 1000;

export default function BankrollPage() {
  const [initialBankroll, setInitialBankroll] = useState(DEFAULT_INITIAL_BANKROLL);
  const [mode, setMode] = useState<BankrollMode>("auto");
  const [selectedBetIds, setSelectedBetIds] = useState<Set<string>>(() => {
    return new Set(MOCK_BETS_TRACKING.filter((b) => b.isTracked).map((b) => b.id));
  });
  const [customOdds, setCustomOdds] = useState<Record<string, number>>({});

  const handleBankrollChange = useCallback((value: number) => {
    setInitialBankroll(value);
  }, []);

  const handleModeChange = useCallback((newMode: BankrollMode) => {
    setMode(newMode);
  }, []);

  const handleBetToggle = useCallback((betId: string, isSelected: boolean) => {
    setSelectedBetIds((prev) => {
      const next = new Set(prev);
      if (isSelected) {
        next.add(betId);
      } else {
        next.delete(betId);
      }
      return next;
    });
  }, []);

  const handleOddsChange = useCallback((betId: string, odds: number) => {
    setCustomOdds((prev) => ({
      ...prev,
      [betId]: odds,
    }));
  }, []);

  const kpis: BankrollKpi = useMemo(() => {
    const trackedBets = MOCK_BETS_TRACKING.filter((b) => b.isTracked);
    const settledBets = trackedBets.filter((b) => b.result !== "pending");
    
    const totalPnL = settledBets.reduce((acc, bet) => {
      const odds = customOdds[bet.id] || bet.aiOdds;
      if (bet.result === "win") {
        return acc + (odds - 1) * bet.units;
      }
      return acc - bet.units;
    }, 0);
    
    const wonBets = settledBets.filter((b) => b.result === "win").length;
    const winRate = settledBets.length > 0 ? (wonBets / settledBets.length) * 100 : 0;
    const totalStaked = settledBets.reduce((acc, b) => acc + b.units, 0);
    const roi = totalStaked > 0 ? (totalPnL / totalStaked) * 100 : 0;
    
    // Calculate streak
    let streak: { type: "W" | "L"; count: number } = { type: "W", count: 0 };
    const sortedBets = [...settledBets].reverse();
    if (sortedBets.length > 0) {
      let currentStreak = 1;
      const firstResult = sortedBets[0].result;
      for (let i = 1; i < sortedBets.length; i++) {
        if (sortedBets[i].result === firstResult) {
          currentStreak++;
        } else {
          break;
        }
      }
      streak = { type: firstResult === "win" ? "W" : "L", count: currentStreak };
    }
    
    return {
      initialBankroll,
      currentBankroll: initialBankroll + totalPnL,
      profitLoss: totalPnL,
      roi,
      betsTracked: trackedBets.length,
      streak,
    };
  }, [initialBankroll, customOdds]);

  const curveData: CurvePoint[] = useMemo(() => {
    return BANKROLL_CURVE_DATA;
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Bankroll Tracker"
          subtitle="Suivez l'évolution de votre bankroll en temps réel"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            {/* Header with bankroll input and mode toggle */}
            <BankrollHeader
              initialBankroll={initialBankroll}
              mode={mode}
              onBankrollChange={handleBankrollChange}
              onModeChange={handleModeChange}
            />

            {/* KPI Cards */}
            <BankrollKpis kpis={kpis} />

            {/* Bankroll Curve */}
            <BankrollCurve data={curveData} initialBankroll={initialBankroll} />

            {/* Bets Tracking Table */}
            <BetsTrackingTable
              bets={MOCK_BETS_TRACKING}
              mode={mode}
              selectedBetIds={selectedBetIds}
              customOdds={customOdds}
              onBetToggle={handleBetToggle}
              onOddsChange={handleOddsChange}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 px-6 py-3 border-t border-white/[0.06] bg-[#0a0a0a]">
          <div className="flex items-center justify-between text-[11px] text-zinc-600">
            <span>© 2026 Haurus · Tous droits réservés</span>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span>·</span>
              <span>Mise à jour il y a 2 min</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
