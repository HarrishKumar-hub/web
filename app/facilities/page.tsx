'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { t, Language } from '@/lib/translations'
import { Home, Utensils, Car, Droplet } from 'lucide-react'

export default function FacilitiesPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  const facilities = [
    { title: language === 'ta' ? 'ஓய்வு அறைகள்' : 'Pilgrim Rest Rooms', desc: language === 'ta' ? 'வெளியூரிலிருந்து வரும் பக்தர்களுக்கான ஓய்வு அறைகள்.' : 'Rest rooms and accommodation for out-of-town devotees and families.', icon: <Home className="w-10 h-10" /> },
    { title: language === 'ta' ? 'அன்னதானக் கூடம்' : 'Annadhanam Hall', desc: language === 'ta' ? 'விசேஷ நாட்களில் பக்தர்களுக்கு அன்னதானம் வழங்கப்படுகிறது.' : 'Free prasadam and traditional food distribution during festivals and pooja days.', icon: <Utensils className="w-10 h-10" /> },
    { title: language === 'ta' ? 'வாகன நிறுத்துமிடம்' : 'Parking Area', desc: language === 'ta' ? 'கார்கள் மற்றும் இருசக்கர வாகனங்களுக்கான பாதுகாப்பான நிறுத்துமிடம்.' : 'Spacious parking area for cars, vans, and two-wheelers.', icon: <Car className="w-10 h-10" /> },
    { title: language === 'ta' ? 'குடிநீர் வசதி' : 'Drinking Water', desc: language === 'ta' ? 'கோவில் வளாகத்தில் ஆர்.ஓ (RO) குடிநீர் வசதி உள்ளது.' : 'Purified RO drinking water available throughout the temple premises.', icon: <Droplet className="w-10 h-10" /> },
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-stone-900 py-32 text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <span className="section-label-gold mb-4 inline-block">Our Services</span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {t('nav.facilities', language)}
            </h1>
            <div className="h-1 w-24 bg-brass-400 mx-auto rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((f, idx) => (
              <div key={idx} className="bg-stone-800 p-8 md:p-12 rounded-2xl border border-brass/25 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left transition-all duration-500 hover:shadow-golden hover:border-brass-400/50 group">
                <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-stone-900 border border-brass/25 text-brass-400 transition-all duration-500 shrink-0 shadow-inner group-hover:scale-105">{f.icon}</div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-stone-100 mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-stone-300 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
