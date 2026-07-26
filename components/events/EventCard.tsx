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
    <div className="card-temple p-0 flex flex-col group overflow-hidden border-none shadow-ivory hover:shadow-flame">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden rounded-t-[30px]">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={displayTitle} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-saffron/10 flex items-center justify-center">
            <CalendarDays className="w-12 h-12 text-saffron animate-float" strokeWidth={1.5} />
          </div>
        )}
        
        {/* Date Badge Overlay */}
        <div className="absolute top-4 right-4 bg-ivory/95 backdrop-blur shadow-temple border border-gold/20 rounded-2xl flex flex-col items-center justify-center min-w-[3.5rem] py-2 px-1">
          <span className="text-saffron-dark font-black text-xs uppercase tracking-widest leading-none mb-1">{month}</span>
          <span className="text-gold-dark font-serif font-bold text-xl leading-none">{day}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-ivory rounded-b-[30px]">
        <h3 className="text-xl font-serif font-bold text-gold-dark mb-4 line-clamp-1 group-hover:text-saffron-dark transition-colors">
          {displayTitle}
        </h3>
        
        <div className="space-y-3 font-lora text-sacred-ash/60 text-sm mb-6 flex-grow">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
            <span>{descDate} {event.time && <span className="block text-xs font-sans uppercase tracking-[0.2em] font-bold text-gold mt-1">{event.time}</span>}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 leading-relaxed">{event.location}</span>
          </div>
          {event._count !== undefined && (
            <div className="flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-saffron pt-2">
              <Users className="w-4 h-4 text-saffron" />
              {event._count.rsvps} {t('event.rsvp', language)}
            </div>
          )}
        </div>

        <Link 
          href={`/events/${event.id}`}
          className="btn-outline-gold block text-center py-3 w-full border border-gold/30 hover:border-transparent"
        >
          {language === 'ta' ? 'விவரங்களைப் பார்க்க' : 'View Details'}
        </Link>
      </div>
    </div>
  )
}
