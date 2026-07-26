'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { t, type Language } from '@/lib/translations'
import { Flame } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [language, setLanguage] = useState<Language>('en')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError(language === 'ta' ? 'கடவுச்சொல் குறைந்தது 8 எழுத்துக்களாக இருக்க வேண்டும்' : 'Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      await register(formData.email, formData.password, formData.name)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-4 relative overflow-hidden text-stone-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />

      <div className="w-full max-w-lg z-10 transition-all duration-500">
        <div className="bg-stone-800 rounded-3xl shadow-golden p-8 md:p-12 border border-brass/25 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-stone-900 border border-brass/30 rounded-2xl mb-5 shadow-inner">
              <Flame className="w-10 h-10 text-brass-400 animate-pulse" />
            </div>
            <h1 className="text-3xl font-serif font-semibold text-stone-100 tracking-tight mb-2">
              {language === 'ta' ? 'உறுப்பினர் பதிவு' : 'Member Registration'}
            </h1>
            <p className="text-stone-400 text-sm md:text-base">
              {language === 'ta'
                ? 'ஸ்ரீ கருப்பசாமி திருக்கோவில் சமூகத்தில் இணையுங்கள்'
                : 'Join the Sri Karuppusamy Thirukovil community'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex bg-stone-900 p-1 rounded-xl mb-8 border border-brass/25">
            <button
              type="button"
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
              type="button"
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/40 border-l-4 border-red-500 text-red-300 px-4 py-3 rounded-r-lg mb-6 text-sm border border-red-500/20">
              <span className="font-semibold block mb-0.5 uppercase tracking-wider text-xs">Notice</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                {t('auth.name', language)}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base"
                placeholder={language === 'ta' ? 'உங்கள் பெயர்' : 'Devotee Name'}
              />
            </div>

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
                placeholder="devotee@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                  {t('auth.password', language)}
                </label>
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
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-stone-300 mb-2">
                  {language === 'ta' ? 'உறுதிசெய்க' : 'Confirm'}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-stone-900 border border-brass/30 rounded-xl focus:outline-none focus:border-brass-400 transition-all text-stone-100 placeholder-stone-500 text-sm md:text-base"
                  placeholder="••••••••"
                />
              </div>
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
              ) : (
                t('auth.signUp', language)
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center pt-8 border-t border-brass/20">
            <p className="text-stone-400 text-sm">
              {t('auth.haveAccount', language)}{' '}
              <Link
                href="/login"
                className="text-brass-300 font-semibold hover:text-brass-200 border-b border-brass-400/40 pb-0.5 ml-1 transition-all"
              >
                {t('auth.login', language)}
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-200 font-semibold uppercase text-xs tracking-[0.15em] transition-all">
            <span className="text-lg leading-none mb-0.5">←</span> {t('common.back', language)}
          </Link>
        </div>
      </div>
    </div>
  )
}
