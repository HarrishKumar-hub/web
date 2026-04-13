'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { t, type Language } from '@/lib/translations'

interface HeaderProps {
  currentLanguage?: Language
  onLanguageChange?: (lang: Language) => void
}

export default function Header({ currentLanguage = 'en', onLanguageChange }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-3xl">🕉️</span>
          <span className="hidden sm:inline">Kovil</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
            {t('nav.home', currentLanguage)}
          </Link>
          <Link href="/about" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
            {t('nav.about', currentLanguage)}
          </Link>
          <Link href="/events" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
            {t('nav.events', currentLanguage)}
          </Link>
          <Link href="/announcements" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
            {t('nav.news', currentLanguage)}
          </Link>
          <Link href="/gallery" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
            {t('nav.gallery', currentLanguage)}
          </Link>
          <Link href="/donations" className="px-4 py-2 ml-2 bg-yellow-400 text-orange-900 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors shadow-sm">
            {currentLanguage === 'ta' ? 'நன்கொடை' : 'Donate'}
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/members" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium">
                {t('nav.members', currentLanguage)}
              </Link>
            </>
          )}
        </nav>

        {/* Auth & Language */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex bg-white/10 rounded-lg p-0.5">
            <button
              onClick={() => onLanguageChange?.('en')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
                currentLanguage === 'en' ? 'bg-white text-red-800' : 'text-white/80 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange?.('ta')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
                currentLanguage === 'ta' ? 'bg-white text-red-800' : 'text-white/80 hover:text-white'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Auth Links */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
              </Link>
              {user?.role === 'ADMIN' && (
                <Link href="/admin" className="px-3 py-1.5 bg-yellow-400 text-orange-900 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors shadow-sm">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white/15 rounded-lg text-sm font-medium hover:bg-white/25 transition-colors"
              >
                {t('nav.logout', currentLanguage)}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium text-sm">
                {t('nav.login', currentLanguage)}
              </Link>
              <Link href="/register" className="px-4 py-2 bg-yellow-400 text-orange-900 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors shadow-sm">
                {t('auth.signUp', currentLanguage)}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-red-900/95 backdrop-blur-sm px-4 py-4 space-y-1 border-t border-white/10 animate-in">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
            {t('nav.home', currentLanguage)}
          </Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
            {t('nav.about', currentLanguage)}
          </Link>
          <Link href="/events" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
            {t('nav.events', currentLanguage)}
          </Link>
          <Link href="/announcements" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
            {t('nav.news', currentLanguage)}
          </Link>
          <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
            {t('nav.gallery', currentLanguage)}
          </Link>
          <Link href="/donations" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-yellow-400 text-orange-900 font-bold transition-colors">
            {currentLanguage === 'ta' ? 'நன்கொடை' : 'Donate'}
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/members" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
                {t('nav.members', currentLanguage)}
              </Link>
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
                {t('nav.profile', currentLanguage)}
              </Link>
              {user?.role === 'ADMIN' && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-yellow-400/20 text-yellow-200 font-medium transition-colors">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors text-red-200">
                {t('nav.logout', currentLanguage)}
              </button>
            </>
          )}
          {!isAuthenticated && (
            <div className="pt-2 border-t border-white/10 mt-2 space-y-1">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/10 font-medium transition-colors">
                {t('nav.login', currentLanguage)}
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg bg-yellow-400 text-orange-900 font-bold text-center transition-colors">
                {t('auth.signUp', currentLanguage)}
              </Link>
            </div>
          )}
          {/* Mobile Search */}
          <form 
            onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(searchQuery)}`); setIsMenuOpen(false); }} 
            className="px-4 pb-4 pt-2"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={currentLanguage === 'ta' ? 'தேடு...' : 'Search events, items...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 text-white placeholder:text-white/60 border border-white/20 rounded-xl text-md focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </form>
        </nav>
      )}
    </header>
  )
}
