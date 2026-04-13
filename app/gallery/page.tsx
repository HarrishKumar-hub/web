'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Language, t } from '@/lib/translations'
import MediaGrid from '@/components/media/MediaGrid'

// Mock Media Data for the Gallery
const MOCK_MEDIA = [
  {
    id: '1',
    title: 'Main Temple Entrance',
    titleTa: 'கோவில் வாசல்',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=400',
    category: 'CEREMONY',
    description: 'The majestic entrance of Sri Ayyanar Karuppasamy Kovil.'
  },
  {
    id: '2',
    title: 'Aadi Perukku Celebration',
    titleTa: 'ஆடி பெருக்கு விழா',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    category: 'EVENT',
    description: 'Bhakthas gathering for the sacred Aadi Perukku.'
  },
  {
    id: '3',
    title: 'Deepa Aradhanai',
    titleTa: 'தீப ஆராதனை',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=400',
    category: 'CEREMONY',
    description: 'A moment of divine light during the evening pooja.'
  },
  {
    id: '4',
    title: 'Temple Decoration',
    titleTa: 'கோவில் அலங்காரம்',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?auto=format&fit=crop&q=80&w=400',
    category: 'OTHER',
    description: 'Floral decorations for the annual festival.'
  },
  {
    id: '5',
    title: 'Morning Santhanam Pooja',
    titleTa: 'காலை சந்தன பூஜை',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1604514685561-9f93531f9746?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1604514685561-9f93531f9746?auto=format&fit=crop&q=80&w=400',
    category: 'CEREMONY'
  },
  {
    id: '6',
    title: 'Community Feast',
    titleTa: 'அன்னதானம்',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?auto=format&fit=crop&q=80&w=400',
    category: 'EVENT'
  }
]

export default function GalleryPage() {
  const [language, setLanguage] = useState<Language>('en')
  const [categoryFilter, setCategoryFilter] = useState('')

  const media = categoryFilter 
    ? MOCK_MEDIA.filter(item => item.category === categoryFilter)
    : MOCK_MEDIA

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-800 mb-4">
              {t('nav.gallery', language)}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'ta' ? 'எங்கள் நிகழ்வுகள் மற்றும் விழாக்களின் தருணங்கள்' : 'Moments from our events and ceremonies'}
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-3 mb-10">
            {['', 'EVENT', 'CEREMONY', 'OTHER'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-sm border ${
                  categoryFilter === cat
                    ? 'bg-orange-600 text-white border-orange-600 scale-105 shadow-md'
                    : 'bg-white text-gray-600 hover:bg-orange-50 border-gray-200 hover:border-orange-200'
                }`}
              >
                {cat === '' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : (
                  cat === 'EVENT' ? (language === 'ta' ? 'நிகழ்வுகள்' : 'Events') :
                  cat === 'CEREMONY' ? (language === 'ta' ? 'பூஜைகள்' : 'Ceremonies') : 
                  (language === 'ta' ? 'மற்றவை' : 'Others')
                )}
              </button>
            ))}
          </div>

          <MediaGrid mediaFiles={media} language={language} />
          
          <div className="mt-16 text-center text-gray-500 italic">
            {language === 'ta' 
              ? 'மேலும் படங்கள் விரைவில் சேர்க்கப்படும்...' 
              : 'More photos will be added soon...'}
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
