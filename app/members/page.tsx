'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'
import MemberCard from '@/components/members/MemberCard'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, HandHeart } from 'lucide-react'

// Mock Members Data
const MOCK_MEMBERS = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    profilePhotoUrl: null,
    bio: 'Temple trustee and community leader. Passionate about preserving our cultural heritage.',
    joinedDate: '2024-01-15T00:00:00.000Z',
    role: 'ADMIN'
  },
  {
    id: '2',
    name: 'Senthil Murugan',
    profilePhotoUrl: null,
    bio: 'Active volunteer for all temple events. Coordinator for annual Chitra Vizha festival.',
    joinedDate: '2024-03-10T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '3',
    name: 'Lakshmi Devi',
    profilePhotoUrl: null,
    bio: 'Leads the flower arrangement and decoration committee for special poojas.',
    joinedDate: '2024-06-22T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '4',
    name: 'Arun Kumar',
    profilePhotoUrl: null,
    bio: 'Youth coordinator organizing community service and educational programs.',
    joinedDate: '2025-01-05T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '5',
    name: 'Priya Sundaram',
    profilePhotoUrl: null,
    bio: 'Manages the Annadhanam (food distribution) program every weekend.',
    joinedDate: '2025-02-18T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '6',
    name: 'Karthik Rajan',
    profilePhotoUrl: null,
    bio: 'Temple music volunteer performing Thevaram and devotional songs.',
    joinedDate: '2025-08-30T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '7',
    name: 'Meena Ganesh',
    profilePhotoUrl: null,
    bio: 'Helps with temple accounting and donation management.',
    joinedDate: '2025-11-12T00:00:00.000Z',
    role: 'MEMBER'
  },
  {
    id: '8',
    name: 'Vignesh Prabhu',
    profilePhotoUrl: null,
    bio: null,
    joinedDate: '2026-01-20T00:00:00.000Z',
    role: 'MEMBER'
  }
]

export default function MembersDirectoryPage() {
  const [language, setLanguage] = useState<Language>('en')
  const { isAuthenticated } = useAuth()

  // Use mock data for display
  const members = MOCK_MEMBERS

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
              <Users className="w-4 h-4" /> Our Devotees
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-6 tracking-tighter"
            >
              {t('member.directory', language)}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-sacred-ash/60 max-w-2xl mx-auto font-lora leading-relaxed"
            >
              {language === 'ta' 
                ? 'ஸ்ரீ கருப்பசாமி திருகோவில் சமூக உறுப்பினர்களை சந்திக்கவும்.'
                : 'Meet the dedicated members of Sri Karuppusamy Thirukovil community.'}
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 w-20 bg-saffron-glow mx-auto rounded-full mt-8"
            />
          </div>
        </section>

        <section className="py-20 bg-ivory">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-gold/12">
              <h2 className="text-2xl font-serif font-bold text-gold-dark flex items-center gap-3">
                <Users className="w-6 h-6 text-saffron" /> {members.length} {t('member.members', language)}
              </h2>
            </div>

            {members.length === 0 ? (
              <div className="text-center py-16 bg-ivory-warm rounded-[30px] border border-gold/10">
                <p className="text-sacred-ash/60 text-lg font-lora">
                  No members found in the directory.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((member: any) => (
                  <MemberCard key={member.id} member={member} language={language} />
                ))}
              </div>
            )}

            {!isAuthenticated && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 bg-saffron/5 border border-saffron/20 rounded-[30px] p-12 text-center shadow-flame/10"
              >
                <div className="flex justify-center mb-4">
                  <HandHeart className="w-12 h-12 text-saffron/60" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gold-dark mb-4">
                  Join The Community
                </h3>
                <p className="text-sacred-ash/70 font-medium mb-8 max-w-lg mx-auto">
                  {language === 'ta' 
                    ? 'முழு உறுப்பினர் விவரங்களைப் பார்க்க உள்நுழையவும்.'
                    : 'Login to view full member profiles and connect with the community. Registration is free and open to all devotees.'}
                </p>
                <Link href="/login" className="btn-sacred inline-block">
                  {t('nav.login', language)}
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
