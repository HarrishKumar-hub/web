'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

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
]

export default function Header({ currentLanguage = 'en', onLanguageChange }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-gradient-to-r from-brass-600 via-sacred-400 to-brass-600" />

      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="glass-header fixed top-1 left-0 right-0 z-50 border-b border-brass/20"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent" />

        <div className="container-custom flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3.5 group min-w-0 py-1">
            <div className="w-11 h-11 rounded-full border border-brass/30 bg-stone-800 shadow-golden overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="Sri Karuppusamy Thirukovil" width={44} height={44} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-lg md:text-xl font-semibold leading-none text-stone-100 group-hover:text-brass-400 transition-colors truncate">
                Sri Karuppusamy Thirukovil
              </h1>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-stone-300 truncate">
                {currentLanguage === 'ta' ? 'மதநாயக்கன்பட்டி கோவில்' : 'Mathanaickenpatti Temple'}
              </p>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2">
            <nav className="flex items-center gap-1 mr-4">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}`))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 min-h-[44px] flex items-center ${
                      active
                        ? 'text-brass-300 bg-brass/10'
                        : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
                    }`}
                  >
                    {t(item.name, currentLanguage)}
                    {active ? <span className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-brass-400 rounded-full shadow-[0_0_8px_rgba(176,138,79,0.6)]" /> : null}
                  </Link>
                )
              })}
            </nav>


            <div className="ml-2 flex rounded-full border border-brass/25 bg-stone-800 p-0.5 shadow-inner">
              {(['en', 'ta'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange?.(lang)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all min-h-[36px] ${
                    currentLanguage === lang
                      ? 'bg-brass-400 text-stone-950 shadow-sm'
                      : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  {lang === 'en' ? 'EN' : 'தமிழ்'}
                </button>
              ))}
            </div>

            {isAuthenticated ? (
              <div className="ml-2 flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-brass/30 bg-stone-800 text-sm font-bold text-brass-300 shadow-golden transition-colors hover:border-brass-400 hover:text-brass-200"
                  aria-label="User profile"
                >
                  {user?.name?.[0]?.toUpperCase() ?? 'U'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-sacred-400 px-2 py-2 min-h-[44px] flex items-center"
                >
                  {t('nav.logout', currentLanguage)}
                </button>
              </div>
            ) : (
              <Link href="/login" className="ml-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-300 transition-colors hover:text-brass-300 px-3 py-2 min-h-[44px] flex items-center">
                {t('nav.login', currentLanguage)}
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            className="xl:hidden flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 bg-stone-800 text-brass-300 shadow-golden transition-transform active:scale-95 min-w-[44px] min-h-[44px]"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="xl:hidden border-t border-brass/20 bg-stone-900/98 backdrop-blur-2xl shadow-2xl"
            >
              <div className="container-custom py-6 flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}`))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`rounded-xl px-4 py-3.5 text-base font-semibold transition-colors min-h-[48px] flex items-center justify-between ${
                        active ? 'bg-brass/15 text-brass-300 border border-brass/25' : 'text-stone-200 hover:bg-stone-800 hover:text-stone-100'
                      }`}
                    >
                      <span>{t(item.name, currentLanguage)}</span>
                      {active ? <span className="h-2 w-2 rounded-full bg-brass-400 shadow-[0_0_8px_rgba(176,138,79,0.8)]" /> : null}
                    </Link>
                  )
                })}
                <div className="mt-4 pt-4 border-t border-brass/15">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="btn-outline-gold w-full justify-center">
                    {t('nav.login', currentLanguage)}
                  </Link>
                </div>
                <div className="mt-3 flex justify-center items-center gap-3 pt-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-400">Language:</span>
                  <div className="flex rounded-full border border-brass/25 bg-stone-800 p-0.5">
                    {(['en', 'ta'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          onLanguageChange?.(lang)
                          setIsMenuOpen(false)
                        }}
                        className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                          currentLanguage === lang
                            ? 'bg-brass-400 text-stone-950'
                            : 'text-stone-300 hover:text-stone-100'
                        }`}
                      >
                        {lang === 'en' ? 'English' : 'தமிழ்'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
