'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { t, Language } from '@/lib/translations'
import { Home, Utensils, Car, Droplet } from 'lucide-react'

export default function FacilitiesPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  const facilities = [
    { title: language === 'ta' ? 'தங்கும் அறைகள்' : 'Pilgrim Stay', desc: language === 'ta' ? 'பக்தர்களுக்கான தங்கும் வசதிகள்' : 'Elegant and serene accommodations for distant travelers.', icon: <Home className="w-10 h-10" /> },
    { title: language === 'ta' ? 'அன்னதானம்' : 'Annadhanam Hall', desc: language === 'ta' ? 'தினசரி மதிய உணவு' : 'Sacred distribution of daily nourishment for all.', icon: <Utensils className="w-10 h-10" /> },
    { title: language === 'ta' ? 'வாகன நிறுத்துமிடம்' : 'Royal Parking', desc: language === 'ta' ? 'பாதுகாப்பான வாகன நிறுத்துமிடம்' : 'Segregated and secure space for pilgrim vehicles.', icon: <Car className="w-10 h-10" /> },
    { title: language === 'ta' ? 'குடிநீர்' : 'Pure Water', desc: language === 'ta' ? 'சுத்திகரிக்கப்பட்ட குடிநீர்' : 'Vedic-standard purified drinking water stations.', icon: <Droplet className="w-10 h-10" /> },
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-ivory py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')] -z-10"></div>
        <div className="container-custom">
          <div className="text-center mb-24">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Our Services</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tight">
              {t('nav.facilities', language)}
            </h1>
            <div className="h-1.5 w-32 bg-gold-metallic mx-auto rounded-full shadow-flame/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {facilities.map((f, idx) => (
              <div key={idx} className="bg-ivory-warm p-14 rounded-[64px] border border-gold/10 flex flex-col sm:flex-row gap-10 items-center sm:items-start text-center sm:text-left transition-all duration-700 hover:shadow-golden-lg hover:border-saffron group shadow-ivory relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent h-full"></div>
                <div className="w-24 h-24 flex items-center justify-center rounded-[32px] bg-ivory border border-gold/10 text-saffron group-hover:bg-saffron group-hover:text-ivory transition-all duration-700 shadow-ivory group-hover:shadow-flame/20 flex-shrink-0 group-hover:-translate-y-2">{f.icon}</div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-gold-dark mb-4 tracking-tight leading-tight">{f.title}</h3>
                  <p className="text-sacred-ash/60 leading-relaxed font-lora italic">{f.desc}</p>
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
