import { redirect } from 'next/navigation'
import { createClient } from '@/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <p className="text-gray-600">Bienvenue, {user.email}</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/dashboard/historique"
          className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
        >
          <h2 className="font-semibold">Historique des paris</h2>
          <p className="text-sm text-gray-500">Voir tous vos paris</p>
        </a>
      </div>
    </div>
  )
}
