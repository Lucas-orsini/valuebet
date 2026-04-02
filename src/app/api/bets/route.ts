import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    if (!userId) {
      return NextResponse.json({ error: 'userId requis' }, { status: 400 })
    }

    const supabase = await createClient()

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const [countResult, betsResult] = await Promise.all([
      supabase
        .from('bets')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      supabase
        .from('bets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to)
    ])

    if (countResult.error) {
      throw countResult.error
    }

    if (betsResult.error) {
      throw betsResult.error
    }

    return NextResponse.json({
      bets: betsResult.data,
      total: countResult.count || 0,
      page,
      pageSize
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des paris:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération des paris' },
      { status: 500 }
    )
  }
}
