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
      bankroll_entries: {
        Row: {
          id: string
          user_id: string
          starting_bankroll: number
          current_bankroll: number
          mode: 'auto' | 'custom'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          starting_bankroll: number
          current_bankroll: number
          mode?: 'auto' | 'custom'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          starting_bankroll?: number
          current_bankroll?: number
          mode?: 'auto' | 'custom'
          created_at?: string
          updated_at?: string
        }
      }
      bets: {
        Row: {
          id: string
          user_id: string
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
        Insert: {
          id?: string
          user_id: string
          bankroll_entry_id: string
          ai_recommended_odds: number
          user_odds?: number | null
          ai_units: number
          stake_euros?: number
          result?: 'pending' | 'won' | 'lost'
          played?: boolean
          event_name: string
          market: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bankroll_entry_id?: string
          ai_recommended_odds?: number
          user_odds?: number | null
          ai_units?: number
          stake_euros?: number
          result?: 'pending' | 'won' | 'lost'
          played?: boolean
          event_name?: string
          market?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
