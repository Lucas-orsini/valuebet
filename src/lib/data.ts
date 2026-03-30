import type { Variants } from "framer-motion";

export const navigation = [
  { name: "Fonctionnalités", href: "#features" },
  { name: "Comment ça marche", href: "#how" },
  { name: "Résultats", href: "#resultats" },
  { name: "Témoignages", href: "#temoignages" },
  { name: "Tarifs", href: "#tarifs" },
];

export const footerLinks = [
  {
    title: "Produit",
    links: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Tarifs", href: "#tarifs" },
      { name: "Historique", href: "#resultats" },
    ],
  },
  {
    title: "Société",
    links: [
      { name: "À propos", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carrières", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Contact", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  },
];

export interface Feature {
  id: string;
  title: string;
  description: string;
  accent?: string;
  icon: string;
}

export const features: Feature[] = [
  {
    id: "xgboost",
    title: "Modèle XGBoost",
    description: "Algorithme de machine learning entraîné sur des millions de données tennis.",
    accent: "276 000+ matchs",
    icon: "brain",
  },
  {
    id: "realtime",
    title: "Cotes en temps réel",
    description: "Mise à jour des cotes et détection des value bets en moins de 30 secondes.",
    icon: "zap",
  },
  {
    id: "bookmakers",
    title: "Multi-bookmakers",
    description: "Comparaison des cotes chez les principaux bookmakers français.",
    icon: "layout-grid",
  },
  {
    id: "telegram",
    title: "Alertes Telegram",
    description: "Recevez vos recommandations directement sur Telegram.",
    icon: "send",
  },
  {
    id: "units",
    title: "Gestion des mises",
    description: "Système de gestion de bankroll avec mise en unités (1u, 2u, 3u).",
    icon: "sliders",
  },
  {
    id: "transparency",
    title: "Transparence totale",
    description: "Accès à l'historique complet, logs du modèle et statistiques de performance.",
    icon: "eye",
  },
];

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  time: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Collecte des données",
    description:
      "Notre système scrappe automatiquement les matchs ATP/WTA et les cotes en temps réel auprès de plus de 15 bookmakers. Chaque donnée est validée et nettoyée avant d'être stockée.",
    icon: "download",
    time: "22:00 - 22:30",
  },
  {
    step: 2,
    title: "Analyse par l'IA",
    description:
      "Le modèle XGBoost analyse chaque rencontre en fonction de plus de 50 variables : forme du joueur, surface, historique, conditions météo, fatigue, blessures potentielles...",
    icon: "cpu",
    time: "22:30 - 23:00",
  },
  {
    step: 3,
    title: "Détection des value bets",
    description:
      "En comparant la probabilité estimée par notre modèle avec les cotes proposées par les bookmakers, nous identifions les paris où la côte est supérieure à la probabilité réelle.",
    icon: "target",
    time: "23:00 - 23:15",
  },
  {
    step: 4,
    title: "Alerte sur Telegram",
    description:
      "Chaque value bet est envoyé instantanément sur Telegram avec le match, la cote, le bookmaker optimal, la mise recommandée (en unités) et le niveau de confiance.",
    icon: "bell",
    time: "En continu",
  },
];

export interface StatBanner {
  label: string;
  value: number;
  suffix: string;
  format: string;
}

export const statsBanner: StatBanner[] = [
  { label: "Matchs analysés", value: 276000, suffix: "+", format: "number" },
  { label: "Taux de réussite", value: 70, suffix: "%", format: "number" },
  { label: "ROI moyen", value: 31.3, suffix: "%", format: "number" },
  { label: "Profit généré", value: 48750, suffix: "€", format: "currency" },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  result?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "J'utilise Value Bet AI depuis 3 mois et mon ROI a augmenté de 25%. Les alertes Telegram sont super pratiques.",
    name: "Marc D.",
    role: "Parieur passionné",
    result: "+847€ en 3 mois",
  },
  {
    id: "2",
    quote: "La transparence est ce qui me plaît le plus. J'ai accès à tout l'historique et je peux vérifier chaque recommandation.",
    name: "Sophie L.",
    role: "Analyste financier",
    result: "+1 200€ en 2 mois",
  },
  {
    id: "3",
    quote: "Avant je passais des heures à analyser les matchs. Maintenant je reçois les infos clés en 30 secondes sur Telegram.",
    name: "Thomas R.",
    role: "Coach tennis",
    result: "+523€ en 1 mois",
  },
  {
    id: "4",
    quote: "Le système d'unités est parfait pour gérer ma bankroll. Je sais exactement combien miser sur chaque pari.",
    name: "Julie M.",
    role: "Data analyst",
    result: "+2 100€ en 4 mois",
  },
  {
    id: "5",
    quote: "J'étais sceptique au début mais les résultats parlent d'eux-mêmes. 68% de réussite sur mes 50 derniers paris.",
    name: "Nicolas P.",
    role: "Trader",
    result: "+680€ en 1 mois",
  },
  {
    id: "6",
    quote: "L'équipe est très réactive et améliore constamment le produit. J'adore les nouvelles fonctionnalités.",
    name: "Claire B.",
    role: "Prof de sport",
    result: "+340€ en 2 semaines",
  },
  {
    id: "7",
    quote: "Le Miami Open était incroyable ! 9 paris sur 10 de gagnants. Merci Value Bet AI !",
    name: "Antoine F.",
    role: "Étudiant",
    result: "+1 890€ en 1 tournoi",
  },
  {
    id: "8",
    quote: "Simple, efficace, rentable. C'est exactement ce que je cherchais pour optimiser mes paris tennis.",
    name: "Emma G.",
    role: "Consultante",
    result: "+456€ en 3 semaines",
  },
];

export interface MiamiOpenResult {
  player: string;
  odds: number;
  stake: number;
  result: "W" | "L";
  profit: number;
}

export const miamiOpenResults: MiamiOpenResult[] = [
  { player: "Jannik Sinner vs Daniil Medvedev", odds: 2.10, stake: 2, result: "W", profit: 4.20 },
  { player: "Carlos Alcaraz vs Grigor Dimitrov", odds: 1.85, stake: 1, result: "W", profit: 1.85 },
  { player: "Taylor Fritz vs Alexander Zverev", odds: 3.20, stake: 1, result: "L", profit: -2.00 },
  { player: "Daniil Medvedev vs Casper Ruud", odds: 1.95, stake: 2, result: "W", profit: 3.90 },
  { player: "Jannik Sinner vs Grigor Dimitrov", odds: 1.75, stake: 3, result: "W", profit: 5.25 },
  { player: "Taylor Fritz vs Tommy Paul", odds: 2.40, stake: 1, result: "L", profit: -2.00 },
  { player: "Alexander Zverev vs Karen Khachanov", odds: 1.65, stake: 2, result: "W", profit: 3.30 },
  { player: "Carlos Alcaraz vs Jannik Sinner", odds: 2.80, stake: 1, result: "W", profit: 2.80 },
  { player: "Daniil Medvedev vs Andrey Rublev", odds: 2.15, stake: 1, result: "L", profit: -2.00 },
  { player: "Grigor Dimitrov vs Ben Shelton", odds: 1.90, stake: 2, result: "W", profit: 3.80 },
];

export interface PricingPlan {
  name: string;
  price: number;
  description: string;
  cta: string;
  highlight: boolean;
  features: string[];
  missing?: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Gratuit",
    price: 0,
    description: "Pour découvrir la plateforme",
    cta: "Commencer gratuitement",
    highlight: false,
    features: [
      "3 alertes Telegram par jour",
      "Accès aux résultats",
      "Historique des 7 derniers jours",
    ],
    missing: [
      "Alertes illimitées",
      "Comparateur de cotes",
      "Accès au modèle XGBoost",
      "Support prioritaire",
    ],
  },
  {
    name: "Pro",
    price: 29,
    description: "Pour les parieurs réguliers",
    cta: "Essayer 7 jours gratuits",
    highlight: true,
    features: [
      "Alertes illimitées",
      "Comparateur de cotes",
      "Accès au modèle XGBoost",
      "Historique complet",
      "Support par email",
    ],
  },
  {
    name: "VIP",
    price: 79,
    description: "Pour les parieurs sérieux",
    cta: "Choisir VIP",
    highlight: false,
    features: [
      "Tout Pro",
      "Conseils de mises personnalisés",
      "Accès anticipé aux new features",
      "Support Telegram prioritaire",
      "Analyse de vos paris",
    ],
  },
];
