import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { BetsTable } from "@/components/dashboard/BetsTable";
import { BankrollChart } from "@/components/dashboard/BankrollChart";
import { ValueOfTheDay } from "@/components/dashboard/ValueOfTheDay";
import { BetHistoryTable } from "@/components/dashboard/BetHistoryTable";
import { KPI_DATA } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Tableau de bord"
          subtitle="Vue d'ensemble de vos performances"
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6 overflow-hidden">
            {/* KPI Cards */}
            <KpiCards data={KPI_DATA} />

            {/* Bankroll & Value section - side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Bankroll Chart - 60% width */}
              <div className="lg:col-span-3">
                <BankrollChart />
              </div>

              {/* Value of the Day - 40% width */}
              <div className="lg:col-span-2">
                <ValueOfTheDay />
              </div>
            </div>

            {/* Bet History - fills remaining vertical space */}
            <div className="flex-1 min-h-0">
              <BetHistoryTable />
            </div>
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
