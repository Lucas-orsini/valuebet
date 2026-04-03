"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, TrendingUp, Target, Flame, ChevronDown } from "lucide-react";
import { BankrollKpiCards } from "./BankrollKpiCards";
import { BankrollChart } from "./BankrollChart";
import { TrackedBetsTable } from "./TrackedBetsTable";
import { cn } from "@/lib/utils";
import type { BankrollMode, BankrollKPIs, TrackedBet, UserBetSettings, BankrollPoint } from "@/lib/dashboard-data";

// Generate 35 days of mock bankroll history
function generateBankrollHistory(startingBankroll: number, days: number): BankrollPoint[] {
  const data: BankrollPoint[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  let bankroll = startingBankroll;
  let flatBet = startingBankroll;
  
  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate daily P&L (realistic tennis betting returns)
    const dailyChange = (Math.random() - 0.45) * 40; // Slight positive bias
    bankroll = Math.max(800, bankroll + dailyChange);
    
    // Flat bet grows linearly
    flatBet = startingBankroll + (i * 2.5);
    
    data.push({
      date: date.toISOString().split("T")[0],
      bankroll: Number(bankroll.toFixed(2)),
      flatBet: Number(flatBet.toFixed(2)),
    });
  }
  
  return data;
}

// Generate mock tracked bets
function generateTrackedBets(): TrackedBet[] {
  const players = [
    { name: "Jannik Sinner", opponent: "Daniil Medvedev" },
    { name: "Carlos Alcaraz", opponent: "Alexander Zverev" },
    { name: "Taylor Fritz", opponent: "Grigor Dimitrov" },
    { name: "Holger Rune", opponent: "Casper Ruud" },
    { name: "Novak Djokovic", opponent: "Stefanos Tsitsipas" },
    { name: "Daniil Medvedev", opponent: "Alex de Minaur" },
    { name: "Andrey Rublev", opponent: "Ben Shelton" },
    { name: "Tommy Paul", opponent: "Frances Tiafoe" },
  ];
  
  const tournaments = ["Miami Open", "Monte Carlo Masters", "Roland Garros", "Wimbledon", "US Open", "ATP Finals"];
  const selections = ["Victoire", "Plus de 20.5 jeux", "2-0 Set", "Handicap +3.5"];
  
  const bets: TrackedBet[] = [];
  
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (12 - i));
    
    const player = players[i % players.length];
    const odds = 1.5 + Math.random() * 1.8;
    const units = Math.floor(Math.random() * 3) + 1;
    
    // Random status with weighted distribution
    const rand = Math.random();
    let status: TrackedBet["status"];
    let result: TrackedBet["result"];
    
    if (rand < 0.55) {
      status = "won";
      result = "win";
    } else if (rand < 0.85) {
      status = "lost";
      result = "lose";
    } else if (rand < 0.95) {
      status = "pending";
      result = undefined;
    } else {
      status = "void";
      result = "lose";
    }
    
    bets.push({
      id: `bet-${i + 1}`,
      date: date.toISOString().split("T")[0],
      match: `${player.name} vs ${player.opponent}`,
      selection: selections[Math.floor(Math.random() * selections.length)],
      recommendedOdds: Number(odds.toFixed(2)),
      units,
      status,
      result,
      actualOdds: status === "pending" ? undefined : Number((odds + (Math.random() - 0.5) * 0.2).toFixed(2)),
    });
  }
  
  return bets;
}

const DEFAULT_STARTING_BANKROLL = 1000;

export function BankrollTrackerContent() {
  const [mode, setMode] = useState<BankrollMode>("auto");
  const [startingBankroll, setStartingBankroll] = useState<number>(DEFAULT_STARTING_BANKROLL);
  const [betSettings, setBetSettings] = useState<UserBetSettings[]>(() => {
    const bets = generateTrackedBets();
    return bets.map((bet) => ({
      betId: bet.id,
      isTracked: true,
      customOdds: bet.recommendedOdds,
    }));
  });
  
  const trackedBets = useMemo(() => generateTrackedBets(), []);
  const bankrollHistory = useMemo(
    () => generateBankrollHistory(startingBankroll, 35),
    [startingBankroll]
  );
  
  // Calculate KPIs based on mode and settings
  const kpis = useMemo((): BankrollKPIs => {
    const effectiveBets = mode === "auto" 
      ? trackedBets 
      : trackedBets.filter((bet) => {
          const setting = betSettings.find((s) => s.betId === bet.id);
          return setting?.isTracked ?? false;
        });
    
    const settledBets = effectiveBets.filter((b) => b.status !== "pending");
    
    // Calculate profit/loss
    let profit = 0;
    let wins = 0;
    let losses = 0;
    
    settledBets.forEach((bet) => {
      if (bet.status === "won") {
        const odds = mode === "custom" 
          ? (betSettings.find((s) => s.betId === bet.id)?.customOdds ?? bet.recommendedOdds)
          : bet.actualOdds ?? bet.recommendedOdds;
        profit += (odds - 1) * bet.units;
        wins++;
      } else if (bet.status === "lost" || bet.status === "void") {
        profit -= bet.status === "void" ? 0 : bet.units;
        losses++;
      }
    });
    
    const currentBankroll = startingBankroll + profit;
    const roi = startingBankroll > 0 ? (profit / startingBankroll) * 100 : 0;
    
    // Calculate streak
    const sortedBets = [...effectiveBets].reverse();
    let streak = 0;
    let streakType: "W" | "L" | "neutral" = "neutral";
    
    for (const bet of sortedBets) {
      if (bet.status === "pending") continue;
      if (bet.status === "won") {
        if (streakType === "L" || streakType === "neutral") {
          streak = 1;
          streakType = "W";
        } else {
          streak++;
        }
      } else {
        if (streakType === "W" || streakType === "neutral") {
          streak = 1;
          streakType = "L";
        } else {
          streak++;
        }
      }
    }
    
    return {
      currentBankroll: Number(currentBankroll.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      roi: Number(roi.toFixed(1)),
      streak,
      streakType,
      betsTracked: effectiveBets.length,
    };
  }, [mode, trackedBets, betSettings, startingBankroll]);
  
  const handleBetToggle = (betId: string, isTracked: boolean) => {
    setBetSettings((prev) =>
      prev.map((s) => (s.betId === betId ? { ...s, isTracked } : s))
    );
  };
  
  const handleOddsChange = (betId: string, customOdds: number) => {
    setBetSettings((prev) =>
      prev.map((s) => (s.betId === betId ? { ...s, customOdds } : s))
    );
  };
  
  const handleBankrollChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setStartingBankroll(numValue);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        {/* Header with bankroll input and mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111] border border-white/[0.07] rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
                <Wallet size={18} className="text-[#F2CB38]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">
                  Configuration du tracker
                </h2>
                <p className="text-xs text-zinc-500">
                  Définissez votre bankroll de départ et le mode de suivi
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Bankroll input */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-zinc-500 uppercase tracking-wider">
                Bankroll
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={startingBankroll}
                  onChange={(e) => handleBankrollChange(e.target.value)}
                  min="1"
                  step="50"
                  className="w-28 h-9 px-3 pr-8 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-100 font-semibold tabular-nums focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  €
                </span>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0a0a0a] border border-white/[0.08]">
              <ModeButton
                label="Automatique"
                active={mode === "auto"}
                onClick={() => setMode("auto")}
              />
              <ModeButton
                label="Personnalisé"
                active={mode === "custom"}
                onClick={() => setMode("custom")}
              />
            </div>
          </div>
        </motion.div>

        {/* Mode description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "px-4 py-2.5 rounded-lg text-xs",
                mode === "auto"
                  ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                  : "bg-purple-500/10 border border-purple-500/20 text-purple-400"
              )}
            >
              {mode === "auto" ? (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Mode automatique : tous les paris IA sont automatiquement
                  ajoutés au calcul de votre bankroll.
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  Mode personnalisé : cochez les paris que vous avez vraiment
                  joués et ajustez vos cotes obtenues.
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* KPI Cards */}
        <BankrollKpiCards kpis={kpis} />

        {/* Chart */}
        <BankrollChart data={bankrollHistory} mode={mode} />

        {/* Tracked bets table */}
        <TrackedBetsTable
          bets={trackedBets}
          mode={mode}
          betSettings={betSettings}
          onBetToggle={handleBetToggle}
          onOddsChange={handleOddsChange}
        />
      </div>
    </div>
  );
}

function ModeButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
        active
          ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20 shadow-sm"
          : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}
