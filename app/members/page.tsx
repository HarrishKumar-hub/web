'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import { useAuth } from '@/lib/useAuth'
import MemberCard from '@/components/members/MemberCard'

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
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  // Redirect unauthenticated users
  if (!authLoading && !isAuthenticated) {
    // Show the page with mock data anyway for demo purposes
    // In production, uncomment: router.push('/login')
  }

  // Use mock data for display
  const members = MOCK_MEMBERS

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark mb-4 drop-shadow-sm">
              {t('member.directory', language)}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ta' 
                ? 'ஸ்ரீ அய்யனார் கருப்பசாமி கோவில் சமூக உறுப்பினர்களை சந்திக்கவும்.'
                : 'Meet the dedicated members of Sri Ayyanar Karuppasamy Kovil community.'}
            </p>
          </div>

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-orange-800 flex items-center gap-2">
              <span>👥</span> {members.length} {t('member.members', language)}
            </h2>
          </div>

          {members.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">No members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member: any) => (
                <MemberCard key={member.id} member={member} language={language} />
              ))}
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
              <p className="text-orange-800 font-medium mb-4">
                {language === 'ta' 
                  ? 'முழு உறுப்பினர் விவரங்களைப் பார்க்க உள்நுழையவும்.'
                  : 'Login to view full member profiles and connect with the community.'}
              </p>
              <a href="/login" className="btn-primary inline-block">
                {t('nav.login', language)}
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
