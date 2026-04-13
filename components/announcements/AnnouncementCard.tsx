import React from 'react'
import Link from 'next/link'
import { t, Language } from '@/lib/translations'

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
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 ${announcement.isPinned ? 'border-red-500' : 'border-primary'}`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-dark line-clamp-2">{displayTitle}</h3>
          {announcement.isPinned && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded ml-2 whitespace-nowrap">
              {language === 'ta' ? 'பின்க செய்யப்பட்ட' : 'Pinned'}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-4">{displayDate}</p>
        
        <p className="text-gray-700 line-clamp-3 mb-4">{displayContent}</p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex items-center">
            💬 {announcement._count?.comments || 0} {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'}
          </span>
          <Link 
            href={`/announcements/${announcement.id}`}
            className="text-primary hover:text-red-700 font-medium text-sm transition-colors"
          >
            {language === 'ta' ? 'மேலும் படிக்க' : 'Read More'} →
          </Link>
        </div>
      </div>
    </div>
  )
}
