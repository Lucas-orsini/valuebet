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
import { cn } from "@/lib/utils";
import type { BankrollPoint, BankrollMode } from "@/lib/dashboard-data";

interface BankrollChartProps {
  data: BankrollPoint[];
  mode: BankrollMode;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: BankrollPoint;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const profit = data.bankroll - data.flatBet;
  const roi = ((profit / data.flatBet) * 100).toFixed(1);

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="text-xs text-zinc-500 mb-2">
        {new Date(label || "").toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F2CB38]" />
            <span className="text-xs text-zinc-400">Bankroll</span>
          </div>
          <span className="text-xs font-semibold text-zinc-100 tabular-nums">
            {data.bankroll.toLocaleString("fr-FR")}€
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-zinc-500" />
            <span className="text-xs text-zinc-400">Flat bet</span>
          </div>
          <span className="text-xs font-semibold text-zinc-400 tabular-nums">
            {data.flatBet.toLocaleString("fr-FR")}€
          </span>
        </div>
        <div className="pt-2 border-t border-white/[0.06]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] text-zinc-500">vs Flat bet</span>
            <span
              className={cn(
                "text-[11px] font-semibold tabular-nums",
                profit >= 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {profit >= 0 ? "+" : ""}
              {profit.toLocaleString("fr-FR")}€ ({roi}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BankrollChart({ data, mode }: BankrollChartProps) {
  const [selectedRange, setSelectedRange] = useState<"1M" | "3M" | "ALL">("ALL");

  const filteredData = useMemo(() => {
    if (selectedRange === "ALL") return data;
    if (selectedRange === "1M") {
      return data.slice(-30);
    }
    return data.slice(-14);
  }, [data, selectedRange]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { current: 0, profit: 0, roi: 0, vsFlatBet: 0 };
    }
    const lastPoint = filteredData[filteredData.length - 1];
    const firstPoint = filteredData[0];
    const bankrollDiff = lastPoint.bankroll - firstPoint.bankroll;
    const flatBetDiff = lastPoint.flatBet - firstPoint.flatBet;
    const roi = ((bankrollDiff / firstPoint.bankroll) * 100).toFixed(1);

    return {
      current: lastPoint.bankroll,
      profit: bankrollDiff,
      roi: Number(roi),
      vsFlatBet: bankrollDiff - flatBetDiff,
    };
  }, [filteredData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const minValue = Math.min(...filteredData.map((d) => Math.min(d.bankroll, d.flatBet)));
  const maxValue = Math.max(...filteredData.map((d) => Math.max(d.bankroll, d.flatBet)));
  const padding = (maxValue - minValue) * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-zinc-100">
            Évolution bankroll
          </h2>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 rounded-full bg-[#F2CB38]" />
              <span className="text-[11px] text-zinc-500">Bankroll</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 rounded-full bg-zinc-500" />
              <span className="text-[11px] text-zinc-500">Flat bet</span>
            </div>
          </div>
        </div>

        {/* Range selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          {(["1M", "3M", "ALL"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                selectedRange === range
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Bankroll actuelle
          </p>
          <motion.p
            key={stats.current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-zinc-100 tabular-nums"
          >
            {stats.current.toLocaleString("fr-FR")}€
          </motion.p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit total
          </p>
          <motion.p
            key={stats.profit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.profit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.profit >= 0 ? "+" : ""}
            {stats.profit.toLocaleString("fr-FR")}€
          </motion.p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            ROI période
          </p>
          <motion.p
            key={stats.roi}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.roi >= 0 ? "text-[#F2CB38]" : "text-red-400"
            )}
          >
            {stats.roi >= 0 ? "+" : ""}
            {stats.roi}%
          </motion.p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="bankrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F2CB38" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F2CB38" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="flatBetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#52525b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
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
              minTickGap={50}
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}€`}
              domain={[minValue - padding, maxValue + padding]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={filteredData[0]?.flatBet}
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="flatBet"
              stroke="#52525b"
              strokeWidth={2}
              fill="url(#flatBetGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#52525b" }}
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
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02] shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">vs stratégie flat bet</span>
          <motion.span
            key={stats.vsFlatBet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "text-xs font-semibold tabular-nums",
              stats.vsFlatBet >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.vsFlatBet >= 0 ? "+" : ""}
            {stats.vsFlatBet.toFixed(0)}€
          </motion.span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Paris suivis</span>
          <span className="text-xs font-semibold text-zinc-300 tabular-nums">
            {filteredData.length} jours
          </span>
        </div>
      </div>

      {/* Mode indicator */}
      <div className="px-5 py-2 border-t border-white/[0.06] bg-white/[0.01] shrink-0">
        <p className="text-[10px] text-zinc-600 flex items-center gap-2">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              mode === "auto" ? "bg-blue-400" : "bg-purple-400"
            )}
          />
          Mode {mode === "auto" ? "automatique" : "personnalisé"} · Données
          illustratives pour démonstration
        </p>
      </div>
    </motion.div>
  );
}
