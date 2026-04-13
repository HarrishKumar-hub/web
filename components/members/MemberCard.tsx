import React from 'react'
import { Language, t } from '@/lib/translations'

interface MemberCardProps {
  member: {
    id: string
    name: string
    profilePhotoUrl?: string | null
    bio?: string | null
    joinedDate: string | Date
    role: string
  }
  language: Language
}

export default function MemberCard({ member, language }: MemberCardProps) {
  const joinDate = new Date(member.joinedDate).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    month: 'long', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center">
        {member.profilePhotoUrl ? (
          <img src={member.profilePhotoUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl">👤</span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
      
      <div className="mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          member.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {member.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
        </span>
      </div>

      {member.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 w-full">
          {member.bio}
        </p>
      )}

      <div className="mt-auto pt-4 border-t w-full text-xs text-gray-400">
        {t('member.joinDate', language)}: {joinDate}
      </div>
    </div>
  )
}
