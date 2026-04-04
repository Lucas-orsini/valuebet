"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Wallet, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiData } from "@/lib/dashboard-data";

interface KpiCardsProps {
  data: KpiData;
}

interface KpiCardProps {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  trend?: number;
  trendLabel?: string;
  isPercentage?: boolean;
  isCurrency?: boolean;
  isStreak?: boolean;
  delay: number;
}

function AnimatedValue({
  target,
  isPercentage = false,
  isCurrency = false,
  isStreak = false,
  started,
}: {
  target: number;
  isPercentage?: boolean;
  isCurrency?: boolean;
  isStreak?: boolean;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const frames = 60;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setCount(target * progress);

      if (frame < frames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  if (isStreak) {
    return (
      <span className="text-3xl font-bold text-zinc-100 tracking-tight tabular-nums">
        {Math.round(count)}
      </span>
    );
  }

  if (isCurrency) {
    const formatted = count.toLocaleString("fr-FR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (
      <span className="text-3xl font-bold text-zinc-100 tracking-tight tabular-nums">
        {formatted}€
      </span>
    );
  }

  if (isPercentage) {
    return (
      <span className="text-3xl font-bold text-zinc-100 tracking-tight tabular-nums">
        {count.toFixed(1)}
        <span className="text-xl ml-0.5">%</span>
      </span>
    );
  }

  return (
    <span className="text-3xl font-bold text-zinc-100 tracking-tight tabular-nums">
      {count.toFixed(1)}%
    </span>
  );
}

function KpiCard({
  label,
  value,
  suffix,
  icon: Icon,
  trend,
  trendLabel,
  isPercentage = false,
  isCurrency = false,
  isStreak = false,
  delay,
}: KpiCardProps) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  const displaySuffix = !isCurrency && !isStreak ? suffix : "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#111] border border-white/[0.10] rounded-xl p-5 hover:border-white/[0.14] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f2ab05]/10 border border-[#f2ab05]/20 flex items-center justify-center">
            <Icon size={16} className="text-[#f2ab05]" strokeWidth={1.5} />
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
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
      <div className="flex items-end gap-2">
        <AnimatedValue
          target={value}
          isPercentage={isPercentage}
          isCurrency={isCurrency}
          isStreak={isStreak}
          started={started}
        />
        {displaySuffix && (
          <span className="text-lg font-medium text-zinc-500 mb-1">
            {displaySuffix}
          </span>
        )}
      </div>

      {/* Trend label */}
      {trendLabel && (
        <p className="text-[11px] text-zinc-600 mt-2">{trendLabel}</p>
      )}
    </motion.div>
  );
}

export function KpiCards({ data }: KpiCardsProps) {
  const cards: KpiCardProps[] = [
    {
      label: "ROI global",
      value: data.roi,
      suffix: "%",
      icon: Target,
      trend: 4.2,
      trendLabel: "vs mois dernier",
      isPercentage: true,
      delay: 0,
    },
    {
      label: "Taux de victoire",
      value: data.winRate,
      suffix: "%",
      icon: TrendingUp,
      trend: 2.1,
      trendLabel: "vs mois dernier",
      isPercentage: true,
      delay: 0.1,
    },
    {
      label: "Profit total",
      value: data.profit,
      suffix: "",
      icon: Wallet,
      trend: 12.5,
      trendLabel: "30 derniers jours",
      isCurrency: true,
      delay: 0.2,
    },
    {
      label: "Série actuelle",
      value: data.streak,
      suffix: "",
      icon: Flame,
      trendLabel: "Paris gagnés consécutifs",
      isStreak: true,
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
