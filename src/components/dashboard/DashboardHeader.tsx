"use client";

import { RefreshCw, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  actions,
}: DashboardHeaderProps) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-white/[0.06] shrink-0 bg-[#0a0a0a]">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-zinc-100">{title}</h1>
        {subtitle && (
          <p className="text-xs text-zinc-500">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.06]">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-zinc-400">{formattedDate}</span>
        </div>

        {/* Custom actions slot */}
        {actions}

        {/* Search */}
        <button className="flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 transition-colors">
          <Search size={15} strokeWidth={1.5} />
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 transition-colors">
          <Bell size={15} strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F2CB38]" />
        </button>

        {/* Refresh */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Actualiser les données"
        >
          <RefreshCw size={15} strokeWidth={1.5} />
        </motion.button>
      </div>
    </header>
  );
}
