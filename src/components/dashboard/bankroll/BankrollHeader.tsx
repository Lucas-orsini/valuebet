"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle, Sparkles, Pencil, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollMode } from "@/lib/bankroll-data";

interface BankrollHeaderProps {
  initialBankroll: number;
  mode: BankrollMode;
  onBankrollChange: (value: number) => void;
  onModeChange: (mode: BankrollMode) => void;
}

export function BankrollHeader({
  initialBankroll,
  mode,
  onBankrollChange,
  onModeChange,
}: BankrollHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTooltip &&
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  const handleBankrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    const numValue = parseFloat(value) || 0;
    onBankrollChange(numValue);
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
            <Wallet size={20} className="text-[#F2CB38]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-zinc-100">
              Bankroll Tracker
            </h2>
            <p className="text-xs text-zinc-500">
              Suivez l&apos;évolution de votre capital
            </p>
          </div>
        </div>

        {/* Help button with tooltip */}
        <div className="relative">
          <button
            ref={triggerRef}
            onClick={() => setShowTooltip(!showTooltip)}
            className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] flex items-center justify-center transition-all duration-150 group"
            aria-label="Aide sur les modes de suivi"
          >
            <HelpCircle
              size={16}
              className={cn(
                "text-zinc-500 transition-colors",
                showTooltip
                  ? "text-[#F2CB38]"
                  : "group-hover:text-zinc-300"
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div
              ref={tooltipRef}
              className="absolute right-0 top-full mt-2 w-80 p-4 bg-[#1a1a1a] border border-white/[0.12] rounded-xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              {/* Arrow */}
              <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[#1a1a1a] border-l border-t border-white/[0.12] rotate-45" />

              {/* Content */}
              <div className="relative space-y-4">
                {/* Auto mode */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-[#F2CB38]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100 mb-1">
                      Automatique
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Le suivi est géré automatiquement par notre IA qui analyse vos paris.
                    </p>
                  </div>
                </div>

                {/* Custom mode */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.10] flex items-center justify-center shrink-0">
                    <Pencil size={16} className="text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100 mb-1">
                      Personnalisé
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Vous pouvez entrer manuellement les cotes et sélectionner les paris à suivre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bankroll input and mode toggle row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Bankroll input */}
        <div className="flex-1 w-full">
          <label
            htmlFor="initial-bankroll"
            className="block text-xs text-zinc-500 uppercase tracking-wider mb-2"
          >
            Bankroll initiale
          </label>
          <div className="relative">
            <input
              id="initial-bankroll"
              type="text"
              inputMode="decimal"
              value={initialBankroll.toFixed(2)}
              onChange={handleBankrollChange}
              className="w-full h-11 px-4 pr-12 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-zinc-100 text-sm font-medium placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 font-medium">
              €
            </span>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex-1 w-full">
          <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">
            Mode de suivi
          </label>
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#0a0a0a] border border-white/[0.08]">
            <button
              onClick={() => onModeChange("auto")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 h-9 px-3 rounded-md text-sm font-medium transition-all duration-150",
                mode === "auto"
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              )}
            >
              <Sparkles size={14} strokeWidth={1.5} />
              Auto
            </button>
            <button
              onClick={() => onModeChange("custom")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 h-9 px-3 rounded-md text-sm font-medium transition-all duration-150",
                mode === "custom"
                  ? "bg-[#F2CB38]/15 text-[#F2CB38] border border-[#F2CB38]/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              )}
            >
              <Pencil size={14} strokeWidth={1.5} />
              Personnalisé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
