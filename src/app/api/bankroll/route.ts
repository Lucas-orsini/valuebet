import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

type BankrollEntry = Database['public']['Tables']['bankroll_entries']['Row']
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

    const { data: bankrollEntry, error: bankrollError } = await supabase
      .from('bankroll_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (bankrollError && bankrollError.code !== 'PGRST116') {
      return NextResponse.json({ error: 'Failed to fetch bankroll' }, { status: 500 })
    }

    if (!bankrollEntry) {
      return NextResponse.json({ bankroll: null, bets: [] })
    }

    const { data: bets, error: betsError } = await supabase
      .from('bets')
      .select('*')
      .eq('bankroll_entry_id', bankrollEntry.id)
      .order('created_at', { ascending: true })

    if (betsError) {
      return NextResponse.json({ error: 'Failed to fetch bets' }, { status: 500 })
    }

    return NextResponse.json({
      bankroll: bankrollEntry,
      bets: bets || []
    })
  } catch (error) {
    console.error('Bankroll GET error:', error)
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
    const { starting_bankroll, mode } = body

    if (typeof starting_bankroll !== 'number' || starting_bankroll <= 0) {
      return NextResponse.json({ error: 'Invalid starting bankroll' }, { status: 400 })
    }

    const { data: bankrollEntry, error: createError } = await supabase
      .from('bankroll_entries')
      .insert({
        user_id: user.id,
        starting_bankroll,
        current_bankroll: starting_bankroll,
        mode: mode || 'auto'
      })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: 'Failed to create bankroll' }, { status: 500 })
    }

    return NextResponse.json({ bankroll: bankrollEntry, bets: [] }, { status: 201 })
  } catch (error) {
    console.error('Bankroll POST error:', error)
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
    const { bankroll_id, mode, current_bankroll } = body

    const updates: Partial<BankrollEntry> = {}
    if (mode) updates.mode = mode
    if (typeof current_bankroll === 'number') updates.current_bankroll = current_bankroll

    const { data: updated, error: updateError } = await supabase
      .from('bankroll_entries')
      .update(updates)
      .eq('id', bankroll_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update bankroll' }, { status: 500 })
    }

    return NextResponse.json({ bankroll: updated })
  } catch (error) {
    console.error('Bankroll PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
