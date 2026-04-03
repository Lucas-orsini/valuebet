"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ScrollText,
  BarChart3,
  Settings,
  Wallet,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { USER } from "@/lib/dashboard-data";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/bets", label: "Mes paris", icon: Trophy },
  { href: "/dashboard/bankroll", label: "Bankroll", icon: Wallet },
  { href: "/dashboard/history", label: "Historique", icon: ScrollText },
  { href: "/dashboard/analytics", label: "Analyses", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-[240px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#F2CB38]/80 flex items-center justify-center shadow-[0_0_16px_rgba(242,203,56,0.2)]">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>
        <span className="text-base font-semibold text-zinc-100 tracking-tight">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 px-3 h-9 rounded-lg text-sm transition-all duration-150",
                  active
                    ? "bg-[#F2CB38]/10 text-[#F2CB38] font-medium border-l-2 border-[#F2CB38]"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                )}
              >
                <Icon size={16} strokeWidth={1.5} className={active ? "text-[#F2CB38]" : ""} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2CB38]/20 to-[#F2CB38]/5 border border-[#F2CB38]/20 flex items-center justify-center text-[#F2CB38] text-xs font-bold">
              {USER.initials}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">
                {USER.name}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">{USER.plan}</p>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "text-zinc-500 transition-transform",
                isUserMenuOpen && "rotate-180"
              )}
            />
          </button>

          {/* Dropdown menu */}
          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1a] border border-white/[0.10] rounded-lg shadow-xl overflow-hidden z-50">
                <div className="p-1">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-white/[0.05] transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={14} />
                    Profil
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-white/[0.05] transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings size={14} />
                    Paramètres
                  </Link>
                </div>
                <div className="border-t border-white/[0.06] p-1">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <LogOut size={14} />
                    Déconnexion
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
