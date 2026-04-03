"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Sparkles,
  Wallet,
  ScrollText,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, USER } from "@/lib/dashboard-data";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Trophy,
  Sparkles,
  Wallet,
  ScrollText,
  BarChart3,
  Settings,
};

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] px-3 py-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#F2CB38]/80 flex items-center justify-center shadow-[0_0_16px_rgba(242,203,56,0.25)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-zinc-100 tracking-tight">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = iconMap[item.icon] || LayoutDashboard;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2 h-9 rounded-lg text-sm transition-all duration-150 group relative",
                isActive
                  ? "bg-[#F2CB38]/10 text-zinc-100 font-medium"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F2CB38] rounded-full"
                />
              )}
              
              <Icon
                size={15}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-[#F2CB38]" : "text-zinc-500 group-hover:text-zinc-400"
                )}
              />
              <span className="flex-1">{item.label}</span>
              
              {/* Active dot */}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#F2CB38]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="mt-auto pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F2CB38] to-[#F2CB38]/60 flex items-center justify-center text-[11px] text-zinc-900 font-bold shrink-0">
            {USER.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 truncate">
              {USER.name}
            </p>
            <p className="text-[11px] text-zinc-500 truncate">{USER.plan}</p>
          </div>
          <ChevronDown
            size={12}
            className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0"
          />
        </div>
      </div>
    </aside>
  );
}
