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
    <div className="card-temple border-none shadow-ivory flex flex-col items-center text-center overflow-hidden relative group">
      {/* Decorative top header bg */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-gold/10 to-transparent" />
      
      {/* Avatar Container */}
      <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mb-5 bg-ivory-warm border-[3px] border-gold p-1 shadow-golden">
        <div className="w-full h-full rounded-full overflow-hidden bg-ivory flex items-center justify-center">
          {member.profilePhotoUrl ? (
            <img src={member.profilePhotoUrl} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <UserCircle className="w-12 h-12 text-gold/40" strokeWidth={1} />
          )}
        </div>
      </div>
      
      {/* Name */}
      <h3 className="relative z-10 text-xl font-serif font-bold text-gold-dark mb-2">
        {member.name}
      </h3>
      
      {/* Role Badge */}
      <div className="mb-5 relative z-10">
        <span className={member.role === 'ADMIN' ? 'badge-sacred' : 'badge-gold'}>
          {member.role === 'ADMIN' ? (language === 'ta' ? 'நிர்வாகி' : 'Admin') : (language === 'ta' ? 'உறுப்பினர்' : 'Member')}
        </span>
      </div>

      {/* Bio */}
      {member.bio && (
        <p className="font-lora text-sacred-ash/60 text-sm leading-relaxed mb-6 line-clamp-3 w-full relative z-10 px-2 flex-grow">
          "{member.bio}"
        </p>
      )}

      {/* Footer Details */}
      <div className="mt-auto pt-5 border-t border-gold/10 w-full flex items-center gap-2 justify-center text-[9px] font-black uppercase tracking-[0.2em] text-gold-dark/50 relative z-10">
        <Heart className="w-3 h-3 text-saffron/60" />
        {t('member.joinDate', language)} {joinDate}
      </div>
    </div>
  )
}
