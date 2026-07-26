'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import EventForm from '@/components/events/EventForm'
import { useAuth } from '@/lib/useAuth'

export default function EditEventPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    } else if (!isLoading && isAuthenticated && user?.role !== 'ADMIN') {
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
              Edit Event
            </h1>
            <p className="text-gray-600">
              Update the details for this community event.
            </p>
          </div>
          
          <EventForm language={language} initialData={{ id: params.id as string }} />
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
