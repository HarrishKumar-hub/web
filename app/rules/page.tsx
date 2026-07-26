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
      <main className="min-h-screen bg-stone-900 py-32 text-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(176,138,79,0.25) 0%, transparent 60%)' }} />
        <div className="container-custom max-w-5xl relative z-10">
          <div className="text-center mb-20">
            <span className="section-label-gold mb-4 inline-block">Temple Conduct</span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-100 mb-6 tracking-tight">
              {t('nav.rules', language)}
            </h1>
            <div className="h-1 w-24 bg-brass-400 mx-auto rounded-full opacity-60"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-stone-800 p-8 md:p-12 rounded-2xl border border-brass/25 shadow-golden relative overflow-hidden group">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-stone-900 border border-brass/25 rounded-xl flex items-center justify-center text-brass-300 shadow-inner">
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-stone-100 tracking-tight">
                   {language === 'ta' ? 'செய்ய வேண்டியவை' : "Temple Guidelines"}
                </h2>
              </div>
              <ul className="space-y-5">
                {[
                  language === 'ta' ? 'வரிசையில் அமைதியாக சென்று சுவாமி தரிசனம் செய்யவும்.' : 'Please maintain silence and stand in queue for darshan.',
                  language === 'ta' ? 'பாரம்பரிய மற்றும் ஆச்சாரமான உடைகளை அணியவும்.' : 'Wear traditional and respectable attire when visiting the temple.',
                  language === 'ta' ? 'கோவில் மரபுகள் மற்றும் வழிபாட்டு முறைகளை மதிக்கவும்.' : 'Respect traditional customs and follow the instructions of temple priests.',
                  language === 'ta' ? 'கோவில் வளாகத்தை தூய்மையாக பராமரிக்க ஒத்துழைக்க வேண்டும்.' : 'Please help keep the temple premises clean and dispose of waste properly.'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3.5 items-start text-stone-300 text-base leading-relaxed">
                    <Check className="w-5 h-5 text-brass-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-800 p-8 md:p-12 rounded-2xl border border-brass/25 shadow-golden relative overflow-hidden group">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-stone-900 border border-brass/25 rounded-xl flex items-center justify-center text-red-400 shadow-inner">
                  <Ban className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-stone-100 tracking-tight">
                   {language === 'ta' ? 'செய்யக்கூடாதவை' : "Please Avoid"}
                </h2>
              </div>
              <ul className="space-y-5">
                {[
                  language === 'ta' ? 'கருவறைக்குள் புகைப்படம் மற்றும் வீடியோ எடுக்கத் தடை.' : 'Photography and videography are strictly prohibited inside the main sanctum.',
                  language === 'ta' ? 'கோவில் வாசலில் காலணிகளை கழற்றி வைத்துவிட்டு வரவும்.' : 'Please remove footwear before entering the temple complex.',
                  language === 'ta' ? 'கோவில் வளாகத்திற்குள் புகைபிடித்தல் மற்றும் மது அருந்துதல் முற்றிலும் தடைசெய்யப்பட்டுள்ளது.' : 'Smoking, alcohol consumption, and non-vegetarian items are strictly prohibited inside the premises.',
                  language === 'ta' ? 'பிளாஸ்டிக் பைகளை தவிர்த்து, துணிப் பைகளைப் பயன்படுத்தவும்.' : 'Avoid bringing single-use plastic bags into the temple.'
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3.5 items-start text-stone-300 text-base leading-relaxed">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 p-12 md:p-16 rounded-2xl bg-stone-950 border border-brass/30 text-stone-100 text-center relative overflow-hidden shadow-golden">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4 italic tracking-tight relative z-10">"Faith is the light that guides your spirit."</h3>
            <p className="text-brass-300 font-mono font-semibold text-xs tracking-[0.25em] uppercase relative z-10">Ancient Temple Wisdom</p>
          </div>
        </div>
      </main>
      <Footer currentLanguage={language} />
    </>
  )
}
