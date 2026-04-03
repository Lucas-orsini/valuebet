"use client";

import { useState, useMemo, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BankrollHeader } from "@/components/dashboard/bankroll/BankrollHeader";
import { BankrollKpis } from "@/components/dashboard/bankroll/BankrollKpis";
import { BankrollCurve } from "@/components/dashboard/bankroll/BankrollCurve";
import { BetsTrackingTable } from "@/components/dashboard/bankroll/BetsTrackingTable";
import {
  MOCK_BETS,
  generateCurveData,
  calculateKpis,
  getTrackedBets,
} from "@/lib/bankroll-data";
import type { BankrollMode, BankrollKpi, CurvePoint } from "@/lib/bankroll-data";

const DEFAULT_INITIAL_BANKROLL = 1000;

export default function BankrollPage() {
  const [initialBankroll, setInitialBankroll] = useState(DEFAULT_INITIAL_BANKROLL);
  const [mode, setMode] = useState<BankrollMode>("auto");
  const [selectedBetIds, setSelectedBetIds] = useState<Set<string>>(() => {
    return new Set(MOCK_BETS.filter((b) => b.isTracked).map((b) => b.id));
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
    return calculateKpis(MOCK_BETS, initialBankroll, mode, selectedBetIds);
  }, [initialBankroll, mode, selectedBetIds]);

  const curveData: CurvePoint[] = useMemo(() => {
    const trackedBets = getTrackedBets(MOCK_BETS, mode, selectedBetIds);
    return generateCurveData(trackedBets, initialBankroll);
  }, [mode, selectedBetIds, initialBankroll]);

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
              bets={MOCK_BETS}
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
