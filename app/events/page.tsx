'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import EventList from '@/components/events/EventList'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { motion } from 'framer-motion'
import { Flame, Calendar, ClipboardList } from 'lucide-react'

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Aadi Amavasai Ceremony',
    titleTa: 'ஆடி அமாவாசை பூஜை',
    date: '2026-08-11T06:00:00.000Z',
    time: '6:00 AM - 12:00 PM',
    location: 'Sri Karuppusamy Thirukovil, Mathanaickenpatti',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 45 },
  },
  {
    id: '2',
    title: 'Annual Festival (Chitra Vizha)',
    titleTa: 'ஆண்டு விழா (சித்திரை திருவிழா)',
    date: '2026-04-25T05:00:00.000Z',
    time: 'All Day',
    location: 'Mathanaickenpatti Ground',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 120 },
  },
  {
    id: '3',
    title: 'Maha Shivaratri Special Pooja',
    titleTa: 'மகா சிவராத்திரி சிறப்பு பூஜை',
    date: '2027-02-15T18:00:00.000Z',
    time: '6:00 PM onwards',
    location: 'Main Sanctum',
    imageUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 85 },
  },
  {
    id: '4',
    title: 'Thai Poosam Celebration',
    titleTa: 'தை பூசம் திருவிழா',
    date: '2027-01-21T07:30:00.000Z',
    time: '7:30 AM',
    location: 'Temple Entrance',
    imageUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=800',
    _count: { rsvps: 60 },
  },
]

export default function EventsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  const canCreate = user?.role === 'ADMIN' || user?.role === 'MEMBER'

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />

      <main className="min-h-screen bg-stone-900 text-stone-100">

        {/* Page Header */}
        <section className="pt-36 pb-20 border-b border-brass/20 bg-stone-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(176,138,79,0.2) 0%, transparent 60%)' }} />
          <div className="container-custom text-center relative z-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label-gold flex items-center justify-center gap-2 mb-3"
            >
              <Flame className="w-4 h-4 text-brass-400" /> {language === 'ta' ? 'திருவிழாக்கள் & பூஜைகள்' : 'Festivals & Ceremonies'}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-stone-100 mb-6 tracking-tight"
            >
              {language === 'ta' ? 'விழா காலண்டர்' : 'Festival Calendar'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed"
            >
              {language === 'ta'
                ? 'ஸ்ரீ கருப்பசாமி திருக்கோவிலின் வரவிருக்கும் திருவிழாக்கள் மற்றும் முக்கிய நிகழ்வுகளை இங்கே காணலாம்.'
                : 'Stay updated with the upcoming festivals and important ceremonies at Sri Karuppusamy Thirukovil.'}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 w-24 bg-gradient-to-r from-transparent via-brass-400 to-transparent mx-auto rounded-full mt-6"
            />
          </div>
        </section>

        {/* Events Body */}
        <section className="py-20 md:py-28 bg-stone-900">
          <div className="container-custom">

            {/* Section header row */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-brass/20">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-brass-400" />
                <h2 className="text-2xl font-serif font-semibold text-stone-100">
                  {t('event.upcomingEvents', language)}
                </h2>
              </div>
              {canCreate && (
                <Link href="/events/create" className="btn-premium py-2.5 px-6 text-xs">
                  {language === 'ta' ? '+ புதிய நிகழ்வு' : '+ New Event'}
                </Link>
              )}
            </div>

            <EventList events={MOCK_EVENTS} language={language} />

            {/* Important Note card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 p-8 rounded-2xl border border-brass/25 bg-stone-800/80 shadow-golden"
            >
              <div className="flex items-start gap-5">
                <ClipboardList className="w-7 h-7 text-brass-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-serif font-semibold text-stone-100 mb-3">
                    {language === 'ta' ? 'முக்கிய குறிப்பு' : 'Important Note'}
                  </h3>
                  <p className="text-stone-300 leading-relaxed text-sm md:text-base">
                    {language === 'ta'
                      ? 'அனைத்து பக்தர்களும் திருவிழாக்களின் போது கோவிலின் விதிமுறைகளைப் பின்பற்றுமாறு கேட்டுக்கொள்ளப்படுகிறார்கள். விரிவான விபரங்களுக்கு நிர்வாகியைத் தொடர்பு கொள்ளவும்.'
                      : 'All devotees are requested to follow the temple regulations during festivals. Please contact the administrator for detailed schedules and volunteer opportunities.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer currentLanguage={language} />
    </>
  )
}
