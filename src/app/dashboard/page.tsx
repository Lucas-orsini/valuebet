import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function DashboardPage() {
  return redirect('/dashboard/bankroll-tracker')
}
