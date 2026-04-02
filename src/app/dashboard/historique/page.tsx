import { createClient } from '@/supabase/server'

interface Bet {
  id: string
  match: string
  type: string
  selection: string
  odds: number
  stake: number
  result: 'won' | 'lost' | 'pending'
  date: string
  gain?: number
}

interface HistoricalBetsResponse {
  bets: Bet[]
  total: number
  page: number
  pageSize: number
}

async function getHistoricalBets(
  page: number = 1,
  pageSize: number = 10,
  search: string = ''
): Promise<HistoricalBetsResponse> {
  try {
    const supabase = await createClient()
    
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('bets')
      .select('*', { count: 'exact' })
      .order('date', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.or(`match.ilike.%${search}%,selection.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Supabase error:', error)
      throw new Error('Erreur lors de la récupération des paris')
    }

    return {
      bets: data?.map(bet => ({
        id: bet.id,
        match: bet.match,
        type: bet.type,
        selection: bet.selection,
        odds: bet.odds,
        stake: bet.stake,
        result: bet.result,
        date: bet.date,
        gain: bet.gain,
      })) || [],
      total: count || 0,
      page,
      pageSize,
    }
  } catch (error) {
    console.error('Error fetching bets:', error)
    return { bets: [], total: 0, page: 1, pageSize: 10 }
  }
}

export default async function HistoriquePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const search = params.search || ''
  const pageSize = 10

  const { bets, total } = await getHistoricalBets(currentPage, pageSize, search)
  const totalPages = Math.ceil(total / pageSize)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatResult = (result: string) => {
    const styles = {
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
    }
    const labels = {
      won: 'Gagné',
      lost: 'Perdu',
      pending: 'En attente',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[result as keyof typeof styles]}`}>
        {labels[result as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Historique des paris</h1>

      <form action="/dashboard/historique" method="get" className="mb-4">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Rechercher par match ou sélection..."
          className="px-4 py-2 border rounded-md w-full max-w-md"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-gray-100 border rounded-md hover:bg-gray-200"
        >
          Rechercher
        </button>
        {search && (
          <a
            href="/dashboard/historique"
            className="ml-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Réinitialiser
          </a>
        )}
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Match</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sélection</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Cote</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Mise</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Gain</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Résultat</th>
            </tr>
          </thead>
          <tbody>
            {bets.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Aucun pari trouvé
                </td>
              </tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{formatDate(bet.date)}</td>
                  <td className="px-4 py-3 text-sm font-medium">{bet.match}</td>
                  <td className="px-4 py-3 text-sm">{bet.type}</td>
                  <td className="px-4 py-3 text-sm">{bet.selection}</td>
                  <td className="px-4 py-3 text-sm text-right">{bet.odds.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right">{bet.stake.toFixed(2)} €</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {bet.gain !== undefined ? (
                      <span className={bet.gain > 0 ? 'text-green-600' : 'text-red-600'}>
                        {bet.gain >= 0 ? '+' : ''}{bet.gain.toFixed(2)} €
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {formatResult(bet.result)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages} ({total} paris)
          </p>
          
          <div className="flex gap-2">
            {currentPage > 1 && (
              <a
                href={`/dashboard/historique?page=${currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                Précédent
              </a>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                )
              })
              .map((page, index, array) => {
                const showEllipsisBefore = index > 0 && page - array[index - 1] > 1
                const showEllipsisAfter = index < array.length - 1 && array[index + 1] - page > 1
                
                return (
                  <span key={page} className="flex items-center">
                    {showEllipsisBefore && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <a
                      href={`/dashboard/historique?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                      className={`px-3 py-1 border rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </a>
                    {showEllipsisAfter && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                  </span>
                )
              })}
            
            {currentPage < totalPages && (
              <a
                href={`/dashboard/historique?page=${currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                Suivant
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
