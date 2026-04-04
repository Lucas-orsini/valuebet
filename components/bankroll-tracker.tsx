'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Target, Flame } from 'lucide-react';
import type { Bet, KpiData, BankrollMode } from '@/types';

interface BankrollTrackerProps {
  initialBankroll: number;
  bets: Bet[];
  onModeChange?: (mode: BankrollMode) => void;
}

function KpiCard({
  icon: Icon,
  label,
  value,
  evolution,
  evolutionLabel,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  evolution?: number;
  evolutionLabel?: string;
}) {
  const isPositive = (evolution ?? 0) >= 0;

  return (
    <div className="relative bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-yellow-400/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="flex-1">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-white text-lg font-semibold">{value}</p>
          {evolution !== undefined && (
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {evolution.toFixed(2)}€ {evolutionLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ModeTooltip() {
  return (
    <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 text-sm">
      <p className="text-gray-300 mb-2">
        <span className="font-semibold text-white">Mode Automatique :</span>
      </p>
      <p className="text-gray-400 mb-3">
        Ajoute automatiquement tous vos paris au fur et à mesure.
      </p>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold text-white">Mode Personnalisé :</span>
      </p>
      <p className="text-gray-400">
        Choisissez manuellement quels paris suivre pour votre bankroll.
      </p>
    </div>
  );
}

export function BankrollTracker({ initialBankroll, bets }: BankrollTrackerProps) {
  const [mode, setMode] = useState<BankrollMode>('auto');
  const [showTooltip, setShowTooltip] = useState(false);

  const { totalProfit, roi, currentStreak, streakType, currentBankroll } =
    calculateKpis(bets.filter((b) => b.trackingMode === mode), initialBankroll);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Bankroll Tracker</h2>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center hover:bg-orange-500/30 transition-colors cursor-help"
            aria-label="Aide sur les modes de suivi"
          >
            ?
          </button>
          {showTooltip && <ModeTooltip />}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode('auto')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            mode === 'auto'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
          }`}
        >
          Automatique
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            mode === 'manual'
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
          }`}
        >
          Personnalisé
        </button>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KpiCard
          icon={DollarSign}
          label="Bankroll Actuelle"
          value={`${currentBankroll.toFixed(2)}€`}
          evolution={totalProfit}
          evolutionLabel="depuis le début"
        />
        <KpiCard
          icon={TrendingUp}
          label="ROI"
          value={`${roi.toFixed(1)}%`}
          evolution={roi}
          evolutionLabel=""
        />
        <KpiCard
          icon={Target}
          label="Paris Gagnés"
          value={`${bets.filter((b) => b.status === 'won').length}`}
        />
        <KpiCard
          icon={Flame}
          label="Série Actuelle"
          value={`${currentStreak} ${streakType === 'win' ? 'victoires' : streakType === 'loss' ? 'défaites' : ''}`}
        />
      </div>

      {/* Bankroll Chart Placeholder */}
      <div className="bg-[#1a1a1a] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Évolution de la Bankroll</h3>
        <div className="h-48 flex items-center justify-center text-gray-500">
          Graphique en cours de développement
        </div>
      </div>
    </div>
  );
}

function calculateKpis(bets: Bet[], initialBankroll: number): KpiData {
  if (bets.length === 0) {
    return {
      totalProfit: 0,
      roi: 0,
      currentStreak: 0,
      streakType: null,
      currentBankroll: initialBankroll,
      totalTracked: 0,
    };
  }

  const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0);
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const roi = totalStaked > 0 ? (totalProfit / totalStaked) * 100 : 0;

  let currentStreak = 0;
  let streakType: 'win' | 'loss' | null = null;

  if (bets.length > 0) {
    const sortedBets = [...bets].sort((a, b) => b.date.getTime() - a.date.getTime());
    const mostRecentStatus = sortedBets[0].status;
    streakType = mostRecentStatus === 'won' ? 'win' : 'loss';

    for (const bet of sortedBets) {
      if (bet.status === mostRecentStatus) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return {
    totalProfit,
    roi,
    currentStreak,
    streakType,
    currentBankroll: initialBankroll + totalProfit,
    totalTracked: bets.length,
  };
}
