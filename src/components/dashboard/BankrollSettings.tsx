"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BankrollMode } from "@/lib/dashboard-data";

interface BankrollSettingsProps {
  initialBankroll: number;
  mode: BankrollMode;
  onBankrollChange: (value: number) => void;
  onModeChange: (mode: BankrollMode) => void;
}

export function BankrollSettings({
  initialBankroll,
  mode,
  onBankrollChange,
  onModeChange,
}: BankrollSettingsProps) {
  const handleBankrollInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(value) || 0;
    onBankrollChange(numValue);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#1a1a1a] border border-white/[0.07] rounded-xl">
      {/* Bankroll Input */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="initial-bankroll" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Bankroll initiale
          </label>
          <div className="relative">
            <input
              id="initial-bankroll"
              type="text"
              inputMode="decimal"
              value={initialBankroll}
              onChange={handleBankrollInput}
              className="h-10 w-36 pl-3 pr-8 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors tabular-nums"
              placeholder="500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              €
            </span>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-sm font-medium transition-colors",
          mode === 'auto' ? "text-zinc-100" : "text-zinc-500"
        )}>
          Automatique
        </span>
        
        <button
          onClick={() => onModeChange(mode === 'auto' ? 'custom' : 'auto')}
          className={cn(
            "relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F2CB38]/30 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]",
            mode === 'auto' ? "bg-[#F2CB38]" : "bg-zinc-700"
          )}
          aria-label={mode === 'auto' ? "Mode automatique activé" : "Mode personnalisé activé"}
        >
          <motion.div
            animate={{ x: mode === 'auto' ? 28 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
          />
        </button>

        <span className={cn(
          "text-sm font-medium transition-colors",
          mode === 'custom' ? "text-zinc-100" : "text-zinc-500"
        )}>
          Personnalisé
        </span>
      </div>
    </div>
  );
}
