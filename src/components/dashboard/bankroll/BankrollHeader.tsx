"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollMode } from "@/lib/bankroll-data";

interface BankrollHeaderProps {
  initialBankroll: number;
  mode: BankrollMode;
  onBankrollChange: (value: number) => void;
  onModeChange: (mode: BankrollMode) => void;
}

const TOOLTIP_TEXT = {
  auto: "Mode automatique : suivi basé sur les recommandations IA du modèle. Les paris recommandés par Haurus sont automatiquement ajoutés à votre historique.",
  custom: "Mode personnalisé : vous saisissez vos propres cotes et suivez manuellement vos paris pour une analyse adaptée à votre stratégie.",
};

export function BankrollHeader({
  initialBankroll,
  mode,
  onBankrollChange,
  onModeChange,
}: BankrollHeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Left side - Title and help */}
      <div className="flex items-center gap-3">
        {/* Bankroll input */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-zinc-400">Bankroll initiale</label>
          <div className="relative">
            <input
              type="number"
              value={initialBankroll}
              onChange={(e) => onBankrollChange(Number(e.target.value))}
              className="w-28 h-9 px-3 pr-8 rounded-lg bg-[#1a1a1a] border border-white/[0.08] text-sm text-zinc-100 focus:outline-none focus:border-[#F2AB05]/50 focus:ring-1 focus:ring-[#F2AB05]/20 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
              €
            </span>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Mode</span>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <button
              onClick={() => onModeChange("auto")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mode === "auto"
                  ? "bg-[#F2AB05]/15 text-[#F2AB05] border border-[#F2AB05]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Automatique
            </button>
            <button
              onClick={() => onModeChange("custom")}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                mode === "custom"
                  ? "bg-[#F2AB05]/15 text-[#F2AB05] border border-[#F2AB05]/20"
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Personnalisé
            </button>
          </div>

          {/* Help icon with tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              className="flex items-center justify-center w-6 h-6 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-colors"
              aria-label="Aide sur les modes"
            >
              <HelpCircle size={16} strokeWidth={1.5} />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none"
                >
                  <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl min-w-[280px] max-w-[320px]">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F2AB05] mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-zinc-200 mb-1">
                            Mode automatique
                          </p>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            {TOOLTIP_TEXT.auto}
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-white/[0.06]" />
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F2AB05] mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-zinc-200 mb-1">
                            Mode personnalisé
                          </p>
                          <p className="text-[11px] text-zinc-400 leading-relaxed">
                            {TOOLTIP_TEXT.custom}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] border-r border-b border-white/[0.12] rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
