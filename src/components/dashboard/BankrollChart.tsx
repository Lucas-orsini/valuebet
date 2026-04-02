"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { BANKROLL_HISTORY } from "@/lib/dashboard-data";
import type { BankrollPoint } from "@/lib/dashboard-data";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.10] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-zinc-500 mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-zinc-400">{entry.name}:</span>
          <span className="text-xs font-semibold text-zinc-200">
            {entry.value.toLocaleString("fr-FR")}€
          </span>
        </div>
      ))}
    </div>
  );
}

export function BankrollChart() {
  const [selectedRange, setSelectedRange] = useState<"1M" | "3M" | "ALL">("ALL");

  const filteredData = (() => {
    if (selectedRange === "ALL") return BANKROLL_HISTORY;
    if (selectedRange === "1M") {
      return BANKROLL_HISTORY.slice(-4);
    }
    return BANKROLL_HISTORY.slice(-8);
  })();

  const lastPoint = filteredData[filteredData.length - 1];
  const firstPoint = filteredData[0];
  const bankrollDiff = lastPoint.bankroll - firstPoint.bankroll;
  const flatBetDiff = lastPoint.flatBet - firstPoint.flatBet;
  const roi = ((bankrollDiff / firstPoint.bankroll) * 100).toFixed(1);

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-zinc-100">
            Performance bankroll
          </h2>
          <div className="flex items-center gap-4">
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
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedRange === range
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-5 py-4 border-b border-white/[0.06]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Bankroll actuelle
          </p>
          <p className="text-lg font-bold text-zinc-100 tabular-nums">
            {lastPoint.bankroll.toLocaleString("fr-FR")}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit total
          </p>
          <p className="text-lg font-bold text-green-400 tabular-nums">
            +{bankrollDiff.toLocaleString("fr-FR")}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            ROI période
          </p>
          <p className="text-lg font-bold text-[#F2CB38] tabular-nums">
            +{roi}%
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
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
              domain={["dataMin - 50", "dataMax + 50"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="flatBet"
              stroke="#52525b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#52525b" }}
            />
            <Line
              type="monotone"
              dataKey="bankroll"
              stroke="#F2CB38"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#F2CB38",
                stroke: "#0a0a0a",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">vs stratégie flat bet</span>
          <span
            className={`text-xs font-semibold ${
              bankrollDiff > flatBetDiff ? "text-green-400" : "text-red-400"
            }`}
          >
            {bankrollDiff > flatBetDiff ? "+" : ""}
            {(bankrollDiff - flatBetDiff).toFixed(0)}€
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Gains vs flat bet</span>
          <span className="text-xs font-semibold text-green-400">
            +{((bankrollDiff - flatBetDiff) / flatBetDiff * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
