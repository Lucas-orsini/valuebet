"use client";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface OddsRow {
  bookmaker: string;
  odds: number;
  isOptimal: boolean;
  edge: number;
}

const ODDS_COMPARISON_DATA: OddsRow[] = [
  { bookmaker: "Winamax", odds: 2.10, isOptimal: true, edge: 13.5 },
  { bookmaker: "Stake", odds: 2.05, isOptimal: false, edge: 10.8 },
  { bookmaker: "Unibet", odds: 2.00, isOptimal: false, edge: 8.1 },
  { bookmaker: "Betway", odds: 1.95, isOptimal: false, edge: 5.4 },
];

const FAIR_ODDS = 1.85;

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

function OddsRowComponent({ row, index }: { row: OddsRow; index: number }) {
  const hasValue = row.edge > 5;

  return (
    <motion.div
      custom={index}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        "flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200",
        row.isOptimal
          ? "border-green-500/30 bg-green-500/5 shadow-[0_0_12px_rgba(74,222,128,0.08)]"
          : "border-white/[0.05] bg-white/[0.02] hover:border-white/[0.08]"
      )}
    >
      {/* Bookmaker name */}
      <span
        className={cn(
          "flex-1 text-sm font-medium min-w-[80px]",
          row.isOptimal ? "text-zinc-100" : "text-zinc-400"
        )}
      >
        {row.bookmaker}
      </span>

      {/* Odds */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-lg font-bold tabular-nums",
            row.isOptimal ? "text-green-400" : "text-zinc-200"
          )}
        >
          {row.odds.toFixed(2)}
        </span>

        {/* Value badge */}
        {hasValue && (
          <span
            className={cn(
              "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
              row.isOptimal
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-white/5 text-zinc-500 border border-white/10"
            )}
          >
            Value
          </span>
        )}
      </div>

      {/* Edge indicator */}
      <span
        className={cn(
          "text-xs font-medium tabular-nums min-w-[50px] text-right",
          hasValue ? "text-green-400" : "text-zinc-500"
        )}
      >
        +{row.edge.toFixed(1)}%
      </span>

      {/* Optimal indicator */}
      {row.isOptimal && (
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg
            className="w-3 h-3 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export function OddsComparisonWidget() {
  const maxEdge = Math.max(...ODDS_COMPARISON_DATA.map((r) => r.edge));
  const avgOdds = ODDS_COMPARISON_DATA.reduce((sum, r) => sum + r.odds, 0) / ODDS_COMPARISON_DATA.length;

  return (
    <div className="mt-2 flex flex-col gap-3">
      {/* Match header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-2 pb-2 border-b border-white/[0.06]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-xs text-zinc-400 font-medium">
          ATP · Sinner vs Medvedev
        </span>
        <span className="text-[10px] text-zinc-600 ml-auto">Cote fair: {FAIR_ODDS.toFixed(2)}</span>
      </motion.div>

      {/* Odds rows */}
      <div className="flex flex-col gap-2">
        {ODDS_COMPARISON_DATA.map((row, index) => (
          <OddsRowComponent key={row.bookmaker} row={row} index={index} />
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex items-center justify-between pt-2 border-t border-white/[0.05]"
      >
        <span className="text-xs text-zinc-500">Edge max</span>
        <span className="text-sm font-bold text-green-400">+{maxEdge.toFixed(1)}%</span>
      </motion.div>
    </div>
  );
}
