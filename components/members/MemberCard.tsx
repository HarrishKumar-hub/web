import React from 'react'
import { Language, t } from '@/lib/translations'
import { UserCircle, Heart } from 'lucide-react'

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
    <div className="bg-stone-800 border border-brass/25 rounded-2xl p-6 shadow-golden flex flex-col items-center text-center overflow-hidden relative group hover:border-brass-400/50 transition-all duration-500">
      {/* Decorative top header bg */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-brass-400/10 to-transparent" />
      
      {/* Avatar Container */}
      <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mb-5 bg-stone-900 border-2 border-brass/40 p-1 shadow-inner">
        <div className="w-full h-full rounded-full overflow-hidden bg-stone-950 flex items-center justify-center">
          {member.profilePhotoUrl ? (
            <img src={member.profilePhotoUrl} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = '/logo.png'; e.currentTarget.onerror = null; }} />
          ) : (
            <UserCircle className="w-12 h-12 text-stone-500" strokeWidth={1.5} />
          )}
        </div>
      </div>
      
      {/* Name */}
      <h3 className="relative z-10 text-xl font-serif font-semibold text-stone-100 mb-3">
        {member.name}
      </h3>
      
      {/* Role Badge */}
      <div className="mb-5 relative z-10">
        <span className={`px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-[0.15em] rounded-full inline-block ${
          member.role === 'ADMIN' ? 'bg-brass-400/20 text-brass-300 border border-brass-400/40' : 'bg-stone-900 text-stone-300 border border-brass/25'
        }`}>
          {member.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
        </span>
      </div>

      {/* Bio */}
      {member.bio && (
        <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-3 w-full relative z-10 px-2 grow italic">
          "{member.bio}"
        </p>
      )}

      {/* Footer Details */}
      <div className="mt-auto pt-5 border-t border-brass/20 w-full flex items-center gap-2 justify-center text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 relative z-10">
        <Heart className="w-3.5 h-3.5 text-brass-400" />
        {t('member.joinDate', language)} {joinDate}
      </div>
    </div>
  )
}
