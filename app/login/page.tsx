'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { t, type Language } from '@/lib/translations'

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
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-2">🕉️</h1>
            <h2 className="text-2xl font-bold text-dark">
              {t('auth.login', language)}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {language === 'ta'
                ? 'உங்கள் கணக்கை உள்நுழைக'
                : 'Access your community account'}
            </p>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 rounded ${
                language === 'en'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-dark'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`flex-1 py-2 rounded ${
                language === 'ta'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-dark'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                {t('auth.email', language)}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                {t('auth.password', language)}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('common.loading', language) : t('auth.loginNow', language)}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">या</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            {t('auth.noAccount', language)}{' '}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              {t('auth.signUp', language)}
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 rounded p-4">
            <p className="text-xs text-gray-600 font-bold mb-2">
              {language === 'ta' ? 'டெमो खाता:' : 'Demo Account:'}
            </p>
            <p className="text-xs text-gray-600">
              Email: demo@example.com
            </p>
            <p className="text-xs text-gray-600">
              Password: demo123456
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-white hover:underline text-sm">
            ← {t('common.back', language)}
          </Link>
        </div>
      </div>
    </div>
  )
}
