"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Trophy } from "lucide-react";
import { miamiOpenResults } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { MiamiOpenResult } from "@/lib/data";

export function ResultsSection() {
  const wins = miamiOpenResults.filter((r: MiamiOpenResult) => r.result === "W").length;
  const totalStake = miamiOpenResults.reduce((acc: number, r: MiamiOpenResult) => acc + r.stake, 0);
  const totalProfit = miamiOpenResults.reduce((acc: number, r: MiamiOpenResult) => acc + r.profit, 0);
  const winRate = Math.round((wins / miamiOpenResults.length) * 100);

  return (
    <section id="resultats" className="py-24 px-6 bg-[#09090b]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium uppercase tracking-widest mb-4">
            Résultats
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-50 tracking-[-0.03em] leading-tight mb-4">
            Miami Open 2025 · 10 derniers paris
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Historique complet et vérifiable de nos recommandations sur le Miami Open.
          </p>
        </motion.div>

        {/* Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/[0.07] bg-[#111] overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 p-4 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 col-span-2">
              Match
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 text-center">
              Cote
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 text-center">
              Mise
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 text-center">
              Résult.
            </span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 text-right">
              Profit
            </span>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.04]">
            {miamiOpenResults.map((result: MiamiOpenResult, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-5 sm:grid-cols-6 gap-2 p-4 items-center hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm text-zinc-200 col-span-2 line-clamp-1">
                  {result.player}
                </span>
                <span className="text-sm text-zinc-400 text-center">
                  {result.odds.toFixed(2)}
                </span>
                <span className="text-sm text-zinc-300 text-center">
                  {result.stake}u
                </span>
                <div className="flex justify-center">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold",
                      result.result === "W"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {result.result}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-sm font-medium text-right flex items-center justify-end gap-1",
                    result.profit >= 0 ? "text-green-400" : "text-red-400"
                  )}
                >
                  {result.profit >= 0 ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {result.profit >= 0 ? "+" : ""}
                  {result.profit.toFixed(2)}€
                </span>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border-t border-white/[0.06] bg-white/[0.02]">
            <div className="text-center">
              <p className="text-lg font-bold text-zinc-100">{winRate}%</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Victoires
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-zinc-100">{totalStake}u</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Mise totale
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-400">
                +{totalProfit.toFixed(2)}€
              </p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Profit net
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-orange-400">+{((totalProfit / totalStake) * 100).toFixed(1)}%</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                ROI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-zinc-600 text-center mt-6"
        >
          ⚠️ Ces résultats sont passés et ne garantissent pas les performances futures.
          Les paris sportifs comportent des risques.
        </motion.p>
      </div>
    </section>
  );
}
