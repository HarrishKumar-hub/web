'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState<Language>('en')

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-red-700 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl font-bold mb-4">
              🕉️ {language === 'ta' ? 'கோவில் சமூகம்' : 'Kovil Community'}
            </h1>
            <p className="text-xl mb-8">
              {language === 'ta'
                ? 'ஒரு சமூக கைयल் உண்டாக்கவும்'
                : 'Bringing our community together'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/events" className="btn-secondary">
                {t('nav.events', language)}
              </Link>
              <Link href="/announcements" className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                {t('nav.news', language)}
              </Link>
            </div>
          </div>
        </section>

        {/* Info Sections */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Events Card */}
              <Link href="/events">
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('nav.events', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'வரவிருக்கும் நிகழ்வுகள் மற்றும் விழா பார்ப்பி'
                      : 'Upcoming events and ceremonies'}
                  </p>
                </div>
              </Link>

              {/* News Card */}
              <Link href="/announcements">
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">📢</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('announcement.title', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்'
                      : 'Latest news and announcements'}
                  </p>
                </div>
              </Link>

              {/* Membership Card */}
              <Link href={isAuthenticated ? '/members' : '/register'}>
                <div className="card cursor-pointer">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-bold mb-2">
                    {t('member.directory', language)}
                  </h3>
                  <p>
                    {language === 'ta'
                      ? 'சமூக உறுப்பினர்களைம்apping பார்ப்பி'
                      : 'Connect with community members'}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="bg-secondary py-16">
            <div className="container-custom text-center">
              <h2 className="text-3xl font-bold mb-4 text-dark">
                {language === 'ta'
                  ? 'சமூகத்தை சேர்ந்து கொள்ளவும்'
                  : 'Join Our Community'}
              </h2>
              <p className="text-lg text-dark mb-8">
                {language === 'ta'
                  ? 'பணபணிர்களக் நீங்கள் தன் தொடை மாறிப்புவ'
                  : 'Become a member and get exclusive access to events, member directory, and more'}
              </p>
              <Link href="/register" className="btn-primary">
                {t('auth.signUp', language)}
              </Link>
            </div>
          </section>
        )}

        {/* Gallery Preview */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t('nav.gallery', language)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">{language === 'ta' ? 'படம்' : 'Image'}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/gallery" className="btn-primary">
                {language === 'ta' ? 'மேலே பார்ப்பி' : 'View All'}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
