import React from 'react'
import Link from 'next/link'
import { t, Language } from '@/lib/translations'

interface EventCardProps {
  event: {
    id: string
    title: string
    titleTa: string
    date: string | Date
    time?: string | null
    location: string
    imageUrl?: string | null
    _count?: {
      rsvps: number
    }
  }
  language: Language
}

export default function EventCard({ event, language }: EventCardProps) {
  const displayTitle = language === 'ta' && event.titleTa ? event.titleTa : event.title
  const dateObj = new Date(event.date)
  const displayDate = dateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {event.imageUrl ? (
        <img src={event.imageUrl} alt={displayTitle} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-primary/10 flex items-center justify-center">
          <span className="text-4xl">🗓️</span>
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-dark mb-2 line-clamp-1">{displayTitle}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="mr-2">📅</span>
            {displayDate} {event.time && `• ${event.time}`}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span className="line-clamp-1">{event.location}</span>
          </div>
          {event._count !== undefined && (
            <div className="flex items-center font-medium">
              <span className="mr-2">👥</span>
              {event._count.rsvps} {t('event.rsvp', language)}
            </div>
          )}
        </div>

        <Link 
          href={`/events/${event.id}`}
          className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          {t('common.edit', language) === 'Edit' ? 'View Details' : 'விவரங்களைப் பார்க்கவும்'}
        </Link>
      </div>
    </div>
  )
}
