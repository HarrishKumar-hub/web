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
    <div className={`card-temple p-6 md:p-8 border border-brass/25 bg-stone-800 shadow-golden border-l-4 ${announcement.isPinned ? 'border-l-brass-400 bg-stone-800/90' : 'border-l-brass/40'} relative overflow-hidden group hover:border-brass-400 transition-all`}>
      {/* Background graphic for pinned */}
      {announcement.isPinned && (
        <div className="absolute right-0 top-0 w-32 h-32 bg-brass/5 rounded-bl-[100px] pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-xl font-serif font-semibold text-stone-100 line-clamp-2 leading-snug group-hover:text-brass-300 transition-colors">
            {displayTitle}
          </h3>
          {announcement.isPinned && (
            <span className="px-3 py-1 bg-brass-400/10 border border-brass-400/30 text-brass-300 text-[10px] font-semibold uppercase tracking-[0.15em] rounded-full flex items-center gap-1.5 shrink-0">
              <Pin className="w-3 h-3 text-brass-400" />
              {language === 'ta' ? 'முக்கிய அறிவிப்பு' : 'Pinned'}
            </span>
          )}
        </div>
        
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-brass-400 mb-4">
          {displayDate}
        </p>
        
        <p className="text-stone-300 leading-relaxed line-clamp-3 mb-6 text-sm md:text-base">
          {displayContent}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-brass/15">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brass-400" /> {announcement._count?.comments || 0} {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'}
          </span>
          <Link 
            href={`/announcements/${announcement.id}`}
            className="text-xs font-semibold uppercase tracking-[0.15em] text-brass-400 hover:text-brass-300 transition-colors flex items-center gap-1.5"
          >
            {language === 'ta' ? 'மேலும் படிக்க' : 'Read More'} 
            <span className="text-base leading-none mb-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
