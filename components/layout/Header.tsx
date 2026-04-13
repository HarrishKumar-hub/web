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

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container-custom py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          🕉️ Kovil
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-secondary transition">
            {t('nav.home', currentLanguage)}
          </Link>
          <Link href="/about" className="hover:text-secondary transition">
            {t('nav.about', currentLanguage)}
          </Link>
          <Link href="/events" className="hover:text-secondary transition">
            {t('nav.events', currentLanguage)}
          </Link>
          <Link href="/announcements" className="hover:text-secondary transition">
            {t('nav.news', currentLanguage)}
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/members" className="hover:text-secondary transition">
                {t('nav.members', currentLanguage)}
              </Link>
              <Link href="/gallery" className="hover:text-secondary transition">
                {t('nav.gallery', currentLanguage)}
              </Link>
              <Link href="/donate" className="btn-secondary">
                {t('donation.donate', currentLanguage)}
              </Link>
            </>
          )}
        </nav>

        {/* Auth & Language */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange?.(e.target.value as Language)}
            className="bg-red-700 text-white px-3 py-2 rounded cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>

          {/* Auth Links */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">{user?.name}</span>
              <Link href="/profile" className="hover:text-secondary">
                {t('nav.profile', currentLanguage)}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                {t('nav.logout', currentLanguage)}
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-secondary">
                {t('nav.login', currentLanguage)}
              </Link>
              <Link href="/register" className="btn-secondary">
                {t('auth.signUp', currentLanguage)}
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-red-700 px-4 py-4 space-y-2">
          <Link href="/" className="block hover:text-secondary">
            {t('nav.home', currentLanguage)}
          </Link>
          <Link href="/about" className="block hover:text-secondary">
            {t('nav.about', currentLanguage)}
          </Link>
          <Link href="/events" className="block hover:text-secondary">
            {t('nav.events', currentLanguage)}
          </Link>
          <Link href="/announcements" className="block hover:text-secondary">
            {t('nav.news', currentLanguage)}
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/members" className="block hover:text-secondary">
                {t('nav.members', currentLanguage)}
              </Link>
              <Link href="/gallery" className="block hover:text-secondary">
                {t('nav.gallery', currentLanguage)}
              </Link>
              <Link href="/donate" className="block hover:text-secondary">
                {t('donation.donate', currentLanguage)}
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  )
}
