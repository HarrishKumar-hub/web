'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { t, Language } from '@/lib/translations'
import { Zap, Ban, Check, X } from 'lucide-react'

export default function RulesPage() {
  const [language, setLanguage] = useState<Language>('en')
  
  return (
    <>
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <main className="min-h-screen bg-ivory py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/aztec.png')] -z-10"></div>
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-24">
            <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Temple Conduct</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gold-dark mb-8 tracking-tight">
              {t('nav.rules', language)}
            </h1>
            <div className="h-1.5 w-32 bg-gold-metallic mx-auto rounded-full shadow-flame/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-ivory-warm p-14 rounded-[64px] border border-gold/15 shadow-ivory relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-ivory border border-gold/20 rounded-2xl flex items-center justify-center text-saffron shadow-ivory">
                  <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-gold-dark tracking-tight">
                   {language === 'ta' ? 'செய்ய வேண்டியவை' : "Divine Do's"}
                </h2>
              </div>
              <ul className="space-y-6">
                {[
                  language === 'ta' ? 'வரிசையில் வரவும்' : 'Maintain silence and celestial discipline.',
                  language === 'ta' ? 'ஆச்சாரமான உடையணியவும்' : 'Wear traditional and respectable attire.',
                  language === 'ta' ? 'அமைதி காக்கவும்' : 'Respect the ancient temple customs.',
                  language === 'ta' ? 'குப்பைகளை குப்பைத்தொட்டியில் போடவும்' : 'Keep the sacred premises immaculate.'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-sacred-ash/70 font-lora italic text-lg leading-relaxed">
                    <Check className="w-6 h-6 text-saffron flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-ivory-warm p-14 rounded-[64px] border border-gold/15 shadow-ivory relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-ivory border border-gold/20 rounded-2xl flex items-center justify-center text-maroon shadow-ivory">
                  <Ban className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-gold-dark tracking-tight">
                   {language === 'ta' ? 'செய்யக்கூடாதவை' : "Sacred Don'ts"}
                </h2>
              </div>
              <ul className="space-y-6">
                {[
                  language === 'ta' ? 'புகைப்படம் எடுக்க தடை' : 'No digital capture inside the sanctum.',
                  language === 'ta' ? 'காலணிகளுடன் வர வேண்டாம்' : 'Leave worldly footwear at the entrance.',
                  language === 'ta' ? 'புகைபிடித்தல் மற்றும் மது அருந்துதல் தடை' : 'Consumption of intoxicants is prohibited.',
                  language === 'ta' ? 'பிளாஸ்டிக் பைகளை பயன்படுத்த வேண்டாம்' : 'Minimize the use of non-sacred plastics.'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-sacred-ash/50 font-lora italic text-lg leading-relaxed">
                    <X className="w-6 h-6 text-maroon flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-32 p-16 rounded-[48px] bg-gold-dark text-ivory text-center relative overflow-hidden shadow-golden-lg">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aztec.png')]"></div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 italic tracking-tight relative z-10">"Faith is the light that guides your spirit."</h3>
            <p className="text-ivory/50 font-sans font-black text-xs tracking-[0.5em] uppercase relative z-10">Ancient Temple Wisdom</p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
