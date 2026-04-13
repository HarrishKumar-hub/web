'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import EventForm from '@/components/events/EventForm'
import { useAuth } from '@/lib/useAuth'

export default function CreateEventPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    } else if (!isLoading && isAuthenticated && user?.role !== 'ADMIN' && user?.role !== 'MEMBER') {
      router.push('/events')
    }
  }, [isLoading, isAuthenticated, user, router])

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">{t('common.loading', language)}</div>
  }

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark mb-2">
              {t('common.create', language) === 'Create' ? 'Create New Event' : 'புதிய நிகழ்வை உருவாக்கவும்'}
            </h1>
            <p className="text-gray-600">
              {language === 'ta' ? 'சமூகத்திற்கான புதிய நிகழ்வைச் சேர்க்கவும்.' : 'Add a new event for the community.'}
            </p>
          </div>
          
          <EventForm language={language} />
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
