'use client'

import { useState } from 'react'
import { t, type Language } from '@/lib/translations'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TimingsPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  const schedules = [
    { time: '05:00 AM', event: language === 'ta' ? 'நடை திறப்பு & விஸ்வரூப தரிசனம்' : 'Temple Opening & Vishwaroopa Darshanam' },
    { time: '06:00 AM', event: language === 'ta' ? 'காலை பூஜை' : 'Morning Pooja' },
    { time: '12:00 PM', event: language === 'ta' ? 'உச்சிக்கால பூஜை' : 'Uchikala Pooja' },
    { time: '01:00 PM', event: language === 'ta' ? 'நடை அடைப்பு' : 'Temple Closing' },
    { time: '04:00 PM', event: language === 'ta' ? 'மாலை நடை திறப்பு' : 'Evening Opening' },
    { time: '07:00 PM', event: language === 'ta' ? 'சாயரட்சை பூஜை' : 'Sayaratchai Pooja' },
    { time: '08:30 PM', event: language === 'ta' ? 'அர்த்தஜாம பூஜை & நடை அடைப்பு' : 'Arthajama Pooja & Closing' },
  ]

  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-ivory py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')] -z-10"></div>
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-24">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Daily Rituals</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tight">
              {t('nav.timings', language)}
            </h1>
            <div className="h-1.5 w-32 bg-gold-metallic mx-auto rounded-full shadow-flame/10"></div>
          </div>

          <div className="bg-white rounded-[60px] shadow-golden overflow-hidden border border-gold/10">
            <div className="bg-gold-metallic text-white py-10 text-center">
              <h2 className="text-2xl font-serif font-bold tracking-widest">{language === 'ta' ? 'தினசரி கால அட்டவணை' : 'Sacred Schedule'}</h2>
            </div>
            <div className="divide-y divide-gold/10">
              {schedules.map((s, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 p-10 hover:bg-gold/5 transition-all duration-300">
                  <span className="font-sans font-black text-gold-metallic text-xl tracking-tighter">{s.time}</span>
                  <span className="text-gold-dark font-serif font-bold text-lg text-center sm:text-right">{s.event}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-12 text-center text-gold-dark/40 font-sans italic text-sm tracking-wide">
            * {language === 'ta' ? 'விசேஷ நாட்களில் நேரங்கள் மாறுபடலாம்' : 'Timings may undergo variations during festive cosmic alignments.'}
          </p>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
