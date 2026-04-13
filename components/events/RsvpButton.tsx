'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { t, Language } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'

interface RsvpButtonProps {
  eventId: string
  initialRsvped: boolean
  language: Language
}

export default function RsvpButton({ eventId, initialRsvped, language }: RsvpButtonProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isRsvped, setIsRsvped] = useState(initialRsvped)
  const [isLoading, setIsLoading] = useState(false)

  const handleRsvp = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) throw new Error('Failed to RSVP')

      const data = await res.json()
      setIsRsvped(data.rsvped)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert(t('common.error', language))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleRsvp}
      disabled={isLoading}
      className={`px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
        isRsvped
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-primary text-white hover:bg-red-700'
      } disabled:opacity-50`}
    >
      {isLoading 
        ? t('common.loading', language) 
        : isRsvped 
          ? (language === 'ta' ? 'நீங்கள் சேர்ந்துள்ளீர்கள்' : 'You are going')
          : t('event.rsvp', language)}
    </button>
  )
}
