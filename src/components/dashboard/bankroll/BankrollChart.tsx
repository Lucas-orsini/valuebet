"use client";

import React, { useState, useMemo } from "react";
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
import type { BankrollDataPoint } from "@/types/bankroll";

interface BankrollChartProps {
  data: BankrollDataPoint[];
  isLoading?: boolean;
}

type TimeRange = "1M" | "3M" | "ALL";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: BankrollDataPoint;
  }>;
  label?: string;
  initialBankroll: number;
}

function ChartTooltip({ active, payload, label, initialBankroll }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const pnl = data.bankroll - initialBankroll;
  const date = new Date(label as string);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="text-xs text-zinc-500 mb-2">{formattedDate}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Bankroll</span>
          <span className="text-sm font-semibold text-zinc-100 tabular-nums">
            {data.bankroll.toLocaleString("fr-FR")}€
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">P&L</span>
          <span className={cn(
            "text-sm font-semibold tabular-nums flex items-center gap-1",
            pnl >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {pnl >= 0 ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}€
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">ROI</span>
          <span className={cn(
            "text-xs font-medium tabular-nums",
            pnl >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {pnl >= 0 ? "+" : ""}{((pnl / initialBankroll) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-zinc-300 mb-1">
        Aucun pari suivi
      </p>
      <p className="text-xs text-zinc-600 max-w-[240px]">
        Commencez à suivre vos paris pour voir l&apos;évolution de votre bankroll
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-[200px] space-y-3">
        <div className="h-4 bg-white/[0.04] rounded animate-pulse" />
        <div className="h-32 bg-white/[0.04] rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-3 bg-white/[0.04] rounded w-16 animate-pulse" />
          <div className="h-3 bg-white/[0.04] rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function BankrollChart({ data, isLoading }: BankrollChartProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("ALL");
  const [initialBankroll] = useState(1000);

  // Filter data based on selected range
  const filteredData = useMemo(() => {
    if (selectedRange === "ALL" || data.length === 0) return data;

    const now = new Date();
    const cutoffDays = selectedRange === "1M" ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - cutoffDays * 24 * 60 * 60 * 1000);

    return data.filter(point => new Date(point.date) >= cutoffDate);
  }, [data, selectedRange]);

  // Calculate stats
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { current: initialBankroll, change: 0, changePercent: 0 };
    }

    const firstPoint = filteredData[0];
    const lastPoint = filteredData[filteredData.length - 1];
    const change = lastPoint.bankroll - firstPoint.bankroll;
    const changePercent = firstPoint.bankroll > 0 
      ? (change / firstPoint.bankroll) * 100 
      : 0;

    return {
      current: lastPoint.bankroll,
      change,
      changePercent
    };
  }, [filteredData, initialBankroll]);

  // Determine gradient color based on profit/loss
  const gradientColor = stats.change >= 0 ? "#10b981" : "#ef4444";
  const gradientId = stats.change >= 0 ? "profitGradient" : "lossGradient";

  if (isLoading) {
    return (
      <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="h-5 bg-white/[0.06] rounded w-40 animate-pulse" />
        </div>
        <div className="flex-1 p-4">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-zinc-100">
            Évolution bankroll
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-zinc-100">
            Évolution bankroll
          </h2>
          {/* Current value */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-zinc-100 tabular-nums">
              {stats.current.toLocaleString("fr-FR")}€
            </span>
            <span className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              stats.change >= 0 ? "text-green-400" : "text-red-400"
            )}>
              {stats.change >= 0 ? (
                <TrendingUp size={12} />
              ) : (
                <TrendingDown size={12} />
              )}
              {stats.change >= 0 ? "+" : ""}{stats.changePercent.toFixed(1)}%
            </span>
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

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 p-4 min-h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
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
                  month: "short"
                });
              }}
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}€`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              content={<ChartTooltip initialBankroll={initialBankroll} />}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
            />
            <ReferenceLine
              y={initialBankroll}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="bankroll"
              stroke={gradientColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{
                r: 5,
                fill: gradientColor,
                stroke: "#0a0a0a",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
