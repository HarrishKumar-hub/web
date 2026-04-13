'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import AnnouncementList from '@/components/announcements/AnnouncementList'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'

// Mock Data for Announcements
const MOCK_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Temple Renovation Update - Phase 1 Completed',
    titleTa: 'கோவில் புனரமைப்பு புதுப்பிப்பு - முதல் கட்டம் முடிந்தது',
    content: 'We are pleased to announce that the first phase of our temple renovation project has been successfully completed. The new gopuram work and main entrance are now finished. We express our heartfelt gratitude to all donors and volunteers who contributed to this sacred endeavor.',
    contentTa: 'எங்கள் கோவில் புனரமைப்பு திட்டத்தின் முதல் கட்டம் வெற்றிகரமாக முடிவடைந்துள்ளது என்று மகிழ்ச்சியுடன் தெரிவிக்கிறோம். புதிய கோபுர வேலை மற்றும் பிரதான நுழைவு வாயில் இப்போது முடிந்தது.',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800',
    publishedDate: '2026-04-10T10:00:00.000Z',
    isPinned: true,
    allowComments: true,
    _count: { comments: 12 }
  },
  {
    id: '2',
    title: 'Aadi Amavasai Special Pooja Schedule',
    titleTa: 'ஆடி அமாவாசை சிறப்பு பூஜை அட்டவணை',
    content: 'Dear devotees, the upcoming Aadi Amavasai special pooja will be held on August 11th, 2026 from 6:00 AM to 12:00 PM. All devotees are requested to participate in this auspicious ceremony. Prasadam will be distributed to all attendees.',
    contentTa: 'அன்பான பக்தர்களே, வரவிருக்கும் ஆடி அமாவாசை சிறப்பு பூஜை ஆகஸ்ட் 11, 2026 அன்று காலை 6:00 மணி முதல் மதியம் 12:00 மணி வரை நடைபெறும்.',
    publishedDate: '2026-04-08T08:30:00.000Z',
    isPinned: false,
    allowComments: true,
    _count: { comments: 5 }
  },
  {
    id: '3',
    title: 'Community Meeting - Monthly Gathering',
    titleTa: 'சமூக கூட்டம் - மாதாந்திர சந்திப்பு',
    content: 'Our monthly community meeting will be held this Sunday at the temple hall at 4:00 PM. Agenda includes discussion on upcoming festival preparations, volunteer assignments, and community welfare programs. All members are encouraged to attend.',
    contentTa: 'எங்கள் மாதாந்திர சமூக கூட்டம் இந்த ஞாயிற்றுக்கிழமை கோவில் மண்டபத்தில் மாலை 4:00 மணிக்கு நடைபெறும். வரவிருக்கும் திருவிழா தயாரிப்புகள் பற்றிய விவாதம் நிகழ்ச்சி நிரலில் உள்ளது.',
    publishedDate: '2026-04-05T14:00:00.000Z',
    isPinned: false,
    allowComments: true,
    _count: { comments: 3 }
  },
  {
    id: '4',
    title: 'Volunteer Registration Open for Annual Festival',
    titleTa: 'ஆண்டு விழாவிற்கான தொண்டர் பதிவு தொடங்கியது',
    content: 'We are looking for volunteers to help with our upcoming annual festival (Chitra Vizha). If you are interested in serving the community, please register through our temple office or contact the event coordinator. Volunteers will be assigned roles in food preparation, decoration, security, and crowd management.',
    contentTa: 'வரவிருக்கும் சித்திரை திருவிழாவிற்கு உதவ தொண்டர்களை தேடுகிறோம். சமூகத்திற்கு சேவை செய்ய ஆர்வமாக இருந்தால், கோவில் அலுவலகம் மூலம் பதிவு செய்யவும்.',
    publishedDate: '2026-04-01T09:00:00.000Z',
    isPinned: false,
    allowComments: false,
    _count: { comments: 0 }
  }
]

export default function AnnouncementsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()

  // Use mock data for display
  const announcements = MOCK_ANNOUNCEMENTS

  const canCreate = user?.role === 'ADMIN'

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark mb-4 drop-shadow-sm">
              {t('announcement.latest', language)}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ta'
                ? 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவிலின் சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்.'
                : 'Stay informed with the latest news, updates, and announcements from Sri Ayyanar Karuppasamy Kovil.'}
            </p>
          </div>

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-orange-800 flex items-center gap-2">
              <span>📢</span> {t('announcement.title', language)}
            </h2>
            {canCreate && (
              <Link href="/announcements/create" className="btn-primary">
                {language === 'ta' ? '+ புதிய அறிவிப்பு' : '+ New Announcement'}
              </Link>
            )}
          </div>

          <AnnouncementList announcements={announcements} language={language} />

          <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <h3 className="text-2xl font-bold text-dark mb-4">
              {language === 'ta' ? 'அறிவிப்புகள் பற்றி' : 'Stay Connected'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'ta'
                ? 'கோவில் அறிவிப்புகள் மற்றும் செய்திகளை தவறாமல் பார்க்கவும். முக்கிய நிகழ்வுகள் மற்றும் சமூக செய்திகளை இங்கே வெளிப்படுத்துவோம்.'
                : 'Check back regularly for temple announcements and community news. Important updates about events, ceremonies, and community activities are shared here.'}
            </p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
