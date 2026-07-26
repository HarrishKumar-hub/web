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

      <main className="min-h-screen bg-ivory">

        {/* Page Header */}
        <section className="pt-36 pb-20 border-b border-gold/10 bg-ivory">
          <div className="container-custom text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-label flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4" /> Sacred Celebrations
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-6 tracking-tighter"
            >
              {language === 'ta' ? 'விழா காலண்டர்' : 'Festival Calendar'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-sacred-ash/60 max-w-2xl mx-auto font-lora leading-relaxed"
            >
              {language === 'ta'
                ? 'ஸ்ரீ கருப்பசாமி திருக்கோவிலின் வரவிருக்கும் திருவிழாக்கள் மற்றும் முக்கிய நிகழ்வுகளை இங்கே காணலாம்.'
                : 'Stay updated with the upcoming festivals and important ceremonies at Sri Karuppusamy Thirukovil.'}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 w-20 bg-saffron-glow mx-auto rounded-full mt-8"
            />
          </div>
        </section>

        {/* Events Body */}
        <section className="py-20 bg-ivory">
          <div className="container-custom">

            {/* Section header row */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-gold/12">
              <div className="flex items-center gap-3">
                <Calendar className="w-7 h-7 text-saffron" />
                <h2 className="text-2xl font-serif font-bold text-gold-dark">
                  {t('event.upcomingEvents', language)}
                </h2>
              </div>
              {canCreate && (
                <Link href="/events/create" className="btn-sacred py-3 px-8 text-[10px]">
                  {language === 'ta' ? '+ புதிய நிகழ்வு' : '+ New Event'}
                </Link>
              )}
            </div>

            <EventList events={MOCK_EVENTS} language={language} />

            {/* Important Note card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 p-10 rounded-[40px] border border-saffron/20 bg-saffron/5"
            >
              <div className="flex items-start gap-5">
                <ClipboardList className="w-8 h-8 text-saffron flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-gold-dark mb-3">
                    {language === 'ta' ? 'முக்கிய குறிப்பு' : 'Important Note'}
                  </h3>
                  <p className="text-sacred-ash/65 font-lora leading-relaxed text-base">
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
