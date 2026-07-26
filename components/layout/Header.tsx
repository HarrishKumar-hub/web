'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Flame, Menu, X } from 'lucide-react'

interface HeaderProps {
  currentLanguage?: Language
  onLanguageChange?: (lang: Language) => void
}

const NAV_ITEMS = [
  { name: 'nav.home',   href: '/' },
  { name: 'nav.about',  href: '/about' },
  { name: 'nav.events', href: '/events' },
  { name: 'nav.news',   href: '/announcements' },
  { name: 'nav.gallery',href: '/gallery' },
  { name: 'nav.booking',href: '/booking' },
]

export default function Header({ currentLanguage = 'en', onLanguageChange }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const { scrollY } = useScroll()
  const headerHeight  = useTransform(scrollY, [0, 100], ['116px', '72px'])
  const headerBg      = useTransform(scrollY, [0, 80],  ['rgba(250,247,240,0)', 'rgba(250,247,240,0.97)'])
  const headerShadow  = useTransform(scrollY, [0, 80],  ['0 0 0 rgba(0,0,0,0)', '0 4px 24px rgba(61,43,31,0.08)'])
  const logoScale     = useTransform(scrollY, [0, 100], [1, 0.85])

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-saffron-glow" />

      <motion.header
        style={{ height: headerHeight, backgroundColor: headerBg, boxShadow: headerShadow }}
        className="fixed top-1 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-500 flex items-center border-b border-gold/20"
      >
        {/* Ornamental Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        
        <div className="w-full px-4 md:px-10 lg:px-16 flex justify-between items-center relative">

          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-5 hover:opacity-90 transition-opacity group">
            <motion.div
              style={{ scale: logoScale }}
              whileHover={{ scale: 1.06 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gold/25 overflow-hidden bg-white shadow-golden flex-shrink-0"
            >
              <img src="/logo.png" alt="Sri Karuppusamy Thirukovil" className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex flex-col justify-center gap-1">
              <h1 className="text-base md:text-xl lg:text-2xl font-serif font-bold tracking-tight text-gold-dark leading-none group-hover:text-gold transition-colors whitespace-nowrap">
                Sri Karuppusamy Thirukovil
              </h1>
              <p className="text-[8px] md:text-[9px] tracking-[0.45em] font-sans font-black text-saffron/60 uppercase whitespace-nowrap">
                Mathanaickenpatti Sanctuary
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center gap-6">
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 font-sans font-bold text-[11px] uppercase tracking-[0.25em] text-sacred-ash/70 hover:text-saffron transition-all relative group rounded-lg hover:bg-saffron/5"
                >
                  {t(item.name, currentLanguage)}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-full" />
                </Link>
              ))}
              <Link href="/donations" className="ml-4 btn-sacred py-3 px-8 text-[10px]">
                {currentLanguage === 'ta' ? 'நன்கொடை' : 'Offer Devotion'}
              </Link>
            </nav>

            {/* Language Toggle */}
            <div className="flex bg-ivory-warm rounded-full p-0.5 border border-gold/15 shadow-ivory">
              {(['en', 'ta'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange?.(lang)}
                  className={`px-3.5 py-1.5 text-[10px] font-black rounded-full transition-all duration-300 ${
                    currentLanguage === lang
                      ? 'bg-maroon text-ivory shadow-temple'
                      : 'text-sacred-smoke hover:text-gold-dark'
                  }`}
                >
                  {lang === 'en' ? 'EN' : 'தமிழ்'}
                </button>
              ))}
            </div>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/profile"
                  className="w-10 h-10 rounded-full border-2 border-gold/25 flex items-center justify-center hover:border-saffron transition-all bg-ivory-warm overflow-hidden shadow-ivory"
                >
                  <span className="text-xs font-black text-gold-dark">{user?.name?.[0].toUpperCase()}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sacred-smoke/50 hover:text-red-500 font-sans font-black text-[10px] uppercase tracking-widest transition-colors"
                >
                  {t('nav.logout', currentLanguage)}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <Link
                  href="/login"
                  className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-sacred-ash/60 hover:text-saffron transition-colors px-4 py-2"
                >
                  {t('nav.login', currentLanguage)}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-full bg-ivory-warm text-gold-dark transition-all active:scale-90 border border-gold/15 hover:border-saffron/40 hover:text-saffron"
            >
              {isMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-4 top-[80px] bg-ivory/98 backdrop-blur-3xl border border-gold/15 px-8 py-10 flex flex-col gap-6 shadow-golden-lg rounded-[32px] xl:hidden z-40"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-gold-dark hover:text-saffron transition-colors border-b border-gold/10 pb-4 last:border-0"
                >
                  {t(item.name, currentLanguage)}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/donations" onClick={() => setIsMenuOpen(false)} className="btn-sacred flex items-center justify-center gap-2 w-full py-5 text-base">
                  <Flame className="w-5 h-5" />
                  {currentLanguage === 'ta' ? 'நன்கொடை சமர்ப்பிக்கவும்' : 'Offer Devotion'}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
