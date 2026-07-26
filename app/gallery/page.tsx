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
    description: 'The majestic entrance of Sri Karuppusamy Thirukovil.'
  },
  {
    id: '2',
    title: 'Aadi Perukku Celebration',
    titleTa: 'ஆடி பெருக்கு விழா',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    category: 'EVENT',
    description: 'Devotees gathered for the annual Aadi Perukku poojai.'
  },
  {
    id: '3',
    title: 'Deepa Aradhanai',
    titleTa: 'தீப ஆராதனை',
    type: 'IMAGE',
    fileUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621213204918-05b18aa124b8?auto=format&fit=crop&q=80&w=400',
    category: 'CEREMONY',
    description: 'Evening Deepa Aradhanai ceremony.'
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
      <main className="min-h-screen bg-stone-900 py-32 text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="section-label-gold mb-4 inline-block">{language === 'ta' ? 'கோவில் புகைப்படங்கள்' : 'Temple Gallery'}</span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {t('nav.gallery', language)}
            </h1>
            <p className="text-base md:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
              {language === 'ta' ? 'கோவில் திருவிழாக்கள், விசேஷ பூஜைகள் மற்றும் சமூக நிகழ்வுகளின் புகைப்படங்கள்.' : 'Photographs of temple festivals, special poojas, and village celebrations.'}
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-14 bg-stone-800 p-1.5 rounded-xl border border-brass/25 max-w-fit mx-auto shadow-golden">
            {['', 'EVENT', 'CEREMONY', 'OTHER'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                  categoryFilter === cat
                    ? 'bg-stone-900 text-brass-300 border border-brass/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
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
          
          <div className="mt-20 text-center text-stone-400 font-sans text-sm border-t border-brass/20 pt-10">
            {language === 'ta' 
              ? 'மேலும் கோவில் புகைப்படங்கள் மற்றும் வீடியோக்கள் விரைவில் பதிவேற்றப்படும்.' 
              : 'More photographs of temple festivals and poojas will be updated soon.'}
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
