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
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron/10 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/15 rounded-full blur-[120px] opacity-60"></div>

      <div className="w-full max-w-lg z-10 transition-all duration-500">
        
        <div className="card-temple border-none shadow-golden-lg p-10 md:p-12 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-saffron/10 border border-saffron/20 rounded-[20px] mb-5 shadow-flame/10">
              <Flame className="w-10 h-10 text-saffron animate-lamp-flicker" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gold-dark tracking-tight mb-3">
              {language === 'ta' ? 'உறுப்பினர் பதிவு' : 'Digital Sanctuary'}
            </h1>
            <p className="text-sacred-ash/60 font-medium font-lora">
              {language === 'ta'
                ? 'ஸ்ரீ கருப்பசாமி திருக்கோவில் சமூகத்தில் இணையுங்கள்'
                : 'Join the Sri Karuppusamy Thirukovil community'}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex bg-ivory-warm p-1.5 rounded-full mb-8 border border-gold/15 shadow-ivory">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
                language === 'en'
                  ? 'bg-maroon text-ivory shadow-temple'
                  : 'text-sacred-ash/50 hover:text-gold-dark'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`flex-1 py-2 text-xs font-black tracking-widest rounded-full transition-all duration-300 ${
                language === 'ta'
                  ? 'bg-maroon text-ivory shadow-temple'
                  : 'text-sacred-ash/50 hover:text-gold-dark'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-maroon/5 border-l-4 border-maroon text-maroon px-5 py-4 rounded-xl mb-6 text-sm font-medium">
              <span className="font-bold block mb-1">Notice</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                {t('auth.name', language)}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-temple"
                placeholder={language === 'ta' ? 'உங்கள் பெயர்' : 'Devotee Name'}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                {t('auth.email', language)}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-temple"
                placeholder="devotee@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                  {t('auth.password', language)}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-temple"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gold-dark mb-2">
                  {language === 'ta' ? 'உறுதிசெய்க' : 'Confirm'}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-temple"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-sacred w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('common.loading', language)}
                  </>
                ) : (
                  t('auth.signUp', language)
                )}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center pt-8 border-t border-gold/10">
            <p className="text-sacred-ash/60 font-medium">
              {t('auth.haveAccount', language)}{' '}
              <Link
                href="/login"
                className="text-saffron font-bold hover:text-saffron-dark pb-0.5 ml-1 transition-colors underline decoration-saffron/30 underline-offset-4"
              >
                {t('auth.login', language)}
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sacred-ash/40 hover:text-gold-dark font-medium uppercase text-xs tracking-widest transition-all">
            <span className="text-lg leading-none mb-0.5">←</span> {t('common.back', language)}
          </Link>
        </div>
      </div>
    </div>
  )
}
