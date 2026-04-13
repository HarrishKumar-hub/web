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

    // Validate
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
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
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-2">🕉️</h1>
            <h2 className="text-2xl font-bold text-dark">
              {t('auth.register', language)}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {language === 'ta'
                ? 'சமூகத்தில் சேர்ந்து கொள்ளவும்'
                : 'Join our community'}
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                {t('auth.name', language)}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                placeholder="John Doe"
              />
            </div>

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
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ta'
                  ? 'குறைந்தபட்சம் 8 எழுத்துக்கள்'
                  : 'Minimum 8 characters'}
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                {language === 'ta' ? 'கடவுச்சொல்லை உறுதிசெய்க' : 'Confirm Password'}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {isLoading ? t('common.loading', language) : t('auth.signUp', language)}
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

          {/* Login Link */}
          <p className="text-center text-gray-600">
            {t('auth.haveAccount', language)}{' '}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              {t('auth.login', language)}
            </Link>
          </p>
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
