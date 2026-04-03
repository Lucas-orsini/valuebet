"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Trophy,
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  Minus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackedBet, BankrollMode, UserBetSettings } from "@/lib/dashboard-data";

interface TrackedBetsTableProps {
  bets: TrackedBet[];
  mode: BankrollMode;
  betSettings: UserBetSettings[];
  onBetToggle?: (betId: string, isTracked: boolean) => void;
  onOddsChange?: (betId: string, customOdds: number) => void;
}

function StatusBadge({
  status,
  result,
}: {
  status: TrackedBet["status"];
  result?: TrackedBet["result"];
}) {
  const config = {
    won: {
      icon: CheckCircle2,
      bg: "bg-green-500/15",
      text: "text-green-400",
      border: "border-green-500/20",
      label: "Gagné",
    },
    lost: {
      icon: XCircle,
      bg: "bg-red-500/15",
      text: "text-red-400",
      border: "border-red-500/20",
      label: "Perdu",
    },
    void: {
      icon: Minus,
      bg: "bg-zinc-500/15",
      text: "text-zinc-400",
      border: "border-zinc-500/20",
      label: "Annulé",
    },
    pending: {
      icon: Clock,
      bg: "bg-yellow-500/15",
      text: "text-yellow-400",
      border: "border-yellow-500/20",
      label: "En attente",
    },
  };

  const c = config[status];
  const Icon = c.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider border",
        c.bg,
        c.text,
        c.border
      )}
    >
      <Icon size={10} />
      {c.label}
    </span>
  );
}

function BetRow({
  bet,
  mode,
  settings,
  onToggle,
  onOddsChange,
  index,
}: {
  bet: TrackedBet;
  mode: BankrollMode;
  settings?: UserBetSettings;
  onToggle?: (betId: string, isTracked: boolean) => void;
  onOddsChange?: (betId: string, customOdds: number) => void;
  index: number;
}) {
  const [localOdds, setLocalOdds] = useState(
    settings?.customOdds ?? bet.recommendedOdds
  );
  const [isEditing, setIsEditing] = useState(false);

  const isTracked = settings?.isTracked ?? true;
  const effectiveOdds = isTracked ? localOdds : bet.recommendedOdds;

  // Calculate gain/loss
  let gainLoss: number | null = null;
  if (bet.status === "won") {
    gainLoss = (effectiveOdds - 1) * bet.units;
  } else if (bet.status === "lost") {
    gainLoss = -bet.units;
  } else if (bet.status === "void") {
    gainLoss = 0;
  }

  const handleOddsBlur = () => {
    setIsEditing(false);
    if (onOddsChange && localOdds !== bet.recommendedOdds) {
      onOddsChange(bet.id, localOdds);
    }
  };

  const handleOddsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOddsBlur();
    } else if (e.key === "Escape") {
      setLocalOdds(settings?.customOdds ?? bet.recommendedOdds);
      setIsEditing(false);
    }
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ delay: index * 0.03 }}
      className={cn(
        "hover:bg-white/[0.02] transition-colors",
        mode === "custom" && !isTracked && "opacity-50"
      )}
    >
      {/* Custom mode checkbox */}
      {mode === "custom" && (
        <td className="px-5 py-4">
          <button
            onClick={() => onToggle?.(bet.id, !isTracked)}
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150",
              isTracked
                ? "bg-[#F2CB38] border-[#F2CB38]"
                : "border-zinc-600 hover:border-zinc-400"
            )}
          >
            <Check
              size={12}
              className={cn(
                "transition-opacity",
                isTracked ? "text-black opacity-100" : "text-transparent opacity-0"
              )}
              strokeWidth={3}
            />
          </button>
        </td>
      )}

      {/* Date */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-zinc-600" />
          <span className="text-xs text-zinc-400 font-mono">
            {new Date(bet.date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
            })}
          </span>
        </div>
      </td>

      {/* Match */}
      <td className="px-3 py-4">
        <div className="flex flex-col gap-0.5 max-w-[180px]">
          <span className="text-sm text-zinc-200 font-medium truncate">
            {bet.match}
          </span>
          <span className="text-xs text-zinc-500 truncate">{bet.selection}</span>
        </div>
      </td>

      {/* Odds */}
      <td className="px-3 py-4">
        {mode === "custom" && isTracked && bet.status === "pending" ? (
          <div className="flex items-center gap-1">
            {isEditing ? (
              <input
                type="number"
                value={localOdds}
                onChange={(e) => setLocalOdds(parseFloat(e.target.value) || 0)}
                onBlur={handleOddsBlur}
                onKeyDown={handleOddsKeyDown}
                autoFocus
                step="0.01"
                min="1"
                className="w-16 h-7 px-2 rounded bg-[#0a0a0a] border border-[#F2CB38]/50 text-sm text-zinc-100 font-semibold tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F2CB38]/30"
              />
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-1 px-2 py-1 rounded hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                  {localOdds.toFixed(2)}
                </span>
                {localOdds !== bet.recommendedOdds && (
                  <span className="text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    (rec: {bet.recommendedOdds})
                  </span>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-zinc-100 tabular-nums">
              {effectiveOdds.toFixed(2)}
            </span>
            {localOdds !== bet.recommendedOdds && mode === "custom" && (
              <span className="text-[9px] text-zinc-600">
                rec: {bet.recommendedOdds}
              </span>
            )}
          </div>
        )}
      </td>

      {/* Units */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-md text-xs font-bold tabular-nums",
            bet.units === 3
              ? "bg-green-500/15 text-green-400"
              : bet.units === 2
              ? "bg-[#F2CB38]/15 text-[#F2CB38]"
              : "bg-white/[0.08] text-zinc-300"
          )}
        >
          {bet.units}u
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-4">
        <div className="flex justify-center">
          <StatusBadge status={bet.status} result={bet.result} />
        </div>
      </td>

      {/* Gain/Loss */}
      <td className="px-5 py-4 text-right">
        {gainLoss !== null ? (
          <span
            className={cn(
              "text-sm font-semibold tabular-nums flex items-center justify-end gap-1",
              gainLoss > 0
                ? "text-green-400"
                : gainLoss < 0
                ? "text-red-400"
                : "text-zinc-400"
            )}
          >
            {gainLoss > 0 ? (
              <CheckCircle2 size={12} />
            ) : gainLoss < 0 ? (
              <XCircle size={12} />
            ) : (
              <Minus size={12} />
            )}
            {gainLoss > 0 ? "+" : ""}
            {gainLoss.toFixed(2)}€
          </span>
        ) : (
          <span className="text-sm text-zinc-600">—</span>
        )}
      </td>
    </motion.tr>
  );
}

export function TrackedBetsTable({
  bets,
  mode,
  betSettings,
  onBetToggle,
  onOddsChange,
}: TrackedBetsTableProps) {
  const [sortField, setSortField] = useState<"date" | "gain">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedBets = useMemo(() => {
    const sorted = [...bets].sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      // Sort by gain (settled bets only)
      const gainA =
        a.status === "won"
          ? (a.actualOdds ?? a.recommendedOdds - 1) * a.units
          : a.status === "lost"
          ? -a.units
          : a.status === "void"
          ? 0
          : -Infinity;
      const gainB =
        b.status === "won"
          ? (b.actualOdds ?? b.recommendedOdds - 1) * b.units
          : b.status === "lost"
          ? -b.units
          : b.status === "void"
          ? 0
          : -Infinity;
      return sortDirection === "asc" ? gainA - gainB : gainB - gainA;
    });
    return sorted;
  }, [bets, sortField, sortDirection]);

  const stats = useMemo(() => {
    const settledBets = bets.filter((b) => b.status !== "pending");
    const wonBets = settledBets.filter((b) => b.status === "won");
    const totalGain = settledBets.reduce((sum, bet) => {
      if (bet.status === "won") {
        const odds = betSettings.find((s) => s.betId === bet.id)?.customOdds ?? bet.recommendedOdds;
        return sum + (odds - 1) * bet.units;
      } else if (bet.status === "lost") {
        return sum - bet.units;
      }
      return sum;
    }, 0);
    return {
      total: bets.length,
      settled: settledBets.length,
      won: wonBets.length,
      pending: bets.filter((b) => b.status === "pending").length,
      totalGain,
    };
  }, [bets, betSettings]);

  const handleSort = (field: "date" | "gain") => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: "date" | "gain" }) => (
    <span
      className={cn(
        "ml-1 text-zinc-600",
        sortField === field && "text-[#F2CB38]"
      )}
    >
      {sortField === field ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
            <Trophy size={14} className="text-[#F2CB38]" strokeWidth={1.5} />
          </div>
          <h2 className="text-sm font-semibold text-zinc-100">
            Paris suivis
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-zinc-500 text-[10px] font-medium">
            {bets.length}
          </span>
        </div>
        {mode === "custom" && (
          <span className="text-[11px] text-purple-400">
            Cochez les paris que vous avez joués
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {mode === "custom" && (
                <th className="px-5 py-3 text-left w-12">
                  <span className="sr-only">Suivi</span>
                </th>
              )}
              <th
                className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
                onClick={() => handleSort("date")}
              >
                Date
                <SortIcon field="date" />
              </th>
              <th className="px-3 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Mise
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Statut
              </th>
              <th
                className="px-5 py-3 text-right text-[10px] font-medium text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-zinc-300 transition-colors"
                onClick={() => handleSort("gain")}
              >
                Gain/Perte
                <SortIcon field="gain" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            <AnimatePresence mode="popLayout">
              {sortedBets.map((bet, index) => (
                <BetRow
                  key={bet.id}
                  bet={bet}
                  mode={mode}
                  settings={betSettings.find((s) => s.betId === bet.id)}
                  onToggle={onBetToggle}
                  onOddsChange={onOddsChange}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {bets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
            <Target size={18} className="text-zinc-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-zinc-300 mb-1">
            Aucun pari suivi
          </p>
          <p className="text-xs text-zinc-600 max-w-xs">
            Aucun pari n&apos;est disponible pour le moment.
          </p>
        </div>
      )}

      {/* Footer stats */}
      {bets.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Paris totals
            </p>
            <p className="text-sm font-bold text-zinc-100">{stats.total}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              En attente
            </p>
            <p className="text-sm font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Win rate
            </p>
            <p className="text-sm font-bold text-zinc-100">
              {stats.settled > 0
                ? Math.round((stats.won / stats.settled) * 100)
                : 0}
              %
            </p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
              Profit net
            </p>
            <p
              className={cn(
                "text-sm font-bold tabular-nums",
                stats.totalGain >= 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {stats.totalGain >= 0 ? "+" : ""}
              {stats.totalGain.toFixed(2)}€
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
