'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

interface Bet {
  id: string
  bankroll_entry_id: string
  ai_recommended_odds: number
  user_odds: number | null
  ai_units: number
  stake_euros: number
  result: 'pending' | 'won' | 'lost'
  played: boolean
  event_name: string
  market: string
  created_at: string
}

interface BankrollEntry {
  id: string
  user_id: string
  starting_bankroll: number
  current_bankroll: number
  mode: 'auto' | 'custom'
  created_at: string
}

interface BankrollData {
  bankroll: BankrollEntry | null
  bets: Bet[]
}

interface KPIData {
  currentBankroll: number
  profitLoss: number
  roi: number
  currentStreak: { wins: number; losses: number }
  totalBets: number
  winningBets: number
  losingBets: number
  pendingBets: number
}

interface ChartPoint {
  date: string
  bankroll: number
}

function calculateKPIs(bankroll: BankrollEntry | null, bets: Bet[], mode: 'auto' | 'custom'): KPIData {
  if (!bankroll) {
    return {
      currentBankroll: 0,
      profitLoss: 0,
      roi: 0,
      currentStreak: { wins: 0, losses: 0 },
      totalBets: 0,
      winningBets: 0,
      losingBets: 0,
      pendingBets: 0
    }
  }

  const effectiveBets = mode === 'auto' 
    ? bets.filter(b => b.result !== 'pending')
    : bets.filter(b => b.played && b.result !== 'pending')

  const currentBankroll = effectiveBets.reduce((acc, bet) => {
    if (bet.result === 'won') {
      const profit = (bet.stake_euros * (bet.user_odds || bet.ai_recommended_odds)) - bet.stake_euros
      return acc + profit
    } else if (bet.result === 'lost') {
      return acc - bet.stake_euros
    }
    return acc
  }, bankroll.starting_bankroll)

  const profitLoss = currentBankroll - bankroll.starting_bankroll
  const totalStaked = effectiveBets.reduce((acc, b) => acc + b.stake_euros, 0)
  const roi = totalStaked > 0 ? (profitLoss / totalStaked) * 100 : 0

  const winningBets = effectiveBets.filter(b => b.result === 'won').length
  const losingBets = effectiveBets.filter(b => b.result === 'lost').length
  const pendingBets = bets.filter(b => b.result === 'pending').length

  const completedBets = effectiveBets.filter(b => b.result !== 'pending')
  let currentStreak = { wins: 0, losses: 0 }
  
  if (completedBets.length > 0) {
    const lastBet = completedBets[completedBets.length - 1]
    if (lastBet.result === 'won') {
      currentStreak.wins = 1
    } else {
      currentStreak.losses = 1
    }
  }

  return {
    currentBankroll,
    profitLoss,
    roi,
    currentStreak,
    totalBets: effectiveBets.length,
    winningBets,
    losingBets,
    pendingBets
  }
}

function generateChartData(bankroll: BankrollEntry | null, bets: Bet[], mode: 'auto' | 'custom'): ChartPoint[] {
  if (!bankroll) return []

  const chartPoints: ChartPoint[] = [
    { date: new Date(bankroll.created_at).toLocaleDateString(), bankroll: bankroll.starting_bankroll }
  ]

  const processedBets = mode === 'auto' ? bets : bets.filter(b => b.played)
  let runningBankroll = bankroll.starting_bankroll

  processedBets.forEach(bet => {
    if (bet.result === 'won') {
      const profit = (bet.stake_euros * (bet.user_odds || bet.ai_recommended_odds)) - bet.stake_euros
      runningBankroll += profit
    } else if (bet.result === 'lost') {
      runningBankroll -= bet.stake_euros
    }

    chartPoints.push({
      date: new Date(bet.created_at).toLocaleDateString(),
      bankroll: runningBankroll
    })
  })

  return chartPoints
}

function SimpleLineChart({ data }: { data: ChartPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Pas de données disponibles
      </div>
    )
  }

  const minValue = Math.min(...data.map(d => d.bankroll))
  const maxValue = Math.max(...data.map(d => d.bankroll))
  const padding = (maxValue - minValue) * 0.1 || 10
  const yMin = minValue - padding
  const yMax = maxValue + padding

  const width = 800
  const height = 256
  const paddingX = 50
  const paddingY = 20

  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const points = data.map((d, i) => ({
    x: paddingX + (i / (data.length - 1 || 1)) * chartWidth,
    y: paddingY + chartHeight - ((d.bankroll - yMin) / (yMax - yMin || 1)) * chartHeight,
    value: d.bankroll,
    date: d.date
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const startingBankroll = data[0]?.bankroll || 0
  const isProfit = data[data.length - 1]?.bankroll >= startingBankroll

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-64">
        <line x1={paddingX} y1={paddingY + chartHeight} x2={paddingX + chartWidth} y2={paddingY + chartHeight} stroke="#374151" strokeWidth="1" />
        <line x1={paddingX} y1={paddingY} x2={paddingX + chartWidth} y2={paddingY} stroke="#374151" strokeWidth="1" />
        
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
          const y = paddingY + chartHeight - ratio * chartHeight
          const value = yMin + ratio * (yMax - yMin)
          return (
            <g key={ratio}>
              <line x1={paddingX - 5} y1={y} x2={paddingX + chartWidth} y2={y} stroke="#374151" strokeWidth="0.5" strokeDasharray="4,4" />
              <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-xs fill-gray-400">
                {value.toFixed(0)}€
              </text>
            </g>
          )
        })}

        <path d={pathD} fill="none" stroke={isProfit ? '#10b981' : '#ef4444'} strokeWidth="3" />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={isProfit ? '#10b981' : '#ef4444'}
            className="hover:r-6 transition-all"
          >
            <title>{`${p.date}: ${p.value.toFixed(2)}€`}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}

function KPICard({ title, value, subtitle, color }: { title: string; value: string; subtitle?: string; color: 'green' | 'red' | 'blue' }) {
  const colorClasses = {
    green: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
      {subtitle && <div className="text-gray-500 text-xs mt-1">{subtitle}</div>}
    </div>
  )
}

export default function BankrollTracker() {
  const [bankrollData, setBankrollData] = useState<BankrollData | null>(null)
  const [mode, setMode] = useState<'auto' | 'custom'>('auto')
  const [startingBankroll, setStartingBankroll] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const loadBankroll = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch('/api/bankroll')
      if (!res.ok) {
        if (res.status === 401) {
          setError('Veuillez vous connecter')
        } else if (res.status === 503) {
          setError('Base de données non configurée')
        } else {
          setError('Erreur lors du chargement')
        }
        return
      }
      const data = await res.json()
      setBankrollData(data)
      if (data.bankroll) {
        setMode(data.bankroll.mode)
        setIsInitialized(true)
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBankroll()
  }, [loadBankroll])

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault()
    const bankrollValue = parseFloat(startingBankroll)
    
    if (isNaN(bankrollValue) || bankrollValue <= 0) {
      setError('Veuillez entrer un montant valide')
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch('/api/bankroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ starting_bankroll: bankrollValue, mode })
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Erreur lors de l\'initialisation')
        return
      }

      const data = await res.json()
      setBankrollData(data)
      setIsInitialized(true)
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = async (newMode: 'auto' | 'custom') => {
    if (!bankrollData?.bankroll) return

    try {
      const res = await fetch('/api/bankroll', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankroll_id: bankrollData.bankroll.id,
          mode: newMode
        })
      })

      if (!res.ok) {
        setError('Erreur lors du changement de mode')
        return
      }

      const data = await res.json()
      setBankrollData(prev => prev ? { ...prev, bankroll: data.bankroll } : null)
      setMode(newMode)
    } catch (err) {
      setError('Erreur de connexion')
    }
  }

  const handleBetToggle = async (betId: string, played: boolean) => {
    try {
      const res = await fetch('/api/bets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bet_id: betId, played })
      })

      if (!res.ok) {
        setError('Erreur lors de la mise à jour')
        return
      }

      const data = await res.json()
      setBankrollData(prev => {
        if (!prev) return null
        return {
          ...prev,
          bets: prev.bets.map(b => b.id === betId ? data.bet : b)
        }
      })
    } catch (err) {
      setError('Erreur de connexion')
    }
  }

  const handleOddsChange = async (betId: string, userOdds: number) => {
    try {
      const res = await fetch('/api/bets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bet_id: betId, user_odds: userOdds })
      })

      if (!res.ok) {
        setError('Erreur lors de la mise à jour')
        return
      }

      const data = await res.json()
      setBankrollData(prev => {
        if (!prev) return null
        return {
          ...prev,
          bets: prev.bets.map(b => b.id === betId ? data.bet : b)
        }
      })
    } catch (err) {
      setError('Erreur de connexion')
    }
  }

  const kpis = useMemo(() => {
    return calculateKPIs(bankrollData?.bankroll || null, bankrollData?.bets || [], mode)
  }, [bankrollData, mode])

  const chartData = useMemo(() => {
    return generateChartData(bankrollData?.bankroll || null, bankrollData?.bets || [], mode)
  }, [bankrollData, mode])

  if (isLoading && !isInitialized) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isInitialized || !bankrollData?.bankroll) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Initialiser votre Bankroll
          </h2>
          <form onSubmit={handleInitialize} className="space-y-6">
            <div>
              <label htmlFor="startingBankroll" className="block text-sm font-medium text-gray-300 mb-2">
                Bankroll de départ
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="startingBankroll"
                  value={startingBankroll}
                  onChange={(e) => setStartingBankroll(e.target.value)}
                  placeholder="500"
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Mode de suivi
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMode('auto')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    mode === 'auto'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium">Automatique</div>
                  <div className="text-gray-400 text-sm mt-1">Suit les bets IA automatiquement</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('custom')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    mode === 'custom'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-white font-medium">Personnalisé</div>
                  <div className="text-gray-400 text-sm mt-1">Choisissez vos paris</div>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Chargement...' : 'Commencer le suivi'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="bg-gray-800 rounded-lg p-4 flex-1">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-gray-400 text-sm">Mode</div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleModeChange('auto')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    mode === 'auto'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Auto
                </button>
                <button
                  onClick={() => handleModeChange('custom')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    mode === 'custom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Personnalisé
                </button>
              </div>
            </div>
            <div className="h-12 w-px bg-gray-600"></div>
            <div>
              <div className="text-gray-400 text-sm">Bankroll de départ</div>
              <div className="text-white font-medium">{bankrollData.bankroll.starting_bankroll.toFixed(2)}€</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Courbe de Bankroll</h3>
        <SimpleLineChart data={chartData} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Bankroll actuelle"
          value={`${kpis.currentBankroll.toFixed(2)}€`}
          subtitle={`${kpis.profitLoss >= 0 ? '+' : ''}${kpis.profitLoss.toFixed(2)}€`}
          color={kpis.profitLoss >= 0 ? 'green' : 'red'}
        />
        <KPICard
          title="Profit/Perte"
          value={`${kpis.profitLoss >= 0 ? '+' : ''}${kpis.profitLoss.toFixed(2)}€`}
          color={kpis.profitLoss >= 0 ? 'green' : 'red'}
        />
        <KPICard
          title="ROI"
          value={`${kpis.roi >= 0 ? '+' : ''}${kpis.roi.toFixed(1)}%`}
          color={kpis.roi >= 0 ? 'green' : 'red'}
        />
        <KPICard
          title="Paris suivis"
          value={kpis.totalBets.toString()}
          subtitle={`${kpis.winningBets}G / ${kpis.losingBets}P`}
          color="blue"
        />
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Derniers paris</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Événement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Cote IA
                </th>
                {mode === 'custom' && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Votre cote
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Mise
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Unités
                </th>
                {mode === 'custom' && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Joué
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Résultat
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  P&L
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {bankrollData.bets.length === 0 ? (
                <tr>
                  <td colSpan={mode === 'custom' ? 8 : 6} className="px-4 py-8 text-center text-gray-500">
                    Aucun pari pour le moment
                  </td>
                </tr>
              ) : (
                bankrollData.bets.map((bet) => {
                  const effectiveOdds = bet.user_odds || bet.ai_recommended_odds
                  let pnl = 0
                  
                  if (mode === 'auto' && bet.result !== 'pending') {
                    if (bet.result === 'won') {
                      pnl = (bet.stake_euros * effectiveOdds) - bet.stake_euros
                    } else {
                      pnl = -bet.stake_euros
                    }
                  } else if (mode === 'custom' && bet.played && bet.result !== 'pending') {
                    if (bet.result === 'won') {
                      pnl = (bet.stake_euros * effectiveOdds) - bet.stake_euros
                    } else {
                      pnl = -bet.stake_euros
                    }
                  }

                  const isIncluded = mode === 'auto' || bet.played

                  return (
                    <tr key={bet.id} className={!isIncluded ? 'opacity-50' : ''}>
                      <td className="px-4 py-3">
                        <div className="text-white font-medium">{bet.event_name}</div>
                        <div className="text-gray-400 text-sm">{bet.market}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {bet.ai_recommended_odds.toFixed(2)}
                      </td>
                      {mode === 'custom' && (
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={bet.user_odds || ''}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value)
                              if (!isNaN(val) && val > 0) {
                                handleOddsChange(bet.id, val)
                              }
                            }}
                            step="0.01"
                            min="1"
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                      )}
                      <td className="px-4 py-3 text-gray-300">
                        {bet.stake_euros.toFixed(2)}€
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {bet.ai_units.toFixed(1)}u
                      </td>
                      {mode === 'custom' && (
                        <td className="px-4 py-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={bet.played}
                              onChange={(e) => handleBetToggle(bet.id, e.target.checked)}
                              className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                            />
                          </label>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bet.result === 'won'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : bet.result === 'lost'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {bet.result === 'won' ? 'Gagné' : bet.result === 'lost' ? 'Perdu' : 'En attente'}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-right font-medium ${
                        pnl > 0 ? 'text-emerald-400' : pnl < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {pnl > 0 ? '+' : ''}{pnl.toFixed(2)}€
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
