"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollBet, BankrollMode, UserBetSelection } from "@/types/bankroll";

interface BankrollBetsTableProps {
  bets: BankrollBet[];
  mode: BankrollMode;
  selections: UserBetSelection[];
  onBetToggle: (betId: string, selected: boolean) => void;
  onOddsChange: (betId: string, odds: number) => void;
  isLoading?: boolean;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
        <svg
          className="w-5 h-5 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-zinc-300 mb-1">
        Aucun pari disponible
      </p>
      <p className="text-xs text-zinc-600 max-w-xs">
        Aucun pari n&apos;est disponible pour cette période
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="divide-y divide-white/[0.04]">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="px-5 py-4 flex items-center gap-4">
          <div className="w-4 h-4 bg-white/[0.04] rounded animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/[0.06] rounded w-40 animate-pulse" />
            <div className="h-3 bg-white/[0.04] rounded w-24 animate-pulse" />
          </div>
          <div className="w-16 h-6 bg-white/[0.04] rounded animate-pulse" />
          <div className="w-12 h-6 bg-white/[0.04] rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

interface BetRowProps {
  bet: BankrollBet;
  mode: BankrollMode;
  selection: UserBetSelection;
  onToggle: (selected: boolean) => void;
  onOddsChange: (odds: number) => void;
  index: number;
}

function BetRow({ bet, mode, selection, onToggle, onOddsChange, index }: BetRowProps) {
  const [oddsInput, setOddsInput] = useState(
    selection.actualOdds.toString()
  );

  const handleOddsChange = (value: string) => {
    setOddsInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onOddsChange(numValue);
    }
  };

  const handleOddsBlur = () => {
    const numValue = parseFloat(oddsInput);
    if (isNaN(numValue) || numValue <= 0) {
      setOddsInput(bet.recommendedOdds.toString());
    }
  };

  const getStatusBadge = () => {
    const baseClasses = "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider";
    
    switch (bet.result) {
      case "win":
        return (
          <span className={cn(baseClasses, "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20")}>
            <ArrowUpRight size={10} />
            Gagné
          </span>
        );
      case "loss":
        return (
          <span className={cn(baseClasses, "bg-red-500/10 text-red-400 border border-red-500/20")}>
            <ArrowDownRight size={10} />
            Perdu
          </span>
        );
      case "pending":
        return (
          <span className={cn(baseClasses, "bg-amber-500/10 text-amber-400 border border-amber-500/20")}>
            <Clock size={10} />
            En attente
          </span>
        );
    }
  };

  const sportEmoji: Record<string, string> = {
    "Tennis": "🎾",
    "Basketball": "🏀",
    "Football": "⚽"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.02 }}
      className={cn(
        "flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition-colors border-b border-white/[0.04]",
        !selection.selected && mode === "custom" && "opacity-50"
      )}
    >
      {/* Checkbox (custom mode only) */}
      {mode === "custom" && (
        <button
          onClick={() => onToggle(!selection.selected)}
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0",
            selection.selected
              ? "bg-[#F2CB38] border-[#F2CB38]"
              : "border-white/20 hover:border-white/40"
          )}
        >
          {selection.selected && <Check size={12} className="text-black" strokeWidth={3} />}
        </button>
      )}

      {/* Date */}
      <div className="w-20 shrink-0">
        <span className="text-xs text-zinc-500 font-mono">
          {new Date(bet.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit"
          })}
        </span>
      </div>

      {/* Sport & Match */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs">{sportEmoji[bet.sport] || "🏅"}</span>
          <span className="text-xs text-zinc-500">{bet.sport}</span>
        </div>
        <p className="text-sm text-zinc-200 font-medium truncate">
          {bet.match}
        </p>
      </div>

      {/* Odds */}
      <div className="flex flex-col items-center gap-1 shrink-0 w-20">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Cote IA</span>
        <span className="text-sm font-semibold text-zinc-100 tabular-nums">
          {bet.recommendedOdds.toFixed(2)}
        </span>
      </div>

      {/* User Odds (custom mode only) */}
      {mode === "custom" && (
        <div className="flex flex-col items-center gap-1 shrink-0 w-24">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Cote réelle</span>
          <input
            type="number"
            step="0.01"
            min="1"
            max="100"
            value={oddsInput}
            onChange={(e) => handleOddsChange(e.target.value)}
            onBlur={handleOddsBlur}
            className={cn(
              "w-full h-7 px-2 rounded text-sm font-semibold text-center tabular-nums",
              "bg-[#1a1a1a] border transition-colors focus:outline-none",
              parseFloat(oddsInput) !== bet.recommendedOdds
                ? "border-amber-500/40 text-amber-400"
                : "border-white/[0.08] text-zinc-100",
              "focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20"
            )}
          />
        </div>
      )}

      {/* Units */}
      <div className="flex flex-col items-center gap-1 shrink-0 w-16">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Mise</span>
        <span className={cn(
          "inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded text-xs font-bold",
          bet.units === 3
            ? "bg-emerald-500/15 text-emerald-400"
            : bet.units === 2
            ? "bg-[#F2CB38]/15 text-[#F2CB38]"
            : "bg-white/[0.08] text-zinc-300"
        )}>
          {bet.units}u
        </span>
      </div>

      {/* Status */}
      <div className="shrink-0 w-20 flex justify-center">
        {getStatusBadge()}
      </div>

      {/* Profit/Loss */}
      <div className="flex flex-col items-end gap-1 shrink-0 w-20">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">G/P</span>
        <span className={cn(
          "text-sm font-semibold tabular-nums flex items-center gap-0.5",
          bet.profitLoss > 0
            ? "text-emerald-400"
            : bet.profitLoss < 0
            ? "text-red-400"
            : "text-zinc-500"
        )}>
          {bet.result !== "pending" && (
            bet.profitLoss > 0 ? (
              <ArrowUpRight size={12} />
            ) : bet.profitLoss < 0 ? (
              <ArrowDownRight size={12} />
            ) : (
              <Minus size={12} />
            )
          )}
          {bet.result !== "pending" && (
            <>
              {bet.profitLoss >= 0 ? "+" : ""}
              {bet.profitLoss.toFixed(2)}€
            </>
          )}
          {bet.result === "pending" && (
            <span className="text-zinc-600">—</span>
          )}
        </span>
      </div>
    </motion.div>
  );
}

export function BankrollBetsTable({
  bets,
  mode,
  selections,
  onBetToggle,
  onOddsChange,
  isLoading
}: BankrollBetsTableProps) {
  // Sort bets by date (newest first)
  const sortedBets = [...bets].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleToggle = useCallback((betId: string, selected: boolean) => {
    onBetToggle(betId, selected);
  }, [onBetToggle]);

  const handleOddsChange = useCallback((betId: string, odds: number) => {
    onOddsChange(betId, odds);
  }, [onOddsChange]);

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">
            Historique des paris
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {bets.length}
          </span>
        </div>
        {mode === "custom" && (
          <span className="text-xs text-zinc-500">
            Cochez les paris que vous avez joués
          </span>
        )}
      </div>

      {/* Table header */}
      <div className="flex items-center gap-4 px-5 py-2 border-b border-white/[0.05] bg-white/[0.02]">
        {mode === "custom" && (
          <div className="w-5 shrink-0" />
        )}
        <div className="w-20 shrink-0">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Date</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Match</span>
        </div>
        <div className="w-20 shrink-0 text-center">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Cote IA</span>
        </div>
        {mode === "custom" && (
          <div className="w-24 shrink-0 text-center">
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Cote réelle</span>
          </div>
        )}
        <div className="w-16 shrink-0 text-center">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Mise</span>
        </div>
        <div className="w-20 shrink-0 text-center">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Statut</span>
        </div>
        <div className="w-20 shrink-0 text-right">
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">G/P</span>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : sortedBets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {sortedBets.map((bet, index) => {
              const selection = selections.find(s => s.betId === bet.id) || {
                betId: bet.id,
                selected: true,
                actualOdds: bet.recommendedOdds
              };

              return (
                <BetRow
                  key={bet.id}
                  bet={bet}
                  mode={mode}
                  selection={selection}
                  onToggle={(selected) => handleToggle(bet.id, selected)}
                  onOddsChange={(odds) => handleOddsChange(bet.id, odds)}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
