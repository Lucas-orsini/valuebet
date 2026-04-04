"use client";

import { useState, useRef, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BankrollMode } from "@/lib/bankroll-data";

interface BankrollHeaderProps {
  initialBankroll: number;
  mode: BankrollMode;
  onBankrollChange: (value: number) => void;
  onModeChange: (mode: BankrollMode) => void;
}

const TOOLTIP_AUTO =
  "Les paris sont automatiquement ajoutés depuis les recommandations de l'IA Haurus. Le ROI reflète la performance réelle.";

const TOOLTIP_MANUAL =
  "Sélectionnez manuellement les paris à inclure dans le suivi. Utilisez ce mode si vous ne suivez pas tous les paris recommandés.";

export function BankrollHeader({
  initialBankroll,
  mode,
  onBankrollChange,
  onModeChange,
}: BankrollHeaderProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close tooltip on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setTooltipVisible(false);
      }
    };

    if (tooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [tooltipVisible]);

  const handleModeToggle = () => {
    onModeChange(mode === "auto" ? "manual" : "auto");
    setTooltipVisible(false);
  };

  const handleHelpMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleHelpMouseLeave = () => {
    setTooltipVisible(false);
  };

  const tooltipText = mode === "auto" ? TOOLTIP_AUTO : TOOLTIP_MANUAL;

  return (
    <div
      ref={containerRef}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111] border border-white/[0.07] rounded-xl p-5"
    >
      {/* Left side: Initial bankroll input */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="initialBankroll"
          className="text-xs text-zinc-500 uppercase tracking-wider font-medium"
        >
          Bankroll initiale
        </label>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              id="initialBankroll"
              type="number"
              value={initialBankroll}
              onChange={(e) =>
                onBankrollChange(Number(e.target.value) || 0)
              }
              className="w-32 h-9 pl-3 pr-8 rounded-md bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#F97316]/50 focus:ring-1 focus:ring-[#F97316]/20 transition-colors tabular-nums"
              placeholder="1000"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              €
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Mode toggle with help */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Mode labels */}
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                mode === "auto"
                  ? "text-[#F97316]"
                  : "text-zinc-500"
              )}
            >
              Auto
            </span>
            <span className="text-zinc-600">/</span>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                mode === "manual"
                  ? "text-[#F97316]"
                  : "text-zinc-500"
              )}
            >
              Manuel
            </span>
          </div>

          {/* Toggle switch */}
          <button
            onClick={handleModeToggle}
            className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
            style={{
              backgroundColor:
                mode === "auto" ? "#F97316" : "rgba(255,255,255,0.1)",
            }}
            aria-label={`Mode actuel: ${mode === "auto" ? "automatique" : "manuel"}. Cliquer pour basculer."`}
          >
            <span
              className={cn(
                "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                mode === "auto" ? "translate-x-6" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        {/* Help button with tooltip */}
        <div
          ref={tooltipRef}
          className="relative"
          onMouseEnter={handleHelpMouseEnter}
          onMouseLeave={handleHelpMouseLeave}
        >
          <button
            className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] hover:bg-[#F97316]/20 transition-colors"
            aria-label="Aide sur le mode de suivi"
          >
            <HelpCircle size={14} strokeWidth={1.5} />
          </button>

          {/* Tooltip */}
          {tooltipVisible && (
            <div className="absolute right-0 top-full mt-2 w-72 p-3 rounded-lg bg-[#1a1a1a] border border-[#F97316]/30 shadow-xl z-50">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-1.5 shrink-0" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {tooltipText}
                </p>
              </div>
              {/* Tooltip arrow */}
              <div className="absolute -top-1.5 right-4 w-3 h-3 rotate-45 bg-[#1a1a1a] border-l border-t border-[#F97316]/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
