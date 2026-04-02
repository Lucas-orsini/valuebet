import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord | Haurus",
  description: "Suivez vos performances et détectez les value bets en temps réel",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
