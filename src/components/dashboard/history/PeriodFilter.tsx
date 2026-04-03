"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TimeRange } from "@/lib/dashboard-data";

interface PeriodFilterProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

const PERIODS: { value: TimeRange; label: string }[] = [
  { value: "7D", label: "7J" },
  { value: "30D", label: "30J" },
  { value: "90D", label: "90J" },
  { value: "ALL", label: "TOUT" },
];

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-3"
    >
      <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
        {PERIODS.map((period) => (
          <button
            key={period.value}
            onClick={() => onChange(period.value)}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-150",
              value === period.value
                ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/25 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
            )}
          >
            {period.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
