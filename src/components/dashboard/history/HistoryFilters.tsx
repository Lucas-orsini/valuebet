"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, X, Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOURNAMENTS } from "@/lib/dashboard-data";
import type { Surface, RoiLabel } from "@/lib/dashboard-data";

export interface FilterState {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  tournament: string;
  surface: string;
  roi: string;
  search: string;
}

interface HistoryFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const SURFACES: { value: Surface | ""; label: string }[] = [
  { value: "", label: "Toutes surfaces" },
  { value: "hard", label: "Dur" },
  { value: "clay", label: "Terre battue" },
  { value: "grass", label: "Gazon" },
];

const ROI_FILTERS: { value: RoiLabel | ""; label: string }[] = [
  { value: "", label: "Tous les ROI" },
  { value: "green", label: "🟢 HIGH (+6%)" },
  { value: "yellow", label: "🟡 MED (4-6%)" },
  { value: "orange", label: "🟠 LOW (2-4%)" },
  { value: "red", label: "🔴 MIN (-2%)" },
];

export function HistoryFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
}: HistoryFiltersProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");

  const formatDateDisplay = () => {
    if (!filters.dateRange.start && !filters.dateRange.end) {
      return "Toutes les dates";
    }
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
      });
    };
    if (filters.dateRange.start && filters.dateRange.end) {
      return `${formatDate(filters.dateRange.start)} - ${formatDate(filters.dateRange.end)}`;
    }
    if (filters.dateRange.start) {
      return `À partir du ${formatDate(filters.dateRange.start)}`;
    }
    return `Jusqu'au ${formatDate(filters.dateRange.end)}`;
  };

  const handleDateApply = useCallback(() => {
    onFiltersChange({
      ...filters,
      dateRange: {
        start: tempStartDate ? new Date(tempStartDate) : null,
        end: tempEndDate ? new Date(tempEndDate) : null,
      },
    });
    setShowDatePicker(false);
  }, [filters, tempStartDate, tempEndDate, onFiltersChange]);

  const handleClearDates = useCallback(() => {
    onFiltersChange({
      ...filters,
      dateRange: { start: null, end: null },
    });
    setTempStartDate("");
    setTempEndDate("");
  }, [filters, onFiltersChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">Filtres</h2>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 rounded-full bg-[#F2CB38]/10 text-[#F2CB38] text-[10px] font-medium">
              Actifs
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={12} />
            Effacer tout
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 bg-white/[0.02]">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-[300px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            placeholder="Rechercher un joueur..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#F2CB38]/50 focus:ring-1 focus:ring-[#F2CB38]/20 transition-colors"
          />
        </div>

        {/* Date Range */}
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={cn(
              "h-9 px-3 rounded-lg border text-sm transition-colors flex items-center gap-2",
              filters.dateRange.start || filters.dateRange.end
                ? "bg-[#F2CB38]/10 border-[#F2CB38]/30 text-[#F2CB38]"
                : "bg-[#0a0a0a] border-white/[0.08] text-zinc-300 hover:border-white/[0.12]"
            )}
          >
            <Calendar size={14} />
            <span className="hidden sm:inline">{formatDateDisplay()}</span>
            <ChevronDown size={14} className="text-zinc-500" />
          </button>

          {/* Date picker dropdown */}
          {showDatePicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 z-50 bg-[#1a1a1a] border border-white/[0.10] rounded-lg p-4 shadow-xl min-w-[280px]"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-md bg-[#111] border border-white/[0.08] text-sm text-zinc-200 focus:outline-none focus:border-[#F2CB38]/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1 block">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-md bg-[#111] border border-white/[0.08] text-sm text-zinc-200 focus:outline-none focus:border-[#F2CB38]/50"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleClearDates}
                    className="flex-1 h-8 px-3 rounded-md border border-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 hover:border-white/[0.15] transition-colors"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={handleDateApply}
                    className="flex-1 h-8 px-3 rounded-md bg-[#F2CB38] hover:bg-[#F2CB38]/90 text-white text-xs font-medium transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tournament */}
        <select
          value={filters.tournament}
          onChange={(e) =>
            onFiltersChange({ ...filters, tournament: e.target.value })
          }
          className="h-9 px-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-white/[0.12]"
        >
          {TOURNAMENTS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Surface */}
        <select
          value={filters.surface}
          onChange={(e) =>
            onFiltersChange({ ...filters, surface: e.target.value })
          }
          className="h-9 px-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-white/[0.12]"
        >
          {SURFACES.map((s) => (
            <option key={s.value || "all"} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* ROI */}
        <select
          value={filters.roi}
          onChange={(e) => onFiltersChange({ ...filters, roi: e.target.value })}
          className="h-9 px-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-sm text-zinc-300 focus:outline-none focus:border-[#F2CB38]/50 transition-colors appearance-none pr-8 cursor-pointer hover:border-white/[0.12]"
        >
          {ROI_FILTERS.map((r) => (
            <option key={r.value || "all"} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
}
