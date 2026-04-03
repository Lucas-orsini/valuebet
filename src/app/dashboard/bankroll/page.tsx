import { Suspense } from "react";
import { BankrollTracker } from "@/components/dashboard/bankroll/BankrollTracker";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function BankrollLoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#F2CB38]/20 border-t-[#F2CB38] rounded-full animate-spin" />
        <p className="text-sm text-zinc-500">Chargement du tracker...</p>
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
          title="Bankroll"
          subtitle="Suivez l'évolution de votre bankroll et vos performances"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1600px] mx-auto">
            <Suspense fallback={<BankrollLoadingFallback />}>
              <BankrollTracker />
            </Suspense>
          </div>
        </div>

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
