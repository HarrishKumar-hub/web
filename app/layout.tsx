import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/useAuth'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Sri Ayyanar Karuppasamy - Kovil Community',
  description: 'A dedicated spiritual community portal for devotees and visitors to engage with temple activities, events, and daily annadhanam.',
  keywords: ['Temple', 'Kovil', 'Hindu Community', 'Annadhanam', 'Pooja', 'Ayyanar Karuppasamy'],
  authors: [{ name: 'Temple Web Administration' }],
  openGraph: {
    title: 'Sri Ayyanar Karuppasamy Kovil',
    description: 'Join our digital spiritual community portal.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kovil Community'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Ayyanar Karuppasamy Kovil'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ea580c', // Tailwind Orange-600 matching our branding
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
