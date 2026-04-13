'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'
import RsvpButton from '@/components/events/RsvpButton'

// Same mock data as events listing page
const MOCK_EVENTS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Aadi Amavasai Ceremony',
    titleTa: 'ஆடி அமாவாசை பூஜை',
    description: 'Join us for the sacred Aadi Amavasai ceremony at Sri Ayyanar Karuppasamy Kovil, Mathanaickenpatti. This important ritual honors our ancestors and seeks blessings for the community.\n\nSchedule:\n• 6:00 AM - Suprabhatam and morning prayers\n• 7:00 AM - Special Abhishekam with sacred items\n• 8:30 AM - Alankaram and deeparadhana\n• 10:00 AM - Homam (sacred fire ritual)\n• 11:30 AM - Mahaprasadam distribution\n\nAll devotees are welcome. Prasadam will be distributed to all attendees. Please arrive early for parking arrangements.',
    descriptionTa: 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவிலில் புனித ஆடி அமாவாசை விழாவில் எங்களுடன் இணையுங்கள். இந்த முக்கியமான சடங்கு நமது முன்னோர்களை கௌரவிக்கிறது மற்றும் சமூகத்திற்கு ஆசீர்வாதங்களை நாடுகிறது.',
    date: '2026-08-11T06:00:00.000Z',
    time: '6:00 AM - 12:00 PM',
    location: 'Sri Ayyanar Karuppasamy Kovil, Mathanaickenpatti',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=1200',
    capacity: 200,
    creator: { name: 'Rajesh Kumar', profilePhotoUrl: null },
    _count: { rsvps: 45 }
  },
  '2': {
    id: '2',
    title: 'Annual Festival (Chitra Vizha)',
    titleTa: 'ஆண்டு விழா (சித்திரை திருவிழா)',
    description: 'The grand annual Chitra Vizha festival is the highlight of our temple calendar. This multi-day celebration features elaborate processions, special poojas, cultural performances, and community feasts.\n\nHighlights:\n• Grand temple procession with decorated deity chariots\n• Traditional Nathaswaram and Thavil performances\n• Bharatanatyam and folk dance shows\n• Community Annadhanam (free meal distribution)\n• Fireworks display on the final evening\n• Special poojas for Ayyanar and Karuppasamy\n\nThis is a family event and all community members are encouraged to participate and volunteer.',
    descriptionTa: 'மாபெரும் சித்திரை திருவிழா எங்கள் கோவில் நாட்காட்டியின் சிறப்பம்சமாகும். இந்த பல நாள் கொண்டாட்டத்தில் விரிவான ஊர்வலங்கள், சிறப்பு பூஜைகள், கலாச்சார நிகழ்ச்சிகள் மற்றும் சமூக விருந்துகள் உள்ளன.',
    date: '2026-04-25T05:00:00.000Z',
    time: 'All Day',
    location: 'Mathanaickenpatti Ground',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    capacity: 500,
    creator: { name: 'Temple Admin', profilePhotoUrl: null },
    _count: { rsvps: 120 }
  },
  '3': {
    id: '3',
    title: 'Maha Shivaratri Special Pooja',
    titleTa: 'மகா சிவராத்திரி சிறப்பு பூஜை',
    description: 'Celebrate the auspicious night of Maha Shivaratri with continuous poojas throughout the night. The temple will remain open all night for devotees.\n\nTimings:\n• 6:00 PM - First kala pooja\n• 9:00 PM - Second kala pooja\n• 12:00 AM - Third kala pooja (midnight)\n• 3:00 AM - Fourth kala pooja\n• 6:00 AM - Subrabhatam\n\nDevotees observing fast can break their fast after the morning pooja. Special arrangements for devotees staying overnight.',
    descriptionTa: 'மகா சிவராத்திரியின் மங்களகரமான இரவை இரவு முழுவதும் தொடர் பூஜைகளுடன் கொண்டாடுங்கள்.',
    date: '2027-02-15T18:00:00.000Z',
    time: '6:00 PM onwards',
    location: 'Main Sanctum',
    imageUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=1200',
    capacity: 150,
    creator: { name: 'Rajesh Kumar', profilePhotoUrl: null },
    _count: { rsvps: 85 }
  },
  '4': {
    id: '4',
    title: 'Thai Poosam Celebration',
    titleTa: 'தை பூசம் திருவிழா',
    description: 'Thai Poosam is a sacred festival dedicated to Lord Murugan. Join us for the morning special pooja and procession.\n\nThe celebration includes:\n• Early morning Paal Kudam procession\n• Special Abhishekam\n• Kavadi performances by devotees\n• Free Annadhanam for all\n• Cultural programs for children',
    descriptionTa: 'தை பூசம் முருகப் பெருமானுக்கு அர்ப்பணிக்கப்பட்ட புனித திருவிழா. காலை சிறப்பு பூஜை மற்றும் ஊர்வலத்தில் எங்களுடன் இணையுங்கள்.',
    date: '2027-01-21T07:30:00.000Z',
    time: '7:30 AM',
    location: 'Temple Entrance',
    imageUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=1200',
    creator: { name: 'Temple Admin', profilePhotoUrl: null },
    _count: { rsvps: 60 }
  }
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()

  const eventId = params.id as string
  const event = MOCK_EVENTS[eventId]

  if (!event) {
    return (
      <>
        <Header currentLanguage={language} onLanguageChange={setLanguage} />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-xl">{t('event.noEvents', language)}</p>
          <Link href="/events" className="btn-primary">
            {language === 'ta' ? 'நிகழ்வுகளுக்குச் செல்க' : 'Back to Events'}
          </Link>
        </div>
        <Footer currentLanguage={language} />
      </>
    )
  }

  const displayTitle = language === 'ta' && event.titleTa ? event.titleTa : event.title
  const displayDescription = language === 'ta' && event.descriptionTa ? event.descriptionTa : event.description
  const displayDate = new Date(event.date).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-500">
            <Link href="/events" className="hover:text-primary transition-colors">
              {t('event.title', language)}
            </Link>
            <span className="mx-2">→</span>
            <span className="text-gray-700">{displayTitle}</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {event.imageUrl && (
              <img src={event.imageUrl} alt={displayTitle} className="w-full h-80 object-cover" />
            )}
            
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-6">{displayTitle}</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-bold">{displayDate}</p>
                    {event.time && <p className="text-sm text-gray-500">{event.time}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-bold">{event._count?.rsvps || 0} {language === 'ta' ? 'பேர் கலந்துகொள்கின்றனர்' : 'attending'}</p>
                  </div>
                </div>
                {event.capacity && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-2xl">🎫</span>
                    <div>
                      <p className="font-bold">{event.capacity} {language === 'ta' ? 'அதிகபட்ச இடம்' : 'capacity'}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="prose max-w-none mb-8 whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
                {displayDescription}
              </div>

              <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-600 flex items-center gap-2">
                  <span>✍️</span> {language === 'ta' ? 'உருவாக்கியவர்' : 'Created by'} <span className="font-bold">{event.creator?.name || 'Admin'}</span>
                </div>
                <div className="flex gap-4">
                  {user && (user.role === 'ADMIN' || user.id === event.createdBy) && (
                    <button 
                      onClick={() => router.push(`/events/${event.id}/edit`)}
                      className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium"
                    >
                      {t('common.edit', language)}
                    </button>
                  )}
                  <RsvpButton eventId={event.id} initialRsvped={false} language={language} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
