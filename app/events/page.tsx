'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import EventList from '@/components/events/EventList'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'

// Mock Data for the Festival Calendar
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Aadi Amavasai Ceremony',
    titleTa: 'ஆடி அமாவாசை பூஜை',
    date: '2026-08-11T06:00:00.000Z',
    time: '6:00 AM - 12:00 PM',
    location: 'Sri Ayyanar Karuppasamy Kovil, Mathanaickenpatti',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 45 }
  },
  {
    id: '2',
    title: 'Annual Festival (Chitra Vizha)',
    titleTa: 'ஆண்டு விழா (சித்திரை திருவிழா)',
    date: '2026-04-25T05:00:00.000Z',
    time: 'All Day',
    location: 'Mathanaickenpatti Ground',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 120 }
  },
  {
    id: '3',
    title: 'Maha Shivaratri Special Pooja',
    titleTa: 'மகா சிவராத்திரி சிறப்பு பூஜை',
    date: '2027-02-15T18:00:00.000Z',
    time: '6:00 PM onwards',
    location: 'Main Sanctum',
    imageUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 85 }
  },
  {
    id: '4',
    title: 'Thai Poosam Celebration',
    titleTa: 'தை பூசம் திருவிழா',
    date: '2027-01-21T07:30:00.000Z',
    time: '7:30 AM',
    location: 'Temple Entrance',
    imageUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 60 }
  }
]

export default function EventsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  
  // For now, we use mock data directly as requested
  const events = MOCK_EVENTS

  const canCreate = user?.role === 'ADMIN' || user?.role === 'MEMBER'

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark mb-4 drop-shadow-sm">
              {language === 'ta' ? 'விழா காலண்டர்' : 'Festival Calendar'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ta' 
                ? 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவிலின் வரவிருக்கும் திருவிழாக்கள் மற்றும் முக்கிய நிகழ்வுகளை இங்கே காணலாம்.'
                : 'Stay updated with the upcoming festivals and important ceremonies at Sri Ayyanar Karuppasamy Kovil.'}
            </p>
          </div>

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-orange-800 flex items-center gap-2">
              <span>🗓️</span> {t('event.upcomingEvents', language)}
            </h2>
            {canCreate && (
              <Link href="/events/create" className="btn-primary">
                {language === 'ta' ? '+ புதிய நிகழ்வு' : '+ New Event'}
              </Link>
            )}
          </div>

          <EventList events={events} language={language} />
          
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
            <h3 className="text-2xl font-bold text-dark mb-4">
              {language === 'ta' ? 'முக்கிய குறிப்பு' : 'Important Note'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {language === 'ta'
                ? 'அனைத்து பக்தர்களும் திருவிழாக்களின் போது கோவிலின் விதிமுறைகளைப் பின்பற்றுமாறு கேட்டுக்கொள்ளப்படுகிறார்கள். விரிவான விபரங்களுக்கு நிர்வாகியைத் தொடர்பு கொள்ளவும்.'
                : 'All devotees are requested to follow the temple regulations during festivals. Please contact the administrator for detailed schedules and volunteer opportunities.'}
            </p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
