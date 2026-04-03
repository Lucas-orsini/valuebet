import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return children
}

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userEmail = session?.user?.email || "Utilisateur";
  const userName = session?.user?.user_metadata?.full_name || userEmail.split("@")[0];

  return {
    title: `Tableau de bord | ${userName} | Haurus`,
    description: `Tableau de bord de ${userName} - Suivez vos performances et détectez les value bets en temps réel`,
    robots: "noindex, nofollow",
  };
}
