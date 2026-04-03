"use client";

import { useState, useEffect } from "react";
import { Wallet, RotateCcw, Sparkles, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollConfig, Mode } from "@/lib/bankroll-data";

interface BankrollHeaderProps {
  config: BankrollConfig;
  onConfigChange: (config: BankrollConfig) => void;
  onReset: () => void;
}

export function BankrollHeader({
  config,
  onConfigChange,
  onReset,
}: BankrollHeaderProps) {
  const [initialBankroll, setInitialBankroll] = useState(
    config.initialBankroll.toString()
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setInitialBankroll(config.initialBankroll.toString());
  }, [config.initialBankroll]);

  const handleBankrollChange = (value: string) => {
    setInitialBankroll(value);
    setIsEditing(true);
  };

  const handleBankrollBlur = () => {
    const parsed = parseFloat(initialBankroll.replace(",", "."));
    if (!isNaN(parsed) && parsed > 0) {
      onConfigChange({ ...config, initialBankroll: parsed });
    } else {
      setInitialBankroll(config.initialBankroll.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleModeChange = (mode: Mode) => {
    onConfigChange({ ...config, mode });
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4">
        {/* Left side - Bankroll input */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
            <Wallet size={18} className="text-[#F2CB38]" />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="initial-bankroll"
              className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium"
            >
              Bankroll initiale
            </label>
            <div className="flex items-center gap-1">
              <input
                id="initial-bankroll"
                type="text"
                inputMode="decimal"
                value={initialBankroll}
                onChange={(e) => handleBankrollChange(e.target.value)}
                onBlur={handleBankrollBlur}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-28 h-8 px-3 rounded-md bg-[#0a0a0a] border text-sm font-semibold text-zinc-100 tabular-nums transition-colors focus:outline-none",
                  isEditing
                    ? "border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20"
                    : "border-white/[0.08] focus:border-[#F2CB38]/50"
                )}
              />
              <span className="text-sm text-zinc-500 font-medium">€</span>
            </div>
          </div>
        </div>

        {/* Center - Mode toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0a0a0a] border border-white/[0.08]">
          <button
            onClick={() => handleModeChange("auto")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              config.mode === "auto"
                ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/30 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Sparkles size={15} />
            <span className="hidden sm:inline">Auto</span>
          </button>
          <button
            onClick={() => handleModeChange("custom")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              config.mode === "custom"
                ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/30 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Hand size={15} />
            <span className="hidden sm:inline">Personnalisé</span>
          </button>
        </div>

        {/* Right side - Reset button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 h-9 px-4 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors"
        >
          <RotateCcw size={14} />
          Réinitialiser
        </button>
      </div>

      {/* Mode description */}
      <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <p className="text-xs text-zinc-500">
          {config.mode === "auto"
            ? "Mode automatique : tous les paris IA sont suivis. Modifiez la bankroll initiale pour recalculer."
            : "Mode personnalisé : cochez les paris joués et ajustez les cotes obtenues pour un suivi précis."}
        </p>
      </div>
    </div>
  );
}
