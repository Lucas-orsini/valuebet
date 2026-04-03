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
  Wallet,
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
  Wallet,
};

// Navigation items with bankroll added
const NAV_ITEMS_WITH_BANKROLL = [
  ...NAV_ITEMS,
  { href: "/dashboard/bankroll", label: "Bankroll Tracker", icon: "Wallet" },
];

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
        <div className="w-8 h-8  flex items-center justify-center ">
                <svg
      className="w-full h-full"
      viewBox="-14 -14 94.48 80.94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
      stroke="#E5B830"
      strokeWidth="2"
      fill="#E5B830"
      d="M65.49,24.02c-.98-2.02-2.41-3.72-4.19-5.11l-1.61-1.25c-.35-3.05-2.22-5.95-4.38-8.11C48.6,2.82,39.24-.49,29.77.06c-7.39.43-14.46,3.13-19.96,8.11l-2.55,2.58C3.12,15.42.61,21.23.08,27.45c-.07.86-.14,1.61.05,2.47,4.25-9.8,11.04-15.91,21.98-16.26,5.19-.17,10.27.71,15.22,2.42-.31,2.22,0,4.35,1.12,6.24,1.65,2.77,4.86,4.14,7.99,3.4,1.62-.41,2.95-1.29,3.82-2.72l-1.62-.47c-2.26,1.87-5.67,1.56-7.42-.81-.99-1.34-1.23-3-1.02-4.6l1.89.79.61.79c1.2,1.21,2.81,1.64,4.4,1.51,1.75.83,3.43,1.48,5.27,1.95l5.33,1.37c-4.39,2.49-7.89,5.99-9.97,10.6,2.78-2.54,5.56-4.68,9.33-5.1,2.74-.22,5.51.76,5.9,3.57.14.98.02,1.89-.16,3.03,3.65-2.67,4.69-7.56,2.71-11.62ZM56.39,19.01c-1,1.13-3.41.46-4.97-.29l-5.73-2.72c-3.16-1.5-6.29-2.79-9.68-3.74-7.53-2.12-15.34-2.58-23.02-.98l1.49-1.31c6.17-4.59,13.85-6.83,21.56-6.15,3.93.35,7.57,1.58,11,3.46,3.17,1.74,6.55,4.44,8.65,7.38,1,1.4,1.83,3.11.72,4.35Z"
      />
      <path
      stroke="#E5B830"
      strokeWidth="2"
      fill="#E5B830"
      d="M24.18,42.26c-.97-2.28-1.06-4.75-.21-7.07,1.83-4.61,5.95-6.7,10.74-7.71-3.12-1.31-6.15-2.11-9.36-2.45-6.47-.66-12.65.26-17.9,4.2-2.34,1.76-4.13,4.02-5.39,6.66-.15.31-.32.57-.34.93,2.6-2.96,5.66-5.31,9.29-6.88,4.45-1.86,9.29-2.43,14.19-1.7-4.06,3.26-5.92,8.48-4.23,13.44.94,2.69,2.6,4.87,4.74,6.68,2.73,2.16,5.84,3.83,9.37,4.58-4.5-2.59-8.89-5.87-10.9-10.68Z"
      />
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
        {NAV_ITEMS_WITH_BANKROLL.map((item) => {
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
