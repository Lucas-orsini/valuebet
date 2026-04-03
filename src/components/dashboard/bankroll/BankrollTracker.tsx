"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, Flame, Wallet, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { BankrollChart } from "./BankrollChart";
import { BankrollBetsTable } from "./BankrollBetsTable";
import {
  calculateBankrollCurve,
  calculateBankrollKPIs,
  calculateBankrollStats
} from "@/lib/bankroll-calculations";
import { MOCK_BETS, getDefaultSelections, DEFAULT_INITIAL_BANKROLL } from "@/lib/mock-bets-data";
import type { BankrollMode, UserBetSelection, BankrollKPIs, BankrollDataPoint } from "@/types/bankroll";

interface KpiCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon: React.ReactNode;
  trend?: number;
  isPositive?: boolean;
  isNeutral?: boolean;
}

function KpiCard({ label, value, suffix, icon, trend, isPositive, isNeutral }: KpiCardProps) {
  const displayValue = typeof value === "number" ? value.toLocaleString("fr-FR") : value;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.12] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            {label}
          </span>
        </div>
        {trend !== undefined && !isNeutral && (
          <span className={cn(
            "flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full",
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          )}>
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {isPositive ? "+" : ""}{trend.toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-zinc-100 tracking-tight tabular-nums">
        {displayValue}
        {suffix && <span className="text-lg font-medium text-zinc-500 ml-0.5">{suffix}</span>}
      </p>
    </motion.div>
  );
}

export function BankrollTracker() {
  const [mode, setMode] = useState<BankrollMode>("auto");
  const [initialBankroll, setInitialBankroll] = useState(DEFAULT_INITIAL_BANKROLL);
  const [bankrollInput, setBankrollInput] = useState(DEFAULT_INITIAL_BANKROLL.toString());
  const [selections, setSelections] = useState<UserBetSelection[]>(() =>
    getDefaultSelections(MOCK_BETS)
  );
  const [bankrollInputError, setBankrollInputError] = useState<string | null>(null);

  // Validate and update bankroll
  const handleBankrollChange = useCallback((value: string) => {
    setBankrollInput(value);
    setBankrollInputError(null);

    const numValue = parseFloat(value);
    if (value === "") {
      setBankrollInputError("La bankroll initiale est requise");
    } else if (isNaN(numValue)) {
      setBankrollInputError("Veuillez entrer un nombre valide");
    } else if (numValue <= 0) {
      setBankrollInputError("La bankroll doit être supérieure à 0");
    } else {
      setInitialBankroll(numValue);
    }
  }, []);

  const handleBankrollBlur = useCallback(() => {
    if (!bankrollInputError) {
      setBankrollInput(initialBankroll.toString());
    }
  }, [bankrollInputError, initialBankroll]);

  // Handle bet toggle
  const handleBetToggle = useCallback((betId: string, selected: boolean) => {
    setSelections(prev =>
      prev.map(s =>
        s.betId === betId ? { ...s, selected } : s
      )
    );
  }, []);

  // Handle odds change
  const handleOddsChange = useCallback((betId: string, odds: number) => {
    setSelections(prev =>
      prev.map(s =>
        s.betId === betId ? { ...s, actualOdds: odds } : s
      )
    );
  }, []);

  // Calculate KPIs
  const kpis = useMemo<BankrollKPIs>(() => {
    return calculateBankrollKPIs(MOCK_BETS, initialBankroll, selections);
  }, [initialBankroll, selections]);

  // Calculate chart data
  const chartData = useMemo<BankrollDataPoint[]>(() => {
    return calculateBankrollCurve(MOCK_BETS, initialBankroll, selections);
  }, [initialBankroll, selections]);

  // Calculate stats
  const stats = useMemo(() => {
    return calculateBankrollStats(MOCK_BETS, selections);
  }, [selections]);

  return (
    <div className="space-y-6">
      {/* Bankroll Input */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="initial-bankroll" className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider mb-2">
              <Wallet size={12} />
              Bankroll initiale
            </label>
            <div className="relative">
              <input
                id="initial-bankroll"
                type="number"
                min="1"
                step="1"
                value={bankrollInput}
                onChange={(e) => handleBankrollChange(e.target.value)}
                onBlur={handleBankrollBlur}
                className={cn(
                  "w-full h-11 px-4 pr-12 rounded-lg bg-[#0a0a0a] border text-lg font-semibold text-zinc-100 placeholder:text-zinc-600 transition-colors focus:outline-none focus:ring-2",
                  bankrollInputError
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                    : "border-white/[0.08] focus:border-[#F2CB38]/50 focus:ring-[#F2CB38]/20"
                )}
                placeholder="1000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                €
              </span>
            </div>
            {bankrollInputError && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <Info size={10} />
                {bankrollInputError}
              </p>
            )}
          </div>

          {/* Mode Toggle */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">
              Mode de suivi
            </span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0a0a0a] border border-white/[0.08]">
              <button
                onClick={() => setMode("auto")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  mode === "auto"
                    ? "bg-[#F2CB38] text-black shadow-[0_0_16px_rgba(242,203,56,0.3)]"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                Automatique
              </button>
              <button
                onClick={() => setMode("custom")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  mode === "custom"
                    ? "bg-[#F2CB38] text-black shadow-[0_0_16px_rgba(242,203,56,0.3)]"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                Personnalisé
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          label="Bankroll actuelle"
          value={kpis.currentBankroll.toFixed(0)}
          suffix="€"
          icon={<Wallet size={16} className="text-[#F2CB38]" />}
          isPositive={kpis.profitLoss >= 0}
          isNeutral={kpis.profitLoss === 0}
        />
        <KpiCard
          label="P&L"
          value={(kpis.profitLoss >= 0 ? "+" : "") + kpis.profitLoss.toFixed(2)}
          suffix="€"
          icon={<TrendingUp size={16} className="text-[#F2CB38]" />}
          isPositive={kpis.profitLoss >= 0}
          isNeutral={kpis.profitLoss === 0}
        />
        <KpiCard
          label="ROI"
          value={(kpis.roi >= 0 ? "+" : "") + kpis.roi.toFixed(1)}
          suffix="%"
          icon={<Target size={16} className="text-[#F2CB38]" />}
          trend={kpis.roi}
          isPositive={kpis.roi >= 0}
          isNeutral={kpis.roi === 0}
        />
        <KpiCard
          label="Série actuelle"
          value={kpis.currentStreak}
          icon={<Flame size={16} className="text-[#F2CB38]" />}
          isPositive={true}
          isNeutral={kpis.currentStreak === 0}
        />
        <KpiCard
          label="Paris suivis"
          value={kpis.betsFollowed}
          icon={
            <svg className="w-4 h-4 text-[#F2CB38]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          isPositive={true}
          isNeutral={true}
        />
        <KpiCard
          label="Win rate"
          value={kpis.winRate.toFixed(1)}
          suffix="%"
          icon={<Target size={16} className="text-[#F2CB38]" />}
          isPositive={kpis.winRate >= 50}
          isNeutral={kpis.winRate === 0}
        />
      </div>

      {/* Chart & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="xl:col-span-3">
          <BankrollChart data={chartData} />
        </div>

        {/* Stats Card */}
        <div className="xl:col-span-2">
          <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5 h-full">
            <h3 className="text-sm font-semibold text-zinc-100 mb-4">
              Statistiques
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-sm text-zinc-500">Paris totaux</span>
                <span className="text-sm font-semibold text-zinc-200">{stats.totalBets}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-sm text-zinc-500">Gagnés</span>
                <span className="text-sm font-semibold text-emerald-400">{stats.wonBets}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-sm text-zinc-500">Perdus</span>
                <span className="text-sm font-semibold text-red-400">{stats.lostBets}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-sm text-zinc-500">En attente</span>
                <span className="text-sm font-semibold text-amber-400">{stats.pendingBets}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-sm text-zinc-500">Mise totale</span>
                <span className="text-sm font-semibold text-zinc-200">{stats.totalUnits}u</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-500">Profit/Perte</span>
                <span className={cn(
                  "text-sm font-bold tabular-nums",
                  stats.totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                  {stats.totalProfitLoss >= 0 ? "+" : ""}{stats.totalProfitLoss.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bets Table */}
      <BankrollBetsTable
        bets={MOCK_BETS}
        mode={mode}
        selections={selections}
        onBetToggle={handleBetToggle}
        onOddsChange={handleOddsChange}
      />
    </div>
  );
}
