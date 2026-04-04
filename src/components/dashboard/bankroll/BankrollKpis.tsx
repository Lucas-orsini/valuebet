"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollKpi } from "@/lib/bankroll-data";
import { fadeInUp, staggerContainer } from "@/lib/bankroll-data";

interface BankrollKpisProps {
  kpis: BankrollKpi;
}

interface AnimatedNumberProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  started: boolean;
}

function AnimatedNumber({
  target,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  isCurrency = false,
  started,
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const frames = 60;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      const current = target * progress;
      setCount(current);

      if (frame < frames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  const formatValue = (value: number) => {
    if (isCurrency) {
      return value.toLocaleString("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return value.toFixed(decimals);
  };

  return (
    <span className="tabular-nums">
      {prefix}
      {formatValue(count)}
      {suffix}
    </span>
  );
}

interface KpiCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  variant: "default" | "success" | "danger" | "accent";
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
  subtext?: string;
  subtextVariant?: "success" | "danger" | "default";
  delay: number;
  started: boolean;
}

function KpiCard({
  label,
  value,
  icon,
  variant,
  decimals = 0,
  prefix = "",
  suffix = "",
  isCurrency = false,
  subtext,
  subtextVariant = "default",
  delay,
  started,
}: KpiCardProps) {
  const variantStyles = {
    default: "text-zinc-100",
    success: "text-green-400",
    danger: "text-red-400",
    accent: "text-[#F2CB38]",
  };

  const subtextStyles = {
    success: "text-green-400",
    danger: "text-red-400",
    default: "text-zinc-500",
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#111] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.12] transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center",
              variant === "success" && "bg-green-500/10 border border-green-500/20",
              variant === "danger" && "bg-red-500/10 border border-red-500/20",
              variant === "accent" && "bg-[#F2CB38]/10 border border-[#F2CB38]/20",
              variant === "default" && "bg-white/[0.05] border border-white/[0.08]"
            )}
          >
            {icon}
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
            {label}
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="flex items-end gap-1">
        <span
          className={cn(
            "text-3xl font-bold tracking-tight",
            variantStyles[variant]
          )}
        >
          {value < 0 && value !== 0 ? "-" : ""}
          <AnimatedNumber
            target={Math.abs(value)}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
            isCurrency={isCurrency}
            started={started}
          />
        </span>
        {isCurrency && suffix === "€" && (
          <span className="text-xl font-medium text-zinc-500 mb-1">€</span>
        )}
      </div>

      {/* Subtext */}
      {subtext && (
        <p className={cn("text-xs mt-2", subtextStyles[subtextVariant])}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}

export function BankrollKpis({ kpis }: BankrollKpisProps) {
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

  const cards = useMemo(
    () => [
      {
        label: "Bankroll actuelle",
        value: kpis.currentBankroll,
        icon: (
          <Wallet
            size={18}
            className="text-[#F2CB38]"
            strokeWidth={1.5}
          />
        ),
        variant: "accent" as const,
        isCurrency: true,
        decimals: 2,
        subtext:
          kpis.currentBankroll >= kpis.initialBankroll
            ? `+${(kpis.currentBankroll - kpis.initialBankroll).toFixed(2)}€ depuis le début`
            : `${(kpis.currentBankroll - kpis.initialBankroll).toFixed(2)}€ depuis le début`,
        subtextVariant:
          kpis.currentBankroll >= kpis.initialBankroll
            ? ("success" as const)
            : ("danger" as const),
        delay: 0,
      },
      {
        label: "P&L",
        value: kpis.profitLoss,
        icon:
          kpis.profitLoss >= 0 ? (
            <TrendingUp
              size={18}
              className="text-green-400"
              strokeWidth={1.5}
            />
          ) : (
            <TrendingDown
              size={18}
              className="text-red-400"
              strokeWidth={1.5}
            />
          ),
        variant:
          kpis.profitLoss >= 0 ? ("success" as const) : ("danger" as const),
        isCurrency: true,
        decimals: 2,
        suffix: "€",
        subtext: `${kpis.betsTracked} paris évalués`,
        subtextVariant: "default" as const,
        delay: 0.1,
      },
      {
        label: "ROI",
        value: kpis.roi,
        icon: (
          <Trophy size={18} className="text-[#F2CB38]" strokeWidth={1.5} />
        ),
        variant: kpis.roi >= 0 ? ("accent" as const) : ("danger" as const),
        decimals: 1,
        suffix: "%",
        subtext:
          kpis.roi >= 0
            ? "Rentabilité positive"
            : "En dessous du seuil",
        subtextVariant:
          kpis.roi >= 0 ? ("success" as const) : ("danger" as const),
        delay: 0.2,
      },
      {
        label: "Série actuelle",
        value: kpis.streak.count,
        icon: (
          <Flame
            size={18}
            className={
              kpis.streak.type === "W" ? "text-green-400" : "text-red-400"
            }
            strokeWidth={1.5}
          />
        ),
        variant:
          kpis.streak.type === "W" ? ("success" as const) : ("danger" as const),
        subtext: `${kpis.streak.type === "W" ? "Victoires" : "Défaites"} consécutives`,
        subtextVariant: "default" as const,
        delay: 0.3,
      },
    ],
    [kpis]
  );

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={started ? "visible" : "hidden"}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => (
        <KpiCard key={card.label} {...card} started={started} />
      ))}
    </motion.div>
  );
}
