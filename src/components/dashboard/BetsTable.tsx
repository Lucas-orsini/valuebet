"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACTIVE_BETS, ROI_COLORS, STATUS_COLORS } from "@/lib/dashboard-data";
import type { Bet } from "@/lib/dashboard-data";

export function BetsTable() {
  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-100">Paris actifs</h2>
          <span className="px-2 py-0.5 rounded-full bg-[#F2CB38]/10 border border-[#F2CB38]/20 text-[#F2CB38] text-[10px] font-medium">
            {ACTIVE_BETS.length}
          </span>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          Voir tout
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.05]">
              <th className="px-5 py-3 text-left text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Cote
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                B-E
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Unités
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                ROI
              </th>
              <th className="px-3 py-3 text-center text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {ACTIVE_BETS.map((bet, index) => (
              <BetRow key={bet.id} bet={bet} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <Clock size={12} />
          <span>Mise à jour en temps réel</span>
        </div>
        <span className="text-[11px] text-zinc-600">
          Tous les horaires en UTC
        </span>
      </div>
    </div>
  );
}

function BetRow({ bet, index }: { bet: Bet; index: number }) {
  const roiColors = ROI_COLORS[bet.roiLabel];
  const statusColors = STATUS_COLORS[bet.status];

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
    >
      {/* Match */}
      <td className="px-5 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-zinc-200 font-medium">
            {bet.player}
          </span>
          <span className="text-xs text-zinc-500">vs {bet.opponent}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-zinc-600">{bet.tournament}</span>
            <span className="text-[10px] text-zinc-600">·</span>
            <span className="text-[10px] text-zinc-600">{bet.surface}</span>
          </div>
        </div>
      </td>

      {/* Odds */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm font-semibold text-zinc-100 tabular-nums">
          {bet.odds.toFixed(2)}
        </span>
      </td>

      {/* Break-even */}
      <td className="px-3 py-4 text-center">
        <span className="text-sm text-zinc-500 tabular-nums">
          {bet.breakEven.toFixed(2)}
        </span>
      </td>

      {/* Units */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-md text-xs font-bold",
            bet.units === 3
              ? "bg-green-500/15 text-green-400"
              : bet.units === 2
              ? "bg-[#F2CB38]/15 text-[#F2CB38]"
              : "bg-white/[0.08] text-zinc-300"
          )}
        >
          {bet.units}u
        </span>
      </td>

      {/* ROI Label */}
      <td className="px-3 py-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              roiColors.dot
            )}
          />
          <span
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-medium",
              roiColors.bg,
              roiColors.text
            )}
          >
            {bet.edge >= 6
              ? "🟢 HIGH"
              : bet.edge >= 4
              ? "🟡 MED"
              : bet.edge >= 2
              ? "🟠 LOW"
              : "🔴 MIN"}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-4 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider",
            statusColors.bg,
            statusColors.text
          )}
        >
          {bet.status === "pending" && (
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          )}
          {bet.status === "won" && <ArrowUpRight size={10} />}
          {bet.status === "lost" && <ArrowDownRight size={10} />}
          {bet.status}
        </span>
      </td>
    </motion.tr>
  );
}
