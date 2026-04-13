import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/useAuth'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Kovil Community - Temple Portal',
  description: 'A community portal for temple members and visitors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
