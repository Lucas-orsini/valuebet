export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bets: {
        Row: {
          id: string
          user_id: string
          match_id: string
          home_team: string
          away_team: string
          predicted_winner: string
          actual_winner: string | null
          amount: number
          odds: number
          potential_gain: number
          actual_gain: number | null
          status: 'pending' | 'won' | 'lost'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['bets']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['bets']['Insert']>
      }
    }
  }
}

export type Bet = Database['public']['Tables']['bets']['Row']
