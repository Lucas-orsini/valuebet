'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/supabase/client'

type Bet = {
  id: string
  match: string
  pick: string
  odds: number
  units: number
  result: 'pending' | 'won' | 'lost' | null
  realOdds?: number
  played?: boolean
  timestamp: string
}

type DatabaseBet = {
  id: string
  match: string
  pick: string
  odds: number
  units: number
  result: 'pending' | 'won' | 'lost' | null
  timestamp: string
}

const ODDS_FORMAT = 1.92

export default function BankrollTrackerPage() {
  const [startingBankroll, setStartingBankroll] = useState<number>(500)
  const [bankrollInput, setBankrollInput] = useState<string>('500')
  const [mode, setMode] = useState<'auto' | 'custom'>('auto')
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBets() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } = await supabase
          .from('bets')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(50)

        if (fetchError) throw fetchError

        const mapped: Bet[] = (data as DatabaseBet[] | null)?.map((b) => ({
          ...b,
          realOdds: b.odds,
          played: true,
        })) ?? []

        setBets(mapped)
      } catch (err) {
        setError('Erreur lors du chargement des paris')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBets()
  }, [])

  const appliedBets = useMemo(() => {
    return bets.map((bet) => {
      if (mode === 'auto' || bet.played) {
        const odds = mode === 'custom' && bet.realOdds ? bet.realOdds : bet.odds
        return { ...bet, appliedOdds: odds }
      }
      return { ...bet, appliedOdds: null }
    })
  }, [bets, mode])

  const currentBankroll = useMemo(() => {
    let bankroll = startingBankroll
    const unitSize = startingBankroll / 100

    for (const bet of appliedBets) {
      if (bet.appliedOdds === null) continue

      if (bet.result === 'won') {
        const profit = bet.units * unitSize * (bet.appliedOdds - 1)
        bankroll += profit
      } else if (bet.result === 'lost') {
        const loss = bet.units * unitSize
        bankroll -= loss
      }
    }

    return Math.round(bankroll * 100) / 100
  }, [appliedBets, startingBankroll])

  const profitLoss = useMemo(() => {
    return Math.round((currentBankroll - startingBankroll) * 100) / 100
  }, [currentBankroll, startingBankroll])

  const roi = useMemo(() => {
    if (startingBankroll === 0) return 0
    return Math.round((profitLoss / startingBankroll) * 10000) / 100
  }, [profitLoss, startingBankroll])

  const totalBets = useMemo(() => {
    return appliedBets.filter((b) => b.appliedOdds !== null && b.result !== 'pending').length
  }, [appliedBets])

  const currentStreak = useMemo(() => {
    const settled = appliedBets.filter((b) => b.result === 'won' || b.result === 'lost')
    let streak = 0
    let streakType: 'won' | 'lost' | null = null

    for (let i = settled.length - 1; i >= 0; i--) {
      if (settled[i].result === 'pending') continue
      if (streakType === null) {
        streakType = settled[i].result as 'won' | 'lost'
        streak = 1
      } else if (settled[i].result === streakType) {
        streak++
      } else {
        break
      }
    }

    return { count: streak, type: streakType }
  }, [appliedBets])

  const chartData = useMemo(() => {
    const data: { x: number; y: number }[] = [{ x: 0, y: startingBankroll }]
    let bankroll = startingBankroll
    const unitSize = startingBankroll / 100

    for (let i = 0; i < appliedBets.length; i++) {
      const bet = appliedBets[i]
      if (bet.appliedOdds === null) continue

      if (bet.result === 'won') {
        const profit = bet.units * unitSize * (bet.appliedOdds - 1)
        bankroll += profit
      } else if (bet.result === 'lost') {
        const loss = bet.units * unitSize
        bankroll -= loss
      }

      data.push({ x: i + 1, y: Math.round(bankroll * 100) / 100 })
    }

    return data
  }, [appliedBets, startingBankroll])

  const handleApplyBankroll = () => {
    const val = parseFloat(bankrollInput)
    if (!isNaN(val) && val > 0) {
      setStartingBankroll(val)
    }
  }

  const toggleBetPlayed = (id: string) => {
    setBets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, played: !b.played } : b))
    )
  }

  const updateRealOdds = (id: string, odds: number) => {
    setBets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, realOdds: odds } : b))
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Chargement...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Bankroll Tracker</h1>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Bankroll de départ:</label>
              <input
                type="number"
                value={bankrollInput}
                onChange={(e) => setBankrollInput(e.target.value)}
                className="border rounded px-3 py-2 w-32"
                min="1"
              />
              <button
                onClick={handleApplyBankroll}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Appliquer
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Mode:</span>
              <button
                onClick={() => setMode('auto')}
                className={`px-4 py-2 rounded ${
                  mode === 'auto'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Automatique
              </button>
              <button
                onClick={() => setMode('custom')}
                className={`px-4 py-2 rounded ${
                  mode === 'custom'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Personnalisé
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Bankroll actuelle</div>
            <div className="text-2xl font-bold">{currentBankroll.toFixed(2)}€</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Profit / Perte</div>
            <div className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)}€
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">ROI</div>
            <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roi >= 0 ? '+' : ''}{roi}%
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Série en cours</div>
            <div className="text-2xl font-bold">
              {currentStreak.count > 0 ? (
                <span className={currentStreak.type === 'won' ? 'text-green-600' : 'text-red-600'}>
                  {currentStreak.type === 'won' ? '+' : '-'}{currentStreak.count}
                </span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="text-sm font-medium mb-2">Courbe de bankroll</div>
          <div className="h-48 flex items-end gap-1">
            {chartData.length > 1 ? (
              chartData.map((point, i) => {
                const min = Math.min(...chartData.map((p) => p.y))
                const max = Math.max(...chartData.map((p) => p.y))
                const range = max - min || 1
                const height = ((point.y - min) / range) * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500 rounded-t"
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${point.y.toFixed(2)}€`}
                  />
                )
              })
            ) : (
              <div className="text-gray-400 text-sm">Aucune donnée</div>
            )}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>{chartData.length - 1} paris</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Derniers paris ({totalBets} joués)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {mode === 'custom' && (
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Joué</th>
                  )}
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Match</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Pari</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Cote</th>
                  {mode === 'custom' && (
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Cote réelle</th>
                  )}
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Unités</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Résultat</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Gain/Perte</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appliedBets.length === 0 ? (
                  <tr>
                    <td colSpan={mode === 'custom' ? 8 : 7} className="px-4 py-8 text-center text-gray-500">
                      Aucun pari disponible
                    </td>
                  </tr>
                ) : (
                  appliedBets.map((bet) => {
                    const unitSize = startingBankroll / 100
                    let pnl = 0

                    if (bet.appliedOdds !== null) {
                      if (bet.result === 'won') {
                        pnl = bet.units * unitSize * (bet.appliedOdds - 1)
                      } else if (bet.result === 'lost') {
                        pnl = -bet.units * unitSize
                      }
                    }

                    return (
                      <tr key={bet.id} className={bet.appliedOdds === null ? 'bg-gray-50' : ''}>
                        {mode === 'custom' && (
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={bet.played ?? true}
                              onChange={() => toggleBetPlayed(bet.id)}
                              className="w-4 h-4"
                            />
                          </td>
                        )}
                        <td className="px-4 py-3">{bet.match}</td>
                        <td className="px-4 py-3">{bet.pick}</td>
                        <td className="px-4 py-3">{bet.odds.toFixed(2)}</td>
                        {mode === 'custom' && (
                          <td className="px-4 py-3">
                            {bet.played ? (
                              <input
                                type="number"
                                step="0.01"
                                value={bet.realOdds ?? bet.odds}
                                onChange={(e) => updateRealOdds(bet.id, parseFloat(e.target.value) || bet.odds)}
                                className="border rounded px-2 py-1 w-20"
                              />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        )}
                        <td className="px-4 py-3">{bet.units}</td>
                        <td className="px-4 py-3">
                          {bet.appliedOdds === null ? (
                            <span className="text-gray-400">-</span>
                          ) : bet.result === 'won' ? (
                            <span className="text-green-600 font-medium">Gagné</span>
                          ) : bet.result === 'lost' ? (
                            <span className="text-red-600 font-medium">Perdu</span>
                          ) : (
                            <span className="text-gray-400">En attente</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {bet.appliedOdds === null ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <span className={pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}€
                            </span>
                          )}
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
    </div>
  )
}
