"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface BankrollKpisProps {
  currentBankroll: number;
  profit: number;
  roi: number;
  winRate: number;
  streak: { current: number; isWin: boolean };
}

interface KpiCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ElementType;
  accentColor: string;
  valueColor?: string;
  delay: number;
}

function KpiCard({
  label,
  value,
  subValue,
  icon: Icon,
  accentColor,
  valueColor = "text-zinc-100",
  delay,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-[#111] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
          {label}
        </span>
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", accentColor)}>
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
      <p className={cn("text-2xl font-bold tracking-tight tabular-nums", valueColor)}>
        {value}
      </p>
      {subValue && (
        <p className="text-[11px] text-zinc-500 mt-1">{subValue}</p>
      )}
    </motion.div>
  );
}

export function BankrollKpis({
  currentBankroll,
  profit,
  roi,
  winRate,
  streak,
}: BankrollKpisProps) {
  const cards: KpiCardProps[] = [
    {
      label: "Bankroll actuelle",
      value: `${currentBankroll.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}€`,
      subValue: `Mise totale: ${(currentBankroll * 0.1).toFixed(0)}€`,
      icon: Wallet,
      accentColor: "bg-[#F2CB38]/10 text-[#F2CB38]",
      valueColor: "text-zinc-100",
      delay: 0,
    },
    {
      label: "Profit / Perte",
      value: `${profit >= 0 ? "+" : ""}${profit.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}€`,
      subValue: `${profit >= 0 ? "Gains nets" : "Pertes"} depuis le début`,
      icon: profit >= 0 ? TrendingUp : TrendingDown,
      accentColor: profit >= 0
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400",
      valueColor: profit >= 0 ? "text-green-400" : "text-red-400",
      delay: 0.1,
    },
    {
      label: "ROI",
      value: `${roi >= 0 ? "+" : ""}${roi.toFixed(1)}%`,
      subValue: `Win rate: ${winRate.toFixed(1)}%`,
      icon: Target,
      accentColor:
        roi >= 20
          ? "bg-green-500/10 text-green-400"
          : roi >= 0
          ? "bg-[#F2CB38]/10 text-[#F2CB38]"
          : "bg-red-500/10 text-red-400",
      valueColor:
        roi >= 20
          ? "text-green-400"
          : roi >= 0
          ? "text-[#F2CB38]"
          : "text-red-400",
      delay: 0.2,
    },
    {
      label: "Série en cours",
      value: `${streak.current}`,
      subValue: streak.isWin ? "Victoires consécutives" : "Défaites consécutives",
      icon: Flame,
      accentColor:
        streak.isWin
          ? "bg-orange-500/10 text-orange-400"
          : "bg-red-500/10 text-red-400",
      valueColor:
        streak.isWin ? "text-orange-400" : "text-red-400",
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
