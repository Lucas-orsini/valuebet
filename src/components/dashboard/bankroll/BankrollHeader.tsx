"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Wallet, Sparkles } from "lucide-react";
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
  const [inputValue, setInputValue] = useState(initialBankroll.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setError(null);

    if (value === "") {
      setIsEditing(true);
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Veuillez entrer un nombre valide");
      return;
    }

    if (numValue <= 0) {
      setError("La bankroll doit être supérieure à 0");
      return;
    }

    setIsEditing(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsEditing(false);
    const numValue = parseFloat(inputValue);

    if (isNaN(numValue) || numValue <= 0) {
      setInputValue(initialBankroll.toString());
      setError("Valeur réinitialisée à la bankroll initiale");
      return;
    }

    onBankrollChange(numValue);
  }, [inputValue, initialBankroll, onBankrollChange]);

  const handleModeToggle = useCallback(() => {
    onModeChange(mode === "auto" ? "manual" : "auto");
  }, [mode, onModeChange]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Bankroll Input */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#F2CB38]/10 border border-[#F2CB38]/20 flex items-center justify-center">
              <Wallet size={18} className="text-[#F2CB38]" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                Bankroll initiale
              </h2>
              <p className="text-xs text-zinc-500">
                Entrez votre capital de départ
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                placeholder="500"
                className={cn(
                  "w-full h-12 px-4 pr-12 rounded-lg bg-[#0a0a0a] border text-lg font-semibold text-zinc-100 placeholder:text-zinc-600 transition-colors",
                  error
                    ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-white/[0.08] focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20"
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-zinc-500">
                €
              </span>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-red-400"
              >
                {error}
              </motion.p>
            )}
            {isEditing && !error && (
              <p className="mt-1.5 text-xs text-zinc-500">
                Appuyez sur Entrée ou cliquez ailleurs pour valider
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-20 bg-white/[0.06]" />

        {/* Mode Toggle */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Sparkles size={18} className="text-orange-400" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                Mode de suivi
              </h2>
              <p className="text-xs text-zinc-500">
                Choisissez comment suivre vos paris
              </p>
            </div>
          </div>

          {/* Toggle Switch + Help Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleModeToggle}
              className="relative w-full max-w-[280px] h-12 rounded-lg bg-[#0a0a0a] border border-white/[0.08] p-1 cursor-pointer"
            >
              {/* Sliding background — orange gradient */}
              <motion.div
                className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-md bg-gradient-to-r from-orange-500 to-orange-600"
                animate={{ x: mode === "manual" ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />

              {/* Labels */}
              <div className="relative flex h-full">
                <div
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-md transition-colors z-10",
                    mode === "auto" ? "text-white" : "text-zinc-500"
                  )}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v18" />
                    <rect
                      x="4"
                      y="8"
                      width="16"
                      height="8"
                      rx="2"
                    />
                    <path d="M4 14h16" />
                  </svg>
                  <span className="text-sm font-medium">Automatique</span>
                </div>
                <div
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-md transition-colors z-10",
                    mode === "manual" ? "text-white" : "text-zinc-500"
                  )}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-sm font-medium">Personnalisé</span>
                </div>
              </div>
            </button>

            {/* Help Button */}
            <button
              type="button"
              onClick={() => setShowTooltip((v) => !v)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] transition-colors shrink-0"
              aria-label="Aide sur les modes de suivi"
            >
              <span className="text-sm font-medium">?</span>
            </button>
          </div>

          {/* Tooltip */}
          <div
            className={cn(
              "absolute lg:relative mt-2 lg:mt-0 z-50 pointer-events-none transition-opacity duration-200 max-w-[280px]",
              showTooltip ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="bg-[#1a1a1a] border border-white/[0.12] rounded-lg p-3 shadow-xl">
              <p className="text-xs font-semibold text-zinc-200 mb-2">
                Différence entre les modes
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-[11px] font-medium text-orange-400 mb-0.5">
                    Automatique
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Le suivi inclut automatiquement tous les paris recommandés par l&apos;IA Haurus.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-zinc-300 mb-0.5">
                    Personnalisé
                  </p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Sélectionnez manuellement les paris à inclure dans le calcul de votre bankroll.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mode description */}
          <div className="mt-2">
            {mode === "auto" ? (
              <p className="text-xs text-zinc-500">
                Suivi automatique des paris recommandés par l&apos;IA
              </p>
            ) : (
              <p className="text-xs text-zinc-500">
                Sélectionnez manuellement les paris à inclure dans le suivi
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
