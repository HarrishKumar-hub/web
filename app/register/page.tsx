'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { t, type Language } from '@/lib/translations'

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
    <div className="min-h-screen bg-[#fcf8f1] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-100 rounded-full blur-[100px] opacity-50"></div>

      <div className="w-full max-w-lg z-10 transition-all duration-500">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-orange-50">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-orange-50 rounded-2xl mb-4">
              <span className="text-5xl">🕉️</span>
            </div>
            <h1 className="text-3xl font-extrabold text-dark tracking-tight mb-2">
              {language === 'ta' ? 'உறுப்பினர் பதிவு' : 'Member Registration'}
            </h1>
            <p className="text-gray-500 font-medium">
              {language === 'ta'
                ? 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில் சமூகத்தில் இணையுங்கள்'
                : 'Join the Sri Ayyanar Karuppasamy Kovil community'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex bg-gray-50 p-1 rounded-xl mb-8 border border-gray-100">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                language === 'en'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
                language === 'ta'
                  ? 'bg-white text-orange-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-6 text-sm">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.name', language)}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-dark md:text-lg"
                  placeholder={language === 'ta' ? 'உங்கள் பெயர்' : 'Full Name'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('auth.email', language)}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-dark md:text-lg"
                  placeholder="name@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {t('auth.password', language)}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-dark md:text-lg"
                    placeholder="••••••••"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {language === 'ta' ? 'உறுதிசெய்க' : 'Confirm'}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-dark md:text-lg"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl font-extrabold text-lg shadow-lg hover:shadow-orange-200 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading', language)}
                </span>
              ) : t('auth.signUp', language)}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              {t('auth.haveAccount', language)}{' '}
              <Link
                href="/login"
                className="text-orange-700 font-extrabold hover:text-orange-800 border-b-2 border-orange-200 pb-0.5 ml-1 transition-all"
              >
                {t('auth.login', language)}
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-700 font-bold transition-all">
            <span className="text-xl">←</span> {t('common.back', language)}
          </Link>
        </div>
      </div>
    </div>
  )
}
