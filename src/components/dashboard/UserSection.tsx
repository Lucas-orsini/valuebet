"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, LogOut, ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type UserSectionState = "loading" | "authenticated" | "error";

interface UserInfo {
  initials: string;
  fullName: string;
  email: string;
  plan: string;
}

function calculateInitials(fullName: string | undefined | null): string {
  if (!fullName) return "—";
  
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return "—";
  
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {/* Plan badge skeleton */}
      <div className="flex items-center justify-between px-2">
        <div className="w-8 h-2 bg-white/[0.06] rounded animate-pulse" />
        <div className="w-12 h-4 bg-white/[0.06] rounded-full animate-pulse" />
      </div>
      
      {/* User info skeleton */}
      <div className="flex items-center gap-2.5 p-2">
        <div className="w-8 h-8 rounded-full bg-white/[0.06] animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="w-24 h-3 bg-white/[0.06] rounded animate-pulse" />
          <div className="w-32 h-2 bg-white/[0.06] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function UserSection() {
  const router = useRouter();
  const supabase = createClient();
  
  const [state, setState] = useState<UserSectionState>("loading");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
          setState("error");
          return;
        }

        if (!user) {
          setState("error");
          return;
        }

        const fullName = user.user_metadata?.full_name;
        const plan = user.user_metadata?.plan;

        setUserInfo({
          initials: calculateInitials(fullName),
          fullName: fullName || "—",
          email: user.email || "—",
          plan: plan || "Gratuit",
        });
        setState("authenticated");
      } catch {
        console.error("Erreur inattendue lors de la récupération de l'utilisateur");
        setState("error");
      }
    };

    fetchUser();
  }, [supabase.auth]);

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
    <div className="px-3 py-4 border-t border-white/[0.06]">
      {state === "loading" && <LoadingSkeleton />}
      
      {state !== "loading" && (
        <>
          {/* Plan badge */}
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Plan
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F2CB38]/10 border border-[#F2CB38]/20 text-[#F2CB38] text-[10px] font-medium">
              {userInfo?.plan || "Gratuit"}
            </span>
          </div>

          {/* User info */}
          <div className="flex items-center gap-2.5 p-2 rounded-md hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center text-[11px] text-zinc-200 font-medium">
              {userInfo?.initials || "—"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-200 truncate">
                {userInfo?.fullName || "—"}
              </p>
              <p className="text-[11px] text-zinc-500 truncate">
                {userInfo?.email || "—"}
              </p>
            </div>
            <ChevronRight
              size={14}
              className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
            />
          </div>

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 w-full px-2 py-2 mt-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-colors"
          >
            <Settings size={15} strokeWidth={1.5} />
            <span className="text-xs">Paramètres</span>
          </Link>

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
        </>
      )}
    </div>
  );
}
