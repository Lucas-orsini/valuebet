import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Value Bet AI | Intelligence Artificielle pour Paris Sportifs Tennis",
  description:
    "Notre modèle XGBoost analyse 276 000+ matchs ATP pour détecter les value bets avec un taux de réussite de 70% et un ROI moyen de 31.3%. Recevez vos alertes en temps réel sur Telegram.",
  keywords: [
    "value bet",
    "paris sportifs",
    "tennis",
    "IA",
    "machine learning",
    "XGBoost",
    "Paris hipiques",
    "Analyse tennis",
    "Tipster",
    "Paris rentables",
  ],
  authors: [{ name: "Value Bet AI" }],
  openGraph: {
    title: "Value Bet AI | Intelligence Artificielle pour Paris Sportifs Tennis",
    description:
      "Détectez les value bets avec notre IA. 276 000+ matchs analysés, 70% de réussite, ROI moyen 31.3%.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Value Bet AI | Paris Sportifs Tennis",
    description: "Intelligence artificielle pour détecter les value bets tennis.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23c8e614' rx='20' width='100' height='100'/><text x='50' y='68' font-size='50' text-anchor='middle' fill='white'>V</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
