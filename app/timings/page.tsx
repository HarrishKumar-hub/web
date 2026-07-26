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
      <main className="min-h-screen bg-stone-900 py-32 relative overflow-hidden text-stone-100">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(176,138,79,0.2) 0%, transparent 60%)' }} />
        <div className="container-custom max-w-4xl relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <span className="section-label-gold block mb-3">{language === 'ta' ? 'பூஜை நேரங்கள்' : 'Pooja Timings'}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {t('nav.timings', language)}
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-brass-400 to-transparent mx-auto rounded-full mt-6"></div>
          </div>

          <div className="bg-stone-800 rounded-[24px] shadow-golden overflow-hidden border border-brass/25">
            <div className="bg-stone-900/90 border-b border-brass/25 text-stone-100 py-6 md:py-8 text-center">
              <h2 className="text-lg md:text-xl font-serif font-semibold tracking-[0.18em] text-brass-300 uppercase">{language === 'ta' ? 'தினசரி கால அட்டவணை' : 'Daily Schedule'}</h2>
            </div>
            <div className="divide-y divide-brass/15">
              {schedules.map((s, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 p-6 md:p-8 hover:bg-stone-900/40 transition-colors duration-200">
                  <span className="font-mono font-semibold text-brass-400 text-lg md:text-xl tracking-tight">{s.time}</span>
                  <span className="text-stone-100 font-serif font-semibold text-base md:text-lg text-center sm:text-right">{s.event}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-10 text-center text-stone-400 text-xs md:text-sm tracking-wide">
            * {language === 'ta' ? 'விசேஷ நாட்களில் நேரங்கள் மாறுபடலாம்.' : 'Timings are subject to change during festival days and special poojas.'}
          </p>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
