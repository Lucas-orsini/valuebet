"use client";

import { useState } from "react";
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
import type { BankrollPoint, BankrollMode, BankrollCustomBet } from "@/lib/dashboard-data";

interface BankrollCurveProps {
  data: BankrollPoint[];
  initialBankroll: number;
  mode: BankrollMode;
  customBets?: BankrollCustomBet[];
}

interface TooltipPayloadItem {
  value: number;
  payload: BankrollPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="text-xs text-zinc-500 mb-2">{label}</p>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-[#F2CB38]" />
        <span className="text-sm font-semibold text-zinc-100">
          {data.bankroll.toLocaleString("fr-FR")}€
        </span>
      </div>
      {data.bet && (
        <p className="text-xs text-zinc-500 border-t border-white/[0.06] pt-2 mt-2">
          {data.bet}
        </p>
      )}
    </div>
  );
}

export function BankrollCurve({
  data,
  initialBankroll,
  mode,
  customBets,
}: BankrollCurveProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter data based on custom mode
  const filteredData = (() => {
    if (mode === 'auto' || !customBets) return data;
    
    // In custom mode, recalculate based on played bets
    let runningBankroll = initialBankroll;
    const playedBets = customBets.filter(b => b.played);
    
    return data.map((point, index) => {
      const bet = playedBets[index];
      if (bet) {
        if (bet.result === 'win') {
          runningBankroll = runningBankroll + (bet.actualOdds - 1) * bet.units;
        } else if (bet.result === 'lose') {
          runningBankroll = runningBankroll - bet.units;
        }
        // push: no change
      }
      return {
        ...point,
        bankroll: runningBankroll,
      };
    });
  })();

  const lastPoint = filteredData[filteredData.length - 1];
  const firstPoint = filteredData[0];
  const maxBankroll = Math.max(...filteredData.map(d => d.bankroll));
  const minBankroll = Math.min(...filteredData.map(d => d.bankroll));
  const padding = (maxBankroll - minBankroll) * 0.1;

  return (
    <div className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-zinc-100">
            Courbe de bankroll
          </h2>
          {mode === 'custom' && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400 text-[10px] font-medium">
              Mode personnalisé
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-0.5 rounded-full bg-[#F2CB38]" />
            <span className="text-[11px] text-zinc-500">Bankroll</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-0.5 rounded-full bg-zinc-600" />
            <span className="text-[11px] text-zinc-500">Initiale</span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Actuelle</p>
          <p className="text-sm font-bold text-zinc-100 tabular-nums">
            {lastPoint.bankroll.toLocaleString("fr-FR")}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Profit</p>
          <p className={cn(
            "text-sm font-bold tabular-nums",
            lastPoint.bankroll >= initialBankroll ? "text-green-400" : "text-red-400"
          )}>
            {lastPoint.bankroll >= initialBankroll ? '+' : ''}
            {(lastPoint.bankroll - initialBankroll).toLocaleString("fr-FR")}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Pic</p>
          <p className="text-sm font-bold text-green-400 tabular-nums">
            {maxBankroll.toLocaleString("fr-FR")}€
          </p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Drawdown</p>
          <p className="text-sm font-bold text-red-400 tabular-nums">
            {(initialBankroll - minBankroll).toLocaleString("fr-FR")}€
          </p>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-64 p-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(e) => {
              if (e && e.activeTooltipIndex !== undefined) {
                setHoveredIndex(e.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
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
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}€`}
              domain={[minBankroll - padding, maxBankroll + padding]}
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
              stroke="#F2CB38"
              strokeWidth={2}
              fill="url(#bankrollGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "#F2CB38",
                stroke: "#1a1a1a",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
