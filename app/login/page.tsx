'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { t, type Language } from '@/lib/translations'
import { Flame } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [language, setLanguage] = useState<Language>('en')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4 relative overflow-hidden text-stone-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />

      <div className="w-full max-w-lg z-10 transition-all duration-500">
        <div className="bg-stone-800 rounded-3xl shadow-golden p-8 md:p-12 border border-brass/25">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-stone-900 border border-brass/30 rounded-2xl mb-5 shadow-inner">
              <Flame className="w-10 h-10 text-brass-400 animate-pulse" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-stone-100 tracking-tight mb-2">
              {t('auth.login', language)}
            </h1>
            <p className="text-stone-400 text-sm md:text-base">
              {language === 'ta'
                ? 'உங்கள் கணக்கில் உள்நுழையவும்'
                : 'Welcome back to our community'}
            </p>
          </div>

          <div className="flex bg-stone-900 p-1 rounded-xl mb-8 border border-brass/25">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                language === 'en'
                  ? 'bg-stone-800 text-brass-300 border border-brass/30 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`flex-1 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                language === 'ta'
                  ? 'bg-stone-800 text-brass-300 border border-brass/30 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {error && (
            <div className="bg-red-950/40 border-l-4 border-red-500 text-red-300 px-4 py-3 rounded-r-lg mb-6 text-sm border border-red-500/20">
              <span className="font-semibold block mb-0.5 uppercase tracking-wider text-xs">Error</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                {t('auth.email', language)}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300">
                  {t('auth.password', language)}
                </label>
                <Link href="#" className="text-xs font-mono uppercase tracking-wider text-brass-400 hover:text-brass-300 transition-colors">
                  {language === 'ta' ? 'கடவுச்சொல்லை மறந்தீர்களா?' : 'Forgot password?'}
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full mt-6 py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-stone-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading', language)}
                </span>
              ) : t('auth.loginNow', language)}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-stone-400 text-sm">
              {t('auth.noAccount', language)}{' '}
              <Link
                href="/register"
                className="text-brass-300 font-semibold hover:text-brass-200 border-b border-brass-400/40 pb-0.5 ml-1 transition-all"
              >
                {t('auth.signUp', language)}
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 font-semibold uppercase text-xs tracking-[0.15em] transition-all">
            <span className="text-lg leading-none mb-0.5">←</span> {t('common.back', language)}
          </Link>
        </div>
      </div>
    </div>
  )
}
