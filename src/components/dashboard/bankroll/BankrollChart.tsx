"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollSnapshot } from "@/lib/bankroll-data";

interface BankrollChartProps {
  snapshots: BankrollSnapshot[];
}

type Period = "7J" | "30J" | "ALL";

const PERIODS: { value: Period; label: string }[] = [
  { value: "7J", label: "7 jours" },
  { value: "30J", label: "30 jours" },
  { value: "ALL", label: "Tout" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: BankrollSnapshot;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const formattedDate = new Date(data.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[160px]">
      <p className="text-[11px] text-zinc-500 mb-2">{formattedDate}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-400">Bankroll</span>
          <span className="text-sm font-semibold text-zinc-100 tabular-nums">
            {data.bankroll.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-400">Profit</span>
          <span
            className={cn(
              "text-sm font-semibold tabular-nums",
              data.profit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {data.profit >= 0 ? "+" : ""}
            {data.profit.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </span>
        </div>
      </div>
    </div>
  );
}

export function BankrollChart({ snapshots }: BankrollChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("ALL");

  const filteredSnapshots = useMemo(() => {
    if (selectedPeriod === "ALL") return snapshots;

    const now = new Date();
    const daysMap: Record<Exclude<Period, "ALL">, number> = {
      "7J": 7,
      "30J": 30,
    };
    const days = daysMap[selectedPeriod];
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return snapshots.filter(
      (s) => new Date(s.date) >= cutoffDate || s.profit === 0
    );
  }, [snapshots, selectedPeriod]);

  const stats = useMemo(() => {
    if (filteredSnapshots.length < 2) {
      const last = filteredSnapshots[filteredSnapshots.length - 1];
      return {
        current: last?.bankroll ?? 0,
        profit: last?.profit ?? 0,
        high: last?.bankroll ?? 0,
        low: last?.bankroll ?? 0,
        isPositive: (last?.profit ?? 0) >= 0,
      };
    }

    const first = filteredSnapshots[0];
    const last = filteredSnapshots[filteredSnapshots.length - 1];
    const profits = filteredSnapshots.map((s) => s.bankroll);

    return {
      current: last.bankroll,
      profit: last.profit,
      high: Math.max(...profits),
      low: Math.min(...profits),
      isPositive: last.profit >= 0,
    };
  }, [filteredSnapshots]);

  const initialValue = filteredSnapshots[0]?.bankroll ?? 0;
  const maxValue = Math.max(...filteredSnapshots.map((s) => s.bankroll), initialValue * 1.1);
  const minValue = Math.min(...filteredSnapshots.map((s) => s.bankroll), initialValue * 0.9);

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-zinc-100">
            Évolution de la bankroll
          </h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-0.5 rounded-full bg-[#F2CB38]" />
            <span className="text-[11px] text-zinc-500">Bankroll</span>
          </div>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          {PERIODS.map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                selectedPeriod === period.value
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Actuelle
          </p>
          <p className="text-lg font-bold text-zinc-100 tabular-nums">
            {stats.current.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit/Perte
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums flex items-center gap-1",
              stats.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {stats.isPositive ? "+" : ""}
            {stats.profit.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Plus haut
          </p>
          <p className="text-lg font-bold text-green-400 tabular-nums">
            {stats.high.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Plus bas
          </p>
          <p className="text-lg font-bold text-red-400 tabular-nums">
            {stats.low.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 p-4 min-h-[280px]"
      >
        {filteredSnapshots.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-zinc-500">Aucune donnée disponible</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredSnapshots}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="bankrollGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F2CB38" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#F2CB38" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "#52525b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  });
                }}
              />
              <YAxis
                tick={{ fill: "#52525b", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `${value}€`}
                domain={[minValue, maxValue]}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={initialValue}
                stroke="#52525b"
                strokeDasharray="5 5"
                strokeWidth={1}
              />
              <Area
                type="monotone"
                dataKey="bankroll"
                stroke="#F2CB38"
                strokeWidth={2.5}
                fill="url(#bankrollGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#F2CB38",
                  stroke: "#0a0a0a",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  );
}
