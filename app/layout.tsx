import type { Metadata } from 'next'
import { Cinzel, Lora, DM_Sans } from 'next/font/google'
import { AuthProvider } from '@/lib/useAuth'
import '../styles/globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
})
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  style: ['normal', 'italic'],
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sri Karuppusamy Thirukovil - Sanctuary Portal',
  description: 'A luxurious spiritual community portal for the devotees of Sri Karuppusamy Thirukovil in Mathanaickenpatti.',
  keywords: ['Temple', 'Kovil', 'Hindu Community', 'Annadhanam', 'Pooja', 'Karuppusamy'],
  authors: [{ name: 'Temple Web Administration' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E8722A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-ivory text-sacred-ash antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
