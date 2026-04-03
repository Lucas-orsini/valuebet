import { Suspense } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BankrollTrackerContent } from "@/components/dashboard/BankrollTrackerContent";

function BankrollLoading() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
        {/* Header skeleton */}
        <div className="h-16 bg-[#111] border border-white/[0.07] rounded-xl animate-pulse" />
        
        {/* KPI cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/[0.07] rounded-xl p-5 animate-pulse"
            >
              <div className="h-3 bg-white/[0.06] rounded w-20 mb-4" />
              <div className="h-8 bg-white/[0.06] rounded w-28" />
            </div>
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="h-[300px] bg-[#111] border border-white/[0.07] rounded-xl animate-pulse" />

        {/* Table skeleton */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl animate-pulse">
          <div className="h-12 border-b border-white/[0.06]" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 border-b border-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BankrollPage() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Bankroll Tracker"
          subtitle="Suivez l'évolution de votre bankroll en temps réel"
        />

        {/* Scrollable content with Suspense */}
        <Suspense fallback={<BankrollLoading />}>
          <BankrollTrackerContent />
        </Suspense>

        {/* Footer */}
        <footer className="shrink-0 px-6 py-3 border-t border-white/[0.06] bg-[#0a0a0a]">
          <div className="flex items-center justify-between text-[11px] text-zinc-600">
            <span>© 2026 Haurus · Tous droits réservés</span>
            <div className="flex items-center gap-4">
              <span>Version 1.0.0</span>
              <span>·</span>
              <span>Mise à jour il y a 2 min</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
