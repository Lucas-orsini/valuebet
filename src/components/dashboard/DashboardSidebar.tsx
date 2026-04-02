"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  ScrollText,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, USER } from "@/lib/dashboard-data";
import { createClient } from "@/lib/supabase/client";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Trophy,
  ScrollText,
  BarChart3,
  Settings,
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClient();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Erreur lors de la déconnexion:", error.message);
        setIsLoggingOut(false);
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      console.error("Erreur inattendue lors de la déconnexion");
      setIsLoggingOut(false);
    }
  };

  return (
    <aside className="w-[240px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#E5B830] flex items-center justify-center shadow-[0_0_16px_rgba(242,203,56,0.2)]">
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
        <span className="text-sm font-semibold text-zinc-100 tracking-tight">
          Haurus
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
        <p className="px-2 mb-2 text-[10px] font-medium text-zinc-600 uppercase tracking-wider">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2.5 px-2 h-9 rounded-md text-sm transition-all duration-150",
                isActive
                  ? "bg-[#F2CB38]/10 text-[#F2CB38] font-medium"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F2CB38] rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon size={16} strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        {/* Plan badge */}
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
            Plan
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#F2CB38]/10 border border-[#F2CB38]/20 text-[#F2CB38] text-[10px] font-medium">
            {USER.plan}
          </span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-2.5 p-2 rounded-md hover:bg-white/[0.03] transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-[11px] text-zinc-200 font-medium">
            {USER.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 truncate">
              {USER.name}
            </p>
            <p className="text-[11px] text-zinc-500 truncate">{USER.email}</p>
          </div>
          <ChevronRight
            size={14}
            className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
          />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2.5 w-full px-2 py-2 mt-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Se déconnecter"
        >
          {isLoggingOut ? (
            <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
          ) : (
            <LogOut size={15} strokeWidth={1.5} />
          )}
          <span className="text-xs">
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </span>
        </button>
      </div>
    </aside>
  );
}
