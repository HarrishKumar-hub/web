'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import CommentSection from '@/components/announcements/CommentSection'
import { Pin, Calendar, User, MessageSquare, ChevronLeft } from 'lucide-react'

// Same mock data - in production these would come from the API
const MOCK_ANNOUNCEMENTS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Temple Renovation Update - Phase 1 Completed',
    titleTa: 'கோவில் புனரமைப்பு புதுப்பிப்பு - முதல் கட்டம் முடிந்தது',
    content: 'We are pleased to announce that the first phase of our temple renovation project has been successfully completed. The new gopuram work and main entrance are now finished. We express our heartfelt gratitude to all devotees and volunteers who contributed to this sacred endeavor.\n\nThe renovation includes:\n• New gopuram (tower) above the main entrance\n• Refurbished main sanctum with fresh paintwork\n• New granite flooring in the prayer hall\n• Improved drainage system around the temple\n• Enhanced lighting for evening poojas\n\nThe second phase of renovation will begin next month and will focus on the outer mandapam, kitchen facilities, and the community hall. We look forward to the continued participation of our community to complete this divine project.',
    contentTa: 'எங்கள் கோவில் புனரமைப்பு திட்டத்தின் முதல் கட்டம் வெற்றிகரமாக முடிவடைந்துள்ளது என்று மகிழ்ச்சியுடன் தெரிவிக்கிறோம். புதிய கோபுர வேலை மற்றும் பிரதான நுழைவு வாயில் இப்போது முடிந்தது. இந்த புனிதமான முயற்சிக்கு பங்களித்த அனைத்து பக்தர்களுக்கும் தொண்டர்களுக்கும் எங்கள் மனமார்ந்த நன்றி.',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800',
    publishedDate: '2026-04-10T10:00:00.000Z',
    isPinned: true,
    allowComments: true,
    creator: { name: 'Rajesh Kumar', profilePhotoUrl: null },
    _count: { comments: 12 }
  },
  '2': {
    id: '2',
    title: 'Aadi Amavasai Special Pooja Schedule',
    titleTa: 'ஆடி அமாவாசை சிறப்பு பூஜை அட்டவணை',
    content: 'Dear devotees, the upcoming Aadi Amavasai special pooja will be held on August 11th, 2026 from 6:00 AM to 12:00 PM. All devotees are requested to participate in this auspicious ceremony.\n\nSchedule:\n• 6:00 AM - Suprabhatam and morning prayers\n• 7:00 AM - Abhishekam with milk, curd, honey, and sandalwood paste\n• 8:30 AM - Alankaram and special deeparadhana\n• 10:00 AM - Homam (fire ritual)\n• 11:30 AM - Mahaprasadam distribution\n\nPrasadam will be distributed to all attendees. Devotees who wish to participate in the Abhishekam can register at the temple office.\n\nPlease note: Parking will be available at the community ground. Volunteers are requested to arrive by 5:30 AM.',
    contentTa: 'அன்பான பக்தர்களே, வரவிருக்கும் ஆடி அமாவாசை சிறப்பு பூஜை ஆகஸ்ட் 11, 2026 அன்று காலை 6:00 மணி முதல் மதியம் 12:00 மணி வரை நடைபெறும்.',
    publishedDate: '2026-04-08T08:30:00.000Z',
    isPinned: false,
    allowComments: true,
    creator: { name: 'Temple Admin', profilePhotoUrl: null },
    _count: { comments: 5 }
  },
  '3': {
    id: '3',
    title: 'Community Meeting - Monthly Gathering',
    titleTa: 'சமூக கூட்டம் - மாதாந்திர சந்திப்பு',
    content: 'Our monthly community meeting will be held this Sunday at the temple hall at 4:00 PM. Agenda includes discussion on upcoming festival preparations, volunteer assignments, and community welfare programs. All members are encouraged to attend.\n\nKey discussion points:\n1. Annual Chitra Vizha festival preparations\n2. Volunteer recruitment and training\n3. Community welfare fund discussion\n4. Temple maintenance updates\n5. Any other business from members',
    contentTa: 'எங்கள் மாதாந்திர சமூக கூட்டம் இந்த ஞாயிற்றுக்கிழமை கோவில் மண்டபத்தில் மாலை 4:00 மணிக்கு நடைபெறும்.',
    publishedDate: '2026-04-05T14:00:00.000Z',
    isPinned: false,
    allowComments: true,
    creator: { name: 'Senthil Murugan', profilePhotoUrl: null },
    _count: { comments: 3 }
  },
  '4': {
    id: '4',
    title: 'Volunteer Registration Open for Annual Festival',
    titleTa: 'ஆண்டு விழாவிற்கான தொண்டர் பதிவு தொடங்கியது',
    content: 'We are looking for volunteers to help with our upcoming annual festival (Chitra Vizha). If you are interested in serving the community, please register through our temple office or contact the event coordinator.\n\nVolunteers will be assigned roles in:\n• Food preparation and distribution\n• Temple decoration and flower arrangement\n• Security and crowd management\n• Registration and guest reception\n• Cleanup and maintenance',
    contentTa: 'வரவிருக்கும் சித்திரை திருவிழாவிற்கு உதவ தொண்டர்களை தேடுகிறோம்.',
    publishedDate: '2026-04-01T09:00:00.000Z',
    isPinned: false,
    allowComments: false,
    creator: { name: 'Rajesh Kumar', profilePhotoUrl: null },
    _count: { comments: 0 }
  }
}

export default function AnnouncementDetailPage() {
  const params = useParams()
  const [language, setLanguage] = useState<Language>('en')
  const announcementId = params.id as string

  // Use mock data
  const announcement = MOCK_ANNOUNCEMENTS[announcementId]

  if (!announcement) {
    return (
      <>
        <Header currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-xl">{t('announcement.noAnnouncements', language)}</p>
          <Link href="/announcements" className="btn-primary">
            {language === 'ta' ? 'அறிவிப்புகளுக்குச் செல்க' : 'Back to Announcements'}
          </Link>
        </div>
        <Footer currentLanguage={language} />
      </>
    )
  }

  const displayTitle = language === 'ta' && announcement.titleTa ? announcement.titleTa : announcement.title
  const displayContent = language === 'ta' && announcement.contentTa ? announcement.contentTa : announcement.content
  const displayDate = new Date(announcement.publishedDate).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 py-24 text-stone-100">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8 text-xs text-stone-400 font-sans font-semibold uppercase tracking-[0.18em]">
            <Link href="/announcements" className="hover:text-brass-300 transition-colors">
              {t('announcement.title', language)}
            </Link>
            <span className="mx-2 text-brass-400">/</span>
            <span className="text-stone-200">{displayTitle}</span>
          </div>

          <div className="card-temple p-0 overflow-hidden border border-brass/25 bg-stone-800 shadow-golden">
            {announcement.isPinned && (
              <div className="absolute top-6 right-6 z-20">
                <span className="px-3.5 py-1.5 bg-brass-400/10 border border-brass-400/30 text-brass-300 text-xs font-semibold uppercase tracking-[0.15em] rounded-full flex items-center gap-1.5 shadow-sm">
                  <Pin className="w-3.5 h-3.5 text-brass-400" />
                  {language === 'ta' ? 'பின்க செய்யப்பட்டது' : 'Pinned'}
                </span>
              </div>
            )}
            
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-5xl font-serif font-semibold text-stone-100 mb-8 leading-tight tracking-tight">{displayTitle}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-stone-400 mb-10 pb-8 border-b border-brass/20 text-xs font-semibold uppercase tracking-[0.15em]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brass-400" />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brass-400" />
                  <span>{announcement.creator?.name || 'Admin'}</span>
                </div>
              </div>

            {announcement.imageUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-brass/20 shadow-inner">
                <img src={announcement.imageUrl} alt={displayTitle} className="w-full h-auto max-h-[500px] object-cover" onError={(e) => { e.currentTarget.src = '/hero_premium.png'; e.currentTarget.onerror = null; }} />
              </div>
            )}

            <div className="text-stone-300 max-w-none mb-14 whitespace-pre-wrap text-base md:text-lg leading-relaxed space-y-4">
              {displayContent}
            </div>

            {/* Share section */}
            <div className="border-t border-brass/20 pt-8 flex items-center justify-between">
              <Link href="/announcements" className="flex items-center gap-2 text-brass-400 hover:text-brass-300 font-semibold uppercase tracking-[0.15em] text-xs transition-colors">
                <ChevronLeft className="w-4 h-4" />
                {language === 'ta' ? 'அறிவிப்புகளுக்குச் செல்க' : 'Back to Announcements'}
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
                <MessageSquare className="w-4 h-4 text-brass-400" />
                {announcement._count?.comments || 0} {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'}
              </div>
            </div>

            {announcement.allowComments && (
              <CommentSection announcementId={announcement.id} language={language} />
            )}
            </div>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
