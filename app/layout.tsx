import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { AuthProvider } from '@/lib/useAuth'
import '../styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})
const anekTamil = localFont({
  src: './fonts/AnekTamil.ttf',
  variable: '--font-tamil',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sri Karuppusamy Thirukovil | Mathanaickenpatti',
  description: 'Official website of Sri Karuppusamy Thirukovil, Mathanaickenpatti. Stay informed about pooja timings, festival schedules, and community announcements.',
  keywords: ['Temple', 'Kovil', 'Hindu Community', 'Annadhanam', 'Pooja', 'Karuppusamy'],
  authors: [{ name: 'Temple Web Administration' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#181612',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${anekTamil.variable}`}>
      <body className="font-sans bg-stone-900 text-stone-100 antialiased selection:bg-brass-400 selection:text-stone-950">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
