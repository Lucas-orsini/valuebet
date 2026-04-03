"use client";

import { useState, useEffect, useCallback } from "react";
import { BankrollHeader } from "./bankroll/BankrollHeader";
import { BankrollChart } from "./bankroll/BankrollChart";
import { BankrollKpis } from "./bankroll/BankrollKpis";
import { BetSelector } from "./bankroll/BetSelector";
import { BetHistorySummary } from "./bankroll/BetHistorySummary";
import {
  MOCK_BETS,
  STORAGE_KEYS,
  generateBankrollCurve,
  calculateCurrentBankroll,
  calculateProfit,
  calculateROI,
  calculateStreak,
  calculateWinRate,
} from "@/lib/bankroll-data";
import type {
  BankrollConfig,
  TrackedBet,
  Bet,
  Mode,
} from "@/lib/bankroll-data";

const DEFAULT_CONFIG: BankrollConfig = {
  initialBankroll: 1000,
  mode: "auto",
};

export function BankrollTracker() {
  const [config, setConfig] = useState<BankrollConfig>(DEFAULT_CONFIG);
  const [trackedBets, setTrackedBets] = useState<TrackedBet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(STORAGE_KEYS.BANKROLL_CONFIG);
      const savedTracked = localStorage.getItem(STORAGE_KEYS.TRACKED_BETS);

      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }

      if (savedTracked) {
        setTrackedBets(JSON.parse(savedTracked));
      } else {
        // Initialize tracked bets with all bets as "played" for auto mode
        const initialTracked: TrackedBet[] = MOCK_BETS.map((bet) => ({
          betId: bet.id,
          played: true,
        }));
        setTrackedBets(initialTracked);
      }
    } catch {
      // Ignore localStorage errors
    }

    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEYS.BANKROLL_CONFIG, JSON.stringify(config));
      localStorage.setItem(STORAGE_KEYS.TRACKED_BETS, JSON.stringify(trackedBets));
    } catch {
      // Ignore localStorage errors
    }
  }, [config, trackedBets, isLoaded]);

  // Calculate derived values
  const currentBankroll = calculateCurrentBankroll(
    MOCK_BETS,
    trackedBets,
    config.initialBankroll,
    config.mode
  );

  const profit = calculateProfit(
    MOCK_BETS,
    trackedBets,
    config.initialBankroll,
    config.mode
  );

  const roi = calculateROI(
    MOCK_BETS,
    trackedBets,
    config.initialBankroll,
    config.mode
  );

  const streak = calculateStreak(MOCK_BETS, trackedBets, config.mode);
  const winRate = calculateWinRate(MOCK_BETS, trackedBets, config.mode);

  const bankrollSnapshots = generateBankrollCurve(
    MOCK_BETS,
    trackedBets,
    config.initialBankroll,
    config.mode
  );

  // Handlers
  const handleConfigChange = useCallback((newConfig: BankrollConfig) => {
    setConfig(newConfig);
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    const initialTracked: TrackedBet[] = MOCK_BETS.map((bet) => ({
      betId: bet.id,
      played: true,
    }));
    setTrackedBets(initialTracked);
  }, []);

  const handleTrackedBetChange = useCallback(
    (betId: string, played: boolean, customOdds?: number) => {
      setTrackedBets((prev) => {
        const existing = prev.find((t) => t.betId === betId);
        if (existing) {
          return prev.map((t) =>
            t.betId === betId
              ? { ...t, played, customOdds: customOdds ?? t.customOdds }
              : t
          );
        }
        return [...prev, { betId, played, customOdds }];
      });
    },
    []
  );

  const handleBetOddsChange = useCallback(
    (betId: string, customOdds: number) => {
      setTrackedBets((prev) => {
        const existing = prev.find((t) => t.betId === betId);
        if (existing) {
          return prev.map((t) =>
            t.betId === betId ? { ...t, customOdds } : t
          );
        }
        return [...prev, { betId, played: true, customOdds }];
      });
    },
    []
  );

  if (!isLoaded) {
    return (
      <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#F2CB38]/30 border-t-[#F2CB38] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Sidebar - inline to avoid circular dependency */}
      <aside className="w-[220px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] px-3 py-4 shrink-0">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#F2CB38]/80 flex items-center justify-center shadow-[0_0_16px_rgba(242,203,56,0.25)]">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">
            Haurus
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1">
          {[
            { href: "/dashboard", label: "Tableau de bord", icon: "LayoutDashboard" },
            { href: "/dashboard/bets", label: "Mes paris", icon: "Trophy" },
            { href: "/dashboard/bankroll", label: "Bankroll", icon: "Wallet", active: true },
            { href: "/dashboard/history", label: "Historique", icon: "ScrollText" },
            { href: "/dashboard/analytics", label: "Analyses", icon: "BarChart3" },
            { href: "/dashboard/settings", label: "Paramètres", icon: "Settings" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-2 h-9 rounded-lg text-sm transition-all duration-150 ${
                item.active
                  ? "bg-white/[0.08] text-zinc-100 font-medium border-l-2 border-[#F2CB38]"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              }`}
            >
              <span className={item.active ? "text-[#F2CB38]" : ""}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors border-t border-white/[0.05] pt-3 mt-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-[11px] text-zinc-200 font-medium shrink-0">
            TM
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-zinc-200 truncate">
              Thomas Martin
            </span>
            <span className="text-[11px] text-zinc-500 truncate">Pro</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-14 px-6 border-b border-white/[0.06] shrink-0 bg-[#0a0a0a]">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-sm font-semibold text-zinc-100">Bankroll Tracker</h1>
            <p className="text-xs text-zinc-500">Suivez vos performances en temps réel</p>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            {/* Config Header */}
            <BankrollHeader
              config={config}
              onConfigChange={handleConfigChange}
              onReset={handleReset}
            />

            {/* KPIs */}
            <BankrollKpis
              currentBankroll={currentBankroll}
              profit={profit}
              roi={roi}
              winRate={winRate}
              streak={streak}
            />

            {/* Chart & Bet Selector - side by side on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Chart - 2/3 width */}
              <div className="lg:col-span-2">
                <BankrollChart snapshots={bankrollSnapshots} />
              </div>

              {/* Bet Selector - 1/3 width (only in custom mode) */}
              <div className={config.mode === "custom" ? "lg:col-span-1" : "hidden"}>
                <BetSelector
                  bets={MOCK_BETS}
                  trackedBets={trackedBets}
                  onBetChange={handleTrackedBetChange}
                  onOddsChange={handleBetOddsChange}
                />
              </div>
            </div>

            {/* Bet History Summary */}
            <BetHistorySummary bets={MOCK_BETS} trackedBets={trackedBets} />
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
