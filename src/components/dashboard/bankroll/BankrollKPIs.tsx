"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollKPIs } from "@/lib/dashboard-data";

interface BankrollKPIsProps {
  data: BankrollKPIs;
  isLoading?: boolean;
}

interface KpiCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  accentColor: string;
  trend?: 'up' | 'down' | 'neutral';
  delay: number;
}

function KpiCard({
  label,
  value,
  subValue,
  icon: Icon,
  accentColor,
  trend,
  delay,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.10] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", accentColor)}>
          <Icon size={16} strokeWidth={1.5} />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-zinc-100 tracking-tight tabular-nums">
          {value}
        </span>
        {subValue && (
          <span className="text-sm text-zinc-500 mb-0.5">{subValue}</span>
        )}
      </div>

      {/* Trend indicator */}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' && (
            <TrendingUp size={12} className="text-green-400" />
          )}
          {trend === 'down' && (
            <TrendingDown size={12} className="text-red-400" />
          )}
        </div>
      )}
    </motion.div>
  );
}

export function BankrollKPIs({ data, isLoading }: BankrollKPIsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#1a1a1a] border border-white/[0.07] rounded-xl p-5 animate-pulse"
          >
            <div className="h-3 bg-white/[0.06] rounded w-20 mb-3" />
            <div className="h-8 bg-white/[0.06] rounded w-28 mb-2" />
            <div className="h-3 bg-white/[0.04] rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  const profitLossTrend = data.profitLoss >= 0 ? 'up' : data.profitLoss < 0 ? 'down' : 'neutral';
  const roiTrend = data.roi >= 0 ? 'up' : data.roi < 0 ? 'down' : 'neutral';

  const cards: KpiCardProps[] = [
    {
      label: "Bankroll actuelle",
      value: `${data.currentBankroll.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`,
      icon: Wallet,
      accentColor: "bg-[#F2CB38]/15 text-[#F2CB38]",
      trend: data.profitLoss >= 0 ? 'up' : 'down',
      delay: 0,
    },
    {
      label: "P&L",
      value: `${data.profitLoss >= 0 ? '+' : ''}${data.profitLoss.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€`,
      subValue: `sur ${data.betsTracked} paris`,
      icon: data.profitLoss >= 0 ? TrendingUp : TrendingDown,
      accentColor: data.profitLoss >= 0 ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400",
      trend: profitLossTrend,
      delay: 0.1,
    },
    {
      label: "ROI",
      value: `${data.roi >= 0 ? '+' : ''}${data.roi.toFixed(2)}%`,
      icon: Target,
      accentColor: data.roi >= 0 ? "bg-[#F2CB38]/15 text-[#F2CB38]" : "bg-red-500/15 text-red-400",
      trend: roiTrend,
      delay: 0.2,
    },
    {
      label: "Série en cours",
      value: `${data.streak.count}${data.streak.type}`,
      subValue: data.streak.type === 'W' ? 'victoires' : 'défaites',
      icon: Flame,
      accentColor: data.streak.type === 'W' ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400",
      trend: data.streak.type === 'W' ? 'up' : 'down',
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} />
      ))}
    </div>
  );
}
