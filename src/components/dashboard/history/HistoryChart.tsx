"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartDataPoint {
  date: string;
  profit: number;
  cumulative: number;
  label: string;
}

interface HistoryChartProps {
  data: ChartDataPoint[];
}

type Period = "7D" | "30D" | "90D" | "ALL";

const PERIODS: Period[] = ["7D", "30D", "90D", "ALL"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.10] rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="text-xs text-zinc-500 mb-2">
        {new Date(data.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-zinc-400">Profit</span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold",
              data.profit >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {data.profit >= 0 ? "+" : ""}
            {data.profit.toFixed(2)}€
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F2CB38]" />
            <span className="text-xs text-zinc-400">Cumulé</span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold",
              data.cumulative >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {data.cumulative >= 0 ? "+" : ""}
            {data.cumulative.toFixed(2)}€
          </span>
        </div>
      </div>
      <p className="text-[10px] text-zinc-600 mt-2 truncate">{data.label}</p>
    </div>
  );
}

export function HistoryChart({ data }: HistoryChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("ALL");

  const filteredData = useMemo(() => {
    if (selectedPeriod === "ALL" || data.length === 0) return data;

    const now = new Date();
    const daysMap: Record<Period, number> = {
      "7D": 7,
      "30D": 30,
      "90D": 90,
      ALL: Infinity,
    };
    const days = daysMap[selectedPeriod];
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return data.filter((point) => new Date(point.date) >= cutoffDate);
  }, [data, selectedPeriod]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { current: 0, min: 0, max: 0, change: 0 };
    }

    const current = filteredData[filteredData.length - 1]?.cumulative || 0;
    const first = filteredData[0]?.cumulative || 0;
    const values = filteredData.map((d) => d.cumulative);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const change = current - first;

    return { current, min, max, change };
  }, [filteredData]);

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-zinc-100">
            Performance cumulative
          </h2>
        </div>
        <div className="flex items-center justify-center h-[250px] text-zinc-500 text-sm">
          Aucune donnée disponible
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-zinc-100">
            Performance cumulative
          </h2>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 rounded-full bg-[#F2CB38]" />
              <span className="text-[11px] text-zinc-500">Cumulé</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 rounded-full bg-green-400" />
              <span className="text-[11px] text-zinc-500">Profit</span>
            </div>
          </div>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                selectedPeriod === period
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Profit cumulé
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.current >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            {stats.current >= 0 ? "+" : ""}
            {stats.current.toFixed(2)}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Plus haut
          </p>
          <p className="text-lg font-bold text-green-400 tabular-nums">
            +{stats.max.toFixed(2)}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
            Plus bas
          </p>
          <p
            className={cn(
              "text-lg font-bold tabular-nums",
              stats.min >= 0 ? "text-zinc-100" : "text-red-400"
            )}
          >
            {stats.min.toFixed(2)}€
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 min-h-[250px]">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F2CB38" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#F2CB38" stopOpacity={0} />
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
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={0}
              stroke="rgba(255,255,255,0.1)"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#F2CB38"
              strokeWidth={2}
              fill="url(#cumulativeGradient)"
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
    </motion.div>
  );
}
