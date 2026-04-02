import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Tableau de bord | Haurus",
  description: "Suivez vos performances et détectez les value bets en temps réel",
  robots: "noindex, nofollow",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      {/* Skeleton overlay rendered during server session check */}
      <div className="flex h-screen bg-[var(--bg)] animate-pulse" aria-hidden="true">
        {/* Sidebar skeleton */}
        <div className="w-[240px] h-screen bg-[var(--surface-1)] border-r border-[var(--border)] shrink-0">
          <div className="px-4 py-5 border-b border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)]" />
              <div className="h-4 w-16 rounded bg-[var(--surface-2)]" />
            </div>
          </div>
          <div className="px-3 py-4 flex flex-col gap-2">
            <div className="h-8 rounded-md bg-[var(--surface-2)] w-full" />
            <div className="h-8 rounded-md bg-[var(--surface-2)] w-3/4" />
            <div className="h-8 rounded-md bg-[var(--surface-2)] w-2/3" />
          </div>
        </div>

        {/* Main skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-[var(--border)] px-6 flex items-center">
            <div className="h-4 w-40 rounded bg-[var(--surface-2)]" />
          </div>
          <div className="flex-1 p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl bg-[var(--surface-1)] border border-[var(--border)]"
                />
              ))}
            </div>
            <div className="h-64 rounded-xl bg-[var(--surface-1)] border border-[var(--border)]" />
          </div>
        </div>
      </div>

      {/* Actual content (only rendered after session check passes) */}
      {children}
    </>
  );
}
