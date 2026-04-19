'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import AnnouncementList from '@/components/announcements/AnnouncementList'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { motion } from 'framer-motion'
import { Megaphone, BellRing } from 'lucide-react'

const MOCK_ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Temple Renovation Update — Phase 1 Completed',
    titleTa: 'கோவில் புனரமைப்பு புதுப்பிப்பு — முதல் கட்டம் முடிந்தது',
    content: 'We are pleased to announce that the first phase of our temple renovation project has been successfully completed. The new gopuram work and main entrance are now finished. We express our heartfelt gratitude to all donors and volunteers.',
    contentTa: 'எங்கள் கோவில் புனரமைப்பு திட்டத்தின் முதல் கட்டம் வெற்றிகரமாக முடிவடைந்துள்ளது.',
    imageUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=800',
    publishedDate: '2026-04-10T10:00:00.000Z',
    isPinned: true,
    allowComments: true,
    _count: { comments: 12 },
  },
  {
    id: '2',
    title: 'Aadi Amavasai Special Pooja Schedule',
    titleTa: 'ஆடி அமாவாசை சிறப்பு பூஜை அட்டவணை',
    content: 'Dear devotees, the upcoming Aadi Amavasai special pooja will be held on August 11th, 2026 from 6:00 AM to 12:00 PM. All devotees are requested to participate in this auspicious ceremony.',
    contentTa: 'அன்பான பக்தர்களே, வரவிருக்கும் ஆடி அமாவாசை சிறப்பு பூஜை ஆகஸ்ட் 11, 2026 அன்று நடைபெறும்.',
    publishedDate: '2026-04-08T08:30:00.000Z',
    isPinned: false,
    allowComments: true,
    _count: { comments: 5 },
  },
  {
    id: '3',
    title: 'Community Meeting — Monthly Gathering',
    titleTa: 'சமூக கூட்டம் — மாதாந்திர சந்திப்பு',
    content: 'Our monthly community meeting will be held this Sunday at the temple hall at 4:00 PM. Agenda includes discussion on upcoming festival preparations and volunteer assignments.',
    contentTa: 'எங்கள் மாதாந்திர சமூக கூட்டம் இந்த ஞாயிற்றுக்கிழமை கோவில் மண்டபத்தில் மாலை 4:00 மணிக்கு நடைபெறும்.',
    publishedDate: '2026-04-05T14:00:00.000Z',
    isPinned: false,
    allowComments: true,
    _count: { comments: 3 },
  },
  {
    id: '4',
    title: 'Volunteer Registration Open for Annual Festival',
    titleTa: 'ஆண்டு விழாவிற்கான தொண்டர் பதிவு தொடங்கியது',
    content: 'We are looking for volunteers to help with our upcoming annual festival (Chitra Vizha). Register through our temple office or contact the event coordinator.',
    contentTa: 'வரவிருக்கும் சித்திரை திருவிழாவிற்கு உதவ தொண்டர்களை தேடுகிறோம்.',
    publishedDate: '2026-04-01T09:00:00.000Z',
    isPinned: false,
    allowComments: false,
    _count: { comments: 0 },
  },
]

export default function AnnouncementsPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { user } = useAuth()
  const canCreate = user?.role === 'ADMIN'

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
              className="section-label flex justify-center items-center gap-2"
            >
              <Megaphone className="w-4 h-4"/> Sacred Notices
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-6 tracking-tighter"
            >
              {t('announcement.latest', language)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-sacred-ash/60 max-w-2xl mx-auto font-lora leading-relaxed"
            >
              {language === 'ta'
                ? 'ஸ்ரீ கருப்பசாமி திருக்கோவிலின் சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்.'
                : 'Stay informed with the latest news, updates, and announcements from Sri Karuppusamy Thirukovil.'}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 w-20 bg-saffron-glow mx-auto rounded-full mt-8"
            />
          </div>
        </section>

        {/* Announcements Body */}
        <section className="py-20 bg-ivory">
          <div className="container-custom">

            {/* Section row */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-gold/12">
              <div className="flex items-center gap-3">
                <Megaphone className="w-6 h-6 text-saffron" />
                <h2 className="text-2xl font-serif font-bold text-gold-dark">
                  {t('announcement.title', language)}
                </h2>
              </div>
              {canCreate && (
                <Link href="/announcements/create" className="btn-sacred py-3 px-8 text-[10px]">
                  {language === 'ta' ? '+ புதிய அறிவிப்பு' : '+ New Announcement'}
                </Link>
              )}
            </div>

            <AnnouncementList announcements={MOCK_ANNOUNCEMENTS} language={language} />

            {/* Stay connected card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 p-10 rounded-[40px] border border-gold/20 bg-gold/5"
            >
              <div className="flex items-start gap-5">
                <BellRing className="w-8 h-8 text-saffron flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-serif font-bold text-gold-dark mb-3">
                    {language === 'ta' ? 'அறிவிப்புகள் பற்றி' : 'Stay Connected'}
                  </h3>
                  <p className="text-sacred-ash/65 font-lora leading-relaxed text-base">
                    {language === 'ta'
                      ? 'கோவில் அறிவிப்புகள் மற்றும் செய்திகளை தவறாமல் பார்க்கவும். முக்கிய நிகழ்வுகள் மற்றும் சமூக செய்திகளை இங்கே வெளிப்படுத்துவோம்.'
                      : 'Check back regularly for temple announcements and community news. Important updates about events, ceremonies, and community activities are shared here.'}
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
