"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";
import type { CurvePoint } from "@/lib/bankroll-data";

interface BankrollCurveProps {
  data: CurvePoint[];
  initialBankroll: number;
}

type RangeOption = "1M" | "3M" | "ALL";

const RANGE_OPTIONS: { value: RangeOption; label: string }[] = [
  { value: "1M", label: "1 mois" },
  { value: "3M", label: "3 mois" },
  { value: "ALL", label: "Tout" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: CurvePoint;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[160px]">
      <p className="text-xs text-zinc-500 mb-2">{formattedDate}</p>
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
          <span className="text-xs text-zinc-400">P&L</span>
          <span
            className={cn(
              "text-sm font-semibold tabular-nums",
              data.pnl >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {data.pnl >= 0 ? "+" : ""}
            {data.pnl.toFixed(2)}€
          </span>
        </div>
      </div>
    </div>
  );
}

export function BankrollCurve({ data, initialBankroll }: BankrollCurveProps) {
  const [selectedRange, setSelectedRange] = useState<RangeOption>("ALL");

  const filteredData = useMemo(() => {
    if (selectedRange === "ALL") return data;

    const now = new Date();
    const monthsBack = selectedRange === "1M" ? 1 : 3;
    const cutoffDate = new Date(
      now.getFullYear(),
      now.getMonth() - monthsBack,
      now.getDate()
    );

    return data.filter((point) => new Date(point.date) >= cutoffDate);
  }, [data, selectedRange]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { current: initialBankroll, min: initialBankroll, max: initialBankroll, pnl: 0 };
    }

    const first = filteredData[0];
    const last = filteredData[filteredData.length - 1];
    const values = filteredData.map((p) => p.bankroll);

    return {
      current: last.bankroll,
      min: Math.min(...values),
      max: Math.max(...values),
      pnl: last.pnl,
    };
  }, [filteredData, initialBankroll]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-zinc-100">
            Évolution bankroll
          </h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-0.5 rounded-full bg-[#fb923c]" />
            <span className="text-[11px] text-zinc-500">Bankroll</span>
          </div>
        </div>

        {/* Range selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedRange(option.value)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                selectedRange === option.value
                  ? "bg-[#fb923c]/15 text-[#fb923c] border border-[#fb923c]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 px-5 py-4 border-b border-white/[0.06]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Actuelle
          </p>
          <p className="text-lg font-bold text-white tabular-nums">
            {stats.current.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Pic
          </p>
          <p className="text-lg font-bold text-green-400 tabular-nums">
            {stats.max.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Plancher
          </p>
          <p className="text-lg font-bold text-red-400 tabular-nums">
            {stats.min.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            €
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            P&L période
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.pnl >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.pnl >= 0 ? "+" : ""}
            {stats.pnl.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-[280px] p-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="bankrollGradientOrange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#fb923c" stopOpacity={0} />
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
              tickFormatter={formatDate}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}€`}
              domain={["dataMin - 50", "dataMax + 50"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={initialBankroll}
              stroke="#52525b"
              strokeDasharray="5 5"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="bankroll"
              stroke="#fb923c"
              strokeWidth={2}
              fill="url(#bankrollGradientOrange)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#fb923c",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 rounded-full bg-zinc-600" />
          <span className="text-[11px] text-zinc-500">
            Ligne pointillée = bankroll initiale ({initialBankroll}€)
          </span>
        </div>
      </div>
    </div>
  );
}
