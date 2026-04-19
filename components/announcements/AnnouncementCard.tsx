import React from 'react'
import Link from 'next/link'
import { Language } from '@/lib/translations'
import { Pin, MessageSquare } from 'lucide-react'

interface AnnouncementCardProps {
  announcement: {
    id: string
    title: string
    titleTa: string
    content: string
    contentTa: string
    imageUrl?: string | null
    publishedDate: string | Date
    isPinned: boolean
    _count?: {
      comments: number
    }
  }
  language: Language
}

export default function AnnouncementCard({ announcement, language }: AnnouncementCardProps) {
  const displayTitle = language === 'ta' && announcement.titleTa ? announcement.titleTa : announcement.title
  const displayContent = language === 'ta' && announcement.contentTa ? announcement.contentTa : announcement.content
  const dateObj = new Date(announcement.publishedDate)
  const displayDate = dateObj.toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })

  return (
    <div className={`card-temple border-l-4 ${announcement.isPinned ? 'border-l-saffron bg-ivory-warm' : 'border-l-gold/30 bg-ivory'} relative overflow-hidden group`}>
      {/* Background graphic for pinned */}
      {announcement.isPinned && (
        <div className="absolute right-0 top-0 w-32 h-32 bg-saffron/5 rounded-bl-[100px] pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-xl font-serif font-bold text-gold-dark line-clamp-2 leading-snug group-hover:text-saffron-dark transition-colors">
            {displayTitle}
          </h3>
          {announcement.isPinned && (
            <span className="badge-pinned shadow-flame/20 flex items-center gap-1.5">
              <Pin className="w-2.5 h-2.5" />
              {language === 'ta' ? 'பின்க செய்யப்பட்டது' : 'Pinned'}
            </span>
          )}
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gold mb-4">
          {displayDate}
        </p>
        
        <p className="font-lora text-sacred-ash/65 leading-relaxed line-clamp-3 mb-6 text-sm">
          {displayContent}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-gold/10">
          <span className="text-[10px] font-black uppercase tracking-widest text-sacred-smoke flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" /> {announcement._count?.comments || 0} {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'}
          </span>
          <Link 
            href={`/announcements/${announcement.id}`}
            className="text-[10px] font-black uppercase tracking-widest text-saffron hover:text-maroon transition-colors flex items-center gap-2"
          >
            {language === 'ta' ? 'மேலும் படிக்க' : 'Read More'} 
            <span className="text-lg leading-none mb-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
