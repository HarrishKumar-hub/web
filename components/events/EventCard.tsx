import React from 'react'
import Link from 'next/link'
import { t, Language } from '@/lib/translations'
import { Calendar, MapPin, Users, CalendarDays } from 'lucide-react'

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
  
  // Custom date formatting for premium look
  const day = dateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { day: 'numeric' })
  const month = dateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { month: 'short' })
  const descDate = dateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', { weekday: 'long', year: 'numeric' })

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col group border border-brass/25 bg-stone-800 shadow-golden transition-all hover:border-brass-400 hover:scale-[1.02]">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={displayTitle} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full bg-stone-900 flex items-center justify-center border-b border-brass/15">
            <CalendarDays className="w-10 h-10 text-brass-400 animate-lamp-flicker" strokeWidth={1.5} />
          </div>
        )}
        
        {/* Date Badge Overlay */}
        <div className="absolute top-3.5 right-3.5 bg-stone-900/90 backdrop-blur-md shadow-golden border border-brass/30 rounded-xl flex flex-col items-center justify-center min-w-[3.5rem] py-2 px-1">
          <span className="text-brass-400 font-semibold text-[10px] uppercase tracking-[0.2em] leading-none mb-1">{month}</span>
          <span className="text-stone-100 font-serif font-semibold text-xl leading-none">{day}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-stone-800 rounded-b-2xl">
        <h3 className="text-lg md:text-xl font-serif font-semibold text-stone-100 mb-3.5 line-clamp-1 group-hover:text-brass-300 transition-colors">
          {displayTitle}
        </h3>
        
        <div className="space-y-3 text-stone-300 text-sm mb-6 flex-grow">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-brass-400 mt-0.5 flex-shrink-0" />
            <span>{descDate} {event.time && <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-brass-400 mt-1">{event.time}</span>}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-brass-400 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 leading-relaxed">{event.location}</span>
          </div>
          {event._count !== undefined && (
            <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-[0.18em] text-brass-400 pt-2 border-t border-brass/15">
              <Users className="w-4 h-4 text-brass-400" />
              {event._count.rsvps} {t('event.rsvp', language)}
            </div>
          )}
        </div>

        <Link 
          href={`/events/${event.id}`}
          className="btn-outline-gold block text-center py-2.5 w-full text-xs"
        >
          {language === 'ta' ? 'விவரங்களைப் பார்க்க' : 'View Details'}
        </Link>
      </div>
    </div>
  )
}
