import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

type Bet = Database['public']['Tables']['bets']['Row']

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bankrollId = searchParams.get('bankroll_id')

    if (!bankrollId) {
      return NextResponse.json({ error: 'bankroll_id required' }, { status: 400 })
    }

    const { data: bets, error } = await supabase
      .from('bets')
      .select('*')
      .eq('bankroll_entry_id', bankrollId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch bets' }, { status: 500 })
    }

    return NextResponse.json({ bets: bets || [] })
  } catch (error) {
    console.error('Bets GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bankroll_id, ai_recommended_odds, ai_units, event_name, market } = body

    if (!bankroll_id || !ai_recommended_odds || !ai_units || !event_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const stakeEuros = ai_units * 10

    const { data: bet, error: createError } = await supabase
      .from('bets')
      .insert({
        user_id: user.id,
        bankroll_entry_id: bankroll_id,
        ai_recommended_odds,
        user_odds: ai_recommended_odds,
        ai_units,
        stake_euros: stakeEuros,
        result: 'pending',
        played: false,
        event_name,
        market: market || ''
      })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: 'Failed to create bet' }, { status: 500 })
    }

    return NextResponse.json({ bet }, { status: 201 })
  } catch (error) {
    console.error('Bets POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { bet_id, played, user_odds, result, stake_euros } = body

    if (!bet_id) {
      return NextResponse.json({ error: 'bet_id required' }, { status: 400 })
    }

    const updates: Partial<Bet> = {}
    if (typeof played === 'boolean') updates.played = played
    if (typeof user_odds === 'number') updates.user_odds = user_odds
    if (result) updates.result = result
    if (typeof stake_euros === 'number') updates.stake_euros = stake_euros

    const { data: updated, error: updateError } = await supabase
      .from('bets')
      .update(updates)
      .eq('id', bet_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update bet' }, { status: 500 })
    }

    return NextResponse.json({ bet: updated })
  } catch (error) {
    console.error('Bets PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
