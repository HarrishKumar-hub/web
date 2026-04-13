'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import CommentSection from '@/components/announcements/CommentSection'

// Same mock data - in production these would come from the API
const MOCK_ANNOUNCEMENTS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Temple Renovation Update - Phase 1 Completed',
    titleTa: 'கோவில் புனரமைப்பு புதுப்பிப்பு - முதல் கட்டம் முடிந்தது',
    content: 'We are pleased to announce that the first phase of our temple renovation project has been successfully completed. The new gopuram work and main entrance are now finished. We express our heartfelt gratitude to all donors and volunteers who contributed to this sacred endeavor.\n\nThe renovation includes:\n• New gopuram (tower) above the main entrance\n• Refurbished main sanctum with fresh paintwork\n• New granite flooring in the prayer hall\n• Improved drainage system around the temple\n• Enhanced lighting for evening poojas\n\nThe second phase of renovation will begin next month and will focus on the outer mandapam, kitchen facilities, and the community hall. We continue to seek generous donations from the community to complete this divine project.',
    contentTa: 'எங்கள் கோவில் புனரமைப்பு திட்டத்தின் முதல் கட்டம் வெற்றிகரமாக முடிவடைந்துள்ளது என்று மகிழ்ச்சியுடன் தெரிவிக்கிறோம். புதிய கோபுர வேலை மற்றும் பிரதான நுழைவு வாயில் இப்போது முடிந்தது. இந்த புனிதமான முயற்சிக்கு பங்களித்த அனைத்து நன்கொடை வழங்குபவர்களுக்கும் தொண்டர்களுக்கும் எங்கள் மனமார்ந்த நன்றி.',
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
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/announcements" className="hover:text-primary transition-colors">
              {t('announcement.title', language)}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-700">{displayTitle}</span>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {announcement.isPinned && (
              <div className="mb-4 inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                📌 {language === 'ta' ? 'பின்க செய்யப்பட்ட அறிவிப்பு' : 'Pinned Announcement'}
              </div>
            )}
            
            <h1 className="text-4xl font-bold mb-4">{displayTitle}</h1>
            
            <div className="text-gray-500 mb-8 border-b pb-4 flex items-center gap-2">
              <span>📅</span> {displayDate} 
              <span className="mx-2">•</span> 
              <span>✍️</span> {announcement.creator?.name || 'Admin'}
            </div>

            {announcement.imageUrl && (
              <img src={announcement.imageUrl} alt={displayTitle} className="w-full h-auto max-h-96 object-cover rounded-xl mb-8 bg-gray-100 shadow-sm" />
            )}

            <div className="prose max-w-none mb-12 whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
              {displayContent}
            </div>

            {/* Share section */}
            <div className="border-t pt-6 flex items-center justify-between">
              <Link href="/announcements" className="text-primary hover:text-red-700 font-medium transition-colors">
                ← {language === 'ta' ? 'அறிவிப்புகளுக்குச் செல்க' : 'Back to Announcements'}
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                💬 {announcement._count?.comments || 0} {language === 'ta' ? 'கருத்துக்கள்' : 'Comments'}
              </div>
            </div>

            {announcement.allowComments && (
              <CommentSection announcementId={announcement.id} language={language} />
            )}
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
