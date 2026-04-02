"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsData {
  totalBets: number;
  totalBetsDelta: number;
  winRate: number;
  winRateDelta: number;
  profit: number;
  profitDelta: number;
  roi: number;
  roiDelta: number;
  wonBets: number;
  lostBets: number;
  voidBets: number;
}

interface HistoryStatsProps {
  stats: StatsData;
}

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon: React.ReactNode;
  accentColor: string;
  valueColor?: string;
  index: number;
}

function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  accentColor,
  valueColor = "text-zinc-100",
  index,
}: StatCardProps) {
  const getTrendIcon = () => {
    if (delta === undefined || delta === 0) {
      return <Minus size={12} className="text-zinc-500" />;
    }
    return delta > 0 ? (
      <TrendingUp size={12} className="text-green-400" />
    ) : (
      <TrendingDown size={12} className="text-red-400" />
    );
  };

  const getTrendColor = () => {
    if (delta === undefined || delta === 0) return "text-zinc-500";
    return delta > 0 ? "text-green-400" : "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", accentColor)}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <p className={cn("text-2xl font-bold tracking-tight mb-2", valueColor)}>
        {typeof value === "number" && label.includes("€")
          ? `${value >= 0 ? "+" : ""}${value.toFixed(2)}€`
          : typeof value === "number" && label.includes("%")
          ? `${value.toFixed(1)}%`
          : value}
      </p>

      {/* Delta */}
      {delta !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={cn("text-xs font-medium", getTrendColor())}>
              {delta > 0 ? "+" : ""}
              {typeof delta === "number" && label.includes("%")
                ? delta.toFixed(1)
                : Math.abs(delta)}
              {typeof delta === "number" && !label.includes("%") && !label.includes("€")
                ? ""
                : label.includes("€") || label.includes("%")
                ? ""
                : ""}
            </span>
          </div>
          {deltaLabel && (
            <span className="text-xs text-zinc-600">{deltaLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function HistoryStats({ stats }: HistoryStatsProps) {
  const cards = [
    {
      label: "Total des paris",
      value: stats.totalBets,
      delta: stats.totalBetsDelta,
      deltaLabel: "vs période précédente",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      accentColor: "bg-blue-500/15 text-blue-400",
      valueColor: "text-zinc-100",
    },
    {
      label: "Taux de réussite",
      value: stats.winRate,
      delta: stats.winRateDelta,
      deltaLabel: "vs période précédente",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      accentColor: "bg-green-500/15 text-green-400",
      valueColor: "text-green-400",
    },
    {
      label: "Profit net",
      value: stats.profit,
      delta: stats.profitDelta,
      deltaLabel: "vs période précédente",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      accentColor: stats.profit >= 0 ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400",
      valueColor: stats.profit >= 0 ? "text-green-400" : "text-red-400",
    },
    {
      label: "ROI moyen",
      value: stats.roi,
      delta: stats.roiDelta,
      deltaLabel: "vs période précédente",
      icon: (
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      accentColor: stats.roi >= 0 ? "bg-[#F2CB38]/15 text-[#F2CB38]" : "bg-red-500/15 text-red-400",
      valueColor: stats.roi >= 0 ? "text-[#F2CB38]" : "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatCard key={card.label} {...card} index={index} />
      ))}
    </div>
  );
}
