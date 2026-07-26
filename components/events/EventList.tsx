import React from 'react'
import EventCard from './EventCard'
import { Language, t } from '@/lib/translations'

interface EventListProps {
  events: any[]
  language: Language
}

export default function EventList({ events, language }: EventListProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">{t('event.noEvents', language)}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} language={language} />
      ))}
    </div>
  )
}
