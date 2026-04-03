/**
 * Bankroll utility functions for calculating P&L, ROI, streaks, and filtering bets.
 * These are pure functions with no side effects, designed for easy unit testing.
 */

import type { TrackedBet, BankrollKPIs, BankrollPoint } from './dashboard-data';

/**
 * Période de temps pour le filtrage des paris
 */
export type ChartPeriod = '1M' | '3M' | 'ALL';

/**
 * Configuration du filtre par période
 */
export const PERIOD_RANGES: Record<ChartPeriod, number> = {
  '1M': 30,
  '3M': 90,
  'ALL': Infinity,
} as const;

/**
 * Calcule le profit/perte total à partir d'une bankroll de départ et des paris suivis.
 * 
 * @param startingBankroll - Bankroll initiale en euros
 * @param bets - Liste des paris suivis avec résultats
 * @returns Profit/perte net en euros (positif = gain, négatif = perte)
 * @throws {Error} Si startingBankroll est <= 0
 * 
 * @example
 * calculatePnL(1000, [{ units: 3, status: 'won', actualOdds: 2.0 }])
 * // => 6.00 (3 units * (2.0 - 1) = 3)
 */
export function calculatePnL(startingBankroll: number, bets: TrackedBet[]): number {
  if (startingBankroll <= 0) {
    throw new Error('Starting bankroll must be greater than 0');
  }

  return bets.reduce((totalPnL, bet) => {
    // Ne calculer que pour les paris terminés (won ou lost)
    if (bet.status !== 'won' && bet.status !== 'lost') {
      return totalPnL;
    }

    // Utiliser les cotes réelles si disponibles, sinon les cotes recommandées
    const odds = bet.actualOdds ?? bet.recommendedOdds;
    
    // Calcul du profit en unités: units * (odds - 1) pour un gain, -units pour une perte
    const profitIfWon = bet.units * (odds - 1);
    const profit = bet.status === 'won' ? profitIfWon : -bet.units;

    return totalPnL + profit;
  }, 0);
}

/**
 * Calcule le ROI (Return on Investment) en pourcentage.
 * 
 * @param startingBankroll - Bankroll initiale en euros
 * @param currentBankroll - Bankroll actuelle en euros
 * @returns ROI en pourcentage (ex: 31.5 pour +31.5%)
 * @throws {Error} Si startingBankroll est <= 0
 * 
 * @example
 * calculateROI(1000, 1315)
 * // => 31.5
 */
export function calculateROI(startingBankroll: number, currentBankroll: number): number {
  if (startingBankroll <= 0) {
    throw new Error('Starting bankroll must be greater than 0');
  }

  const roi = ((currentBankroll - startingBankroll) / startingBankroll) * 100;
  return Math.round(roi * 100) / 100; // Arrondi à 2 décimales
}

/**
 * Calcule la série actuelle (victoires/défaites consécutives).
 * Ne compte que les paris terminés (won/lost), ignore pending.
 * 
 * @param bets - Liste des paris triés par date décroissante (récent en premier)
 * @returns Objet contenant le nombre de la série et son type
 * 
 * @example
 * const bets = [
 *   { status: 'won' },
 *   { status: 'won' },
 *   { status: 'won' },
 *   { status: 'lost' },
 *   { status: 'won' },
 * ];
 * calculateStreak(bets)
 * // => { streak: 3, streakType: 'W' }
 */
export function calculateStreak(bets: TrackedBet[]): { streak: number; streakType: 'W' | 'L' | 'neutral' } {
  // Filtrer uniquement les paris terminés
  const settledBets = bets.filter(bet => bet.status === 'won' || bet.status === 'lost');
  
  if (settledBets.length === 0) {
    return { streak: 0, streakType: 'neutral' };
  }

  // Parcourir depuis le plus récent
  const firstBet = settledBets[0];
  const streakType = firstBet.status === 'won' ? 'W' : 'L';
  
  let streak = 1;
  for (let i = 1; i < settledBets.length; i++) {
    const currentBet = settledBets[i];
    const expectedStatus = streakType === 'W' ? 'won' : 'lost';
    
    if (currentBet.status === expectedStatus) {
      streak++;
    } else {
      break;
    }
  }

  return { streak, streakType };
}

/**
 * Calcule la bankroll actuelle en ajoutant le P&L à la bankroll de départ.
 * 
 * @param startingBankroll - Bankroll initiale en euros
 * @param bets - Liste des paris suivis
 * @returns Bankroll actuelle (startingBankroll + P&L)
 * @throws {Error} Si startingBankroll est <= 0
 * 
 * @example
 * calculateCurrentBankroll(1000, [{ units: 3, status: 'won', actualOdds: 2.0 }])
 * // => 1006
 */
export function calculateCurrentBankroll(startingBankroll: number, bets: TrackedBet[]): number {
  if (startingBankroll <= 0) {
    throw new Error('Starting bankroll must be greater than 0');
  }

  const pnl = calculatePnL(startingBankroll, bets);
  return startingBankroll + pnl;
}

/**
 * Filtre les données de bankroll par période.
 * 
 * @param data - Points de données de bankroll
 * @param period - Période de filtrage ('1M', '3M', 'ALL')
 * @returns Points de données filtrés
 * 
 * @example
 * filterBetsByPeriod(bankrollHistory, '1M')
 * // => Points des 30 derniers jours
 */
export function filterBetsByPeriod(data: BankrollPoint[], period: ChartPeriod): BankrollPoint[] {
  if (period === 'ALL') {
    return data;
  }

  const now = new Date();
  const daysLimit = PERIOD_RANGES[period];
  const cutoffDate = new Date(now.getTime() - daysLimit * 24 * 60 * 60 * 1000);

  return data.filter(point => {
    const pointDate = new Date(point.date);
    return pointDate >= cutoffDate;
  });
}

/**
 * Filtre les paris par période de temps.
 * 
 * @param bets - Liste des paris à filtrer
 * @param period - Période de filtrage ('1M', '3M', 'ALL')
 * @returns Paris filtrés par période
 */
export function filterTrackedBetsByPeriod(bets: TrackedBet[], period: ChartPeriod): TrackedBet[] {
  if (period === 'ALL') {
    return bets;
  }

  const now = new Date();
  const daysLimit = PERIOD_RANGES[period];
  const cutoffDate = new Date(now.getTime() - daysLimit * 24 * 60 * 60 * 1000);

  return bets.filter(bet => {
    const betDate = new Date(bet.date);
    return betDate >= cutoffDate;
  });
}

/**
 * Calcule tous les KPIs de bankroll d'un coup.
 * Optimisé pour éviter de parcourir plusieurs fois les mêmes données.
 * 
 * @param startingBankroll - Bankroll initiale en euros
 * @param bets - Liste des paris suivis
 * @returns Objet contenant tous les KPIs
 * @throws {Error} Si startingBankroll est <= 0
 */
export function calculateBankrollKPIs(startingBankroll: number, bets: TrackedBet[]): BankrollKPIs {
  if (startingBankroll <= 0) {
    throw new Error('Starting bankroll must be greater than 0');
  }

  // Calculer le P&L
  const profit = calculatePnL(startingBankroll, bets);
  
  // Calculer la bankroll actuelle
  const currentBankroll = startingBankroll + profit;
  
  // Calculer le ROI
  const roi = calculateROI(startingBankroll, currentBankroll);
  
  // Calculer la série
  const { streak, streakType } = calculateStreak(bets);
  
  // Compter les paris suivis (settled uniquement pour le décompte)
  const betsTracked = bets.filter(bet => bet.status === 'won' || bet.status === 'lost').length;

  return {
    currentBankroll: Math.round(currentBankroll * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    roi,
    streak,
    streakType,
    betsTracked,
  };
}

/**
 * Génère des points de données pour la courbe de bankroll
 * à partir d'une bankroll de départ et des paris.
 * 
 * @param startingBankroll - Bankroll initiale en euros
 * @param bets - Liste des paris suivis
 * @returns Points de données pour le graphique
 */
export function generateBankrollCurve(
  startingBankroll: number,
  bets: TrackedBet[]
): BankrollPoint[] {
  if (startingBankroll <= 0) {
    throw new Error('Starting bankroll must be greater than 0');
  }

  // Trier les paris par date
  const sortedBets = [...bets].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const points: BankrollPoint[] = [
    { date: sortedBets[0]?.date ?? new Date().toISOString().split('T')[0], bankroll: startingBankroll, flatBet: startingBankroll }
  ];

  let currentBankroll = startingBankroll;
  const unitSize = startingBankroll * 0.01; // 1% de la bankroll par unité

  for (const bet of sortedBets) {
    if (bet.status !== 'won' && bet.status !== 'lost') {
      continue;
    }

    const odds = bet.actualOdds ?? bet.recommendedOdds;
    const stake = bet.units * unitSize;
    
    if (bet.status === 'won') {
      currentBankroll += stake * (odds - 1);
    } else {
      currentBankroll -= stake;
    }

    points.push({
      date: bet.date,
      bankroll: Math.round(currentBankroll * 100) / 100,
      flatBet: startingBankroll, // Flat bet reste constant pour la comparaison
    });
  }

  return points;
}

/**
 * Filtre les paris selon le mode (auto ou custom).
 * En mode 'auto', tous les paris sont suivis.
 * En mode 'custom', seuls les paris cochés sont suivis.
 * 
 * @param bets - Liste de tous les paris
 * @param mode - Mode de suivi ('auto' ou 'custom')
 * @param userSettings - Paramètres utilisateur (requis en mode 'custom')
 * @returns Liste des paris à inclure dans le calcul
 */
export function filterBetsByMode(
  bets: TrackedBet[],
  mode: 'auto' | 'custom',
  userSettings?: Map<string, { isTracked: boolean; customOdds: number }>
): TrackedBet[] {
  if (mode === 'auto') {
    return bets;
  }

  if (!userSettings) {
    // En mode custom sans settings, ne retourner aucun pari
    return [];
  }

  return bets.filter(bet => {
    const settings = userSettings.get(bet.id);
    return settings?.isTracked ?? false;
  }).map(bet => {
    const settings = userSettings.get(bet.id);
    if (settings?.customOdds) {
      return { ...bet, actualOdds: settings.customOdds };
    }
    return bet;
  });
}
