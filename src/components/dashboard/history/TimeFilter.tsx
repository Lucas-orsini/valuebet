"use client";

import { cn } from "@/lib/utils";

export type TimePeriod = '1M' | '3M' | '6M' | '1A' | 'ALL';

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: '1M', label: '1M' },
  { value: '3M', label: '3M' },
  { value: '6M', label: '6M' },
  { value: '1A', label: '1A' },
  { value: 'ALL', label: 'TOUT' },
];

interface TimeFilterProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export function TimeFilter({ selectedPeriod, onPeriodChange }: TimeFilterProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={cn(
            'px-3 py-1 rounded-md text-xs font-medium transition-colors',
            selectedPeriod === period.value
              ? 'bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20'
              : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
