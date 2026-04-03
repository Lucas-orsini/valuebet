"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ScrollText,
  BarChart3,
  Settings,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/dashboard-data";

const ICON_MAP = {
  LayoutDashboard,
  Trophy,
  ScrollText,
  BarChart3,
  Settings,
  Wallet,
} as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] px-3 py-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#F2CB38]/80 flex items-center justify-center shadow-[0_0_16px_rgba(242,203,56,0.25)]">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <span className="text-sm font-semibold text-zinc-100 tracking-tight">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? LayoutDashboard;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-2 h-9 rounded-lg text-sm transition-all duration-150",
                isActive
                  ? "bg-white/[0.08] text-zinc-100 font-medium border-l-2 border-[#F2CB38]"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              )}
            >
              <Icon size={16} strokeWidth={1.5} className={isActive ? "text-[#F2CB38]" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors border-t border-white/[0.05] pt-3 mt-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-[11px] text-zinc-200 font-medium shrink-0">
          TM
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-zinc-200 truncate">
            Thomas Martin
          </span>
          <span className="text-[11px] text-zinc-500 truncate">Pro</span>
        </div>
      </div>
    </aside>
  );
}
