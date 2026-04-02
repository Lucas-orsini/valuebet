import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Paris Sportifs',
  description: 'Application de gestion de paris sportifs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
