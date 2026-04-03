import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { HistoryContent } from "@/components/dashboard/history/HistoryContent";
import { TimeFilter, type TimePeriod } from "@/components/dashboard/history/TimeFilter";

export const metadata = {
  title: "Historique | Haurus",
  description: "Consultez l'historique complet de vos paris et performances",
  robots: "noindex, nofollow",
};

// Client wrapper component that manages TimeFilter state
function TimeFilterActions() {
  "use client";
  
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("ALL");

  return (
    <TimeFilter
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
    />
  );
}

// Import useState at the top level
import { useState } from "react";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Historique"
          subtitle="Historique complet et statistiques de vos paris"
          actions={<TimeFilterActions />}
        />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
            {/* Content with stats, chart, and table */}
            <HistoryContent />
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
