"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingUp, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollKPIs } from "@/lib/dashboard-data";

interface BankrollKpiCardsProps {
  kpis: BankrollKPIs;
}

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  trendLabel?: string;
  valueColor?: string;
  suffix?: string;
  delay: number;
}

function AnimatedNumber({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix?: string;
  color: string;
}) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("text-3xl font-bold tracking-tight tabular-nums", color)}
    >
      {typeof value === "number" && value >= 0 && suffix === "€" && "+"}
      {typeof value === "number" ? value.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) : value}
      {suffix && <span className="text-lg ml-0.5 opacity-80">{suffix}</span>}
    </motion.span>
  );
}

function StreakDisplay({
  streak,
  type,
  color,
}: {
  streak: number;
  type: "W" | "L" | "neutral";
  color: string;
}) {
  const displayStreak = streak > 0 ? streak : "—";
  const streakLabel = type === "neutral" ? "" : type;

  return (
    <motion.div
      key={`${streak}-${type}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex items-baseline gap-1"
    >
      <span className={cn("text-3xl font-bold tracking-tight tabular-nums", color)}>
        {displayStreak}
      </span>
      {streakLabel && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "text-lg font-bold px-1.5 py-0.5 rounded",
            type === "W"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          )}
        >
          {streakLabel}
        </motion.span>
      )}
    </motion.div>
  );
}

function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  valueColor = "text-zinc-100",
  suffix,
  delay,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-[#111] border border-white/[0.10] rounded-xl p-5 hover:border-white/[0.14] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
            <Icon size={16} className="text-[#F2CB38]" strokeWidth={1.5} />
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
            {label}
          </span>
        </div>
        {trend !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
              trend >= 0
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            <TrendingUp
              size={10}
              className={trend < 0 ? "rotate-180" : ""}
            />
            {trend >= 0 ? "+" : ""}
            {trend.toFixed(1)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end">
        {typeof value === "object" ? null : (
          <AnimatedNumber
            value={typeof value === "string" ? parseFloat(value) : value}
            suffix={suffix}
            color={valueColor}
          />
        )}
      </div>

      {/* Trend label */}
      {trendLabel && (
        <p className="text-[11px] text-zinc-600 mt-2">{trendLabel}</p>
      )}
    </motion.div>
  );
}

export function BankrollKpiCards({ kpis }: BankrollKpiCardsProps) {
  const cards: KpiCardProps[] = [
    {
      label: "Bankroll actuelle",
      value: kpis.currentBankroll,
      icon: Wallet,
      suffix: "€",
      valueColor: "text-zinc-100",
      trend: 3.2,
      trendLabel: "vs dépôt initial",
      delay: 0,
    },
    {
      label: "Profit / Perte",
      value: kpis.profit,
      icon: TrendingUp,
      suffix: "€",
      valueColor: kpis.profit >= 0 ? "text-green-400" : "text-red-400",
      trend: kpis.profit >= 0 ? 5.1 : undefined,
      trendLabel: "sur tous les paris",
      delay: 0.1,
    },
    {
      label: "ROI",
      value: kpis.roi,
      icon: Target,
      suffix: "%",
      valueColor: kpis.roi >= 0 ? "text-[#F2CB38]" : "text-red-400",
      trend: 1.8,
      trendLabel: "vs mois dernier",
      delay: 0.2,
    },
    {
      label: "Série en cours",
      value: kpis.streak,
      icon: Flame,
      valueColor:
        kpis.streakType === "W"
          ? "text-green-400"
          : kpis.streakType === "L"
          ? "text-red-400"
          : "text-zinc-400",
      trendLabel:
        kpis.streakType === "W"
          ? "victoires consécutives"
          : kpis.streakType === "L"
          ? "défaites consécutives"
          : "aucune série",
      delay: 0.3,
    },
  ];

  // Override the streak card to show the special streak display
  const streakCard = cards[3];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) =>
        index === 3 ? (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: card.delay }}
            className="bg-[#111] border border-white/[0.10] rounded-xl p-5 hover:border-white/[0.14] transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
                  <Flame
                    size={16}
                    className={cn(
                      "text-[#F2CB38]",
                      kpis.streakType === "W" && "text-green-400",
                      kpis.streakType === "L" && "text-red-400"
                    )}
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                  Série en cours
                </span>
              </div>
            </div>

            {/* Streak value */}
            <StreakDisplay
              streak={kpis.streak}
              type={kpis.streakType}
              color={
                kpis.streakType === "W"
                  ? "text-green-400"
                  : kpis.streakType === "L"
                  ? "text-red-400"
                  : "text-zinc-400"
              }
            />

            {/* Trend label */}
            {card.trendLabel && (
              <p className="text-[11px] text-zinc-600 mt-2">{card.trendLabel}</p>
            )}
          </motion.div>
        ) : (
          <KpiCard key={card.label} {...card} />
        )
      )}
    </div>
  );
}
