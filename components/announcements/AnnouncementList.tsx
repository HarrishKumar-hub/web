import React from 'react'
import AnnouncementCard from './AnnouncementCard'
import { Language, t } from '@/lib/translations'

interface AnnouncementListProps {
  announcements: any[]
  language: Language
}

export default function AnnouncementList({ announcements, language }: AnnouncementListProps) {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">{t('announcement.noAnnouncements', language)}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} language={language} />
      ))}
    </div>
  )
}
