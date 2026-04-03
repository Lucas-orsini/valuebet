import { createClient } from '@/lib/supabase/server'
import BankrollTracker from '@/components/dashboard/BankrollTracker'
import { redirect } from 'next/navigation'

export default async function BankrollPage() {
  const supabase = await createClient()
  
  if (!supabase) {
    return (
      <div className="p-6">
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 text-yellow-400">
          Configuration requise : Veuillez configurer les variables d&apos;environnement Supabase.
        </div>
      </div>
    )
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Bankroll Tracker</h1>
        <p className="text-gray-400 mt-1">Suivez vos gains et votre évolution</p>
      </div>
      <BankrollTracker />
    </div>
  )
}
